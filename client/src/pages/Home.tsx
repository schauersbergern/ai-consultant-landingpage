/**
 * AI Practitioner Landingpage - CONVERSION OPTIMIERT
 * 
 * Optimierungen implementiert:
 * 1. Emotionalere Headlines mit klarem Kundennutzen
 * 2. Urgency/Scarcity Elemente (Countdown, limitierte Plätze)
 * 3. Sticky CTA-Bar beim Scrollen
 * 4. Pricing-Sektion mit Geld-zurück-Garantie
 * 5. FAQ-Sektion für Einwandbehandlung
 * 6. Verstärkte Social Proof Elemente
 * 7. Animierte Zahlen und Micro-Interactions
 * 8. Trust-Bar mit Logos
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Award,
  BarChart3,
  Bot,
  Briefcase,
  Check,
  CheckCircle2,
  Clock,
  FileText,
  Gift,
  MessageSquare,
  Play,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

// Animated Counter Hook
function useCounter(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (!startOnView || isInView) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [end, duration, isInView, startOnView]);
  
  return { count, ref };
}

// Countdown Timer Component
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 37,
    seconds: 42,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) {
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-3 justify-center">
      {[
        { value: timeLeft.days, label: "Tage" },
        { value: timeLeft.hours, label: "Std" },
        { value: timeLeft.minutes, label: "Min" },
        { value: timeLeft.seconds, label: "Sek" },
      ].map((item, i) => (
        <div key={i} className="text-center">
          <div className="w-14 h-14 rounded-lg bg-red-500/20 border border-red-500/50 flex items-center justify-center">
            <span className="font-display text-2xl font-bold text-red-400">
              {String(item.value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-xs text-muted-foreground mt-1">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

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
  const [showStickyBar, setShowStickyBar] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Show sticky bar after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.offsetTop + heroRef.current.offsetHeight;
        setShowStickyBar(window.scrollY > heroBottom - 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animated counters
  const absolventen = useCounter(50, 2000);
  const roiCounter = useCounter(373, 1500);
  const ersparnisCounter = useCounter(52000, 2000);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <img src="/images/logo-ap.png" alt="AI Practitioner Logo" className="w-10 h-10" />
            <span className="font-display font-bold text-lg">AI Practitioner</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#module" className="text-muted-foreground hover:text-foreground transition-colors">Module</a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Erfolge</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Investition</a>
            <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
          </div>
          <Button className="glow-cyan">
            Jetzt sichern
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </nav>

      {/* Sticky CTA Bar */}
      <motion.div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border py-3 ${
          showStickyBar ? "translate-y-0" : "translate-y-full"
        } transition-transform duration-300`}
      >
        <div className="container flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <span className="text-sm text-muted-foreground">AI Practitioner Ausbildung</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">4.997€</span>
              <span className="text-sm text-muted-foreground line-through">6.500€</span>
              <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded">-23%</span>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-1 sm:flex-none justify-end">
            <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
              <Timer className="w-4 h-4 text-red-400" />
              <span>Angebot endet bald</span>
            </div>
            <Button size="lg" className="glow-cyan">
              Jetzt Platz sichern
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-24 pb-12 lg:pt-28 lg:pb-16 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full blur-[120px]" />

        <div className="container relative">
          {/* Urgency Banner */}
          <motion.div
            className="mb-8 p-4 rounded-xl bg-gradient-to-r from-red-500/10 via-red-500/5 to-red-500/10 border border-red-500/30 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-red-400" />
                <span className="font-semibold text-red-400">Frühjahrs-Aktion:</span>
                <span className="text-foreground">1.503€ Rabatt + Bonus-Paket</span>
              </div>
              <CountdownTimer />
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Text Content - 2/5 */}
            <motion.div
              className="lg:col-span-2 space-y-5"
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
                className="font-display text-3xl lg:text-4xl xl:text-[2.75rem] font-extrabold leading-[1.1]"
              >
                Werde der KI-Experte, den{" "}
                <span className="gradient-text">jedes Unternehmen sucht</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-base lg:text-lg text-muted-foreground leading-relaxed"
              >
                In 8 Wochen vom Einsteiger zum gefragten AI Practitioner mit IHK-Zertifikat. Baue KI-Automatisierungen, die Unternehmen wirklich bezahlen.
              </motion.p>

              {/* Key Benefits */}
              <motion.div variants={fadeInUp} className="space-y-2">
                {[
                  "Praxiserprobte Blueprints & Templates inklusive",
                  "ROI-Rechner für überzeugende Kundengespräche",
                  "Lebenslanger Zugang zur Community",
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeInUp} className="pt-2">
                <Button size="lg" className="glow-cyan text-lg px-8 py-6 w-full sm:w-auto">
                  Jetzt Platz sichern
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <p className="text-xs text-muted-foreground mt-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  14 Tage Geld-zurück-Garantie · Keine Vorkenntnisse nötig
                </p>
              </motion.div>

              {/* Social Proof with Real Photos */}
              <motion.div variants={fadeInUp} className="flex items-center gap-4 pt-2">
                <div className="flex -space-x-3">
                  {[
                    "/images/rene-koch.jpg",
                    "/images/katharina-jakob.jpg",
                    "/images/nicole-schauerte.jpg",
                    "/images/andrea-sprengart.jpg",
                    "/images/claudia-augustin.jpg",
                  ].map((img, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-background overflow-hidden"
                    >
                      <img src={img} alt="Absolvent" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-sm" ref={absolventen.ref}>
                  <span className="font-bold text-foreground">{absolventen.count}+</span>
                  <span className="text-muted-foreground"> erfolgreiche Absolventen</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Image/Video - 3/5 */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all" />
                <img
                  src="/images/hero-abstract.png"
                  alt="AI Practitioner Ausbildung - Fertige Vorlagen"
                  className="relative w-full rounded-2xl border border-border shadow-2xl"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                  </div>
                </div>
                <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm bg-background/80 backdrop-blur px-4 py-2 rounded-full">
                  ▶ Kostenloses Einführungsvideo ansehen
                </p>
              </div>
            </motion.div>
          </div>

          {/* Benefit Boxes */}
          <motion.div
            className="grid md:grid-cols-3 gap-4 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {[
              {
                icon: Clock,
                title: "10+ Stunden/Woche sparen",
                description: "Konzentriere dich auf strategische Arbeit, nicht auf Routinen",
                color: "text-primary",
              },
              {
                icon: TrendingUp,
                title: "Neue Einnahmequelle",
                description: "Verdiene 3-5x mehr durch KI-Services als Berater",
                color: "text-accent",
              },
              {
                icon: Shield,
                title: "Professionelle Systeme",
                description: "Baue Automationen, die zuverlässig funktionieren",
                color: "text-primary",
              },
            ].map((benefit, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border/50"
              >
                <div className={`p-2 rounded-lg bg-card ${benefit.color}`}>
                  <benefit.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm mb-1">{benefit.title}</h3>
                  <p className="text-xs text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Mini Testimonials */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card/30 border border-border/30">
              <img src="/images/rene-koch.jpg" alt="René Koch" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="text-sm italic text-muted-foreground">"Der erste KI-Kurs mit echter Praxis."</p>
                <p className="text-xs text-foreground font-medium">René, IT-Consultant</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card/30 border border-border/30">
              <img src="/images/andrea-sprengart.jpg" alt="Andrea Sprengart" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="text-sm italic text-muted-foreground">"Endlich verstehe ich Automationen – ohne Technik-Hintergrund."</p>
                <p className="text-xs text-foreground font-medium">Andrea, Business Coach</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-8 border-y border-border/50 bg-card/30">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Award className="w-6 h-6 text-accent" />
              <span className="font-medium">IHK-zertifiziert</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <ShieldCheck className="w-6 h-6 text-primary" />
              <span className="font-medium">DSGVO-konform</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-6 h-6 text-accent" />
              <span className="font-medium">50+ Absolventen</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="w-6 h-6 text-primary" />
              <span className="font-medium">373% Ø ROI</span>
            </div>
          </div>
        </div>
      </section>

      {/* Branchen Social Proof Section */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Gelernt und genutzt von Fachkräften aus{" "}
              <span className="gradient-text">6 Branchen</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Der AI Practitioner wurde erfolgreich mit 50+ Teilnehmern aus sechs verschiedenen Branchen durchlaufen – von Informatikern über Consultants bis hin zu Coaches und Finanzexperten.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="font-display text-4xl lg:text-5xl font-bold text-primary">120+</div>
              <div className="text-sm text-muted-foreground">Automationen umgesetzt</div>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl lg:text-5xl font-bold text-accent">6</div>
              <div className="text-sm text-muted-foreground">Branchen vertreten</div>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl lg:text-5xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Absolventen</div>
            </div>
          </motion.div>

          {/* Branchen Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "IT & Consulting",
                icon: Bot,
                items: ["CRM-Integrationen", "Lead-Workflows", "API-Automationen"],
                color: "border-primary/30 hover:border-primary/50",
              },
              {
                title: "Bildung",
                icon: FileText,
                items: ["Automatisierte Unterrichtszusammenfassungen", "Zoom-Transkripte für 100+ Schüler"],
                color: "border-accent/30 hover:border-accent/50",
              },
              {
                title: "Finance",
                icon: Shield,
                items: ["DSGVO-konforme Dokumentenautomation", "Sichere Kundendaten-Workflows"],
                color: "border-primary/30 hover:border-primary/50",
              },
              {
                title: "Marketing & Content",
                icon: Sparkles,
                items: ["Planung + Produktion automatisiert", "Wöchentlich mehrere Stunden eingespart"],
                color: "border-accent/30 hover:border-accent/50",
              },
              {
                title: "Coaching",
                icon: Users,
                items: ["Business-Prozesse automatisiert", "400€ pro Monat Toolkosten eliminiert"],
                color: "border-primary/30 hover:border-primary/50",
              },
              {
                title: "HR & Vertrieb",
                icon: Briefcase,
                items: ["Lead-Automation", "Dokumentengenerierung"],
                color: "border-accent/30 hover:border-accent/50",
              },
            ].map((branche, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={`glass-card h-full border ${branche.color} transition-all`}>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <branche.icon className="w-5 h-5 text-primary" />
                      <h3 className="font-display font-semibold">{branche.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {branche.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
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

      {/* Old Way vs New Way Section */}
      <section className="py-12 lg:py-16 bg-card/30">
        <div className="container">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Schluss mit dem Automations-Chaos
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Old Way */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card border-red-500/30 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                      <span className="text-xl">❌</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-red-400">Der alte Weg</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Die Falle des "No-Code-Klickers"</p>
                  <ul className="space-y-3">
                    {[
                      "No-Code-Frankenstein-Prozesse",
                      "Isoliertes Trial-and-Error",
                      "Keine Struktur, kein System",
                      "Stunden verschwendet mit YouTube-Tutorials",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-red-400/80">
                        <span className="mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* New Way */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card border-green-500/30 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <span className="text-xl">✅</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-green-400">Der neue Weg</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Die Methode des KI-Automations-Profis</p>
                  <ul className="space-y-3">
                    {[
                      "Robuste Systeme durch saubere Datenstrukturen",
                      "Fehlerresistente Workflows",
                      "Modulare, wartbare KI-Agenten",
                      "Lernen in einer starken, betreuten Community",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-green-400/80">
                        <Check className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3 Steps Section */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              In 3 Schritten zum KI-Automations-Profi
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Strategisches Fundament legen",
                description: "Du lernst die technischen und strategischen Grundlagen, um Automationspotenziale zu erkennen und die richtigen Tools auszuwählen.",
                icon: Target,
              },
              {
                step: "2",
                title: "Praxisnahe Umsetzung",
                description: "Du baust praxisrelevante Automationen, Chatbots und KI-Agenten mit Tools wie Flowise, VoiceFlow, Make, N8N und Manus.",
                icon: Zap,
              },
              {
                step: "3",
                title: "Verkaufen und Skalieren",
                description: "Du lernst, deine neuen Fähigkeiten in profitable Dienstleistungen zu verwandeln und dein Geschäft erfolgreich am Markt zu etablieren.",
                icon: TrendingUp,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <Card className="glass-card h-full border-border/50 hover:border-primary/30 transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                      <span className="font-display text-2xl font-bold text-primary-foreground">{item.step}</span>
                    </div>
                    <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-display font-semibold text-lg mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-primary/50" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem-Solution Visual Section */}
      <section className="py-10 lg:py-14 bg-card/30">
        <div className="container">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Der Unterschied, den KI-Automatisierung macht
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Während andere noch manuell arbeiten, läuft dein Business auf Autopilot.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="/images/problem-solution.png"
              alt="Ohne vs. Mit KI-Automatisierung"
              className="w-full max-w-4xl mx-auto rounded-2xl shadow-[0_20px_60px_rgba(0,255,255,0.15)]"
            />
          </motion.div>
        </div>
      </section>

      {/* Problem Section - Mit ❌/✅ Symbolen */}
      <section className="py-12 lg:py-16 relative bg-card/30">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Diese Probleme kosten Unternehmen{" "}
              <span className="text-red-400">täglich Geld</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              95% aller KI-Projekte scheitern am ROI. Mit dieser Ausbildung gehörst du zu den 5%, die es richtig machen.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Clock,
                title: "Speed-to-Lead",
                problem: "50% aller Leads gehen verloren, weil nicht in 5 Minuten geantwortet wird.",
                solution: "KI-Chatbots antworten in Sekunden – 24/7, auch um 2 Uhr nachts.",
                color: "text-primary",
              },
              {
                icon: MessageSquare,
                title: "Nach-Feierabend-Lücke",
                problem: "16 Stunden täglich 'geschlossen' für Neukunden. Verlorene Anfragen.",
                solution: "Automatische Qualifizierung und Terminbuchung rund um die Uhr.",
                color: "text-accent",
              },
              {
                icon: Target,
                title: "Immer-gleiche-Fragen",
                problem: "Enormer Zeitverlust durch manuelle Beantwortung repetitiver Anfragen.",
                solution: "RAG-Systeme beantworten 80% der Fragen sofort und korrekt.",
                color: "text-primary",
              },
              {
                icon: TrendingUp,
                title: "Verpasste Anrufe",
                problem: "Jeder verpasste Anruf könnte ein lukrativer Auftrag gewesen sein.",
                solution: "Voice-Bots nehmen jeden Anruf an und leiten qualifiziert weiter.",
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
                <Card className="glass-card h-full border-border/50 hover:border-primary/50 transition-all hover:-translate-y-1">
                  <CardContent className="p-6">
                    <item.icon className={`w-10 h-10 ${item.color} mb-4`} />
                    <h3 className="font-display font-semibold text-lg mb-4">{item.title}</h3>
                    <div className="space-y-3">
                      <p className="text-sm text-red-400/90 flex items-start gap-2">
                        <span className="text-base mt-0.5">❌</span>
                        <span>{item.problem}</span>
                      </p>
                      <p className="text-sm text-green-400/90 flex items-start gap-2">
                        <span className="text-base mt-0.5">✅</span>
                        <span>{item.solution}</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA after problems */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lg mb-4">
              <span className="font-semibold">Du</span> kannst diese Probleme für Unternehmen lösen – und dafür{" "}
              <span className="text-accent font-semibold">gut bezahlt</span> werden.
            </p>
            <Button variant="outline" className="border-primary/50 hover:bg-primary/10">
              Zeig mir wie
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="module" className="py-12 lg:py-16 relative">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="container relative">
          <motion.div
            className="text-center mb-8"
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

          <div className="grid lg:grid-cols-2 gap-6 items-center">
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

            <div className="space-y-2">
              {[
                { num: "01", emoji: "🧠", title: "Strategisches Fundament", desc: "Automatisierbare Prozesse erkennen, Tool-Auswahl, technische Grundlagen" },
                { num: "02", emoji: "💬", title: "Chatbots entwickeln", desc: "Kundensupport-Bots mit Voiceflow, Voice-Integration, Terminbuchung" },
                { num: "03", emoji: "🗄️", title: "RAG-Systeme", desc: "Eigene Daten in KI integrieren, Flowise, datenschutzkonforme Lösungen" },
                { num: "04", emoji: "⚙️", title: "Automatisierungen mit Make", desc: "Buchhaltung, Content-Produktion, WhatsApp-Automatisierung" },
                { num: "05", emoji: "🤖", title: "KI-Agenten", desc: "Agenten mit Make und Manus, Tool-Anbindung, autonome Workflows" },
                { num: "06", emoji: "🎯", title: "Akquise-Maschine", desc: "Content-Marketing, ManyChat, Outreach-Strategien für KMUs" },
                { num: "07", emoji: "💰", title: "ROI & Business", desc: "4-Säulen-Framework, Präsentationstechniken, kontinuierliche Optimierung" },
                { num: "08", emoji: "🔒", title: "N8N & Compliance", desc: "Self-Hosting, DSGVO, AI-Act, datenschutzkonforme Implementierung" },
              ].map((module, index) => (
                <motion.div
                  key={index}
                  className="flex gap-2.5 p-2.5 rounded-lg bg-card/50 border border-border/50 hover:border-primary/30 transition-all hover:bg-card/80"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className="text-2xl">{module.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-primary/50 font-mono">{module.num}</span>
                      <h3 className="font-display font-semibold text-sm">{module.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{module.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-12 lg:py-16 bg-card/30">
        <div className="container">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
              <Gift className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Im Wert von 2.500€ inklusive</span>
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Fertige Templates. Sofort einsatzbereit.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Keine Demo-Setups, sondern real eingesetzte Vorlagen aus produktiven Projekten.
            </p>
          </motion.div>

          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="/images/templates-showcase.png"
              alt="Fertige Templates und Blueprints"
              className="w-full max-w-4xl mx-auto rounded-2xl border border-border"
            />
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
                          <Check className="w-4 h-4 text-primary" />
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

      {/* Video Testimonials Section */}
      <section id="testimonials" className="py-12 lg:py-16">
        <div className="container">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Das sagen unsere Absolventen
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Echte Video-Testimonials von echten Menschen – keine leeren Versprechungen.
            </p>
          </motion.div>

          {/* Featured Video Testimonials */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              {
                name: "René Koch",
                role: "Dipl.-Ing. & IT-Consultant",
                videoId: "uGUrBdPuCBA",
                photo: "/images/rene-koch.jpg",
                quote: "Endlich ein Kurs mit echtem Praxisbezug statt nur Theorie. Durch die Live-Sessions und die Community habe ich fertige Automationen und Chatbot-Konzepte entwickelt, die ich direkt bei meinen Kunden einsetzen kann.",
              },
              {
                name: "Katharina Jakob",
                role: "Gründerin",
                videoId: "Ar2GXCjUdLg",
                photo: "/images/katharina-jakob.jpg",
                quote: "Ich habe mehrere KI-Weiterbildungen durchlaufen, aber diese war mit Abstand die praxisnächste. Man erhält direkt umsetzbare Schritte und versteht endlich das Warum hinter einer guten, skalierbaren Automation.",
              },
              {
                name: "Nicole Schauerte",
                role: "Social Media Management",
                videoId: "lbr3TQ7zqdo",
                photo: "/images/nicole-schauerte.jpg",
                quote: "Ich spare jede Woche mehrere Stunden durch eine Automation, die meine Content-Planung übernimmt. Diese Zeit nutze ich für kreative Entscheidungen – eine enorme Hilfe, die meinen Arbeitsalltag spürbar erleichtert.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card overflow-hidden border-border/50 hover:border-primary/30 transition-all group h-full flex flex-col">
                  <div className="aspect-video relative">
                    <iframe
                      src={`https://www.youtube.com/embed/${testimonial.videoId}?rel=0`}
                      title={`Testimonial ${testimonial.name}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <CardContent className="p-4 flex-1 flex flex-col">
                    <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30">
                          <img src={testimonial.photo} alt={testimonial.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-display font-semibold text-sm">{testimonial.name}</div>
                          <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-3 h-3 text-accent" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Second Row of Video Testimonials */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: "Carsten",
                role: "Lehrer",
                videoId: "sHiImBIc8Tk",
                photo: "/images/carsten-mueller.jpg",
                quote: "Mir fehlten die technischen Grundlagen. Im Kurs war mein Aha-Erlebnis, wie einfach man Tools über Schnittstellen verknüpfen kann. Jetzt automatisiere ich Unterrichtsmaterialien für meine Schüler – das war ein echter Augenöffner.",
              },
              {
                name: "Claudia Augustin",
                role: "Finanzcoach & Hypnose-Expertin",
                videoId: "m-xKE0NjK8w",
                photo: "/images/claudia-augustin.jpg",
                quote: "Ich baue mein Coaching-Business von Beginn an automatisiert auf. Der Kurs hat mir die Sicherheit gegeben, das DSGVO-konform umzusetzen – ein entscheidender Faktor, wenn man mit sensiblen Kundendaten arbeitet.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index + 3) * 0.1 }}
              >
                <Card className="glass-card overflow-hidden border-border/50 hover:border-primary/30 transition-all group h-full flex flex-col">
                  <div className="aspect-video relative">
                    <iframe
                      src={`https://www.youtube.com/embed/${testimonial.videoId}?rel=0`}
                      title={`Testimonial ${testimonial.name}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <CardContent className="p-4 flex-1 flex flex-col">
                    <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30">
                          <img src={testimonial.photo} alt={testimonial.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-display font-semibold text-sm">{testimonial.name}</div>
                          <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-3 h-3 text-accent" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trainer Section */}
      <section id="trainer" className="py-12 lg:py-16 bg-card/30">
        <div className="container">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Deine Trainer
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Gemeinsam betreuen sie jede Kohorte mit Live-Sessions, technischem Sparring und direktem Feedback zu den Projektaufgaben.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Nikolaus Schauersberger */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass-card border-border/50 hover:border-primary/30 transition-all h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-primary/30">
                      <img
                        src="/images/nikolaus-schauersberger.jpg"
                        alt="Nikolaus Schauersberger"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-display text-xl font-bold mb-1">Nikolaus Schauersberger</h3>
                    <p className="text-primary text-sm font-medium mb-3">Technische Leitung & Produzent</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Seit 15 Jahren Software-Experte und Anforderungsmanager in Großprojekten. 
                      Nikolaus bringt tiefgreifendes technisches Know-how und praktische Erfahrung 
                      aus Enterprise-Umgebungen in die Ausbildung ein.
                    </p>
                    <div className="flex gap-2 mt-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">Enterprise Software</span>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">KI-Automation</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Markus Habermehl */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-card border-border/50 hover:border-primary/30 transition-all h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-primary/30">
                      <img
                        src="/images/markus-habermehl.jpg"
                        alt="Markus Habermehl"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-display text-xl font-bold mb-1">Markus Habermehl</h3>
                    <p className="text-primary text-sm font-medium mb-3">Didaktische Leitung</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Gründer des größten KI-Clubs im DACH-Raum und Automatisierungsexperte. 
                      Markus sorgt dafür, dass komplexe Inhalte verständlich und praxisnah 
                      vermittelt werden.
                    </p>
                    <div className="flex gap-2 mt-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">KI-Club DACH</span>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">Automatisierung</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="/images/roi-chart.png"
              alt="ROI-Wachstum durch KI-Automatisierung"
              className="w-full max-w-3xl mx-auto rounded-2xl border border-border mb-6"
            />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Diese Zahlen sind keine Theorie – sie basieren auf realen Projekten unserer Absolventen.
            </p>
          </motion.div>

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
                Mit dem 4-Säulen-ROI-Framework kannst du Investitionsentscheidungen fundiert begründen – statt über Features zu reden.
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
              <Card className="glass-card border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-lg mb-4">Das 4-Säulen-ROI-Framework</h3>
                  <ul className="space-y-3">
                    {[
                      "Zeitersparnis quantifizieren",
                      "Umsatzsteigerung berechnen",
                      "Fehlerreduktion messen",
                      "Skalierbarkeit demonstrieren",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="container relative">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Deine Investition in die Zukunft
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Eine Ausbildung, die sich bereits mit dem ersten Kundenprojekt amortisiert.
            </p>
          </motion.div>

          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="gradient-border overflow-hidden">
              <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-4 text-center">
                <span className="text-sm font-medium">🔥 Frühjahrs-Aktion – Spare 1.503€</span>
              </div>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-2xl text-muted-foreground line-through">6.500€</span>
                    <span className="text-5xl font-display font-bold">4.997€</span>
                  </div>
                  <p className="text-muted-foreground">oder 6x 899€ monatlich</p>
                </div>

                <div className="space-y-3 mb-6">
                  <h3 className="font-display font-semibold text-base">Das bekommst du:</h3>
                  {[
                    "8 umfassende Kursmodule mit 40+ Stunden Video",
                    "Lebenslanger Zugang zu allen Inhalten & Updates",
                    "Fertige Templates & Blueprints (Wert: 2.500€)",
                    "ROI-Rechner & Präsentations-Vorlagen",
                    "Exklusive Community & Networking",
                    "IHK-Zertifikat nach Abschluss",
                    "14 Tage Geld-zurück-Garantie",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <Button size="lg" className="w-full glow-cyan text-lg py-6">
                    <Bot className="w-5 h-5 mr-2" />
                    Jetzt Platz sichern
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4" />
                      <span>14 Tage Garantie</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      <span>IHK-zertifiziert</span>
                    </div>
                  </div>
                </div>

                {/* Urgency */}
                <div className="mt-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-center">
                  <p className="text-sm text-red-400 font-medium mb-2">⏰ Angebot endet in:</p>
                  <CountdownTimer />
                  <p className="text-xs text-muted-foreground mt-2">Nur noch 7 Plätze zu diesem Preis verfügbar</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Certification Section */}
      <section className="py-12 lg:py-16 bg-card/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <motion.div
              className="order-2 lg:order-1 flex justify-center lg:justify-start"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/certification-badge.png"
                alt="IHK Zertifizierung"
                className="w-full max-w-md lg:max-w-none lg:w-full lg:h-auto lg:min-h-[420px] object-contain"
              />
            </motion.div>

            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-4">
                <Award className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Offiziell anerkannt</span>
              </div>

              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
                IHK-zertifizierte Qualifikation
              </h2>

              <p className="text-lg text-muted-foreground mb-6">
                Diese Ausbildung ist offiziell von der Industrie- und Handelskammer zertifiziert. Ein anerkanntes Qualitätssiegel, das bei Arbeitgebern und Kunden Vertrauen schafft.
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

      {/* FAQ Section */}
      <section id="faq" className="py-12 lg:py-16">
        <div className="container">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Häufig gestellte Fragen
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Noch Fragen? Hier findest du Antworten auf die wichtigsten.
            </p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {[
                {
                  q: "Brauche ich Programmierkenntnisse?",
                  a: "Nein, absolut nicht. Die Ausbildung ist so konzipiert, dass du ohne Vorkenntnisse starten kannst. Wir nutzen No-Code-Tools wie Make, Voiceflow und Flowise, die keine Programmierkenntnisse erfordern. Du lernst alles Schritt für Schritt.",
                },
                {
                  q: "Wie viel Zeit muss ich investieren?",
                  a: "Plane etwa 5-8 Stunden pro Woche ein. Die Ausbildung ist auf 8 Wochen ausgelegt, aber du hast lebenslangen Zugang und kannst in deinem eigenen Tempo lernen. Die meisten Absolventen schließen innerhalb von 2-3 Monaten ab.",
                },
                {
                  q: "Kann ich damit wirklich Geld verdienen?",
                  a: "Ja, definitiv. Unsere Absolventen verdienen durchschnittlich 3.000-10.000€ pro KI-Automatisierungsprojekt. Mit den inkludierten Akquise-Strategien und ROI-Rechnern hast du alles, um Kunden zu gewinnen und zu überzeugen.",
                },
                {
                  q: "Was ist, wenn mir die Ausbildung nicht gefällt?",
                  a: "Kein Problem. Du hast eine 14-tägige Geld-zurück-Garantie ohne Wenn und Aber. Wenn du innerhalb der ersten 14 Tage merkst, dass die Ausbildung nichts für dich ist, erhältst du den vollen Kaufpreis zurück.",
                },
                {
                  q: "Ist das IHK-Zertifikat wirklich anerkannt?",
                  a: "Ja, das Zertifikat wird von der Industrie- und Handelskammer ausgestellt und ist bundesweit anerkannt. Es ist ein offizielles Qualitätssiegel, das bei Arbeitgebern und Kunden Vertrauen schafft.",
                },
                {
                  q: "Bekomme ich Unterstützung während der Ausbildung?",
                  a: "Absolut. Du hast Zugang zu unserer exklusiven Community, in der du Fragen stellen und dich mit anderen Absolventen austauschen kannst. Zusätzlich gibt es regelmäßige Q&A-Sessions und Support per E-Mail.",
                },
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-xl px-6 bg-card/50">
                  <AccordionTrigger className="text-left font-display font-semibold hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 lg:py-16 relative">
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
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Werde jetzt zum{" "}
              <span className="gradient-text">AI Practitioner</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Die Nachfrage nach KI-Experten explodiert. Positioniere dich jetzt – bevor es alle anderen tun.
            </p>

            <Button size="lg" className="glow-cyan text-lg px-10 py-7">
              <Bot className="w-5 h-5 mr-2" />
              Jetzt Platz sichern
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <p className="mt-6 text-sm text-muted-foreground flex items-center justify-center gap-4">
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> 14 Tage Garantie</span>
              <span className="flex items-center gap-1"><Award className="w-4 h-4" /> IHK-zertifiziert</span>
              <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 50+ Absolventen</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <img src="/images/logo-ap.png" alt="AI Practitioner Logo" className="w-8 h-8" />
              <span className="font-display font-semibold">AI Practitioner Ausbildung</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Impressum</a>
              <a href="#" className="hover:text-foreground transition-colors">Datenschutz</a>
              <a href="#" className="hover:text-foreground transition-colors">AGB</a>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 AI Practitioner. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </footer>

      {/* Spacer for sticky bar */}
      <div className="h-20 sm:h-16" />
    </div>
  );
}
