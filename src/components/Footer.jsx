import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons.jsx";

/** @type {Array<{label: string, href: string, icon: import("lucide-react").LucideIcon}>} */
const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/prajanexists-lang",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/prajan",
    icon: LinkedinIcon,
  },
  {
    label: "Email",
    href: "mailto:prajan@example.com",
    icon: Mail,
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative border-t border-zinc-800/60">
      {/* Background accent */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/3 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 items-start">
          {/* ── Left: CTA ────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <span className="font-mono text-sm text-cyan-400 tracking-wider">
              // get in touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Let&apos;s Connect
            </h2>
            <p className="max-w-md text-sm text-zinc-500 leading-relaxed">
              Always open to discussing algorithms, competitive programming, quantitative
              research, or just geeking out about systems design.
            </p>

            {/* Social Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm px-5 py-3 text-sm font-medium text-zinc-300 hover:border-zinc-600 hover:text-zinc-100 transition-all"
                >
                  <Icon size={16} />
                  {label}
                  <ArrowUpRight size={14} className="text-zinc-600" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Status ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col items-start md:items-end justify-end h-full gap-6"
          >
            {/* Brand */}
            <a
              href="#"
              className="font-mono text-2xl font-bold text-zinc-100 hover:text-cyan-400 transition-colors"
            >
              prajan<span className="text-cyan-400">.dev</span>
            </a>

            {/* Status Line */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm px-5 py-3">
              <p className="font-mono text-xs text-zinc-500 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                All systems operational
                <span className="text-zinc-700 mx-1">•</span>
                Built with performance in mind
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-zinc-800/40 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-zinc-600">
            © {new Date().getFullYear()} Prajan Radhakrishnan. All rights reserved.
          </p>
          <p className="font-mono text-xs text-zinc-700">
            React · Tailwind CSS · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
