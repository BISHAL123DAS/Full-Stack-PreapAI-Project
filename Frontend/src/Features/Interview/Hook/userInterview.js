import {
  generateInterviewReport,
  getInterviewReportById,
  getAllInterviewReports,
  generateResumePdf,
} from "../Pages/Services/interview.api";

import { useContext,useEffect } from "react";
import { useParams } from "react-router"
import { InterviewContext } from "../interview.context";


export const useInterview = () => {
  const context = useContext(InterviewContext);
  const { interviewId } = useParams()
    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

  const { loading, setLoading, report, setReport, reports, setReports } =  context;
  
  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {

    setLoading(true);
    let response =null
    try {
      response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      setReport(response.interviewReport);
    } catch (err) {
      console.log("errr", err);
    } finally {
      setLoading(false);
    }
    return response.interviewReport
  };


  const getReportById = async (interviewID) => {
    setLoading(true);
    let response = null;
    try {
      response = await getInterviewReportById(interviewID); // ✅ assigns outer variable
      setReport(response.interviewReport);
    } catch (err) {
      console.log("errr", err);
    } finally {
      setLoading(false);
    }
    return response?.interviewReport; // ✅ optional chaining for safety
  };
  

  const getReports = async () => {
    setLoading(true);
    let response = null;
  
    try {
      response = await getAllInterviewReports();
      setReports(response?.interviewReports || []); 
    } catch (err) {
      console.error("getReports error:", err);
    } finally {
      setLoading(false);
    }
  
    return response?.interviewReports || [];
  };

  const getResumePdf = async (interviewId) => {
    setLoading(true);
  
    try {
      const response = await generateResumePdf({ interviewId });
  
      const url = window.URL.createObjectURL(
        new Blob([response], { type: "application/pdf" })
      );
  
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume_${interviewId}.pdf`);
  
      document.body.appendChild(link);
      link.click();
  
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log("error", err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    } else {
      getReports();
    }
  }, [interviewId]);

  return {loading, setLoading, report, setReport, reports, setReports,generateReport,getReportById,getReports,getResumePdf}
};
