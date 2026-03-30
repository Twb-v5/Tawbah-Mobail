import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, Circle, ChevronDown, ChevronUp,
  ShieldAlert, Zap, BookOpen, Star, Lightbulb,
  LayoutDashboard, Lock, BarChart2, Users, Bell,
  Mic2, Smartphone, FileText, CheckCheck,
} from "lucide-react";

// ─── بيانات خطة التطوير ────────────────────────────────────────────────────

interface Step {
  id: string;
  title: string;
  description: string;
  priority?: "حرج" | "عالي" | "متوسط" | "جديد";
}

interface Phase {
  id: string;
  phase: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  steps: Step[];
}

const PHASES: Phase[] = [
  {
    id: "phase-1",
    phase: "المرحلة الأولى",
    title: "إصلاحات حرجة",
    subtitle: "أولوية قصوى — تؤثر على أمان البيانات",
    icon: <ShieldAlert size={18} />,
    color: "text-red-500 dark:text-red-400",
    bgColor: "bg-red-500/8",
    borderColor: "border-red-400/25",
    steps: [
      {
        id: "1-1",
        title: "نظام Authentication حقيقي",
        description: "استبدال sessionId + localStorage بنظام Supabase Auth كامل — تسجيل دخول بالبريد + Google OAuth + ربط البيانات بـ user_id حقيقي في قاعدة البيانات لحماية بيانات المستخدم من الضياع.",
        priority: "حرج",
      },
      {
        id: "1-2",
        title: "Rate Limiting على الـ API",
        description: "إضافة express-rate-limit على جميع endpoints الخاصة بالذكاء الاصطناعي (zakiy, hadi-tasks, tts) بحد أقصى 20 طلب/دقيقة لكل جلسة — لحماية OpenAI credits من الاستنزاف.",
        priority: "حرج",
      },
      {
        id: "1-3",
        title: "React Error Boundaries شاملة",
        description: "إضافة Error Boundaries على جميع صفحات التطبيق مع صفحة fallback جميلة بدلاً من الشاشة البيضاء عند حدوث أي خطأ غير متوقع.",
        priority: "عالي",
      },
    ],
  },
  {
    id: "phase-2",
    phase: "المرحلة الثانية",
    title: "استكمال مكتبة القرآن — Phase 3",
    subtitle: "البنية التحتية جاهزة — Routing موجود مسبقاً",
    icon: <BookOpen size={18} />,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-500/8",
    borderColor: "border-emerald-400/25",
    steps: [
      {
        id: "2-1",
        title: "ختمة مجتمعية /quran/khatma",
        description: "إنشاء والانضمام لختمة جماعية مع الأصدقاء — توزيع الأجزاء الـ30 تلقائياً، تتبع التقدم في الوقت الفعلي، وإشعارات إتمام كل جزء.",
        priority: "عالي",
      },
      {
        id: "2-2",
        title: "تحديات القرآن /quran/challenges",
        description: "تحدي ختمة رمضان، تحدي حفظ جزء عمّ، لوحة متصدرين تفاعلية. كل تحدٍّ مع شريط تقدم وإشعارات تذكير يومية.",
        priority: "عالي",
      },
      {
        id: "2-3",
        title: "AI قرآني /quran/ai",
        description: "محادثة ذكية مع القرآن — اسأل عن آية أو موضوع، اقتراح آيات حسب الحالة النفسية، تفسير فوري بلغة سهلة مبني على GPT-4o.",
        priority: "عالي",
      },
      {
        id: "2-4",
        title: "بطاقات القرآن /quran/cards",
        description: "بطاقة مرئية لأي آية قابلة للمشاركة على وسائل التواصل — اختيار الخط والخلفية والتصميم ثم التحميل أو المشاركة مباشرة.",
        priority: "متوسط",
      },
      {
        id: "2-5",
        title: "معجزات القرآن /quran/miracles",
        description: "استكشاف تفاعلي للإعجاز العلمي والعددي في القرآن الكريم — بطاقات موضوعية مع مصادر ومراجع.",
        priority: "متوسط",
      },
    ],
  },
  {
    id: "phase-3",
    phase: "المرحلة الثالثة",
    title: "تحسينات UX وPerformance",
    subtitle: "تجربة مستخدم أكثر سلاسة واحترافية",
    icon: <LayoutDashboard size={18} />,
    color: "text-secondary dark:text-accent",
    bgColor: "bg-secondary/8",
    borderColor: "border-secondary/25",
    steps: [
      {
        id: "3-1",
        title: "Onboarding Flow للمستخدم الجديد",
        description: "شاشة ترحيبية تفاعلية للمستخدم الجديد — توجيه ذكي لأول خطوة (Covenant → Day One → Journey) مع تخطي للمستخدم العائد.",
        priority: "عالي",
      },
      {
        id: "3-2",
        title: "Offline Support محسّن",
        description: "تحسين Service Worker الموجود — cache للأذكار والأدعية اليومية لعمل offline كامل، مع sync تلقائي عند عودة الاتصال.",
        priority: "متوسط",
      },
      {
        id: "3-3",
        title: "Dashboard Analytics للمسؤول",
        description: "تحسين صفحة /admin بإحصائيات حقيقية — عدد المستخدمين النشطين، متوسط الـ streak، توزيع المراحل، ورسوم بيانية تفاعلية.",
        priority: "متوسط",
      },
    ],
  },
  {
    id: "phase-4",
    phase: "المرحلة الرابعة",
    title: "مزايا جديدة مقترحة",
    subtitle: "توسعات تزيد من قيمة التطبيق وانتشاره",
    icon: <Star size={18} />,
    color: "text-amber-500 dark:text-amber-400",
    bgColor: "bg-amber-500/8",
    borderColor: "border-amber-400/25",
    steps: [
      {
        id: "4-1",
        title: "ميزة صديق المساءلة",
        description: "ربط مستخدمين معاً بالموافقة المتبادلة — إشعار لصديقك عند إتمامك يوماً كاملاً، تشجيع متبادل مجهول الهوية، وتقارير مشتركة أسبوعية.",
        priority: "جديد",
      },
      {
        id: "4-2",
        title: "مشغل التلاوة العائم",
        description: "تشغيل أذكار أو تلاوة قرآنية في الخلفية أثناء استخدام التطبيق — مشغل عائم صغير في أسفل الشاشة مع تحكم سهل.",
        priority: "جديد",
      },
      {
        id: "4-3",
        title: "Widget للهاتف (Android)",
        description: "Widget على الشاشة الرئيسية يعرض الذكر اليومي والـ streak الحالي — اضغط مباشرة لفتح التطبيق ومتابعة يومك.",
        priority: "جديد",
      },
      {
        id: "4-4",
        title: "تقرير أسبوعي شخصي",
        description: "ملخص أسبوعي يُرسل كإشعار — «هذا الأسبوع: 7 أيام استغفار، 5 صفحات قرآن، 3 وتر...» مع رسم بياني للتقدم الأسبوعي.",
        priority: "جديد",
      },
    ],
  },
];

// ─── مساعدات ────────────────────────────────────────────────────────────────

const PRIORITY_CONFIG = {
  "حرج": { bg: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20", dot: "bg-red-500" },
  "عالي": { bg: "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/20", dot: "bg-orange-500" },
  "متوسط": { bg: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20", dot: "bg-blue-500" },
  "جديد": { bg: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/20", dot: "bg-purple-500" },
};

const STORAGE_KEY = "tawbah_roadmap_progress";

function loadProgress(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(data: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

// ─── مكون الخطوة ────────────────────────────────────────────────────────────

function StepItem({
  step, done, onToggle, idx,
}: {
  step: Step; done: boolean; onToggle: () => void; idx: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const pCfg = step.priority ? PRIORITY_CONFIG[step.priority] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
      className={`rounded-xl border transition-all duration-300 overflow-hidden ${
        done
          ? "bg-primary/5 border-primary/15 opacity-75"
          : "bg-card border-border"
      }`}
    >
      {/* ── صف رئيسي ── */}
      <div className="flex items-start gap-3 p-3.5">
        {/* Checkbox */}
        <button
          onClick={onToggle}
          className="mt-0.5 shrink-0 active:scale-90 transition-transform"
          aria-label={done ? "إلغاء التحديد" : "تحديد كمكتمل"}
        >
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="done"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <CheckCircle2 size={22} className="text-primary" />
              </motion.div>
            ) : (
              <motion.div
                key="undone"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
              >
                <Circle size={22} className="text-muted-foreground/40" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* محتوى */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className={`font-bold text-sm leading-snug transition-all ${
              done ? "line-through text-muted-foreground" : "text-foreground"
            }`}>
              {step.title}
            </p>
            {pCfg && step.priority && (
              <span className={`shrink-0 inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full border ${pCfg.bg}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${pCfg.dot}`} />
                {step.priority}
              </span>
            )}
          </div>

          {/* زر التوسيع */}
          <button
            onClick={() => setExpanded(e => !e)}
            className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition-colors"
          >
            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            {expanded ? "إخفاء التفاصيل" : "عرض التفاصيل"}
          </button>
        </div>
      </div>

      {/* ── تفاصيل قابلة للطي ── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3.5 pb-3.5 pt-0">
              <div className="bg-muted/50 border border-border/50 rounded-lg px-3 py-2.5">
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── مكون المرحلة ────────────────────────────────────────────────────────────

function PhaseCard({
  phase, progress, onToggleStep,
}: {
  phase: Phase;
  progress: Record<string, boolean>;
  onToggleStep: (id: string) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const doneCount = phase.steps.filter(s => progress[s.id]).length;
  const totalCount = phase.steps.length;
  const pct = Math.round((doneCount / totalCount) * 100);
  const allDone = doneCount === totalCount;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border overflow-hidden ${phase.bgColor} ${phase.borderColor}`}
    >
      {/* ── رأس المرحلة ── */}
      <button
        onClick={() => setCollapsed(c => !c)}
        className="w-full flex items-start gap-3 p-4 text-right"
      >
        <div className={`mt-0.5 shrink-0 ${phase.color}`}>{phase.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${phase.color} opacity-70`}>
                {phase.phase}
              </p>
              <h3 className={`font-bold text-base leading-tight ${phase.color}`}>
                {phase.title}
              </h3>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {allDone && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full"
                >
                  <CheckCheck size={11} />
                  مكتمل
                </motion.div>
              )}
              <span className={`text-sm font-bold ${phase.color}`}>
                {doneCount}/{totalCount}
              </span>
              {collapsed ? (
                <ChevronDown size={16} className={phase.color} />
              ) : (
                <ChevronUp size={16} className={phase.color} />
              )}
            </div>
          </div>

          {/* شريط التقدم */}
          <div className="mt-2.5">
            <div className="h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${allDone ? "bg-emerald-500" : phase.color.includes("red") ? "bg-red-500" : phase.color.includes("emerald") ? "bg-emerald-500" : phase.color.includes("amber") ? "bg-amber-500" : "bg-secondary"}`}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1 text-right">
              {phase.subtitle}
            </p>
          </div>
        </div>
      </button>

      {/* ── قائمة الخطوات ── */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 flex flex-col gap-2">
              {phase.steps.map((step, idx) => (
                <StepItem
                  key={step.id}
                  step={step}
                  done={!!progress[step.id]}
                  onToggle={() => onToggleStep(step.id)}
                  idx={idx}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── الصفحة الرئيسية ─────────────────────────────────────────────────────────

export default function RoadmapPage() {
  const [progress, setProgress] = useState<Record<string, boolean>>(loadProgress);

  const allSteps = PHASES.flatMap(p => p.steps);
  const totalDone = allSteps.filter(s => progress[s.id]).length;
  const totalSteps = allSteps.length;
  const overallPct = Math.round((totalDone / totalSteps) * 100);

  const handleToggle = (id: string) => {
    setProgress(prev => {
      const next = { ...prev, [id]: !prev[id] };
      saveProgress(next);
      return next;
    });
  };

  const handleReset = () => {
    if (!window.confirm("هل أنت متأكد من إعادة ضبط جميع التحديثات؟")) return;
    setProgress({});
    saveProgress({});
  };

  return (
    <div className="flex-1 flex flex-col bg-background min-h-full">
      {/* ── رأس الصفحة ── */}
      <div className="bg-primary px-5 pt-10 pb-8 rounded-b-[2.5rem] text-primary-foreground shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-56 h-56 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4" />
        </div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-primary-foreground/70 text-xs mb-1 font-medium">تقييم شامل ومهني</p>
              <h1 className="text-xl font-bold text-white leading-tight text-balance">
                خطة تطوير التطبيق
              </h1>
              <p className="text-primary-foreground/60 text-xs mt-1">
                {totalSteps} خطوة تطويرية — {PHASES.length} مراحل
              </p>
            </div>
            <div className="flex flex-col items-center gap-1">
              {/* دائرة النسبة المئوية */}
              <div className="relative w-16 h-16">
                <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                  <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="5" />
                  <motion.circle
                    cx="32" cy="32" r="26"
                    fill="none"
                    stroke="rgba(255,255,255,0.85)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 26}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 26 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 26 * (1 - overallPct / 100) }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-base font-bold text-white leading-none">{overallPct}%</span>
                  <span className="text-[8px] text-white/60 leading-none mt-0.5">منجز</span>
                </div>
              </div>
            </div>
          </div>

          {/* شريط التقدم الإجمالي */}
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-primary-foreground/70">التقدم الإجمالي</span>
              <span className="text-xs font-bold text-primary-foreground">
                {totalDone} / {totalSteps} خطوة
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/15 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-white/80"
                initial={{ width: 0 }}
                animate={{ width: `${overallPct}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── ملخص المراحل ── */}
      <div className="px-4 mt-5 mb-1">
        <div className="grid grid-cols-4 gap-2">
          {PHASES.map((phase, i) => {
            const done = phase.steps.filter(s => progress[s.id]).length;
            const total = phase.steps.length;
            const pct = Math.round((done / total) * 100);
            const phaseIcons = [
              <ShieldAlert size={14} />,
              <BookOpen size={14} />,
              <LayoutDashboard size={14} />,
              <Star size={14} />,
            ];
            return (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-xl border p-2.5 text-center ${phase.bgColor} ${phase.borderColor}`}
              >
                <div className={`flex justify-center mb-1 ${phase.color}`}>
                  {phaseIcons[i]}
                </div>
                <p className={`text-sm font-bold ${phase.color}`}>{pct}%</p>
                <p className="text-[9px] text-muted-foreground leading-tight mt-0.5">
                  م{i + 1}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── المراحل ── */}
      <div className="px-4 mt-4 pb-8 flex flex-col gap-4">
        {/* نبذة توضيحية */}
        <div className="flex items-center gap-2 bg-muted/50 border border-border rounded-xl px-3 py-2.5">
          <Lightbulb size={14} className="text-secondary shrink-0" />
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            اضغط على المربع بجانب كل خطوة لتعليمها كمكتملة — يُحفظ التقدم تلقائياً.
          </p>
        </div>

        {PHASES.map((phase) => (
          <PhaseCard
            key={phase.id}
            phase={phase}
            progress={progress}
            onToggleStep={handleToggle}
          />
        ))}

        {/* بطاقة الإنجاز */}
        <AnimatePresence>
          {totalDone === totalSteps && totalSteps > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="rounded-2xl border border-emerald-400/30 bg-gradient-to-bl from-emerald-500/15 to-primary/10 p-6 text-center"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-5xl mb-3"
              >
                🌿
              </motion.div>
              <h3 className="font-bold text-lg text-emerald-700 dark:text-emerald-400 mb-2">
                اكتمل تطوير التطبيق!
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                تهانينا — جميع مراحل الخطة التطويرية الـ{PHASES.length} قد أُنجزت بالكامل.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* زر الإعادة */}
        {totalDone > 0 && (
          <button
            onClick={handleReset}
            className="mx-auto text-[11px] text-muted-foreground/50 hover:text-destructive transition-colors py-1 px-3"
          >
            إعادة ضبط جميع التحديثات
          </button>
        )}
      </div>
    </div>
  );
}
