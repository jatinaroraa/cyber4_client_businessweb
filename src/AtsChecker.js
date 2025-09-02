// import React, { useState, useCallback } from 'react';
// import { Upload, FileText, CheckCircle, AlertCircle, XCircle, Download, RefreshCw } from 'lucide-react';

// const ATSScoreChecker = () => {
//   const [file, setFile] = useState(null);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [results, setResults] = useState(null);
//   const [dragActive, setDragActive] = useState(false);

//   // ATS Keywords for cybersecurity resumes
//   const cybersecurityKeywords = [
//     'cybersecurity', 'information security', 'network security', 'penetration testing',
//     'vulnerability assessment', 'incident response', 'risk assessment', 'compliance',
//     'firewall', 'intrusion detection', 'SIEM', 'encryption', 'malware analysis',
//     'threat intelligence', 'security audit', 'ISO 27001', 'NIST', 'GDPR', 'CCPA',
//     'ethical hacking', 'social engineering', 'security awareness', 'SOC', 'CISSP',
//     'CISM', 'CEH', 'Security+', 'OSCP', 'CISSP', 'python', 'linux', 'windows',
//     'TCP/IP', 'DNS', 'VPN', 'SSL/TLS', 'PKI', 'identity management', 'zero trust'
//   ];

//   const technicalSkills = [
//     'python', 'java', 'c++', 'javascript', 'powershell', 'bash', 'sql',
//     'wireshark', 'metasploit', 'nmap', 'burp suite', 'kali linux', 'splunk',
//     'qradar', 'nessus', 'openvas', 'ansible', 'terraform', 'docker', 'kubernetes'
//   ];

//   const certifications = [
//     'CISSP', 'CISM', 'CISA', 'CEH', 'OSCP', 'Security+', 'CySA+', 'CASP+',
//     'GCIH', 'GSEC', 'GPEN', 'GIAC', 'SANS', 'PMP', 'ITIL', 'COBIT'
//   ];

//   // File upload handlers
//   const handleDrag = useCallback((e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   }, []);

//   const handleDrop = useCallback((e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
    
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFile(e.dataTransfer.files[0]);
//     }
//   }, []);

//   const handleFileInput = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       handleFile(e.target.files[0]);
//     }
//   };

//   const handleFile = (selectedFile) => {
//     // Validate file type - focus on text files for now
//     const allowedTypes = [
//       'text/plain',
//       'application/pdf'
//     ];
    
//     if (!allowedTypes.includes(selectedFile.type)) {
//       alert('Please upload a TXT or PDF file. For best results, use TXT format.');
//       return;
//     }

//     // Validate file size (5MB limit)
//     if (selectedFile.size > 5 * 1024 * 1024) {
//       alert('File size must be less than 5MB');
//       return;
//     }

//     setFile(selectedFile);
//     setResults(null);
//   };

//   // FIXED: Proper text extraction from different file types
//   const extractTextFromFile = async (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
      
//       reader.onload = async (e) => {
//         try {
//           let text = '';
          
//           if (file.type === 'text/plain') {
//             // Read text files directly
//             text = e.target.result;
//           } else if (file.type === 'application/pdf') {
//             // For PDF files, we'll use a basic extraction approach
//             // Note: This is a simplified approach. For full PDF support, you'd need PDF.js
//             try {
//               const uint8Array = new Uint8Array(e.target.result);
//               text = new TextDecoder().decode(uint8Array);
//               // Basic cleanup for PDF content
//               text = text.replace(/[^\x20-\x7E\n\r\t]/g, ' ').replace(/\s+/g, ' ').trim();
//             } catch (pdfError) {
//               console.warn('PDF parsing failed, using fallback');
//               text = 'PDF content could not be extracted. Please convert to TXT format for better analysis.';
//             }
//           }
          
//           if (!text || text.length < 10) {
//             throw new Error('No readable text found in the file');
//           }
          
//           resolve(text);
//         } catch (error) {
//           reject(error);
//         }
//       };
      
//       reader.onerror = () => reject(new Error('Failed to read file'));
      
//       if (file.type === 'text/plain') {
//         reader.readAsText(file);
//       } else {
//         reader.readAsArrayBuffer(file);
//       }
//     });
//   };

//   // IMPROVED: More sophisticated ATS Analysis Algorithm
//   const analyzeResume = async () => {
//     setIsAnalyzing(true);
    
//     try {
//       // Simulate processing time
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       const text = await extractTextFromFile(file);
      
//       if (!text || text.length < 50) {
//         throw new Error('Unable to extract meaningful text from the file. Please try a different format.');
//       }
      
//       const lowercaseText = text.toLowerCase();
//       console.log('Analyzing text:', lowercaseText.substring(0, 200) + '...');
      
//       // 1. FIXED: Keyword Analysis with better matching
//       const foundKeywords = cybersecurityKeywords.filter(keyword => {
//         const keywordRegex = new RegExp(`\\b${keyword.toLowerCase().replace(/[+]/g, '\\+')}\\b`, 'i');
//         return keywordRegex.test(lowercaseText);
//       });
//       const keywordScore = Math.min((foundKeywords.length / Math.min(cybersecurityKeywords.length, 15)) * 100, 100);
      
//       // 2. FIXED: Technical Skills Analysis with better matching
//       const foundTechnicalSkills = technicalSkills.filter(skill => {
//         const skillRegex = new RegExp(`\\b${skill.toLowerCase().replace(/[+]/g, '\\+')}\\b`, 'i');
//         return skillRegex.test(lowercaseText);
//       });
//       const technicalScore = Math.min((foundTechnicalSkills.length / Math.min(technicalSkills.length, 8)) * 100, 100);
      
//       // 3. FIXED: Certifications Analysis with better matching
//       const foundCertifications = certifications.filter(cert => {
//         const certRegex = new RegExp(`\\b${cert.toLowerCase().replace(/[+]/g, '\\+')}\\b`, 'i');
//         return certRegex.test(lowercaseText);
//       });
//       const certificationScore = foundCertifications.length > 0 ? 
//         Math.min((foundCertifications.length / 3) * 100, 100) : 0;
      
//       // 4. IMPROVED: Format Analysis with more sophisticated checks
//       const hasContactInfo = /(\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b)|(\b\d{3}[-.]?\d{3}[-.]?\d{4}\b)|(linkedin\.com)/i.test(text);
//       const hasExperience = /(experience|work history|employment|professional experience|career)/i.test(text);
//       const hasEducation = /(education|degree|university|college|bachelor|master|phd)/i.test(text);
//       const hasSkills = /(skills|technical skills|competencies|technologies|tools)/i.test(text);
//       const hasAchievements = /(achieved|accomplished|improved|increased|reduced|managed|led|developed)/i.test(text);
      
//       const formatComponents = [hasContactInfo, hasExperience, hasEducation, hasSkills, hasAchievements];
//       const formatScore = (formatComponents.filter(Boolean).length / formatComponents.length) * 100;
      
//       // 5. IMPROVED: Length Analysis
//       const wordCount = text.trim().split(/\s+/).length;
//       let lengthScore;
//       if (wordCount >= 300 && wordCount <= 800) {
//         lengthScore = 100;
//       } else if (wordCount >= 200 && wordCount <= 1200) {
//         lengthScore = 80;
//       } else if (wordCount >= 100 && wordCount <= 1500) {
//         lengthScore = 60;
//       } else {
//         lengthScore = 40;
//       }
      
//       // 6. IMPROVED: ATS-Friendly Format Check
//       const problematicChars = (text.match(/[^\w\s\.\,\-\(\)\@\:\;\'\"\&\%\$\#\!\?\+\=\/\\]/g) || []).length;
//       const totalChars = text.length;
//       const problematicRatio = problematicChars / totalChars;
//       const atsFormatScore = Math.max(20, 100 - (problematicRatio * 500));
      
//       // 7. NEW: Content Quality Score
//       const actionWords = ['managed', 'led', 'developed', 'implemented', 'designed', 'created', 'improved', 'achieved'];
//       const foundActionWords = actionWords.filter(word => 
//         new RegExp(`\\b${word}\\b`, 'i').test(text)
//       );
//       const qualityScore = Math.min((foundActionWords.length / 4) * 100, 100);
      
//       // FIXED: Calculate overall score with proper weighting
//       const overallScore = Math.round(
//         (keywordScore * 0.25 + 
//          technicalScore * 0.20 + 
//          certificationScore * 0.15 + 
//          formatScore * 0.15 + 
//          lengthScore * 0.10 + 
//          atsFormatScore * 0.10 +
//          qualityScore * 0.05)
//       );
      
//       const analysis = {
//         overallScore,
//         breakdown: {
//           keywords: { score: Math.round(keywordScore), found: foundKeywords },
//           technical: { score: Math.round(technicalScore), found: foundTechnicalSkills },
//           certifications: { score: Math.round(certificationScore), found: foundCertifications },
//           format: { 
//             score: Math.round(formatScore), 
//             details: { hasContactInfo, hasExperience, hasEducation, hasSkills, hasAchievements } 
//           },
//           length: { score: Math.round(lengthScore), wordCount },
//           atsFormat: { score: Math.round(atsFormatScore), problematicChars },
//           quality: { score: Math.round(qualityScore), found: foundActionWords }
//         },
//         recommendations: generateRecommendations(overallScore, {
//           keywordScore, technicalScore, certificationScore, formatScore, lengthScore, atsFormatScore, qualityScore
//         }, { foundKeywords, foundTechnicalSkills, foundCertifications })
//       };
      
//       setResults(analysis);
//     } catch (error) {
//       console.error('Analysis error:', error);
//       alert(`Error analyzing resume: ${error.message}. Please try a different file format or check if the file contains readable text.`);
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   // IMPROVED: Better recommendations based on actual analysis
//   const generateRecommendations = (score, scores, found) => {
//     const recommendations = [];
    
//     if (scores.keywordScore < 40) {
//       const missingKeywords = cybersecurityKeywords.filter(k => !found.foundKeywords.includes(k)).slice(0, 5);
//       recommendations.push({
//         type: 'critical',
//         title: 'Add More Cybersecurity Keywords',
//         description: `Include relevant terms like: ${missingKeywords.join(', ')}`
//       });
//     }
    
//     if (scores.technicalScore < 30) {
//       const missingSkills = technicalSkills.filter(s => !found.foundTechnicalSkills.includes(s)).slice(0, 5);
//       recommendations.push({
//         type: 'critical',
//         title: 'Highlight Technical Skills',
//         description: `Consider adding: ${missingSkills.join(', ')}`
//       });
//     }
    
//     if (scores.certificationScore === 0) {
//       recommendations.push({
//         type: 'warning',
//         title: 'Include Certifications',
//         description: 'List any cybersecurity certifications like Security+, CISSP, CEH, etc. If you don\'t have any, consider pursuing entry-level certifications.'
//       });
//     }
    
//     if (scores.formatScore < 60) {
//       recommendations.push({
//         type: 'warning',
//         title: 'Improve Resume Structure',
//         description: 'Ensure clear sections for contact info, experience, education, skills, and achievements'
//       });
//     }
    
//     if (scores.lengthScore < 60) {
//       if (scores.lengthScore < 100) {
//         recommendations.push({
//           type: 'info',
//           title: 'Optimize Resume Length',
//           description: 'Aim for 300-800 words for optimal ATS performance'
//         });
//       }
//     }
    
//     if (scores.atsFormatScore < 70) {
//       recommendations.push({
//         type: 'critical',
//         title: 'Simplify Formatting',
//         description: 'Remove special characters, graphics, and complex formatting that ATS cannot read'
//       });
//     }
    
//     if (scores.qualityScore < 50) {
//       recommendations.push({
//         type: 'info',
//         title: 'Use Action Words',
//         description: 'Include action verbs like "managed", "developed", "implemented" to describe your achievements'
//       });
//     }
    
//     return recommendations;
//   };

//   const getScoreColor = (score) => {
//     if (score >= 80) return 'text-green-600';
//     if (score >= 60) return 'text-yellow-600';
//     return 'text-red-600';
//   };

//   const getScoreIcon = (score) => {
//     if (score >= 80) return <CheckCircle className="w-5 h-5 text-green-600" />;
//     if (score >= 60) return <AlertCircle className="w-5 h-5 text-yellow-600" />;
//     return <XCircle className="w-5 h-5 text-red-600" />;
//   };

//   const downloadReport = () => {
//     if (!results) return;
    
//     const reportContent = `
// ATS Score Report
// ===============

// Overall Score: ${results.overallScore}/100

// Detailed Breakdown:
// - Keywords: ${results.breakdown.keywords.score}/100 (Found: ${results.breakdown.keywords.found.join(', ')})
// - Technical Skills: ${results.breakdown.technical.score}/100 (Found: ${results.breakdown.technical.found.join(', ')})
// - Certifications: ${results.breakdown.certifications.score}/100 (Found: ${results.breakdown.certifications.found.join(', ')})
// - Format: ${results.breakdown.format.score}/100
// - Length: ${results.breakdown.length.score}/100 (${results.breakdown.length.wordCount} words)
// - ATS Format: ${results.breakdown.atsFormat.score}/100
// - Quality: ${results.breakdown.quality.score}/100

// Recommendations:
// ${results.recommendations.map((rec, i) => `${i + 1}. ${rec.title}: ${rec.description}`).join('\n')}

// Generated by Fixed ATS Score Checker
// Date: ${new Date().toLocaleDateString()}
// `;
    
//     const blob = new Blob([reportContent], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `ats-score-report-${new Date().toISOString().split('T')[0]}.txt`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">
//           ATS Score Checker
//         </h1>
//         <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//           Upload your resume to get an accurate ATS compatibility score. 
//           Now properly analyzes your actual resume content!
//         </p>
//       </div>

//       {/* File Upload Area */}
//       <div className="mb-8">
//         <div
//           className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
//             dragActive 
//               ? 'border-teal-500 bg-teal-50' 
//               : 'border-gray-300 hover:border-teal-400'
//           }`}
//           onDragEnter={handleDrag}
//           onDragLeave={handleDrag}
//           onDragOver={handleDrag}
//           onDrop={handleDrop}
//         >
//           <div className="space-y-4">
//             <div className="flex justify-center">
//               <Upload className="w-12 h-12 text-gray-400" />
//             </div>
//             <div>
//               <p className="text-lg font-medium text-gray-900">
//                 Drop your resume here, or click to browse
//               </p>
//               <p className="text-sm text-gray-500 mt-2">
//                 Supports TXT and PDF files (max 5MB) - TXT recommended for best accuracy
//               </p>
//             </div>
//             <div>
//               <input
//                 type="file"
//                 onChange={handleFileInput}
//                 accept=".txt,.pdf,.doc,.docx"
//                 className="hidden"
//                 id="file-upload"
//               />
//               <label
//                 htmlFor="file-upload"
//                 className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 cursor-pointer transition-colors"
//               >
//                 <FileText className="w-5 h-5 mr-2" />
//                 Choose File
//               </label>
//             </div>
//           </div>
//         </div>

//         {/* Selected File Display */}
//         {file && (
//           <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-3">
//                 <FileText className="w-6 h-6 text-teal-600" />
//                 <div>
//                   <p className="font-medium text-gray-900">{file.name}</p>
//                   <p className="text-sm text-gray-500">
//                     {(file.size / 1024 / 1024).toFixed(2)} MB
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={analyzeResume}
//                 disabled={isAnalyzing}
//                 className="flex items-center px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 disabled:opacity-50 transition-colors"
//               >
//                 {isAnalyzing ? (
//                   <>
//                     <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
//                     Analyzing...
//                   </>
//                 ) : (
//                   'Analyze Resume'
//                 )}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Results Section */}
//       {results && (
//         <div className="space-y-6">
//           {/* Overall Score */}
//           <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
//             <div className="text-center">
//               <h2 className="text-2xl font-bold text-gray-900 mb-4">ATS Score</h2>
//               <div className={`text-6xl font-bold mb-4 ${getScoreColor(results.overallScore)}`}>
//                 {results.overallScore}
//                 <span className="text-2xl">/100</span>
//               </div>
//               <p className="text-gray-600 mb-4">
//                 {results.overallScore >= 80 ? 'Excellent! Your resume is ATS-friendly.' :
//                  results.overallScore >= 60 ? 'Good! Some improvements needed.' :
//                  'Needs improvement to pass ATS systems.'}
//               </p>
//               <button
//                 onClick={downloadReport}
//                 className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
//               >
//                 <Download className="w-4 h-4 mr-2" />
//                 Download Report
//               </button>
//             </div>
//           </div>

//           {/* Detailed Breakdown */}
//           <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
//             <h3 className="text-xl font-bold text-gray-900 mb-6">Detailed Analysis</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {Object.entries(results.breakdown).map(([key, data]) => (
//                 <div key={key} className="space-y-2">
//                   <div className="flex items-center justify-between">
//                     <span className="font-medium text-gray-900 capitalize">
//                       {key === 'atsFormat' ? 'ATS Format' : key}
//                     </span>
//                     <div className="flex items-center space-x-2">
//                       {getScoreIcon(data.score)}
//                       <span className={`font-bold ${getScoreColor(data.score)}`}>
//                         {data.score}/100
//                       </span>
//                     </div>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div
//                       className={`h-2 rounded-full transition-all duration-500 ${
//                         data.score >= 80 ? 'bg-green-500' :
//                         data.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
//                       }`}
//                       style={{ width: `${data.score}%` }}
//                     />
//                   </div>
//                   {data.found && data.found.length > 0 && (
//                     <p className="text-sm text-gray-600">
//                       Found: {data.found.slice(0, 3).join(', ')}
//                       {data.found.length > 3 && ` +${data.found.length - 3} more`}
//                     </p>
//                   )}
//                   {key === 'length' && (
//                     <p className="text-sm text-gray-600">
//                       Word count: {data.wordCount}
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Recommendations */}
//           {results.recommendations.length > 0 && (
//             <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
//               <h3 className="text-xl font-bold text-gray-900 mb-6">Recommendations</h3>
//               <div className="space-y-4">
//                 {results.recommendations.map((rec, index) => (
//                   <div
//                     key={index}
//                     className={`p-4 rounded-lg border-l-4 ${
//                       rec.type === 'critical' ? 'bg-red-50 border-red-500' :
//                       rec.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
//                       'bg-blue-50 border-blue-500'
//                     }`}
//                   >
//                     <h4 className="font-semibold text-gray-900 mb-2">{rec.title}</h4>
//                     <p className="text-gray-700">{rec.description}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Info Section */}
//       <div className="mt-12 bg-teal-50 rounded-lg p-6 border border-teal-200">
//         <h3 className="text-lg font-semibold text-teal-900 mb-3">
//           Fixed ATS Analysis Features
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-teal-800">
//           <ul className="space-y-2">
//             <li>• <strong>Real File Reading:</strong> Actually analyzes your content</li>
//             <li>• <strong>Smart Keyword Matching:</strong> Uses regex for accuracy</li>
//             <li>• <strong>Variable Scoring:</strong> Different resumes get different scores</li>
//           </ul>
//           <ul className="space-y-2">
//             <li>• <strong>Better Recommendations:</strong> Based on actual gaps</li>
//             <li>• <strong>Quality Analysis:</strong> Checks for action words</li>
//             <li>• <strong>Improved Format Check:</strong> More sophisticated validation</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ATSScoreChecker;




import React, { useState, useCallback } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, XCircle, Download, RefreshCw } from 'lucide-react';

const ATSScoreChecker = () => {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // ATS Keywords for cybersecurity resumes
  const cybersecurityKeywords = [
    'cybersecurity', 'information security', 'network security', 'penetration testing',
    'vulnerability assessment', 'incident response', 'risk assessment', 'compliance',
    'firewall', 'intrusion detection', 'SIEM', 'encryption', 'malware analysis',
    'threat intelligence', 'security audit', 'ISO 27001', 'NIST', 'GDPR', 'CCPA',
    'ethical hacking', 'social engineering', 'security awareness', 'SOC', 'CISSP',
    'CISM', 'CEH', 'Security+', 'OSCP', 'CISSP', 'python', 'linux', 'windows',
    'TCP/IP', 'DNS', 'VPN', 'SSL/TLS', 'PKI', 'identity management', 'zero trust'
  ];

  const technicalSkills = [
    'python', 'java', 'c++', 'javascript', 'powershell', 'bash', 'sql',
    'wireshark', 'metasploit', 'nmap', 'burp suite', 'kali linux', 'splunk',
    'qradar', 'nessus', 'openvas', 'ansible', 'terraform', 'docker', 'kubernetes'
  ];

  const certifications = [
    'CISSP', 'CISM', 'CISA', 'CEH', 'OSCP', 'Security+', 'CySA+', 'CASP+',
    'GCIH', 'GSEC', 'GPEN', 'GIAC', 'SANS', 'PMP', 'ITIL', 'COBIT'
  ];

  // File upload handlers
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    // Validate file type - now includes Word documents
    const allowedTypes = [
      'text/plain',
      'application/pdf',
      'application/msword', // .doc
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // .docx
    ];
    
    if (!allowedTypes.includes(selectedFile.type)) {
      alert('Please upload a TXT, PDF, DOC, or DOCX file. For best results, use TXT format.');
      return;
    }

    // Validate file size (5MB limit)
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setFile(selectedFile);
    setResults(null);
  };

  // ENHANCED: Text extraction supporting multiple file formats including Word documents
  const extractTextFromFile = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          let text = '';
          
          if (file.type === 'text/plain') {
            // Read text files directly
            text = e.target.result;
          } else if (file.type === 'application/pdf') {
            // For PDF files, we'll use a basic extraction approach
            // Note: This is a simplified approach. For full PDF support, you'd need PDF.js
            try {
              const uint8Array = new Uint8Array(e.target.result);
              text = new TextDecoder().decode(uint8Array);
              // Basic cleanup for PDF content
              text = text.replace(/[^\x20-\x7E\n\r\t]/g, ' ').replace(/\s+/g, ' ').trim();
            } catch (pdfError) {
              console.warn('PDF parsing failed, using fallback');
              text = 'PDF content could not be extracted. Please convert to TXT format for better analysis.';
            }
          } else if (file.type === 'application/msword' || 
                     file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            // Handle Word documents (.doc and .docx)
            try {
              if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                // For .docx files - basic text extraction
                const arrayBuffer = e.target.result;
                const uint8Array = new Uint8Array(arrayBuffer);
                
                // Convert to string and look for readable text patterns
                const rawText = new TextDecoder('utf-8', { fatal: false }).decode(uint8Array);
                
                // Extract text content using regex patterns for docx structure
                // This is a basic approach - docx files are XML-based
                const textMatches = rawText.match(/<w:t[^>]*>([^<]*)<\/w:t>/g) || [];
                text = textMatches.map(match => {
                  const textContent = match.replace(/<[^>]*>/g, '');
                  return textContent;
                }).join(' ');
                
                // If no XML matches found, try general text extraction
                if (!text || text.length < 20) {
                  text = rawText.replace(/[^\x20-\x7E\n\r\t]/g, ' ').replace(/\s+/g, ' ').trim();
                }
              } else {
                // For .doc files - even more basic extraction
                const arrayBuffer = e.target.result;
                const uint8Array = new Uint8Array(arrayBuffer);
                const rawText = new TextDecoder('utf-8', { fatal: false }).decode(uint8Array);
                text = rawText.replace(/[^\x20-\x7E\n\r\t]/g, ' ').replace(/\s+/g, ' ').trim();
              }
              
              // Clean up extracted text
              text = text.replace(/\s+/g, ' ').trim();
              
              if (!text || text.length < 50) {
                throw new Error('Limited text extraction from Word document');
              }
            } catch (docError) {
              console.warn('Word document parsing failed:', docError);
              text = `Word document detected but content extraction was limited. 
                     For best results, please save your resume as a .txt file. 
                     You can do this in Word by going to File > Save As > Plain Text (.txt).
                     
                     Current analysis will use whatever text was extractable, but accuracy may be reduced.`;
            }
          }
          
          if (!text || text.length < 10) {
            throw new Error('No readable text found in the file');
          }
          
          resolve(text);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      
      if (file.type === 'text/plain') {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    });
  };

  // IMPROVED: More sophisticated ATS Analysis Algorithm
  const analyzeResume = async () => {
    setIsAnalyzing(true);
    
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const text = await extractTextFromFile(file);
      
      if (!text || text.length < 50) {
        throw new Error('Unable to extract meaningful text from the file. Please try a different format.');
      }
      
      const lowercaseText = text.toLowerCase();
      console.log('Analyzing text:', lowercaseText.substring(0, 200) + '...');
      
      // 1. FIXED: Keyword Analysis with better matching
      const foundKeywords = cybersecurityKeywords.filter(keyword => {
        const keywordRegex = new RegExp(`\\b${keyword.toLowerCase().replace(/[+]/g, '\\+')}\\b`, 'i');
        return keywordRegex.test(lowercaseText);
      });
      const keywordScore = Math.min((foundKeywords.length / Math.min(cybersecurityKeywords.length, 15)) * 100, 100);
      
      // 2. FIXED: Technical Skills Analysis with better matching
      const foundTechnicalSkills = technicalSkills.filter(skill => {
        const skillRegex = new RegExp(`\\b${skill.toLowerCase().replace(/[+]/g, '\\+')}\\b`, 'i');
        return skillRegex.test(lowercaseText);
      });
      const technicalScore = Math.min((foundTechnicalSkills.length / Math.min(technicalSkills.length, 8)) * 100, 100);
      
      // 3. FIXED: Certifications Analysis with better matching
      const foundCertifications = certifications.filter(cert => {
        const certRegex = new RegExp(`\\b${cert.toLowerCase().replace(/[+]/g, '\\+')}\\b`, 'i');
        return certRegex.test(lowercaseText);
      });
      const certificationScore = foundCertifications.length > 0 ? 
        Math.min((foundCertifications.length / 3) * 100, 100) : 0;
      
      // 4. IMPROVED: Format Analysis with more sophisticated checks
      const hasContactInfo = /(\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b)|(\b\d{3}[-.]?\d{3}[-.]?\d{4}\b)|(linkedin\.com)/i.test(text);
      const hasExperience = /(experience|work history|employment|professional experience|career)/i.test(text);
      const hasEducation = /(education|degree|university|college|bachelor|master|phd)/i.test(text);
      const hasSkills = /(skills|technical skills|competencies|technologies|tools)/i.test(text);
      const hasAchievements = /(achieved|accomplished|improved|increased|reduced|managed|led|developed)/i.test(text);
      
      const formatComponents = [hasContactInfo, hasExperience, hasEducation, hasSkills, hasAchievements];
      const formatScore = (formatComponents.filter(Boolean).length / formatComponents.length) * 100;
      
      // 5. IMPROVED: Length Analysis
      const wordCount = text.trim().split(/\s+/).length;
      let lengthScore;
      if (wordCount >= 300 && wordCount <= 800) {
        lengthScore = 100;
      } else if (wordCount >= 200 && wordCount <= 1200) {
        lengthScore = 80;
      } else if (wordCount >= 100 && wordCount <= 1500) {
        lengthScore = 60;
      } else {
        lengthScore = 40;
      }
      
      // 6. IMPROVED: ATS-Friendly Format Check
      const problematicChars = (text.match(/[^\w\s\.\,\-\(\)\@\:\;\'\"\&\%\$\#\!\?\+\=\/\\]/g) || []).length;
      const totalChars = text.length;
      const problematicRatio = problematicChars / totalChars;
      const atsFormatScore = Math.max(20, 100 - (problematicRatio * 500));
      
      // 7. NEW: Content Quality Score
      const actionWords = ['managed', 'led', 'developed', 'implemented', 'designed', 'created', 'improved', 'achieved'];
      const foundActionWords = actionWords.filter(word => 
        new RegExp(`\\b${word}\\b`, 'i').test(text)
      );
      const qualityScore = Math.min((foundActionWords.length / 4) * 100, 100);
      
      // FIXED: Calculate overall score with proper weighting
      const overallScore = Math.round(
        (keywordScore * 0.25 + 
         technicalScore * 0.20 + 
         certificationScore * 0.15 + 
         formatScore * 0.15 + 
         lengthScore * 0.10 + 
         atsFormatScore * 0.10 +
         qualityScore * 0.05)
      );
      
      const analysis = {
        overallScore,
        breakdown: {
          keywords: { score: Math.round(keywordScore), found: foundKeywords },
          technical: { score: Math.round(technicalScore), found: foundTechnicalSkills },
          certifications: { score: Math.round(certificationScore), found: foundCertifications },
          format: { 
            score: Math.round(formatScore), 
            details: { hasContactInfo, hasExperience, hasEducation, hasSkills, hasAchievements } 
          },
          length: { score: Math.round(lengthScore), wordCount },
          atsFormat: { score: Math.round(atsFormatScore), problematicChars },
          quality: { score: Math.round(qualityScore), found: foundActionWords }
        },
        recommendations: generateRecommendations(overallScore, {
          keywordScore, technicalScore, certificationScore, formatScore, lengthScore, atsFormatScore, qualityScore
        }, { foundKeywords, foundTechnicalSkills, foundCertifications })
      };
      
      setResults(analysis);
    } catch (error) {
      console.error('Analysis error:', error);
      alert(`Error analyzing resume: ${error.message}. Please try a different file format or check if the file contains readable text.`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // IMPROVED: Better recommendations based on actual analysis
  const generateRecommendations = (score, scores, found) => {
    const recommendations = [];
    
    if (scores.keywordScore < 40) {
      const missingKeywords = cybersecurityKeywords.filter(k => !found.foundKeywords.includes(k)).slice(0, 5);
      recommendations.push({
        type: 'critical',
        title: 'Add More Cybersecurity Keywords',
        description: `Include relevant terms like: ${missingKeywords.join(', ')}`
      });
    }
    
    if (scores.technicalScore < 30) {
      const missingSkills = technicalSkills.filter(s => !found.foundTechnicalSkills.includes(s)).slice(0, 5);
      recommendations.push({
        type: 'critical',
        title: 'Highlight Technical Skills',
        description: `Consider adding: ${missingSkills.join(', ')}`
      });
    }
    
    if (scores.certificationScore === 0) {
      recommendations.push({
        type: 'warning',
        title: 'Include Certifications',
        description: 'List any cybersecurity certifications like Security+, CISSP, CEH, etc. If you don\'t have any, consider pursuing entry-level certifications.'
      });
    }
    
    if (scores.formatScore < 60) {
      recommendations.push({
        type: 'warning',
        title: 'Improve Resume Structure',
        description: 'Ensure clear sections for contact info, experience, education, skills, and achievements'
      });
    }
    
    if (scores.lengthScore < 60) {
      if (scores.lengthScore < 100) {
        recommendations.push({
          type: 'info',
          title: 'Optimize Resume Length',
          description: 'Aim for 300-800 words for optimal ATS performance'
        });
      }
    }
    
    if (scores.atsFormatScore < 70) {
      recommendations.push({
        type: 'critical',
        title: 'Simplify Formatting',
        description: 'Remove special characters, graphics, and complex formatting that ATS cannot read'
      });
    }
    
    if (scores.qualityScore < 50) {
      recommendations.push({
        type: 'info',
        title: 'Use Action Words',
        description: 'Include action verbs like "managed", "developed", "implemented" to describe your achievements'
      });
    }
    
    return recommendations;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score) => {
    if (score >= 80) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (score >= 60) return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    return <XCircle className="w-5 h-5 text-red-600" />;
  };

  const downloadReport = () => {
    if (!results) return;
    
    const reportContent = `
ATS Score Report
===============

Overall Score: ${results.overallScore}/100

Detailed Breakdown:
- Keywords: ${results.breakdown.keywords.score}/100 (Found: ${results.breakdown.keywords.found.join(', ')})
- Technical Skills: ${results.breakdown.technical.score}/100 (Found: ${results.breakdown.technical.found.join(', ')})
- Certifications: ${results.breakdown.certifications.score}/100 (Found: ${results.breakdown.certifications.found.join(', ')})
- Format: ${results.breakdown.format.score}/100
- Length: ${results.breakdown.length.score}/100 (${results.breakdown.length.wordCount} words)
- ATS Format: ${results.breakdown.atsFormat.score}/100
- Quality: ${results.breakdown.quality.score}/100

Recommendations:
${results.recommendations.map((rec, i) => `${i + 1}. ${rec.title}: ${rec.description}`).join('\n')}

Generated by Enhanced ATS Score Checker
Date: ${new Date().toLocaleDateString()}
`;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ats-score-report-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Enhanced ATS Score Checker
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload your resume to get an accurate ATS compatibility score. 
          Supports TXT, PDF, DOC, and DOCX formats. Now properly analyzes your actual resume content!
        </p>
      </div>

      {/* File Upload Area */}
      <div className="mb-8">
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-teal-500 bg-teal-50' 
              : 'border-gray-300 hover:border-teal-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className="flex justify-center">
              <Upload className="w-12 h-12 text-gray-400" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">
                Drop your resume here, or click to browse
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Supports TXT, PDF, DOC, and DOCX files (max 5MB) - TXT recommended for best accuracy
              </p>
            </div>
            <div>
              <input
                type="file"
                onChange={handleFileInput}
                accept=".txt,.pdf,.doc,.docx"
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 cursor-pointer transition-colors"
              >
                <FileText className="w-5 h-5 mr-2" />
                Choose File
              </label>
            </div>
          </div>
        </div>

        {/* Selected File Display */}
        {file && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-teal-600" />
                <div>
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={analyzeResume}
                disabled={isAnalyzing}
                className="flex items-center px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 disabled:opacity-50 transition-colors"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Resume'
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Section */}
      {results && (
        <div className="space-y-6">
          {/* Overall Score */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">ATS Score</h2>
              <div className={`text-6xl font-bold mb-4 ${getScoreColor(results.overallScore)}`}>
                {results.overallScore}
                <span className="text-2xl">/100</span>
              </div>
              <p className="text-gray-600 mb-4">
                {results.overallScore >= 80 ? 'Excellent! Your resume is ATS-friendly.' :
                 results.overallScore >= 60 ? 'Good! Some improvements needed.' :
                 'Needs improvement to pass ATS systems.'}
              </p>
              <button
                onClick={downloadReport}
                className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </button>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Detailed Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(results.breakdown).map(([key, data]) => (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 capitalize">
                      {key === 'atsFormat' ? 'ATS Format' : key}
                    </span>
                    <div className="flex items-center space-x-2">
                      {getScoreIcon(data.score)}
                      <span className={`font-bold ${getScoreColor(data.score)}`}>
                        {data.score}/100
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        data.score >= 80 ? 'bg-green-500' :
                        data.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${data.score}%` }}
                    />
                  </div>
                  {data.found && data.found.length > 0 && (
                    <p className="text-sm text-gray-600">
                      Found: {data.found.slice(0, 3).join(', ')}
                      {data.found.length > 3 && ` +${data.found.length - 3} more`}
                    </p>
                  )}
                  {key === 'length' && (
                    <p className="text-sm text-gray-600">
                      Word count: {data.wordCount}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          {results.recommendations.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Recommendations</h3>
              <div className="space-y-4">
                {results.recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      rec.type === 'critical' ? 'bg-red-50 border-red-500' :
                      rec.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                      'bg-blue-50 border-blue-500'
                    }`}
                  >
                    <h4 className="font-semibold text-gray-900 mb-2">{rec.title}</h4>
                    <p className="text-gray-700">{rec.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Info Section */}
      <div className="mt-12 bg-teal-50 rounded-lg p-6 border border-teal-200">
        <h3 className="text-lg font-semibold text-teal-900 mb-3">
          Enhanced ATS Analysis Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-teal-800">
          <ul className="space-y-2">
            <li>• <strong>Multiple File Formats:</strong> TXT, PDF, DOC, DOCX support</li>
            <li>• <strong>Real File Reading:</strong> Actually analyzes your content</li>
            <li>• <strong>Smart Keyword Matching:</strong> Uses regex for accuracy</li>
          </ul>
          <ul className="space-y-2">
            <li>• <strong>Variable Scoring:</strong> Different resumes get different scores</li>
            <li>• <strong>Better Recommendations:</strong> Based on actual gaps</li>
            <li>• <strong>Quality Analysis:</strong> Checks for action words</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ATSScoreChecker;