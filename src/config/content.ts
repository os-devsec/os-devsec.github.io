export const siteConfig = {
  name: "Your Portfolio",
  title: "Someone's Portfolio",
  description: "A showcase of my work and thoughts",
  social: {
    github: "https://github.com/os-devsec",
    email: "mailto:oscaral.lara@gmail.com",
    linke: "https://www.linkedin.com/in/oscar-lara-b43653349/"
  },
};

export const homeContent = {
  title: "Hello, I'm Oscar",
  description:
    "A system engineering student passionate about cybersecurity, focused on understanding, building, and securing systems through hands-on projects and continuous learning.",
  buttons: {
    about: {
      text: "View About",
      href: "/about/",
    },
    posts: {
      text: "Read Posts",
      href: "/posts/",
    },
  },
  images: { 
    light: "/assets/images/logo_mono_v3.svg",
    dark: "/assets/images/logo_mono_v3.svg",
  },
};

export const aboutContent = {
  meta: {
    title: "About - Your Portfolio",
    description: "Learn more about my background, skills, and experience",
  },
  title: "About Me",
  description:
    "This is where you can introduce yourself or your company. Share your story, mission, and values. Explain what makes you unique and why people should be interested in your work. Keep it concise but engaging.",
  skills: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Docker",
    "Git",
    "AWS",
  ],
  image: {
    src: "/assets/images/about/coder.jpg",
    alt: "Profile",
  },
  experience: {
    title: "Experience",
    items: [
      {
        period: "2022 - Present",
        position: "Senior Frontend Developer",
        company: "Tencent Cloud",
        description:
          "Leading frontend development for EdgeOne platform and templates.",
      },
      {
        period: "2020 - 2022",
        position: "Frontend Developer",
        company: "Tencent Cloud",
        description:
          "Developed and maintained multiple web applications and tools.",
      },
      {
        period: "2018 - 2020",
        position: "Junior Developer",
        company: "Tencent Cloud",
        description: "Worked on various client projects and internal tools.",
      },
    ],
  },
  connect: {
    title: "Let's Connect",
    description:
      "Feel free to reach out if you want to collaborate or just say hi! You can find us on social media or drop us an",
    email: {
      text: "email",
      href: "mailto:364786053@qq.com",
    },
  },
};

export const projectsContent = {
  meta: {
    title: "Projects - Your Portfolio",
    description: "Showcase of my best work and projects",
  },
  title: "Our Projects",
  description:
    "Here you can showcase your best work. Each project should include a brief description, the technologies used, and any notable achievements. This helps potential clients or employers understand your capabilities.",
  projects: [
    {
      title: "Project One",
      description:
        "A brief description of your first project. Explain what it does and what technologies you used.",
      image: "/assets/images/projects/project1.jpg",
      href: "#",
    },
    {
      title: "Project Two",
      description:
        "Describe your second project here. Highlight the key features and your role in development.",
      image: "/assets/images/projects/project2.jpg",
      href: "#",
    },
    {
      title: "Project Three",
      description:
        "Share details about your third project. What problems did it solve? What was the outcome?",
      image: "/assets/images/projects/project3.png",
      href: "#",
    },
  ],
};

