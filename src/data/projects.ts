export type Project = {
  id: string;
  name: string;
  category: string;
  url: string;
  description: string;
  focus: string[];
  stack?: string[];
  repository?: string;
  tone: string;
};

export const projects: Project[] = [
  {
    id: "mediaasia",
    name: "Media Asia Networks",
    category: "Agency / Corporate",
    url: "https://www.mediaasia.lk/",
    tone: "olive",
    description:
      "A considered digital presence for a creative advertising and media agency. Clear service storytelling, a confident brand, and a responsive experience from first impression to final detail.",
    focus: ["Frontend development", "Responsive design", "SEO & deployment"],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    repository: "https://github.com/Dineth-Madhuranga/media-asia-website",
  },
  {
    id: "kandybtl",
    name: "KandyBTL",
    category: "Corporate / Outdoor advertising",
    url: "https://www.kandybtl.lk/",
    tone: "sand",
    description:
      "Bringing an outdoor advertising business into focus through clear service presentation, strong visual hierarchy, and intuitive navigation.",
    focus: ["Frontend engineering", "Responsive UX", "Service storytelling"],
    stack: ["React", "Vite", "Tailwind CSS", "Express"],
    repository: "https://github.com/Dineth-Madhuranga/kandybtl",
  },
  {
    id: "silonka",
    name: "Silonka",
    category: "E-commerce / Full-stack",
    url: "https://www.silonka.co/",
    tone: "sage",
    description:
      "A full-stack storefront for Ceylon products, connecting product discovery, account access, and shopping workflows in one customer-focused experience.",
    focus: ["Full-stack development", "Authentication", "Shopping workflows"],
    stack: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
    repository: "https://github.com/Dineth-Madhuranga/silonka",
  },
  {
    id: "voceylon",
    name: "Voice of Ceylon Travels",
    category: "Travel / Tourism",
    url: "https://www.voceylontravels.com/",
    tone: "blue",
    description:
      "An invitation to explore Sri Lanka. A travel experience that pairs destination imagery with clear, approachable content discovery.",
    focus: ["Visual storytelling", "Responsive design", "Content discovery"],
    stack: ["React", "TypeScript", "Tailwind CSS", "Express"],
    repository: "https://github.com/Dineth-Madhuranga/voc-travel-agency",
  },
  {
    id: "guideceylon",
    name: "Guide You Ceylon",
    category: "Adventure / Tourism",
    url: "https://guide-you-ceylon.vercel.app/",
    tone: "clay",
    description:
      "Wilderness, trekking, and outdoor journeys brought together in an immersive adventure travel website, designed to make the next expedition easy to explore.",
    focus: ["Visual storytelling", "Responsive UI", "Tourism experiences"],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    repository: "https://github.com/Dineth-Madhuranga/guide_you_ceylon",
  },
];
