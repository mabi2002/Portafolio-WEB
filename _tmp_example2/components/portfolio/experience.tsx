"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const experiences = [
  {
    period: "2024 — Presente",
    role: "Senior Frontend Engineer",
    company: "Tech Company",
    description: "Construyo y mantengo componentes críticos utilizados en todo el producto. Trabajo estrechamente con equipos multifuncionales para implementar las mejores prácticas en accesibilidad web.",
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    link: "#"
  },
  {
    period: "2022 — 2024",
    role: "Full Stack Developer",
    company: "Startup Inc",
    description: "Desarrollé aplicaciones web completas desde el concepto hasta el despliegue. Lideré la implementación del sistema de diseño y mejoré el rendimiento de la plataforma en un 40%.",
    technologies: ["Vue.js", "Node.js", "PostgreSQL", "Docker"],
    link: "#"
  },
  {
    period: "2020 — 2022",
    role: "Frontend Developer",
    company: "Digital Agency",
    description: "Creé experiencias web interactivas para clientes de diversos sectores. Colaboré con diseñadores para traducir conceptos creativos en código funcional.",
    technologies: ["JavaScript", "React", "SCSS", "Figma"],
    link: "#"
  },
  {
    period: "2018 — 2020",
    role: "Junior Developer",
    company: "Web Studio",
    description: "Inicié mi carrera desarrollando sitios web responsivos y aprendiendo las mejores prácticas de la industria. Participé en más de 20 proyectos exitosos.",
    technologies: ["HTML", "CSS", "JavaScript", "WordPress"],
    link: "#"
  },
]

export function Experience() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-32 bg-card/30"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div
          className={cn(
            "mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="inline-block text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Experiencia
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium leading-tight text-balance">
            Mi trayectoria profesional
          </h2>
        </div>

        {/* Experience list */}
        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={cn(
                "group transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <a
                href={exp.link}
                className="block py-8 border-t border-border hover:bg-secondary/30 transition-all duration-300 -mx-6 px-6 lg:-mx-8 lg:px-8"
              >
                <div className="grid lg:grid-cols-4 gap-4 lg:gap-8 items-start">
                  {/* Period */}
                  <div className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
                    {exp.period}
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                        {exp.role}
                      </h3>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-primary font-medium flex items-center gap-1">
                        {exp.company}
                        <svg
                          className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </span>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Resume link */}
        <div
          className={cn(
            "mt-12 transition-all duration-700 delay-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors group"
          >
            <span className="border-b border-current pb-0.5">
              Ver currículum completo
            </span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
