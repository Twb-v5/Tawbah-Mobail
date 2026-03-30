import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  BookOpen,
  LayoutDashboard,
  Star,
  Lightbulb,
  CheckCheck,
  ArrowRight,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Step {
  id: string;
  title: string;
  description: string;
  priority: "حرج" | "عالي" | "متوسط" | "جديد";
}

interface Phase {
  id: string;
  phaseLabel: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accentClass: string;   // text color
  trackColor: string;    // for progress bar (inline style)
  steps: Step[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const PHASES: Phase[] = [
  {
    id: "phase-1",
    phaseLabel: "المرحلة الأولى",
    title: "إصلاحات حرجة",
    subtitle: "أولوية قصوى — تؤثر على أمان البيانات",
    icon: <ShieldAlert size={17} />,
    accentClass: "text-red-500",
    trackColor: "#ef4444",
    steps: [
      {
        id: "1-1",
        title: "نظام Authentication حقيقي",
        description:
          "استبدال sessionId + localStorage بنظام Supabase Auth كامل — تسجيل دخول بالبريد + Google OAuth + ربط البيانات بـ user_id حقيقي في قاعدة البيانات لحماية بيانات المستخدم من الضياع.",
        priority: "حرج",
      },
      {
        id: "1-2",
        title: "Rate Limiting على الـ API",
        description:
          "إضافة express-rate-limit على جميع endpoints الخاصة بالذكاء الاصطناعي (zakiy, hadi-tasks, tts) بحد أقصى 20 طلب/دقيقة لكل جلسة — لحماية OpenAI credits من الاستنزاف.",
        priority: "حرج",
      },
      {
        id: "1-3",
        title: "React Error Boundaries شاملة",
        description:
          "إضافة Error Boundaries على جميع صفحات التطبيق مع صفحة fallback جميلة بدلاً من الشاشة البيضاء عند حدوث أي خطأ غير متوقع.",
        priority: "عالي",
      },
    ],
  },
  {
    id: "phase-2",
    phaseLabel: "المرحلة الثانية",
    title: "استكمال مكتبة القرآن",
    subtitle: "البنية التحتية جاهزة — Routing موجود مسبقاً",
    icon: <BookOpen size={17} />,
    accentClass: "text-emerald-600 dark:text-emerald-400",
    trackColor: "#10b981",
    steps: [
      {
        id: "2-1",
        title: "ختمة مجتمعية /quran/khatma",
        description:
          "إنشاء والانضمام لختمة جماعية مع الأصدقاء — توزيع الأجزاء الـ30 تلقائياً، تتبع التقدم في الوقت الفعلي، وإشعارات إتمام كل جزء.",
        priority: "عالي",
      },
      {
        id: "2-2",
        title: "تحديات القرآن /quran/challenges",
        description:
          "تحدي ختمة رمضان، تحدي حفظ جزء عمّ، لوحة متصدرين تفاعلية. كل تحدٍّ مع شريط تقدم وإشعارات تذكير يومية.",
        priority: "عالي",
      },
      {
        id: "2-3",
        title: "AI قرآني /quran/ai",
        description:
          "محادثة ذكية مع القرآن — اسأل عن آية أو موضوع، اقتراح آيات حسب الحالة النفسية، تفسير فوري بلغة سهلة مبني على GPT-4o.",
        priority: "عالي",
      },
      {
        id: "2-4",
        title: "بطاقات القرآن /quran/cards",
        description:
          "بطاقة مرئية لأي آية قابلة للمشاركة على وسائل التواصل — اختيار الخط والخلفية والتصميم ثم التحميل أو المشاركة مباشرة.",
        priority: "متوسط",
      },
      {
        id: "2-5",
        title: "معجزات القرآن /quran/miracles",
        description:
          "استكشاف تفاعلي للإعجاز العلمي والعددي في القرآن الكريم — بطاقات موضوعية مع مصادر ومراجع.",
        priority: "متوسط",
      },
    ],
  },
  {
    id: "phase-3",
    phaseLabel: "المرحلة الثالثة",
    title: "تحسينات UX وPerformance",
    subtitle: "تجربة مستخدم أكثر سلاسة واحترافية",
    icon: <LayoutDashboard size={17} />,
    accentClass: "text-secondary",
    trackColor: "hsl(43 60% 50%)",
    steps: [
      {
        id: "3-1",
        title: "Onboarding Flow للمستخدم الجديد",
        description:
          "شاشة ترحيبية تفاعلية للمستخدم الجديد — توجيه ذكي لأول خطوة (Covenant → Day One → Journey) مع تخطي للمستخدم العائد.",
        priority: "عالي",
      },
      {
        id: "3-2",
        title: "Offline Support محسّن",
        description:
          "تحسين Service Worker الموجود — cache للأذكار والأدعية اليومية لعمل offline كامل، مع sync تلقائي عند عودة الاتصال.",
        priority: "متوسط",
      },
      {
        id: "3-3",
        title: "Dashboard Analytics للمسؤول",
        description:
          "تحسين صفحة /admin بإحصائيات حقيقية — عدد المستخدمين النشطين، متوسط الـ streak، توزيع المراحل، ورسوم بيانية تفاعلية.",
        priority: "متوسط",
      },
    ],
  },
  {
    id: "phase-4",
    phaseLabel: "المرحلة الرابعة",
    title: "مزايا جديدة مقترحة",
    subtitle: "توسعات تزيد من قيمة التطبيق وانتشاره",
    icon: <Star size={17} />,
    accentClass: "text-amber-500",
    trackColor: "#f59e0b",
    steps: [
      {
        id: "4-1",
        title: "ميزة صديق المساءلة",
        description:
          "ربط مستخدمين معاً بالموافقة المتبادلة — إشعار لصديقك عند إتمامك يوماً كاملاً، تشجيع متبادل مجهول الهوية، وتقارير مشتركة أسبوعية.",
        priority: "جديد",
      },
      {
        id: "4-2",
        title: "مشغل التلاوة العائم",
        description:
          "تشغيل أذكار أو تلاوة قرآنية في الخلفية أثناء استخدام التطبيق — مشغل عائم صغير في أسفل الشاشة مع تحكم سهل.",
        priority: "جديد",
      },
      {
        id: "4-3",
        title: "Widget للهاتف (Android)",
        description:
          "Widget على الشاشة الرئيسية يعرض الذكر اليومي والـ streak الحالي — اضغط مباشرة لفتح التطبيق ومتابعة يومك.",
        priority: "جديد",
      },
      {
        id: "4-4",
        title: "تقرير أسبوعي شخصي",
        description:
          "ملخص أسبوعي يُرسل كإشعار — «هذا الأسبوع: 7 أيام استغفار، 5 صفحات قرآن، 3 وتر...» مع رسم بياني للتقدم الأسبوعي.",
        priority: "جديد",
      },
    ],
  },
];

// ─── Priority config ──────────────────────────────────────────────────────────

const PRIORITY_CONFIG: Record<Step["priority"], { label: string; className: string; dot: string }> = {
  "حرج":   { label: "حرج",   className: "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20",     dot: "bg-red-500" },
  "عالي":  { label: "عالي",  className: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20", dot: "bg-orange-500" },
  "متوسط": { label: "متوسط", className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",   dot: "bg-blue-500" },
  "جديد":  { label: "جديد",  className: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20", dot: "bg-purple-500" },
};

// ─── Storage ─────────────────────────────────────────────────────────────────

const STORAGE_KEY = "tawbah_roadmap_v1";

function load(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}"); }
  catch { return {}; }
}

function save(data: Record<string, boolean>) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
  catch { /* noop */ }
}

// ─── StepItem ────────────────────────────────────────────────────────────────

function StepItem({
  step,
  done,
  onToggle,
  index,
}: {
  step: Step;
  done: boolean;
  onToggle: () => void;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const p = PRIORITY_CONFIG[step.priority];

  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.25 }}
      className={[
        "rounded-xl border overflow-hidden transition-all duration-300",
        done
          ? "bg-primary/5 border-primary/15"
          : "bg-card border-border",
      ].join(" ")}
    >
      {/* Main row */}
      <div className="flex items-start gap-3 px-3.5 pt-3.5 pb-2">
        {/* Checkbox button */}
        <button
          onClick={onToggle}
          className="mt-[2px] shrink-0 active:scale-90 transition-transform focus:outline-none"
          aria-label={done ? "إلغاء التعليم" : "تعليم كمكتمل"}
        >
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="checked"
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 18 }}
              >
                <CheckCircle2 size={22} className="text-primary" />
              </motion.div>
            ) : (
              <motion.div
                key="unchecked"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Circle size={22} className="text-muted-foreground/35" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p
              className={[
                "text-sm font-bold leading-snug transition-colors",
                done ? "line-through text-muted-foreground/60" : "text-foreground",
              ].join(" ")}
            >
              {step.title}
            </p>
            <span
              className={[
                "shrink-0 inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full",
                p.className,
              ].join(" ")}
            >
              <span className={["w-1.5 h-1.5 rounded-full", p.dot].join(" ")} />
              {p.label}
            </span>
          </div>

          {/* Toggle details */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition-colors focus:outline-none"
          >
            {open ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
            {open ? "إخفاء التفاصيل" : "عرض التفاصيل"}
          </button>
        </div>
      </div>

      {/* Collapsible details */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-3.5 pb-3.5">
              <div className="rounded-lg bg-muted/50 border border-border/60 px-3 py-2.5">
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

// ─── PhaseCard ───────────────────────────────────────────────────────────────

function PhaseCard({
  phase,
  progress,
  onToggle,
  index,
}: {
  phase: Phase;
  progress: Record<string, boolean>;
  onToggle: (id: string) => void;
  index: number;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const doneCount = phase.steps.filter((s) => progress[s.id]).length;
  const total = phase.steps.length;
  const pct = total === 0 ? 0 : Math.round((doneCount / total) * 100);
  const allDone = doneCount === total;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="rounded-2xl border border-border bg-card overflow-hidden"
    >
      {/* Phase header */}
      <button
        onClick={() => setCollapsed((v) => !v)}
        className="w-full flex items-start gap-3 px-4 pt-4 pb-3 text-right focus:outline-none"
      >
        {/* Icon */}
        <div className={["mt-0.5 shrink-0", phase.accentClass].join(" ")}>
          {phase.icon}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className={["text-[9px] font-bold uppercase tracking-widest opacity-60 mb-0.5", phase.accentClass].join(" ")}>
                {phase.phaseLabel}
              </p>
              <h3 className={["font-bold text-[15px] leading-tight", phase.accentClass].join(" ")}>
                {phase.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {allDone && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full"
                >
                  <CheckCheck size={10} />
                  مكتمل
                </motion.span>
              )}
              <span className={["text-sm font-bold", phase.accentClass].join(" ")}>
                {doneCount}/{total}
              </span>
              {collapsed
                ? <ChevronDown size={15} className={phase.accentClass} />
                : <ChevronUp size={15} className={phase.accentClass} />}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-2.5 space-y-1">
            <div className="h-1.5 rounded-full bg-border overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: phase.trackColor }}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
            <p className="text-[9px] text-muted-foreground">{phase.subtitle}</p>
          </div>
        </div>
      </button>

      {/* Steps list */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 flex flex-col gap-2 border-t border-border/50 pt-2">
              {phase.steps.map((step, i) => (
                <StepItem
                  key={step.id}
                  step={step}
                  done={!!progress[step.id]}
                  onToggle={() => onToggle(step.id)}
                  index={i}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Summary mini-cards ───────────────────────────────────────────────────────

function PhaseSummaryCard({
  phase,
  progress,
  index,
}: {
  phase: Phase;
  progress: Record<string, boolean>;
  index: number;
}) {
  const done = phase.steps.filter((s) => progress[s.id]).length;
  const total = phase.steps.length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.06 }}
      className="flex-1 rounded-xl border border-border bg-card flex flex-col items-center py-2.5 px-1 gap-1"
    >
      <div className={["text-sm", phase.accentClass].join(" ")}>{phase.icon}</div>
      <p className={["text-sm font-bold leading-none", phase.accentClass].join(" ")}>{pct}%</p>
      <p className="text-[8px] text-muted-foreground leading-none">م{index + 1}</p>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function RoadmapPage() {
  const [progress, setProgress] = useState<Record<string, boolean>>(load);

  const allSteps = PHASES.flatMap((p) => p.steps);
  const totalDone = allSteps.filter((s) => progress[s.id]).length;
  const totalSteps = allSteps.length;
  const overallPct = totalSteps === 0 ? 0 : Math.round((totalDone / totalSteps) * 100);
  const allComplete = totalDone === totalSteps && totalSteps > 0;

  // Circumference for SVG circle (r=26)
  const CIRC = 2 * Math.PI * 26;

  function handleToggle(id: string) {
    setProgress((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      save(next);
      return next;
    });
  }

  function handleReset() {
    if (!window.confirm("هل أنت متأكد من إعادة ضبط جميع الخطوات المكتملة؟")) return;
    setProgress({});
    save({});
  }

  return (
    <div className="flex-1 flex flex-col bg-background min-h-full">

      {/* ── Header ── */}
      <div className="relative bg-primary px-5 pt-10 pb-8 rounded-b-[2.5rem] shadow-lg overflow-hidden">
        {/* Decorative glows */}
        <div className="absolute top-0 right-0 w-52 h-52 rounded-full bg-white/5 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full bg-white/5 blur-2xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="relative z-10 flex items-start justify-between gap-4">
          {/* Titles */}
          <div className="flex-1 min-w-0">
            <p className="text-primary-foreground/60 text-[11px] font-medium mb-1">
              تقييم شامل ومهني
            </p>
            <h1 className="text-xl font-bold text-primary-foreground leading-tight text-balance">
              خطة تطوير التطبيق
            </h1>
            <p className="text-primary-foreground/50 text-xs mt-1">
              {totalSteps} خطوة — {PHASES.length} مراحل
            </p>

            {/* Overall progress bar */}
            <div className="mt-4 space-y-1.5">
              <div className="flex justify-between text-[10px] text-primary-foreground/60">
                <span>التقدم الإجمالي</span>
                <span className="font-bold text-primary-foreground/80">
                  {totalDone} / {totalSteps}
                </span>
              </div>
              <div className="h-2 rounded-full bg-white/15 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-white/75"
                  initial={{ width: 0 }}
                  animate={{ width: `${overallPct}%` }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          {/* Circular percentage */}
          <div className="shrink-0 flex flex-col items-center gap-1">
            <div className="relative w-[68px] h-[68px]">
              <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                <circle
                  cx="32" cy="32" r="26"
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="5"
                />
                <motion.circle
                  cx="32" cy="32" r="26"
                  fill="none"
                  stroke="rgba(255,255,255,0.8)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  initial={{ strokeDashoffset: CIRC }}
                  animate={{ strokeDashoffset: CIRC * (1 - overallPct / 100) }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
                <span className="text-[17px] font-bold text-white leading-none">
                  {overallPct}%
                </span>
                <span className="text-[8px] text-white/55 leading-none">منجز</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Phase summary row ── */}
      <div className="px-4 mt-4 flex gap-2">
        {PHASES.map((phase, i) => (
          <PhaseSummaryCard key={phase.id} phase={phase} progress={progress} index={i} />
        ))}
      </div>

      {/* ── Hint ── */}
      <div className="mx-4 mt-3 flex items-start gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2.5">
        <Lightbulb size={13} className="text-secondary shrink-0 mt-px" />
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          اضغط على الدائرة بجانب أي خطوة لتعليمها كمكتملة — يُحفظ التقدم تلقائياً على الجهاز.
        </p>
      </div>

      {/* ── Phase cards ── */}
      <div className="px-4 mt-4 pb-10 flex flex-col gap-4">
        {PHASES.map((phase, i) => (
          <PhaseCard
            key={phase.id}
            phase={phase}
            progress={progress}
            onToggle={handleToggle}
            index={i}
          />
        ))}

        {/* Completion banner */}
        <AnimatePresence>
          {allComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="rounded-2xl border border-emerald-500/20 bg-emerald-500/8 p-6 text-center"
            >
              <p className="text-3xl mb-3 font-display">🌿</p>
              <h3 className="font-bold text-base text-emerald-700 dark:text-emerald-400 mb-1">
                اكتملت جميع مراحل الخطة!
              </h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                تهانينا — جميع الـ{totalSteps} خطوة التطويرية قد أُنجزت بالكامل.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reset button */}
        {totalDone > 0 && (
          <div className="flex justify-center">
            <button
              onClick={handleReset}
              className="text-[11px] text-muted-foreground/40 hover:text-destructive transition-colors py-1.5 px-4 rounded-full"
            >
              إعادة ضبط التقدم
            </button>
          </div>
        )}

        {/* Footer note */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground/40 mt-1">
          <ArrowRight size={10} />
          <span>دليل التوبة النصوح — خطة التطوير 2025</span>
        </div>
      </div>
    </div>
  );
}
