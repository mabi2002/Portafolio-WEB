"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Python", "PostgreSQL", "REST APIs"] },
  { category: "Diseño", items: ["Figma", "UI/UX", "Design Systems", "Prototyping"] },
  { category: "Herramientas", items: ["Git", "Docker", "Vercel", "AWS"] },
]

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-16">
          {/* Left column - Title */}
          <div className="lg:col-span-2">
            <div
              className={cn(
                "sticky top-32 transition-all duration-700",
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              )}
            >
              <span className="inline-block text-primary text-sm font-medium tracking-widest uppercase mb-4">
                Sobre mí
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-medium leading-tight text-balance">
                Diseño con propósito,
                <span className="block text-muted-foreground">código con pasión</span>
              </h2>
            </div>
          </div>

          {/* Right column - Content */}
          <div className="lg:col-span-3 space-y-12">
            <div
              className={cn(
                "space-y-6 transition-all duration-700 delay-200",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                Soy un desarrollador apasionado por crear interfaces de usuario accesibles 
                y pixel-perfect que combinan diseño reflexivo con ingeniería robusta. 
                Mi trabajo favorito se encuentra en la intersección del diseño y el 
                desarrollo, creando experiencias que no solo se ven increíbles sino 
                que también están construidas meticulosamente para el rendimiento y la usabilidad.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Actualmente me especializo en accesibilidad web, contribuyendo a la 
                creación y mantenimiento de componentes de UI que potencian el frontend, 
                asegurando que nuestras plataformas cumplan con los estándares y mejores 
                prácticas de accesibilidad web.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                En mi tiempo libre, me encontrarás explorando nuevas tecnologías, 
                contribuyendo a proyectos open source, o simplemente disfrutando 
                de un buen libro sobre diseño y desarrollo.
              </p>
            </div>

            {/* Skills Grid */}
            <div
              className={cn(
                "grid sm:grid-cols-2 gap-8 pt-8 border-t border-border transition-all duration-700 delay-400",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              {skills.map((skill, index) => (
                <div key={skill.category} className="space-y-4">
                  <h3 className="text-sm font-medium tracking-widest uppercase text-primary">
                    {skill.category}
                  </h3>
                  <ul className="space-y-2">
                    {skill.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-muted-foreground group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors" />
                        <span className="group-hover:text-foreground transition-colors">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
