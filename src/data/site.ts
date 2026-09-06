/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONTENT
 *  Edit this file to update everything shown on the website.
 *  All text below is PLACEHOLDER copy — replace with real details.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Naqi Shah Kazmi",
  shortName: "Naqi.",
  role: "Cinematographer & Director",
  tagline: "Stories told in light, motion and silence.",
  location: "Karachi, Pakistan",
  email: "hello@naqishahkazmi.com", // TODO: replace
  phone: "+92 300 0000000", // TODO: replace
  url: "https://naqishahkazmi.com", // TODO: replace with the real domain
  description:
    "Naqi Shah Kazmi is a cinematographer and director crafting cinematic films, commercials and music videos.",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/naqishahhkazmi/" },
    { label: "Vimeo", href: "https://vimeo.com/" }, // TODO
    { label: "YouTube", href: "https://youtube.com/" }, // TODO
    { label: "IMDb", href: "https://www.imdb.com/" }, // TODO
  ],
  /** YouTube / Vimeo embed URL for the showreel */
  showreelEmbed: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1", // TODO
  showreelDuration: "2:14",
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Showreel", href: "#showreel" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export const stats = [
  { value: 10, suffix: "+", label: "Years behind the lens" },
  { value: 120, suffix: "+", label: "Projects delivered" },
  { value: 35, suffix: "", label: "Brands & labels" },
  { value: 8, suffix: "", label: "Festival selections" },
];

export const about = {
  headline: "I chase the frame that makes you feel before you think.",
  paragraphs: [
    "I'm a Karachi-based cinematographer and director with over a decade of experience shaping images for film, television, commercials and music videos. My work sits at the intersection of naturalistic light and bold, graphic composition.",
    "Whether I'm directing a narrative short or lighting a 60-second spot, my approach is the same: build trust on set, protect the story, and leave room for the unexpected. Great images come from a calm, prepared crew and a director who knows exactly what they want — and when to let go.",
    "I work with ARRI and RED ecosystems, anamorphic and spherical glass, and I love a good practical light.",
  ],
  awards: [
    { year: "2025", title: "Best Cinematography", event: "Karachi International Film Festival" },
    { year: "2024", title: "Official Selection", event: "Mumbai Shorts International" },
    { year: "2023", title: "Silver — Craft in Film", event: "Pakistan Advertising Society Awards" },
    { year: "2022", title: "Best Music Video", event: "Lux Style Awards (nominee)" },
  ],
};

export type Category = "Film" | "Commercial" | "Music Video" | "Documentary";

export interface Project {
  slug: string;
  title: string;
  client: string;
  year: string;
  category: Category;
  role: string;
  /** Two colours used for the poster gradient (replace with a real image via `image`). */
  palette: [string, string];
  /** Optional path to a poster image in /public, e.g. "/work/echoes.jpg" */
  image?: string;
  /** Optional video URL (YouTube/Vimeo embed) */
  video?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "echoes-of-lyari",
    title: "Echoes of Lyari",
    client: "Short Film",
    year: "2025",
    category: "Film",
    role: "Director & DOP",
    palette: ["#ff5e1a", "#7a1cff"],
    featured: true,
  },
  {
    slug: "monsoon-hearts",
    title: "Monsoon Hearts",
    client: "Coke Studio",
    year: "2025",
    category: "Music Video",
    role: "Director of Photography",
    palette: ["#00e0c6", "#0047ff"],
    featured: true,
  },
  {
    slug: "the-long-drive",
    title: "The Long Drive",
    client: "Toyota Pakistan",
    year: "2024",
    category: "Commercial",
    role: "Director",
    palette: ["#ff2d75", "#ff9a1f"],
    featured: true,
  },
  {
    slug: "salt-and-sea",
    title: "Salt & Sea",
    client: "Documentary",
    year: "2024",
    category: "Documentary",
    role: "Director & DOP",
    palette: ["#ffd60a", "#ff3d00"],
  },
  {
    slug: "neon-nights",
    title: "Neon Nights",
    client: "Hasan Raheem",
    year: "2024",
    category: "Music Video",
    role: "Director",
    palette: ["#b517ff", "#00c8ff"],
  },
  {
    slug: "roots",
    title: "Roots",
    client: "Khaadi",
    year: "2023",
    category: "Commercial",
    role: "Director of Photography",
    palette: ["#12d18e", "#ffe14d"],
  },
  {
    slug: "the-last-tram",
    title: "The Last Tram",
    client: "Feature Film",
    year: "2023",
    category: "Film",
    role: "Director of Photography",
    palette: ["#ff6a3d", "#2d0b5a"],
  },
  {
    slug: "signal",
    title: "Signal",
    client: "Jazz",
    year: "2022",
    category: "Commercial",
    role: "Director",
    palette: ["#ff1f4b", "#5b00ff"],
  },
];

export const services = [
  {
    title: "Direction",
    description:
      "From treatment to final cut — narrative shorts, commercials and music videos with a clear visual voice.",
    icon: "clapperboard",
  },
  {
    title: "Cinematography",
    description:
      "Lighting, lensing and camera movement that serve the story. ARRI / RED, anamorphic & spherical.",
    icon: "aperture",
  },
  {
    title: "Colour & Look Development",
    description:
      "On-set LUTs, show LUT design and collaboration with colourists to land the intended mood.",
    icon: "palette",
  },
  {
    title: "Commercial Production",
    description:
      "End-to-end production for brands, from pitch decks and boards to a broadcast-ready deliverable.",
    icon: "film",
  },
];

export const clients = [
  "Coke Studio",
  "Toyota",
  "Khaadi",
  "Jazz",
  "HBL",
  "Netflix",
  "Red Bull",
  "Sapphire",
  "Zong",
  "Nestlé",
  "Pepsi",
  "Careem",
];

export const process = [
  { step: "01", title: "Listen", text: "Every project starts with a conversation about what the film needs to do." },
  { step: "02", title: "Design", text: "Treatment, references, lighting plans, shot lists — a shared visual language." },
  { step: "03", title: "Shoot", text: "Calm sets, prepared crews and room for happy accidents." },
  { step: "04", title: "Finish", text: "Edit supervision, grade and delivery in every format you need." },
];
