"use client"

import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft,
  UserPlus, 
  Users, 
  Sword, 
  Shield,
  Heart,
  Zap,
  Star,
  Edit,
  Trash2,
  Eye
} from 'lucide-react'
import Link from 'next/link'

export default function HeroesPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [heroes, setHeroes] = useState<any[]>([])

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    // Load heroes from localStorage for now (will be replaced with database later)
    const savedHeroes = localStorage.getItem('dsa_heroes')
    if (savedHeroes) {
      setHeroes(JSON.parse(savedHeroes))
    }
  }, [])

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
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-white">Heldenverwaltung</h1>
              <p className="text-sm text-slate-400">Verwalten Sie Ihre Helden</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Ihre Helden</h2>
            <p className="text-slate-400">
              Verwalten Sie Ihre Heldengruppe und deren Entwicklung
            </p>
          </div>
          <Button asChild>
            <Link href="/heroes/create">
              <UserPlus className="h-4 w-4 mr-2" />
              Neuen Helden erstellen
            </Link>
          </Button>
        </div>

        {/* Heroes List */}
        {heroes.length === 0 ? (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-12 text-center">
              <Users className="h-16 w-16 text-slate-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Keine Helden erstellt
              </h3>
              <p className="text-slate-400 mb-6">
                Sie haben noch keine Helden erstellt. Beginnen Sie Ihr Abenteuer, indem Sie Ihren ersten Helden erstellen.
              </p>
              <Button asChild>
                <Link href="/heroes/create">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Ersten Helden erstellen
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {heroes.map((hero, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white text-lg mb-1">
                        {hero.name || `Held ${index + 1}`}
                      </CardTitle>
                      <CardDescription className="text-slate-400">
                        {hero.race} {hero.culture && `• ${hero.culture}`}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {hero.profession || 'Profession'}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Attributes */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Sword className="h-4 w-4 text-red-400" />
                      <span className="text-slate-400">MU:</span>
                      <span className="text-white font-medium">{hero.attributes?.courage || 8}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-blue-400" />
                      <span className="text-slate-400">KL:</span>
                      <span className="text-white font-medium">{hero.attributes?.wisdom || 8}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-green-400" />
                      <span className="text-slate-400">LP:</span>
                      <span className="text-white font-medium">{hero.lifePoints || 30}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-purple-400" />
                      <span className="text-slate-400">AP:</span>
                      <span className="text-white font-medium">{hero.astralPoints || 0}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      Ansehen
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-1" />
                      Bearbeiten
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-400 hover:text-red-300">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Quick Stats */}
        {heroes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{heroes.length}</p>
                <p className="text-sm text-slate-400">Aktive Helden</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4 text-center">
                <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">0</p>
                <p className="text-sm text-slate-400">Erfahrungspunkte</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4 text-center">
                <Sword className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">0</p>
                <p className="text-sm text-slate-400">Kämpfe</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4 text-center">
                <Shield className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">0</p>
                <p className="text-sm text-slate-400">Abenteuer</p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}