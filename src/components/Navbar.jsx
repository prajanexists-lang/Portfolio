import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileDown, Menu, X } from "lucide-react";
import { GithubIcon } from "./BrandIcons.jsx";

/** @type {Array<{label: string, href: string}>} */
const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Competitive & Quant", href: "#competitive-quant" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-[#090A0F]/80 backdrop-blur-xl border-b border-zinc-800/60"
          : "bg-transparent"
        }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* ── Brand ──────────────────────────────────────── */}
        <a
          href="#"
          className="font-mono text-lg font-bold tracking-tight text-zinc-100 hover:text-cyan-400 transition-colors"
        >
          prajan<span className="text-cyan-400">.dev</span>
        </a>

        {/* ── Desktop Links ─────────────────────────────── */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="relative px-3 py-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors group"
              >
                {label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 bg-cyan-400 transition-all group-hover:w-4/5" />
              </a>
            </li>
          ))}
        </ul>

        {/* ── Action Buttons ────────────────────────────── */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/prajanexists-lang"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-300 hover:border-zinc-500 hover:text-zinc-100 transition-all"
          >
            <GithubIcon size={16} />
            GitHub
          </a>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 text-sm font-medium text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all cursor-pointer"
          >
            <FileDown size={16} />
            Resume
          </motion.button>
        </div>

        {/* ── Mobile Toggle ─────────────────────────────── */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* ── Mobile Menu ─────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-zinc-800/60 bg-[#090A0F]/95 backdrop-blur-xl"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-3 text-sm text-zinc-300 hover:bg-zinc-800/50 hover:text-zinc-100 transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li className="mt-3 flex gap-3">
                <a
                  href="https://github.com/prajanexists-lang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-2.5 text-sm text-zinc-300"
                >
                  <GithubIcon size={16} />
                  GitHub
                </a>
                <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 px-4 py-2.5 text-sm font-medium text-cyan-400">
                  <FileDown size={16} />
                  Resume
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}