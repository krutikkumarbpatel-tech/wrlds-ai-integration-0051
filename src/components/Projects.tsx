
import { useState, useRef, useEffect, TouchEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from "@/hooks/use-mobile";

const projects = [
  {
    id: 1,
    title: "Fleet Management Platform",
    brand: "TransLogistics Corp",
    description: "Comprehensive fleet management solution with tire monitoring, video telematics, and driver safety systems for commercial transportation operations.",
    tags: ["Fleet Management", "Tire Monitoring", "Video Telematics", "Safety"],
    imageUrl: "/assets/fleet-operations.jpg",
    isFeatured: true,
    link: "/projects/firecat",
    details: `
      TransLogistics Corp needed to modernize their fleet operations. WRLDS Technologies provided an integrated solution with real-time tire monitoring, video telematics with ADAS/DMS alerts, comprehensive driver safety tracking, and centralized fleet management dashboard. Features include tire pressure monitoring, wear analysis, video streaming, driver behavior analytics, and maintenance scheduling. Benefits: reduced tire costs by 40%, improved driver safety scores by 60%, automated maintenance alerts, and real-time fleet visibility with 24/7 monitoring capabilities.
    `
  },
  {
    id: 2,
    title: "Video Telematics System",
    brand: "Highway Transport Solutions",
    description: "Advanced video monitoring system with ADAS alerts, driver fatigue detection, and incident recording for long-haul trucking operations.",
    tags: ["Video Telematics", "ADAS", "Driver Monitoring", "Safety"],
    imageUrl: "/assets/fleet-manager.jpg",
    link: "/projects/sport-retail"
  },
  {
    id: 3,
    title: "Tire Management System",
    brand: "Fleet Pro Services",
    description: "Digital tire inventory and maintenance system eliminating paperwork and optimizing tire utilization across multiple depot locations.",
    tags: ["Tire Management", "Inventory", "Maintenance", "Cost Optimization"],
    imageUrl: "/assets/fleet-operations.jpg",
    link: "/projects/workwear"
  },
  {
    id: 4,
    title: "Driver Safety Analytics",
    brand: "SafeFleet Logistics",
    description: "Comprehensive driver behavior monitoring with real-time alerts for harsh braking, speeding, and safety compliance reporting.",
    tags: ["Driver Safety", "Behavior Analytics", "Compliance", "Reporting"],
    imageUrl: "/assets/fleet-manager.jpg",
    link: "/projects/hockey"
  },
  {
    id: 5,
    title: "Fleet Optimization Platform",
    brand: "Commercial Transport Inc",
    description: "Integrated platform combining tire management, video telematics, and operational analytics for maximum fleet efficiency and cost reduction.",
    tags: ["Fleet Optimization", "Analytics", "Cost Reduction", "Efficiency"],
    imageUrl: "/assets/fleet-operations.jpg",
    link: "/projects/pet-tracker"
  }
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const projectsRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const minSwipeDistance = 50;

  useEffect(() => {
    if (isInView && !isHovering) {
      const interval = setInterval(() => {
        setActiveProject(prev => (prev + 1) % projects.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isInView, isHovering]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsInView(true);
      } else {
        setIsInView(false);
      }
    }, {
      threshold: 0.2
    });
    
    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      setActiveProject(prev => (prev + 1) % projects.length);
    } else if (isRightSwipe) {
      setActiveProject(prev => (prev - 1 + projects.length) % projects.length);
    }
  };

  const getCardAnimationClass = (index: number) => {
    if (index === activeProject) return "scale-100 opacity-100 z-20";
    if (index === (activeProject + 1) % projects.length) return "translate-x-[40%] scale-95 opacity-60 z-10";
    if (index === (activeProject - 1 + projects.length) % projects.length) return "translate-x-[-40%] scale-95 opacity-60 z-10";
    return "scale-90 opacity-0";
  };
  
  return <section id="projects" ref={projectsRef} className="bg-white py-[50px] w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className={`text-center mb-10 max-w-3xl mx-auto transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-2 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
            Customer Cases
          </div>
          <h2 className="text-3xl font-bold mb-3">
            Fleet Management Solutions
          </h2>
          <p className="text-gray-600">
            Explore how our tire management and video telematics solutions are transforming fleet operations with intelligent monitoring systems tailored to transportation needs.
          </p>
          {isMobile && (
            <div className="flex items-center justify-center mt-4 animate-pulse-slow">
              <div className="flex items-center text-blue-500">
                <ChevronLeft size={16} />
                <p className="text-sm mx-1">Swipe to navigate</p>
                <ChevronRight size={16} />
              </div>
            </div>
          )}
        </div>
        
        <div 
          className="relative h-[550px] overflow-hidden" 
          onMouseEnter={() => setIsHovering(true)} 
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          ref={carouselRef}
        >
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className={`absolute top-0 w-full max-w-md transform transition-all duration-500 ${getCardAnimationClass(index)}`} 
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <Card className="overflow-hidden h-[500px] border border-gray-100 shadow-sm hover:shadow-md flex flex-col">
                  <div 
                    className="relative bg-black p-6 flex items-center justify-center h-48 overflow-hidden"
                    style={{
                      backgroundImage: `url(${project.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="relative z-10 flex flex-col items-center justify-center">
                      <h3 className="text-2xl font-bold text-white mb-2">{project.brand.toUpperCase()}</h3>
                      <div className="w-12 h-1 bg-white mb-2"></div>
                      <p className="text-white/90 text-sm">{project.title}</p>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-1 text-gray-800 group-hover:text-gray-500 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-500 text-sm font-medium">{project.brand}</p>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 flex-grow">{project.description}</p>
                    
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, idx) => (
                          <span 
                            key={idx} 
                            className="px-2 py-1 bg-gray-50 text-gray-600 rounded-full text-xs animate-pulse-slow" 
                            style={{ animationDelay: `${idx * 300}ms` }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <Link 
                        to={project.link} 
                        className="text-gray-500 flex items-center hover:underline relative overflow-hidden group"
                        onClick={() => {
                          if (project.link.startsWith('/')) {
                            window.scrollTo(0, 0);
                          }
                        }}
                      >
                        <span className="relative z-10">Learn more</span>
                        <ArrowRight className="ml-2 w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gray-500 transition-all duration-300 group-hover:w-full"></span>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          {!isMobile && (
            <>
              <button 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-500 hover:bg-white z-30 shadow-md transition-all duration-300 hover:scale-110" 
                onClick={() => setActiveProject(prev => (prev - 1 + projects.length) % projects.length)}
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-500 hover:bg-white z-30 shadow-md transition-all duration-300 hover:scale-110" 
                onClick={() => setActiveProject(prev => (prev + 1) % projects.length)}
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
          
          <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center space-x-3 z-30">
            {projects.map((_, idx) => (
              <button 
                key={idx} 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${activeProject === idx ? 'bg-gray-500 w-5' : 'bg-gray-200 hover:bg-gray-300'}`} 
                onClick={() => setActiveProject(idx)}
                aria-label={`Go to project ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>;
};

export default Projects;
