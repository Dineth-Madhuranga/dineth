export type Service = {
  path: string;
  label: string;
  title: string;
  description: string;
  heading: string;
  introduction: string;
  summary: string;
  capabilities: { title: string; description: string }[];
  examples: { name: string; description: string; href: string; linkLabel: string }[];
  process: { title: string; description: string }[];
  questions: { question: string; answer: string }[];
};

// These are remote service areas, not office locations.
export const serviceCities = ["Colombo", "Anuradhapura", "Kandy"];

export const webDevelopment: Service = {
  path: "/web-development-sri-lanka",
  label: "Web development",
  title: "Web Developer in Sri Lanka | Dineth Madhuranga",
  description:
    "Freelance web developer in Sri Lanka. Dineth Madhuranga builds business websites and e-commerce stores for clients in Colombo, Anuradhapura and Kandy remotely.",
  heading: "Web development in Sri Lanka.",
  introduction:
    "I’m Dineth Madhuranga, a freelance web developer and software engineer in Sri Lanka. I build websites that help people understand your business, explore what you offer, and get in touch.",
  summary:
    "From an agency website to an online storefront, the work starts with your customers and the task they need to complete. I bring together responsive interfaces, application development, and deployment so the design and the functionality work as one.",
  capabilities: [
    {
      title: "Business & tourism websites",
      description:
        "Service pages, project showcases, and destination content with clear navigation and useful contact routes. My portfolio includes agency, outdoor advertising, and Sri Lankan tourism websites, with layouts that adapt to phones and larger screens.",
    },
    {
      title: "E-commerce development",
      description:
        "Storefronts that connect product discovery, customer accounts, and shopping workflows. I work with custom full-stack applications and WordPress or WooCommerce, choosing an approach around the catalogue and the way the business manages orders.",
    },
    {
      title: "React & Next.js development",
      description:
        "Custom interfaces using React, Next.js, and TypeScript, supported by reusable components and backend integrations. This suits websites that need tailored interactions or a path toward more complex application features.",
    },
    {
      title: "Website improvements & technical SEO",
      description:
        "Responsive layout fixes, semantic page structure, metadata, image delivery, and deployment troubleshooting. These foundations help visitors use a website and help search engines understand its content; search visibility also depends on the content and reputation of the business.",
    },
  ],
  examples: [
    {
      name: "Media Asia Networks",
      description:
        "An agency website built with Next.js, React, and TypeScript. The work brings together service storytelling, responsive presentation, SEO, and deployment.",
      href: "https://www.mediaasia.lk/",
      linkLabel: "Explore the agency website",
    },
    {
      name: "KandyBTL",
      description:
        "A website for an outdoor advertising business, focused on service presentation, visual hierarchy, and intuitive navigation. Built with React, Vite, Tailwind CSS, and Express.",
      href: "https://www.kandybtl.lk/",
      linkLabel: "Explore KandyBTL",
    },
    {
      name: "Voice of Ceylon Travels",
      description:
        "A Sri Lanka travel website pairing destination imagery with approachable content discovery. Responsive layouts help visitors explore travel content on different devices.",
      href: "https://www.voceylontravels.com/",
      linkLabel: "Explore the travel website",
    },
  ],
  process: [
    {
      title: "Start with the brief",
      description:
        "Share your business, audience, existing website if you have one, and the action you want visitors to take. We can discuss content, required features, budget, and timing before deciding the scope.",
    },
    {
      title: "Build around the content",
      description:
        "Page structure and interface decisions should make your services easy to understand. Responsive development connects that content with the forms, storefront, or integrations the project needs.",
    },
    {
      title: "Review the complete journey",
      description:
        "Review the site on mobile and desktop, check the important interactions, and prepare hosting and domain configuration. Agree any ongoing updates or maintenance as part of the project scope.",
    },
  ],
  questions: [
    {
      question: "How do I choose the best web developer for my project?",
      answer:
        "Look for relevant live work, a clear explanation of the developer’s role, and a scope that covers the features you actually need. Ask about mobile usability, content updates, hosting, and maintenance. The best fit depends on your project; the examples above let you assess my work directly.",
    },
    {
      question: "Can you work with a business in Colombo, Anuradhapura, or Kandy?",
      answer:
        "Yes. I collaborate remotely with clients across all three cities and elsewhere in Sri Lanka. Send your requirements through the contact form or email so we can discuss the project and how to work together.",
    },
    {
      question: "How much does a website cost?",
      answer:
        "The scope matters more than the number of pages alone. Content preparation, custom design, a product catalogue, account features, and integrations all affect the work. Share the features you need and your intended launch date to discuss an estimate.",
    },
    {
      question: "Can you improve an existing website?",
      answer:
        "Yes. Share its URL, the technology it uses if you know it, and the problems you want to solve. An initial review helps determine whether targeted fixes or a broader rebuild makes sense.",
    },
  ],
};

export const softwareEngineering: Service = {
  path: "/software-engineering-sri-lanka",
  label: "Software engineering",
  title: "Software Engineer in Sri Lanka | Dineth Madhuranga",
  description:
    "Dineth Madhuranga is a software engineer in Sri Lanka building custom web applications, REST APIs and dashboards, with remote collaboration in Colombo and Kandy.",
  heading: "Software engineering in Sri Lanka.",
  introduction:
    "I’m Dineth Madhuranga, a full-stack software engineer in Sri Lanka. I work on the interfaces, APIs, and data behind business applications, from customer storefronts to tools used by internal teams.",
  summary:
    "My experience includes full-stack engineering at Media Asia Networks and independent development work. I connect frontend requirements with application logic, database design, and deployment, with attention to how people use the system day to day.",
  capabilities: [
    {
      title: "Custom web applications",
      description:
        "Applications built around a workflow: collecting information, reviewing submissions, managing records, or presenting data. React and Next.js interfaces connect the user journey to the backend services that support it.",
    },
    {
      title: "Backend development & REST APIs",
      description:
        "Application logic, authentication, and integrations using Node.js and Express, Java and Spring Boot, or Python and FastAPI. API boundaries and validation help keep the responsibilities of each part clear.",
    },
    {
      title: "Dashboards & business workflows",
      description:
        "Role-based views, reporting interfaces, and management tools that help teams work with shared information. The design of permissions and the flow between screens are as important as the individual features.",
    },
    {
      title: "Databases & cloud deployment",
      description:
        "MongoDB and MySQL integration, query improvements, and practical hosting workflows. My experience includes AWS, Google Cloud, and Vercel, along with diagnosing issues that appear after an application reaches production.",
    },
  ],
  examples: [
    {
      name: "Silonka storefront",
      description:
        "A full-stack e-commerce experience for Ceylon products. MongoDB, Express, React, and Node.js support product discovery, account access, and shopping workflows.",
      href: "https://www.silonka.co/",
      linkLabel: "Explore the storefront",
    },
    {
      name: "Central Province Tourism Registry",
      description:
        "A tourism management platform with foreign visitor registration, data analysis, and role-based dashboards. Its application layers include React, REST APIs, and Spring Boot. A public demo is not available.",
      href: "/#engineering",
      linkLabel: "Read the architecture summary",
    },
    {
      name: "Community Crime Incident Reporting",
      description:
        "An application combining submission workflows, mapping, and controlled access for different user roles. The stack includes React, FastAPI, and MongoDB. A public demo is not available.",
      href: "/#engineering",
      linkLabel: "Read the workflow summary",
    },
  ],
  process: [
    {
      title: "Understand the workflow",
      description:
        "Start with the people using the application, the information they handle, and where the current process becomes difficult. Existing screens, sample records, and a description of user roles help define the problem.",
    },
    {
      title: "Define the application boundaries",
      description:
        "Separate the interface, business logic, and data responsibilities. Discuss integrations, access rules, and deployment needs before choosing the implementation and agreeing the scope.",
    },
    {
      title: "Validate the important paths",
      description:
        "Review both successful and failed user actions, access restrictions, and data handling. Deployment and troubleshooting are part of bringing an application into use, with further support agreed around the project.",
    },
  ],
  questions: [
    {
      question: "What is the difference between a website and a custom web application?",
      answer:
        "A business website usually focuses on presenting information and generating inquiries. A web application adds workflows such as signing in, managing records, processing submissions, or using a dashboard. Some projects combine both, and the required features determine the approach.",
    },
    {
      question: "Can we collaborate remotely from Colombo or Kandy?",
      answer:
        "Yes. I work remotely with clients in Colombo, Kandy, Anuradhapura, and across Sri Lanka. Share the application requirements and your existing setup so we can discuss how the work fits your team.",
    },
    {
      question: "Which technologies do you work with?",
      answer:
        "My work includes React, Next.js, TypeScript, Node.js, Express, Java, Spring Boot, Python, FastAPI, MongoDB, and MySQL. The choice depends on the existing application, team needs, and the problem being solved.",
    },
    {
      question: "What should I include in a project inquiry?",
      answer:
        "Describe the users, the workflow, the main features, and any integrations. Include the current stack if an application already exists, along with your priorities and intended timeline. This gives us a useful starting point for discussing scope.",
    },
  ],
};

export const services = [webDevelopment, softwareEngineering];
