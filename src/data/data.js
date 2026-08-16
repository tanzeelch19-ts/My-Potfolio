// Edit this file to update your content — everything else reads from here.
import taskImg from "../assets/task-management.png";
import movieImg from "../assets/movieBox.png";
import ecommerceImg from "../assets/ecommerce-cart.png";

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
    demo: "https://task-management-code.netlify.app/",
  },
  {
    id: 2,
    image: movieImg,
    name: "Movie Explorer",
    description:
      "Search and browse movies with live data from the OMDB API — posters, ratings, and details at a glance.",
    tech: ["React", "REST APIs", "CSS"],
    github: SOCIALS.github,
    demo: "https://movie-box-code.netlify.app/",
  },
  {
    id: 3,
    image: ecommerceImg,
    name: "E-Commerce Store",
    description:
      "A shopping experience with product listings, cart management, and a smooth checkout flow.",
    tech: ["React", "Tailwind CSS", "React Router"],
    github: SOCIALS.github,
    demo: "https://e-commerence-code.netlify.app/",
  },
];

export const ALL_TAGS = [
  "All",
  ...Array.from(new Set(PROJECTS.flatMap((p) => p.tech))),
];



export const CERTIFICATIONS = [
  "React - The Complete Guide (Udemy)",
  "JavaScript Algorithms and Data Structures (freeCodeCamp)",
];

export const EXPERIENCE = [
  {
    title: "Web Development — MarkDev",
    period: "Current",
    description:
      "Building and maintaining frontend features using React and modern tooling.",
  },
  {
    title: "Personal Projects",
    period: "Ongoing",
    description:
      "Task Management Dashboard, Movie Explorer, and E-Commerce Store — built end-to-end with React.",
  },
];

export const EDUCATION = [
  {
    degree: "ICS (Intermediate in Computer Science)",
    institute: "Punjab College",
    period: "2 years",
  },
];