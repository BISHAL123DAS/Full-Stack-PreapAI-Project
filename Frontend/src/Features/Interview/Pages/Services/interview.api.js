import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ fixed key name
  withCredentials: true,
});

console.log("API URL:", import.meta.env.VITE_API_URL);

// @service to generate interview report
export const generateInterviewReport = async ({
  jobDescription,
  selfDescription,
  resumeFile,
}) => {
  try {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resumeFile);

    const response = await api.post("/interview/", formData, { // ✅ removed /api
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error generating report:", error);
    throw error;
  }
};

// @service to get interview report by ID
export const getInterviewReportById = async (interviewId) => {
  try {
    const response = await api.get(`/interview/report/${interviewId}`); // ✅ removed /api
    return response.data;
  } catch (error) {
    console.error("Error fetching report by ID:", error);
    throw error;
  }
};

// @service to get all interview reports
export const getAllInterviewReports = async () => {
  try {
    const response = await api.get("/interview/"); // ✅ removed /api
    return response.data;
  } catch (error) {
    console.error("Error fetching all reports:", error);
    throw error;
  }
};

// @service to generate resume pdf
export const generateResumePdf = async ({ interviewId }) => {
  try {
    const response = await api.post(
      `/interview/resume/pdf/${interviewId}`, // ✅ removed /api
      null,
      {
        responseType: "blob",
      }
    );
    return response.data;
  } catch (e) {
    console.log("errror on generatePdf", e);
  }
};