"use client"

import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  UserPlus, 
  Users, 
  Sword, 
  Dice6, 
  BookOpen, 
  Settings,
  LogOut,
  Shield,
  Scroll,
  Package
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

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

  const handleSignOut = async () => {
    await signOut()
    router.push('/auth/login')
  }

  const dashboardItems = [
    {
      title: 'Held erstellen',
      description: 'Erstellen Sie einen neuen Helden nach DSA 4.1 Regeln',
      icon: <UserPlus className="h-6 w-6" />,
      href: '/heroes/create',
      color: 'bg-green-500',
    },
    {
      title: 'Heldenverwaltung',
      description: 'Verwalten und bearbeiten Sie Ihre Helden',
      icon: <Users className="h-6 w-6" />,
      href: '/heroes',
      color: 'bg-blue-500',
    },
    {
      title: 'Inventar',
      description: 'Verwalten Sie Ausrüstung und Gegenstände',
      icon: <Package className="h-6 w-6" />,
      href: '/inventory',
      color: 'bg-orange-500',
    },
    {
      title: 'Talentproben',
      description: 'Würfeln Sie Talentproben für Ihre Helden',
      icon: <Dice6 className="h-6 w-6" />,
      href: '/dice',
      color: 'bg-purple-500',
    },
    {
      title: 'Regelwerk',
      description: 'DSA 4.1 Regeln und Referenzen',
      icon: <BookOpen className="h-6 w-6" />,
      href: '/rules',
      color: 'bg-indigo-500',
    },
    {
      title: 'Meistertool',
      description: 'Werkzeuge für den Spielmeister',
      icon: <Scroll className="h-6 w-6" />,
      href: '/master',
      color: 'bg-red-500',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-white">DSA Heldenverwaltung</h1>
              <p className="text-sm text-slate-400">Das Schwarze Auge 4.1</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-slate-300">
              {user.email}
            </Badge>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Abmelden
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Willkommen, Abenteurer!
          </h2>
          <p className="text-slate-400">
            Verwalten Sie Ihre Helden, planen Sie Abenteuer und meistern Sie die Welt von Aventurien.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Aktive Helden</p>
                  <p className="text-3xl font-bold text-white">0</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Abgeschlossene Abenteuer</p>
                  <p className="text-3xl font-bold text-white">0</p>
                </div>
                <Sword className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Erfahrungspunkte</p>
                  <p className="text-3xl font-bold text-white">0</p>
                </div>
                <BookOpen className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Function Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${item.color} group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                    <div>
                      <CardTitle className="text-white group-hover:text-primary transition-colors">
                        {item.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-400">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}