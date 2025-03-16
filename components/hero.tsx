"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mic, Sparkles } from "lucide-react"

export default function Hero() {
  const [text, setText] = useState("Transform text into natural speech with advanced AI")
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const features = [
      "Transform text into natural speech with advanced AI",
      "Create voice content that adapts to any environment",
      "Design custom voices for your unique brand identity",
      "Experience real-time interaction with your audience",
    ]

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % features.length)
      setText(features[(index + 1) % features.length])
    }, 5000)

    return () => clearInterval(interval)
  }, [index])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 py-20 md:py-32">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-3xl"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl"
        >
          <div className="mb-4 inline-flex items-center rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
            <Sparkles className="mr-2 h-4 w-4 text-yellow-300" />
            <span className="text-sm font-medium text-white">Next-Generation Voice Technology</span>
          </div>

          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            VoiceCanvas
            <span className="block bg-gradient-to-r from-yellow-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent">
              AI-Powered Speech Platform
            </span>
          </h1>

          <motion.p
            key={text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-xl text-white/90"
          >
            {text}
          </motion.p>

          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button size="lg" className="group bg-white text-purple-700 hover:bg-white/90">
              Try For Free
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            >
              <Mic className="mr-2 h-4 w-4" />
              Live Demo
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 rounded-xl bg-white/10 p-2 backdrop-blur-md sm:p-4"
        >
          <div className="overflow-hidden rounded-lg shadow-2xl">
            <img
              src="/placeholder.svg?height=600&width=1200"
              alt="VoiceCanvas Dashboard"
              className="w-full rounded-lg object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
