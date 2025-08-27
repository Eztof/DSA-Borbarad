"use client"

import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  ArrowLeft,
  BookOpen, 
  Search,
  Sword, 
  Shield,
  Scroll,
  Zap,
  Heart,
  Star,
  Users,
  Dice6,
  Settings
} from 'lucide-react'
import Link from 'next/link'

export default function RulesPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const ruleCategories = [
    {
      id: 'all',
      title: 'Alle Regeln',
      icon: <BookOpen className="h-5 w-5" />,
      color: 'bg-slate-500',
    },
    {
      id: 'character',
      title: 'Charaktererschaffung',
      icon: <Users className="h-5 w-5" />,
      color: 'bg-blue-500',
    },
    {
      id: 'combat',
      title: 'Kampf',
      icon: <Sword className="h-5 w-5" />,
      color: 'bg-red-500',
    },
    {
      id: 'talents',
      title: 'Talente',
      icon: <Star className="h-5 w-5" />,
      color: 'bg-yellow-500',
    },
    {
      id: 'magic',
      title: 'Magie & Liturgien',
      icon: <Zap className="h-5 w-5" />,
      color: 'bg-purple-500',
    },
    {
      id: 'equipment',
      title: 'Ausrüstung',
      icon: <Shield className="h-5 w-5" />,
      color: 'bg-green-500',
    },
  ]

  const ruleEntries = [
    {
      category: 'character',
      title: 'Eigenschaften',
      description: 'Die acht Eigenschaften eines Helden: MU, KL, IN, CH, FF, GE, KO, KK',
      content: 'Jeder Held besitzt acht Eigenschaften: Mut (MU), Klugheit (KL), Intuition (IN), Charisma (CH), Fingerfertigkeit (FF), Gewandtheit (GE), Konstitution (KO) und Körperkraft (KK). Diese werden mit 3W6 ausgewürfelt.',
    },
    {
      category: 'character',
      title: 'Lebenspunkte',
      description: 'Berechnung und Verwendung der Lebenspunkte',
      content: 'Lebenspunkte = (KO + KO + KK) / 2. Sie zeigen an, wie viel Schaden ein Charakter verkraften kann.',
    },
    {
      category: 'character',
      title: 'Astralpunkte',
      description: 'Berechnung und Verwendung der Astralpunkte für Zauber',
      content: 'Astralpunkte = (MU + IN + CH) / 2. Nur magische Charaktere besitzen Astralpunkte zum Zaubern.',
    },
    {
      category: 'talents',
      title: 'Talentproben',
      description: 'Wie Talentproben funktionieren und bewertet werden',
      content: 'Eine Talentprobe wird mit 3W20 auf die drei zugehörigen Eigenschaften gewürfelt. Übrige Punkte werden vom Talentwert abgezogen.',
    },
    {
      category: 'talents',
      title: 'Qualitätsstufen',
      description: 'Bewertung des Erfolgs von Talentproben',
      content: 'QS 1: 0-3 übrig, QS 2: 4-6 übrig, QS 3: 7-9 übrig, QS 4: 10-12 übrig, QS 5: 13-15 übrig, QS 6: 16+ übrig',
    },
    {
      category: 'combat',
      title: 'Kampfablauf',
      description: 'Initiative, Aktionen und Kampfrunden',
      content: 'Initiative = 1W6 + INI-Wert. In jeder Kampfrunde kann ein Charakter eine Aktion und beliebig viele freie Aktionen durchführen.',
    },
    {
      category: 'combat',
      title: 'Attacke und Parade',
      description: 'Angriffs- und Verteidigungswerte im Kampf',
      content: 'Attacke = (MU + GE + KK) / 5 + AT-Wert der Waffe. Parade = (IN + GE + KK) / 5 + PA-Wert der Waffe.',
    },
    {
      category: 'magic',
      title: 'Zaubersprüche',
      description: 'Wie Zauber gewirkt werden',
      content: 'Zauberproben funktionieren wie Talentproben. Bei Erfolg werden die Astralpunktkosten vom aktuellen AP-Vorrat abgezogen.',
    },
    {
      category: 'equipment',
      title: 'Rüstungsschutz',
      description: 'Wie Rüstungen Schaden reduzieren',
      content: 'Der Rüstungsschutz wird vom Schaden abgezogen. Schwere Rüstungen behindern jedoch Talentproben.',
    },
    {
      category: 'equipment',
      title: 'Tragkraft',
      description: 'Wie viel ein Charakter tragen kann',
      content: 'Tragkraft = KK x 2 Stein. Überladung führt zu Abzügen auf körperliche Proben.',
    },
  ]

  const filteredRules = ruleEntries.filter(rule => {
    const matchesCategory = selectedCategory === 'all' || rule.category === selectedCategory
    const matchesSearch = searchTerm === '' || 
      rule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Zurück zum Dashboard
              </Link>
            </Button>
          </div>
          <div className="flex items-center space-x-3">
            <BookOpen className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-white">Regelwerk</h1>
              <p className="text-sm text-slate-400">DSA 4.1 Regeln & Referenzen</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">DSA 4.1 Regelwerk</h2>
          <p className="text-slate-400">
            Schnelle Referenz für die wichtigsten Regeln von Das Schwarze Auge 4.1
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Regeln durchsuchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-700 text-white"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {ruleCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id 
                    ? '' 
                    : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                {category.icon}
                <span className="ml-2">{category.title}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRules.map((rule, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white text-lg mb-1">
                      {rule.title}
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      {rule.description}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-xs capitalize">
                    {rule.category === 'character' && 'Charakter'}
                    {rule.category === 'combat' && 'Kampf'}
                    {rule.category === 'talents' && 'Talente'}
                    {rule.category === 'magic' && 'Magie'}
                    {rule.category === 'equipment' && 'Ausrüstung'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {rule.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRules.length === 0 && (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-12 text-center">
              <BookOpen className="h-16 w-16 text-slate-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Keine Regeln gefunden
              </h3>
              <p className="text-slate-400">
                Ihre Suche ergab keine Ergebnisse. Versuchen Sie andere Begriffe oder wählen Sie eine andere Kategorie.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Quick Reference */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6">Schnellreferenz</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4 text-center">
                <Dice6 className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="font-semibold text-white">Talentprobe</p>
                <p className="text-sm text-slate-400">3W20</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4 text-center">
                <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <p className="font-semibold text-white">Lebenspunkte</p>
                <p className="text-sm text-slate-400">(KO+KO+KK)/2</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4 text-center">
                <Zap className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <p className="font-semibold text-white">Astralpunkte</p>
                <p className="text-sm text-slate-400">(MU+IN+CH)/2</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4 text-center">
                <Sword className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="font-semibold text-white">Initiative</p>
                <p className="text-sm text-slate-400">1W6 + INI</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}