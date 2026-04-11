"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Plataforma de comercio electrónico completa con carrito de compras, pagos integrados y panel de administración. Optimizada para rendimiento y SEO.",
    technologies: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
    image: "/projects/ecommerce.jpg",
    link: "#",
    featured: true
  },
  {
    title: "Dashboard Analytics",
    description: "Panel de control interactivo para visualización de datos en tiempo real con gráficos dinámicos y reportes automatizados.",
    technologies: ["React", "D3.js", "Node.js", "WebSocket"],
    image: "/projects/dashboard.jpg",
    link: "#",
    featured: true
  },
  {
    title: "Mobile Banking App",
    description: "Aplicación de banca móvil con autenticación biométrica, transferencias instantáneas y gestión de inversiones.",
    technologies: ["React Native", "TypeScript", "Firebase"],
    image: "/projects/banking.jpg",
    link: "#",
    featured: false
  },
  {
    title: "AI Content Generator",
    description: "Herramienta de generación de contenido potenciada por IA para marketing digital y redes sociales.",
    technologies: ["Python", "OpenAI", "FastAPI", "React"],
    image: "/projects/ai-tool.jpg",
    link: "#",
    featured: false
  },
]

export function Projects() {
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
      id="projects"
      className="relative py-32"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div
          className={cn(
            "mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div>
            <span className="inline-block text-primary text-sm font-medium tracking-widest uppercase mb-4">
              Proyectos
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium leading-tight text-balance">
              Trabajo seleccionado
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span>Ver archivo completo</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Featured projects */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {projects.filter(p => p.featured).map((project, index) => (
            <a
              key={project.title}
              href={project.link}
              className={cn(
                "group relative block overflow-hidden rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-500",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              {/* Image placeholder */}
              <div className="aspect-video bg-gradient-to-br from-secondary to-muted relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-4 left-4 w-32 h-32 border border-primary/30 rounded-lg" />
                  <div className="absolute bottom-4 right-4 w-24 h-24 border border-accent/30 rounded-lg" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-primary/20 rounded-full blur-xl" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                  {project.title}
                  <svg
                    className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Other projects */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.filter(p => !p.featured).map((project, index) => (
            <a
              key={project.title}
              href={project.link}
              className={cn(
                "group p-6 rounded-xl border border-border hover:border-primary/50 hover:bg-card/50 transition-all duration-300",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <svg
                  className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>

              <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="text-xs text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
