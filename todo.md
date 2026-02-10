# AI Practitioner Landingpage - TODO

## Abgeschlossene Features

### Landing Page
- [x] Apple-Glasmorphismus Design mit frosted glass Effekten
- [x] Hero-Sektion mit Shiny Buttons und Animationen
- [x] Benefit-Sektion mit glasmorphism Icons
- [x] Module-Übersicht (12 Wochen Ausbildung)
- [x] Success Stories mit YouTube Video-Testimonials
- [x] Pricing-Sektion mit Rabatt-Anzeige
- [x] Preis aktualisiert: 6.500€ (Rabatt entfernt, Ratenzahlung 6x 1.083€/Monat)
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

## Neue Anforderungen

- [x] Blog-Link in Hauptnavigation integrieren
- [x] Blog-Link im Footer hinzufügen
- [x] Bulk-Import-Funktion für Blog-Artikel (JSON/CSV Upload)
- [x] Admin-Navigation verbessern (Admin-Link für eingeloggte Admins)
- [x] 12 SEO-Blogartikel aus DOCX-Dateien extrahieren und veröffentlichen
- [x] Meta-Titel und Meta-Beschreibung gemäß Anweisungen in jedem Artikel setzen
- [x] Umlaute in allen Artikeln korrigiert
- [x] Markdown-Rendering für Blog-Artikel implementiert (react-markdown)
- [x] Titelbilder für alle 12 Blogartikel generieren
- [x] Titelbilder in Datenbank und Blog-Komponenten integrieren
- [x] Impressum-Seite erstellen
- [x] Datenschutz-Seite erstellen
- [x] JSON-LD Structured Data für Blog-Artikel implementieren
- [x] SEO-Titel der Startseite auf 30-60 Zeichen optimieren (50 Zeichen)
- [x] Facebook Pixel (ID: 1138180751401674) in die Webseite einbauen
- [x] ThriveCart-Checkout Pop-Up hinter alle CTA-Buttons legen (nicht Video ansehen)
- [x] Cookie-Consent-Banner für DSGVO-Konformität implementieren
- [x] Facebook Pixel mit Consent-Logik verknüpfen (nur nach Zustimmung laden)
- [x] Purchase-Event für Facebook Pixel nach erfolgreicher ThriveCart-Zahlung einrichten
- [x] Danke-Seite (/danke, /thank-you) mit Purchase-Event erstellt

## SEO-Audit Korrekturen

- [x] Homepage Meta Title keyword-optimieren
- [x] Homepage Meta Description setzen
- [x] Blog-Seite Meta Title und Description setzen
- [x] Open Graph Tags für Social Media setzen
- [x] hreflang="de" Tag setzen (lang="de" in html tag)
- [x] Canonical Tags setzen
- [x] H1 keyword-optimieren
- [x] H2-Struktur keyword-optimieren
- [x] Inhaltliche Korrekturen: Kursdauer 13 Wochen, 7 Module, Flowise-Zuordnung, Zeitaufwand
- [x] Bild-Alt-Tags keyword-optimieren
- [x] Schema.org Course-Schema implementieren
- [x] Schema.org FAQPage-Schema implementieren
- [x] Schema.org Organization-Schema implementieren
- [x] Sitemap.xml erstellen (dynamisch mit Blog-Artikeln)
- [x] robots.txt konfigurieren
- [x] FAQ auf 12 Fragen erweitert (SEO-optimiert)
- [x] Content-Keywords eingebaut (ki manager ihk, ki weiterbildung, ki kurs, etc.)
- [x] FAQPage-Schema mit allen 12 Fragen synchronisiert
- [x] Google Search Console Verifizierungsdatei eingebunden
- [x] Pricing-Bild korrigieren (neues Bild mit 6.500€ generiert und eingesetzt)
- [x] Pricing-Bereich visuell ansprechender gestalten (Gradient-Text, Benefits-Grid, größerer CTA)
- [x] Ratenzahlung entfernt ("Einmalige Zahlung – kein Abo")
- [x] SEO-Titel auf 53 Zeichen gekürzt ("KI-Weiterbildung mit IHK-Zertifikat | AI Practitioner")
- [x] Keywords auf 6 fokussierte reduziert
- [x] tRPC-Fehler beheben: Server gibt HTML statt JSON zurück (behoben - API funktioniert korrekt)

## SEO Audit v2 - Alle Maßnahmen

### Inhaltliche Fehler korrigieren (SOFORT)
- [x] Kursdauer von 12 auf 13 Wochen korrigieren
- [x] Module von 8 auf 7 korrigieren
- [x] Preis von 6.500€ auf 4.797€ zzgl. MwSt. korrigieren
- [x] Absolventen von 50+ auf 40+ (Pilotkohorte) korrigieren
- [x] Flowise-Zuordnung: Von Modul 5 (KI-Agenten) zu Modul 3 (RAG-Systeme) korrigieren
- [x] Wochenaufwand von 5-8 auf ~10 Stunden/Woche korrigieren

### Meta Tags optimieren
- [x] Meta Title ändern: "KI-Automatisierungsexperte (IHK) | Weiterbildung mit Zertifikat 2026"
- [x] Meta Description setzen mit CTA "Jetzt KI-Automatisierung lernen!"

### Heading-Struktur optimieren
- [x] H1 ändern: "KI-Automatisierungsexperte (IHK): Praxisnahe Weiterbildung mit Zertifikat"
- [x] H2 Module: "7 Praxis-Module: Von Chatbots bis KI-Agenten"
- [x] H2 Erfolge: "Erfahrungen: Was Absolventen der KI-Weiterbildung berichten"
- [x] H2 Pricing: "Kosten & Investition: KI-Ausbildung mit IHK-Zertifikat"
- [x] H2 FAQ: "Häufige Fragen zur KI-Weiterbildung"
- [x] H2 CTA: "Jetzt KI-Automatisierungsexperte werden"

### Bild-Alt-Tags optimieren
- [x] Logo Alt: "KI Automatisierungsexperte IHK Zertifikat Logo"
- [x] Hero Alt: "KI Automatisierung Weiterbildung Kursplattform mit IHK Zertifikat"
- [x] Icon Zeit Alt: "Zeitersparnis durch KI Automatisierung 10 Stunden pro Woche"
- [x] Icon Geld Alt: "Einnahmen als KI Automatisierungsexperte 3000 bis 10000 Euro pro Projekt"
- [x] Icon System Alt: "Professionelle KI Automatisierungssysteme mit Make und n8n"
- [x] Module Alt: "7 Module der KI Automatisierung Weiterbildung Übersicht"
- [x] Statistiken Alt: "Erfolgsstatistiken KI Kurs 120 Projekte 95 Prozent Zufriedenheit"
- [x] Pricing Alt: "KI Weiterbildung IHK Zertifikat Kosten und Preise"

### Content & Keywords
- [x] Landing Page Content auf 1.200+ Wörter erweitern (neuer SEO-Intro-Absatz)
- [x] Alle 12 Ziel-Keywords in den Content einbauen
- [x] Keyword "ki manager ihk" einbauen
- [x] Keyword "ki weiterbildung" einbauen
- [x] Keyword "ki automatisierung lernen" einbauen
- [x] Keyword "ki zertifikat ihk" einbauen
- [x] Keyword "ki kurs" einbauen
- [x] Keyword "prozesse automatisieren" einbauen
- [x] Keyword "chatbot erstellen" erweitern
- [x] Keyword "make automatisierung" erweitern
- [x] Keyword "ki fuer kmu" einbauen
- [x] Keyword "ki experte werden" als Phrase einbauen
- [x] Keyword "rag system" einbauen
- [x] Keyword "n8n tutorial" einbauen

### Fehlende Blog-Artikel für Keywords schreiben
- [x] Prüfen welche Keywords bereits durch Artikel abgedeckt sind
- [x] 3 neue Artikel geschrieben: ki-zertifikat-ihk, ki-kurs-online, n8n-tutorial-automatisierung
- [x] Interne Verlinkung zwischen Blog und Landingpage

### Technisches SEO
- [x] Schema.org JSON-LD aktualisieren (Course, FAQPage, Organization)
- [x] Open Graph Tags vollständig setzen
- [x] hreflang="de" und x-default korrekt setzen
- [x] Sitemap.xml mit allen 19 Seiten (inkl. 3 neue Artikel)
- [x] Canonical Tags prüfen und setzen
- [x] robots.txt mit Sitemap-Verweis erstellt
- [x] Schema.org Organization in index.html hinzugefügt
- [x] Preis in Schema.org auf 4797 aktualisiert
- [x] Blog-Limit auf 20 erhöht um alle Artikel anzuzeigen
