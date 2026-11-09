export const site = {
  name: "Dineth Madhuranga",
  title: "Software Engineer & Full-Stack Developer",
  seoTitle: "Dineth Madhuranga | Freelance Web Developer & Software Engineer",
  description:
    "Freelance web developer and software engineer for clients worldwide. Based in Sri Lanka, building React and Next.js websites, e-commerce and custom applications.",
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
