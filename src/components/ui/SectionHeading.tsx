import { Reveal, SplitWords } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const center = align === "center";
  return (
    <div className={`mb-14 md:mb-20 ${center ? "text-center mx-auto max-w-3xl" : "max-w-4xl"}`}>
      <Reveal>
        <p className="eyebrow mb-5 flex items-center gap-3 justify-start [&>span]:h-px [&>span]:w-8 [&>span]:bg-orange">
          {!center && <span />}
          {eyebrow}
        </p>
      </Reveal>
      <h2 className="display-lg">
        <SplitWords text={title} />
      </h2>
      {description && (
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-base md:text-lg text-muted leading-relaxed">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
