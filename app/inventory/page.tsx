"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Package, Plus, Edit, Trash2, Sword, Shield, Hammer } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface InventoryItem {
  id: string
  name: string
  description: string
  quantity: number
  weight: number
  value: number
  category: string
  damage?: string
  protection?: number
  encumbrance?: number
}

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: '1',
      name: 'Schwert',
      description: 'Ein scharfes Langschwert aus Stahl',
      quantity: 1,
      weight: 3.5,
      value: 200,
      category: 'Waffe',
      damage: '1W6+4'
    },
    {
      id: '2',
      name: 'Lederrüstung',
      description: 'Eine einfache Lederrüstung',
      quantity: 1,
      weight: 8,
      value: 50,
      category: 'Rüstung',
      protection: 2,
      encumbrance: 1
    },
    {
      id: '3',
      name: 'Heiltrank',
      description: 'Ein kleiner Heiltrank',
      quantity: 3,
      weight: 0.1,
      value: 25,
      category: 'Trank'
    }
  ])

  const [selectedCategory, setSelectedCategory] = useState('Alle')
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)

  // Form state for adding/editing items
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: 1,
    weight: 0,
    value: 0,
    category: '',
    damage: '',
    protection: '',
    encumbrance: ''
  })

  const categories = ['Alle', 'Waffe', 'Rüstung', 'Werkzeug', 'Trank', 'Material', 'Sonstiges']

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'Alle' || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const totalWeight = items.reduce((sum, item) => sum + (item.weight * item.quantity), 0)
  const totalValue = items.reduce((sum, item) => sum + (item.value * item.quantity), 0)

  const handleAddItem = () => {
    if (!formData.name.trim()) {
      toast.error('Bitte geben Sie einen Namen ein')
      return
    }

    const newItem: InventoryItem = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      quantity: formData.quantity,
      weight: formData.weight,
      value: formData.value,
      category: formData.category || 'Sonstiges',
      ...(formData.damage && { damage: formData.damage }),
      ...(formData.protection && { protection: parseInt(formData.protection) }),
      ...(formData.encumbrance && { encumbrance: parseInt(formData.encumbrance) })
    }

    setItems(prev => [...prev, newItem])
    resetForm()
    setIsAddDialogOpen(false)
    toast.success('Gegenstand hinzugefügt')
  }

  const handleEditItem = () => {
    if (!editingItem || !formData.name.trim()) {
      toast.error('Bitte geben Sie einen Namen ein')
      return
    }

    const updatedItem: InventoryItem = {
      ...editingItem,
      name: formData.name,
      description: formData.description,
      quantity: formData.quantity,
      weight: formData.weight,
      value: formData.value,
      category: formData.category || 'Sonstiges',
      damage: formData.damage || undefined,
      protection: formData.protection ? parseInt(formData.protection) : undefined,
      encumbrance: formData.encumbrance ? parseInt(formData.encumbrance) : undefined
    }

    setItems(prev => prev.map(item => item.id === editingItem.id ? updatedItem : item))
    resetForm()
    setEditingItem(null)
    toast.success('Gegenstand aktualisiert')
  }

  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
    toast.success('Gegenstand entfernt')
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      quantity: 1,
      weight: 0,
      value: 0,
      category: '',
      damage: '',
      protection: '',
      encumbrance: ''
    })
  }

  const startEdit = (item: InventoryItem) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      description: item.description,
      quantity: item.quantity,
      weight: item.weight,
      value: item.value,
      category: item.category,
      damage: item.damage || '',
      protection: item.protection?.toString() || '',
      encumbrance: item.encumbrance?.toString() || ''
    })
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Waffe': return <Sword className="h-4 w-4" />
      case 'Rüstung': return <Shield className="h-4 w-4" />
      case 'Werkzeug': return <Hammer className="h-4 w-4" />
      default: return <Package className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Waffe': return 'bg-red-500'
      case 'Rüstung': return 'bg-blue-500'
      case 'Werkzeug': return 'bg-orange-500'
      case 'Trank': return 'bg-green-500'
      case 'Material': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Zurück zum Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Inventarverwaltung</h1>
              <p className="text-slate-400">Verwalten Sie Ihre Ausrüstung und Gegenstände</p>
            </div>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Gegenstand hinzufügen
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
              <DialogHeader>
                <DialogTitle>Neuen Gegenstand hinzufügen</DialogTitle>
                <DialogDescription>
                  Fügen Sie einen neuen Gegenstand zu Ihrem Inventar hinzu
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-slate-700 border-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategorie</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue placeholder="Kategorie wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.filter(c => c !== 'Alle').map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Beschreibung</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="bg-slate-700 border-slate-600"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Anzahl</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                      className="bg-slate-700 border-slate-600"
                      min="1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Gewicht</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      value={formData.weight}
                      onChange={(e) => setFormData(prev => ({ ...prev, weight: parseFloat(e.target.value) || 0 }))}
                      className="bg-slate-700 border-slate-600"
                      min="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="value">Wert (S)</Label>
                    <Input
                      id="value"
                      type="number"
                      value={formData.value}
                      onChange={(e) => setFormData(prev => ({ ...prev, value: parseInt(e.target.value) || 0 }))}
                      className="bg-slate-700 border-slate-600"
                      min="0"
                    />
                  </div>
                </div>

                {/* Weapon/Armor specific fields */}
                {(formData.category === 'Waffe' || formData.category === 'Rüstung') && (
                  <div className="grid grid-cols-3 gap-4">
                    {formData.category === 'Waffe' && (
                      <div className="space-y-2">
                        <Label htmlFor="damage">Schaden</Label>
                        <Input
                          id="damage"
                          value={formData.damage}
                          onChange={(e) => setFormData(prev => ({ ...prev, damage: e.target.value }))}
                          className="bg-slate-700 border-slate-600"
                          placeholder="1W6+2"
                        />
                      </div>
                    )}
                    {formData.category === 'Rüstung' && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="protection">Schutz</Label>
                          <Input
                            id="protection"
                            type="number"
                            value={formData.protection}
                            onChange={(e) => setFormData(prev => ({ ...prev, protection: e.target.value }))}
                            className="bg-slate-700 border-slate-600"
                            min="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="encumbrance">Behinderung</Label>
                          <Input
                            id="encumbrance"
                            type="number"
                            value={formData.encumbrance}
                            onChange={(e) => setFormData(prev => ({ ...prev, encumbrance: e.target.value }))}
                            className="bg-slate-700 border-slate-600"
                            min="0"
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Abbrechen
                </Button>
                <Button onClick={handleAddItem}>
                  Hinzufügen
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Gegenstände gesamt</p>
                  <p className="text-2xl font-bold text-white">{items.length}</p>
                </div>
                <Package className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Gesamtgewicht</p>
                  <p className="text-2xl font-bold text-white">{totalWeight.toFixed(1)} Unze</p>
                </div>
                <Package className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Gesamtwert</p>
                  <p className="text-2xl font-bold text-white">{totalValue} Silber</p>
                </div>
                <Package className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-slate-800/50 border-slate-700 mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search" className="text-white mb-2 block">Suchen</Label>
                <Input
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nach Gegenständen suchen..."
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div className="md:w-48">
                <Label htmlFor="category-filter" className="text-white mb-2 block">Kategorie</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`p-1 rounded ${getCategoryColor(item.category)}`}>
                      {getCategoryIcon(item.category)}
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{item.name}</CardTitle>
                      <Badge variant="outline" className="text-xs mt-1">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => startEdit(item)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-slate-400 text-sm mb-3">{item.description}</p>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-slate-400">Anzahl:</span>
                    <span className="text-white ml-2">{item.quantity}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Gewicht:</span>
                    <span className="text-white ml-2">{item.weight} Unze</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Wert:</span>
                    <span className="text-white ml-2">{item.value} S</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Gesamt:</span>
                    <span className="text-white ml-2">{item.value * item.quantity} S</span>
                  </div>
                </div>

                {/* Weapon/Armor specific info */}
                {(item.damage || item.protection !== undefined) && (
                  <div className="mt-3 pt-3 border-t border-slate-600">
                    {item.damage && (
                      <div className="text-sm">
                        <span className="text-slate-400">Schaden:</span>
                        <span className="text-white ml-2">{item.damage}</span>
                      </div>
                    )}
                    {item.protection !== undefined && (
                      <div className="text-sm">
                        <span className="text-slate-400">Schutz:</span>
                        <span className="text-white ml-2">{item.protection}</span>
                      </div>
                    )}
                    {item.encumbrance !== undefined && (
                      <div className="text-sm">
                        <span className="text-slate-400">Behinderung:</span>
                        <span className="text-white ml-2">{item.encumbrance}</span>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <Card className="bg-slate-800/50 border-slate-700 border-dashed">
            <CardContent className="flex flex-col items-center justify-center h-32 text-center">
              <Package className="h-8 w-8 text-slate-600 mb-2" />
              <p className="text-slate-400">
                {searchTerm || selectedCategory !== 'Alle' 
                  ? 'Keine Gegenstände gefunden'
                  : 'Noch keine Gegenstände im Inventar'
                }
              </p>
            </CardContent>
          </Card>
        )}

        {/* Edit Dialog */}
        <Dialog open={!!editingItem} onOpenChange={(open) => !open && setEditingItem(null)}>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
            <DialogHeader>
              <DialogTitle>Gegenstand bearbeiten</DialogTitle>
              <DialogDescription>
                Ändern Sie die Eigenschaften des Gegenstands
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Name *</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Kategorie</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(c => c !== 'Alle').map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Beschreibung</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-slate-700 border-slate-600"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-quantity">Anzahl</Label>
                  <Input
                    id="edit-quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                    className="bg-slate-700 border-slate-600"
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-weight">Gewicht</Label>
                  <Input
                    id="edit-weight"
                    type="number"
                    step="0.1"
                    value={formData.weight}
                    onChange={(e) => setFormData(prev => ({ ...prev, weight: parseFloat(e.target.value) || 0 }))}
                    className="bg-slate-700 border-slate-600"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-value">Wert (S)</Label>
                  <Input
                    id="edit-value"
                    type="number"
                    value={formData.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, value: parseInt(e.target.value) || 0 }))}
                    className="bg-slate-700 border-slate-600"
                    min="0"
                  />
                </div>
              </div>

              {/* Weapon/Armor specific fields */}
              {(formData.category === 'Waffe' || formData.category === 'Rüstung') && (
                <div className="grid grid-cols-3 gap-4">
                  {formData.category === 'Waffe' && (
                    <div className="space-y-2">
                      <Label htmlFor="edit-damage">Schaden</Label>
                      <Input
                        id="edit-damage"
                        value={formData.damage}
                        onChange={(e) => setFormData(prev => ({ ...prev, damage: e.target.value }))}
                        className="bg-slate-700 border-slate-600"
                        placeholder="1W6+2"
                      />
                    </div>
                  )}
                  {formData.category === 'Rüstung' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="edit-protection">Schutz</Label>
                        <Input
                          id="edit-protection"
                          type="number"
                          value={formData.protection}
                          onChange={(e) => setFormData(prev => ({ ...prev, protection: e.target.value }))}
                          className="bg-slate-700 border-slate-600"
                          min="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-encumbrance">Behinderung</Label>
                        <Input
                          id="edit-encumbrance"
                          type="number"
                          value={formData.encumbrance}
                          onChange={(e) => setFormData(prev => ({ ...prev, encumbrance: e.target.value }))}
                          className="bg-slate-700 border-slate-600"
                          min="0"
                        />
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingItem(null)}>
                Abbrechen
              </Button>
              <Button onClick={handleEditItem}>
                Speichern
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}