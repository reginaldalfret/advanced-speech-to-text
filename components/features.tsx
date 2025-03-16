"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Mic,
  MessageSquare,
  Accessibility,
  Fingerprint,
  Layers,
  HandIcon as Gesture,
  Users,
  Shield,
  Gamepad2,
  Volume2,
  Headphones,
  Cpu,
  Share2,
  Leaf,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const featureCategories = [
  {
    id: "interaction",
    name: "Real-Time Interaction",
    features: [
      {
        icon: <MessageSquare className="h-6 w-6" />,
        title: "Conversational AI Integration",
        description:
          "Allow users to interrupt the TTS output with virtual assistants pausing mid-sentence for user input.",
      },
      {
        icon: <Mic className="h-6 w-6" />,
        title: "Listener Feedback Loop",
        description:
          "Adjust speech delivery (speed, tone) based on real-time user reactions detected via voice tone or camera input.",
      },
    ],
  },
  {
    id: "accessibility",
    name: "Accessibility",
    features: [
      {
        icon: <Accessibility className="h-6 w-6" />,
        title: "Stutter/Disfluency Simulation",
        description: "Option to mimic natural speech imperfections for role-playing games or accessibility training.",
      },
      {
        icon: <Layers className="h-6 w-6" />,
        title: "Lip-Sync Animation",
        description: "Generate synchronized lip movements for avatars or video content.",
      },
      {
        icon: <Fingerprint className="h-6 w-6" />,
        title: "Tactile Feedback",
        description: "Integrate with braille devices for deaf-blind users.",
      },
    ],
  },
  {
    id: "personalization",
    name: "Hyper-Personalization",
    features: [
      {
        icon: <Users className="h-6 w-6" />,
        title: "Listener-Specific Voices",
        description: "Let users customize how a voice sounds to them, such as making it sound like a familiar person.",
      },
      {
        icon: <Headphones className="h-6 w-6" />,
        title: "Mood-Based Voice Selection",
        description:
          "Auto-select voices based on the user's current mood, providing calming voices for stressed users.",
      },
    ],
  },
  {
    id: "interaction",
    name: "Multimodal Interaction",
    features: [
      {
        icon: <Gesture className="h-6 w-6" />,
        title: "Gesture-Controlled Speech",
        description: "Use hand gestures via webcam to control speech speed, volume, or emphasis.",
      },
      {
        icon: <Layers className="h-6 w-6" />,
        title: "Visual Emotion Overlay",
        description: "Pair speech with emojis or animated avatars reflecting detected emotions.",
      },
    ],
  },
  {
    id: "security",
    name: "Ethical & Security",
    features: [
      {
        icon: <Shield className="h-6 w-6" />,
        title: "Consent Verification",
        description: "Blockchain-based logs to ensure voice cloning consent for celebrity voice licenses.",
      },
      {
        icon: <Shield className="h-6 w-6" />,
        title: "Deepfake Detection API",
        description: "Flag synthetic voices to combat misuse in fraud or misinformation.",
      },
    ],
  },
  {
    id: "fun",
    name: "Gamification",
    features: [
      {
        icon: <Gamepad2 className="h-6 w-6" />,
        title: "Voice Leveling System",
        description: "Users unlock voice styles or accents by achieving goals like practicing language learning.",
      },
      {
        icon: <Volume2 className="h-6 w-6" />,
        title: "Voice Filters",
        description: "Apply fun effects like robot mode or epic movie trailer voice styles.",
      },
    ],
  },
  {
    id: "environment",
    name: "Environmental",
    features: [
      {
        icon: <Volume2 className="h-6 w-6" />,
        title: "Noise-Adaptive Output",
        description: "Auto-adjust volume/clarity based on ambient noise, getting louder in busy environments.",
      },
      {
        icon: <Headphones className="h-6 w-6" />,
        title: "Echo Cancellation",
        description: "Optimize speech for specific spaces like conference rooms or cars.",
      },
    ],
  },
  {
    id: "community",
    name: "Community-Driven",
    features: [
      {
        icon: <Share2 className="h-6 w-6" />,
        title: "Voice Sharing Marketplace",
        description: "Users upload/sell custom voices with royalty splits.",
      },
      {
        icon: <Users className="h-6 w-6" />,
        title: "Open-Source Voice Profiles",
        description: "Allow developers to contribute accents/tones for niche languages.",
      },
    ],
  },
  {
    id: "efficiency",
    name: "Energy Efficiency",
    features: [
      {
        icon: <Leaf className="h-6 w-6" />,
        title: "Green TTS",
        description: "Low-power models for eco-friendly deployment on solar-powered devices.",
      },
      {
        icon: <Cpu className="h-6 w-6" />,
        title: "Edge Computing",
        description: "Lightweight models for offline use in areas with poor connectivity.",
      },
    ],
  },
]

export default function Features() {
  const [activeTab, setActiveTab] = useState("interaction")

  return (
    <section className="bg-gradient-to-b from-indigo-50 to-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Innovative Features</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Our advanced TTS platform goes beyond basic speech synthesis with these cutting-edge capabilities.
          </p>
        </div>

        <Tabs defaultValue="interaction" value={activeTab} onValueChange={setActiveTab} className="mx-auto max-w-5xl">
          <div className="mb-8 overflow-x-auto">
            <TabsList className="inline-flex h-auto w-auto justify-start space-x-2 rounded-lg bg-gray-100 p-1">
              {featureCategories.slice(0, 6).map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="rounded-md px-4 py-2 text-sm">
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {featureCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid gap-6 md:grid-cols-2"
              >
                {category.features.map((feature, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden border-none shadow-lg transition-all duration-300 hover:shadow-xl"
                  >
                    <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 pb-2">
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <CardDescription className="text-base text-gray-600">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>

              <div className="mt-12 flex justify-center">
                <div className="relative h-[400px] w-full max-w-3xl overflow-hidden rounded-xl shadow-2xl">
                  <img
                    src={`/placeholder.svg?height=400&width=800&text=${category.name}%20Demo`}
                    alt={`${category.name} feature visualization`}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="mb-2 text-2xl font-bold text-white">{category.name}</h3>
                    <p className="text-white/80">
                      Interactive demonstration of our {category.name.toLowerCase()} features
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {featureCategories.slice(6, 9).map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-xl bg-gradient-to-br from-indigo-100 to-white p-6 shadow-lg"
            >
              <h3 className="mb-4 text-xl font-bold text-gray-900">{category.name}</h3>
              <ul className="space-y-3">
                {category.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white">
                      {feature.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{feature.title}</p>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
