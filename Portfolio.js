import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Phone, MapPin, Calendar, User, Code, Briefcase, GraduationCap, ChevronDown, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentProject, setCurrentProject] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const skills = [
    { name: 'React', level: 90, color: 'from-blue-500 to-blue-600' },
    { name: 'JavaScript', level: 85, color: 'from-yellow-500 to-yellow-600' },
    { name: 'TypeScript', level: 80, color: 'from-blue-600 to-blue-700' },
    { name: 'Node.js', level: 75, color: 'from-green-500 to-green-600' },
    { name: 'Python', level: 70, color: 'from-green-600 to-green-700' },
    { name: 'UI/UX Design', level: 85, color: 'from-purple-500 to-purple-600' }
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'React와 Node.js로 구축한 완전한 전자상거래 플랫폼입니다. 사용자 인증, 결제 시스템, 관리자 대시보드, 실시간 주문 추적 기능을 포함하여 완성도 높은 쇼핑몰을 제작했습니다.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT', 'Socket.io'],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      github: '#',
      demo: '#',
      features: ['사용자 인증 시스템', '결제 연동', '실시간 알림', '관리자 패널']
    },
    {
      title: 'Task Management App',
      description: '팀 협업을 위한 현대적인 작업 관리 애플리케이션입니다. 드래그 앤 드롭, 실시간 협업, 파일 공유, 댓글 시스템 등을 통해 효율적인 프로젝트 관리를 지원합니다.',
      tech: ['React', 'TypeScript', 'Firebase', 'Tailwind', 'Framer Motion', 'React DnD'],
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      github: '#',
      demo: '#',
      features: ['드래그 앤 드롭', '실시간 협업', '파일 첨부', '알림 시스템']
    },
    {
      title: 'Weather Dashboard',
      description: '실시간 날씨 정보와 예보를 제공하는 대시보드입니다. 다양한 차트와 그래프를 통해 날씨 데이터를 시각화하고, 위치 기반 서비스를 제공합니다.',
      tech: ['React', 'API Integration', 'Chart.js', 'Geolocation API', 'PWA'],
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop',
      github: '#',
      demo: '#',
      features: ['실시간 날씨', '7일 예보', '위치 기반', 'PWA 지원']
    },
    {
      title: 'Social Media Dashboard',
      description: '소셜 미디어 분석을 위한 대시보드입니다. 다양한 플랫폼의 데이터를 통합하여 시각화하고, 성과 지표를 추적할 수 있습니다.',
      tech: ['React', 'D3.js', 'REST API', 'Material-UI', 'Redux'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      github: '#',
      demo: '#',
      features: ['데이터 시각화', '실시간 분석', '다중 플랫폼', '성과 추적']
    },
    {
      title: 'Video Streaming Platform',
      description: '비디오 스트리밍 플랫폼입니다. 비디오 업로드, 스트리밍, 댓글, 좋아요 기능을 포함하여 완전한 미디어 플랫폼을 구축했습니다.',
      tech: ['React', 'Video.js', 'WebRTC', 'Node.js', 'AWS S3', 'CDN'],
      image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&h=400&fit=crop',
      github: '#',
      demo: '#',
      features: ['비디오 스트리밍', '실시간 채팅', '구독 시스템', 'CDN 최적화']
    },
    {
      title: 'AI Chatbot Interface',
      description: 'AI 챗봇과의 대화를 위한 인터페이스입니다. 자연어 처리를 통해 사용자와 AI 간의 원활한 소통을 지원하며, 맞춤형 답변을 제공합니다.',
      tech: ['React', 'WebSocket', 'NLP', 'Python', 'TensorFlow', 'OpenAI API'],
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop',
      github: '#',
      demo: '#',
      features: ['자연어 처리', '실시간 채팅', 'AI 학습', '다국어 지원']
    }
  ];

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToProject = (index) => {
    setCurrentProject(index);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Portfolio
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors duration-200 hover:text-blue-400 ${
                    activeSection === section ? 'text-blue-400' : 'text-gray-300'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Mobile Navigation Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-4 py-2 space-y-2">
              {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left py-2 px-4 text-gray-300 hover:text-blue-400 hover:bg-gray-700 rounded transition-colors"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-8 relative">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto border-4 border-blue-400 shadow-xl"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 blur-xl"></div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            안녕하세요!
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            창의적인 프론트엔드 개발자입니다.<br />
            사용자 경험을 중시하며 현대적인 웹 애플리케이션을 만듭니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              프로젝트 보기
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 border-2 border-blue-400 rounded-full font-semibold hover:bg-blue-400 hover:text-gray-900 transition-all duration-200"
            >
              연락하기
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={24} className="text-gray-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                안녕하세요! 저는 사용자 중심의 웹 애플리케이션을 개발하는 프론트엔드 개발자입니다. 
                새로운 기술을 학습하고 적용하는 것을 좋아하며, 항상 더 나은 사용자 경험을 만들기 위해 노력합니다.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                React, TypeScript, Node.js 등 현대적인 웹 기술 스택을 활용하여 확장 가능하고 
                유지보수가 용이한 애플리케이션을 구축합니다.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                  <User className="text-blue-400" size={20} />
                  <span className="text-gray-300">Frontend Developer</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                  <MapPin className="text-blue-400" size={20} />
                  <span className="text-gray-300">Seoul, Korea</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                  <Calendar className="text-blue-400" size={20} />
                  <span className="text-gray-300">3년 경력</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                  <GraduationCap className="text-blue-400" size={20} />
                  <span className="text-gray-300">컴퓨터공학</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=400&fit=crop"
                alt="Coding workspace"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Skills
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div key={skill.name} className="bg-gray-800 p-6 rounded-xl hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-semibold text-white">{skill.name}</span>
                  <span className="text-blue-400 font-semibold">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Projects
          </h2>
          
          <div className="relative">
            {/* Main Project Display */}
            <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              <div className="md:flex">
                {/* Project Image */}
                <div className="md:w-1/2 relative overflow-hidden">
                  <img
                    src={projects[currentProject].image}
                    alt={projects[currentProject].title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                </div>
                
                {/* Project Info */}
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold mb-4 text-white">
                    {projects[currentProject].title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                    {projects[currentProject].description}
                  </p>
                  
                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-blue-400 mb-3">주요 기능:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {projects[currentProject].features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Tech Stack */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-blue-400 mb-3">기술 스택:</h4>
                    <div className="flex flex-wrap gap-2">
                      {projects[currentProject].tech.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm border border-blue-600/30 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Links */}
                  <div className="flex space-x-4">
                    <a
                      href={projects[currentProject].github}
                      className="flex items-center space-x-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200"
                    >
                      <Github size={18} />
                      <span>GitHub</span>
                    </a>
                    <a
                      href={projects[currentProject].demo}
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg transition-all duration-200"
                    >
                      <ExternalLink size={18} />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation Arrows */}
            <button
              onClick={prevProject}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-800/80 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition-colors duration-200 backdrop-blur-sm"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextProject}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-800/80 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition-colors duration-200 backdrop-blur-sm"
            >
              <ChevronRight size={24} />
            </button>
            
            {/* Project Counter */}
            <div className="text-center mt-6">
              <span className="text-gray-400">
                {currentProject + 1} / {projects.length}
              </span>
            </div>
          </div>
          
          {/* Project Thumbnails */}
          <div className="flex justify-center mt-8 space-x-2 overflow-x-auto pb-4">
            {projects.map((project, index) => (
              <button
                key={index}
                onClick={() => goToProject(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  index === currentProject
                    ? 'border-blue-400 opacity-100'
                    : 'border-gray-600 opacity-50 hover:opacity-75'
                }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
          
          {/* Progress Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToProject(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentProject
                    ? 'bg-blue-400 scale-110'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Contact Me
          </h2>
          
          <div className="text-center mb-12">
            <p className="text-xl text-gray-300 mb-8">
              새로운 기회나 협업에 관심이 있으시면 언제든지 연락해 주세요!
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-800 rounded-xl hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-white" size={20} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-400">your.email@example.com</p>
            </div>
            
            <div className="text-center p-6 bg-gray-800 rounded-xl hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-white" size={20} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-gray-400">+82 10-0000-0000</p>
            </div>
            
            <div className="text-center p-6 bg-gray-800 rounded-xl hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-white" size={20} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-gray-400">Seoul, South Korea</p>
            </div>
          </div>
          
          <div className="flex justify-center space-x-6 mt-12">
            <a
              href="https://github.com"
              className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
            >
              <Github className="text-white" size={20} />
            </a>
            <a
              href="https://linkedin.com"
              className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
            >
              <Linkedin className="text-white" size={20} />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
            >
              <Mail className="text-white" size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8 border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Your Name. Made with ❤️ using React and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;