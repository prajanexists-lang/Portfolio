import { motion } from "framer-motion";
import { ExternalLink, Zap } from "lucide-react";
import { GithubIcon } from "./BrandIcons.jsx";

/**
 * @typedef {Object} Project
 * @property {string} title
 * @property {string} context
 * @property {string} subtitle
 * @property {string} description
 * @property {string[]} tech
 * @property {string} metric
 * @property {string} [github]
 */

/** @type {Project[]} */
const PROJECTS = [
  {
    title: "TypeTrace",
    context: "Hackathon: coNSTruct 2.0",
    subtitle: "Behavioral Keystroke Dynamics & LLM Transcription Detection",
    description:
      "Integrity verification engine designed to detect unauthorized real-time transcription of AI-generated code during technical assessments. Analyzes AST syntax tokens via WebAssembly-compiled Tree-sitter while profiling user input flight times against log-normal bimodal distributions.",
    tech: [
      "Python",
      "WebAssembly (WASM)",
      "Tree-sitter AST",
      "Continuous-Time Markov Chains",
      "Wasserstein-1 Distance",
    ],
    metric: "Sub-token latency AST analysis",
    github: "https://github.com/prajanexists-lang",
  },
  {
    title: "QPSO-VRP",
    context: "Smart India Hackathon",
    subtitle: "Quantum-Inspired Metaheuristic Engine for Dynamic Urban Routing",
    description:
      "Dynamic Vehicle Routing Problem (VRP) solver that optimizes transit paths across real-world urban road graphs under simulated real-time congestion. Implements Quantum-Behaved Particle Swarm Optimization to explore multi-dimensional state spaces rapidly.",
    tech: ["Python", "NetworkX", "OSMnx", "QPSO Algorithm", "Graph Theory"],
    metric: "Dynamic multi-vehicle topological rerouting",
    github: "https://github.com/prajanexists-lang",
  },
  {
    title: "Headless Game Infrastructure",
    context: "Personal Project",
    subtitle: "Low-Latency Cross-Platform Server Deployment",
    description:
      "Headless server environment built for institutional network topologies. Employs Geyser proxy protocol translation to facilitate cross-play between Java and Bedrock clients with CLI-based memory and process management.",
    tech: ["macOS CLI", "UNIX Automation", "Fabric Runtime", "GeyserMC"],
    metric: "Zero-latency protocol bridging",
    github: "https://github.com/prajanexists-lang",
  },
];

/* ── Animation variants ──────────────────────────────────────── */
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/**
 * @param {{ project: Project; index: number }} props
 */
function ProjectCard({ project, index }) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-md p-6 sm:p-8 transition-colors hover:border-zinc-700"
    >
      {/* Glow on hover */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500/10 via-transparent to-emerald-500/10" />

      <div className="relative space-y-4">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-xl font-bold text-zinc-100">{project.title}</h3>
              <span className="rounded-full bg-cyan-500/10 border border-cyan-500/25 px-3 py-0.5 text-[11px] font-mono font-medium text-cyan-400">
                {project.context}
              </span>
            </div>
            <p className="text-sm font-medium text-zinc-400">{project.subtitle}</p>
          </div>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 transition-all"
            >
              <GithubIcon size={14} />
              Source
              <ExternalLink size={12} />
            </a>
          )}
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-zinc-400">{project.description}</p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md bg-zinc-800/80 border border-zinc-700/50 px-2.5 py-1 font-mono text-[11px] text-zinc-400"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Metric */}
        <div className="flex items-center gap-2 pt-1">
          <Zap size={14} className="text-emerald-400" />
          <span className="font-mono text-xs font-medium text-emerald-400">
            {project.metric}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Projects Section ────────────────────────────────────────── */
export default function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="font-mono text-sm text-cyan-400 tracking-wider">
            // featured work
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
            Projects
          </h2>
          <p className="mt-3 max-w-xl text-sm text-zinc-500">
            Systems, algorithms, and research — built with precision.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6"
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
