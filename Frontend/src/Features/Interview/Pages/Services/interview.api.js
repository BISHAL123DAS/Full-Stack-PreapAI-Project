import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

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

    const response = await api.post("/api/interview/", formData, {
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
    const response = await api.get(`/api/interview/report/${interviewId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching report by ID:", error);
    throw error;
  }
};

// @service to get all interview reports

export const getAllInterviewReports = async () => {
  try {
    const response = await api.get("/api/interview/");
    return response.data;
  } catch (error) {
    console.error("Error fetching all reports:", error);
    throw error;
  }
};


// @service to genarte resume pdf based on teh userselfsedcription,jobdesription ,and resume

export const generateResumePdf = async ({ interviewId }) => {
  try {
    const response = await api.post(
      `/api/interview/resume/pdf/${interviewId}`,
      null,
    {
    responseType: "blob",
    });
    return response.data
  } catch (e) {
    console.log("errror on generatePdf", e);
  }

}

