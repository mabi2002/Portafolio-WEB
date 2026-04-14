"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const socialLinks = [
  { name: "Email", href: "mailto:hello@example.com", label: "hello@example.com" },
  { name: "LinkedIn", href: "https://linkedin.com", label: "@tunombre" },
  { name: "GitHub", href: "https://github.com", label: "@tunombre" },
  { name: "Twitter", href: "https://twitter.com", label: "@tunombre" },
]

export function Contact() {
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
      id="contact"
      className="relative py-32 bg-card/30"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left column */}
          <div
            className={cn(
              "space-y-8 transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            )}
          >
            <div>
              <span className="inline-block text-primary text-sm font-medium tracking-widest uppercase mb-4">
                Contacto
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-medium leading-tight text-balance">
                {"¿Tienes un proyecto en mente?"}
              </h2>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Si deseas discutir un proyecto o simplemente saludar, 
              siempre estoy dispuesto a conversar. No dudes en contactarme.
            </p>

            <a
              href="mailto:hello@example.com"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-300 group"
            >
              <span>Enviar mensaje</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Right column - Contact info */}
          <div
            className={cn(
              "space-y-8 transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}
          >
            <div className="space-y-6">
              {socialLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.name !== "Email" ? "_blank" : undefined}
                  rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between py-4 border-b border-border hover:border-primary/50 transition-colors"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                    {link.name}
                  </span>
                  <span className="text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                    {link.label}
                    <svg
                      className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>

            {/* Location */}
            <div className="pt-8">
              <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground block mb-2">
                Ubicación
              </span>
              <p className="text-foreground">
                Ciudad de México, México
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                Disponible para trabajo remoto a nivel mundial
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
