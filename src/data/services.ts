export type Service = {
  path: string;
  audience: "worldwide" | "sri-lanka";
  label: string;
  title: string;
  description: string;
  heading: string;
  introduction: string;
  summary: string;
  collaboration: { heading: string; description: string };
  capabilities: { title: string; description: string }[];
  examples: { name: string; description: string; href: string; linkLabel: string }[];
  process: { title: string; description: string }[];
  questions: { question: string; answer: string }[];
};

// These are remote service areas, not office locations.
export const serviceCities = ["Colombo", "Anuradhapura", "Kandy"];

// Priority markets for remote services, not office locations or past client claims.
export const internationalMarkets = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
];

const localCollaboration = {
  heading: "Colombo, Anuradhapura, Kandy.",
  description:
    "I work remotely with clients in Colombo, Anuradhapura, Kandy, and elsewhere in Sri Lanka. Whether you need a new website or help with an application, email your requirements or use the contact form to start a conversation about scope, timing, and collaboration.",
};

const internationalCollaboration = {
  heading: "Based in Sri Lanka. Working worldwide.",
  description: `I offer remote development for businesses in the ${internationalMarkets.join(", ")}, and beyond. Share your time zone and preferred meeting times with your brief. We can agree a practical schedule for calls, written feedback, and project reviews before work begins.`,
};

export const webDevelopment: Service = {
  path: "/web-development-sri-lanka",
  audience: "sri-lanka",
  label: "Web development",
  title: "Web Developer in Sri Lanka | Dineth Madhuranga",
  description:
    "Freelance web developer in Sri Lanka. Dineth Madhuranga builds business websites and e-commerce stores for clients in Colombo, Anuradhapura and Kandy remotely.",
  heading: "Web development in Sri Lanka.",
  introduction:
    "I’m Dineth Madhuranga, a freelance web developer and software engineer in Sri Lanka. I build websites that help people understand your business, explore what you offer, and get in touch.",
  summary:
    "From an agency website to an online storefront, the work starts with your customers and the task they need to complete. I bring together responsive interfaces, application development, and deployment so the design and the functionality work as one.",
  collaboration: localCollaboration,
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
  audience: "sri-lanka",
  label: "Software engineering",
  title: "Software Engineer in Sri Lanka | Dineth Madhuranga",
  description:
    "Dineth Madhuranga is a software engineer in Sri Lanka building custom web applications, REST APIs and dashboards, with remote collaboration in Colombo and Kandy.",
  heading: "Software engineering in Sri Lanka.",
  introduction:
    "I’m Dineth Madhuranga, a full-stack software engineer in Sri Lanka. I work on the interfaces, APIs, and data behind business applications, from customer storefronts to tools used by internal teams.",
  summary:
    "My experience includes full-stack engineering at Media Asia Networks and independent development work. I connect frontend requirements with application logic, database design, and deployment, with attention to how people use the system day to day.",
  collaboration: localCollaboration,
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

export const internationalWebDevelopment: Service = {
  path: "/web-development",
  audience: "worldwide",
  label: "Web development",
  title: "Freelance Web Developer | React & Next.js | Dineth Madhuranga",
  description:
    "Hire Dineth Madhuranga for remote web development worldwide. React and Next.js business websites, e-commerce stores, and improvements to your existing site.",
  heading: "A freelance web developer for your next project.",
  introduction:
    "I’m Dineth Madhuranga, a web developer based in Sri Lanka offering remote collaboration worldwide. I help businesses turn their services, products, and ideas into websites people can use with confidence.",
  summary:
    "Whether you’re commissioning a business website or need development support for an existing design, we can start with your audience and the result you need. My work covers React and Next.js interfaces, e-commerce, and the backend integrations that connect a website to your business.",
  collaboration: internationalCollaboration,
  capabilities: [
    {
      title: "Business websites that explain your offer",
      description:
        "Give visitors a clear path from understanding your service to making an inquiry. We can plan your page structure, project examples, and contact routes around the customers you want to reach, with responsive layouts for mobile and desktop.",
    },
    {
      title: "React & Next.js implementation",
      description:
        "Turn a design or feature brief into reusable components, responsive pages, and connected application features using React, Next.js, and TypeScript. For an existing site, share the current stack and constraints so we can assess how new work should fit.",
    },
    {
      title: "E-commerce websites",
      description:
        "Build product browsing, customer accounts, and shopping workflows using a custom application or WordPress and WooCommerce. Your catalogue, order process, and required integrations guide the scope. Payment and shipping requirements need to be agreed for the markets you serve.",
    },
    {
      title: "Website fixes & launch preparation",
      description:
        "Improve mobile layouts, page structure, metadata, images, and key interactions on an existing website. Before launch, we can review the customer journey and hosting setup, then define which future updates and maintenance belong in the project.",
    },
  ],
  examples: webDevelopment.examples,
  process: [
    {
      title: "Share your audience and brief",
      description:
        "Send your website or designs, the countries and customers you want to reach, required pages and features, and your target launch date. Include your time zone and who will provide copy, images, and feedback.",
    },
    {
      title: "Agree scope and review points",
      description:
        "Before development, we can define the deliverables, content responsibilities, and milestones. Agree how previews and written feedback will be shared so decisions can move forward between scheduled calls.",
    },
    {
      title: "Review, launch, and hand over",
      description:
        "Check the agreed pages and interactions on mobile and desktop. Plan domain and hosting access, deployment, and handover together, with maintenance and any further work discussed separately in the scope.",
    },
  ],
  questions: [
    {
      question: "Can I hire you from outside Sri Lanka?",
      answer:
        "Yes. I welcome remote project inquiries from the USA, UK, Canada, Australia, Germany, and other countries. I’m based in Sri Lanka; collaboration is remote. Share your requirements so we can discuss fit, timing, and scope.",
    },
    {
      question: "How would we work across time zones?",
      answer:
        "Sri Lanka uses UTC+5:30. Include your time zone and preferred call times in your inquiry so we can agree suitable overlap. Written briefs, preview links, and consolidated feedback can keep the project moving between calls. Meeting availability is agreed for each project.",
    },
    {
      question: "Can you work from an existing design or improve my current website?",
      answer:
        "Yes. Send the design files or website URL, explain what is already working, and list the changes you need. For existing applications, include the framework and hosting details if you know them. We can assess targeted improvements or a rebuild from that starting point.",
    },
    {
      question: "How are international projects priced?",
      answer:
        "The estimate depends on the design, content, features, and integrations. Share your budget range and preferred billing currency with the brief. We will need to agree the quote currency, payment method, milestones, and any ongoing support before work starts.",
    },
    {
      question: "Can we discuss a project in English from Germany or another country?",
      answer:
        "Yes. You can send your brief in English from any country. If your website needs German or another language, include that requirement and who will supply and review translations so the content workflow can be included in the scope.",
    },
  ],
};

export const internationalSoftwareEngineering: Service = {
  path: "/software-engineering",
  audience: "worldwide",
  label: "Software engineering",
  title: "Freelance Software Engineer | Remote Full-Stack Development",
  description:
    "Remote freelance software engineer for custom web applications, REST APIs, and dashboards. Work with Dineth Madhuranga from the USA, UK, Canada, or worldwide.",
  heading: "Remote software engineering for your business.",
  introduction:
    "I’m Dineth Madhuranga, a full-stack software engineer based in Sri Lanka. I offer remote development worldwide for businesses that need custom web applications, backend integrations, and tools built around their team’s work.",
  summary:
    "A useful application starts with the people using it and the information they need. My experience spans frontend interfaces, API development, databases, and deployment. We can scope a new application or a defined set of improvements to a system you already use.",
  collaboration: internationalCollaboration,
  capabilities: [
    {
      title: "Custom applications & internal tools",
      description:
        "Replace a difficult manual workflow with an application for collecting, reviewing, and managing information. We can define user roles, key screens, and acceptance criteria before building the interface and the application logic behind it.",
    },
    {
      title: "Backend services & API integrations",
      description:
        "Connect your interface to data and external services through REST APIs. My stack includes Node.js and Express, Java and Spring Boot, and Python and FastAPI. Authentication, validation, and error handling belong in the scope alongside successful requests.",
    },
    {
      title: "Dashboards & access control",
      description:
        "Give each user the information and actions their role needs. Reporting screens, record management, and submission workflows can be designed around real tasks, with access rules discussed before implementation.",
    },
    {
      title: "Existing systems & deployment",
      description:
        "Extend a full-stack application, investigate a production issue, or prepare a release. Share the repository structure, database, hosting setup, and current limitations. My experience includes MongoDB, MySQL, AWS, Google Cloud, and Vercel.",
    },
  ],
  examples: softwareEngineering.examples,
  process: [
    {
      title: "Map the problem and constraints",
      description:
        "Describe who uses the system, the workflow that needs to change, and the data it handles. Include existing technology, integrations, and any security or hosting requirements your team needs the project to meet.",
    },
    {
      title: "Define a reviewable delivery plan",
      description:
        "Agree application boundaries, acceptance criteria, and milestones. For remote teamwork, identify who reviews changes, how access will be provided, and when calls or written updates fit your team’s time zone.",
    },
    {
      title: "Validate and prepare the release",
      description:
        "Review core workflows, permissions, and failure cases against the agreed scope. Plan deployment, configuration, and a technical handover with your team. Discuss monitoring, maintenance, and later improvements before adding them to the project.",
    },
  ],
  questions: [
    {
      question: "Can you collaborate with an international team?",
      answer:
        "Yes. I offer remote software development for teams in the USA, UK, Canada, Australia, Germany, and elsewhere. Send your requirements, current technology, and time zone so we can assess the work and agree a collaboration schedule.",
    },
    {
      question: "Can you extend our existing application?",
      answer:
        "Share the stack, the features or issues involved, and any documentation you can provide. An initial review helps determine the integration points, testing needs, and whether the work fits my experience before we agree a scope.",
    },
    {
      question: "What should we prepare before discussing an estimate?",
      answer:
        "Describe user roles, the main workflows, required integrations, and your target release date. Example screens and anonymized sample data can help explain the problem. Include a budget range and preferred billing currency; scope, payment terms, and milestones need to be agreed before starting.",
    },
    {
      question: "How do remote reviews and handover work?",
      answer:
        "We can agree written acceptance criteria and review points for each milestone. Share your team’s time zone and preferred workflow so calls, demonstrations, and feedback can be planned. Repository access, deployment configuration, documentation, and any ongoing support should be defined in the handover scope.",
    },
  ],
};

export const internationalServices = [
  internationalWebDevelopment,
  internationalSoftwareEngineering,
];
export const localServices = [webDevelopment, softwareEngineering];
export const services = [...internationalServices, ...localServices];
