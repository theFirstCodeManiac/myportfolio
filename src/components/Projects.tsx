import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string | null;
  technologies: string[];
  live_url: string | null;
  github_url: string | null;
  featured: boolean;
  display_order: number;
}

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true });

      setProjects((data as Project[]) || []);
      setIsLoading(false);
    };
    fetchProjects();
  }, []);

  const featuredProjects = projects.filter((p) => p.featured);
  const displayedProjects = showAll ? projects : featuredProjects;

  const nextProject = () => {
    if (featuredProjects.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
  };

  const prevProject = () => {
    if (featuredProjects.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  };

  return (
    <section
      id="projects"
      className="py-24 md:py-32 relative overflow-hidden bg-card/30"
    >
      <div className="absolute inset-0 bg-cyber-grid bg-grid opacity-10" />

      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-primary text-sm">// PORTFOLIO</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4">
            Featured <span className="text-gradient-cyber">Projects</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A selection of projects that showcase my skills and passion for development
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-muted" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-muted rounded w-2/3" />
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="flex gap-2">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-6 w-16 bg-muted rounded" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 glass rounded-2xl">
            <p className="text-muted-foreground">Projects coming soon!</p>
          </div>
        ) : (
          <>
            {/* Featured carousel for mobile */}
            {featuredProjects.length > 0 && (
              <div className="md:hidden mb-8">
                <div className="relative">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="glass rounded-2xl overflow-hidden"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={featuredProjects[currentIndex].image || "/placeholder.svg"}
                        alt={featuredProjects[currentIndex].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-bold text-foreground mb-2">
                        {featuredProjects[currentIndex].title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {featuredProjects[currentIndex].description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {featuredProjects[currentIndex].technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 font-mono text-xs bg-primary/10 text-primary rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        {featuredProjects[currentIndex].live_url && (
                          <a
                            href={featuredProjects[currentIndex].live_url!}
                            className="flex items-center gap-1 text-sm text-primary hover:underline"
                          >
                            <ExternalLink className="w-4 h-4" /> Live Demo
                          </a>
                        )}
                        {featuredProjects[currentIndex].github_url && (
                          <a
                            href={featuredProjects[currentIndex].github_url!}
                            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                          >
                            <Github className="w-4 h-4" /> Code
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  <button
                    onClick={prevProject}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 glass rounded-full"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextProject}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 glass rounded-full"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex justify-center gap-2 mt-4">
                  {featuredProjects.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === currentIndex ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Grid for desktop */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, rotateY: 5, rotateX: 5 }}
                  className="glass rounded-2xl overflow-hidden group cursor-pointer"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-card via-card/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      {project.live_url && (
                        <motion.a
                          href={project.live_url}
                          className="p-3 glass rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </motion.a>
                      )}
                      {project.github_url && (
                        <motion.a
                          href={project.github_url}
                          className="p-3 glass rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Github className="w-5 h-5" />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 font-mono text-xs bg-primary/10 text-primary rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View all button */}
            {!showAll && projects.length > featuredProjects.length && featuredProjects.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                className="text-center mt-12"
              >
                <motion.button
                  onClick={() => setShowAll(true)}
                  className="px-8 py-3 font-display font-medium border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All Projects
                </motion.button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
