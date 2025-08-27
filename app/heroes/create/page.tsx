"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Dice6, Save } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface HeroAttributes {
  mu: number // Mut
  kl: number // Klugheit
  in: number // Intuition
  ch: number // Charisma
  ff: number // Fingerfertigkeit
  ge: number // Gewandtheit
  ko: number // Konstitution
  kk: number // Körperkraft
}

export default function CreateHeroPage() {
  const { user } = useAuth()
  const router = useRouter()
  
  // Basic Information
  const [name, setName] = useState('')
  const [race, setRace] = useState('')
  const [culture, setCulture] = useState('')
  const [profession, setProfession] = useState('')
  
  // Physical Characteristics
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [hairColor, setHairColor] = useState('')
  const [eyeColor, setEyeColor] = useState('')
  
  // Attributes
  const [attributes, setAttributes] = useState<HeroAttributes>({
    mu: 8,
    kl: 8,
    in: 8,
    ch: 8,
    ff: 8,
    ge: 8,
    ko: 8,
    kk: 8,
  })
  
  const [background, setBackground] = useState('')
  const [loading, setLoading] = useState(false)

  // DSA 4.1 Data
  const races = [
    { id: 'mensch', name: 'Mensch', mods: { mu: 0, kl: 0, in: 0, ch: 0, ff: 0, ge: 0, ko: 0, kk: 0 } },
    { id: 'elf', name: 'Elf', mods: { mu: 0, kl: 1, in: 1, ch: 1, ff: 1, ge: 1, ko: -1, kk: -2 } },
    { id: 'zwerg', name: 'Zwerg', mods: { mu: 1, kl: 0, in: 0, ch: -1, ff: 0, ge: -1, ko: 2, kk: 1 } },
    { id: 'halbelf', name: 'Halbelf', mods: { mu: 0, kl: 0, in: 1, ch: 1, ff: 0, ge: 0, ko: 0, kk: -1 } },
    { id: 'halbling', name: 'Halbling', mods: { mu: -1, kl: 0, in: 1, ch: 1, ff: 1, ge: 1, ko: 0, kk: -2 } },
  ]

  const cultures = [
    'Mittelreich', 'Horasreich', 'Bornland', 'Nordmarken', 'Nostria', 'Andergast',
    'Almada', 'Albernia', 'Weiden', 'Darpatien', 'Kosch', 'Garetien'
  ]

  const professions = [
    'Krieger', 'Magier', 'Geweihter', 'Spitzbube', 'Streuner', 'Waldläufer',
    'Gladiator', 'Ritter', 'Seefahrer', 'Handwerker', 'Gelehrter', 'Söldner'
  ]

  const rollAttributes = () => {
    const newAttributes: HeroAttributes = {
      mu: Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 3,
      kl: Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 3,
      in: Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 3,
      ch: Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 3,
      ff: Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 3,
      ge: Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 3,
      ko: Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 3,
      kk: Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 3,
    }
    
    // Apply racial modifiers
    const selectedRace = races.find(r => r.id === race)
    if (selectedRace) {
      Object.keys(newAttributes).forEach(key => {
        const attrKey = key as keyof HeroAttributes
        newAttributes[attrKey] += selectedRace.mods[attrKey]
        // Ensure attributes don't go below 5 or above 18
        newAttributes[attrKey] = Math.max(5, Math.min(18, newAttributes[attrKey]))
      })
    }
    
    setAttributes(newAttributes)
    toast.success('Eigenschaften erfolgreich ausgewürfelt!')
  }

  const calculateLP = () => {
    return Math.floor((attributes.ko + attributes.kk) / 2) + 25
  }

  const calculateAP = () => {
    if (attributes.kl >= 13 || attributes.in >= 13) {
      return Math.max(attributes.kl, attributes.in) + 20
    }
    return 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim() || !race || !culture || !profession) {
      toast.error('Bitte füllen Sie alle Pflichtfelder aus')
      return
    }

    if (!user) {
      toast.error('Sie müssen angemeldet sein, um einen Helden zu erstellen')
      return
    }

    setLoading(true)

    try {
      // Here you would normally save to your database
      // For now, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Held erfolgreich erstellt!')
      router.push('/heroes')
    } catch (error) {
      toast.error('Fehler beim Erstellen des Helden')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zum Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Neuen Helden erstellen</h1>
            <p className="text-slate-400">Erstellen Sie einen neuen Helden nach DSA 4.1 Regeln</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Grundinformationen</CardTitle>
              <CardDescription>Wählen Sie Rasse, Kultur und Profession für Ihren Helden</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Heldenname *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name des Helden"
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="race" className="text-white">Rasse *</Label>
                  <Select value={race} onValueChange={setRace} required>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Rasse wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {races.map((r) => (
                        <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="culture" className="text-white">Kultur *</Label>
                  <Select value={culture} onValueChange={setCulture} required>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Kultur wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {cultures.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profession" className="text-white">Profession *</Label>
                  <Select value={profession} onValueChange={setProfession} required>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Profession wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {professions.map((p) => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attributes */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Eigenschaften</CardTitle>
                  <CardDescription>Eigenschaften Ihres Helden (3W6 pro Eigenschaft)</CardDescription>
                </div>
                <Button type="button" onClick={rollAttributes} variant="outline">
                  <Dice6 className="h-4 w-4 mr-2" />
                  Auswürfeln
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(attributes).map(([key, value]) => {
                  const labels: Record<string, string> = {
                    mu: 'MU (Mut)',
                    kl: 'KL (Klugheit)',
                    in: 'IN (Intuition)',
                    ch: 'CH (Charisma)',
                    ff: 'FF (Fingerfertigkeit)',
                    ge: 'GE (Gewandtheit)',
                    ko: 'KO (Konstitution)',
                    kk: 'KK (Körperkraft)',
                  }
                  
                  return (
                    <div key={key} className="space-y-2 text-center">
                      <Label className="text-white text-sm">{labels[key]}</Label>
                      <div className="p-4 bg-slate-700 rounded-lg border border-slate-600">
                        <div className="text-2xl font-bold text-white">{value}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              <Separator className="my-4" />
              
              {/* Derived Values */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <Label className="text-white text-sm">Lebenspunkte</Label>
                  <div className="p-3 bg-green-900/30 rounded-lg border border-green-700 mt-2">
                    <div className="text-xl font-bold text-green-400">{calculateLP()}</div>
                  </div>
                </div>
                <div className="text-center">
                  <Label className="text-white text-sm">Astralpunkte</Label>
                  <div className="p-3 bg-blue-900/30 rounded-lg border border-blue-700 mt-2">
                    <div className="text-xl font-bold text-blue-400">{calculateAP()}</div>
                  </div>
                </div>
                <div className="text-center">
                  <Label className="text-white text-sm">Karmapunkte</Label>
                  <div className="p-3 bg-purple-900/30 rounded-lg border border-purple-700 mt-2">
                    <div className="text-xl font-bold text-purple-400">0</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Physical Characteristics */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Äußere Erscheinung</CardTitle>
              <CardDescription>Physische Eigenschaften Ihres Helden</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height" className="text-white">Größe (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="175"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-white">Gewicht (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="70"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hairColor" className="text-white">Haarfarbe</Label>
                  <Input
                    id="hairColor"
                    value={hairColor}
                    onChange={(e) => setHairColor(e.target.value)}
                    placeholder="Braun"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eyeColor" className="text-white">Augenfarbe</Label>
                  <Input
                    id="eyeColor"
                    value={eyeColor}
                    onChange={(e) => setEyeColor(e.target.value)}
                    placeholder="Blau"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Background */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Hintergrund</CardTitle>
              <CardDescription>Geschichte und Persönlichkeit Ihres Helden</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="background" className="text-white">Hintergrundgeschichte</Label>
                <Textarea
                  id="background"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  placeholder="Erzählen Sie die Geschichte Ihres Helden..."
                  rows={4}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button 
              type="submit" 
              size="lg" 
              disabled={loading}
              className="w-full md:w-auto"
            >
              {loading ? (
                <>Wird erstellt...</>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Held erstellen
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}