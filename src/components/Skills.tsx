import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "React.js", level: 95, color: "primary" },
  { name: "TypeScript", level: 90, color: "primary" },
  { name: "Node.js", level: 88, color: "secondary" },
  { name: "Express.js", level: 85, color: "secondary" },
  { name: "MongoDB", level: 85, color: "accent" },
  { name: "PHP", level: 80, color: "accent" },
  { name: "MySQL", level: 82, color: "primary" },
  { name: "JavaScript", level: 95, color: "secondary" },
  { name: "SQL", level: 80, color: "accent" },
];

const getColorClasses = (color: string) => {
  switch (color) {
    case "primary":
      return { bg: "bg-primary", shadow: "shadow-[0_0_20px_hsl(180,100%,50%,0.5)]" };
    case "secondary":
      return { bg: "bg-secondary", shadow: "shadow-[0_0_20px_hsl(263,90%,66%,0.5)]" };
    case "accent":
      return { bg: "bg-accent", shadow: "shadow-[0_0_20px_hsl(199,89%,60%,0.5)]" };
    default:
      return { bg: "bg-primary", shadow: "shadow-[0_0_20px_hsl(180,100%,50%,0.5)]" };
  }
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden bg-card/30">
      <div className="absolute inset-0 bg-cyber-grid bg-grid opacity-10" />
      
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-primary text-sm">// SKILLS</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4">
            Technical <span className="text-gradient-cyber">Arsenal</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Technologies I've mastered over 5+ years of professional development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {skills.map((skill, index) => {
            const colors = getColorClasses(skill.color);
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass rounded-2xl p-6 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold text-foreground">
                    {skill.name}
                  </h3>
                  <span className="font-mono text-sm text-primary">{skill.level}%</span>
                </div>

                {/* Progress bar */}
                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className={`absolute inset-y-0 left-0 rounded-full ${colors.bg} ${colors.shadow}`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                  />
                </div>

                {/* Circular indicator */}
                <div className="mt-4 flex justify-center">
                  <div className="relative w-16 h-16">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="hsl(var(--muted))"
                        strokeWidth="4"
                      />
                      <motion.circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke={
                          skill.color === "primary"
                            ? "hsl(180 100% 50%)"
                            : skill.color === "secondary"
                            ? "hsl(263 90% 66%)"
                            : "hsl(199 89% 60%)"
                        }
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                        animate={
                          isInView
                            ? {
                                strokeDashoffset:
                                  2 * Math.PI * 28 * (1 - skill.level / 100),
                              }
                            : {}
                        }
                        transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                        style={{
                          filter: `drop-shadow(0 0 6px ${
                            skill.color === "primary"
                              ? "hsl(180 100% 50%)"
                              : skill.color === "secondary"
                              ? "hsl(263 90% 66%)"
                              : "hsl(199 89% 60%)"
                          })`,
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-mono text-xs text-muted-foreground">
                        {skill.level}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
