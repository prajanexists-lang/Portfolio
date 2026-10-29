import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GithubIcon } from "./BrandIcons.jsx";

/* ── Terminal auto-typing data ───────────────────────────────── */
const TERMINAL_LINES = [
  { prompt: "$ ", command: "whoami", output: "prajan@nst-ru :: CS & AI Undergrad" },
  {
    prompt: "$ ",
    command: "cat skills.json",
    output: `{ "core": ["C++", "Python", "Graph Theory"],\n  "focus": ["ICPC", "Quant Modeling", "Systems"] }`,
  },
  {
    prompt: "$ ",
    command: "run benchmark --project typetrace",
    output: "✓ AST analysis pipeline complete — sub-token latency achieved.",
  },
  {
    prompt: "$ ",
    command: "echo $STACK",
    output: "Tree-sitter (WASM) | QPSO | NetworkX | CTMC",
  },
];

/** Typewriter hook that types one character at a time. */
function useTypewriter(text, speed = 40, startDelay = 0) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const startTimeout = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(iv);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(startTimeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

/* ── Mini Terminal ───────────────────────────────────────────── */
function MiniTerminal() {
  const [lines, setLines] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [phase, setPhase] = useState("typing"); // typing | output | pause
  const [typedCmd, setTypedCmd] = useState("");
  const scrollRef = useRef(null);

  const currentLine = TERMINAL_LINES[currentIdx];

  // Auto-type the command character by character
  useEffect(() => {
    if (phase !== "typing" || !currentLine) return;
    setTypedCmd("");
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTypedCmd(currentLine.command.slice(0, i));
      if (i >= currentLine.command.length) {
        clearInterval(iv);
        // After typing is done, wait briefly then show output
        setTimeout(() => setPhase("output"), 300);
      }
    }, 50);
    return () => clearInterval(iv);
  }, [phase, currentIdx, currentLine]);

  // Show output and advance
  useEffect(() => {
    if (phase !== "output" || !currentLine) return;
    setLines((prev) => [
      ...prev,
      { type: "cmd", text: `${currentLine.prompt}${currentLine.command}` },
      { type: "out", text: currentLine.output },
    ]);
    setTypedCmd("");
    setPhase("pause");
    const timeout = setTimeout(() => {
      const nextIdx = (currentIdx + 1) % TERMINAL_LINES.length;
      if (nextIdx === 0) {
        // Reset after full cycle
        setTimeout(() => {
          setLines([]);
          setCurrentIdx(0);
          setPhase("typing");
        }, 2000);
      } else {
        setCurrentIdx(nextIdx);
        setPhase("typing");
      }
    }, 1200);
    return () => clearTimeout(timeout);
  }, [phase, currentIdx, currentLine]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, typedCmd]);

  return (
    <div className="w-full rounded-xl border border-zinc-800 bg-[#0c0d12] overflow-hidden shadow-2xl">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900/80 border-b border-zinc-800">
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <span className="h-3 w-3 rounded-full bg-green-500/80" />
        <span className="ml-3 text-xs font-mono text-zinc-500">prajan@dev ~ zsh</span>
      </div>
      {/* Body */}
      <div ref={scrollRef} className="px-4 py-3 font-mono text-sm h-52 overflow-y-auto space-y-1">
        {lines.map((line, i) => (
          <div key={i} className={line.type === "cmd" ? "text-zinc-300" : "text-cyan-400/80"}>
            {line.type === "out" ? (
              <pre className="whitespace-pre-wrap">{line.text}</pre>
            ) : (
              line.text
            )}
          </div>
        ))}
        {/* Current typing line */}
        {phase === "typing" && currentLine && (
          <div className="text-zinc-300">
            <span className="text-emerald-400">{currentLine.prompt}</span>
            {typedCmd}
            <span className="cursor-blink text-cyan-400">▋</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Stagger animation wrappers ──────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ── Hero Section ────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 w-full">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-center">
          {/* ── Left: Content ─────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 rounded-full border border-zinc-700/60 bg-zinc-900/60 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                First-Year CS &amp; AI Undergrad @ Newton School of Technology
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]"
            >
              Prajan{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Radhakrishnan
              </span>
            </motion.h1>

            {/* Headline */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl font-medium text-zinc-300"
            >
              Systems &amp; Algorithmic Developer{" "}
              <span className="text-zinc-500">|</span>{" "}
              Quantitative Problem Solver
            </motion.p>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              className="max-w-lg text-sm leading-relaxed text-zinc-400"
            >
              Undergraduate at Newton School of Technology, Rishihood University. Focused on
              applied mathematics, behavioral biometrics, combinatorial optimization, and
              low-level system design. Core Solver and Math Specialist for collegiate ICPC.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-zinc-950 glow-cyan-strong hover:bg-cyan-400 transition-colors"
              >
                View Projects
                <ArrowRight size={16} />
              </motion.a>
              <motion.a
                href="https://github.com/prajanexists-lang"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/50 px-6 py-3 text-sm font-medium text-zinc-300 hover:border-zinc-500 hover:text-zinc-100 transition-all"
              >
                <GithubIcon size={16} />
                GitHub
              </motion.a>
            </motion.div>
          </motion.div>

          {/* ── Right: Terminal ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <MiniTerminal />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
