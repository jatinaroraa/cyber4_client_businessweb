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
    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    
    if (!allowedTypes.includes(selectedFile.type)) {
      alert('Please upload a PDF, DOC, DOCX, or TXT file');
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

  // Text extraction from different file types
  const extractTextFromFile = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          let text = '';
          
          if (file.type === 'text/plain') {
            text = e.target.result;
          } else if (file.type === 'application/pdf') {
            // For PDF files - in a real implementation, you'd use PDF.js
            // For now, we'll simulate text extraction
            text = "Sample PDF content would be extracted here using PDF.js library";
          } else if (file.type.includes('word')) {
            // For DOCX files - in a real implementation, you'd use mammoth.js
            text = "Sample DOCX content would be extracted here using mammoth.js library";
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

  // ATS Analysis Algorithm
  const analyzeResume = async () => {
    setIsAnalyzing(true);
    
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const text = await extractTextFromFile(file);
      const lowercaseText = text.toLowerCase();
      
      // 1. Keyword Analysis
      const foundKeywords = cybersecurityKeywords.filter(keyword => 
        lowercaseText.includes(keyword.toLowerCase())
      );
      const keywordScore = Math.min((foundKeywords.length / cybersecurityKeywords.length) * 100, 100);
      
      // 2. Technical Skills Analysis
      const foundTechnicalSkills = technicalSkills.filter(skill =>
        lowercaseText.includes(skill.toLowerCase())
      );
      const technicalScore = Math.min((foundTechnicalSkills.length / 10) * 100, 100);
      
      // 3. Certifications Analysis
      const foundCertifications = certifications.filter(cert =>
        lowercaseText.includes(cert.toLowerCase())
      );
      const certificationScore = foundCertifications.length > 0 ? 100 : 0;
      
      // 4. Format Analysis
      const hasContactInfo = /email|phone|linkedin/.test(lowercaseText);
      const hasExperience = /experience|work|employment|job/.test(lowercaseText);
      const hasEducation = /education|degree|university|college/.test(lowercaseText);
      const hasSkills = /skills|technologies|tools/.test(lowercaseText);
      
      const formatScore = [hasContactInfo, hasExperience, hasEducation, hasSkills]
        .filter(Boolean).length * 25;
      
      // 5. Length Analysis
      const wordCount = text.split(/\s+/).length;
      const lengthScore = wordCount >= 200 && wordCount <= 1000 ? 100 : 
                        wordCount < 200 ? 50 : 75;
      
      // 6. ATS-Friendly Format Check
      const hasComplexFormatting = /[^\w\s\.\,\-\(\)\@\:]/.test(text);
      const atsFormatScore = hasComplexFormatting ? 60 : 100;
      
      // Calculate overall score
      const overallScore = Math.round(
        (keywordScore * 0.3 + 
         technicalScore * 0.2 + 
         certificationScore * 0.15 + 
         formatScore * 0.15 + 
         lengthScore * 0.1 + 
         atsFormatScore * 0.1)
      );
      
      const analysis = {
        overallScore,
        breakdown: {
          keywords: { score: Math.round(keywordScore), found: foundKeywords },
          technical: { score: Math.round(technicalScore), found: foundTechnicalSkills },
          certifications: { score: Math.round(certificationScore), found: foundCertifications },
          format: { score: formatScore, details: { hasContactInfo, hasExperience, hasEducation, hasSkills } },
          length: { score: lengthScore, wordCount },
          atsFormat: { score: atsFormatScore, hasComplexFormatting: !hasComplexFormatting }
        },
        recommendations: generateRecommendations(overallScore, {
          keywordScore, technicalScore, certificationScore, formatScore, lengthScore, atsFormatScore
        })
      };
      
      setResults(analysis);
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Error analyzing resume. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateRecommendations = (score, scores) => {
    const recommendations = [];
    
    if (scores.keywordScore < 50) {
      recommendations.push({
        type: 'critical',
        title: 'Add More Cybersecurity Keywords',
        description: 'Include relevant industry terms like "penetration testing", "vulnerability assessment", "incident response"'
      });
    }
    
    if (scores.technicalScore < 50) {
      recommendations.push({
        type: 'warning',
        title: 'Highlight Technical Skills',
        description: 'Add programming languages, security tools, and technologies you\'ve worked with'
      });
    }
    
    if (scores.certificationScore < 50) {
      recommendations.push({
        type: 'info',
        title: 'Include Certifications',
        description: 'List any cybersecurity certifications like Security+, CISSP, CEH, etc.'
      });
    }
    
    if (scores.formatScore < 75) {
      recommendations.push({
        type: 'warning',
        title: 'Improve Resume Structure',
        description: 'Ensure you have clear sections for contact info, experience, education, and skills'
      });
    }
    
    if (scores.atsFormatScore < 80) {
      recommendations.push({
        type: 'critical',
        title: 'Simplify Formatting',
        description: 'Remove complex formatting, graphics, and special characters that ATS cannot read'
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

Breakdown:
- Keywords: ${results.breakdown.keywords.score}/100
- Technical Skills: ${results.breakdown.technical.score}/100
- Certifications: ${results.breakdown.certifications.score}/100
- Format: ${results.breakdown.format.score}/100
- Length: ${results.breakdown.length.score}/100
- ATS Format: ${results.breakdown.atsFormat.score}/100

Recommendations:
${results.recommendations.map(rec => `- ${rec.title}: ${rec.description}`).join('\n')}

Generated by Cyberb4 ATS Score Checker
`;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ats-score-report.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          ATS Score Checker
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload your resume to get an instant ATS (Applicant Tracking System) compatibility score 
          and detailed feedback to improve your chances of getting noticed by employers.
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
                Supports PDF, DOC, DOCX, and TXT files (max 5MB)
              </p>
            </div>
            <div>
              <input
                type="file"
                onChange={handleFileInput}
                accept=".pdf,.doc,.docx,.txt"
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
          How ATS Score Checking Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-teal-800">
          <ul className="space-y-2">
            <li>• <strong>Keywords:</strong> Relevant cybersecurity terms</li>
            <li>• <strong>Technical Skills:</strong> Programming languages & tools</li>
            <li>• <strong>Certifications:</strong> Industry credentials</li>
          </ul>
          <ul className="space-y-2">
            <li>• <strong>Format:</strong> Resume structure & sections</li>
            <li>• <strong>Length:</strong> Optimal word count</li>
            <li>• <strong>ATS-Friendly:</strong> Simple formatting</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ATSScoreChecker;