export const siteConfig = {
  name: "Oscar Portfolio",
  title: "Os-DevSec Portfolio",
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
    "I'm Oscar, a student focused on cybersecurity, learning through hands-on labs, projects, and secure development practices. Working with me means collaborating with a motivated student who combines technical skills with proven leadership experience as President of the Computer Science Students Association.",
  skills: [
    "Linux",
    "Bash",
    "Python",
    "Golang",
    "SQL",
    "SIEM",
    "IDS",
    "Networking Basics",
    "Git",
    "AWS",
  ],
  image: {
    src: "/assets/images/about/perfil_sc.png",
    alt: "Profile",
  },
  experience: {
    title: "Experience",
    items: [
      {
        period: "Jan 2025 - Aug 2025",
        position: "IT Support Assistant (Semester Breaks)",
        company: "UIDE",
        description: [
            "Performed disk cloning, software installation, and system setup for institutional equipment.",
            "Assembled and deployed a new computer lab, including hardware preparation and operating system configuration.",
            "Provided basic technical support and maintenance for academic environments.",
        ]
      },
      {
        period: "2024 - Present",
        position: "Cybersecurity Student",
        company: "UIDE",
        description:
        [
          "Designed and executed a phishing awareness campaign using GoPhish and Evilginx in an academic environment, achieving 3rd place in a faculty-wide project competition.",
          "Conducted hands-on cybersecurity labs using Wazuh and pfSense, gaining practical experience in monitoring, detection, and network security.",
          "Regularly document cybersecurity write-ups and challenge solutions, strengthening practical skills in analysis, exploitation, and defense.",
        ]
      },
      {
        period: "2024 - Present",
        position: "President",
        company: "Computer Science Students Association",
        description: [
          "Worked on various client projects and internal tools.Organized and led technical talks and events with professionals specialized in cybersecurity, fostering knowledge sharing and community engagement.",
          "Coordinated teams, managed logistics, and worked with academic authorities, developing strong leadership and communication skills.",
        ]
      },
    ],
  },
  connect: {
    title: "Let's Connect",
    description:
      "Feel free to reach out if you want to collaborate or just say hi! You can find us on social media or drop us an",
    email: {
      text: "email",
      href: "mailto:oscaral.lara@gmail.com",
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
      title: "Phishing Campaign PoC",
      description:
        "A walkthrough of a phishing campaign I designed and executed using GoPhish and Evilginx, highlighting the strategies and tools used to simulate real-world attacks.",
      image: "/assets/images/projects/cover_phis.jpg",
      href: "/posts/phishing-campaign-poc",
    },
  ],
};

