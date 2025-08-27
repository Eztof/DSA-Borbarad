# DSA Heldenverwaltung

Eine moderne Webanwendung zur Verwaltung von Helden, Gruppen und Spielmaterial für Das Schwarze Auge 4.1.

## Funktionen

### ✅ Implementierte Features

- **Benutzerauthentifizierung**
  - Registrierung und Anmeldung über Supabase
  - Sichere Sitzungsverwaltung
  - Benutzerfreundliche Login/Register-Seiten

- **Dashboard**
  - Übersichtliche Startseite mit Funktionsauswahl
  - Schnellübersicht über Helden und Statistiken
  - Intuitive Navigation zu allen Hauptfunktionen

- **Heldenerstellung**
  - DSA 4.1 konforme Regeln
  - Auswahl von Rasse, Kultur und Profession
  - Automatisches Auswürfeln der Eigenschaften (3W6)
  - Rassische Modifikatoren werden automatisch angewendet
  - Berechnung von Lebenspunkten, Astralpunkten und Karmapunkten

- **Talentproben (Würfelsystem)**
  - Vollständiges DSA 4.1 Talentprobensystem
  - Über 25 vordefinierte Talente mit korrekten Attributen
  - Qualitätsstufenberechnung
  - Würfelhistorie
  - Modifikatoren und variable Schwierigkeitsgrade

- **Inventarverwaltung**
  - Detaillierte Gegenstandsverwaltung
  - Kategorien: Waffen, Rüstungen, Werkzeuge, Tränke, etc.
  - Gewichts- und Wertberechnung
  - Spezielle Eigenschaften für Waffen und Rüstungen

### 🚧 Geplante Features

- **Datenbankverwaltung**
  - Helden in der Datenbank speichern
  - Synchronisation zwischen Clients
  - Backup und Wiederherstellung

- **Erweiterte Heldenverwaltung**
  - Bestehende Helden bearbeiten
  - Heldengruppen verwalten
  - Erfahrungspunkte-System

- **Meistertools**
  - NPCs verwalten
  - Begegnungen planen
  - Zauber- und Liturgieverwaltung

## Technische Details

### Tech Stack
- **Frontend:** Next.js 14 (App Router), React 18, TypeScript
- **UI:** Tailwind CSS, shadcn/ui
- **Backend:** Supabase (PostgreSQL)
- **ORM:** Prisma
- **Icons:** Lucide React

### Datenbankschema
Die Anwendung verwendet ein umfassendes DSA 4.1 Datenbankschema mit folgenden Haupttabellen:
- Races (Rassen)
- Cultures (Kulturen)
- Professions (Professionen)
- Talents, Spells, Liturgies
- Heroes mit allen Verknüpfungen
- Inventory Items

### Umgebungsvariablen
- `DATABASE_URL` - PostgreSQL Verbindungsstring
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase Projekt-URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase Anonymous Key

## Installation & Entwicklung

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Datenbankmigrationen ausführen
bunx prisma migrate dev

# Prisma Client generieren
bunx prisma generate

# Produktionsbuild erstellen
npm run build
```

## Projektstruktur

```
/app
  /auth/login        # Anmeldeseite
  /auth/register     # Registrierungsseite
  /dashboard         # Hauptdashboard
  /heroes/create     # Heldenerstellung
  /dice              # Talentproben
  /inventory         # Inventarverwaltung
/contexts
  /auth-context.tsx  # Authentifizierungskontext
/lib
  /supabase.ts       # Supabase Client
  /env-config.ts     # Umgebungsvariablen
/prisma
  /schema.prisma     # Datenbankschema
```

## Status

Das Projekt befindet sich in der aktiven Entwicklung. Die Grundfunktionen sind implementiert und funktionsfähig. Die Datenbankintegration ist vorbereitet und einsatzbereit.

**Letzte Aktualisierung:** 27. August 2025