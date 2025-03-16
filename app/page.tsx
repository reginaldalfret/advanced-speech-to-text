import Hero from "@/components/hero"
import Features from "@/components/features"
import Demo from "@/components/demo"
import Pricing from "@/components/pricing"
import Testimonials from "@/components/testimonials"
import CallToAction from "@/components/call-to-action"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Demo />
      <Pricing />
      <Testimonials />
      <CallToAction />
    </main>
  )
}
