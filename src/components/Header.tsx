import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { publicUrl } from "../utils/publicUrl";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Ranking", href: "#ranking" },
  { label: "Grupos", href: "#grupos" },
  { label: "Reglas", href: "#como-funciona" }
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // offset for header trigger
      
      for (const link of links) {
        const id = link.href.substring(1);
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-800/80 bg-slate-950/85 shadow-lg shadow-black/30 backdrop-blur-xl"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <a href="#inicio" className="flex items-center gap-3 group" aria-label="Ir al inicio">
          <img
            src={publicUrl("assets/polla_logo.png")}
            alt="Polla IRF26"
            className="h-9 w-9 rounded-full object-cover shadow-md shadow-amber-500/10 border border-white/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
          />
          <span
            className="text-sm font-black tracking-widest uppercase font-sans bg-gradient-to-r from-white via-slate-100 to-amber-200 bg-clip-text text-transparent transition-all duration-300 group-hover:to-amber-400"
          >
            Polla IRF26
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
          {links.map((link) => {
            const id = link.href.substring(1);
            const isActive = activeSection === id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative py-1 text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${
                  isActive ? "text-amber-400" : "text-slate-400 hover:text-white"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeHeaderIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Space on desktop right to balance the logo (since the action button was removed) */}
        <div className="hidden md:block w-9 h-9" />

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/15 transition-all duration-300 md:hidden shadow-sm backdrop-blur-sm"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Abrir navegación"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open ? (
        <div className="border-b border-slate-800/80 bg-slate-950/95 px-6 py-4 shadow-lg backdrop-blur-xl md:hidden animate-in fade-in duration-200">
          <nav className="grid gap-2" aria-label="Navegación móvil">
            {links.map((link) => {
              const id = link.href.substring(1);
              const isActive = activeSection === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-slate-850 text-amber-400"
                      : "text-slate-400 hover:bg-slate-900/60 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
};
