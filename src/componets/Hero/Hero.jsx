import React, { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Users, Award, Sparkles } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { icon: <Users className="w-6 h-6" />, value: '50K+', label: 'Active Students' },
    { icon: <BookOpen className="w-6 h-6" />, value: '500+', label: 'Courses' },
    { icon: <Award className="w-6 h-6" />, value: '95%', label: 'Success Rate' }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-lg rounded-full border border-white/30 shadow-xl">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Transform Your Future Today</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
                Empower Your
                <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  Future
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed max-w-xl">
                Discover world-class education at EduInstitute. From cutting-edge courses to inspiring campuses.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore Programs
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-0 transition-opacity duration-300"></span>
              </button>

              <button className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-2xl font-bold text-lg border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transform hover:scale-105 transition-all duration-300 shadow-xl">
                Watch Video
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center transform hover:scale-110 transition-all duration-300"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-lg rounded-xl mb-2 text-white border border-white/30">
                    {stat.icon}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/80 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative group">
              {/* Glowing Border Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"></div>

              {/* Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-lg">
                <img
                  src="/Institute Image.jpeg"
                  alt="Institute Campus"
                  className="w-full h-[500px] object-cover transform group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 via-transparent to-transparent"></div>

                {/* Floating Cards */}
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-lg rounded-2xl p-4 shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">4.9</div>
                      <div className="text-xs text-gray-600 font-medium">Rating</div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-lg rounded-2xl p-4 shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">10K+</div>
                      <div className="text-xs text-gray-600 font-medium">Enrolled</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl blur-2xl opacity-50 -z-10"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl blur-2xl opacity-50 -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider at Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            fill="#ffffff"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          ></path>
        </svg>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;