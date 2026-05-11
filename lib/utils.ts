/* eslint-disable import/order */
import { techMap } from "@/constants/techMap";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const techDescriptionMap: { [key: string]: string } = {
  javascript:
    "JavaScript is a powerful language for building dynamic, interactive, and modern web applications.",
  typescript:
    "TypeScript adds strong typing to JavaScript, making it great for scalable and maintainable applications.",
  react:
    "React is a popular library for building fast and modular user interfaces.",
  nextjs:
    "Next.js is a React framework for server-side rendering and building optimized applications.",
  nodejs:
    "Node.js allows you to run JavaScript on the server, enabling full-stack development with one language.",
  angular:
    "Angular is a comprehensive framework by Google for building large-scale, enterprise-grade web applications.",
  vuejs:
    "Vue.js is a progressive and approachable JavaScript framework for building user interfaces.",
  python:
    "Python is a versatile, beginner-friendly language used for web development, data science, and automation.",
  django:
    "Django is a high-level Python framework that encourages rapid development and clean, pragmatic design.",
  flask:
    "Flask is a lightweight and flexible Python framework perfect for small to medium web applications.",
  java: "Java is a robust, object-oriented language known for portability and enterprise application development.",
  spring:
    "Spring is a powerful Java framework for building enterprise-level applications and microservices.",
  go: "Go (Golang) is Google's language for building fast, concurrent, and efficient backend systems.",
  rust: "Rust is a systems programming language focused on safety, speed, and memory efficiency without garbage collection.",
  cplusplus:
    "C++ is a high-performance language for system programming, game development, and resource-intensive applications.",
  csharp:
    "C# is Microsoft's modern language for building Windows apps, games with Unity, and enterprise software.",
  php: "PHP is a server-side scripting language widely used for web development and content management systems.",
  laravel:
    "Laravel is an elegant PHP framework with expressive syntax for modern web applications.",
  ruby: "Ruby is a dynamic, object-oriented language known for its simplicity and developer happiness.",
  rails:
    "Rails is a full-stack web framework that makes Ruby development fast and convention-driven.",
  swift:
    "Swift is Apple's intuitive language for building iOS, macOS, and Apple ecosystem applications.",
  kotlin:
    "Kotlin is a modern language that runs on the JVM, officially supported for Android development.",
  postgresql:
    "PostgreSQL is an advanced, open-source relational database known for reliability and feature richness.",
  mysql:
    "MySQL is the world's most popular open-source relational database management system.",
  mongodb:
    "MongoDB is a leading NoSQL document database that stores data in flexible, JSON-like documents.",
  redis:
    "Redis is an in-memory data store used for caching, real-time applications, and high-performance scenarios.",
  sqlite:
    "SQLite is a lightweight, file-based database perfect for mobile apps, embedded systems, and small projects.",
  docker:
    "Docker containers package software with dependencies, ensuring consistency across different environments.",
  kubernetes:
    "Kubernetes automates deployment, scaling, and management of containerized applications.",
  aws: "Amazon Web Services is the leading cloud platform offering computing, storage, and hosting services.",
  azure:
    "Microsoft Azure is a comprehensive cloud computing platform with AI, analytics, and developer tools.",
  git: "Git is a distributed version control system for tracking code changes and team collaboration.",
  github:
    "GitHub is a platform for hosting code, collaboration, version control, and open-source development.",
  html5:
    "HTML5 is the standard markup language for creating the structure of web pages and applications.",
  css3: "CSS3 is used to style and visually enhance HTML elements, including layouts and animations.",
  tailwindcss:
    "Tailwind CSS is a utility-first framework for rapidly building custom designs without leaving your HTML.",
  bootstrap:
    "Bootstrap is a popular frontend component library for building responsive, mobile-first websites.",
  graphql:
    "GraphQL is a query language for APIs that lets clients request exactly the data they need.",
  express:
    "Express is a minimal and flexible Node.js web application framework for building APIs and web servers.",
  flutter:
    "Flutter is Google's UI toolkit for building natively compiled apps for mobile, web, and desktop from one codebase.",
  reactnative:
    "React Native allows you to build native mobile apps using React and JavaScript.",
  android:
    "Android development covers building apps for Google's mobile operating system using Kotlin or Java.",
  postman:
    "Postman is a popular tool for testing, documenting, and interacting with APIs.",
  figma:
    "Figma is a collaborative interface design tool used for UI/UX prototyping and design systems.",
  nginx:
    "Nginx is a high-performance web server, reverse proxy, and load balancer.",
  terraform:
    "Terraform enables infrastructure as code, letting you define cloud resources in configuration files.",
  jenkins:
    "Jenkins is an automation server for building, testing, and deploying code continuously.",
};
export const getTechDescription = (techName: string) => {
  const normalizedTechName = techName.replace(/[ .]/g, "").toLowerCase();
  return techDescriptionMap[normalizedTechName]
    ? techDescriptionMap[normalizedTechName]
    : `{techName} is a technology or tool widely used in web development, providing valuable features and capabilities.`;
};
export function getDeviconClassName(techName: string) {
  const normalizedTech = techName.replace(/[ .]/g, "").toLowerCase();

  // Dictionary mapping possible technology names to Devicon class names

  return techMap[normalizedTech]
    ? `${techMap[normalizedTech]} colored`
    : "devicon-devicon-plain";
}

export const getTimeStamp = (createdAt: Date) => {
  const date = new Date(createdAt);
  const now = new Date();
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);
  const units = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const unit of units) {
    const interval = Math.floor(secondsAgo / unit.seconds);
    if (interval >= 1) {
      return `${interval} ${unit.label} ${interval > 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
};

export const formatNumber = (number: number = 0) => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + "K";
  } else {
    return number.toString();
  }
};
