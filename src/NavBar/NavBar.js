import { Menu } from 'antd';
import { X } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
     const [currentPage, setCurrentPage] = useState("blog");

      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate()
    const CyberbLogo = () => (
  <div className="flex items-center cursor-pointer" onClick={()=>navigate('/')}>
    <img 
      src={require('../assets/cyber4logo.png')} 
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
  return (
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
                 navigate('/')
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
                      if(item.id==='blog') return navigate('/blog')
                    // setCurrentPage(item.id);
                    // setCurrentServicePage("main");
                    navigate('/')
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
}



