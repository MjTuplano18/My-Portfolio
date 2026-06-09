// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface ProfileData {
  name: string;
  location: string;
  tagline: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  image: string;
  initials: string;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: "work" | "education" | "milestone";
  description?: string;
}

export interface TechCategory {
  category: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  url?: string;
  domain?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url: string;
  image: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  image?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface Membership {
  name: string;
  url: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface AchievementBadge {
  title: string;
  url: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const profile: ProfileData = {
  name: "MJ Tuplano",
  location: "Bulacan, Philippines",
  tagline: "Aspiring Cloud Engineer / Data Engineer",
  email: "je875772@gmail.com",
  phone: "09151855519",
  github: "github.com/MjTuplano18",
  linkedin: "www.linkedin.com/in/mj-tuplano-295a6b297",
  facebook: "facebook.com/mj.tuplano.104",
  instagram: "instagram.com/justcallme_emdzey",
  image: "/src/assets/profile.jpg",
  initials: "MJ",
};

export const achievement: AchievementBadge = {
  title: "1st Place – CCIT Research Colloquium 2024",
  url: "https://github.com/MjTuplano18",
};

export const experience: ExperienceEntry[] = [
  {
    id: "exp-1",
    role: "Data Analyst / Fullstack Developer Intern",
    organization: "S.P. Madrid and Associates",
    period: "2026",
    type: "work",
    description:
      "Building full-stack web applications and performing data analysis for the firm.",
  },
  {
    id: "exp-2",
    role: "Data Analyst (BPO)",
    organization: "7Primetech Inc.",
    period: "2024",
    type: "work",
    description:
      "Handled customer payments, tracked deposits and withdrawals using banks in Indonesia and e-wallet platforms.",
  },
  {
    id: "exp-3",
    role: "Data Specialist (BPO)",
    organization: "IPP Technologies Inc.",
    period: "2022",
    type: "work",
    description:
      "Conducted outbound calls, assisted clients, and maintained detailed records of client interactions.",
  },
  {
    id: "exp-4",
    role: "BS Information Technology",
    organization: "Polytechnic University of the Philippines",
    period: "2022",
    type: "education",
    description:
      "Studying Information Technology with focus on software development and cloud computing.",
  },
  {
    id: "exp-5",
    role: "Hello World!",
    organization: "Wrote my first line of code",
    period: "2021",
    type: "milestone",
    description: "Wrote my first program and discovered the world of software development.",
  },
];

export const techStack: TechCategory[] = [
  {
    category: "Frontend",
    skills: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Streamlit",
      "React",
    ],
  },
  {
    category: "Backend & APIs",
    skills: [
      "Python",
      "Django",
      "FastAPI",
      "C",
      "Firebase",
      "Supabase",
    ],
  },
  {
    category: "Databases",
    skills: [
      "PostgreSQL",
      "MySQL",
      "SQL",
      "Neon Database",
    ],
  },
  {
    category: "Data Engineering",
    skills: [
      "Pandas",
      "NumPy",
      "dbt",
      "Airflow",
      "Apache",
      "Power BI",
      "Microsoft Excel",
    ],
  },
  {
    category: "Cloud & DevOps",
    skills: [
      "AWS",
      "Docker",
      "GitHub Actions",
      "Vercel",
    ],
  },
];

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "PayAnalytics",
    description: "Payroll analytics dashboard for workforce compensation insights.",
    url: "https://github.com/MjTuplano18/PayAnalytics",
    domain: "github.com/MjTuplano18/PayAnalytics",
  },
  {
    id: "proj-2",
    title: "TALASTOCK (ETL Data Platform)",
    description: "End-to-end ETL data platform for stock market data processing and analysis.",
    url: "https://github.com/MjTuplano18/TALASTOCK",
    domain: "github.com/MjTuplano18/TALASTOCK",
  },
  {
    id: "proj-3",
    title: "Payment Claim Bank Query Automation (Streamlit)",
    description: "Automated bank query processing tool built with Streamlit for payment claims.",
    url: "https://github.com/MjTuplano18/payment_claim_bank_query_automation_streamlit",
    domain: "github.com/MjTuplano18/Payment-Claim-Bank-Query",
  },
  {
    id: "proj-4",
    title: "PH Credit Pipeline (Snowflake + Power BI)",
    description: "Data pipeline for Philippine credit data using Snowflake and Power BI dashboards.",
    url: "https://github.com/MjTuplano18/PH-Credit-Pipeline",
    domain: "github.com/MjTuplano18/PH-Credit-Pipeline",
  },
  {
    id: "proj-5",
    title: "FitPulse",
    description: "Fitness tracking application with real-time health monitoring features.",
    url: "https://github.com/MjTuplano18/FitPulse",
    domain: "github.com/MjTuplano18/FitPulse",
  },
  {
    id: "proj-6",
    title: "NovaTech E-Commerce",
    description: "Full-featured e-commerce platform with modern UI and payment integration.",
    url: "https://github.com/MjTuplano18/NovaTech-E-Commerce",
    domain: "github.com/MjTuplano18/NovaTech-E-Commerce",
  },

];

export const certifications: Certification[] = [
  {
    id: "cert-1",
    title: "AWS Introduction to Cloud",
    issuer: "AWS",
    date: "2024",
    url: "https://www.credly.com/badges/5d9da0c2-8796-47b4-8af8-7e09fae0e7e9/public_url",
    image: "/cert-aws-cloud.png",
  },
  {
    id: "cert-2",
    title: "AWS Getting Started with Compute",
    issuer: "AWS",
    date: "2024",
    url: "https://www.credly.com/badges/0900af1a-38e8-47ae-88ce-d91443ea611b/public_url",
    image: "/cert-aws-compute.png",
  },
  {
    id: "cert-3",
    title: "AWS Getting Started with Storage ",
    issuer: "AWS",
    date: "2024",
    url: "https://www.credly.com/badges/259d3b46-8a3b-4f2b-bafc-113043200a72/public_url",
    image: "/cert-aws-storage.png",
  },
  {
    id: "cert-4",
    title: "Cisco Introduction to Cybersecurity",
    issuer: "Cisco",
    date: "2024",
    url: "https://www.credly.com/badges/cbf8185c-8df1-4da1-864b-f2a3e2cd8b82/public_url",
    image: "/cert-cisco-cyber.png",
  },
  {
    id: "cert-5",
    title: "Cisco Introduction to Packet Tracer",
    issuer: "Cisco",
    date: "2024",
    url: "https://www.credly.com/badges/7a8b5a98-242e-4730-b3ef-9517cf408e21/public_url",
    image: "/cert-cisco-packet.png",
  },
  {
    id: "cert-6",
    title: "Cisco Python Essentials 1",
    issuer: "Cisco",
    date: "2024",
    url: "https://www.credly.com/badges/0915a0fd-39c6-4c25-b365-fa9bce317e48/public_url",
    image: "/cert-cisco-python-essentials-1.png",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    quote:
      "MJ consistently showed initiative and a strong willingness to learn during his internship. He handled data tasks with care, picked up new tools quickly, and contributed meaningfully to the team's output.",
    name: "Vince Villanueva",
    title: "Data Analyst Team Lead, S.P. Madrid and Associates",
    image: "/recommendation/Mr.Vince.png",
  },
  {
    id: "test-2",
    quote:
      "Working with MJ was a great experience. He's reliable, asks the right questions, and isn't afraid to tackle unfamiliar problems. He has a bright future ahead in data and development.",
    name: "Anne Krishane Calisay",
    title: "Data Analyst Team Lead, S.P. Madrid and Associates",
    image: "/recommendation/Ms.Krishane.png",
  },
  {
    id: "test-3",
    quote:
      "MJ adapted well to our workflows and showed maturity beyond his experience level. He's proactive, detail-oriented, and a solid team player. I'd recommend him for any junior data or dev role.",
    name: "Kelvin Lopez",
    title: "Senior Supervisor, S.P. Madrid and Associates",
    image: "/recommendation/Mr.kelvin.png",
  },
];

export const memberships: Membership[] = [
  {
    name: "AWS User Group Philippines",
    url: "https://www.facebook.com/groups/awsugph",
  },
  {
    name: "Google Developer Groups Philippines",
    url: "https://gdg.community.dev/gdg-manila/",
  },
  {
    name: "Python Philippines",
    url: "https://python.ph/",
  },
];

export const gallery: GalleryImage[] = [
  { src: "/gallery/pic1.jpg", alt: "Team collaboration during hackathon event" },
  { src: "/gallery/pic2.jpg", alt: "Presenting project at tech conference" },
  { src: "/gallery/pic3.jpg", alt: "Coding session at the university lab" },
  { src: "/gallery/pic4.jpg", alt: "Receiving certificate at awards ceremony" },
  { src: "/gallery/pic5.jpg", alt: "Group photo with fellow developers" },
  { src: "/gallery/pic6.jpg", alt: "Working on cloud architecture diagrams" },
  { src: "/gallery/pic7.jpg", alt: "Campus event with tech community members" },
];

export const socialLinks = [
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/mj-tuplano-295a6b297",
    ariaLabel: "Visit LinkedIn profile",
  },
  {
    platform: "GitHub",
    url: "https://github.com/MjTuplano18",
    ariaLabel: "Visit GitHub profile",
  },
  {
    platform: "Facebook",
    url: "https://facebook.com/mj.tuplano.104",
    ariaLabel: "Visit Facebook profile",
  },
  {
    platform: "Instagram",
    url: "https://instagram.com/justcallme_emdzey",
    ariaLabel: "Visit Instagram profile",
  },
];

export const aboutParagraphs: string[] = [
  "I'm a BS Information Technology student with growing experience in data analytics, automation, and full-stack development. I use Python and Streamlit to build automation solutions, and I'm continuously developing my skills as a Data Analyst and Full-Stack Developer through hands-on internship work.",
  "During my internship, I supported report validation, built dashboards using Next.js, and helped streamline repetitive tasks for the data analyst team. I also worked with data extraction from databases and pipeline-related workflows, transforming raw data into structured Excel outputs with the required headers for reporting.",
  "I'm currently learning data engineering tools for end-to-end pipelines, including SQL, dbt, Apache Airflow, Python Pandas, Snowflake, and basic Power BI for visualization. Since I'm still early in my journey, I aim to keep learning, gain real experience, and build useful systems that make data work more efficient and reliable.",
];

export const aboutStats = [
  { label: "Projects", value: 7 },
  { label: "Certifications", value: 6 },
  { label: "Communities", value: 3 },
];
