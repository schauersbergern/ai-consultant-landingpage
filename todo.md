# AI Practitioner Landingpage - TODO

## Abgeschlossene Features

### Landing Page
- [x] Apple-Glasmorphismus Design mit frosted glass Effekten
- [x] Hero-Sektion mit Shiny Buttons und Animationen
- [x] Benefit-Sektion mit glasmorphism Icons
- [x] Module-Übersicht (12 Wochen Ausbildung)
- [x] Success Stories mit YouTube Video-Testimonials
- [x] Pricing-Sektion mit Rabatt-Anzeige
- [x] FAQ-Sektion (12 Fragen)
- [x] CTA-Sektionen
- [x] Premium Logo im Glasmorphismus-Stil
- [x] SEO-Optimierung (Meta-Tags, Schema.org, Canonical URL)

### Blog-System
- [x] Datenbankschema für Blog-Artikel (blog_articles Tabelle)
- [x] tRPC-Prozeduren für Blog-Management
  - [x] listPublished (öffentlich)
  - [x] getBySlug (öffentlich)
  - [x] listAll (admin-only)
  - [x] create (admin-only)
  - [x] update (admin-only)
  - [x] delete (admin-only)
- [x] Blog-Listenseite (/blog)
- [x] Blog-Detailseite (/blog/:slug)
- [x] Admin-Dashboard (/admin/blog)
- [x] Artikel-Editor (/admin/blog/new, /admin/blog/:id/edit)
- [x] Status-Management (draft, published, scheduled)
- [x] Geplante Veröffentlichung (scheduledFor)
- [x] SEO-Felder (seoTitle, seoDescription)
- [x] Kategorie und Tags-System
- [x] Vitest-Tests für Blog-Funktionen

## Nächste Schritte

### Navigation & Integration
- [ ] Blog-Link zur Hauptnavigation hinzufügen
- [ ] Admin-Link zur Navigation hinzufügen (nur für Admins sichtbar)
- [ ] Blog-Link im Footer hinzufügen

### Erweiterte Features
- [ ] Rich-Text-Editor (z.B. TipTap oder Quill)
- [ ] Bild-Upload-Funktionalität
- [ ] Kommentar-System
- [ ] Newsletter-Integration
- [ ] Social-Sharing-Buttons
- [ ] Artikel-Suche
- [ ] Verwandte Artikel
- [ ] Lesezeit-Anzeige
- [ ] Automatische Sitemap-Generierung

### Admin-Features
- [ ] Batch-Operationen (mehrere Artikel löschen)
- [ ] Artikel-Duplikation
- [ ] Artikel-Vorschau vor Veröffentlichung
- [ ] Revisions-History
- [ ] Artikel-Statistiken (Aufrufe, Engagement)
- [ ] Benutzer-Management für weitere Autoren

### Performance & SEO
- [ ] Artikel-Caching
- [ ] Pagination für Blog-Listenseite
- [ ] Open Graph Bilder für Social Sharing
- [ ] Structured Data für Artikel (Article Schema)
- [ ] Blog-Sitemap
- [ ] Canonical URLs für Artikel

### Testing
- [ ] E2E-Tests für Blog-Funktionalität
- [ ] Integration-Tests für Admin-Dashboard
- [ ] Performance-Tests

### Deployment
- [ ] Datenbank-Backups einrichten
- [ ] CDN für Blog-Bilder
- [ ] Email-Benachrichtigungen für neue Artikel
- [ ] Analytics für Blog-Traffic

## Notizen

- Das Blog-System ist vollständig funktionsfähig mit WordPress-ähnlicher Verwaltung
- Admin-Authentifizierung ist über das bestehende Manus OAuth-System integriert
- Alle Tests bestehen erfolgreich
- Das Design folgt dem Apple-Glasmorphismus-Stil der Landingpage
