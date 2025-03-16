"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "The real-time interaction features have transformed how our virtual assistants engage with customers. The ability to adapt speech based on user reactions is game-changing.",
    author: "Sarah Johnson",
    title: "CTO, TechSolutions Inc.",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "The accessibility features in this TTS platform have made our educational content accessible to students with diverse needs. The lip-sync animation is particularly impressive.",
    author: "Michael Chen",
    title: "Director of Accessibility, EduTech",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "We've seen a 40% increase in user engagement since implementing the mood-based voice selection. Our app now feels more personalized and responsive to our users' emotional states.",
    author: "Jessica Williams",
    title: "Product Manager, MindfulApp",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "The voice marketplace has allowed us to create unique character voices for our game that would have been impossible otherwise. Our players love the diversity of voices.",
    author: "David Rodriguez",
    title: "Lead Sound Designer, GameWorld Studios",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "The ethical features, especially the consent verification system, gave us confidence to use voice cloning in our marketing campaigns without concerns about misuse.",
    author: "Emma Thompson",
    title: "Marketing Director, BrandForward",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "The environmental adaptation features have made our in-car assistant much more usable. It automatically adjusts based on road noise, making the experience seamless.",
    author: "Robert Kim",
    title: "UX Lead, AutoTech Innovations",
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function Testimonials() {
  return (
    <section className="bg-gradient-to-b from-indigo-50 to-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What Our Customers Say</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Discover how our advanced TTS platform is transforming businesses across industries.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl bg-white p-6 shadow-lg"
            >
              <Quote className="mb-4 h-8 w-8 text-indigo-400" />
              <p className="mb-6 text-gray-700">{testimonial.quote}</p>
              <div className="flex items-center">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.author}
                  className="mr-4 h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{testimonial.author}</h4>
                  <p className="text-sm text-gray-600">{testimonial.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 p-8 shadow-xl">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="text-white">
              <h3 className="text-2xl font-bold">Ready to transform your voice experience?</h3>
              <p className="mt-2 text-purple-100">
                Join thousands of satisfied customers who have elevated their applications with our advanced TTS
                technology.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="rounded-lg bg-white px-6 py-3 font-semibold text-indigo-600 shadow-md transition-all hover:shadow-lg"
              >
                Start Your Free Trial
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
