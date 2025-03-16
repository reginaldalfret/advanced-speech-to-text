"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals and small projects",
      price: billingCycle === "monthly" ? 19 : 190,
      features: [
        "Basic TTS voices",
        "100,000 characters per month",
        "Standard voice customization",
        "Email support",
        "Basic analytics",
      ],
      limitations: ["No voice cloning", "No real-time interaction", "Limited voice styles"],
    },
    {
      name: "Professional",
      description: "Ideal for professionals and growing businesses",
      price: billingCycle === "monthly" ? 49 : 490,
      popular: true,
      features: [
        "All Starter features",
        "500,000 characters per month",
        "Advanced voice customization",
        "Real-time interaction features",
        "Priority support",
        "Detailed analytics",
        "Voice filters and effects",
        "Environmental adaptation",
      ],
      limitations: ["Limited voice cloning", "Basic ethical features"],
    },
    {
      name: "Enterprise",
      description: "For organizations with advanced needs",
      price: billingCycle === "monthly" ? 149 : 1490,
      features: [
        "All Professional features",
        "Unlimited characters",
        "Full voice cloning capabilities",
        "All real-time interaction features",
        "Dedicated account manager",
        "Custom voice development",
        "Advanced analytics and reporting",
        "Full ethical & security features",
        "API access with higher rate limits",
        "Custom integration support",
      ],
      limitations: [],
    },
  ]

  return (
    <section className="bg-gradient-to-b from-white to-indigo-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Flexible Pricing for Every Need
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Choose the perfect plan for your text-to-speech requirements.
          </p>

          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-lg bg-gray-100 p-1">
              <button
                className={`rounded-md px-4 py-2 text-sm font-medium ${
                  billingCycle === "monthly" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly
              </button>
              <button
                className={`rounded-md px-4 py-2 text-sm font-medium ${
                  billingCycle === "annual" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setBillingCycle("annual")}
              >
                Annual <span className="text-xs text-green-600">Save 20%</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-xl ${
                plan.popular
                  ? "border-2 border-indigo-500 bg-white shadow-xl"
                  : "border border-gray-200 bg-white shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-indigo-500 py-1 text-center text-sm font-semibold text-white">
                  Most Popular
                </div>
              )}

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <p className="mt-1 text-gray-600">{plan.description}</p>

                <div className="mt-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                    <span className="ml-1 text-gray-500">/{billingCycle === "monthly" ? "month" : "year"}</span>
                  </div>
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="mr-2 h-5 w-5 shrink-0 text-green-500" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.limitations.length > 0 && (
                  <div className="mt-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex cursor-help items-center text-sm text-gray-500">
                            <HelpCircle className="mr-1 h-4 w-4" />
                            <span>Limitations</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <ul className="list-inside list-disc space-y-1 text-sm">
                            {plan.limitations.map((limitation) => (
                              <li key={limitation}>{limitation}</li>
                            ))}
                          </ul>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}

                <div className="mt-8">
                  <Button
                    className={`w-full ${
                      plan.popular ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-900 hover:bg-gray-800"
                    }`}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 rounded-xl bg-indigo-900 p-8 text-white shadow-xl">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-bold">Need a custom solution?</h3>
              <p className="mt-2 text-indigo-200">
                We offer tailored enterprise solutions for organizations with specific requirements. Our team will work
                with you to create a custom package that meets your needs.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-indigo-300" />
                  <span>Custom voice development</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-indigo-300" />
                  <span>Dedicated infrastructure</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-indigo-300" />
                  <span>On-premise deployment options</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-indigo-300" />
                  <span>Custom integration & development</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-center">
              <Button size="lg" variant="outline" className="border-indigo-300 text-white hover:bg-indigo-800">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
