// // import React, { useState, useEffect } from 'react';
// // import { useParams } from 'react-router-dom';
// // import './insterviewstyle.css';
// // import { useInterview } from "../Hook/userInterview";

// // const severityColor = { low: 'badge-low', medium: 'badge-medium', high: 'badge-high' };

// // const Interview = () => {
// //   const [activeSection, setActiveSection] = useState('technical');
// //   const [expandedIdx, setExpandedIdx] = useState(null);
// //   const { report, loading, getReportById,getResumePdf } = useInterview();
// //   const { interviewId } = useParams(); // ✅ match the route param name

// //   useEffect(() => {
// //     if (interviewId) getReportById(interviewId); // ✅
// //   }, [interviewId]);

// //   const navItems = [
// //     { key: 'technical', label: 'Technical questions' },
// //     { key: 'behavioral', label: 'Behavioral questions' },
// //     { key: 'roadmap', label: 'Road map' },
// //   ];

// //   const toggle = (i) => setExpandedIdx(expandedIdx === i ? null : i);

// //   if (loading) return <h2>Loading report...</h2>;
// //   if (!report) return <h2>No report found.</h2>;

// //   const renderContent = () => {
// //     if (activeSection === 'technical') {
// //       return (
// //         <div className="question-list">
// //           {report.technicalQuestions.map((q, i) => (
// //             <div key={i} className={`question-card ${expandedIdx === i ? 'open' : ''}`}>
// //               <button className="question-header" onClick={() => toggle(i)}>
// //                 <span className="q-number">Q{i + 1}</span>
// //                 <span className="q-text">{q.question}</span>
// //                 <span className="q-chevron">{expandedIdx === i ? '▲' : '▼'}</span>
// //               </button>
// //               {expandedIdx === i && (
// //                 <div className="question-body">
// //                   <div className="q-section">
// //                     <span className="q-label">Intention</span>
// //                     <p>{q.intention}</p>
// //                   </div>
// //                   <div className="q-section">
// //                     <span className="q-label">How to answer</span>
// //                     <p>{q.answer}</p>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //       );
// //     }

// //     if (activeSection === 'behavioral') {
// //       return (
// //         <div className="question-list">
// //           {report.behavioralQuestions.map((q, i) => (
// //             <div key={i} className={`question-card ${expandedIdx === i ? 'open' : ''}`}>
// //               <button className="question-header" onClick={() => toggle(i)}>
// //                 <span className="q-number">B{i + 1}</span>
// //                 <span className="q-text">{q.question}</span>
// //                 <span className="q-chevron">{expandedIdx === i ? '▲' : '▼'}</span>
// //               </button>
// //               {expandedIdx === i && (
// //                 <div className="question-body">
// //                   <div className="q-section">
// //                     <span className="q-label">Intention</span>
// //                     <p>{q.intention}</p>
// //                   </div>
// //                   <div className="q-section">
// //                     <span className="q-label">How to answer</span>
// //                     <p>{q.answer}</p>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //       );
// //     }

// //     if (activeSection === 'roadmap') {
// //       return (
// //         <div className="roadmap-list">
// //           {report.preparationPlan.map((day, i) => (
// //             <div key={i} className="roadmap-card">
// //               <div className="roadmap-day-badge">Day {day.day}</div>
// //               <div className="roadmap-content">
// //                 <p className="roadmap-focus">{day.focus}</p>
// //                 <ul className="roadmap-tasks">
// //                   {day.tasks.map((task, j) => (
// //                     <li key={j}>{task}</li>
// //                   ))}
// //                 </ul>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       );
// //     }
// //   };

// //   return (
// //     <div className="iv-container">
// //       <div className="iv-layout">

// //         {/* LEFT NAV */}
// //         <aside className="iv-sidebar">
// //           <nav className="iv-nav">
// //             {navItems.map(item => (
// //               <button
// //                 key={item.key}
// //                 className={`nav-btn ${activeSection === item.key ? 'active' : ''}`}
// //                 onClick={() => { setActiveSection(item.key); setExpandedIdx(null); }}
// //               >
// //                 {item.label}
// //               </button>
// //             ))}
// //           </nav>
// //         </aside>

// //         {/* MAIN CONTENT */}
// //         <main className="iv-main">
// //           <h2 className="section-title">
// //             {navItems.find(n => n.key === activeSection)?.label}
// //           </h2>
// //           {renderContent()}
// //         </main>

// //         {/* RIGHT — SKILL GAPS */}
// //         <aside className="iv-right">
// //           <div className="score-card">
// //             <span className="score-label">Match score</span>
// //             <span className="score-value">{report.matchScore}%</span>
// //             <div className="score-bar">
// //               <div className="score-fill" style={{ width: `${report.matchScore}%` }} />
// //             </div>
// //           </div>
// //           <p className="skill-title">Skill gaps</p>
// //           <div className="skill-list">
// //             {report.skillGap.map((s, i) => (
// //               <div key={i} className="skill-item">
// //                 <span className="skill-name">{s.skill}</span>
// //                 <span className={`badge ${severityColor[s.severity]}`}>{s.severity}</span>
// //               </div>
// //             ))}
// //           </div>

// //           <button className="pdfgenerate-btn" onClick={()=>{getResumePdf(interviewId)}} >
// //             Download AI genarated Resume

// //           </button>
// //         </aside>

// //       </div>
// //     </div>
// //   );
// // };

// // export default Interview;












// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import './insterviewstyle.css';
// import { useInterview } from "../Hook/userInterview";
// import AppLayout from "../../../Components/Layout/AppLayout"; // adjust path

// const severityColor = { low: 'badge-low', medium: 'badge-medium', high: 'badge-high' };

// const Interview = ({ user, onLogout }) => {
//   const [activeSection, setActiveSection] = useState('technical');
//   const [expandedIdx, setExpandedIdx] = useState(null);
//   const { report, loading, getReportById, getResumePdf, reports } = useInterview();
//   const { interviewId } = useParams();

//   useEffect(() => {
//     if (interviewId) getReportById(interviewId);
//   }, [interviewId]);

//   const navItems = [
//     { key: 'technical', label: 'Technical questions' },
//     { key: 'behavioral', label: 'Behavioral questions' },
//     { key: 'roadmap', label: 'Road map' },
//   ];

//   const toggle = (i) => setExpandedIdx(expandedIdx === i ? null : i);

//   if (loading) {
//     return (
//       <AppLayout user={user} onLogout={onLogout} reportCount={reports?.length}>
//         <div className="home-loading">
//           <div className="home-spinner" />
//           <p>Loading report…</p>
//         </div>
//       </AppLayout>
//     );
//   }

//   if (!report) {
//     return (
//       <AppLayout user={user} onLogout={onLogout} reportCount={reports?.length}>
//         <div className="home-loading">
//           <p style={{ color: '#94a3b8' }}>No report found.</p>
//         </div>
//       </AppLayout>
//     );
//   }

//   const renderContent = () => {
//     if (activeSection === 'technical') {
//       return (
//         <div className="question-list">
//           {report.technicalQuestions.map((q, i) => (
//             <div key={i} className={`question-card ${expandedIdx === i ? 'open' : ''}`}>
//               <button className="question-header" onClick={() => toggle(i)}>
//                 <span className="q-number">Q{i + 1}</span>
//                 <span className="q-text">{q.question}</span>
//                 <span className="q-chevron">{expandedIdx === i ? '▲' : '▼'}</span>
//               </button>
//               {expandedIdx === i && (
//                 <div className="question-body">
//                   <div className="q-section">
//                     <span className="q-label">Intention</span>
//                     <p>{q.intention}</p>
//                   </div>
//                   <div className="q-section">
//                     <span className="q-label">How to answer</span>
//                     <p>{q.answer}</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       );
//     }

//     if (activeSection === 'behavioral') {
//       return (
//         <div className="question-list">
//           {report.behavioralQuestions.map((q, i) => (
//             <div key={i} className={`question-card ${expandedIdx === i ? 'open' : ''}`}>
//               <button className="question-header" onClick={() => toggle(i)}>
//                 <span className="q-number">B{i + 1}</span>
//                 <span className="q-text">{q.question}</span>
//                 <span className="q-chevron">{expandedIdx === i ? '▲' : '▼'}</span>
//               </button>
//               {expandedIdx === i && (
//                 <div className="question-body">
//                   <div className="q-section">
//                     <span className="q-label">Intention</span>
//                     <p>{q.intention}</p>
//                   </div>
//                   <div className="q-section">
//                     <span className="q-label">How to answer</span>
//                     <p>{q.answer}</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       );
//     }

//     if (activeSection === 'roadmap') {
//       return (
//         <div className="roadmap-list">
//           {report.preparationPlan.map((day, i) => (
//             <div key={i} className="roadmap-card">
//               <div className="roadmap-day-badge">Day {day.day}</div>
//               <div className="roadmap-content">
//                 <p className="roadmap-focus">{day.focus}</p>
//                 <ul className="roadmap-tasks">
//                   {day.tasks.map((task, j) => (
//                     <li key={j}>{task}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>
//       );
//     }
//   };

//   return (
//     <AppLayout user={user} onLogout={onLogout} reportCount={reports?.length}>
//       <div className="iv-layout">

//         {/* LEFT NAV */}
//         <aside className="iv-sidebar">
//           <nav className="iv-nav">
//             {navItems.map(item => (
//               <button
//                 key={item.key}
//                 className={`nav-btn ${activeSection === item.key ? 'active' : ''}`}
//                 onClick={() => { setActiveSection(item.key); setExpandedIdx(null); }}
//               >
//                 {item.label}
//               </button>
//             ))}
//           </nav>
//         </aside>

//         {/* MAIN CONTENT */}
//         <main className="iv-main">
//           <h2 className="section-title">
//             {navItems.find(n => n.key === activeSection)?.label}
//           </h2>
//           {renderContent()}
//         </main>

//         {/* RIGHT — SKILL GAPS */}
//         <aside className="iv-right">
//           <div className="score-card">
//             <span className="score-label">Match score</span>
//             <span className="score-value">{report.matchScore}%</span>
//             <div className="score-bar">
//               <div className="score-fill" style={{ width: `${report.matchScore}%` }} />
//             </div>
//           </div>
//           <p className="skill-title">Skill gaps</p>
//           <div className="skill-list">
//             {report.skillGap.map((s, i) => (
//               <div key={i} className="skill-item">
//                 <span className="skill-name">{s.skill}</span>
//                 <span className={`badge ${severityColor[s.severity]}`}>{s.severity}</span>
//               </div>
//             ))}
//           </div>

//           <button className="pdfgenerate-btn" onClick={() => getResumePdf(interviewId)}>
//             <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
//               <path d="M7.5 2v8M4.5 7l3 3 3-3" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
//               <path d="M2.5 13h10" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/>
//             </svg>
//             Download AI Resume
//           </button>
//         </aside>

//       </div>
//     </AppLayout>
//   );
// };

// export default Interview;










import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './insterviewstyle.css';
import { useInterview } from "../Hook/userInterview";
import AppLayout from "./Applayout";
import { useAuth } from "../../Auth/Hooks/useAuth";
import { FaBrain } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";

const severityColor = { low: 'badge-low', medium: 'badge-medium', high: 'badge-high' };

const Interview = () => {
   const { user,handleLogout } = useAuth()
  const [activeSection, setActiveSection] = useState('technical');
  const [expandedIdx, setExpandedIdx] = useState(null);
  const { report, loading, getReportById, getResumePdf, reports } = useInterview();
  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) getReportById(interviewId);
  }, [interviewId]);

  const navItems = [
    { key: 'technical', label: 'Technical questions' },
    { key: 'behavioral', label: 'Behavioral questions' },
    { key: 'roadmap', label: 'Road map' },
  ];

  const toggle = (i) => setExpandedIdx(expandedIdx === i ? null : i);

  if (loading) {
    return (
      <AppLayout user={user} handleLogout={handleLogout}reportCount={reports?.length}>
        <div className="home-loading">
          <div className="home-spinner" />
          <p>Loading report…</p>
        </div>
      </AppLayout>
    );
  }

  if (!report) {
    return (
      <AppLayout user={user} handleLogout={handleLogout} reportCount={reports?.length}>
        <div className="home-loading">
          <p style={{ color: '#94a3b8' }}>No report found.</p>
        </div>
      </AppLayout>
    );
  }

  const renderContent = () => {
    if (activeSection === 'technical') {
      return (
        <div className="question-list">
          {report.technicalQuestions.map((q, i) => (
            <div key={i} className={`question-card ${expandedIdx === i ? 'open' : ''}`}>
              <button className="question-header" onClick={() => toggle(i)}>
                <span className="q-number">Q{i + 1}</span>
                <span className="q-text">{q.question}</span>
                <span className="q-chevron">{expandedIdx === i ? '▲' : '▼'}</span>
              </button>
              {expandedIdx === i && (
                <div className="question-body">
                  <div className="q-section">
                    <span className="q-label">Intention</span>
                    <p>{q.intention}</p>
                  </div>
                  <div className="q-section">
                    <span className="q-label">How to answer</span>
                    <p>{q.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    if (activeSection === 'behavioral') {
      return (
        <div className="question-list">
          {report.behavioralQuestions.map((q, i) => (
            <div key={i} className={`question-card ${expandedIdx === i ? 'open' : ''}`}>
              <button className="question-header" onClick={() => toggle(i)}>
                <span className="q-number">B{i + 1}</span>
                <span className="q-text">{q.question}</span>
                <span className="q-chevron">{expandedIdx === i ? '▲' : '▼'}</span>
              </button>
              {expandedIdx === i && (
                <div className="question-body">
                  <div className="q-section">
                    <span className="q-label">Intention</span>
                    <p>{q.intention}</p>
                  </div>
                  <div className="q-section">
                    <span className="q-label">How to answer</span>
                    <p>{q.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    if (activeSection === 'roadmap') {
      return (
        <div className="roadmap-list">
          {report.preparationPlan.map((day, i) => (
            <div key={i} className="roadmap-card">
              <div className="roadmap-day-badge">Day {day.day}</div>
              <div className="roadmap-content">
                <p className="roadmap-focus">{day.focus}</p>
                <ul className="roadmap-tasks">
                  {day.tasks.map((task, j) => (
                    <li key={j}>{task}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <AppLayout user={user}  reportCount={reports?.length}>
      <div className="iv-layout">

        {/* LEFT NAV */}
        <aside className="iv-sidebar">
          <nav className="iv-nav">
            {navItems.map(item => (
              <button
                key={item.key}
                className={`nav-btn ${activeSection === item.key ? 'active' : ''}`}
                onClick={() => { setActiveSection(item.key); setExpandedIdx(null); }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="iv-main">
          <h2 className="section-title">
            {navItems.find(n => n.key === activeSection)?.label}
          </h2>
          {renderContent()}
        </main>

        {/* RIGHT — SKILL GAPS */}
        <aside className="iv-right">
          <div className="score-card">
            <span className="score-label">Match score</span>
            <span className="score-value">{report.matchScore}%</span>
            <div className="score-bar">
              <div className="score-fill" style={{ width: `${report.matchScore}%` }} />
            </div>
          </div>
          <p className="skill-title">Skill gaps</p>
          <div className="skill-list">
            {report.skillGap.map((s, i) => (
              <div key={i} className="skill-item">
                <span className="skill-name">{s.skill}</span>
                <span className={`badge ${severityColor[s.severity]}`}>{s.severity}</span>
              </div>
            ))}
          </div>

          <button className="pdfgenerate-btn" onClick={() => getResumePdf(interviewId)}>
            <FaBrain />
            {/* <FiDownload /> */}
            Download AI Resume
          </button>
        </aside>

      </div>
    </AppLayout>
  );
};

export default Interview;