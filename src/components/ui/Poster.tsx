import Image from "next/image";
import type { Project } from "@/data/site";

/**
 * Project poster. Uses the real image when `project.image` is set,
 * otherwise renders a designed gradient placeholder with film-frame markers
 * so the site looks finished before real stills are added.
 */
export function Poster({ project, className = "", sizes }: { project: Project; className?: string; sizes?: string }) {
  const [a, b] = project.palette;
  return (
    <div className={`relative overflow-hidden bg-bg-2 ${className}`} style={{ containerType: "inline-size" }}>
      {project.image ? (
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
          className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-105"
        />
      ) : (
        <div
          className="absolute inset-0 transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-105"
          style={{
            background: `radial-gradient(120% 90% at 20% 15%, ${a} 0%, transparent 55%), radial-gradient(110% 100% at 85% 90%, ${b} 0%, transparent 60%), #0b0912`,
          }}
        >
          {/* light streak */}
          <div
            className="absolute -inset-x-1/2 top-1/2 h-px opacity-60 blur-[1px]"
            style={{ background: `linear-gradient(90deg, transparent, ${a}, #fff, ${b}, transparent)`, transform: "rotate(-18deg)" }}
          />
          {/* letterbox bars */}
          <div className="absolute inset-x-0 top-0 h-[6%] bg-black/70" />
          <div className="absolute inset-x-0 bottom-0 h-[6%] bg-black/70" />
          {/* frame corners */}
          {["top-4 left-4 border-t border-l", "top-4 right-4 border-t border-r", "bottom-4 left-4 border-b border-l", "bottom-4 right-4 border-b border-r"].map((c) => (
            <span key={c} className={`absolute size-4 border-white/50 ${c}`} />
          ))}
          <span className="absolute left-5 top-[9%] font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
            REC ● {project.year}
          </span>
          <span className="absolute right-5 top-[9%] font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
            2.39:1
          </span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/10" />
    </div>
  );
}
