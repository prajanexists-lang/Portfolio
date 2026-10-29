import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  BookOpen,
  Wrench,
  Library,
} from "lucide-react";

/**
 * @typedef {Object} SkillCategory
 * @property {string} id
 * @property {string} label
 * @property {import("lucide-react").LucideIcon} icon
 * @property {string[]} items
 */

/** @type {SkillCategory[]} */
const CATEGORIES = [
  {
    id: "languages",
    label: "Languages",
    icon: Code2,
    items: ["C++", "Python", "Bash / Zsh", "LaTeX"],
  },
  {
    id: "theory",
    label: "Theory & Mathematics",
    icon: BookOpen,
    items: [
      "Discrete Mathematics",
      "Multivariable Calculus",
      "Linear Algebra",
      "Continuous-Time Markov Chains",
      "Graph Theory",
      "Combinatorics",
    ],
  },
  {
    id: "tools",
    label: "Tools & Platforms",
    icon: Wrench,
    items: [
      "Git",
      "GitHub",
      "VS Code",
      "UNIX / macOS CLI",
      "MacTeX",
      "Prism Launcher",
    ],
  },
  {
    id: "libraries",
    label: "Libraries & APIs",
    icon: Library,
    items: ["Tree-sitter (WASM)", "OSMnx", "NetworkX", "STL"],
  },
];

/* ── Animation ───────────────────────────────────────────────── */
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.1 } },
};

/**
 * @param {{ category: SkillCategory; isActive: boolean; onClick: () => void }} props
 */
function TabButton({ category, isActive, onClick }) {
  const Icon = category.icon;
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
        isActive
          ? "text-cyan-400"
          : "text-zinc-500 hover:text-zinc-300"
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="activeSkillTab"
          className="absolute inset-0 rounded-xl bg-cyan-500/10 border border-cyan-500/25"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      <span className="relative flex items-center gap-2">
        <Icon size={16} />
        {category.label}
      </span>
    </motion.button>
  );
}

/* ── Skills Section ──────────────────────────────────────────── */
export default function Skills() {
  const [activeId, setActiveId] = useState(CATEGORIES[0].id);
  const active = CATEGORIES.find((c) => c.id === activeId);

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      {/* Background accent */}
      <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/3 rounded-full blur-3xl" />

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
            // technical arsenal
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
            Skills &amp; Tools
          </h2>
          <p className="mt-3 max-w-xl text-sm text-zinc-500">
            The stack behind the work.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {CATEGORIES.map((cat) => (
            <TabButton
              key={cat.id}
              category={cat}
              isActive={activeId === cat.id}
              onClick={() => setActiveId(cat.id)}
            />
          ))}
        </motion.div>

        {/* Chips */}
        <div className="min-h-[120px]">
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                variants={gridVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-wrap gap-3"
              >
                {active.items.map((item) => (
                  <motion.span
                    key={item}
                    variants={chipVariants}
                    whileHover={{ scale: 1.06, borderColor: "rgba(6,182,212,0.4)" }}
                    className="rounded-xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm px-5 py-3 font-mono text-sm text-zinc-300 transition-colors hover:text-cyan-300 cursor-default"
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

