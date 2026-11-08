export const site = {
  name: "Dineth Madhuranga",
  title: "Software Engineer & Full-Stack Developer",
  description:
    "Explore the portfolio of Dineth Madhuranga, a software engineer specializing in full-stack web development, backend APIs, modern digital experiences, and cloud deployment.",
  email: "dinethlaksitha@gmail.com",
  phone: "+94 78 518 2399",
  telephone: "tel:+94785182399",
  whatsapp: "https://wa.me/94769058595",
  github: "https://github.com/Dineth-Madhuranga",
  // Confirmed by the owner; LinkedIn blocks automated requests with HTTP 999.
  linkedin: "https://www.linkedin.com/in/dineth-madhuranga/",
  linkedinVerified: true,
  frontendMentor: "https://www.frontendmentor.io/profile/Dineth-Madhuranga",
  medium: "https://medium.com/@dinethlaksitha",
  location: "Sri Lanka",
  availableForWork: false,
  cvPath: "/Dineth_Madhuranga_CV.pdf",
};

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
}

export const navigation = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "expertise", label: "Expertise" },
  { id: "contact", label: "Contact" },
] as const;
