"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export default function CallToAction() {
  return (
    <section className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 py-20 text-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Elevate Your Applications with Next-Generation Voice Technology
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="mb-8 text-lg text-indigo-200"
            >
              Join thousands of developers, content creators, and businesses who are transforming user experiences with
              our advanced TTS platform.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-8 space-y-4"
            >
              {[
                "Real-time interaction & feedback",
                "Comprehensive accessibility features",
                "Hyper-personalization capabilities",
                "Ethical & secure voice technology",
                "Seamless environmental adaptation",
              ].map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 shrink-0 text-indigo-300" />
                  <span>{feature}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
            >
              <Button size="lg" className="bg-white text-indigo-700 hover:bg-white/90">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-indigo-300 text-white hover:bg-indigo-800">
                Schedule Demo
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-purple-500/30 backdrop-blur-xl"></div>
            <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-indigo-500/20 backdrop-blur-xl"></div>

            <div className="relative rounded-xl bg-white/10 p-2 backdrop-blur-md">
              <img
                src="/placeholder.svg?height=400&width=500&text=Voice%20Technology%20Demo"
                alt="Voice Technology Platform"
                className="rounded-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
