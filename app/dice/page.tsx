"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Dice6, RotateCcw, Trophy, X } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface TalentRollResult {
  dice1: number
  dice2: number
  dice3: number
  totalRolled: number
  pointsUsed: number
  remainingTalentPoints: number
  success: boolean
  qualityLevel: number
  rolled: boolean
}

interface Talent {
  name: string
  attributes: [string, string, string]
  category: string
}

export default function DicePage() {
  const [selectedTalent, setSelectedTalent] = useState<Talent | null>(null)
  const [talentValue, setTalentValue] = useState(10)
  const [modifier, setModifier] = useState(0)
  const [attribute1, setAttribute1] = useState(12)
  const [attribute2, setAttribute2] = useState(12)
  const [attribute3, setAttribute3] = useState(12)
  const [result, setResult] = useState<TalentRollResult | null>(null)
  const [rollHistory, setRollHistory] = useState<TalentRollResult[]>([])

  // DSA 4.1 Talents
  const talents: Talent[] = [
    // Physical Talents
    { name: 'Klettern', attributes: ['MU', 'GE', 'KK'], category: 'Körperlich' },
    { name: 'Körperbeherrschung', attributes: ['MU', 'IN', 'GE'], category: 'Körperlich' },
    { name: 'Reiten', attributes: ['CH', 'GE', 'KK'], category: 'Körperlich' },
    { name: 'Schleichen', attributes: ['MU', 'IN', 'GE'], category: 'Körperlich' },
    { name: 'Schwimmen', attributes: ['GE', 'KO', 'KK'], category: 'Körperlich' },
    { name: 'Selbstbeherrschung', attributes: ['MU', 'KO', 'KK'], category: 'Körperlich' },
    { name: 'Singen', attributes: ['IN', 'CH', 'KO'], category: 'Körperlich' },
    { name: 'Sinnenschärfe', attributes: ['KL', 'IN', 'IN'], category: 'Körperlich' },
    { name: 'Tanzen', attributes: ['CH', 'GE', 'GE'], category: 'Körperlich' },
    { name: 'Zechen', attributes: ['KL', 'KO', 'KK'], category: 'Körperlich' },
    
    // Social Talents
    { name: 'Betören', attributes: ['MU', 'CH', 'CH'], category: 'Gesellschaft' },
    { name: 'Etikette', attributes: ['KL', 'IN', 'CH'], category: 'Gesellschaft' },
    { name: 'Gassenwissen', attributes: ['KL', 'IN', 'CH'], category: 'Gesellschaft' },
    { name: 'Menschenkenntnis', attributes: ['KL', 'IN', 'CH'], category: 'Gesellschaft' },
    { name: 'Überreden', attributes: ['MU', 'IN', 'CH'], category: 'Gesellschaft' },
    { name: 'Überzeugen', attributes: ['KL', 'IN', 'CH'], category: 'Gesellschaft' },
    
    // Mental Talents
    { name: 'Götter/Kulte', attributes: ['KL', 'KL', 'IN'], category: 'Wissen' },
    { name: 'Rechnen', attributes: ['KL', 'KL', 'IN'], category: 'Wissen' },
    { name: 'Rechtskunde', attributes: ['KL', 'IN', 'CH'], category: 'Wissen' },
    { name: 'Sagen/Legenden', attributes: ['KL', 'IN', 'CH'], category: 'Wissen' },
    { name: 'Geschichtswissen', attributes: ['KL', 'KL', 'IN'], category: 'Wissen' },
    { name: 'Kriegskunst', attributes: ['MU', 'KL', 'IN'], category: 'Wissen' },
    
    // Craft Talents
    { name: 'Alchimie', attributes: ['MU', 'KL', 'FF'], category: 'Handwerk' },
    { name: 'Heilkunde Gift', attributes: ['MU', 'KL', 'IN'], category: 'Handwerk' },
    { name: 'Heilkunde Krankheiten', attributes: ['MU', 'KL', 'CH'], category: 'Handwerk' },
    { name: 'Heilkunde Wunden', attributes: ['KL', 'FF', 'FF'], category: 'Handwerk' },
    { name: 'Schlösserknacken', attributes: ['IN', 'FF', 'FF'], category: 'Handwerk' },
    { name: 'Wildnisleben', attributes: ['MU', 'GE', 'KO'], category: 'Handwerk' },
  ]

  const rollDice = (): number => Math.floor(Math.random() * 20) + 1

  const performTalentRoll = () => {
    if (!selectedTalent) {
      toast.error('Bitte wählen Sie ein Talent aus')
      return
    }

    const dice1 = rollDice()
    const dice2 = rollDice()
    const dice3 = rollDice()
    const totalRolled = dice1 + dice2 + dice3

    // Calculate points needed
    const effectiveAttributes = [attribute1 + modifier, attribute2 + modifier, attribute3 + modifier]
    let pointsNeeded = 0
    
    if (dice1 > effectiveAttributes[0]) pointsNeeded += dice1 - effectiveAttributes[0]
    if (dice2 > effectiveAttributes[1]) pointsNeeded += dice2 - effectiveAttributes[1]
    if (dice3 > effectiveAttributes[2]) pointsNeeded += dice3 - effectiveAttributes[2]

    const pointsUsed = Math.min(pointsNeeded, talentValue)
    const remainingTalentPoints = talentValue - pointsUsed
    const success = pointsNeeded <= talentValue

    // Calculate quality level for successful rolls
    let qualityLevel = 0
    if (success) {
      qualityLevel = Math.floor(remainingTalentPoints / 3) + 1
    }

    const rollResult: TalentRollResult = {
      dice1,
      dice2,
      dice3,
      totalRolled,
      pointsUsed,
      remainingTalentPoints,
      success,
      qualityLevel,
      rolled: true
    }

    setResult(rollResult)
    setRollHistory(prev => [rollResult, ...prev.slice(0, 9)]) // Keep last 10 rolls
    
    if (success) {
      toast.success(`Probe gelungen! Qualitätsstufe ${qualityLevel}`)
    } else {
      toast.error('Probe misslungen!')
    }
  }

  const resetRoll = () => {
    setResult(null)
  }

  const clearHistory = () => {
    setRollHistory([])
    toast.success('Würfelhistorie geleert')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zum Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Talentproben</h1>
            <p className="text-slate-400">Würfeln Sie Talentproben nach DSA 4.1 Regeln</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Settings */}
          <div className="lg:col-span-1 space-y-6">
            {/* Talent Selection */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Talent wählen</CardTitle>
                <CardDescription>Wählen Sie das Talent für die Probe</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Talent</Label>
                  <Select onValueChange={(value) => {
                    const talent = talents.find(t => t.name === value)
                    setSelectedTalent(talent || null)
                  }}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Talent auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(
                        talents.reduce((acc, talent) => {
                          if (!acc[talent.category]) acc[talent.category] = []
                          acc[talent.category].push(talent)
                          return acc
                        }, {} as Record<string, Talent[]>)
                      ).map(([category, categoryTalents]) => (
                        <div key={category}>
                          <div className="px-2 py-1 text-xs font-semibold text-slate-500 uppercase">
                            {category}
                          </div>
                          {categoryTalents.map((talent) => (
                            <SelectItem key={talent.name} value={talent.name}>
                              {talent.name} ({talent.attributes.join('/')})
                            </SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedTalent && (
                  <div className="p-3 bg-slate-700 rounded-lg">
                    <div className="text-white font-medium">{selectedTalent.name}</div>
                    <div className="text-sm text-slate-400">
                      Attribute: {selectedTalent.attributes.join(' / ')}
                    </div>
                    <Badge variant="outline" className="mt-2">
                      {selectedTalent.category}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Values */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Werte eingeben</CardTitle>
                <CardDescription>Geben Sie die Werte für die Probe ein</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Talentwert (TaW)</Label>
                  <Input
                    type="number"
                    value={talentValue}
                    onChange={(e) => setTalentValue(parseInt(e.target.value) || 0)}
                    className="bg-slate-700 border-slate-600 text-white"
                    min="0"
                    max="20"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Modifikator</Label>
                  <Input
                    type="number"
                    value={modifier}
                    onChange={(e) => setModifier(parseInt(e.target.value) || 0)}
                    className="bg-slate-700 border-slate-600 text-white"
                    min="-10"
                    max="10"
                  />
                </div>

                {selectedTalent && (
                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-2">
                      <Label className="text-white text-xs">{selectedTalent.attributes[0]}</Label>
                      <Input
                        type="number"
                        value={attribute1}
                        onChange={(e) => setAttribute1(parseInt(e.target.value) || 0)}
                        className="bg-slate-700 border-slate-600 text-white"
                        min="1"
                        max="20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white text-xs">{selectedTalent.attributes[1]}</Label>
                      <Input
                        type="number"
                        value={attribute2}
                        onChange={(e) => setAttribute2(parseInt(e.target.value) || 0)}
                        className="bg-slate-700 border-slate-600 text-white"
                        min="1"
                        max="20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white text-xs">{selectedTalent.attributes[2]}</Label>
                      <Input
                        type="number"
                        value={attribute3}
                        onChange={(e) => setAttribute3(parseInt(e.target.value) || 0)}
                        className="bg-slate-700 border-slate-600 text-white"
                        min="1"
                        max="20"
                      />
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button onClick={performTalentRoll} className="flex-1" disabled={!selectedTalent}>
                    <Dice6 className="h-4 w-4 mr-2" />
                    Würfeln
                  </Button>
                  {result && (
                    <Button onClick={resetRoll} variant="outline" size="icon">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Result */}
          <div className="lg:col-span-1">
            {result ? (
              <Card className={`border-2 ${result.success ? 'border-green-500 bg-green-950/20' : 'border-red-500 bg-red-950/20'}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-white">Probenergebnis</CardTitle>
                      {result.success ? (
                        <Trophy className="h-5 w-5 text-green-400" />
                      ) : (
                        <X className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                    <Badge variant={result.success ? "default" : "destructive"}>
                      {result.success ? 'Gelungen' : 'Misslungen'}
                    </Badge>
                  </div>
                  {selectedTalent && (
                    <CardDescription className="text-slate-400">
                      {selectedTalent.name} - {selectedTalent.attributes.join('/')}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Dice Results */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="p-4 bg-slate-700 rounded-lg border-2 border-slate-600">
                        <div className="text-2xl font-bold text-white">{result.dice1}</div>
                        <div className="text-xs text-slate-400">W20</div>
                      </div>
                      <div className="mt-2 text-xs text-slate-400">
                        vs {attribute1 + modifier}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="p-4 bg-slate-700 rounded-lg border-2 border-slate-600">
                        <div className="text-2xl font-bold text-white">{result.dice2}</div>
                        <div className="text-xs text-slate-400">W20</div>
                      </div>
                      <div className="mt-2 text-xs text-slate-400">
                        vs {attribute2 + modifier}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="p-4 bg-slate-700 rounded-lg border-2 border-slate-600">
                        <div className="text-2xl font-bold text-white">{result.dice3}</div>
                        <div className="text-xs text-slate-400">W20</div>
                      </div>
                      <div className="mt-2 text-xs text-slate-400">
                        vs {attribute3 + modifier}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Results Summary */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Gesamtwurf:</span>
                      <span className="text-white font-bold">{result.totalRolled}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">TaW verwendet:</span>
                      <span className="text-white font-bold">{result.pointsUsed}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">TaW* übrig:</span>
                      <span className="text-white font-bold">{result.remainingTalentPoints}</span>
                    </div>
                    {result.success && (
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Qualitätsstufe:</span>
                        <Badge variant="default" className="bg-green-600">
                          QS {result.qualityLevel}
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-slate-800/50 border-slate-700 border-dashed">
                <CardContent className="flex flex-col items-center justify-center h-64 text-center">
                  <Dice6 className="h-12 w-12 text-slate-600 mb-4" />
                  <p className="text-slate-400">Wählen Sie ein Talent und klicken Sie auf "Würfeln"</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - History */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Würfelhistorie</CardTitle>
                  {rollHistory.length > 0 && (
                    <Button onClick={clearHistory} variant="ghost" size="sm">
                      Löschen
                    </Button>
                  )}
                </div>
                <CardDescription>Letzte Würfelproben</CardDescription>
              </CardHeader>
              <CardContent>
                {rollHistory.length > 0 ? (
                  <div className="space-y-2">
                    {rollHistory.map((roll, index) => (
                      <div key={index} className="p-3 bg-slate-700/50 rounded-lg text-sm">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-slate-300">Wurf #{rollHistory.length - index}</span>
                          <Badge 
                            variant={roll.success ? "default" : "destructive"} 
                            className="text-xs"
                          >
                            {roll.success ? `QS${roll.qualityLevel}` : 'Fehlgeschlagen'}
                          </Badge>
                        </div>
                        <div className="text-slate-400 text-xs">
                          {roll.dice1}/{roll.dice2}/{roll.dice3} (TaW*: {roll.remainingTalentPoints})
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-slate-400 py-8">
                    Noch keine Würfe vorhanden
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}