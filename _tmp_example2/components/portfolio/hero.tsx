"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div
              className={cn(
                "transition-all duration-700 delay-100",
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              <span className="inline-block text-primary text-sm font-medium tracking-widest uppercase mb-4">
                Diseñador & Desarrollador
              </span>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-tight text-balance">
                Creando experiencias
                <span className="block text-primary">digitales únicas</span>
              </h1>
            </div>

            <p
              className={cn(
                "text-lg text-muted-foreground leading-relaxed max-w-lg transition-all duration-700 delay-200",
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              Desarrollo interfaces accesibles y pixel-perfect que combinan diseño 
              reflexivo con ingeniería robusta. Mi trabajo se encuentra en la 
              intersección del diseño y el desarrollo.
            </p>

            <div
              className={cn(
                "flex flex-wrap gap-4 transition-all duration-700 delay-300",
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Ver proyectos
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-secondary transition-colors"
              >
                Contactar
              </a>
            </div>
          </div>

          {/* Right content - Visual element */}
          <div
            className={cn(
              "relative hidden lg:block transition-all duration-1000 delay-500",
              mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
          >
            <div className="relative aspect-square">
              {/* Decorative frame */}
              <div className="absolute inset-0 border border-border/50 rounded-2xl" />
              <div className="absolute inset-4 border border-primary/20 rounded-xl" />
              
              {/* Code-like decoration */}
              <div className="absolute inset-8 bg-card/50 backdrop-blur-sm rounded-lg p-6 font-mono text-sm">
                <div className="space-y-3 text-muted-foreground">
                  <div><span className="text-primary">const</span> developer = {"{"}</div>
                  <div className="pl-4">name: <span className="text-accent">&quot;Tu Nombre&quot;</span>,</div>
                  <div className="pl-4">role: <span className="text-accent">&quot;Full Stack&quot;</span>,</div>
                  <div className="pl-4">passion: <span className="text-accent">&quot;UI/UX&quot;</span>,</div>
                  <div className="pl-4">available: <span className="text-primary">true</span></div>
                  <div>{"}"}</div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary text-2xl">✦</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                <span className="text-accent text-xl">◆</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={cn(
            "absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-700 delay-700",
            mounted ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
