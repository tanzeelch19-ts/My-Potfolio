// Edit this file to update your content — everything else reads from here.
import taskImg from "../assets/task-management.png";
import movieImg from "../assets/movieBox.png";
import ecommerceImg from "../assets/ecommerce-cart.png";
import weather from "../assets/weather.png";

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export const SOCIALS = {
  github: "https://github.com/tanzeelch19-ts",
  linkedin: "https://linkedin.com/in/tanzeelch19", // update with your real LinkedIn URL
  email: "tanzeelch19@gmail.com",
  phone: "0304784144",
};

export const SKILLS = [
  { name: "HTML", level: 90 },
  { name: "CSS", level: 85 },
  { name: "JavaScript", level: 85 },
  { name: "React", level: 80 },
  { name: "Vite", level: 75 },
  { name: "Tailwind CSS", level: 85 },
  { name: "Git", level: 80 },
  { name: "GitHub", level: 80 },
  { name: "REST APIs", level: 75 },
  { name: "React Router", level: 75 },
  { name: "LocalStorage", level: 80 },
];

export const PROJECTS = [
  {
    id: 1,
    image: taskImg,
    name: "Task Management Dashboard",
    description:
      "A task manager for organizing work into boards, tracking progress, and staying on top of deadlines.",
    tech: ["React", "Tailwind CSS", "LocalStorage"],
    github: SOCIALS.github,
    demo: "https://task-management-code.netlify.app",
  },
  {
    id: 2,
    image: movieImg,
    name: "Movie Explorer",
    description:
      "Search and browse movies with live data from the OMDB API — posters, ratings, and details at a glance.",
    tech: ["React", "REST APIs", "CSS"],
    github: SOCIALS.github,
    demo: "https://movie-box-code.netlify.app",
  },
  {
    id: 3,
    image: ecommerceImg,
    name: "E-Commerce Store",
    description:
      "A shopping experience with product listings, cart management, and a smooth checkout flow.",
    tech: ["React", "Tailwind CSS", "React Router"],
    github: SOCIALS.github,
    demo: "https://e-commerence-code.netlify.app",
  },
  {
  id: "weather-project",
  name: "Weather App",
  description: "A weather forecasting app that shows real-time conditions and forecasts based on location.",
  tech: ["React", "API", "JavaScript"],
  image: weather,
  github: SOCIALS.github,
  demo: "https://weather-project-rho-smoky.vercel.app",
},
];

export const ALL_TAGS = [
  "All",
  ...Array.from(new Set(PROJECTS.flatMap((p) => p.tech))),
];



export const CERTIFICATIONS = [
  "React - The Complete Guide (Udemy)",
  "JavaScript Algorithms and Data Structures (freeCodeCamp)",
];export const EXPERIENCE = [
  {
    title: "Frontend Developer — MarkDev",
    period: "2024 — Present",
    description:
      "Engineering scalable, production-grade interfaces in React — driving component architecture, performance optimization, and cross-functional delivery within a modern JavaScript stack.",
  },
  {
    title: "Independent Developer — Product Engineering",
    period: "Ongoing",
    description:
      "Designed and shipped a portfolio of full-stack React applications — including a Task Management Dashboard, Movie Explorer, and E-Commerce Store — spanning UI/UX, state architecture, API integration, and deployment.",
  },
  {
    title: "Open Source Contributor",
    period: "Ongoing",
    description:
      "Contributing fixes, features, and documentation improvements to community React projects — collaborating with maintainers through code review and issue triage.",
  },
  {
    title: "Freelance Web Development",
    period: "2023 — 2024",
    description:
      "Delivered custom websites and web apps for independent clients — handling requirements gathering, UI implementation, and deployment from start to finish.",
  },
];
export const EDUCATION = [
  {
    degree: "ICS (Intermediate in Computer Science)",
    institute: "Punjab College",
    period: "2 years",
  },
];
