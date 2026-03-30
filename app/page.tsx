"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Heart,
  BookOpen,
  Clock,
  Users,
  HeartHandshake,
  PenLine,
  ListChecks,
  ScrollText,
  BarChart2,
  Bell,
  ShieldAlert,
  Zap,
  Swords,
  CircleDot,
  Sparkles,
  Moon,
  Sun,
  Star,
  BookText,
  ArrowLeft,
  MessageCircle,
  Volume2,
  Flame,
  TrendingUp,
  CheckCircle2,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Banner slides data
const BANNER_SLIDES = [
  {
    label: "آية كريمة",
    icon: BookText,
    text: "﴿قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَى أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ﴾ — الزمر: 53",
    bg: "linear-gradient(135deg, rgba(16,185,129,0.18) 0%, rgba(5,150,105,0.08) 100%)",
    borderColor: "rgba(16,185,129,0.3)",
    accent: "#059669",
  },
  {
    label: "حديث شريف",
    icon: MessageCircle,
    text: "«التائبُ من الذنبِ كمَن لا ذنبَ له» — رواه ابن ماجه",
    bg: "linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(217,119,6,0.08) 100%)",
    borderColor: "rgba(245,158,11,0.35)",
    accent: "#d97706",
  },
  {
    label: "ذكر مأثور",
    icon: Star,
    text: "سبحان الله وبحمده — سبحان الله العظيم. خفيفتان على اللسان، ثقيلتان في الميزان.",
    bg: "linear-gradient(135deg, rgba(14,165,233,0.18) 0%, rgba(2,132,199,0.08) 100%)",
    borderColor: "rgba(14,165,233,0.3)",
    accent: "#0284c7",
  },
  {
    label: "نصيحة روحية",
    icon: Sparkles,
    text: "الذنب الذي يُورِث الإنكسار خيرٌ من طاعة تُورِث الكِبر — ابن عطاء الله السكندري",
    bg: "linear-gradient(135deg, rgba(236,72,153,0.16) 0%, rgba(219,39,119,0.07) 100%)",
    borderColor: "rgba(236,72,153,0.28)",
    accent: "#db2777",
  },
]

// Grid cards data
const GRID_CARDS = [
  {
    id: "rajaa",
    href: "/rajaa",
    label: "مكتبة الرجاء",
    sub: "آيات وأحاديث",
    icon: BookOpen,
    bg: "from-emerald-500/15 to-teal-400/5",
    border: "border-emerald-400/30",
    iconBg: "bg-emerald-500/15 text-emerald-500",
  },
  {
    id: "dhikr",
    href: "/dhikr",
    label: "مسبحة الذكر",
    sub: "استغفار وتسبيح",
    icon: CircleDot,
    bg: "from-amber-500/15 to-yellow-400/5",
    border: "border-amber-400/30",
    iconBg: "bg-amber-500/15 text-amber-600",
  },
  {
    id: "prayer-times",
    href: "/prayer-times",
    label: "مواقيت الصلاة",
    sub: "تذكيرات ذكية",
    icon: Clock,
    bg: "from-indigo-600/15 to-blue-500/5",
    border: "border-indigo-400/30",
    iconBg: "bg-indigo-600/15 text-indigo-500",
  },
  {
    id: "dhikr-rooms",
    href: "/dhikr-rooms",
    label: "غرف الذكر",
    sub: "مع آلاف المسلمين",
    icon: Users,
    bg: "from-teal-600/15 to-emerald-400/5",
    border: "border-teal-400/30",
    iconBg: "bg-teal-600/15 text-teal-600",
  },
  {
    id: "secret-dua",
    href: "/secret-dua",
    label: "الصديق السري",
    sub: "ادعُ لأخٍ مجهول",
    icon: HeartHandshake,
    bg: "from-rose-600/15 to-pink-400/5",
    border: "border-rose-400/30",
    iconBg: "bg-rose-600/15 text-rose-500",
  },
  {
    id: "hadi-tasks",
    href: "/hadi-tasks",
    label: "مهام هادي",
    sub: "نصائح الزكي",
    icon: ListChecks,
    bg: "from-cyan-500/15 to-sky-400/5",
    border: "border-cyan-400/30",
    iconBg: "bg-cyan-500/15 text-cyan-600",
  },
  {
    id: "dua-timing",
    href: "/dua-timing",
    label: "لحظة الإجابة",
    sub: "أقوى أوقات الدعاء",
    icon: Zap,
    bg: "from-yellow-500/15 to-amber-400/5",
    border: "border-yellow-400/30",
    iconBg: "bg-yellow-500/15 text-yellow-600",
  },
  {
    id: "notifications",
    href: "/notifications",
    label: "الإشعارات",
    sub: "ضبط تنبيهات الصلاة",
    icon: Bell,
    bg: "from-amber-600/15 to-orange-400/5",
    border: "border-amber-500/30",
    iconBg: "bg-amber-600/15 text-amber-600",
  },
  {
    id: "journal",
    href: "/journal",
    label: "يوميات التوبة",
    sub: "مساحة سرية",
    icon: PenLine,
    bg: "from-violet-600/15 to-purple-400/5",
    border: "border-violet-400/30",
    iconBg: "bg-violet-600/15 text-violet-500",
  },
  {
    id: "progress-map",
    href: "/progress",
    label: "خريطة التقدم",
    sub: "إحصاءاتك",
    icon: BarChart2,
    bg: "from-blue-600/15 to-sky-400/5",
    border: "border-blue-400/30",
    iconBg: "bg-blue-600/15 text-blue-500",
  },
  {
    id: "kaffarah",
    href: "/kaffarah",
    label: "الكفارات",
    sub: "خطوات مفصّلة",
    icon: ScrollText,
    bg: "from-red-500/15 to-rose-400/5",
    border: "border-red-400/30",
    iconBg: "bg-red-500/15 text-red-500",
  },
  {
    id: "challenge",
    href: "/challenge/create",
    label: "تحدي التوبة",
    sub: "شارك رابطه",
    icon: Swords,
    bg: "from-orange-500/15 to-red-400/5",
    border: "border-orange-400/30",
    iconBg: "bg-orange-500/15 text-orange-500",
  },
  {
    id: "danger-times",
    href: "/danger-times",
    label: "أوقات الخطر",
    sub: "تذكيرات وقائية",
    icon: ShieldAlert,
    bg: "from-red-600/15 to-orange-500/5",
    border: "border-red-500/30",
    iconBg: "bg-red-600/15 text-red-500",
  },
  {
    id: "relapse",
    href: "/relapse",
    label: "ضعفت وعدت؟",
    sub: "لا تيأس",
    icon: Heart,
    bg: "from-pink-500/15 to-rose-400/5",
    border: "border-pink-400/30",
    iconBg: "bg-pink-500/15 text-pink-500",
  },
]

// Zakiy AI Button component
function ZakiyButton() {
  return (
    <motion.button
      className="fixed bottom-24 left-4 z-50 w-14 h-14 rounded-full shadow-2xl overflow-hidden"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{
        background: "conic-gradient(from 0deg, hsl(153 60% 20%), hsl(43 74% 49%), hsl(153 60% 20%))",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <Sparkles className="w-6 h-6 text-white" />
      </div>
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "conic-gradient(from 0deg, transparent, rgba(255,255,255,0.3), transparent)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </motion.button>
  )
}

// Banner component
function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  const slide = BANNER_SLIDES[currentSlide]
  const Icon = slide.icon

  return (
    <div className="px-4 py-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="rounded-xl p-4 border"
          style={{
            background: slide.bg,
            borderColor: slide.borderColor,
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${slide.accent}20`, color: slide.accent }}
            >
              <Icon size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <Badge
                variant="outline"
                className="mb-2 text-xs"
                style={{ borderColor: slide.accent, color: slide.accent }}
              >
                {slide.label}
              </Badge>
              <p className="text-sm leading-relaxed text-foreground/90">{slide.text}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center gap-1.5 mt-3">
        {BANNER_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              i === currentSlide ? "w-4 bg-primary" : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

// Grid Card component
function GridCard({ card }: { card: (typeof GRID_CARDS)[0] }) {
  const Icon = card.icon

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Card
        className={`h-full cursor-pointer bg-gradient-to-br ${card.bg} ${card.border} border hover:shadow-lg transition-shadow`}
      >
        <CardContent className="p-4">
          <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center mb-3`}>
            <Icon size={22} />
          </div>
          <h3 className="font-semibold text-sm mb-1">{card.label}</h3>
          <p className="text-xs text-muted-foreground">{card.sub}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Hero section
function HeroSection() {
  const [streakDays] = useState(7)
  const [progress] = useState(65)

  return (
    <div className="px-4 py-6">
      <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">دليل التوبة النصوح</h1>
              <p className="text-muted-foreground text-sm">رحلتك نحو التوبة تبدأ هنا</p>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-xl">
              <Flame className="w-5 h-5 text-primary" />
              <span className="font-bold text-primary">{streakDays}</span>
              <span className="text-xs text-muted-foreground">يوم</span>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">تقدمك اليوم</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex items-center gap-3">
            <Button className="flex-1 gap-2">
              <TrendingUp className="w-4 h-4" />
              تابع رحلتك
            </Button>
            <Button variant="outline" size="icon">
              <CheckCircle2 className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Quran Card
function QuranCard() {
  return (
    <div className="px-4 mb-4">
      <Card className="overflow-hidden bg-gradient-to-br from-emerald-500/10 to-teal-400/5 border-emerald-400/30">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center">
              <BookText className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold">القرآن الكريم</h3>
              <p className="text-xs text-muted-foreground">تلاوة، حفظ، تفسير</p>
            </div>
            <Button variant="ghost" size="sm" className="mr-auto gap-1">
              افتح
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: BookOpen, label: "تلاوة" },
              { icon: Volume2, label: "استماع" },
              { icon: Star, label: "حفظ" },
              { icon: MessageCircle, label: "تفسير" },
            ].map((item, i) => (
              <button
                key={i}
                className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
              >
                <item.icon className="w-4 h-4 text-emerald-600" />
                <span className="text-xs">{item.label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Journey Card
function JourneyCard() {
  return (
    <div className="px-4 mb-4">
      <Card className="overflow-hidden rainbow-border">
        <div className="relative z-10 bg-card rounded-[calc(1rem-1.5px)]">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center">
                <Moon className="w-5 h-5 text-violet-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">رحلة الـ 30 يوم</h3>
                <p className="text-xs text-muted-foreground">اليوم 7 من 30</p>
              </div>
              <Badge variant="secondary" className="bg-violet-500/10 text-violet-600">
                23%
              </Badge>
            </div>
            <Progress value={23} className="h-1.5 mb-3" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              استمر في التزامك — كل يوم خطوة نحو التغيير الحقيقي.
            </p>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}

// Theme toggle
function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark")
    setIsDark(!isDark)
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} className="fixed top-4 left-4 z-50">
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </Button>
  )
}

export default function TawbahHome() {
  return (
    <main className="min-h-screen bg-background pb-32">
      <ThemeToggle />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold">دليل التوبة</h1>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <Flame className="w-3 h-3 ml-1" />7 أيام
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero */}
      <HeroSection />

      {/* Banner Slider */}
      <BannerSlider />

      {/* Quran Card */}
      <QuranCard />

      {/* Journey Card */}
      <JourneyCard />

      {/* Main Grid */}
      <section className="px-4 py-4">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          أدوات التوبة
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {GRID_CARDS.map((card) => (
            <GridCard key={card.id} card={card} />
          ))}
        </div>
      </section>

      {/* Zakiy AI Button */}
      <ZakiyButton />

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-lg border-t border-border/50 px-4 py-3 z-40">
        <div className="flex items-center justify-around">
          {[
            { icon: Heart, label: "الرئيسية", active: true },
            { icon: BookOpen, label: "القرآن", active: false },
            { icon: CircleDot, label: "الذكر", active: false },
            { icon: BarChart2, label: "تقدمي", active: false },
          ].map((item, i) => (
            <button
              key={i}
              className={`flex flex-col items-center gap-1 px-4 py-1 rounded-lg transition-colors ${
                item.active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </main>
  )
}
