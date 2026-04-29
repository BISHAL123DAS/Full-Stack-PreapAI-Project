const { GoogleGenAI } = require("@google/genai");
const { zodToJsonSchema } = require("zod-to-json-schema");
const puppeteer = require("puppeteer");
const { z } = require("zod");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

// ── schemas

const interviewReportSchema = z.object({
  matchScore: z.number(),
  technicalQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    })
  ),
  behavioralQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    })
  ),
  skillGaps: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum(["low", "medium", "high"]),
    })
  ),
  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      tasks: z.array(z.string()),
    })
  ),
  title: z.string().min(1, "job title is required"),
});

const resumePdfSchema = z.object({
  html: z
    .string()
    .describe(
      "Complete, self-contained HTML document for the resume with inline CSS styling, ready to be converted to PDF using puppeteer"
    ),
});

// ── generateInterviewReport

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
} = {}) {
  try {
    const prompt = `You are an expert technical interviewer. Analyze the candidate and generate an interview report.

Return ONLY a raw JSON object — no markdown, no backticks, no explanation.

The JSON must follow this EXACT structure:

{
  "title": "Software Engineer",
  "matchScore": 85,
  "technicalQuestions": [
    {
      "question": "actual question text here",
      "intention": "why this question is being asked",
      "answer": "how to answer it well"
    }
  ],
  "behavioralQuestions": [
    {
      "question": "actual question text here",
      "intention": "why this question is being asked",
      "answer": "how to answer it well"
    }
  ],
  "skillGaps": [
    {
      "skill": "skill name",
      "severity": "low"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "topic to focus on",
      "tasks": [
        "specific task 1",
        "specific task 2"
      ]
    }
  ]
}

Rules:
- title: MUST be a concise job role inferred from the job description (e.g., "Frontend Developer", "Backend Engineer", "Data Scientist")
- technicalQuestions: array of OBJECTS with keys question, intention, answer (generate 5 questions)
- behavioralQuestions: array of OBJECTS with keys question, intention, answer (generate 3 questions)
- skillGaps: array of OBJECTS with keys skill, severity (severity must be "low", "medium", or "high")
- preparationPlan: array of OBJECTS with keys day (number), focus (string), tasks (array of strings) — generate 5 days
- Do NOT flatten objects into arrays of strings
- Do NOT add any fields outside the schema

---

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    let raw = response.text
      .replace(/```json\s*/g, "")
      .replace(/```\s*/g, "")
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      console.error("Invalid JSON from AI:\n", raw);
      return null;
    }

    const validated = interviewReportSchema.safeParse(parsed);

    if (!validated.success) {
      console.error(
        " Schema mismatch:",
        JSON.stringify(validated.error.format(), null, 2)
      );
      console.error("Gemini returned:", JSON.stringify(parsed, null, 2));
      return null;
    }

    console.log(" Interview report generated successfully");
    return validated.data;
  } catch (err) {
    if (err.status === 429) {
      console.error("⏳ Rate limit hit. Try again later.");
    } else if (err.status === 503) {
      console.error("⚠️ Gemini overloaded. Retry after some time.");
    } else {
      console.error("Unexpected Error:", err.message);
    }
    return null;
  }
}

// ── generatePdfFromHtml ───────────────────────────────────────────────────────

async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  // inject a style override BEFORE setting content to kill any
  // AI-generated page wrapper borders/shadows/margins
  const sanitized = htmlContent.replace(
    /<style>/i,
    `<style>
      * { box-sizing: border-box !important; }
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        background: white !important;
        border: none !important;
        box-shadow: none !important;
        width: 100% !important;
        max-width: 100% !important;
      }
      /* kill any AI-generated page wrapper div */
      body > div, .page, .resume, .container, .wrapper, .resume-container {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        border: none !important;
        box-shadow: none !important;
        min-height: unset !important;
      }
    `
  );

  await page.setContent(sanitized, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "12mm", bottom: "12mm", left: "14mm", right: "14mm" },
    preferCSSPageSize: false,
  });

  await browser.close();
  return pdfBuffer;
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
  try {
    console.log("📄 Generating resume PDF for:", {
      hasResume: !!resume,
      hasSelfDescription: !!selfDescription,
      hasJobDescription: !!jobDescription,
    });

    const prompt = `You are a professional resume writer. Generate a polished, ATS-friendly resume in HTML format.

Use ONLY the real candidate details provided below. Do NOT use placeholder names like "John Doe" or fake data.

Candidate Details:
---
Resume / Experience: ${resume}
Self Description: ${selfDescription}
Job Description (target role): ${jobDescription}
---

Instructions:
- Extract the candidate's real name, contact info, skills, experience, and education from the Resume field
- Tailor content to match the target Job Description
- The HTML will be rendered by puppeteer directly — puppeteer handles all page sizing and margins
- CRITICAL: Do NOT create a page wrapper div. Do NOT set width to 210mm or any fixed page size. Do NOT add box-shadow, border, or margin:auto on any wrapper
- Write styles directly on <body> and content sections — body is already the page
- body style must be: margin:0; padding:0; font-family: Arial, sans-serif; color:#222; background:white;
- Use a clean professional single-column layout with clear section headings
- Sections to include: name + contact header, professional summary, skills, work experience, education
- Use <b>, <i>, <ul>, <li> for formatting where appropriate
- Content must sound like a real human-written resume — not AI-generated
- Do NOT use any external stylesheets, Google Fonts, or CDN links

Return ONLY a JSON object with a single field "html" containing the full HTML string.
No markdown, no backticks, no explanation.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: zodToJsonSchema(resumePdfSchema),
      },
    });

    let jsonContent;
    try {
      jsonContent = JSON.parse(response.text);
    } catch (e) {
      console.error("❌ Failed to parse AI response as JSON:", response.text);
      throw new Error("AI returned invalid JSON");
    }

    if (!jsonContent.html) {
      console.error("❌ AI response missing html field:", jsonContent);
      throw new Error("AI response missing html field");
    }

    console.log("✅ HTML resume generated, converting to PDF...");
    const pdfBuffer = await generatePdfFromHtml(jsonContent.html);
    console.log("✅ PDF generated, size:", pdfBuffer.length, "bytes");

    return pdfBuffer;
  } catch (err) {
    console.error("❌ generateResumePdf error:", err.message);
    throw err;
  }
}

module.exports = { generateInterviewReport, generateResumePdf };
