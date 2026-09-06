"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Send } from "lucide-react";
import { site } from "@/data/site";
import { Reveal, SplitWords } from "@/components/ui/Reveal";

const inputCls =
  "peer w-full border-b border-white/15 bg-transparent py-4 text-base text-fg outline-none transition-colors placeholder:text-transparent focus:border-orange";
const labelCls =
  "pointer-events-none absolute left-0 top-4 text-sm text-muted transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-orange peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs";

/**
 * Contact form. Ships with a zero-backend `mailto:` handoff so it works
 * on day one. To send real emails, swap `onSubmit` for a Server Action
 * using Resend / Formspree — see README.
 */
export function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Project enquiry — ${fd.get("project")}`);
    const body = encodeURIComponent(
      `Name: ${fd.get("name")}\nEmail: ${fd.get("email")}\nProject: ${fd.get("project")}\n\n${fd.get("message")}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute -bottom-1/3 left-1/2 -z-10 h-[80vw] w-[120vw] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(255,94,26,.35),rgba(122,28,255,.25)_40%,transparent_70%)] blur-3xl" aria-hidden />

      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-3 [&>span]:h-px [&>span]:w-8 [&>span]:bg-orange">
              <span /> Contact
            </p>
          </Reveal>
          <h2 className="display-xl text-[clamp(2.75rem,6.5vw,6rem)]">
            <SplitWords text="Let's make" />
            <br />
            <SplitWords text="something" wordClassName="text-gradient" delay={0.2} />
            <br />
            <SplitWords text="worth watching." delay={0.4} />
          </h2>
          <Reveal delay={0.3} className="mt-10 space-y-4 text-muted">
            <p className="max-w-md leading-relaxed">
              Commercials, films, music videos, or just an idea you can&apos;t stop thinking about — tell me about it.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-2 text-xl font-semibold text-fg md:text-2xl"
            >
              {site.email}
              <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <p className="text-sm">{site.location} · Available worldwide</p>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="lg:col-span-6">
          <form onSubmit={onSubmit} className="rounded-3xl border border-line bg-bg-2/60 p-7 backdrop-blur md:p-10">
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="relative">
                <input id="name" name="name" required placeholder="Name" className={inputCls} autoComplete="name" />
                <label htmlFor="name" className={labelCls}>Your name</label>
              </div>
              <div className="relative">
                <input id="email" name="email" type="email" required placeholder="Email" className={inputCls} autoComplete="email" />
                <label htmlFor="email" className={labelCls}>Email address</label>
              </div>
              <div className="relative sm:col-span-2">
                <input id="project" name="project" required placeholder="Project" className={inputCls} />
                <label htmlFor="project" className={labelCls}>Project type — commercial, film, music video…</label>
              </div>
              <div className="relative sm:col-span-2">
                <textarea id="message" name="message" rows={4} required placeholder="Message" className={`${inputCls} resize-none`} />
                <label htmlFor="message" className={labelCls}>Tell me about it</label>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-10 inline-flex w-full items-center justify-center gap-3 rounded-full bg-fg py-4 text-sm font-semibold text-bg transition-colors hover:bg-orange sm:w-auto sm:px-8"
            >
              {sent ? "Opening your mail app…" : "Send message"} <Send className="size-4" />
            </motion.button>
            <p className="mt-4 text-xs text-muted">Usually replies within 24 hours.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
