"use client"

import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft,
  Scroll,
  Users,
  Sword,
  MapPin,
  Zap,
  BookOpen,
  Dice6,
  Crown,
  Shield,
  Eye,
  Settings,
  Plus
} from 'lucide-react'
import Link from 'next/link'

export default function MasterToolsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('overview')

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

  const masterTools = [
    {
      id: 'npcs',
      title: 'NPC-Verwaltung',
      description: 'Verwalten Sie Nichtspielercharaktere',
      icon: <Users className="h-6 w-6" />,
      color: 'bg-blue-500',
      features: ['NPC-Erstellung', 'Beziehungen', 'Notizen', 'Statistiken'],
    },
    {
      id: 'encounters',
      title: 'Begegnungen',
      description: 'Planen Sie Kämpfe und Begegnungen',
      icon: <Sword className="h-6 w-6" />,
      color: 'bg-red-500',
      features: ['Kampf-Initiative', 'Gegner-Verwaltung', 'Beute-Generator', 'Balancing'],
    },
    {
      id: 'locations',
      title: 'Schauplätze',
      description: 'Verwalten Sie Orte und Karten',
      icon: <MapPin className="h-6 w-6" />,
      color: 'bg-green-500',
      features: ['Ortsbeschreibungen', 'Karten', 'Geheimnisse', 'Bewohner'],
    },
    {
      id: 'spells',
      title: 'Zauber & Liturgien',
      description: 'Magie-Referenz und -verwaltung',
      icon: <Zap className="h-6 w-6" />,
      color: 'bg-purple-500',
      features: ['Zaubersprüche', 'Liturgien', 'Effekte', 'Modifikationen'],
    },
    {
      id: 'adventures',
      title: 'Abenteuer-Planer',
      description: 'Strukturieren Sie Ihre Abenteuer',
      icon: <BookOpen className="h-6 w-6" />,
      color: 'bg-indigo-500',
      features: ['Plot-Struktur', 'Szenen', 'Belohnungen', 'Notizen'],
    },
    {
      id: 'random',
      title: 'Zufallsgeneratoren',
      description: 'Nützliche Generatoren für Spielleiter',
      icon: <Dice6 className="h-6 w-6" />,
      color: 'bg-orange-500',
      features: ['Namen', 'Wetter', 'Ereignisse', 'Schätze'],
    },
  ]

  const quickActions = [
    {
      title: 'Initiative würfeln',
      description: 'Schneller Initiatives-Wurf für Kämpfe',
      icon: <Dice6 className="h-5 w-5" />,
      action: () => alert('Initiative-Würfel wird implementiert...'),
    },
    {
      title: 'Zufälliger Name',
      description: 'Generiere einen aventurischen Namen',
      icon: <Users className="h-5 w-5" />,
      action: () => {
        const names = ['Alrik Sturmfaust', 'Boron Eisenbart', 'Ceres Morgenröte', 'Darian Falkenauge', 'Elara Mondschein', 'Firun Steinbrecher']
        alert(`Zufälliger Name: ${names[Math.floor(Math.random() * names.length)]}`)
      },
    },
    {
      title: 'Schnelle Notiz',
      description: 'Füge eine Sitzungsnotiz hinzu',
      icon: <BookOpen className="h-5 w-5" />,
      action: () => alert('Notiz-Editor wird implementiert...'),
    },
    {
      title: 'Wetter generieren',
      description: 'Zufälliges Wetter für Aventurien',
      icon: <Eye className="h-5 w-5" />,
      action: () => {
        const weather = ['Sonnig und warm', 'Bewölkt und kühl', 'Leichter Regen', 'Starker Regen', 'Neblig und feucht', 'Windig und klar']
        alert(`Aktuelles Wetter: ${weather[Math.floor(Math.random() * weather.length)]}`)
      },
    },
  ]

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
            <Crown className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-white">Meistertool</h1>
              <p className="text-sm text-slate-400">Werkzeuge für den Spielmeister</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Spielmeister-Werkzeuge</h2>
          <p className="text-slate-400">
            Alles was Sie für das Leiten eines DSA-Abenteuers brauchen
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Schnellaktionen</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 bg-slate-800/50 border-slate-700 hover:bg-slate-700/50"
                onClick={action.action}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  {action.icon}
                  <div>
                    <p className="font-medium text-white text-sm">{action.title}</p>
                    <p className="text-xs text-slate-400">{action.description}</p>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Master Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {masterTools.map((tool) => (
            <Card key={tool.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className={`p-2 rounded-lg ${tool.color}`}>
                    {tool.icon}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Geplant
                  </Badge>
                </div>
                <CardTitle className="text-white text-lg">
                  {tool.title}
                </CardTitle>
                <CardDescription className="text-slate-400">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-slate-300 mb-2">Features:</p>
                    <ul className="space-y-1">
                      {tool.features.map((feature, index) => (
                        <li key={index} className="text-sm text-slate-400 flex items-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button variant="outline" className="w-full" disabled>
                    <Plus className="h-4 w-4 mr-2" />
                    In Entwicklung
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Campaign Management */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6">Kampagnen-Management</h3>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Shield className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                  <h4 className="font-semibold text-white mb-2">Aktive Kampagne</h4>
                  <p className="text-slate-400 text-sm">Noch keine Kampagne erstellt</p>
                  <Button variant="outline" size="sm" className="mt-3">
                    <Plus className="h-4 w-4 mr-2" />
                    Kampagne erstellen
                  </Button>
                </div>
                <div className="text-center">
                  <Users className="h-12 w-12 text-green-500 mx-auto mb-3" />
                  <h4 className="font-semibold text-white mb-2">Spielergruppe</h4>
                  <p className="text-slate-400 text-sm">0 Spieler registriert</p>
                  <Button variant="outline" size="sm" className="mt-3">
                    <Plus className="h-4 w-4 mr-2" />
                    Spieler hinzufügen
                  </Button>
                </div>
                <div className="text-center">
                  <BookOpen className="h-12 w-12 text-purple-500 mx-auto mb-3" />
                  <h4 className="font-semibold text-white mb-2">Sitzungen</h4>
                  <p className="text-slate-400 text-sm">0 Sitzungen gespielt</p>
                  <Button variant="outline" size="sm" className="mt-3">
                    <Plus className="h-4 w-4 mr-2" />
                    Sitzung protokollieren
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tips for Game Masters */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6">Spielleiter-Tipps</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Improvisationstipps</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Haben Sie immer ein paar NPC-Namen parat</li>
                  <li>• Verwenden Sie die 5W-Fragen: Wer, Was, Wann, Wo, Warum</li>
                  <li>• Bauen Sie auf den Ideen der Spieler auf</li>
                  <li>• Notieren Sie sich interessante Momente</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Kampf-Management</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Initiative vorher auswürfeln</li>
                  <li>• Gegner-Lebenspunkte notieren</li>
                  <li>• Umgebung in Kämpfe einbeziehen</li>
                  <li>• Nicht jeden Wurf ausspielen</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}