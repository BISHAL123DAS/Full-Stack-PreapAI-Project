

// import React, { useState } from "react";
// import "./style.css";
// import { useInterview } from "../Hook/userInterview";
// import { useNavigate } from "react-router-dom";
// import ReportList from "./Reportlist";

// const Home = () => {
//   const { loading, generateReport, reports } = useInterview();
//   const navigate = useNavigate();

//   const [fileName, setFileName] = useState("");
//   const [resumeFile, setResumeFile] = useState(null);
//   const [jobDescription, setJobDescription] = useState("");
//   const [selfDescription, setSelfDescription] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFileName(file.name);
//       setResumeFile(file);
//     }
//   };

//   const handleSubmit = async () => {
//     setError("");
//     if (!jobDescription.trim() || !selfDescription.trim() || !resumeFile) {
//       setError("Please fill all fields and upload your resume.");
//       return;
//     }
//     setSubmitting(true);
//     try {
//       const data = await generateReport({ jobDescription, selfDescription, resumeFile });
//       if (!data?._id) {
//         setError("Failed to generate report. Please try again.");
//         return;
//       }
//       navigate(`/interview/${data._id}`);
//     } catch {
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="home-container">
//         <div className="home-loading">
//           <div className="home-spinner" />
//           <p>Loading your reports…</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="home-container">
//       <div className="home-layout">

//         {/* LEFT — report history */}
//         <aside className="home-sidebar">
//           <p className="home-sidebar-label">Report history</p>
//           <ReportList reports={reports} />
//         </aside>

//         {/* RIGHT — generate form */}
//         <main className="home-main">
//           <div className="home-card">
//             <div className="home-header">
//               <h1>Interview Prep</h1>
//               <p>
//                 Generate a personalized interview report based on your resume
//                 and job description.
//               </p>
//             </div>

//             <div className="home-body">
//               <div className="left-panel">
//                 <div className="form-group full-height">
//                   <label htmlFor="jobDescription">Job Description</label>
//                   <textarea
//                     id="jobDescription"
//                     className="tall-textarea"
//                     placeholder="Paste the job description here..."
//                     value={jobDescription}
//                     onChange={(e) => setJobDescription(e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div className="right-panel">
//                 <div className="form-group">
//                   <label>Resume (PDF)</label>
//                   <label
//                     htmlFor="resume"
//                     className={`file-upload-label ${fileName ? "file-upload-label--filled" : ""}`}
//                   >
//                     <span className="file-icon-wrap">
//                       {fileName ? (
//                         <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
//                           <path d="M3 8l3.5 3.5L13 4" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//                         </svg>
//                       ) : (
//                         <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
//                           <path d="M8 2v8M5 7l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                           <path d="M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//                         </svg>
//                       )}
//                     </span>
//                     <span className="file-text">{fileName || "Click to upload resume"}</span>
//                     <span className="file-hint">{fileName ? "Change" : "PDF"}</span>
//                   </label>
//                   <input
//                     type="file"
//                     id="resume"
//                     accept=".pdf"
//                     onChange={handleFileChange}
//                     className="file-input-hidden"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="selfDescription">About Yourself</label>
//                   <textarea
//                     id="selfDescription"
//                     className="short-textarea"
//                     placeholder="Describe your experience..."
//                     value={selfDescription}
//                     onChange={(e) => setSelfDescription(e.target.value)}
//                   />
//                 </div>

//                 {error && <p className="home-error">{error}</p>}

//                 <button
//                   className={`generate-btn ${submitting ? "generate-btn--loading" : ""}`}
//                   onClick={handleSubmit}
//                   disabled={submitting}
//                 >
//                   {submitting ? (
//                     <><span className="btn-spinner" />Generating…</>
//                   ) : (
//                     "Generate Report"
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </main>

//       </div>
//     </div>
//   );
// };

// export default Home;













import React, { useState } from "react";
import "./style.css";
import { useInterview } from "../Hook/userInterview";
import { useAuth } from "../../Auth/Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ReportList from "./Reportlist";
import AppLayout from "./Applayout"; // adjust path

const Home = ( ) => {
  const { user ,handleLogout} = useAuth()
  const { loading, generateReport, reports } = useInterview();
  const navigate = useNavigate();

  const [fileName, setFileName] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setResumeFile(file);
    }
  };

  const handleSubmit = async () => {
    setError("");
    if (!jobDescription.trim() || !selfDescription.trim() || !resumeFile) {
      setError("Please fill all fields and upload your resume.");
      return;
    }
    setSubmitting(true);
    try {
      const data = await generateReport({ jobDescription, selfDescription, resumeFile });
      if (!data?._id) {
        setError("Failed to generate report. Please try again.");
        return;
      }
      navigate(`/interview/${data._id}`);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AppLayout user={user}handleLogout={handleLogout} reportCount={reports?.length}>
        <div className="home-loading">
          <div className="home-spinner" />
          <p>Loading your reports…</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout user={user} handleLogout={handleLogout} reportCount={reports?.length}>
      <div className="home-layout">

        {/* LEFT — report history */}
        <aside className="home-sidebar">
          <p className="home-sidebar-label">Report history</p>
          <ReportList reports={reports} />
        </aside>

        {/* RIGHT — generate form */}
        <main className="home-main">
          <div className="home-card">
            <div className="home-header">
              <h1>Interview Prep</h1>
              <p>
                Generate a personalized interview report based on your resume
                and job description.
              </p>
            </div>

            <div className="home-body">
              <div className="left-panel">
                <div className="form-group full-height">
                  <label htmlFor="jobDescription">Job Description</label>
                  <textarea
                    id="jobDescription"
                    className="tall-textarea"
                    placeholder="Paste the job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>
              </div>

              <div className="right-panel">
                <div className="form-group">
                  <label>Resume (PDF)</label>
                  <label
                    htmlFor="resume"
                    className={`file-upload-label ${fileName ? "file-upload-label--filled" : ""}`}
                  >
                    <span className="file-icon-wrap">
                      {fileName ? (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8l3.5 3.5L13 4" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 2v8M5 7l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      )}
                    </span>
                    <span className="file-text">{fileName || "Click to upload resume"}</span>
                    <span className="file-hint">{fileName ? "Change" : "PDF"}</span>
                  </label>
                  <input
                    type="file"
                    id="resume"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="file-input-hidden"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="selfDescription">About Yourself</label>
                  <textarea
                    id="selfDescription"
                    className="short-textarea"
                    placeholder="Describe your experience..."
                    value={selfDescription}
                    onChange={(e) => setSelfDescription(e.target.value)}
                  />
                </div>

                {error && <p className="home-error">{error}</p>}

                <button
                  className={`generate-btn ${submitting ? "generate-btn--loading" : ""}`}
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? (
                    <><span className="btn-spinner" />Generating…</>
                  ) : (
                    "Generate Report"
                  )}
                </button>
              </div>
            </div>
          </div>
        </main>

      </div>
    </AppLayout>
  );
};

export default Home;