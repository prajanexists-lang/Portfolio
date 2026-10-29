import { motion } from "framer-motion";
import { Trophy, Brain, Swords, Crown } from "lucide-react";

/**
 * @typedef {Object} StatCard
 * @property {string} label
 * @property {string} value
 * @property {string} detail
 * @property {import("lucide-react").LucideIcon} icon
 * @property {string} accentColor - Tailwind text color class
 */

/** @type {StatCard[]} */
const STATS = [
  {
    label: "Collegiate ICPC",
    value: "Core Solver",
    detail: "Math Specialist — First-year NST RU ICPC Team",
    icon: Trophy,
    accentColor: "text-cyan-400",
  },
  {
    label: "Active Contests",
    value: "ICPC · GFG · CF",
    detail: "ICPC Prelims, GeeksforGeeks Open, Codeforces Div. 3",
    icon: Swords,
    accentColor: "text-emerald-400",
  },
  {
    label: "Quantitative Modeling",
    value: "WorldQuant BRAIN",
    detail: "Platform participant & Integration Bee competitor",
    icon: Brain,
    accentColor: "text-violet-400",
  },
];

/* ── Animation ───────────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/**
 * @param {{ stat: StatCard }} props
 */
function StatTile({ stat }) {
  const Icon = stat.icon;
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-md p-6 hover:border-zinc-700 transition-colors"
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800/80 border border-zinc-700/50 ${stat.accentColor}`}
        >
          <Icon size={20} />
        </div>
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
          {stat.label}
        </span>
      </div>
      <p className="text-lg font-bold text-zinc-100 mb-1">{stat.value}</p>
      <p className="text-sm text-zinc-500 leading-relaxed">{stat.detail}</p>
    </motion.div>
  );
}

/* ── Chess Card ──────────────────────────────────────────────── */
function ChessCard() {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-md p-6 hover:border-zinc-700 transition-colors lg:col-span-3"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        {/* Left: icon & label */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Crown size={28} />
          </div>
          <div>
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">
              Strategic Game Theory
            </p>
            <p className="text-xl font-bold text-zinc-100">Chess</p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-14 w-px bg-zinc-800" />

        {/* Stats */}
        <div className="flex flex-wrap gap-6">
          {/* Rating */}
          <div className="space-y-1">
            <p className="text-xs font-mono text-zinc-500">Peak Rating</p>
            <p className="text-2xl font-extrabold text-amber-400 font-mono tracking-tight">
              1780+
            </p>
            <p className="text-xs text-zinc-500">Chess.com</p>
          </div>

          {/* Repertoire */}
          <div className="space-y-1">
            <p className="text-xs font-mono text-zinc-500">Opening Repertoire</p>
            <div className="flex gap-2 flex-wrap">
              <span className="rounded-lg bg-zinc-800/80 border border-zinc-700/50 px-3 py-1.5 font-mono text-xs text-zinc-300">
                Caro-Kann
              </span>
              <span className="rounded-lg bg-zinc-800/80 border border-zinc-700/50 px-3 py-1.5 font-mono text-xs text-zinc-300">
                Slav Defense
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Competitive Section ─────────────────────────────────────── */
export default function Competitive() {
  return (
    <section id="competitive-quant" className="relative py-24 sm:py-32">
      {/* Background accent */}
      <div className="pointer-events-none absolute right-0 top-1/3 w-[500px] h-[500px] bg-violet-500/3 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="font-mono text-sm text-cyan-400 tracking-wider">
            // competitive edge
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
            Competitive &amp; Quantitative
          </h2>
          <p className="mt-3 max-w-xl text-sm text-zinc-500">
            Algorithmic contests, quantitative research, and strategic game theory.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 lg:grid-cols-3"
        >
          {STATS.map((stat) => (
            <StatTile key={stat.label} stat={stat} />
          ))}
          <ChessCard />
        </motion.div>
      </div>
    </section>
  );
}

