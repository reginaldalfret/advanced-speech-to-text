"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Pause, SkipBack, Volume2, VolumeX, Mic, Settings, Wand2, Sliders } from "lucide-react"

export default function Demo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(75)
  const [isMuted, setIsMuted] = useState(false)
  const [selectedVoice, setSelectedVoice] = useState("")
  const [text, setText] = useState(
    "Experience the most natural-sounding text-to-speech technology with our advanced AI voice synthesis.",
  )
  const [progress, setProgress] = useState(0)
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  const [status, setStatus] = useState("")
  const [isStatusActive, setIsStatusActive] = useState(false)
  const [rate, setRate] = useState(1)
  const [pitch, setPitch] = useState(1)

  const progressInterval = useRef<NodeJS.Timeout | null>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      setAvailableVoices(voices)
    }

    loadVoices()

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices
    }

    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  // Show status message
  const showStatus = (message: string, isError = false) => {
    setStatus(message)
    setIsStatusActive(true)

    setTimeout(() => {
      setIsStatusActive(false)
    }, 3000)
  }

  // Handle play/pause
  const handlePlayPause = () => {
    if (isPlaying) {
      stopSpeaking()
    } else {
      speak()
    }
  }

  // Speak function
  const speak = () => {
    if (!text.trim()) {
      showStatus("Please enter some text to speak", true)
      return
    }

    // Cancel any ongoing speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel()
    }

    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(text)
    utteranceRef.current = utterance

    // Set selected voice
    if (selectedVoice) {
      const voice = availableVoices.find((v, index) => index.toString() === selectedVoice)
      if (voice) {
        utterance.voice = voice
      }
    }

    // Set rate and pitch
    utterance.rate = rate
    utterance.pitch = pitch
    utterance.volume = isMuted ? 0 : volume / 100

    // Events
    utterance.onstart = () => {
      setIsPlaying(true)
      showStatus("Speaking...")

      // Simulate progress
      let currentProgress = 0
      progressInterval.current = setInterval(
        () => {
          currentProgress += 1
          if (currentProgress > 100) {
            if (progressInterval.current) {
              clearInterval(progressInterval.current)
            }
            return
          }
          setProgress(currentProgress)
        },
        (text.length * 10) / rate,
      ) // Adjust based on text length and rate
    }

    utterance.onend = () => {
      setIsPlaying(false)
      showStatus("Finished speaking")
      setProgress(0)
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }

    utterance.onerror = (event) => {
      setIsPlaying(false)
      showStatus(`Error occurred: ${event.error}`, true)
      setProgress(0)
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }

    // Speak
    window.speechSynthesis.speak(utterance)
  }

  // Stop speaking
  const stopSpeaking = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel()
      showStatus("Speech stopped")
      setIsPlaying(false)
      setProgress(0)
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }

  // Handle reset
  const handleReset = () => {
    stopSpeaking()
    setProgress(0)
  }

  // Handle mute
  const handleMute = () => {
    setIsMuted(!isMuted)

    // Update current utterance if speaking
    if (utteranceRef.current && window.speechSynthesis.speaking) {
      utteranceRef.current.volume = !isMuted ? 0 : volume / 100
    }
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Try Our Advanced TTS Demo
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Experience the power of our next-generation voice technology with this interactive demo.
          </p>
        </div>

        <div className="mx-auto max-w-5xl rounded-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 shadow-xl sm:p-10">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3 space-x-0 rounded-lg bg-indigo-100/50 p-1">
              <TabsTrigger value="basic" className="rounded-md">
                Basic
              </TabsTrigger>
              <TabsTrigger value="advanced" className="rounded-md">
                Advanced
              </TabsTrigger>
              <TabsTrigger value="custom" className="rounded-md">
                Custom Voice
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="mt-0">
              <div className="space-y-6">
                <div className="rounded-lg bg-white p-4 shadow-md">
                  <label htmlFor="text-input" className="mb-2 block text-sm font-medium text-gray-700">
                    Enter text to convert to speech
                  </label>
                  <textarea
                    id="text-input"
                    rows={4}
                    className="w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>

                <div className="rounded-lg bg-white p-4 shadow-md">
                  <div className="mb-4 flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Select Voice</label>
                    <div className="flex items-center space-x-2">
                      <Settings className="h-4 w-4 text-gray-500" />
                      <span className="text-xs text-gray-500">Voice Settings</span>
                    </div>
                  </div>

                  <select
                    className="w-full rounded-md border border-gray-300 p-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={selectedVoice}
                    onChange={(e) => setSelectedVoice(e.target.value)}
                  >
                    <option value="">Default Voice</option>
                    {availableVoices.map((voice, index) => (
                      <option key={index} value={index}>
                        {voice.name} ({voice.lang})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 p-4 shadow-md">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="h-1 w-full rounded-full bg-white/20">
                      <motion.div className="h-full rounded-full bg-white" style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20"
                        onClick={handleReset}
                      >
                        <SkipBack className="h-5 w-5" />
                      </Button>

                      <Button
                        size="icon"
                        className="h-14 w-14 rounded-full bg-white text-indigo-600 hover:bg-white/90"
                        onClick={handlePlayPause}
                      >
                        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 pl-1" />}
                      </Button>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20"
                        onClick={handleMute}
                      >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>

                      <Slider
                        value={[isMuted ? 0 : volume]}
                        min={0}
                        max={100}
                        step={1}
                        className="w-24"
                        onValueChange={(value) => {
                          setVolume(value[0])
                          if (value[0] === 0) {
                            setIsMuted(true)
                          } else {
                            setIsMuted(false)
                          }
                        }}
                      />
                    </div>
                  </div>

                  {isStatusActive && (
                    <div className="mt-4 rounded-md bg-white/10 p-2 text-center text-sm text-white">{status}</div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="mt-0">
              <div className="space-y-6">
                <div className="rounded-lg bg-white p-4 shadow-md">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Advanced Voice Controls</h3>
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <Wand2 className="h-4 w-4" />
                      <span>Auto-Optimize</span>
                    </Button>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">Speech Rate</label>
                          <span className="text-xs text-gray-500">{rate.toFixed(1)}x</span>
                        </div>
                        <Slider
                          value={[rate * 50]}
                          max={100}
                          step={1}
                          onValueChange={(value) => setRate(value[0] / 50)}
                        />
                      </div>

                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">Pitch</label>
                          <span className="text-xs text-gray-500">{pitch.toFixed(1)}</span>
                        </div>
                        <Slider
                          value={[pitch * 50]}
                          max={100}
                          step={1}
                          onValueChange={(value) => setPitch(value[0] / 50)}
                        />
                      </div>

                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">Clarity</label>
                          <span className="text-xs text-gray-500">High</span>
                        </div>
                        <Slider defaultValue={[75]} max={100} step={1} />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">Emotion Intensity</label>
                          <span className="text-xs text-gray-500">Moderate</span>
                        </div>
                        <Slider defaultValue={[60]} max={100} step={1} />
                      </div>

                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">Pauses</label>
                          <span className="text-xs text-gray-500">Natural</span>
                        </div>
                        <Slider defaultValue={[50]} max={100} step={1} />
                      </div>

                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">Background Noise Reduction</label>
                          <span className="text-xs text-gray-500">Strong</span>
                        </div>
                        <Slider defaultValue={[80]} max={100} step={1} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label htmlFor="advanced-text-input" className="mb-2 block text-sm font-medium text-gray-700">
                      Enter text to convert to speech
                    </label>
                    <textarea
                      id="advanced-text-input"
                      rows={4}
                      className="w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg bg-white p-4 shadow-md">
                    <div className="mb-4 flex items-center">
                      <Sliders className="mr-2 h-5 w-5 text-indigo-600" />
                      <h3 className="text-lg font-medium text-gray-900">Environment Adaptation</h3>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center rounded-md bg-gray-50 p-2">
                        <input
                          type="checkbox"
                          id="noise-adapt"
                          className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600"
                        />
                        <label htmlFor="noise-adapt" className="text-sm text-gray-700">
                          Noise-Adaptive Output
                        </label>
                      </div>

                      <div className="flex items-center rounded-md bg-gray-50 p-2">
                        <input
                          type="checkbox"
                          id="echo-cancel"
                          className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600"
                        />
                        <label htmlFor="echo-cancel" className="text-sm text-gray-700">
                          Echo Cancellation
                        </label>
                      </div>

                      <div className="flex items-center rounded-md bg-gray-50 p-2">
                        <input
                          type="checkbox"
                          id="spatial-audio"
                          className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600"
                        />
                        <label htmlFor="spatial-audio" className="text-sm text-gray-700">
                          Spatial Audio (3D)
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-white p-4 shadow-md">
                    <div className="mb-4 flex items-center">
                      <Mic className="mr-2 h-5 w-5 text-indigo-600" />
                      <h3 className="text-lg font-medium text-gray-900">Real-Time Interaction</h3>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center rounded-md bg-gray-50 p-2">
                        <input
                          type="checkbox"
                          id="interrupt"
                          className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600"
                        />
                        <label htmlFor="interrupt" className="text-sm text-gray-700">
                          Allow Interruptions
                        </label>
                      </div>

                      <div className="flex items-center rounded-md bg-gray-50 p-2">
                        <input
                          type="checkbox"
                          id="feedback"
                          className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600"
                        />
                        <label htmlFor="feedback" className="text-sm text-gray-700">
                          Listener Feedback Loop
                        </label>
                      </div>

                      <div className="flex items-center rounded-md bg-gray-50 p-2">
                        <input
                          type="checkbox"
                          id="gesture"
                          className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600"
                        />
                        <label htmlFor="gesture" className="text-sm text-gray-700">
                          Gesture Control
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 p-4 shadow-md">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="h-1 w-full rounded-full bg-white/20">
                      <motion.div className="h-full rounded-full bg-white" style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20"
                        onClick={handleReset}
                      >
                        <SkipBack className="h-5 w-5" />
                      </Button>

                      <Button
                        size="icon"
                        className="h-14 w-14 rounded-full bg-white text-indigo-600 hover:bg-white/90"
                        onClick={handlePlayPause}
                      >
                        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 pl-1" />}
                      </Button>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20"
                        onClick={handleMute}
                      >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>

                      <Slider
                        value={[isMuted ? 0 : volume]}
                        min={0}
                        max={100}
                        step={1}
                        className="w-24"
                        onValueChange={(value) => {
                          setVolume(value[0])
                          if (value[0] === 0) {
                            setIsMuted(true)
                          } else {
                            setIsMuted(false)
                          }
                        }}
                      />
                    </div>
                  </div>

                  {isStatusActive && (
                    <div className="mt-4 rounded-md bg-white/10 p-2 text-center text-sm text-white">{status}</div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="custom" className="mt-0">
              <div className="space-y-6">
                <div className="rounded-lg bg-white p-4 shadow-md">
                  <h3 className="mb-4 text-lg font-medium text-gray-900">Create Your Custom Voice</h3>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">Base Voice Type</label>
                      <select className="w-full rounded-md border border-gray-300 p-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        <option>Professional Male</option>
                        <option>Professional Female</option>
                        <option>Casual Male</option>
                        <option>Casual Female</option>
                        <option>Narrative</option>
                        <option>Broadcast</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">Accent</label>
                      <select className="w-full rounded-md border border-gray-300 p-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        <option>American</option>
                        <option>British</option>
                        <option>Australian</option>
                        <option>Indian</option>
                        <option>German</option>
                        <option>French</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">Age Range</label>
                      <select className="w-full rounded-md border border-gray-300 p-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        <option>Young Adult (20-30)</option>
                        <option>Adult (30-50)</option>
                        <option>Senior (50+)</option>
                        <option>Child</option>
                        <option>Teen</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">Voice Style</label>
                      <select className="w-full rounded-md border border-gray-300 p-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        <option>Natural</option>
                        <option>Authoritative</option>
                        <option>Friendly</option>
                        <option>Energetic</option>
                        <option>Calm</option>
                        <option>Dramatic</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="mb-2 block text-sm font-medium text-gray-700">Voice Customization</label>
                    <div className="space-y-4">
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-xs text-gray-500">Deeper</span>
                          <span className="text-xs font-medium">Pitch</span>
                          <span className="text-xs text-gray-500">Higher</span>
                        </div>
                        <Slider
                          value={[pitch * 50]}
                          max={100}
                          step={1}
                          onValueChange={(value) => setPitch(value[0] / 50)}
                        />
                      </div>

                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-xs text-gray-500">Softer</span>
                          <span className="text-xs font-medium">Clarity</span>
                          <span className="text-xs text-gray-500">Crisper</span>
                        </div>
                        <Slider defaultValue={[60]} max={100} step={1} />
                      </div>

                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-xs text-gray-500">Monotone</span>
                          <span className="text-xs font-medium">Expressiveness</span>
                          <span className="text-xs text-gray-500">Animated</span>
                        </div>
                        <Slider defaultValue={[70]} max={100} step={1} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label htmlFor="custom-text-input" className="mb-2 block text-sm font-medium text-gray-700">
                      Enter text to convert to speech
                    </label>
                    <textarea
                      id="custom-text-input"
                      rows={4}
                      className="w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setPitch(1)
                        setRate(1)
                      }}
                    >
                      Reset
                    </Button>
                    <Button>Save Voice</Button>
                  </div>
                </div>

                <div className="rounded-lg bg-indigo-50 p-4 shadow-md">
                  <h3 className="mb-4 text-lg font-medium text-gray-900">Voice Cloning (Premium Feature)</h3>

                  <div className="mb-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800">
                    Voice cloning requires consent verification and is subject to our ethical use policy.
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">
                        Upload a sample of your voice or a consenting person's voice to create a custom voice clone.
                      </p>
                      <p className="mt-1 text-xs text-gray-500">Minimum 30 seconds of clear speech required</p>
                    </div>

                    <Button variant="outline" className="flex items-center gap-1">
                      <Mic className="h-4 w-4" />
                      <span>Record Sample</span>
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 p-4 shadow-md">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="h-1 w-full rounded-full bg-white/20">
                      <motion.div className="h-full rounded-full bg-white" style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20"
                        onClick={handleReset}
                      >
                        <SkipBack className="h-5 w-5" />
                      </Button>

                      <Button
                        size="icon"
                        className="h-14 w-14 rounded-full bg-white text-indigo-600 hover:bg-white/90"
                        onClick={handlePlayPause}
                      >
                        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 pl-1" />}
                      </Button>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20"
                        onClick={handleMute}
                      >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>

                      <Slider
                        value={[isMuted ? 0 : volume]}
                        min={0}
                        max={100}
                        step={1}
                        className="w-24"
                        onValueChange={(value) => {
                          setVolume(value[0])
                          if (value[0] === 0) {
                            setIsMuted(true)
                          } else {
                            setIsMuted(false)
                          }
                        }}
                      />
                    </div>
                  </div>

                  {isStatusActive && (
                    <div className="mt-4 rounded-md bg-white/10 p-2 text-center text-sm text-white">{status}</div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
