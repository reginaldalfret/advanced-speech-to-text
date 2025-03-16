"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Mic, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 shadow-md backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between md:h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Mic className={`mr-2 h-6 w-6 ${isScrolled ? "text-indigo-600" : "text-white"}`} />
              <span className={`text-xl font-bold ${isScrolled ? "text-gray-900" : "text-white"}`}>VoiceCanvas</span>
            </Link>
          </div>

          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {[
                { name: "Features", href: "#features", hasDropdown: true },
                { name: "Pricing", href: "#pricing", hasDropdown: false },
                { name: "Demo", href: "#demo", hasDropdown: false },
                { name: "Resources", href: "#resources", hasDropdown: true },
              ].map((item) => (
                <li key={item.name}>
                  {item.hasDropdown ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center">
                        <span className={`text-sm font-medium ${isScrolled ? "text-gray-700" : "text-white"}`}>
                          {item.name}
                        </span>
                        <ChevronDown className={`ml-1 h-4 w-4 ${isScrolled ? "text-gray-700" : "text-white"}`} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Option 1</DropdownMenuItem>
                        <DropdownMenuItem>Option 2</DropdownMenuItem>
                        <DropdownMenuItem>Option 3</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link
                      href={item.href}
                      className={`text-sm font-medium ${
                        isScrolled ? "text-gray-700 hover:text-indigo-600" : "text-white hover:text-indigo-200"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden md:block">
            <Button
              variant={isScrolled ? "outline" : "secondary"}
              className={isScrolled ? "border-indigo-600 text-indigo-600" : ""}
            >
              Sign In
            </Button>
            <Button className="ml-4 bg-indigo-600 hover:bg-indigo-700">Get Started</Button>
          </div>

          <button className="block md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? "text-gray-900" : "text-white"}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? "text-gray-900" : "text-white"}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="bg-white px-4 py-2 shadow-lg">
            <ul className="space-y-2">
              {[
                { name: "Features", href: "#features" },
                { name: "Pricing", href: "#pricing" },
                { name: "Demo", href: "#demo" },
                { name: "Resources", href: "#resources" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block py-2 text-gray-700 hover:text-indigo-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col space-y-2 pb-4">
              <Button variant="outline" className="w-full justify-center">
                Sign In
              </Button>
              <Button className="w-full justify-center">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
