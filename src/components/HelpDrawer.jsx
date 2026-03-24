// // Help Drawer Component
// // A reusable slide-over panel with glassmorphism styling
// import { useState, useEffect } from 'react';

// const HelpDrawer = ({ isOpen, onClose, content }) => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     if (isOpen) {
//       setIsVisible(true);
//     } else {
//       const timer = setTimeout(() => setIsVisible(false), 300);
//       return () => clearTimeout(timer);
//     }
//   }, [isOpen]);

//   if (!isVisible && !isOpen) return null;

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         style={{
//           ...styles.backdrop,
//           opacity: isOpen ? 1 : 0,
//           pointerEvents: isOpen ? 'auto' : 'none',
//         }}
//         onClick={onClose}
//       />

//       {/* Drawer */}
//       <div
//         style={{
//           ...styles.drawer,
//           transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
//         }}
//       >
//         {/* Header */}
//         <div style={styles.header}>
//           <div style={styles.headerContent}>
//             <span style={styles.icon}>📚</span>
//             <h2 style={styles.title}>Task Instructions</h2>
//           </div>
//           <button style={styles.closeButton} onClick={onClose}>
//             ✕
//           </button>
//         </div>

//         {/* Content */}
//         <div style={styles.content}>
//           {content && (
//             <>
//               {/* Page Title */}
//               {content.pageTitle && (
//                 <div style={styles.section}>
//                   <h3 style={styles.sectionTitle}>{content.pageTitle}</h3>
//                 </div>
//               )}

//               {/* Task Description */}
//               {content.task && (
//                 <div style={styles.section}>
//                   <h4 style={styles.subTitle}>📋 Task</h4>
//                   <p style={styles.text}>{content.task}</p>
//                 </div>
//               )}

//               {/* Implementation Steps */}
//               {content.steps && content.steps.length > 0 && (
//                 <div style={styles.section}>
//                   <h4 style={styles.subTitle}>✅ Implementation Steps</h4>
//                   <ul style={styles.list}>
//                     {content.steps.map((step, index) => (
//                       <li key={index} style={styles.listItem}>
//                         {step}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {/* API Endpoints */}
//               {content.apis && content.apis.length > 0 && (
//                 <div style={styles.section}>
//                   <h4 style={styles.subTitle}>🔌 API Endpoints</h4>
//                   {content.apis.map((api, index) => (
//                     <div key={index} style={styles.apiBox}>
//                       <div style={styles.apiHeader}>
//                         <span style={styles.method(api.method)}>{api.method}</span>
//                         <code style={styles.endpoint}>{api.endpoint}</code>
//                       </div>
//                       {api.description && (
//                         <p style={styles.apiDescription}>{api.description}</p>
//                       )}
//                       {api.params && (
//                         <div style={styles.apiParams}>
//                           <strong style={styles.paramsLabel}>Params:</strong>
//                           <code style={styles.paramsCode}>{api.params}</code>
//                         </div>
//                       )}
//                       {api.body && (
//                         <div style={styles.apiParams}>
//                           <strong style={styles.paramsLabel}>Body:</strong>
//                           <pre style={styles.bodyCode}>{JSON.stringify(api.body, null, 2)}</pre>
//                         </div>
//                       )}
//                       {api.queryParams && (
//                         <div style={styles.apiParams}>
//                           <strong style={styles.paramsLabel}>Query Params:</strong>
//                           <code style={styles.paramsCode}>{api.queryParams}</code>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Important Notes */}
//               {content.notes && content.notes.length > 0 && (
//                 <div style={styles.section}>
//                   <h4 style={styles.subTitle}>💡 Important Notes</h4>
//                   <ul style={styles.list}>
//                     {content.notes.map((note, index) => (
//                       <li key={index} style={styles.listItem}>
//                         {note}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {/* Expected Behavior */}
//               {content.expectedBehavior && (
//                 <div style={styles.section}>
//                   <h4 style={styles.subTitle}>🎯 Expected Behavior</h4>
//                   <p style={styles.text}>{content.expectedBehavior}</p>
//                 </div>
//               )}

//               {/* Service File Reference */}
//               {content.serviceFile && (
//                 <div style={styles.section}>
//                   <h4 style={styles.subTitle}>📁 Service File</h4>
//                   <code style={styles.serviceFile}>{content.serviceFile}</code>
//                   <p style={styles.serviceNote}>
//                     Implement API calls in this file using Axios
//                   </p>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// const styles = {
//   backdrop: {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.3)',
//     zIndex: 998,
//     transition: 'opacity 0.3s ease',
//   },
//   drawer: {
//     position: 'fixed',
//     top: 0,
//     right: 0,
//     bottom: 0,
//     width: '480px',
//     maxWidth: '90vw',
//     background: 'rgba(255, 255, 255, 0.95)',
//     backdropFilter: 'blur(20px)',
//     WebkitBackdropFilter: 'blur(20px)',
//     boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.2)',
//     zIndex: 999,
//     transition: 'transform 0.3s ease',
//     display: 'flex',
//     flexDirection: 'column',
//     border: '1px solid rgba(255, 255, 255, 0.3)',
//   },
//   header: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: '24px',
//     borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
//     background: 'rgba(255, 255, 255, 0.5)',
//     backdropFilter: 'blur(10px)',
//   },
//   headerContent: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '12px',
//   },
//   icon: {
//     fontSize: '24px',
//   },
//   title: {
//     margin: 0,
//     fontSize: '20px',
//     fontWeight: '600',
//     color: '#1a1a1a',
//   },
//   closeButton: {
//     background: 'rgba(0, 0, 0, 0.05)',
//     border: 'none',
//     borderRadius: '6px',
//     width: '32px',
//     height: '32px',
//     fontSize: '18px',
//     cursor: 'pointer',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     color: '#666',
//     transition: 'all 0.2s',
//   },
//   content: {
//     flex: 1,
//     overflowY: 'auto',
//     padding: '24px',
//   },
//   section: {
//     marginBottom: '28px',
//   },
//   sectionTitle: {
//     fontSize: '18px',
//     fontWeight: '600',
//     color: '#2563eb',
//     margin: '0 0 12px 0',
//   },
//   subTitle: {
//     fontSize: '16px',
//     fontWeight: '600',
//     color: '#1a1a1a',
//     margin: '0 0 12px 0',
//   },
//   text: {
//     fontSize: '14px',
//     lineHeight: '1.6',
//     color: '#4a5568',
//     margin: '0',
//   },
//   list: {
//     margin: '0',
//     paddingLeft: '20px',
//   },
//   listItem: {
//     fontSize: '14px',
//     lineHeight: '1.8',
//     color: '#4a5568',
//     marginBottom: '8px',
//   },
//   apiBox: {
//     background: 'rgba(255, 255, 255, 0.6)',
//     backdropFilter: 'blur(10px)',
//     border: '1px solid rgba(37, 99, 235, 0.2)',
//     borderRadius: '8px',
//     padding: '16px',
//     marginBottom: '12px',
//   },
//   apiHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '12px',
//     marginBottom: '8px',
//     flexWrap: 'wrap',
//   },
//   method: (method) => ({
//     display: 'inline-block',
//     padding: '4px 10px',
//     borderRadius: '4px',
//     fontSize: '12px',
//     fontWeight: '600',
//     color: '#fff',
//     backgroundColor:
//       method === 'GET' ? '#10b981' :
//       method === 'POST' ? '#3b82f6' :
//       method === 'PUT' ? '#f59e0b' :
//       method === 'PATCH' ? '#8b5cf6' :
//       method === 'DELETE' ? '#ef4444' : '#6b7280',
//   }),
//   endpoint: {
//     fontSize: '13px',
//     fontFamily: 'monospace',
//     color: '#1e40af',
//     background: 'rgba(37, 99, 235, 0.1)',
//     padding: '4px 8px',
//     borderRadius: '4px',
//   },
//   apiDescription: {
//     fontSize: '13px',
//     color: '#4a5568',
//     margin: '8px 0',
//   },
//   apiParams: {
//     marginTop: '8px',
//   },
//   paramsLabel: {
//     fontSize: '12px',
//     color: '#374151',
//     display: 'block',
//     marginBottom: '4px',
//   },
//   paramsCode: {
//     fontSize: '12px',
//     fontFamily: 'monospace',
//     color: '#059669',
//     background: 'rgba(16, 185, 129, 0.1)',
//     padding: '4px 8px',
//     borderRadius: '4px',
//     display: 'inline-block',
//   },
//   bodyCode: {
//     fontSize: '12px',
//     fontFamily: 'monospace',
//     color: '#059669',
//     background: 'rgba(16, 185, 129, 0.1)',
//     padding: '8px',
//     borderRadius: '4px',
//     margin: 0,
//     whiteSpace: 'pre-wrap',
//     wordBreak: 'break-word',
//   },
//   serviceFile: {
//     fontSize: '13px',
//     fontFamily: 'monospace',
//     color: '#7c3aed',
//     background: 'rgba(139, 92, 246, 0.1)',
//     padding: '8px 12px',
//     borderRadius: '4px',
//     display: 'block',
//     marginBottom: '8px',
//   },
//   serviceNote: {
//     fontSize: '12px',
//     color: '#6b7280',
//     fontStyle: 'italic',
//     margin: 0,
//   },
// };

// export default HelpDrawer;
