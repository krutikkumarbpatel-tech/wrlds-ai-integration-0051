import { ArrowRight, Code, Cpu, Layers, MessageSquare } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import fleetManagementHero from "@/assets/fleet-management-hero.jpg";
import fleetTrucksPoster from "@/assets/fleet-trucks-poster.jpg";

const Hero = () => {
  const isMobile = useIsMobile();
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        duration: 0.8
      }
    }
  };
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };
  
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  
  return <motion.div className="relative w-full" initial="hidden" animate="visible" variants={containerVariants}>
      <div className="banner-container bg-black relative overflow-hidden h-[50vh] sm:h-[60vh] md:h-[500px] lg:h-[550px] xl:h-[600px] w-full">
        <div className="absolute inset-0 bg-black w-full">
          <img 
            src={fleetManagementHero} 
            alt="Advanced Fleet Management Solutions Dashboard" 
            className={`w-full h-full object-cover opacity-70 ${isMobile ? 'object-center' : 'object-center'}`} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-white"></div>
        </div>
        
        <div className="banner-overlay bg-transparent pt-20 sm:pt-24 md:pt-32 w-full">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full">
            <motion.div className="w-full max-w-4xl text-center" variants={itemVariants}>
              <motion.h1 className="banner-title text-white" variants={itemVariants}>
                Advanced <span className="text-gradient-primary">Fleet Management Solutions</span> for Modern Transportation
              </motion.h1>
              <motion.p className="banner-subtitle text-gray-300 mt-4 sm:mt-6" variants={itemVariants}>
                Empower your fleet operations with comprehensive tire management systems and video telematics that transform vehicle monitoring, enhance safety, and optimize operational efficiency.
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 justify-center items-center" variants={itemVariants}>
                {/* Styled as a button but using an anchor tag for project navigation */}
                <button 
                  className="w-full sm:w-auto min-h-[44px] px-6 sm:px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:shadow-primary/20 flex items-center justify-center group text-sm sm:text-base font-medium"
                  onClick={e => {
                    e.preventDefault();
                    const projectsSection = document.getElementById('projects');
                    if (projectsSection) {
                      projectsSection.scrollIntoView({
                        behavior: 'smooth'
                      });
                    }
                  }}
                >
                  Explore Projects
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                {/* Using the Button component from shadcn but with custom styling to match the explore button */}
                <button 
                  className="w-full sm:w-auto min-h-[44px] px-6 sm:px-8 py-3 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl hover:shadow-accent/20 flex items-center justify-center group text-sm sm:text-base font-medium"
                  onClick={scrollToContact}
                >
                  Contact Us
                  <MessageSquare className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 mx-auto">
        <motion.div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4" variants={containerVariants} initial="hidden" animate="visible" transition={{
        delay: 0.6
      }}>
          <motion.div className="bg-card p-4 md:p-5 rounded-xl shadow-sm border border-border transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover-primary glass-card" variants={itemVariants}>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-wrlds-violet/10 flex items-center justify-center rounded-lg text-wrlds-violet mb-2 md:mb-3 animate-glow-pulse">
              <Cpu className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-card-foreground">Tire Management System</h3>
            <p className="text-muted-foreground text-xs md:text-sm">Comprehensive tire monitoring including operations tracking, stock management, inspection reports, and maintenance scheduling for optimal fleet performance.</p>
          </motion.div>
          
          <motion.div className="bg-card p-4 md:p-5 rounded-xl shadow-sm border border-border transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover-accent glass-card" variants={itemVariants}>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-wrlds-pink/10 flex items-center justify-center rounded-lg text-wrlds-pink mb-2 md:mb-3">
              <Code className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-card-foreground">Video Telematics</h3>
            <p className="text-muted-foreground text-xs md:text-sm">Advanced video monitoring with live streaming, history playback, ADAS/DMS alerts, and driver behavior analysis for enhanced fleet safety and efficiency.</p>
          </motion.div>
          
          <motion.div className="bg-card p-4 md:p-5 rounded-xl shadow-sm border border-border transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover-glow glass-card" variants={itemVariants}>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-wrlds-orange/10 flex items-center justify-center rounded-lg text-wrlds-orange mb-2 md:mb-3">
              <Layers className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-card-foreground">Fleet Analytics</h3>
            <p className="text-muted-foreground text-xs md:text-sm">Real-time fleet monitoring with comprehensive reporting, driver performance tracking, and operational insights for transportation and logistics companies.</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>;
};

export default Hero;
