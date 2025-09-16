import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  Play,
  Users,
  Shield,
  Award,
  Star,
  ArrowRight,
  Menu,
  X,
  Check,
  Lock,
  Code,
  Database,
  Tag,
  Calendar,
  User,
  Clock,
  ArrowLeft, Share2, BookmarkPlus, ThumbsUp, MessageCircle, Eye,
  UserCheck
} from "lucide-react";
import { Card, Avatar, Spin, message, Empty, Button } from 'antd';
import { 
  UserOutlined, 
  CalendarOutlined, 
  ClockCircleOutlined, 
  EyeOutlined,
  TagsOutlined,
  ArrowRightOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { getBlogsApi } from "./services/blog";
import { baseUrl } from "./services/config";
import { toast } from "react-toastify";

const CoursePlatform = () => {
const [showExpress,setShowExpress] = useState(false)

  const [currentPage, setCurrentPage] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  // const [showServiceForm, setShowConsultationForm] = useState(false);

  const [currentServicePage, setCurrentServicePage] = useState("main");
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [currentServiceType, setCurrentServiceType] = useState("");
  const [showPrivacyDisclaimer, setShowPrivacyDisclaimer] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    comments: "",
    cvFile: null,
    agreeToTerms: false,
    expressService: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
  };

  const validateFile = (file) => {
    if (!file) return false;
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB
    return allowedTypes.includes(file.type) && file.size <= maxSize;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!validateEmail(formData.email))
      errors.email = "Please enter a valid email";
    if (!formData.contactNumber.trim())
      errors.contactNumber = "Contact number is required";
    else if (!validatePhoneNumber(formData.contactNumber))
      errors.contactNumber =
        "Please enter a valid phone number with country code (e.g., +91xxxxxxxxxx)";
    if (!formData.cvFile) errors.cvFile = "CV upload is required";
    else if (!validateFile(formData.cvFile))
      errors.cvFile = "Please upload a PDF, DOC, or DOCX file under 5MB";
    if (formData.comments.length > 500)
      errors.comments = "Comments must be under 500 characters";
    if (!formData.agreeToTerms)
      errors.agreeToTerms = "You must agree to the terms and privacy policy";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleServiceBooking = (serviceType,express) => {
    if(express) setShowExpress(true)
      else setShowExpress(false)
    setCurrentServiceType(serviceType);
    setShowPrivacyDisclaimer(true);
  };

  const handlePrivacyAccept = () => {
    setShowPrivacyDisclaimer(false);
    setShowServiceForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setFormData({
        name: "",
        email: "",
        contactNumber: "",
        comments: "",
        cvFile: null,
        agreeToTerms: false,
        expressService: false,
      });
      setShowConsultationForm(false);
      alert(
        "Thank you! Your consultation has been booked. You will receive a confirmation email shortly."
      );
    } catch (error) {
      alert("There was an error booking your consultation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleServiceFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setFormData({
        name: "",
        email: "",
        contactNumber: "",
        comments: "",
        cvFile: null,
        agreeToTerms: false,
        expressService: false,
      });
      setShowServiceForm(false);
      alert(
        `Thank you! Your ${currentServiceType} service has been booked. You will receive a confirmation email shortly.`
      );
    } catch (error) {
      alert("There was an error booking your service. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // const CyberbLogo = () => (
  //   <div className="flex items-center">
  //     <div className="relative">
  //       <div className="w-10 h-8 bg-teal-400 rounded-sm flex items-center justify-center mr-2">
  //         <Shield className="w-6 h-6 text-gray-900" />
  //       </div>
  //       <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-teal-400 rounded-sm flex items-center justify-center">
  //         <Check className="w-2 h-2 text-gray-900" />
  //       </div>
  //     </div>
  //     <span className="text-2xl font-bold text-white">Cyberb4</span>
  //   </div>
  // );
    // const CyberbLogo = () => (
    //    <div className="flex items-center">
    //    <img src={require('./assets/cyber4logo.png')} alt="Cyberb4 Logo"   style={{ height: '160px', width: '128px' }} />
    //    </div>
    // )
const CyberbLogo = () => (
  <div className="flex items-center cursor-pointer" onClick={()=>setCurrentPage('home')}>
    <img 
      src={require('./assets/cyber4logo.png')} 
      alt="Cyberb4 Logo" 
      style={{ height: '150px', width: '120px' }}
      className="drop-shadow-md hover:drop-shadow-lg transition-all duration-300"
    />
  </div>
);
  const navigation = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "Pricing", id: "pricing" },
    { name: "Blog", id: "blog" },
  ];

  const NavBar = () => (
    <nav className="bg-gray-900 shadow-lg fixed w-full top-0 z-50 border-b border-teal-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <CyberbLogo />
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if(item.id==='blog') return navigate('/blog')
                  setCurrentPage(item.id);
                  setCurrentServicePage("main");
                }}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? "text-teal-400 bg-gray-800"
                    : "text-gray-300 hover:text-teal-400 hover:bg-gray-800"
                }`}
              >
                {item.name}
              </button>
            ))}
            <button className="bg-teal-400 text-gray-900 px-4 py-2 rounded-lg hover:bg-teal-300 transition-colors font-semibold">
              Get Started
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-teal-400"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900 border-t border-gray-700">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setCurrentServicePage("main");
                    setMobileMenuOpen(false);
                  }}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                    currentPage === item.id
                      ? "text-teal-400 bg-gray-800"
                      : "text-gray-300 hover:text-teal-400 hover:bg-gray-800"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <button className="w-full mt-2 bg-teal-400 text-gray-900 px-4 py-2 rounded-lg hover:bg-teal-300 transition-colors font-semibold">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-teal-400">Cyberb4</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto text-gray-300 leading-relaxed">
              Guiding you to success in the dynamic and
              fast-paced world of Cyber Security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowConsultationForm(true)}
                className="bg-teal-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-teal-300 transition-colors"
              >
                Schedule Free Consultation
              </button>
              <button className="border-2 border-teal-400 text-teal-400 px-8 py-3 rounded-lg font-semibold hover:bg-teal-400 hover:text-gray-900 transition-colors flex items-center justify-center">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                We understand how crucial your first steps into a new career are. That’s why
          Cyberb4 offers mentoring and coaching specially designed for beginners and
          freshers eager to embrace the dynamic world of Cyber Security. But our expertise
          doesn’t stop there—our team brings decades of international experience across a
          range of domains, including Data Privacy, Artificial Intelligence, Business
          Continuity, IT Audits, and Technology Governance, Risk, and Compliance
          (Tech GRC), ensuring you receive well-rounded guidance tailored to today’s evolving
          tech landscape.
              </p>

              {/* <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Cyberb4 is led by a seasoned professional with over{" "}
                <strong className="text-teal-600">
                  18 years of experience
                </strong>{" "}
                in IT Audit, Information Security, Data Privacy, and Business
                Continuity. Alongside, we collaborate with skilled freelancers
                from similar domains to ensure you receive the best, up-to-date
                knowledge and personalized coaching.
              </p> */}

              <div className="bg-teal-50 p-6 rounded-lg mb-8 border-l-4 border-teal-400">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  The Opportunity is Unprecedented
                </h3>
                <p className="text-gray-700 mb-4">
                  The demand for skilled cybersecurity professionals has never
                  been higher. According to recent industry reports, there is a
                  global shortage of over{" "}
                  <strong className="text-teal-600">
                    3.4 million cybersecurity jobs
                  </strong>
                  , with organizations struggling to fill critical roles.
                </p>
                <p className="text-gray-700">
                  This talent gap makes cybersecurity one of the most promising
                  and rewarding career paths today. By training with Cyberb4,
                  you position yourself at the forefront of this high-demand
                  field, ready to seize exciting job opportunities worldwide.
                </p>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed">
                We understand that starting a career can feel overwhelming, and
                that's why we're here—to provide clear direction, practical
                support, and personalized coaching every step of the way. If
                you're ready to kickstart your journey in these exciting areas,
                you're in the right place!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-500 mb-2">18+</div>
              <div className="text-gray-600">Years of Industry Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-500 mb-2">3.4M+</div>
              <div className="text-gray-600">Global Job Shortage</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-500 mb-2">100%</div>
              <div className="text-gray-600">Personalized Coaching</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Specializations
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Expert guidance across multiple cybersecurity domains
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Cyber Security",
                description:
                  "Comprehensive security training from basics to advanced threat detection",
                icon: Shield,
              },
              {
                title: "Data Privacy",
                description:
                  "GDPR, CCPA compliance and privacy management frameworks",
                icon: Lock,
              },
              {
                title: "IT Governance",
                description: "COBIT, ITIL and IT governance best practices",
                icon: Code,
              },
              {
                title: "Risk & Compliance",
                description:
                  "Risk assessment, management and regulatory compliance",
                icon: Award,
              },
              {
                title: "Technology Audit",
                description:
                  "IT audit methodologies and internal control frameworks",
                icon: Database,
              },
              {
                title: "Business Continuity",
                description:
                  "Disaster recovery and business continuity planning",
                icon: Users,
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
              >
                <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
             Success stories from our community
            </h2>
            {/* <p className="text-gray-600">
              Real success stories from our community
            </p> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote:
                  "Cyberb4 gave me the clarity I needed to start my career in cyber security. The personalized career counselling helped me understand the right certifications and job roles.",
                author: "Priya S.",
                role: "Recent Graduate",
              },
              {
                quote:
                  "The resume development service transformed my poorly formatted CV into a professional, ATS-friendly document. Thanks to Cyberb4!",
                author: "Rahul K.",
                role: "Fresher",
              },
              {
                quote:
                  "The interview preparation sessions were a game-changer. The tips on answering technical and HR questions helped me stay calm and focused during my real interviews.",
                author: "Ananya M.",
                role: "Entry-Level Security Analyst",
              },
              {
                quote:
                  "Doing a mock interview with Cyberb4 was the best decision I made before my job hunt. The realistic practice and detailed feedback helped me improve my answers and body language significantly.",
                author: "Sameer P.",
                role: "Junior IT Auditor",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">
                    — {testimonial.author}
                  </p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-600">
              Ready to start your cybersecurity journey? Contact us today!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Telephone</h3>
              <p className="text-gray-600">+91 674 238 6292</p>
              <p className="text-gray-600">+91 73777 16282</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Email</h3>
              <p className="text-gray-600">Support@cyberb4.com</p>
              <p className="text-gray-600">Cyberb4@hotmail.com</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Address</h3>
              <p className="text-gray-600">Acharya Vihar, Bhubaneshwar</p>
              <p className="text-gray-600">Abu Dhabi, United Arab Emirates</p>
            </div>
          </div>
        </div>
      </section> */}

       <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-600">
              Ready to start your cybersecurity journey? Contact us today!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Telephone</h3>
              <p className="text-gray-600">+91 674 238 6292</p>
              <p className="text-gray-600">+91 73777 16282</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Email</h3>
              <p className="text-gray-600">Support@cyberb4.com</p>
              <p className="text-gray-600">Cyberb4@hotmail.com</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Our Locations</h3>
              <p className="text-gray-600">India & UAE</p>
            </div>
          </div>

          {/* Office Locations with Google Maps */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* India Office */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-xl">🇮🇳</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  India Office
                </h3>
              </div>
              <p className="text-gray-700 mb-4">
                Shaheed Nagar, Bhubaneshwar
                <br />
                Odisha, India
              </p>
              <div className="mb-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.6789436894345!2d85.82472631495439!3d20.295856886396247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a1d0e4b1b5c1%3A0x7e4f4b4d4b4b4b4b!2sShaheed%20Nagar%2C%20Bhubaneswar%2C%20Odisha%2C%20India!5e0!3m2!1sen!2sin!4v1642585847123!5m2!1sen!2sin"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
              <a
                href="https://maps.google.com/?q=Shaheed+Nagar,+Bhubaneshwar,+Odisha,+India"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-teal-600 hover:text-teal-700 font-semibold"
              >
                View on Google Maps
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>

            {/* UAE Office */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-xl">🇦🇪</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">UAE Office</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Reem Island
                <br />
                Abu Dhabi, United Arab Emirates
              </p>
              <div className="mb-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631.5234567890123!2d54.39876789012345!3d24.456789012345678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e6d1234567890%3A0x1234567890abcdef!2sReem%20Island%2C%20Abu%20Dhabi%2C%20United%20Arab%20Emirates!5e0!3m2!1sen!2sae!4v1642585847124!5m2!1sen!2sae"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
              <a
                href="https://maps.google.com/?q=Reem+Island,+Abu+Dhabi,+United+Arab+Emirates"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-teal-600 hover:text-teal-700 font-semibold"
              >
                View on Google Maps
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const ServicesPage = () => {
    // Main Services Page
    if (currentServicePage === "main") {
      return (
        <div className="pt-16">
          {/* Services Hero */}
          <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-transparent"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Our <span className="text-teal-400">Services</span>
                </h1>
                <p className="text-xl max-w-3xl mx-auto text-gray-300">
                  Cyberb4 is dedicated to empowering cyber security job
                  aspirants with expert support across four essential services
                </p>
              </div>
            </div>
          </section>

          {/* Main Services */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {[
                  {
                    title: "Career Counselling",
                    description:
                      "Personalized sessions to help you understand the cyber security job market, identify the right career paths, and plan your journey with clarity. We guide you on skills, certifications, and industry trends so you can make informed decisions.",
                    features: [
                      "Personalized Career Guidance",
                      "Industry Insights",
                      "Certification Roadmap",
                      "Strategic Learning Plans",
                    ],
                    pageId: "career",
                  },
                  {
                    title: "Resume Development",
                    description:
                      "Craft a professional, ATS-friendly resume that highlights your strengths and achievements in the cyber security domain. Our tailored approach ensures your profile stands out to recruiters and passes automated screenings.",
                    features: [
                      "ATS-Friendly Format",
                      "Professional Writing",
                      "Technical Skills Highlight",
                      "Industry Optimization",
                    ],
                    pageId: "resume",
                  },
                  {
                    title: "Interview Preparation",
                    description:
                      "Get ready to ace interviews with targeted coaching on common questions, role-specific scenarios, and effective communication techniques. We build your confidence by helping you structure powerful answers and improve your presentation skills.",
                    features: [
                      "Technical Questions",
                      "HR Interview Prep",
                      "Communication Skills",
                      "Confidence Building",
                    ],
                    pageId: "interview",
                  },
                  {
                    title: "Mock Interview",
                    description:
                      "Experience a realistic interview simulation conducted by industry experts who provide constructive feedback. This practice helps you identify areas for improvement, manage nerves, and sharpen your responses before facing real employers.",
                    features: [
                      "Realistic Simulation",
                      "Expert Feedback",
                      "Performance Analysis",
                      "Improvement Areas",
                    ],
                    pageId: "mock",
                  },
                ].map((service, index) => (
                  <div
                    key={index}
                    className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
                  >
                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <Check className="w-5 h-5 text-teal-500 mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => setCurrentServicePage(service.pageId)}
                      className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      See More
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="py-16 bg-gray-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Comprehensive Support System
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Together, these services provide a comprehensive support system
                designed to prepare you thoroughly for a successful career start
                or growth in cyber security.
              </p>
            </div>
          </section>
        </div>
      );
    }

    // Career Counselling Sub-page
    if (currentServicePage === "career") {
      return (
        <div className="pt-16">
          <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-transparent"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <button
                onClick={() => setCurrentServicePage("main")}
                className="text-teal-400 hover:text-teal-300 mb-4 flex items-center"
              >
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Back to
                Services
              </button>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Career <span className="text-teal-400">Counselling</span>
              </h1>
              <p className="text-xl max-w-3xl text-gray-300">
                Personalized guidance to launch your cybersecurity career with
                confidence
              </p>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  We guide you in identifying the right career path in cyber
                  security based on your skills, interests, and long-term goals.
                  Our expert counsellors help you understand different roles
                  like SOC Analyst, Penetration Tester, or Cyber Security
                  Consultant.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  You'll gain clarity on required skills, certifications, and
                  market demand. We also advise on building a strategic learning
                  plan tailored to your background. This ensures you start your
                  journey with a clear direction and realistic expectations.
                </p>
              </div>

              {/* How it Works */}
              <div className="bg-white rounded-lg shadow-lg p-8 mb-12 border border-gray-200">
                <h2 className="text-2xl font-bold mb-8 text-center">
                  How Does it Work?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                  {[
                    {
                      step: "1",
                      title: "Share CV",
                      desc: "Candidate shares CV",
                    },
                    {
                      step: "2",
                      title: "Schedule Call",
                      desc: "Cyberb4 Team schedules a Zoom call within 10 Business Days",
                    },
                    {
                      step: "3",
                      title: "Profile Review",
                      desc: "Cyberb4 Team reviews your profile before the call",
                    },
                    {
                      step: "4",
                      title: "Consultation",
                      desc: "On the call, we answer queries related to Jobs, Skills, and Certifications",
                    },
                    {
                      step: "5",
                      title: "Action Plan",
                      desc: "Candidate receives a tailored action plan after the session",
                    },
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-teal-600 font-bold">
                          {item.step}
                        </span>
                      </div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-2">Disclaimer</h3>
                <p className="text-gray-700">
                  Each session lasts 45 minutes via Zoom, and to ensure the best
                  experience and timely scheduling, the Cyberb4 team will confirm your consultation
                  only after receiving full payment. Need more time? Simply book extra slots for
                  extended guidance. Please note that services booked cannot be refunded or
                  cancelled; however, we’re happy to reschedule your session once if needed. We
                  appreciate your understanding and look forward to supporting you on your career
                  journey!
                </p>
              </div>

              {/* Book Service Button */}
              <div className="text-center">
                <button
                  onClick={() => handleServiceBooking("Career Counselling")}
                  className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
                >
                  Book Career Counselling Service
                </button>
              </div>
            </div>
          </section>
        </div>
      );
    }

    // Resume Development Sub-page
    if (currentServicePage === "resume") {
      return (
        <div className="pt-16">
          <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-transparent"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <button
                onClick={() => setCurrentServicePage("main")}
                className="text-teal-400 hover:text-teal-300 mb-4 flex items-center"
              >
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Back to
                Services
              </button>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Resume <span className="text-teal-400">Development</span>
              </h1>
              <p className="text-xl max-w-3xl text-gray-300">
                Professional, ATS-friendly resumes that get you noticed
              </p>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Our resume development service transforms your existing CV
                  into a professional, industry-specific document that passes
                  ATS (Applicant Tracking System) filters and captures recruiter
                  attention. We optimize your resume with relevant keywords,
                  proper formatting, and compelling content.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Whether you're a fresher or have some experience, we tailor
                  your resume to highlight your strengths, achievements, and
                  potential in the cybersecurity field. Our approach ensures
                  your profile stands out in competitive job markets.
                </p>
              </div>

              {/* Service Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                  <h3 className="text-xl font-bold mb-4">What's Included</h3>
                  <ul className="space-y-2">
                    {[
                      "Complete resume restructuring",
                      "ATS optimization",
                      "Industry-specific keywords",
                      "Professional formatting",
                      "Achievement highlighting",
                      "Skills section optimization",
                      "2 rounds of revisions",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-5 h-5 text-teal-500 mr-3" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                  <h3 className="text-xl font-bold mb-4">Delivery Timeline</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="bg-teal-100 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                        <span className="text-teal-600 text-sm font-bold">
                          1
                        </span>
                      </div>
                      <span className="text-gray-700">
                        Initial draft within 5 business days
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-teal-100 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                        <span className="text-teal-600 text-sm font-bold">
                          2
                        </span>
                      </div>
                      <span className="text-gray-700">
                        Revisions within 2 business days
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-teal-100 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                        <span className="text-teal-600 text-sm font-bold">
                          3
                        </span>
                      </div>
                      <span className="text-gray-700">
                        Final delivery in PDF & Word format
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Express Service Option */}
              <div className="bg-teal-50 p-6 rounded-lg mb-8 border border-teal-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  ⚡ Express Service Available
                </h3>
                <p className="text-gray-700 mb-4">
                  Need your resume urgently? Our express service delivers your
                  professionally crafted resume within 2 business days with
                  priority support.
                </p>
                <p className="text-sm text-gray-600">
                  Additional charges apply for express service.
                </p>
              </div>

               {/* Disclaimer */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-2">Disclaimer</h3>
                <p className="text-gray-700">
                  While Cyberb4 strives to craft resumes that effectively highlight your
                  skills and experience, we cannot guarantee job offers or interviews. The final resume
                  content depends on the accuracy and completeness of the information you provide.
                  It is your responsibility to review and approve the resume before using it. Cyberb4 is
                  not liable for any decisions made by employers based on your resume.
                </p>
              </div>
                
              {/* Book Service Button */}
              {/* <div className="text-center">
                <button
                  onClick={() => handleServiceBooking("Resume Development")}
                  className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
                >
                  Book Resume Development Service
                </button>
              </div> */}


               {/* Action Buttons  navigate*/}
         <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            {/* Test ATS Button */}
            <button
              onClick={() => navigate('checkats')} // Navigate to ATS check page
              className="bg-white text-teal-600 px-6 py-3 rounded-lg border-2 border-teal-600 hover:bg-teal-50 hover:border-teal-700 hover:text-teal-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
            >
              🔍 Test ATS Compatibility
            </button>
            
            {/* Book Service Button */}
            <button
              onClick={() => handleServiceBooking("Resume Development",true)}
              className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold shadow-md hover:shadow-lg"
            >
              📋 Book Resume Development Service
            </button>
          </div>
        
            </div>
          </section>
        </div>
      );
    }

    // Interview Preparation Sub-page
    // if (currentServicePage === "interview") {
    //   return (
    //     <div className="pt-16">
    //       <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 relative overflow-hidden">
    //         <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-transparent"></div>
    //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
    //           <button
    //             onClick={() => setCurrentServicePage("main")}
    //             className="text-teal-400 hover:text-teal-300 mb-4 flex items-center"
    //           >
    //             <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Back to
    //             Services
    //           </button>
    //           <h1 className="text-4xl md:text-5xl font-bold mb-6">
    //             Interview <span className="text-teal-400">Preparation</span>
    //           </h1>
    //           <p className="text-xl max-w-3xl text-gray-300">
    //             Master the art of cybersecurity interviews with expert coaching
    //           </p>
    //         </div>
    //       </section>

    //       <section className="py-16">
    //         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    //           <div className="prose prose-lg max-w-none mb-12">
    //             <p className="text-gray-700 text-lg leading-relaxed mb-6">
    //               Our interview preparation service equips you with the
    //               confidence and skills needed to excel in cybersecurity
    //               interviews. We cover both technical questions and soft skills,
    //               ensuring you're ready for any interview scenario.
    //             </p>
    //             <p className="text-gray-700 text-lg leading-relaxed">
    //               From entry-level positions to specialized roles, we provide
    //               targeted coaching that helps you articulate your knowledge
    //               effectively and make a lasting impression on potential
    //               employers.
    //             </p>
    //           </div>

    //           {/* Preparation Areas */}
    //           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
    //             <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
    //               <h3 className="text-xl font-bold mb-4">
    //                 Technical Interview Prep
    //               </h3>
    //               <ul className="space-y-2">
    //                 {[
    //                   "Common cybersecurity concepts",
    //                   "Network security fundamentals",
    //                   "Risk assessment methodologies",
    //                   "Compliance frameworks (ISO 27001, NIST)",
    //                   "Incident response procedures",
    //                   "Technical scenario questions",
    //                 ].map((item, index) => (
    //                   <li key={index} className="flex items-center">
    //                     <Check className="w-5 h-5 text-teal-500 mr-3" />
    //                     {item}
    //                   </li>
    //                 ))}
    //               </ul>
    //             </div>

    //             <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
    //               <h3 className="text-xl font-bold mb-4">
    //                 Soft Skills & HR Prep
    //               </h3>
    //               <ul className="space-y-2">
    //                 {[
    //                   "Behavioral interview questions",
    //                   "STAR method techniques",
    //                   "Communication skills enhancement",
    //                   "Body language and presentation",
    //                   "Salary negotiation tips",
    //                   "Questions to ask employers",
    //                 ].map((item, index) => (
    //                   <li key={index} className="flex items-center">
    //                     <Check className="w-5 h-5 text-teal-500 mr-3" />
    //                     {item}
    //                   </li>
    //                 ))}
    //               </ul>
    //             </div>
    //           </div>

    //           {/* Session Structure */}
    //           <div className="bg-white rounded-lg shadow-lg p-8 mb-12 border border-gray-200">
    //             <h2 className="text-2xl font-bold mb-8 text-center">
    //               Session Structure
    //             </h2>
    //             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    //               {[
    //                 {
    //                   title: "Assessment",
    //                   description:
    //                     "Evaluate your current interview readiness and identify improvement areas",
    //                   duration: "30 mins",
    //                 },
    //                 {
    //                   title: "Coaching Session",
    //                   description:
    //                     "Personalized training on technical concepts and interview  techniques",
    //                   duration: "30 mins",
    //                 },
    //                 {
    //                   title: "Practice & Feedback",
    //                   description:
    //                     "Mock questions with detailed feedback and improvement suggestions",
    //                   duration: "30 mins",
    //                 },
    //               ].map((session, index) => (
    //                 <div key={index} className="text-center">
    //                   <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
    //                     <span className="text-teal-600 font-bold">
    //                       {index + 1}
    //                     </span>
    //                   </div>
    //                   <h3 className="font-semibold mb-2">{session.title}</h3>
    //                   <p className="text-sm text-gray-600 mb-2">
    //                     {session.description}
    //                   </p>
    //                   <span className="text-teal-600 font-semibold">
    //                     {session.duration}
    //                   </span>
    //                 </div>
    //               ))}
    //             </div>
    //           </div>

    //           {/* Book Service Button */}
    //           <div className="text-center">
    //             <button
    //               onClick={() => handleServiceBooking("Interview Preparation")}
    //               className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
    //             >
    //               Book Interview Preparation Service
    //             </button>
    //           </div>
    //         </div>
    //       </section>
    //     </div>
    //   );
    // }
if (currentServicePage === "interview") {
  return (
    <div className="pt-16">
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <button
            onClick={() => setCurrentServicePage("main")}
            className="text-teal-400 hover:text-teal-300 mb-4 flex items-center"
          >
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Back to
            Services
          </button>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Interview <span className="text-teal-400">Preparation</span>
          </h1>
          <p className="text-xl max-w-3xl text-gray-300">
            Master the art of cybersecurity interviews with expert coaching
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Our interview preparation service equips you with the
              confidence and skills needed to excel in cybersecurity
              interviews. We cover both technical questions and soft skills,
              ensuring you're ready for any interview scenario.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              From entry-level positions to specialized roles, we provide
              targeted coaching that helps you articulate your knowledge
              effectively and make a lasting impression on potential
              employers.
            </p>
          </div>

          {/* Preparation Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-4">
                Technical Interview Prep
              </h3>
              <ul className="space-y-2">
                {[
                  "Common cybersecurity concepts",
                  "Network security fundamentals",
                  "Risk assessment methodologies",
                  "Compliance frameworks (ISO 27001, NIST)",
                  "Incident response procedures",
                  "Technical scenario questions",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-teal-500 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-4">
                Soft Skills & HR Prep
              </h3>
              <ul className="space-y-2">
                {[
                  "Behavioral interview questions",
                  "STAR method techniques",
                  "Communication skills enhancement",
                  "Body language and presentation",
                  "Salary negotiation tips",
                  "Questions to ask employers",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-teal-500 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Session Structure */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12 border border-gray-200">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Session Structure
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Assessment",
                  description:
                    "Evaluate your current interview readiness and identify improvement areas",
                  duration: "30 mins",
                },
                {
                  title: "Coaching Session",
                  description:
                    "Personalized training on technical concepts and interview techniques",
                  duration: "30 mins",
                },
                {
                  title: "Practice & Feedback",
                  description:
                    "Mock questions with detailed feedback and improvement suggestions",
                  duration: "30 mins",
                },
              ].map((session, index) => (
                <div key={index} className="text-center">
                  <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-teal-600 font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2">{session.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {session.description}
                  </p>
                  <span className="text-teal-600 font-semibold">
                    {session.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Express Service */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Express Service Available
            </h2>
            <div className="max-w-2xl mx-auto">
              <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-8 rounded-lg border border-teal-200 shadow-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-2xl mr-2">⚡</span>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Express Interview Preparation
                    </h3>
                  </div>
                  <p className="text-gray-700 mb-4 text-lg">
                    Priority interview preparation with scheduling in 2 working days
                  </p>
                  <div className="text-4xl font-bold text-teal-600 mb-6">
                    ₹2,500
                  </div>
                  <ul className="text-left space-y-3 mb-8 max-w-md mx-auto">
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Priority scheduling within 2 business days</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Intensive interview coaching session</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Role-specific preparation materials</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">24-hour support during preparation</span>
                    </li>
                  </ul>
                  <button
                    onClick={() =>
                      handleServiceBooking("Express Interview Preparation")
                    }
                    className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold shadow-md hover:shadow-lg"
                  >
                    🚀 Book Express Service
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Regular Service Button */}
          <div className="text-center">
            <button
              onClick={() => handleServiceBooking("Interview Preparation")}
              className="bg-white text-teal-600 px-8 py-3 rounded-lg border-2 border-teal-600 hover:bg-teal-50 hover:border-teal-700 hover:text-teal-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
            >
              📅 Book Standard Interview Preparation
            </button>
          </div>
            {/* Disclaimer */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8 mt-10">
                <h3 className="font-semibold text-gray-900 mb-2">Disclaimer</h3>
                <p className="text-gray-700">
                 Cyberb4 provides guidance and coaching to help you improve your
                interview skills; however, we cannot guarantee job offers or interview calls as
                outcomes depend on various factors beyond our control. Success also relies on your
                own preparation and effort. Please note that Cyberb4 does not offer jobs in
                exchange for money or any form of payment. We commit to delivering quality
                support, but final interview results are not guaranteed.
                </p>
              </div>
          
        </div>
        
      </section>
    </div>
  );
}
    // Mock Interview Sub-page
    if (currentServicePage === "mock") {
      return (
        <div className="pt-16">
          <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-transparent"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <button
                onClick={() => setCurrentServicePage("main")}
                className="text-teal-400 hover:text-teal-300 mb-4 flex items-center"
              >
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Back to
                Services
              </button>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Mock <span className="text-teal-400">Interview</span>
              </h1>
              <p className="text-xl max-w-3xl text-gray-300">
                Realistic interview simulation with expert feedback
              </p>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Experience a realistic interview environment with our mock
                  interview service. Conducted by industry professionals, these
                  sessions simulate real interview conditions and provide
                  invaluable practice before your actual interviews.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  You'll receive detailed feedback on your performance,
                  including areas of strength and specific recommendations for
                  improvement. This service is perfect for building confidence
                  and refining your interview skills.
                </p>
              </div>

              {/* Mock Interview Process */}
              <div className="bg-white rounded-lg shadow-lg p-8 mb-12 border border-gray-200">
                <h2 className="text-2xl font-bold mb-8 text-center">
                  Mock Interview Process
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    {
                      step: "1",
                      title: "Pre-Interview",
                      description:
                        "Share your target role and experience level",
                    },
                    {
                      step: "2",
                      title: "Simulation",
                      description: "45-60 minute realistic interview session",
                    },
                    {
                      step: "3",
                      title: "Feedback",
                      description:
                        "Detailed performance analysis and suggestions",
                    },
                    {
                      step: "4",
                      title: "Follow-up",
                      description: "Action plan for improvement areas",
                    },
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-teal-600 font-bold">
                          {item.step}
                        </span>
                      </div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* What We Evaluate */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                  <h3 className="text-xl font-bold mb-4">
                    Technical Assessment
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Technical knowledge accuracy",
                      "Problem-solving approach",
                      "Scenario-based responses",
                      "Industry best practices",
                      "Current trends awareness",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-5 h-5 text-teal-500 mr-3" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                  <h3 className="text-xl font-bold mb-4">
                    Soft Skills Evaluation
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Communication clarity",
                      "Confidence level",
                      "Body language",
                      "Professional demeanor",
                      "Question handling ability",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-5 h-5 text-teal-500 mr-3" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Feedback Report */}
              <div className="bg-teal-50 p-6 rounded-lg mb-8 border border-teal-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  📊 Detailed Feedback Report
                </h3>
                <p className="text-gray-700 mb-4">
                  After your mock interview, you'll receive a comprehensive
                  feedback report including:
                </p>
                <ul className="text-gray-700 space-y-1">
                  <li>• Performance scoring across different areas</li>
                  <li>• Specific strengths and improvement areas</li>
                  <li>• Recommended resources for skill enhancement</li>
                  <li>• Tips for your next interview</li>
                </ul>
              </div>

              {/* Book Service Button */}
              <div className="text-center">
                <button
                  onClick={() => handleServiceBooking("Mock Interview")}
                  className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
                >
                  Book Mock Interview Service
                </button>
              </div>

              {/* Disclaimer */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8 mt-10">
                <h3 className="font-semibold text-gray-900 mb-2">Disclaimer</h3>
                <p className="text-gray-700">
                 The mock interview is a simulated practice session designed to help
                  you improve your interview skills. While we provide constructive feedback and
                  guidance, successful job placement depends on multiple factors beyond our control,
                  including employer decisions and market conditions. Cyberb4 does not guarantee
                  job offers or interview success. This service is intended solely as a preparation tool
                  to boost your confidence and readiness.
                </p>
              </div>
            </div>
          </section>
        </div>
      );
    }

    // Fallback
    return null;
  };



const BlogCard = ({ blog, onBlogClick }) => {
  // Map API response fields to component props
  const {
    _id,
    title,
    description, // Using description as excerpt
    author = 'Admin',
    createdAt,
    thumbnail,
    tags = [],
    status,
    content
  } = blog;

  // Calculate read time based on content length (rough estimation)
  const calculateReadTime = (content) => {
    if (!content) return 1;
    const wordsPerMinute = 200;
    const textContent = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
    const wordCount = textContent.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute) || 1;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
   const handleReadMore = () => {
    navigate(`/blog/${blog._id || blog.id}`);
  };

  const readTime = calculateReadTime(content);
  const publishDate = formatDate(createdAt);

  return (
    <Card
      hoverable
      className="h-full flex flex-col overflow-hidden group transition-all duration-300"
      onClick={() => onBlogClick && onBlogClick(blog)}
      cover={
        <div className="relative overflow-hidden h-48">
          <img
            src={thumbnail || 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=240&fit=crop'}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=240&fit=crop';
            }}
          />
          <div className="absolute top-4 left-4">
            <Tag color={status === 'published' ? 'green' : 'orange'} className="font-semibold">
              {status === 'published' ? 'Published' : 'Draft'}
            </Tag>
          </div>
        </div>
      }
    >
      <div className="flex flex-col h-full">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        {/* Description/Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed flex-grow">
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <Tag
                key={index}
                icon={<TagsOutlined />}
                color="blue"
                className="text-xs"
              >
                {tag}
              </Tag>
            ))}
            {tags.length > 3 && (
              <Tag className="text-xs" color="default">
                +{tags.length - 3} more
              </Tag>
            )}
          </div>
        )}

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <UserOutlined className="mr-1" />
              <span>{author}</span>
            </div>
            <div className="flex items-center">
              <CalendarOutlined className="mr-1" />
              <span>{publishDate}</span>
            </div>
          </div>
          <div className="flex items-center">
            <ClockCircleOutlined className="mr-1" />
            <span>{readTime} min read</span>
          </div>
        </div>

        {/* Read More Button */}
        <Button 
        onClick={()=>handleReadMore()}
          type="link" 
          className="p-0 h-auto font-semibold flex items-center justify-start hover:text-blue-600 transition-colors mt-auto"
          icon={<EyeOutlined />}
        >
          Read More
          <ArrowRightOutlined className="ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </Card>
  );
};

const BlogDisplay = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [error, setError] = useState(null);

  // Fetch blogs from API
  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getBlogsApi();
      
      if (response.success) {
        console.log(response.data,"data list")
        setBlogs(response.data);
      } else {
        setError(response.message);
        message.error(response.message);
      }
    } catch (err) {
      const errorMessage = 'Failed to load blogs. Please try again.';
      setError(errorMessage);
      message.error(errorMessage);
      console.error('Blog fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle blog selection
  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
    // You can add navigation logic here, e.g.:
    // navigate(`/blog/${blog._id}`);
    console.log('Selected blog:', blog);
  };

  // Retry function
  const handleRetry = () => {
    fetchBlogs();
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spin size="large" />
        <span className="ml-3 text-gray-600">Loading blogs...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-20">
        <Empty
          description={
            <div>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button 
                type="primary" 
                icon={<ReloadOutlined />}
                onClick={handleRetry}
              >
                Try Again
              </Button>
            </div>
          }
        />
      </div>
    );
  }

  // Empty state
  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-20">
        <Empty 
          description="No blogs found. Create your first blog post!"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Latest Blog Posts
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover insights, tutorials, and expert advice on cybersecurity and technology
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <BlogCard 
            key={blog._id} 
            blog={blog} 
            onBlogClick={handleBlogClick}
          />
        ))}
      </div>

      {/* Load More Button (if needed for pagination) */}
      {blogs.length > 0 && (
        <div className="text-center mt-12">
          <Button size="large" type="default">
            Load More Posts
          </Button>
        </div>
      )}
    </div>
  );
};

  // Blog Page
  // const BlogPage = () => 
  //  {
  //   const blogPosts = [
  //   {
  //     id: 1,
  //     title: "Getting Started with Cybersecurity: A Complete Beginner's Guide",
  //     excerpt: "Learn the fundamentals of cybersecurity, from basic concepts to essential tools and techniques. Perfect for those starting their journey in information security.",
  //     author: "Cyberb4 Team",
  //     publishDate: "Jan 15, 2025",
  //     readTime: 8,
  //     category: "Beginner Guide",
  //     imageUrl: "/api/placeholder/400/240",
  //     tags: ["Cybersecurity", "Beginner", "Career", "Fundamentals"]
  //   },
  //   {
  //     id: 2,
  //     title: "Top 10 Cybersecurity Certifications for 2025",
  //     excerpt: "Discover the most valuable cybersecurity certifications that can boost your career prospects and earning potential in the current job market.",
  //     author: "Security Expert",
  //     publishDate: "Jan 12, 2025",
  //     readTime: 12,
  //     category: "Certifications",
  //     imageUrl: "/api/placeholder/400/240",
  //     tags: ["Certifications", "Career Growth", "Professional Development"]
  //   },
  //   {
  //     id: 3,
  //     title: "How to Ace Your Cybersecurity Interview: Tips from Industry Experts",
  //     excerpt: "Master the art of cybersecurity interviews with proven strategies, common questions, and expert advice to land your dream job.",
  //     author: "Interview Coach",
  //     publishDate: "Jan 10, 2025",
  //     readTime: 10,
  //     category: "Interview Tips",
  //     imageUrl: "/api/placeholder/400/240",
  //     tags: ["Interview", "Job Search", "Career Tips", "HR"]
  //   },
  //   {
  //     id: 4,
  //     title: "Understanding Data Privacy Laws: GDPR, CCPA, and Beyond",
  //     excerpt: "Navigate the complex landscape of data privacy regulations and learn how to ensure compliance in your organization.",
  //     author: "Privacy Consultant",
  //     publishDate: "Jan 8, 2025",
  //     readTime: 15,
  //     category: "Data Privacy",
  //     imageUrl: "/api/placeholder/400/240",
  //     tags: ["GDPR", "CCPA", "Privacy", "Compliance", "Legal"]
  //   },
  //   {
  //     id: 5,
  //     title: "Building Your First SOC: Essential Tools and Technologies",
  //     excerpt: "A comprehensive guide to setting up a Security Operations Center, including must-have tools, technologies, and best practices.",
  //     author: "SOC Manager",
  //     publishDate: "Jan 5, 2025",
  //     readTime: 18,
  //     category: "SOC Operations",
  //     imageUrl: "/api/placeholder/400/240",
  //     tags: ["SOC", "Security Operations", "Tools", "Technology"]
  //   },
  //   {
  //     id: 6,
  //     title: "Incident Response Planning: A Step-by-Step Framework",
  //     excerpt: "Learn how to create an effective incident response plan that minimizes damage and ensures quick recovery from security breaches.",
  //     author: "Incident Manager",
  //     publishDate: "Jan 3, 2025",
  //     readTime: 14,
  //     category: "Incident Response",
  //     imageUrl: "/api/placeholder/400/240",
  //     tags: ["Incident Response", "Planning", "Security", "Best Practices"]
  //   }
  // ];
  //   (
  //   <div className="pt-16">
  //     <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-20 relative overflow-hidden">
  //       <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-transparent"></div>
  //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
  //         <div className="text-center">
  //           <h1 className="text-4xl md:text-5xl font-bold mb-6">
  //             Cyber Security <span className="text-teal-400">Blog</span>
  //           </h1>
  //           <p className="text-xl max-w-3xl mx-auto text-gray-300">
  //             Stay updated with the latest trends, insights, and career advice
  //             in cybersecurity
  //           </p>
  //         </div>
  //       </div>
  //     </section>

  //     <section className="py-16">
  //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //         <div className="text-center py-20">
  //           <h2 className="text-3xl font-bold text-gray-900 mb-4">
  //             Coming Soon
  //           </h2>
  //           <p className="text-gray-600 max-w-2xl mx-auto">
  //             We're working on bringing you valuable insights, career tips, and
  //             industry updates. Our blog will feature expert articles on
  //             cybersecurity trends, certification guides, and career development
  //             strategies.
  //           </p>
  //         </div>
  //       </div>
  //     </section>
  //   </div>
  // )};
const BlogPage = () => {
  // Sample blog data - replace with your actual blog data
  const blogPosts = [
     {
    id: 1,
    title: "Getting Started with Cybersecurity: A Complete Beginner's Guide",
    excerpt: "Learn the fundamentals of cybersecurity, from basic concepts to essential tools and techniques. Perfect for those starting their journey in information security.",
    author: "Cyberb4 Team",
    publishDate: "Jan 15, 2025",
    readTime: 8,
    category: "Beginner Guide",
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=240&fit=crop",
    tags: ["Cybersecurity", "Beginner", "Career", "Fundamentals"]
  },
  {
    id: 2,
    title: "Top 10 Cybersecurity Certifications for 2025",
    excerpt: "Discover the most valuable cybersecurity certifications that can boost your career prospects and earning potential in the current job market.",
    author: "Security Expert",
    publishDate: "Jan 12, 2025",
    readTime: 12,
    category: "Certifications",
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=240&fit=crop",
    tags: ["Certifications", "Career Growth", "Professional Development"]
  },
  {
    id: 3,
    title: "How to Ace Your Cybersecurity Interview: Tips from Industry Experts",
    excerpt: "Master the art of cybersecurity interviews with proven strategies, common questions, and expert advice to land your dream job.",
    author: "Interview Coach",
    publishDate: "Jan 10, 2025",
    readTime: 10,
    category: "Interview Tips",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=240&fit=crop",
    tags: ["Interview", "Job Search", "Career Tips", "HR"]
  },
  {
    id: 4,
    title: "Understanding Data Privacy Laws: GDPR, CCPA, and Beyond",
    excerpt: "Navigate the complex landscape of data privacy regulations and learn how to ensure compliance in your organization.",
    author: "Privacy Consultant",
    publishDate: "Jan 8, 2025",
    readTime: 15,
    category: "Data Privacy",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=240&fit=crop",
    tags: ["GDPR", "CCPA", "Privacy", "Compliance", "Legal"]
  },
  {
    id: 5,
    title: "Building Your First SOC: Essential Tools and Technologies",
    excerpt: "A comprehensive guide to setting up a Security Operations Center, including must-have tools, technologies, and best practices.",
    author: "SOC Manager",
    publishDate: "Jan 5, 2025",
    readTime: 18,
    category: "SOC Operations",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=240&fit=crop",
    tags: ["SOC", "Security Operations", "Tools", "Technology"]
  },
  {
    id: 6,
    title: "Incident Response Planning: A Step-by-Step Framework",
    excerpt: "Learn how to create an effective incident response plan that minimizes damage and ensures quick recovery from security breaches.",
    author: "Incident Manager",
    publishDate: "Jan 3, 2025",
    readTime: 14,
    category: "Incident Response",
    imageUrl: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&h=240&fit=crop",
    tags: ["Incident Response", "Planning", "Security", "Best Practices"]
  },
  {
    id: 7,
    title: "Zero Trust Architecture: The Future of Network Security",
    excerpt: "Explore how Zero Trust principles are revolutionizing cybersecurity strategies and why traditional perimeter-based security is no longer sufficient in today's threat landscape.",
    author: "Network Security Analyst",
    publishDate: "Dec 28, 2024",
    readTime: 11,
    category: "Network Security",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=240&fit=crop",
    tags: ["Zero Trust", "Network Security", "Architecture", "Modern Security"]
  },
  {
    id: 8,
    title: "AI and Machine Learning in Cybersecurity: Opportunities and Challenges",
    excerpt: "Discover how artificial intelligence is transforming threat detection and response, while understanding the new vulnerabilities it introduces.",
    author: "AI Security Researcher",
    publishDate: "Dec 25, 2024",
    readTime: 16,
    category: "AI Security",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=240&fit=crop",
    tags: ["AI", "Machine Learning", "Threat Detection", "Innovation"]
  },
  {
    id: 9,
    title: "Cloud Security Best Practices for Remote Teams",
    excerpt: "Essential security measures every organization should implement when transitioning to cloud-based infrastructure and remote work environments.",
    author: "Cloud Security Expert",
    publishDate: "Dec 22, 2024",
    readTime: 13,
    category: "Cloud Security",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=240&fit=crop",
    tags: ["Cloud Security", "Remote Work", "Best Practices", "Infrastructure"]
  },
  {
    id: 10,
    title: "Penetration Testing Career Path: Skills, Tools, and Certifications",
    excerpt: "A comprehensive roadmap for aspiring penetration testers, covering essential skills, popular tools, and the certifications that matter most to employers.",
    author: "Ethical Hacker",
    publishDate: "Dec 20, 2024",
    readTime: 20,
    category: "Career Development",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=240&fit=crop",
    tags: ["Penetration Testing", "Ethical Hacking", "Career Path", "Skills"]
  },
  {
    id: 11,
    title: "Ransomware Defense Strategies for Small Businesses",
    excerpt: "Practical and cost-effective security measures that small businesses can implement to protect against ransomware attacks and minimize potential damage.",
    author: "SMB Security Consultant",
    publishDate: "Dec 18, 2024",
    readTime: 9,
    category: "Threat Prevention",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=240&fit=crop",
    tags: ["Ransomware", "Small Business", "Prevention", "Defense"]
  },
  {
    id: 12,
    title: "The Psychology of Social Engineering: Understanding Human Vulnerabilities",
    excerpt: "Dive deep into the psychological tactics used by cybercriminals and learn how to build a human firewall through awareness and training.",
    author: "Security Awareness Trainer",
    publishDate: "Dec 15, 2024",
    readTime: 14,
    category: "Social Engineering",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=240&fit=crop",
    tags: ["Social Engineering", "Psychology", "Human Factor", "Awareness"]
  },
  ]

   const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [error, setError] = useState(null);

  // Fetch blogs from API
  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getBlogsApi();
      
      if (response.success) {
        console.log(response.data,"data list")
        setBlogs(response.data);
      } else {
        setError(response.message);
        message.error(response.message);
      }
    } catch (err) {
      const errorMessage = 'Failed to load blogs. Please try again.';
      setError(errorMessage);
      message.error(errorMessage);
      console.error('Blog fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle blog selection
  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
    // You can add navigation logic here, e.g.:
    // navigate(`/blog/${blog._id}`);
    console.log('Selected blog:', blog);
  };

  // Retry function
  const handleRetry = () => {
    fetchBlogs();
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spin size="large" />
        <span className="ml-3 text-gray-600">Loading blogs...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-20">
        <Empty
          description={
            <div>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button 
                type="primary" 
                icon={<ReloadOutlined />}
                onClick={handleRetry}
              >
                Try Again
              </Button>
            </div>
          }
        />
      </div>
    );
  }

  // Empty state
  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-20">
        <Empty 
          description="No blogs found. Create your first blog post!"
        />
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Cyber Security <span className="text-teal-400">Blog</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-300">
              Stay updated with the latest trends, insights, and career advice in cybersecurity
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter/Search Bar */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
              <div className="flex gap-2">
                {['All', 'Beginner Guide', 'Certifications', 'Interview Tips', 'Data Privacy'].map((category) => (
                  <button
                    key={category}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-teal-50 hover:border-teal-300 transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Blog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs?.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stay Updated with Cybersecurity Insights
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to our newsletter for the latest cybersecurity trends, career tips, and industry news.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
  // Pricing Page
  // const PricingPage = () => (
  //   <div className="pt-16">
  //     <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-20 relative overflow-hidden">
  //       <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-transparent"></div>
  //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
  //         <div className="text-center">
  //           <h1 className="text-4xl md:text-5xl font-bold mb-6">
  //             Service <span className="text-teal-400">Pricing</span>
  //           </h1>
  //           <p className="text-xl max-w-3xl mx-auto text-gray-300">
  //             Comprehensive career support for cyber security aspirants with
  //             transparent pricing
  //           </p>
  //         </div>
  //       </div>
  //     </section>

  //     <section className="py-16">
  //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //         <div className="text-center mb-12">
  //           <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
  //             Cyberb4 provides comprehensive career support for cyber security
  //             aspirants, covering personalized career guidance, professional
  //             resume crafting, interview readiness coaching, and realistic mock
  //             interviews with expert feedback. You can choose individual
  //             services or save by opting for bundled packages tailored to
  //             accelerate your job search success.
  //           </p>
  //         </div>

  //         {/* Individual Services */}
  //         <div className="mb-16">
  //           <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
  //             Individual Services
  //           </h2>
  //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  //             {[
  //               {
  //                 title: "Career Counselling",
  //                 description: "Personalized career guidance",
  //                 price: "₹1,500",
  //                 features: [
  //                   "One-on-one consultation",
  //                   "Career roadmap",
  //                   "Industry insights",
  //                   "Certification guidance",
  //                 ],
  //               },
  //               {
  //                 title: "Resume Development",
  //                 description: "ATS-optimized professional resume",
  //                 price: "₹1,500",
  //                 features: [
  //                   "Professional formatting",
  //                   "ATS optimization",
  //                   "Industry keywords",
  //                   "2 rounds of revision",
  //                 ],
  //               },
  //               {
  //                 title: "Interview Preparation",
  //                 description:
  //                   "Coaching for interviews with role-specific tips",
  //                 price: "₹1,800",
  //                 features: [
  //                   "Technical prep",
  //                   "Behavioral questions",
  //                   "Communication skills",
  //                   "Practice sessions",
  //                 ],
  //               },
  //               {
  //                 title: "Mock Interview",
  //                 description: "Realistic interview simulation with feedback",
  //                 price: "₹2,500",
  //                 features: [
  //                   "45-60 min simulation",
  //                   "Expert feedback",
  //                   "Performance analysis",
  //                   "Improvement plan",
  //                 ],
  //               },
  //             ].map((service, index) => (
  //               <div
  //                 key={index}
  //                 className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
  //               >
  //                 <h3 className="text-xl font-bold mb-2">{service.title}</h3>
  //                 <p className="text-gray-600 mb-4">{service.description}</p>
  //                 <div className="text-3xl font-bold text-teal-600 mb-4">
  //                   {service.price}
  //                 </div>
  //                 <ul className="space-y-2 mb-6">
  //                   {service.features.map((feature, idx) => (
  //                     <li key={idx} className="flex items-center text-sm">
  //                       <Check className="w-4 h-4 text-teal-500 mr-2" />
  //                       {feature}
  //                     </li>
  //                   ))}
  //                 </ul>
  //                 <button
  //                   onClick={() => handleServiceBooking(service.title)}
  //                   className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors"
  //                 >
  //                   Book Now
  //                 </button>
  //               </div>
  //             ))}
  //           </div>
  //         </div>

  //         {/* Bundle Packages */}
  //         <div className="mb-16">
  //           <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
  //             Bundle Packages
  //           </h2>
  //           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  //             {[
  //               {
  //                 title: "Starter Package",
  //                 description: "Career Counselling + Resume Development",
  //                 originalPrice: "₹3,000",
  //                 price: "₹2,500",
  //                 savings: "Save ₹500",
  //                 features: [
  //                   "Personalized career guidance",
  //                   "Professional resume development",
  //                   "ATS optimization",
  //                   "Career roadmap planning",
  //                 ],
  //                 popular: false,
  //               },
  //               {
  //                 title: "Interview Success Package",
  //                 description: "Interview Preparation + Mock Interview",
  //                 originalPrice: "₹4,300",
  //                 price: "₹3,000",
  //                 savings: "Save ₹1,300",
  //                 features: [
  //                   "Comprehensive interview coaching",
  //                   "Realistic mock interview",
  //                   "Expert feedback & analysis",
  //                   "Performance improvement plan",
  //                 ],
  //                 popular: true,
  //               },
  //               {
  //                 title: "Complete Career Boost Package",
  //                 description: "All 4 Services",
  //                 originalPrice: "₹7,300",
  //                 price: "₹5,500",
  //                 savings: "Save ₹1,800",
  //                 features: [
  //                   "Complete career guidance",
  //                   "Professional resume",
  //                   "Interview preparation",
  //                   "Mock interview with feedback",
  //                   "End-to-end career support",
  //                 ],
  //                 popular: false,
  //               },
  //             ].map((bundle, index) => (
  //               <div
  //                 key={index}
  //                 className={`bg-white p-8 rounded-lg shadow-lg border-2 hover:shadow-xl transition-shadow relative ${
  //                   bundle.popular ? "border-teal-500" : "border-gray-200"
  //                 }`}
  //               >
  //                 {bundle.popular && (
  //                   <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
  //                     <span className="bg-teal-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
  //                       Most Popular
  //                     </span>
  //                   </div>
  //                 )}
  //                 <h3 className="text-2xl font-bold mb-2">{bundle.title}</h3>
  //                 <p className="text-gray-600 mb-4">{bundle.description}</p>
  //                 <div className="mb-4">
  //                   <span className="text-sm text-gray-500 line-through">
  //                     {bundle.originalPrice}
  //                   </span>
  //                   <div className="text-3xl font-bold text-teal-600">
  //                     {bundle.price}
  //                   </div>
  //                   <div className="text-green-600 font-semibold">
  //                     {bundle.savings}
  //                   </div>
  //                 </div>
  //                 <ul className="space-y-3 mb-6">
  //                   {bundle.features.map((feature, idx) => (
  //                     <li key={idx} className="flex items-center">
  //                       <Check className="w-5 h-5 text-teal-500 mr-3" />
  //                       {feature}
  //                     </li>
  //                   ))}
  //                 </ul>
  //                 <button
  //                   onClick={() => handleServiceBooking(bundle.title)}
  //                   className={`w-full py-3 rounded-lg font-semibold transition-colors ${
  //                     bundle.popular
  //                       ? "bg-teal-600 text-white hover:bg-teal-700"
  //                       : "bg-gray-100 text-gray-900 hover:bg-gray-200"
  //                   }`}
  //                 >
  //                   Choose Package
  //                 </button>
  //               </div>
  //             ))}
  //           </div>
  //         </div>

  //         {/* Express Service */}
  //         <div className="mb-16">
  //           <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
  //             Express Service
  //           </h2>
  //           <div className="max-w-2xl mx-auto">
  //             <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-8 rounded-lg border border-teal-200">
  //               <div className="text-center">
  //                 <h3 className="text-2xl font-bold mb-2">
  //                   Express Interview Preparation
  //                 </h3>
  //                 <p className="text-gray-700 mb-4">
  //                   Interview Preparation with scheduling in 2 working days
  //                 </p>
  //                 <div className="text-4xl font-bold text-teal-600 mb-4">
  //                   ₹2,500
  //                 </div>
  //                 <ul className="text-left space-y-2 mb-6 max-w-md mx-auto">
  //                   <li className="flex items-center">
  //                     <Check className="w-5 h-5 text-teal-500 mr-3" />
  //                     Priority scheduling within 2 business days
  //                   </li>
  //                   <li className="flex items-center">
  //                     <Check className="w-5 h-5 text-teal-500 mr-3" />
  //                     Intensive interview coaching session
  //                   </li>
  //                   <li className="flex items-center">
  //                     <Check className="w-5 h-5 text-teal-500 mr-3" />
  //                     Role-specific preparation materials
  //                   </li>
  //                   <li className="flex items-center">
  //                     <Check className="w-5 h-5 text-teal-500 mr-3" />
  //                     24-hour support during preparation
  //                   </li>
  //                 </ul>
  //                 <button
  //                   onClick={() =>
  //                     handleServiceBooking("Express Interview Preparation")
  //                   }
  //                   className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
  //                 >
  //                   Book Express Service
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //         </div>

  //         {/* Pricing Table */}
  //         <div className="mb-16">
  //           <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
  //             Pricing Summary
  //           </h2>
  //           <div className="overflow-x-auto">
  //             <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
  //               <thead className="bg-gray-50">
  //                 <tr>
  //                   <th className="px-6 py-4 text-left font-semibold text-gray-900">
  //                     Service / Package
  //                   </th>
  //                   <th className="px-6 py-4 text-left font-semibold text-gray-900">
  //                     Description
  //                   </th>
  //                   <th className="px-6 py-4 text-right font-semibold text-gray-900">
  //                     Price (INR)
  //                   </th>
  //                 </tr>
  //               </thead>
  //               <tbody className="divide-y divide-gray-200">
  //                 <tr>
  //                   <td className="px-6 py-4 font-medium">
  //                     Career Counselling
  //                   </td>
  //                   <td className="px-6 py-4 text-gray-600">
  //                     Personalized career guidance
  //                   </td>
  //                   <td className="px-6 py-4 text-right font-semibold text-teal-600">
  //                     ₹1,500
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td className="px-6 py-4 font-medium">
  //                     Resume Development
  //                   </td>
  //                   <td className="px-6 py-4 text-gray-600">
  //                     ATS-optimized professional resume
  //                   </td>
  //                   <td className="px-6 py-4 text-right font-semibold text-teal-600">
  //                     ₹1,500
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td className="px-6 py-4 font-medium">
  //                     Interview Preparation
  //                   </td>
  //                   <td className="px-6 py-4 text-gray-600">
  //                     Coaching for interviews with role-specific tips
  //                   </td>
  //                   <td className="px-6 py-4 text-right font-semibold text-teal-600">
  //                     ₹1,800
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td className="px-6 py-4 font-medium">Mock Interview</td>
  //                   <td className="px-6 py-4 text-gray-600">
  //                     Realistic interview simulation with feedback
  //                   </td>
  //                   <td className="px-6 py-4 text-right font-semibold text-teal-600">
  //                     ₹2,500
  //                   </td>
  //                 </tr>
  //                 <tr className="bg-teal-50">
  //                   <td
  //                     className="px-6 py-4 font-bold text-teal-900"
  //                     colSpan="3"
  //                   >
  //                     Bundles
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td className="px-6 py-4 font-medium">Starter Package</td>
  //                   <td className="px-6 py-4 text-gray-600">
  //                     Career Counselling + Resume Development
  //                   </td>
  //                   <td className="px-6 py-4 text-right">
  //                     <span className="font-semibold text-teal-600">
  //                       ₹2,500
  //                     </span>
  //                     <span className="text-green-600 text-sm ml-2">
  //                       (Save ₹500)
  //                     </span>
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td className="px-6 py-4 font-medium">
  //                     Interview Success Package
  //                   </td>
  //                   <td className="px-6 py-4 text-gray-600">
  //                     Interview Preparation + Mock Interview
  //                   </td>
  //                   <td className="px-6 py-4 text-right">
  //                     <span className="font-semibold text-teal-600">
  //                       ₹3,000
  //                     </span>
  //                     <span className="text-green-600 text-sm ml-2">
  //                       (Save ₹1,300)
  //                     </span>
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td className="px-6 py-4 font-medium">
  //                     Complete Career Boost Package
  //                   </td>
  //                   <td className="px-6 py-4 text-gray-600">All 4 Services</td>
  //                   <td className="px-6 py-4 text-right">
  //                     <span className="font-semibold text-teal-600">
  //                       ₹5,500
  //                     </span>
  //                     <span className="text-green-600 text-sm ml-2">
  //                       (Save ₹1,800)
  //                     </span>
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td className="px-6 py-4 font-medium">
  //                     Express Interview Preparation
  //                   </td>
  //                   <td className="px-6 py-4 text-gray-600">
  //                     Interview Preparation with scheduling in 2 working days
  //                   </td>
  //                   <td className="px-6 py-4 text-right font-semibold text-teal-600">
  //                     ₹2,500
  //                   </td>
  //                 </tr>
  //               </tbody>
  //             </table>
  //           </div>
  //         </div>

  //         {/* Disclaimer */}
  //         <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
  //           <h3 className="font-semibold text-gray-900 mb-2">Disclaimer</h3>
  //           <p className="text-gray-700">
  //             The prices mentioned above apply to students and candidates
  //             residing in India only. For clients outside India, please contact
  //             us for customized pricing and offers.
  //           </p>
  //         </div>

  //         {/* CTA Section */}
  //         <div className="text-center mt-12">
  //           <h3 className="text-2xl font-bold text-gray-900 mb-4">
  //             Ready to Start Your Cybersecurity Career?
  //           </h3>
  //           <p className="text-gray-600 mb-6">
  //             Choose the service that best fits your needs or contact us for
  //             personalized guidance.
  //           </p>
  //           <div className="flex flex-col sm:flex-row gap-4 justify-center">
  //             <button
  //               onClick={() => setShowConsultationForm(true)}
  //               className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
  //             >
  //               Schedule Free Consultation
  //             </button>
  //             <button
  //               onClick={() => setCurrentPage("services")}
  //               className="border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-lg hover:bg-teal-600 hover:text-white transition-colors font-semibold"
  //             >
  //               Learn More About Services
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </section>
  //   </div>
  // );
const PricingPage = () => (
    <div className="pt-16">
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Service <span className="text-teal-400">Pricing</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-300">
              Comprehensive career support for cyber security aspirants with
              affordable pricing
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Cyberb4 provides comprehensive career support for cyber security
              aspirants, covering personalized career guidance, professional
              resume crafting, interview readiness coaching, and realistic mock
              interviews with expert feedback. You can choose individual
              services or save by opting for bundled packages tailored to
              accelerate your job search success.
            </p>
          </div>

          {/* Individual Services */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Individual Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Career Counselling",
                  description: "Personalized career guidance",
                  price: "₹1,500",
                  features: [
                    "One-on-one consultation",
                    "Career roadmap",
                    "Industry insights",
                    "Certification guidance",
                  ],
                },
                {
                  title: "Resume Development",
                  description: "ATS-optimized professional resume",
                  price: "₹1,500",
                  features: [
                    "Professional formatting",
                    "ATS optimization",
                    "Industry keywords",
                    "2 rounds of revision",
                  ],
                },
                {
                  title: "Interview Preparation",
                  description:
                    "Coaching for interviews with role-specific tips",
                  price: "₹1,800",
                  features: [
                    "Technical prep",
                    "Behavioral questions",
                    "Communication skills",
                    "Practice sessions",
                  ],
                },
                {
                  title: "Mock Interview",
                  description: "Realistic interview simulation with feedback",
                  price: "₹2,500",
                  features: [
                    "45-60 min simulation",
                    "Expert feedback",
                    "Performance analysis",
                    "Improvement plan",
                  ],
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow flex flex-col h-full"
                >
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="text-3xl font-bold text-teal-600 mb-4">
                    {service.price}
                  </div>
                  <ul className="space-y-2 mb-6 flex-grow">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-teal-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleServiceBooking(service.title)}
                    className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors mt-auto"
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Bundle Packages */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Bundle Packages
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Starter Package",
                  description: "Career Counselling + Resume Development",
                  originalPrice: "₹3,000",
                  price: "₹2,500",
                  savings: "Save ₹500",
                  features: [
                    "Personalized career guidance",
                    "Professional resume development",
                    "ATS optimization",
                    "Career roadmap planning",
                  ],
                  popular: false,
                },
                {
                  title: "Interview Success Package",
                  description: "Interview Preparation + Mock Interview",
                  originalPrice: "₹4,300",
                  price: "₹3,000",
                  savings: "Save ₹1,300",
                  features: [
                    "Comprehensive interview coaching",
                    "Realistic mock interview",
                    "Expert feedback & analysis",
                    "Performance improvement plan",
                  ],
                  popular: true,
                },
                {
                  title: "Complete Career Boost Package",
                  description: "All 4 Services",
                  originalPrice: "₹7,300",
                  price: "₹5,500",
                  savings: "Save ₹1,800",
                  features: [
                    "Complete career guidance",
                    "Professional resume",
                    "Interview preparation",
                    "Mock interview with feedback",
                    "End-to-end career support",
                  ],
                  popular: false,
                },
              ].map((bundle, index) => (
                <div
                  key={index}
                  className={`bg-white p-8 rounded-lg shadow-lg border-2 hover:shadow-xl transition-shadow relative flex flex-col h-full ${
                    bundle.popular ? "border-teal-500" : "border-gray-200"
                  }`}
                >
                  {bundle.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-teal-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{bundle.title}</h3>
                  <p className="text-gray-600 mb-4">{bundle.description}</p>
                  <div className="mb-4">
                    <span className="text-sm text-gray-500 line-through">
                      {bundle.originalPrice}
                    </span>
                    <div className="text-3xl font-bold text-teal-600">
                      {bundle.price}
                    </div>
                    <div className="text-green-600 font-semibold">
                      {bundle.savings}
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6 flex-grow">
                    {bundle.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <Check className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleServiceBooking(bundle.title)}
                    className={`w-full py-3 rounded-lg font-semibold transition-colors mt-auto ${
                      bundle.popular
                        ? "bg-teal-600 text-white hover:bg-teal-700"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    Choose Package
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Express Service */}
          {/* <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Express Service
            </h2>
            <div className="max-w-2xl mx-auto">
              <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-8 rounded-lg border border-teal-200">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">
                    Express Interview Preparation
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Interview Preparation with scheduling in 2 working days
                  </p>
                  <div className="text-4xl font-bold text-teal-600 mb-4">
                    ₹2,500
                  </div>
                  <ul className="text-left space-y-2 mb-6 max-w-md mx-auto">
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" />
                      Priority scheduling within 2 business days
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" />
                      Intensive interview coaching session
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" />
                      Role-specific preparation materials
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" />
                      24-hour support during preparation
                    </li>
                  </ul>
                  <button
                    onClick={() =>
                      handleServiceBooking("Express Interview Preparation")
                    }
                    className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
                  >
                    Book Express Service
                  </button>
                </div>
              </div>
            </div>
          </div> */}

          {/* Pricing Table */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Pricing Summary
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">
                      Service / Package
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">
                      Description
                    </th>
                    <th className="px-6 py-4 text-right font-semibold text-gray-900">
                      Price (INR)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 font-medium">
                      Career Counselling
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      Personalized career guidance
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-teal-600">
                      ₹1,500
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">
                      Resume Development
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      ATS-optimized professional resume
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-teal-600">
                      ₹1,500
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">
                      Interview Preparation
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      Coaching for interviews with role-specific tips
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-teal-600">
                      ₹1,800
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Mock Interview</td>
                    <td className="px-6 py-4 text-gray-600">
                      Realistic interview simulation with feedback
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-teal-600">
                      ₹2,500
                    </td>
                  </tr>
                  <tr className="bg-teal-50">
                    <td
                      className="px-6 py-4 font-bold text-teal-900"
                      colSpan="3"
                    >
                      Bundles
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Starter Package</td>
                    <td className="px-6 py-4 text-gray-600">
                      Career Counselling + Resume Development
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-semibold text-teal-600">
                        ₹2,500
                      </span>
                      <span className="text-green-600 text-sm ml-2">
                        (Save ₹500)
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">
                      Interview Success Package
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      Interview Preparation + Mock Interview
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-semibold text-teal-600">
                        ₹3,000
                      </span>
                      <span className="text-green-600 text-sm ml-2">
                        (Save ₹1,300)
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">
                      Complete Career Boost Package
                    </td>
                    <td className="px-6 py-4 text-gray-600">All 4 Services</td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-semibold text-teal-600">
                        ₹5,500
                      </span>
                      <span className="text-green-600 text-sm ml-2">
                        (Save ₹1,800)
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">
                      Express Interview Preparation
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      Interview Preparation with scheduling in 2 working days
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-teal-600">
                      ₹2,500
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Disclaimer</h3>
            <p className="text-gray-700">
              The prices mentioned above apply to students and candidates
              residing in India only. For clients outside India, please contact
              us for customized pricing and offers.
            </p>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Cybersecurity Career?
            </h3>
            <p className="text-gray-600 mb-6">
              Choose the service that best fits your needs or contact us for
              personalized guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowConsultationForm(true)}
                className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
              >
                Schedule Free Consultation
              </button>
              <button
                onClick={() => setCurrentPage("services")}
                className="border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-lg hover:bg-teal-600 hover:text-white transition-colors font-semibold"
              >
                Learn More About Services
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
  // Consultation Form Modal
  // const ConsultationForm = () => (
  //   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
  //     <div className="bg-white rounded-lg max-w-md w-full max-h-screen overflow-y-auto">
  //       <div className="p-6">
  //         <div className="flex justify-between items-center mb-4">
  //           <h2 className="text-2xl font-bold">Schedule Free Consultation</h2>
  //           <button
  //             onClick={() => setShowConsultationForm(false)}
  //             className="text-gray-400 hover:text-gray-600"
  //           >
  //             <X className="w-6 h-6" />
  //           </button>
  //         </div>

  //         <form onSubmit={handleFormSubmit}>
  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-gray-700 mb-2">
  //               Full Name *
  //             </label>
  //             <input
  //               type="text"
  //               name="name"
  //               value={formData.name}
  //               onChange={handleInputChange}
  //               className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
  //                 formErrors.name ? "border-red-500" : "border-gray-300"
  //               }`}
  //               placeholder="Enter your full name"
  //             />
  //             {formErrors.name && (
  //               <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
  //             )}
  //           </div>

  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-gray-700 mb-2">
  //               Email Address *
  //             </label>
  //             <input
  //               type="email"
  //               name="email"
  //               value={formData.email}
  //               onChange={handleInputChange}
  //               className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
  //                 formErrors.email ? "border-red-500" : "border-gray-300"
  //               }`}
  //               placeholder="Enter your email"
  //             />
  //             {formErrors.email && (
  //               <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
  //             )}
  //           </div>

  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-gray-700 mb-2">
  //               Contact Number *
  //             </label>
  //             <input
  //               type="tel"
  //               name="contactNumber"
  //               value={formData.contactNumber}
  //               onChange={handleInputChange}
  //               className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
  //                 formErrors.contactNumber
  //                   ? "border-red-500"
  //                   : "border-gray-300"
  //               }`}
  //               placeholder="+91xxxxxxxxxx"
  //             />
  //             {formErrors.contactNumber && (
  //               <p className="text-red-500 text-sm mt-1">
  //                 {formErrors.contactNumber}
  //               </p>
  //             )}
  //           </div>

  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-gray-700 mb-2">
  //               Upload CV/Resume *
  //             </label>
  //             <input
  //               type="file"
  //               name="cvFile"
  //               onChange={handleInputChange}
  //               accept=".pdf,.doc,.docx"
  //               className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
  //                 formErrors.cvFile ? "border-red-500" : "border-gray-300"
  //               }`}
  //             />
  //             <p className="text-sm text-gray-500 mt-1">
  //               Accepted formats: PDF, DOC, DOCX (Max 5MB)
  //             </p>
  //             {formErrors.cvFile && (
  //               <p className="text-red-500 text-sm mt-1">{formErrors.cvFile}</p>
  //             )}
  //           </div>

  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-gray-700 mb-2">
  //               Comments (Optional)
  //             </label>
  //             <textarea
  //               name="comments"
  //               value={formData.comments}
  //               onChange={handleInputChange}
  //               rows={3}
  //               className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
  //                 formErrors.comments ? "border-red-500" : "border-gray-300"
  //               }`}
  //               placeholder="Any specific questions or areas you'd like to discuss..."
  //             />
  //             <p className="text-sm text-gray-500 mt-1">
  //               {formData.comments.length}/500 characters
  //             </p>
  //             {formErrors.comments && (
  //               <p className="text-red-500 text-sm mt-1">
  //                 {formErrors.comments}
  //               </p>
  //             )}
  //           </div>

  //           <div className="mb-6">
  //             <label className="flex items-start">
  //               <input
  //                 type="checkbox"
  //                 name="agreeToTerms"
  //                 checked={formData.agreeToTerms}
  //                 onChange={handleInputChange}
  //                 className="mt-1 mr-2"
  //               />
  //               <span className="text-sm text-gray-700">
  //                 I agree to the terms and conditions and privacy policy *
  //               </span>
  //             </label>
  //             {formErrors.agreeToTerms && (
  //               <p className="text-red-500 text-sm mt-1">
  //                 {formErrors.agreeToTerms}
  //               </p>
  //             )}
  //           </div>

  //           <button
  //             type="submit"
  //             disabled={isSubmitting}
  //             className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
  //           >
  //             {isSubmitting ? "Booking..." : "Book Free Consultation"}
  //           </button>
  //         </form>
  //       </div>
  //     </div>
  //   </div>
  // );

// const ConsultationForm = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     contactNumber: '',
//     cvFile: null,
//     comments: '',
//     agreeToTerms: false
//   });

//   const [formErrors, setFormErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked, files } = e.target;
    
//     let newValue;
//     if (type === 'checkbox') {
//       newValue = checked;
//     } else if (type === 'file') {
//       newValue = files[0] || null;
//     } else {
//       newValue = value;
//     }

//     setFormData(prev => ({
//       ...prev,
//       [name]: newValue
//     }));

//     // Real-time validation
//     const fieldError = validateField(name, newValue);
//     setFormErrors(prev => ({
//       ...prev,
//       [name]: fieldError
//     }));
//   };

//   const validateField = (name, value) => {
//     switch (name) {
//       case 'name':
//         if (!value.trim()) return 'Full name is required';
//         if (value.trim().length < 2) return 'Name must be at least 2 characters long';
//         if (!/^[a-zA-Z\s]+$/.test(value.trim())) return 'Name can only contain letters and spaces';
//         return '';
      
//       case 'email':
//         if (!value.trim()) return 'Email is required';
//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please enter a valid email address';
//         return '';
      
//       case 'contactNumber':
//         if (!value.trim()) return 'Contact number is required';
//         const cleanNumber = value.replace(/[\s-()]/g, '');
//         if (!/^\+?[\d]{10,15}$/.test(cleanNumber)) return 'Please enter a valid contact number (10-15 digits)';
//         return '';
      
//       case 'cvFile':
//         if (!value) return 'Please upload your CV/Resume';
//         const maxSize = 5 * 1024 * 1024; // 5MB
//         const allowedTypes = ['.pdf', '.doc', '.docx'];
//         const fileExtension = '.' + value.name.split('.').pop().toLowerCase();
        
//         if (value.size > maxSize) return 'File size must be less than 5MB';
//         if (!allowedTypes.includes(fileExtension)) return 'Only PDF, DOC, and DOCX files are allowed';
//         return '';
      
//       case 'comments':
//         if (value.length > 500) return 'Comments must be less than 500 characters';
//         return '';
      
//       case 'agreeToTerms':
//         if (!value) return 'You must agree to the terms and conditions';
//         return '';
      
//       default:
//         return '';
//     }
//   };

//   const validateForm = () => {
//     const errors = {};
    
//     Object.keys(formData).forEach(field => {
//       const error = validateField(field, formData[field]);
//       if (error) errors[field] = error;
//     });

//     return errors;
//   };

//   const isFormValid = () => {
//     return formData.name.trim() && 
//            formData.email.trim() && 
//            formData.contactNumber.trim() && 
//            formData.cvFile && 
//            formData.agreeToTerms &&
//            Object.keys(formErrors).length === 0;
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
    
//     const errors = validateForm();
//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       return;
//     }

//     setIsSubmitting(true);
    
//     try {
//       // Simulate form submission
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       // Here you would typically send the form data to your backend
//       console.log('Form submitted:', formData);
      
//       // Show success message or redirect
//       alert('Consultation booked successfully! We will contact you soon.');
//       if (onClose) onClose();
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert('There was an error booking your consultation. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg max-w-md w-full max-h-screen overflow-y-auto">
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold">Schedule Free Consultation</h2>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-600"
//               type="button"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           <div onSubmit={handleFormSubmit}>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Full Name *
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
//                   formErrors.name ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="Enter your full name"
//                 autoComplete="name"
//               />
//               {formErrors.name && (
//                 <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
//               )}
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address *
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
//                   formErrors.email ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="Enter your email"
//                 autoComplete="email"
//               />
//               {formErrors.email && (
//                 <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
//               )}
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Contact Number *
//               </label>
//               <input
//                 type="tel"
//                 name="contactNumber"
//                 value={formData.contactNumber}
//                 onChange={handleInputChange}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
//                   formErrors.contactNumber
//                     ? "border-red-500"
//                     : "border-gray-300"
//                 }`}
//                 placeholder="+91xxxxxxxxxx"
//                 autoComplete="tel"
//               />
//               {formErrors.contactNumber && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formErrors.contactNumber}
//                 </p>
//               )}
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Upload CV/Resume *
//               </label>
//               <input
//                 type="file"
//                 name="cvFile"
//                 onChange={handleInputChange}
//                 accept=".pdf,.doc,.docx"
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
//                   formErrors.cvFile ? "border-red-500" : "border-gray-300"
//                 }`}
//               />
//               {formData.cvFile ? (
//                 <p className="text-green-600 text-sm mt-1 flex items-center">
//                   <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   Successfully uploaded: {formData.cvFile.name}
//                 </p>
//               ) : (
//                 <p className="text-sm text-gray-500 mt-1">
//                   Accepted formats: PDF, DOC, DOCX (Max 5MB)
//                 </p>
//               )}
//               {formErrors.cvFile && (
//                 <p className="text-red-500 text-sm mt-1">{formErrors.cvFile}</p>
//               )}
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Comments (Optional)
//               </label>
//               <textarea
//                 name="comments"
//                 value={formData.comments}
//                 onChange={handleInputChange}
//                 rows={3}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none ${
//                   formErrors.comments ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="Any specific questions or areas you'd like to discuss..."
//                 maxLength={500}
//               />
//               <p className="text-sm text-gray-500 mt-1">
//                 {formData.comments.length}/500 characters
//               </p>
//               {formErrors.comments && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formErrors.comments}
//                 </p>
//               )}
//             </div>

//             <div className="mb-6">
//               <label className="flex items-start">
//                 <input
//                   type="checkbox"
//                   name="agreeToTerms"
//                   checked={formData.agreeToTerms}
//                   onChange={handleInputChange}
//                   className="mt-1 mr-2 w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
//                 />
//                 <span className="text-sm text-gray-700">
//                   I agree to the terms and conditions and privacy policy *
//                 </span>
//               </label>
//               {formErrors.agreeToTerms && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formErrors.agreeToTerms}
//                 </p>
//               )}
//             </div>

//             <button
//               type="button"
//               onClick={handleFormSubmit}
//               disabled={isSubmitting || !formData.agreeToTerms}
//               className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
//                 formData.agreeToTerms && !isSubmitting
//                   ? 'bg-teal-600 text-white hover:bg-teal-700 hover:shadow-md cursor-pointer'
//                   : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               }`}
//             >
//               {isSubmitting ? "Booking..." : "Book Free Consultation"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const ConsultationForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    cvFile: null,
    comments: '',
    agreeToTerms: false,
    subject:''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    let newValue;
    if (type === 'checkbox') {
      newValue = checked;
    } else if (type === 'file') {
      newValue = files[0] || null;
    } else {
      newValue = value;
    }

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear submit status when user makes changes
    setSubmitStatus(null);

    // Real-time validation
    const fieldError = validateField(name, newValue);
    setFormErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters long';
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) return 'Name can only contain letters and spaces';
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please enter a valid email address';
        return '';
      
      case 'contactNumber':
        if (!value.trim()) return 'Contact number is required';
        const cleanNumber = value.replace(/[\s-()]/g, '');
        if (!/^\+?[\d]{10,15}$/.test(cleanNumber)) return 'Please enter a valid contact number (10-15 digits)';
        return '';
      
      case 'cvFile':
        if (!value) return 'Please upload your CV/Resume';
        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowedTypes = ['.pdf', '.doc', '.docx'];
        const fileExtension = '.' + value.name.split('.').pop().toLowerCase();
        
        if (value.size > maxSize) return 'File size must be less than 5MB';
        if (!allowedTypes.includes(fileExtension)) return 'Only PDF, DOC, and DOCX files are allowed';
        return '';
      
      case 'comments':
        if (value.length > 500) return 'Comments must be less than 500 characters';
        return '';
      
      case 'agreeToTerms':
        if (!value) return 'You must agree to the terms and conditions';
        return '';
      
      default:
        return '';
    }
  };

  const validateForm = () => {
    const errors = {};
    
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) errors[field] = error;
    });

    return errors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Create FormData for file upload
      const submitFormData = new FormData();
      submitFormData.append('name', formData.name.trim());
      submitFormData.append('email', formData.email.trim());
      submitFormData.append('contactNumber', formData.contactNumber.trim());
      submitFormData.append('resume', formData.cvFile); // Backend expects 'resume' field name
      submitFormData.append('message', `Contact Number: ${formData.contactNumber}\n\nComments: ${formData.comments}`);

      // Make API call to your backend
      const response = await fetch(`${baseUrl}/email/send-resume`, {
        method: 'POST',
        body: submitFormData
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        toast.success('Details submitted successfully')
        // Auto-close modal after 2 seconds on success
        setTimeout(() => {
          if (onClose) onClose();
        }, 2000);
      } else {
         toast.error('Something went wrong!')
        throw new Error(result.error || 'Failed to submit consultation request');
      }
      
    } catch (error) {
      console.error('Error submitting consultation form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Schedule Free Consultation</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              type="button"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Success/Error Messages */}
          {submitStatus === 'success' && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Consultation booked successfully! We will contact you soon.</span>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>There was an error booking your consultation. Please try again.</span>
              </div>
            </div>
          )}

          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  formErrors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your full name"
                autoComplete="name"
                disabled={isSubmitting}
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  formErrors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email"
                autoComplete="email"
                disabled={isSubmitting}
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number *
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  formErrors.contactNumber
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="+91xxxxxxxxxx"
                autoComplete="tel"
                disabled={isSubmitting}
              />
              {formErrors.contactNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.contactNumber}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload CV/Resume *
              </label>
              <input
                type="file"
                name="cvFile"
                onChange={handleInputChange}
                accept=".pdf,.doc,.docx"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  formErrors.cvFile ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isSubmitting}
              />
              {formData.cvFile ? (
                <p className="text-green-600 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Successfully uploaded: {formData.cvFile.name}
                </p>
              ) : (
                <p className="text-sm text-gray-500 mt-1">
                  Accepted formats: PDF, DOC, DOCX (Max 5MB)
                </p>
              )}
              {formErrors.cvFile && (
                <p className="text-red-500 text-sm mt-1">{formErrors.cvFile}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comments (Optional)
              </label>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none ${
                  formErrors.comments ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Any specific questions or areas you'd like to discuss..."
                maxLength={500}
                disabled={isSubmitting}
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.comments.length}/500 characters
              </p>
              {formErrors.comments && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.comments}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1 mr-2 w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  disabled={isSubmitting}
                />
                <span className="text-sm text-gray-700">
                  I agree to the terms and conditions and privacy policy *
                </span>
              </label>
              {formErrors.agreeToTerms && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.agreeToTerms}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !formData.agreeToTerms || submitStatus === 'success'}
              className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center ${
                formData.agreeToTerms && !isSubmitting && submitStatus !== 'success'
                  ? 'bg-teal-600 text-white hover:bg-teal-700 hover:shadow-md cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Booking...
                </>
              ) : submitStatus === 'success' ? (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Booked Successfully!
                </>
              ) : (
                "Book Free Consultation"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};





  // Privacy Disclaimer Modal
  // const PrivacyDisclaimer = () => 
  //   (
  //   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
  //     <div className="bg-white rounded-lg max-w-md w-full">
  //       <div className="p-6">
  //         <div className="flex justify-between items-center mb-4">
  //           <h2 className="text-xl font-bold">Privacy & Data Protection</h2>
  //           <button
  //             onClick={() => setShowPrivacyDisclaimer(false)}
  //             className="text-gray-400 hover:text-gray-600"
  //           >
  //             <X className="w-6 h-6" />
  //           </button>
  //         </div>

  //         <div className="mb-6">
  //           <p className="text-gray-700 mb-4">
  //            We respect your privacy and protect your personal information. When you share your details and CV
  //             with us, we use them only to provide the consultation services you requested. We never share, sell, or
  //             give your information to others without your permission—unless the law requires us to.Your data is
  //             kept safe and deleted from our systems within 6 weeks after your service is complete. You can also
  //             contact us anytime to view, update, or delete your information. By submitting your details, you agree
  //             to this privacy policy and understand how we handle your data.
  //           </p>
           
  //         </div>
          

  //         <div className="flex gap-3">
  //           <button
  //             onClick={() => setShowPrivacyDisclaimer(false)}
  //             className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
  //           >
  //             Cancel
  //           </button>
  //           <button
  //             onClick={handlePrivacyAccept}
  //             className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
  //           >
  //             Accept & Continue
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

   const PrivacyDisclaimer = () => {
 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl transform transition-all">
        {/* Header */}
        <div className="relative p-6 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-xl">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Privacy & Data Protection</h2>
          </div>
          <button
            onClick={() => setShowPrivacyDisclaimer(false)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <p className="text-sm text-gray-600">Your data security is our priority</p>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {/* Main text */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 mb-6 border border-blue-100">
            <p className="text-gray-700 leading-relaxed text-sm">
             We respect your privacy and protect your personal information. When you share your details and CV
              with us, we use them only to provide the consultation services you requested. We never share, sell, or
              give your information to others without your permission—unless the law requires us to.Your data is
              kept safe and deleted from our systems within 6 weeks after your service is complete. You can also
              contact us anytime to view, update, or delete your information. By submitting your details, you agree
              to this privacy policy and understand how we handle your data.
            </p>
          </div>

          {/* Key features */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-100">
              <Lock className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span className="text-xs font-medium text-green-800">Secure Storage</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg border border-purple-100">
              <Eye className="w-4 h-4 text-purple-600 flex-shrink-0" />
              <span className="text-xs font-medium text-purple-800">No Sharing</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg border border-orange-100">
              <Clock className="w-4 h-4 text-orange-600 flex-shrink-0" />
              <span className="text-xs font-medium text-orange-800">6 Week Deletion</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <UserCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="text-xs font-medium text-blue-800">Your Control</span>
            </div>
          </div>

          {/* Agreement notice */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-6">
            <p className="text-sm text-yellow-800">
              <span className="font-semibold">By continuing,</span> you agree to our privacy policy and data handling practices.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowPrivacyDisclaimer(false)}
              className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 font-medium transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handlePrivacyAccept}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl hover:from-teal-700 hover:to-teal-800 font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Accept & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
   }




//   Service Booking Form Modal
//   const ServiceForm = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg max-w-md w-full max-h-screen overflow-y-auto">
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold">Book {currentServiceType}</h2>
//             <button
//               onClick={() => setShowServiceForm(false)}
//               className="text-gray-400 hover:text-gray-600"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           <form onSubmit={handleServiceFormSubmit}>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Full Name *
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
//                   formErrors.name ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="Enter your full name"
//               />
//               {formErrors.name && (
//                 <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
//               )}
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address *
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
//                   formErrors.email ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="Enter your email"
//               />
//               {formErrors.email && (
//                 <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
//               )}
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Contact Number *
//               </label>
//               <input
//                 type="tel"
//                 name="contactNumber"
//                 value={formData.contactNumber}
//                 onChange={handleInputChange}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
//                   formErrors.contactNumber
//                     ? "border-red-500"
//                     : "border-gray-300"
//                 }`}
//                 placeholder="+91xxxxxxxxxx"
//               />
//               {formErrors.contactNumber && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formErrors.contactNumber}
//                 </p>
//               )}
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Upload CV/Resume *
//               </label>
//               <input
//                 type="file"
//                 name="cvFile"
//                 onChange={handleInputChange}
//                 accept=".pdf,.doc,.docx"
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
//                   formErrors.cvFile ? "border-red-500" : "border-gray-300"
//                 }`}
//               />
//               <p className="text-sm text-gray-500 mt-1">
//                 Accepted formats: PDF, DOC, DOCX (Max 5MB)
//               </p>
//               {formErrors.cvFile && (
//                 <p className="text-red-500 text-sm mt-1">{formErrors.cvFile}</p>
//               )}
//             </div>

//             {currentServiceType === "Resume Development" && (
//               <div className="mb-4">
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="expressService"
//                     checked={formData.expressService}
//                     onChange={handleInputChange}
//                     className="mr-2"
//                   />
//                   <span className="text-sm text-gray-700">
//                     Express Service (2 business days delivery) - Additional
//                     charges apply
//                   </span>
//                 </label>
//               </div>
//             )}

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Comments (Optional)
//               </label>
//               <textarea
//                 name="comments"
//                 value={formData.comments}
//                 onChange={handleInputChange}
//                 rows={3}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
//                   formErrors.comments ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="Any specific requirements or questions..."
//               />
//               <p className="text-sm text-gray-500 mt-1">
//                 {formData.comments.length}/500 characters
//               </p>
//               {formErrors.comments && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formErrors.comments}
//                 </p>
//               )}
//             </div>

//             <div className="mb-6">
//               <label className="flex items-start">
//                 <input
//                   type="checkbox"
//                   name="agreeToTerms"
//                   checked={formData.agreeToTerms}
//                   onChange={handleInputChange}
//                   className="mt-1 mr-2"
//                 />
//                 <span className="text-sm text-gray-700">
//                   I agree to the terms and conditions and privacy policy *
//                 </span>
//               </label>
//               {formErrors.agreeToTerms && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formErrors.agreeToTerms}
//                 </p>
//               )}
//             </div>

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
//             >
//               {isSubmitting ? "Booking..." : `Book ${currentServiceType}`}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// const ServiceForm = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     contactNumber: '',
//     cvFile: null,
//     comments: '',
//     agreeToTerms: false
//   });

//   const [formErrors, setFormErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked, files } = e.target;
    
//     let newValue;
//     if (type === 'checkbox') {
//       newValue = checked;
//     } else if (type === 'file') {
//       newValue = files[0] || null;
//     } else {
//       newValue = value;
//     }

//     setFormData(prev => ({
//       ...prev,
//       [name]: newValue
//     }));

//     // Real-time validation
//     const fieldError = validateField(name, newValue);
//     setFormErrors(prev => ({
//       ...prev,
//       [name]: fieldError
//     }));
//   };

//   const validateField = (name, value) => {
//     switch (name) {
//       case 'name':
//         if (!value.trim()) return 'Full name is required';
//         if (value.trim().length < 2) return 'Name must be at least 2 characters long';
//         if (!/^[a-zA-Z\s]+$/.test(value.trim())) return 'Name can only contain letters and spaces';
//         return '';
      
//       case 'email':
//         if (!value.trim()) return 'Email is required';
//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please enter a valid email address';
//         return '';
      
//       case 'contactNumber':
//         if (!value.trim()) return 'Contact number is required';
//         const cleanNumber = value.replace(/[\s-()]/g, '');
//         if (!/^\+?[\d]{10,15}$/.test(cleanNumber)) return 'Please enter a valid contact number (10-15 digits)';
//         return '';
      
//       case 'cvFile':
//         if (!value) return 'Please upload your CV/Resume';
//         const maxSize = 5 * 1024 * 1024; // 5MB
//         const allowedTypes = ['.pdf', '.doc', '.docx'];
//         const fileExtension = '.' + value.name.split('.').pop().toLowerCase();
        
//         if (value.size > maxSize) return 'File size must be less than 5MB';
//         if (!allowedTypes.includes(fileExtension)) return 'Only PDF, DOC, and DOCX files are allowed';
//         return '';
      
//       case 'comments':
//         if (value.length > 500) return 'Comments must be less than 500 characters';
//         return '';
      
//       case 'agreeToTerms':
//         if (!value) return 'You must agree to the terms and conditions';
//         return '';
      
//       default:
//         return '';
//     }
//   };

//   const validateForm = () => {
//     const errors = {};
    
//     Object.keys(formData).forEach(field => {
//       const error = validateField(field, formData[field]);
//       if (error) errors[field] = error;
//     });

//     return errors;
//   };

//   const isFormValid = () => {
//     return formData.name.trim() && 
//            formData.email.trim() && 
//            formData.contactNumber.trim() && 
//            formData.cvFile && 
//            formData.agreeToTerms &&
//            Object.keys(formErrors).length === 0;
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
    
//     const errors = validateForm();
//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       return;
//     }

//     setIsSubmitting(true);
    
//     try {
//       // Simulate form submission
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       // Here you would typically send the form data to your backend
//       console.log('Form submitted:', formData);
      
//       // Show success message or redirect
//       alert('Consultation booked successfully! We will contact you soon.');
//       if (onClose) onClose();
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert('There was an error booking your consultation. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg max-w-md w-full max-h-screen overflow-y-auto">
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold">Book {currentServiceType}</h2>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-600"
//               type="button"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           <div onSubmit={handleFormSubmit}>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Full Name *
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
//                   formErrors.name ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="Enter your full name"
//                 autoComplete="name"
//               />
//               {formErrors.name && (
//                 <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
//               )}
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address *
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
//                   formErrors.email ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="Enter your email"
//                 autoComplete="email"
//               />
//               {formErrors.email && (
//                 <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
//               )}
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Contact Number *
//               </label>
//               <input
//                 type="tel"
//                 name="contactNumber"
//                 value={formData.contactNumber}
//                 onChange={handleInputChange}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
//                   formErrors.contactNumber
//                     ? "border-red-500"
//                     : "border-gray-300"
//                 }`}
//                 placeholder="+91xxxxxxxxxx"
//                 autoComplete="tel"
//               />
//               {formErrors.contactNumber && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formErrors.contactNumber}
//                 </p>
//               )}
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Upload CV/Resume *
//               </label>
//               <input
//                 type="file"
//                 name="cvFile"
//                 onChange={handleInputChange}
//                 accept=".pdf,.doc,.docx"
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
//                   formErrors.cvFile ? "border-red-500" : "border-gray-300"
//                 }`}
//               />
//               {formData.cvFile ? (
//                 <p className="text-green-600 text-sm mt-1 flex items-center">
//                   <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   Successfully uploaded: {formData.cvFile.name}
//                 </p>
//               ) : (
//                 <p className="text-sm text-gray-500 mt-1">
//                   Accepted formats: PDF, DOC, DOCX (Max 5MB)
//                 </p>
//               )}
//               {formErrors.cvFile && (
//                 <p className="text-red-500 text-sm mt-1">{formErrors.cvFile}</p>
//               )}
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Comments (Optional)
//               </label>
//               <textarea
//                 name="comments"
//                 value={formData.comments}
//                 onChange={handleInputChange}
//                 rows={3}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none ${
//                   formErrors.comments ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="Any specific questions or areas you'd like to discuss..."
//                 maxLength={500}
//               />
//               <p className="text-sm text-gray-500 mt-1">
//                 {formData.comments.length}/500 characters
//               </p>
//               {formErrors.comments && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formErrors.comments}
//                 </p>
//               )}
//             </div>

//             <div className="mb-6">
//               <label className="flex items-start">
//                 <input
//                   type="checkbox"
//                   name="agreeToTerms"
//                   checked={formData.agreeToTerms}
//                   onChange={handleInputChange}
//                   className="mt-1 mr-2 w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
//                 />
//                 <span className="text-sm text-gray-700">
//                   I agree to the terms and conditions and privacy policy *
//                 </span>
//               </label>
//               {formErrors.agreeToTerms && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formErrors.agreeToTerms}
//                 </p>
//               )}
//             </div>

//             <button
//               type="button"
//               onClick={handleFormSubmit}
//               disabled={isSubmitting || !formData.agreeToTerms}
//               className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
//                 formData.agreeToTerms && !isSubmitting
//                   ? 'bg-teal-600 text-white hover:bg-teal-700 hover:shadow-md cursor-pointer'
//                   : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               }`}
//             >
//               {isSubmitting ? "Booking..." : "Book Free Consultation"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


const ServiceForm = ({ onClose, currentServiceType }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    cvFile: null,
    comments: '',
    agreeToTerms: false,
    expressService:false
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    let newValue;
    if (type === 'checkbox') {
      newValue = checked;
    } else if (type === 'file') {
      newValue = files[0] || null;
    } else {
      newValue = value;
    }

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear submit status when user makes changes
    setSubmitStatus(null);

    // Real-time validation
    const fieldError = validateField(name, newValue);
    setFormErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters long';
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) return 'Name can only contain letters and spaces';
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please enter a valid email address';
        return '';
      
      case 'contactNumber':
        if (!value.trim()) return 'Contact number is required';
        const cleanNumber = value.replace(/[\s-()]/g, '');
        if (!/^\+?[\d]{10,15}$/.test(cleanNumber)) return 'Please enter a valid contact number (10-15 digits)';
        return '';
      
      case 'cvFile':
        if (!value) return 'Please upload your CV/Resume';
        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowedTypes = ['.pdf', '.doc', '.docx'];
        const fileExtension = '.' + value.name.split('.').pop().toLowerCase();
        
        if (value.size > maxSize) return 'File size must be less than 5MB';
        if (!allowedTypes.includes(fileExtension)) return 'Only PDF, DOC, and DOCX files are allowed';
        return '';
      
      case 'comments':
        if (value.length > 500) return 'Comments must be less than 500 characters';
        return '';
      
      case 'agreeToTerms':
        if (!value) return 'You must agree to the terms and conditions';
        return '';
      
      default:
        return '';
    }
  };

  const validateForm = () => {
    const errors = {};
    
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) errors[field] = error;
    });

    return errors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
   
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Create FormData for file upload
      const submitFormData = new FormData();
      submitFormData.append('name', formData.name.trim());
      submitFormData.append('email', formData.email.trim());
      submitFormData.append('contactNumber', formData.contactNumber.trim());
      submitFormData.append('resume', formData.cvFile); // Backend expects 'resume' field name
      if(showExpress && formData?.expressService)  submitFormData.append('expressService', 'Express service is required');
      // Include service type in the message
      const serviceMessage = `Service Type: ${currentServiceType || 'General Service'}\nContact Number: ${formData.contactNumber}\n\nComments: ${formData.comments}`;
      submitFormData.append('message', serviceMessage);
      submitFormData.append('serviceSlected',currentServiceType)
      // Make API call to your backend
      const response = await fetch(`${baseUrl}/email/send-resume`, {
        method: 'POST',
        body: submitFormData
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        toast.success('Details submitted successfully')
        // Auto-close modal after 2 seconds on success
        setTimeout(() => {
          if (onClose) onClose();
        }, 2000);
      } else {
        toast.error('Something went wrong!')
        throw new Error(result.error || 'Failed to submit service request');
      }
      
    } catch (error) {
      console.error('Error submitting service form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Book {currentServiceType || 'Service'}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              type="button"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Success/Error Messages */}
          {submitStatus === 'success' && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{currentServiceType || 'Service'} booked successfully! We will contact you soon.</span>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>There was an error booking your {currentServiceType || 'service'}. Please try again.</span>
              </div>
            </div>
          )}

          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  formErrors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your full name"
                autoComplete="name"
                disabled={isSubmitting}
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  formErrors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email"
                autoComplete="email"
                disabled={isSubmitting}
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number *
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  formErrors.contactNumber
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="+91xxxxxxxxxx"
                autoComplete="tel"
                disabled={isSubmitting}
              />
              {formErrors.contactNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.contactNumber}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload CV/Resume *
              </label>
              <input
                type="file"
                name="cvFile"
                onChange={handleInputChange}
                accept=".pdf,.doc,.docx"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  formErrors.cvFile ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isSubmitting}
              />
              {formData.cvFile ? (
                <p className="text-green-600 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Successfully uploaded: {formData.cvFile.name}
                </p>
              ) : (
                <p className="text-sm text-gray-500 mt-1">
                  Accepted formats: PDF, DOC, DOCX (Max 5MB)
                </p>
              )}
              {formErrors.cvFile && (
                <p className="text-red-500 text-sm mt-1">{formErrors.cvFile}</p>
              )}
            </div>


            {showExpress && (
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="expressService"
                    checked={formData.expressService}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    Express Service (2 business days delivery) - Additional
                    charges apply
                  </span>
                </label>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comments (Optional)
              </label>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none ${
                  formErrors.comments ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Any specific questions or areas you'd like to discuss..."
                maxLength={500}
                disabled={isSubmitting}
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.comments.length}/500 characters
              </p>
              {formErrors.comments && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.comments}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1 mr-2 w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  disabled={isSubmitting}
                />
                <span className="text-sm text-gray-700">
                  I agree to the terms and conditions and privacy policy *
                </span>
              </label>
              {formErrors.agreeToTerms && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.agreeToTerms}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !formData.agreeToTerms || submitStatus === 'success'}
              className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center ${
                formData.agreeToTerms && !isSubmitting && submitStatus !== 'success'
                  ? 'bg-teal-600 text-white hover:bg-teal-700 hover:shadow-md cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Booking...
                </>
              ) : submitStatus === 'success' ? (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Booked Successfully!
                </>
              ) : (
                `Book ${currentServiceType || 'Service'}`
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
  // Footer Component
  // const Footer = () => (
  //   <footer className="bg-gray-900 text-white py-12 border-t border-teal-400">
  //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //       <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
  //         <div className="col-span-1 md:col-span-2">
  //            <img 
  //               src={require('./assets/cyber4logo.png')} 
  //               alt="Cyberb4 Logo" 
  //               style={{ height: '150px', width: '120px',marginTop:'-50px' }}
  //               className="drop-shadow-md hover:drop-shadow-lg transition-all duration-300"
  //             />
  //            <div className="mt-6 flex space-x-4">
  //             <div className="text-gray-300">
  //               <p className="font-semibold mb-2">Contact Information</p>
  //               <p className="text-sm">📞 +91 674 238 6292 | +91 73777 16282</p>
  //               <p className="text-sm">📧 Support@cyberb4.com</p>
  //               <p className="text-sm">
  //                 📍 Shaheed Nagar, Bhubaneshwar, Odisha, India
  //               </p>
  //               <p className="text-sm">📍 Reem Island, Abu Dhabi, UAE</p>
  //             </div>
  //           </div>
  //         </div>
           
  //         <div>
  //           <h3 className="text-lg font-semibold mb-4">Services</h3>
  //           <ul className="space-y-2 text-gray-300">
  //             <li>
  //               <button
  //                 onClick={() => {
  //                   setCurrentPage("services");
  //                   setCurrentServicePage("career");
  //                 }}
  //                 className="hover:text-teal-400"
  //               >
  //                 Career Counselling
  //               </button>
  //             </li>
  //             <li>
  //               <button
  //                 onClick={() => {
  //                   setCurrentPage("services");
  //                   setCurrentServicePage("resume");
  //                 }}
  //                 className="hover:text-teal-400"
  //               >
  //                 Resume Development
  //               </button>
  //             </li>
  //             <li>
  //               <button
  //                 onClick={() => {
  //                   setCurrentPage("services");
  //                   setCurrentServicePage("interview");
  //                 }}
  //                 className="hover:text-teal-400"
  //               >
  //                 Interview Preparation
  //               </button>
  //             </li>
  //             <li>
  //               <button
  //                 onClick={() => {
  //                   setCurrentPage("services");
  //                   setCurrentServicePage("mock");
  //                 }}
  //                 className="hover:text-teal-400"
  //               >
  //                 Mock Interview
  //               </button>
  //             </li>
  //           </ul>
  //         </div>

  //         <div>
  //           <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
  //           <ul className="space-y-2 text-gray-300">
  //             <li>
  //               <button
  //                 onClick={() => setCurrentPage("home")}
  //                 className="hover:text-teal-400"
  //               >
  //                 Home
  //               </button>
  //             </li>
  //             <li>
  //               <button
  //                 onClick={() => setCurrentPage("services")}
  //                 className="hover:text-teal-400"
  //               >
  //                 Services
  //               </button>
  //             </li>
  //             <li>
  //               <button
  //                 onClick={() => setCurrentPage("blog")}
  //                 className="hover:text-teal-400"
  //               >
  //                 Blog
  //               </button>
  //             </li>
  //             <li>
  //               <button
  //                 onClick={() => setCurrentPage("pricing")}
  //                 className="hover:text-teal-400"
  //               >
  //                 Pricing
  //               </button>
  //             </li>
  //           </ul>
  //         </div>
  //       </div>

  //       <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
  //         <p>
  //           &copy; 2025 Cyberb4. All rights reserved. | Privacy Policy | Terms
  //           of Service
  //         </p>
  //       </div>
  //     </div>
  //   </footer>
  // );

 const Footer=()=> {
 

  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-teal-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Column */}
          <div className="col-span-1">
            <img 
              src={require('./assets/cyber4logo.png')} 
              alt="Cyberb4 Logo" 
              style={{ height: '150px', width: '120px', marginTop: '-50px' }}
              className="drop-shadow-md hover:drop-shadow-lg transition-all duration-300"
            />
          </div>

          {/* Contact Information Column */}
          <div className="col-span-1">
            <div className="text-gray-300">
              <p className="font-semibold mb-4 text-lg">Contact Information</p>
              <div className="space-y-3">
                <p className="text-sm flex items-start">
                  <span className="mr-2">📞</span>
                  <span>+91 674 238 6292<br/>+91 73777 16282</span>
                </p>
                <p className="text-sm flex items-center">
                  <span className="mr-2">📧</span>
                  Support@cyberb4.com
                </p>
                <p className="text-sm flex items-start">
                  <span className="mr-2">📍</span>
                  <span>Shaheed Nagar, Bhubaneshwar,<br/>Odisha, India</span>
                </p>
                <p className="text-sm flex items-center">
                  <span className="mr-2">📍</span>
                  Reem Island, Abu Dhabi, UAE
                </p>
              </div>
            </div>
          </div>
           
          {/* Services Column */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <button
                  onClick={() => {
                    setCurrentPage("services");
                    setCurrentServicePage("career");
                  }}
                  className="hover:text-teal-400 transition-colors duration-200 text-left"
                >
                  Career Counselling
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage("services");
                    setCurrentServicePage("resume");
                  }}
                  className="hover:text-teal-400 transition-colors duration-200 text-left"
                >
                  Resume Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage("services");
                    setCurrentServicePage("interview");
                  }}
                  className="hover:text-teal-400 transition-colors duration-200 text-left"
                >
                  Interview Preparation
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage("services");
                    setCurrentServicePage("mock");
                  }}
                  className="hover:text-teal-400 transition-colors duration-200 text-left"
                >
                  Mock Interview
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <button
                  onClick={() => setCurrentPage("home")}
                  className="hover:text-teal-400 transition-colors duration-200 text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage("services")}
                  className="hover:text-teal-400 transition-colors duration-200 text-left"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage("blog")}
                  className="hover:text-teal-400 transition-colors duration-200 text-left"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage("pricing")}
                  className="hover:text-teal-400 transition-colors duration-200 text-left"
                >
                  Pricing
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>
            &copy; 2025 Cyberb4. All rights reserved. | Privacy Policy | Terms
            of Service
          </p>
        </div>
      </div>
    </footer>
  );
}


  const [selectedBlog, setSelectedBlog] = useState(null);
const navigate = useNavigate()
  // Main App Render
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {currentPage === "home" && <HomePage />}
      {currentPage === "services" && <ServicesPage />}
      {currentPage === "blog"  && <BlogPage />}
      {currentPage === "pricing" && <PricingPage />}

      {showConsultationForm && <ConsultationForm onClose={()=>setShowConsultationForm(false)} currentServiceType={currentServiceType} currentServicePage={currentServicePage} />}
      {showPrivacyDisclaimer && <PrivacyDisclaimer />}
      {showServiceForm && <ServiceForm onClose={()=>setShowServiceForm(false)} currentServiceType={currentServiceType} currentServicePage={currentServicePage} />}

      <Footer />
    </div>
  );
};

export default CoursePlatform;
