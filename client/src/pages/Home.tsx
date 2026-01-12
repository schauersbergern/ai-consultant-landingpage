/**
 * AI-Consultant Landingpage
 * Design: Dark Tech Authority
 * - Tiefes Anthrazit mit Electric Cyan und Amber Akzenten
 * - Glasmorphism-Karten, Glow-Effekte
 * - Plus Jakarta Sans für Headlines, Inter für Body
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BarChart3,
  Bot,
  Brain,
  Briefcase,
  CheckCircle2,
  Clock,
  FileText,
  MessageSquare,
  Shield,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-primary" />
            <span className="font-display font-bold text-lg">AI-Consultant</span>
          </div>
          <Button className="glow-cyan">
            Jetzt starten
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </nav>

      {/* Hero Section - Above the Fold */}
      <section className="relative pt-24 pb-16 lg:pt-28 lg:pb-20 overflow-hidden min-h-[calc(100vh-4rem)]">
        {/* Background Effects */}
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full blur-[120px]" />

        <div className="container relative">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Text Content - 2/5 */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              {/* IHK Badge */}
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30">
                <Award className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">IHK-zertifizierte Ausbildung</span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="font-display text-3xl lg:text-4xl xl:text-5xl font-extrabold leading-tight"
              >
                Baue KI-Automatisierungen, die Unternehmen{" "}
                <span className="gradient-text">wirklich nutzen</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-base lg:text-lg text-muted-foreground leading-relaxed"
              >
                Dieser Kurs zeigt dir nicht, was KI kann. Er zeigt dir, wie du damit funktionierende Prozesse, Services und Umsätze aufbaust.
              </motion.p>

              <motion.div variants={fadeInUp}>
                <Button size="lg" className="glow-cyan text-lg px-8 py-6">
                  Ausbildung starten
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>

              {/* Social Proof */}
              <motion.div variants={fadeInUp} className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-secondary border-2 border-background flex items-center justify-center"
                    >
                      <Users className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-foreground">500+</span>
                  <span className="text-muted-foreground"> Absolventen</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Image - 3/5 */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl" />
                <img
                  src="/images/hero-abstract.png"
                  alt="KI-Automatisierung Visualisierung"
                  className="relative w-full rounded-2xl border border-border shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 lg:py-32 relative">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">
              Die meisten KI-Kurse erklären Modelle und Prompts.
              <br />
              <span className="text-muted-foreground">Dieser Kurs erklärt Systeme.</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              95% aller KI-Projekte scheitern am ROI. Der Grund: Sie implementieren Lösungen, ohne vorher präzise zu kalkulieren. Du wirst es anders machen.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Clock,
                title: "Speed-to-Lead",
                description: "50% aller Leads gehen verloren, weil nicht in 5 Minuten geantwortet wird.",
                color: "text-primary",
              },
              {
                icon: MessageSquare,
                title: "Nach-Feierabend-Lücke",
                description: "16 Stunden täglich 'geschlossen' für Neukunden. Verlorene Anfragen.",
                color: "text-accent",
              },
              {
                icon: Target,
                title: "Immer-gleiche-Fragen",
                description: "Enormer Zeitverlust durch manuelle Beantwortung repetitiver Anfragen.",
                color: "text-primary",
              },
              {
                icon: TrendingUp,
                title: "Verpasste Anrufe",
                description: "Jeder verpasste Anruf könnte ein lukrativer Auftrag gewesen sein.",
                color: "text-accent",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card h-full border-border/50 hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <item.icon className={`w-10 h-10 ${item.color} mb-4`} />
                    <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-20 lg:py-32 relative bg-card/30">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="container relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              8 Module. Ein komplettes System.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Vom strategischen Fundament bis zur funktionierenden Akquise-Maschine – alles, was du brauchst, um KI-Services zu bauen und zu verkaufen.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/modules-visual.png"
                alt="Kursmodule Übersicht"
                className="w-full rounded-2xl border border-border"
              />
            </motion.div>

            <div className="space-y-4">
              {[
                { num: "01", title: "Strategisches Fundament", desc: "Automatisierbare Prozesse erkennen, Tool-Auswahl, technische Grundlagen" },
                { num: "02", title: "Chatbots entwickeln", desc: "Kundensupport-Bots mit Voiceflow, Voice-Integration, Terminbuchung" },
                { num: "03", title: "RAG-Systeme", desc: "Eigene Daten in KI integrieren, Flowise, datenschutzkonforme Lösungen" },
                { num: "04", title: "Automatisierungen mit Make", desc: "Buchhaltung, Content-Produktion, WhatsApp-Automatisierung" },
                { num: "05", title: "KI-Agenten", desc: "Agenten mit Make und Manus, Tool-Anbindung, autonome Workflows" },
                { num: "06", title: "Akquise-Maschine", desc: "Content-Marketing, ManyChat, Outreach-Strategien für KMUs" },
                { num: "07", title: "ROI & Business", desc: "4-Säulen-Framework, Präsentationstechniken, kontinuierliche Optimierung" },
                { num: "08", title: "N8N & Compliance", desc: "Self-Hosting, DSGVO, AI-Act, datenschutzkonforme Implementierung" },
              ].map((module, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className="font-display font-bold text-2xl text-primary/50">{module.num}</span>
                  <div>
                    <h3 className="font-display font-semibold">{module.title}</h3>
                    <p className="text-sm text-muted-foreground">{module.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Fertige Templates. Sofort einsatzbereit.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Keine Demo-Setups, sondern real eingesetzte Vorlagen aus produktiven Projekten.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FileText,
                title: "Analyse & Strategie",
                items: ["Analyse-Canvas", "Promptvorlagen", "Blueprints"],
              },
              {
                icon: Target,
                title: "Marketing & Akquise",
                items: ["100 virale Hooks", "ManyChat-Template", "Landingpage-Vorlagen"],
              },
              {
                icon: BarChart3,
                title: "ROI & Business",
                items: ["ROI-Rechner", "Präsentations-Templates", "Monatsreports"],
              },
              {
                icon: Shield,
                title: "Datenschutz & Compliance",
                items: ["DSGVO-Vorlagen", "AVV-Muster", "Compliance-Checklisten"],
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card h-full border-border/50">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <category.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-4">{category.title}</h3>
                    <ul className="space-y-2">
                      {category.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 lg:py-32 bg-card/30">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Für wen ist diese Ausbildung?
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: Briefcase,
                title: "Unternehmer & Selbstständige",
                benefits: [
                  "Automatisiere Routineaufgaben und spare Zeit",
                  "Biete 24/7 Kundenservice ohne Mehrkosten",
                  "Verschaffe dir einen Wettbewerbsvorteil",
                ],
              },
              {
                icon: Users,
                title: "Angestellte",
                benefits: [
                  "Baue gefragte KI-Automatisierungs-Skills auf",
                  "Steigere deinen Marktwert mit IHK-Zertifikat",
                  "Positioniere dich in einem wachsenden Markt",
                ],
              },
              {
                icon: Zap,
                title: "Agenturen & Dienstleister",
                benefits: [
                  "Entwickle ein neues Geschäftsmodell",
                  "Nutze fertige Service-Pakete für KMUs",
                  "Überzeuge mit ROI-Argumentation",
                ],
              },
            ].map((audience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="gradient-border h-full">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6">
                      <audience.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-xl mb-6">{audience.title}</h3>
                    <ul className="space-y-4">
                      {audience.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Was unsere Absolventen sagen
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Echte Erfolgsgeschichten von Menschen, die mit dieser Ausbildung ihr Business transformiert haben.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Thomas Müller",
                role: "Geschäftsführer, Digital Solutions GmbH",
                quote: "Nach der Ausbildung habe ich innerhalb von 3 Monaten mein erstes KI-Automatisierungsprojekt für einen Mittelständler umgesetzt. Der ROI-Rechner war Gold wert – der Kunde hat sofort unterschrieben.",
                result: "45.000€ Projektumsatz",
              },
              {
                name: "Sarah Weber",
                role: "Freelance Marketing Consultant",
                quote: "Die Kombination aus technischem Know-how und Business-Fokus ist einzigartig. Ich biete jetzt KI-Chatbots als Premium-Service an und habe meine Stundensätze verdoppelt.",
                result: "Stundensatz von 80€ auf 160€",
              },
              {
                name: "Michael Schneider",
                role: "IT-Leiter, Handwerksbetrieb",
                quote: "Wir haben unseren Kundensupport mit einem RAG-Chatbot automatisiert. Die DSGVO-Templates haben uns Wochen an Recherchearbeit erspart. Absolut praxisnah.",
                result: "70% weniger Support-Anfragen",
              },
              {
                name: "Julia Hoffmann",
                role: "Gründerin, AI Agency",
                quote: "Das IHK-Zertifikat öffnet Türen bei Unternehmenskunden. Die fertigen Blueprints und Akquise-Strategien haben mir geholfen, in 6 Monaten 8 Kunden zu gewinnen.",
                result: "8 Kunden in 6 Monaten",
              },
              {
                name: "Andreas Becker",
                role: "Unternehmensberater",
                quote: "Endlich ein Kurs, der nicht nur erklärt, sondern zeigt, wie man KI-Services verkauft. Die ROI-Präsentationen sind so überzeugend, dass Kunden von selbst anfragen.",
                result: "3 Folgeaufträge pro Kunde",
              },
              {
                name: "Lisa Krause",
                role: "Marketing Managerin",
                quote: "Die Content-Automatisierung mit Make hat unsere Social-Media-Produktion revolutioniert. Was früher 20 Stunden pro Woche dauerte, läuft jetzt automatisch.",
                result: "20 Stunden/Woche gespart",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card h-full border-border/50 hover:border-primary/30 transition-colors">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex-1">
                      <div className="flex gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className="w-5 h-5 text-accent"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                    </div>
                    <div className="pt-4 border-t border-border/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-display font-semibold">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">Ergebnis</div>
                          <div className="text-sm font-semibold text-accent">{testimonial.result}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-20 lg:py-32 bg-card/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">
                Überzeuge Entscheider mit{" "}
                <span className="gradient-text">harten Zahlen</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Mit dem 4-Säulen-ROI-Framework, ROI-Rechnern und Präsentations-Templates kannst du Investitionsentscheidungen fundiert begründen – statt über Features zu reden.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { value: "373%", label: "ROI bei Chatbots", sublabel: "Durchschnittlich" },
                  { value: "2.809%", label: "Speed-to-Lead", sublabel: "Top-Performer" },
                  { value: "52.000€", label: "Jährliche Ersparnis", sublabel: "Pro Chatbot" },
                  { value: "12 Wochen", label: "Amortisation", sublabel: "Booking-System" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="p-4 rounded-xl bg-card border border-border"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="font-display text-2xl lg:text-3xl font-bold gradient-text">{stat.value}</div>
                    <div className="font-medium text-sm">{stat.label}</div>
                    <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/roi-chart.png"
                alt="ROI Visualisierung"
                className="w-full rounded-2xl border border-border"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certification Section */}
      <section className="py-20 lg:py-32 bg-card/30 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px]" />
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="order-2 lg:order-1 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/certification-badge.png"
                alt="IHK Zertifizierung"
                className="w-64 lg:w-80"
              />
            </motion.div>

            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-6">
                <Award className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Offiziell anerkannt</span>
              </div>

              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">
                IHK-zertifizierte Qualifikation
              </h2>

              <p className="text-lg text-muted-foreground mb-8">
                Diese Ausbildung ist offiziell von der Industrie- und Handelskammer zertifiziert. Das bedeutet für dich: Ein anerkanntes Qualitätssiegel, das bei Arbeitgebern und Kunden Vertrauen schafft.
              </p>

              <ul className="space-y-4">
                {[
                  "Offizielles IHK-Zertifikat nach Abschluss",
                  "Anerkannte Qualifikation für deinen Lebenslauf",
                  "Vertrauenssignal für potenzielle Kunden",
                  "Karrierevorteil gegenüber nicht-zertifizierten Kursen",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full blur-[150px]" />

        <div className="container relative">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl lg:text-5xl font-bold mb-6">
              Starte jetzt und baue KI-Services, die{" "}
              <span className="gradient-text">bleiben</span>
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground mb-10">
              Kein Hype. Keine Spielereien. Nur KI-Automatisierungen, die im Alltag funktionieren – und die Unternehmen bezahlen.
            </p>

            <Button size="lg" className="glow-cyan text-lg px-10 py-7">
              <Bot className="w-5 h-5 mr-2" />
              Ausbildung starten
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <p className="mt-6 text-sm text-muted-foreground">
              IHK-zertifiziert · Praxisorientiert · Mit ROI-Garantie
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" />
              <span className="font-display font-semibold">AI-Consultant Ausbildung</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Impressum</a>
              <a href="#" className="hover:text-foreground transition-colors">Datenschutz</a>
              <a href="#" className="hover:text-foreground transition-colors">AGB</a>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 AI-Consultant. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
