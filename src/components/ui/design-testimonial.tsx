"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"

export interface TestimonialItem {
  quote: string
  author: string
  role: string
  company: string
}

export const defaultTestimonials: TestimonialItem[] = [
  {
    quote: "Discovery & strategy to align your creative vision with technical scope.",
    author: "01 · Discovery",
    role: "Blueprint & Architecture",
    company: "Phase 01",
  },
  {
    quote: "Rapid prototyping, visual styleframes, and interactive product UX.",
    author: "02 · Prototype",
    role: "Design & User Experience",
    company: "Phase 02",
  },
  {
    quote: "Production-ready code, generative AI pipelines, and agile execution.",
    author: "03 · Engineering",
    role: "Full-Stack Build & AI Integration",
    company: "Phase 03",
  },
  {
    quote: "Rigorous QA testing, global deployment, and performance scaling.",
    author: "04 · Launch",
    role: "Deployment, Go-Live & Scale",
    company: "Phase 04",
  },
]

export interface TestimonialProps {
  items?: TestimonialItem[]
  /** Side vertical label — defaults to "Testimonials" */
  label?: string
  className?: string
}

export function Testimonial({ items = defaultTestimonials, label = "How we work", className = "" }: TestimonialProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse position for magnetic effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 200 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  // Transform for parallax on the large number
  const numberX = useTransform(x, [-200, 200], [-20, 20])
  const numberY = useTransform(y, [-200, 200], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }
  }

  const goNext = () => setActiveIndex((prev) => (prev + 1) % items.length)
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length)

  useEffect(() => {
    const timer = setInterval(goNext, 6000)
    return () => clearInterval(timer)
  }, [items.length])

  const current = items[activeIndex] ?? items[0]

  return (
    <div className={`flex items-center justify-center min-h-[600px] py-20 md:py-28 bg-background overflow-hidden relative ${className}`}>
      <div ref={containerRef} className="relative w-full max-w-5xl px-6 md:px-8" onMouseMove={handleMouseMove}>
        {/* Oversized index number - positioned to bleed off left edge */}
        <motion.div
          className="absolute -left-8 top-1/2 -translate-y-1/2 text-[20rem] md:text-[28rem] font-bold text-foreground/[0.04] select-none pointer-events-none leading-none tracking-tighter"
          style={{ x: numberX, y: numberY }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Main content - asymmetric layout */}
        <div className="relative flex">
          {/* Left column - vertical text */}
          <div className="flex flex-col items-center justify-center pr-8 md:pr-16 border-r border-border">
            <motion.span
              className="text-xs font-mono text-muted-foreground tracking-widest uppercase"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {label}
            </motion.span>

            {/* Vertical progress line */}
            <div className="relative h-32 w-px bg-border mt-8">
              <motion.div
                className="absolute top-0 left-0 w-full bg-accent origin-top"
                animate={{
                  height: `${((activeIndex + 1) / items.length) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          {/* Center - main content */}
          <div className="flex-1 pl-8 md:pl-16 py-8 md:py-12">
            {/* Company badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground border border-border rounded-full px-3 py-1 bg-white/[0.03] backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  {current.company}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Quote with character reveal */}
            <div className="relative mb-12 min-h-[140px]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={activeIndex}
                  className="text-3xl md:text-5xl font-light text-foreground leading-[1.2] md:leading-[1.15] tracking-tight"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {current.quote.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      className="inline-block mr-[0.3em]"
                      variants={{
                        hidden: { opacity: 0, y: 20, rotateX: 90 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          rotateX: 0,
                          transition: {
                            duration: 0.5,
                            delay: i * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                        exit: {
                          opacity: 0,
                          y: -10,
                          transition: { duration: 0.2, delay: i * 0.02 },
                        },
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Author row */}
            <div className="flex items-end justify-between flex-wrap gap-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex items-center gap-4"
                >
                  {/* Animated line before name */}
                  <motion.div
                    className="w-8 h-px bg-accent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ originX: 0 }}
                  />
                  <div>
                    <p className="text-base font-medium text-foreground">{current.author}</p>
                    <p className="text-sm text-muted-foreground">{current.role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={goPrev}
                  aria-label="Previous testimonial"
                  className="group relative w-12 h-12 rounded-full border border-border flex items-center justify-center overflow-hidden hover:border-accent/60 transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-accent/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="relative z-10 text-foreground group-hover:text-accent transition-colors"
                  >
                    <path
                      d="M10 12L6 8L10 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>

                <motion.button
                  onClick={goNext}
                  aria-label="Next testimonial"
                  className="group relative w-12 h-12 rounded-full border border-border flex items-center justify-center overflow-hidden hover:border-accent/60 transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-accent/20"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="relative z-10 text-foreground group-hover:text-accent transition-colors"
                  >
                    <path
                      d="M6 4L10 8L6 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom ticker - subtle repeating process steps */}
        <div className="absolute -bottom-16 left-0 right-0 overflow-hidden opacity-[0.06] pointer-events-none">
          <motion.div
            className="flex whitespace-nowrap text-5xl font-mono uppercase font-bold tracking-widest"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="mx-8 text-foreground">
                {items.map((t) => `${t.company} — ${t.role}`).join(" • ")} •
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Testimonial
