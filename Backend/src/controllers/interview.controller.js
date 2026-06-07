const pdfParse = require("pdf-parse");
const {
  generateInterviewReport,
  generateResumePdf,
} = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */

async function generateInterViewReportController(req, res) {
  console.log("rrrrrrrrrrrrrrrrr");

  const data = await pdfParse(req.file.buffer);

const resumeContent = data.text;
  const { selfDescription, jobDescription } = req.body;

  const interViewReportByAi = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });

  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    title: interViewReportByAi.title,
    matchScore: interViewReportByAi.matchScore,
    technicalQuestions: interViewReportByAi.technicalQuestions,
    behavioralQuestions: interViewReportByAi.behavioralQuestions,
    skillGap: interViewReportByAi.skillGaps,
    preparationPlan: interViewReportByAi.preparationPlan,
  });

  res.status(201).json({
    message: "Interview report generated successfully.",
    interviewReport,
  });
}

/**
 * @description Controller to get interview report by interview id.
 */

async function getInterviewReportByIdControler(req, res) {
  const { interviewId } = req.params; 

  const interviewReport = await interviewReportModel.findOne({
    _id: interviewId,
    user: req.user.id,
  });

  if (!interviewReport) {
    return res.status(404).json({ 
      message: "Interview report not found.",
    });
  }

  res.status(200).json({ 
    message: "Interview report fetched successfully.",
    interviewReport,
  });
}

/**
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReport(req, res) {
  const interviewReports = await interviewReportModel 
    .find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .select(
      "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGap -preparationPlan"
    );

  res.status(200).json({
    message: "Interview Reports fetched successfully.",
    interviewReports,
  });
}


/**
 * @description Controller to generate resume pdf based on user self description ,resume,jobdescription.
 */
async function generateResumePdfController(req, res) {
  console.log("caliing222222222")
  try {
    const { interviewReportId } = req.params;

    const interviewReport = await interviewReportModel.findById(interviewReportId);
    if (!interviewReport) {
      return res.status(404).json({
        message: "Interview Report not found"
      });
    }

    const { resume, jobDescription, selfDescription } = interviewReport;

    const pdfBuffer = await generateResumePdf({
      resume,
      jobDescription,
      selfDescription
    });

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    });

    res.send(pdfBuffer);

  } catch (err) {
    console.error("generateResumePdfController error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}


module.exports = {
  generateInterViewReportController,
  getInterviewReportByIdControler,
  getAllInterviewReport,
  generateResumePdfController,
};