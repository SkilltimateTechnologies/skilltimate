// Landing + course datasets ported from the source design.

export interface Clip {
  src: string; date: string; rot: string; tapeX: string; tapeW: string; tapeRot: string; note: boolean; head: string; body: string;
}
export interface Included { icon: string; title: string; body: string }
export interface Quote { text: string; initial: string; name: string; role: string; cert: string }
export interface Faq { q: string; a: string }

export const CLIPS: Clip[] = [
  { src: "Reuters · Naukri JobSpeak", date: "2026", rot: "-1.6deg", tapeX: "38%", tapeW: "104px", tapeRot: "-6deg", note: true, head: "AI hiring rose 16% — while overall IT postings fell 3%", body: "India's IT sector is splitting in two: AI-skilled roles are growing while generalist postings shrink. AI and ML roles grew 25% across 14 non-IT sectors, led by insurance and consumer goods." },
  { src: "Nasscom", date: "2026", rot: "1.1deg", tapeX: "46%", tapeW: "88px", tapeRot: "4deg", note: false, head: "India needs 1 million more AI-skilled professionals", body: "India leads the world in AI skill penetration — yet the talent gap keeps widening as adoption outruns training. The shortage is your opening: certified candidates skip the queue." },
  { src: "India Skills Report", date: "2026", rot: "-0.5deg", tapeX: "40%", tapeW: "96px", tapeRot: "3deg", note: false, head: "80% of employers can't find the right candidates", body: "With 1.28 crore jobs projected, hiring has turned skills-led: employers now prefer proven, verifiable skill over a better degree — a complete reversal from 2020." },
  { src: "Naukri JobSpeak", date: "2026", rot: "-1.2deg", tapeX: "44%", tapeW: "92px", tapeRot: "-4deg", note: false, head: "AI-linked hiring to grow 32% — nearly 3.8 lakh roles", body: "AI-linked hiring in India is projected to expand by roughly a third this year, concentrated in roles where candidates can prove what they can actually build and operate." },
  { src: "ServiceNow Research", date: "Report", rot: "1deg", tapeX: "37%", tapeW: "100px", tapeRot: "5deg", note: false, head: "2.73 million new tech jobs in India by 2028", body: "New technologies — led by AI and cloud — are projected to create millions of fresh technology roles in India this decade. The jobs are coming; the question is who's ready." },
  { src: "Nasscom · GCC Data", date: "2026", rot: "-0.7deg", tapeX: "45%", tapeW: "90px", tapeRot: "-5deg", note: true, head: "40%+ of GCC tech roles face a skills gap", body: "Global Capability Centers report severe shortages in niche skills — and pay certified, specialised candidates premiums of up to 1.7× over adjacent roles." },
];

export const INCLUDED: Included[] = [
  { icon: "M12 3a9 9 0 1 0 9 9M12 7v5l3 2", title: "Learn at your pace", body: "Short, focused lessons you can watch anytime, on any device. No fixed timings — pause, rewind, repeat." },
  { icon: "M12 3a6 6 0 0 1 4 10.5c-1 .9-1.4 1.7-1.5 3h-5c-.1-1.3-.5-2.1-1.5-3A6 6 0 0 1 12 3ZM9.5 20h5M10.5 22h3", title: "Easy-to-explain classes", body: "Complex topics broken down in plain language with real examples. If you can follow a YouTube video, you can learn this." },
  { icon: "M12 12c-2.5-3.5-4-4.5-6-4.5a4.5 4.5 0 0 0 0 9c2 0 3.5-1 6-4.5Zm0 0c2.5-3.5 4-4.5 6-4.5a4.5 4.5 0 0 1 0 9c-2 0-3.5-1-6-4.5Z", title: "Unlimited mock tests on web", body: "Full-length, timed practice exams in your browser — attempt as many times as you need until you're consistently passing." },
  { icon: "M12 4a8 8 0 1 0 8 8M9 12l2.5 2.5L20 6", title: "Exam-day support", body: "Study-guide-aligned prep, doubt support, exam booking guidance, and résumé + LinkedIn positioning once certified." },
];

export const LANDING_QUOTES: Quote[] = [
  { text: "\u201CI cleared AI-900 in my final year and it came up in every single placement interview. Two offers later, I'm joining as a junior AI engineer.\u201D", initial: "P", name: "Priya R.", role: "B.Tech final year, Hyderabad", cert: "AI-900 CERTIFIED" },
  { text: "\u201CI studied at night after work, at my own speed. The lessons are so simply explained that I never once felt lost. Passed AZ-900 in five weeks.\u201D", initial: "S", name: "Srinivas K.", role: "Cloud Administrator, GCC", cert: "AZ-900 CERTIFIED" },
  { text: "\u201CJoined the first AB-900 batch on a hunch. Our org is rolling out Copilot and suddenly I'm the go-to person in every meeting.\u201D", initial: "A", name: "Ayesha M.", role: "M365 Administrator", cert: "AB-900 FIRST COHORT" },
];

export const LANDING_FAQS: Faq[] = [
  { q: "I have zero IT background. Can I do this?", a: "Yes. All four courses — AI-900, AZ-900, AB-900 and DP-900 — are official Microsoft \u201CFundamentals\u201D exams designed for beginners. No coding or prior cloud experience required, and every lesson is explained in plain, simple language." },
  { q: "Can I really learn at my own pace?", a: "Completely. All classes are short, on-demand video lessons you can watch anytime, on any device. Study an hour a night or binge on weekends — the schedule is yours. Most learners are exam-ready in 4–6 weeks." },
  { q: "How do unlimited mock tests work?", a: "You get web access to full-length, timed practice exams for your course — attempt them as many times as you want, with detailed answer explanations, until your scores say you're ready." },
  { q: "What if I don't pass?", a: "You keep your full course access and unlimited mock tests, free, until you clear the exam. We succeed only when you're certified." },
  { q: "Why only 4 courses?", a: "Focus. These four cover the exact foundations the market is hiring for — AI, cloud, Copilot administration, and data. A smaller catalog means deeper teaching and better pass rates." },
  { q: "Why AB-900 when nobody's asked me for it yet?", a: "That's exactly the point. The exam launched in 2026, so the field of certified holders is nearly empty. Early holders stand out sharply as organizations roll out Copilot — by the time everyone's asking for it, you'll already have it." },
];

export const TICKER = [
  { src: "Reuters / Naukri JobSpeak:", t: "AI hiring up 16% while overall IT postings fell" },
  { src: "Nasscom:", t: "India needs 1 million more AI-skilled professionals" },
  { src: "India Skills Report:", t: "80% of employers can't find the right candidates" },
  { src: "Nasscom–Oliver Wyman:", t: "14 million cloud jobs projected in India" },
  { src: "Lightcast:", t: "roles listing AI skills pay a 43% premium" },
];

// -------- Course dataset --------
export interface CourseFact { k: string; v: string }
export interface CourseWhy { stat: string; title: string; body: string }
export interface CourseDomain { name: string; weight: string; bar: string }
export interface CourseModule { no: string; title: string; body: string }
export interface CourseSample { q: string; options: { k: string; t: string }[]; answer: string; explain: string }
export interface CourseArticleRef { tag: string; title: string; blurb: string }
export interface CourseData {
  code: string; name: string; accent: string; level: string; tagline: string; officialUrl: string;
  facts: CourseFact[]; whyHead: string; whySub: string; why: CourseWhy[];
  domains: CourseDomain[]; modules: CourseModule[]; sample: CourseSample;
  quotes: Quote[]; articles: CourseArticleRef[];
}

export const COURSE_DATA: Record<string, CourseData> = {
  "ai-900": {
    code: "AI-900", name: "Azure AI Fundamentals", accent: "#2E8FFF",
    level: "Fundamentals · Beginner",
    tagline: "Understand AI, machine learning and generative AI on Azure — with zero coding. The starting line for every AI career.",
    officialUrl: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-900",
    facts: [
      { k: "Level", v: "Fundamentals" }, { k: "Duration", v: "45–60 min" },
      { k: "Questions", v: "40–60" }, { k: "Passing score", v: "700 / 1000" },
      { k: "Format", v: "Online proctored" }, { k: "Validity", v: "Never expires" },
    ],
    whyHead: "AI fundamentals are the new baseline.",
    whySub: "Recruiters have stopped treating AI literacy as optional — and AI-900 is how you prove it.",
    why: [
      { stat: "+25%", title: "AI roles are growing", body: "AI & ML hiring is rising across sectors even as generalist IT postings shrink. Fundamentals are the entry ticket." },
      { stat: "1st", title: "The universal starting point", body: "AI-900 is the credential every AI, data and cloud path builds on — the fastest way to signal you're serious." },
      { stat: "New", title: "Generative AI is now examined", body: "The exam now covers Azure OpenAI, GPT and responsible AI — the exact skills employers are searching for today." },
    ],
    domains: [
      { name: "Describe Artificial Intelligence workloads and considerations", weight: "15–20%", bar: "20%" },
      { name: "Describe fundamental principles of machine learning on Azure", weight: "15–20%", bar: "20%" },
      { name: "Describe features of computer vision workloads on Azure", weight: "15–20%", bar: "20%" },
      { name: "Describe features of Natural Language Processing (NLP) workloads", weight: "15–20%", bar: "20%" },
      { name: "Describe features of generative AI workloads on Azure", weight: "20–25%", bar: "25%" },
    ],
    modules: [
      { no: "01", title: "AI foundations: AI, ML and deep learning", body: "What artificial intelligence actually is, how machine learning and deep learning fit inside it, and the common AI workloads you'll see in the real world." },
      { no: "02", title: "Responsible AI: the six Microsoft principles", body: "Fairness, reliability & safety, privacy & security, inclusiveness, transparency and accountability — with practical examples of each." },
      { no: "03", title: "Machine learning on Azure", body: "Core ML concepts, the Azure Machine Learning workspace, AutoML and how models are trained, evaluated and deployed — no maths-heavy detour." },
      { no: "04", title: "Computer vision workloads", body: "Image analysis, OCR, object detection and face services with Azure AI Vision, and when to use each." },
      { no: "05", title: "Natural language processing", body: "Text analytics, sentiment, entity recognition, question answering, speech and translation with Azure AI Language and Speech." },
      { no: "06", title: "Generative AI & Azure OpenAI", body: "How large language models, GPT and Copilot work, prompt basics, and using Azure OpenAI responsibly." },
    ],
    sample: {
      q: "You need to automatically extract printed text from scanned invoices. Which Azure AI capability should you use?",
      options: [{ k: "A", t: "OCR (Azure AI Vision)" }, { k: "B", t: "Sentiment analysis" }, { k: "C", t: "Anomaly detection" }, { k: "D", t: "Speech-to-text" }],
      answer: "A — OCR / Read in Azure AI Vision",
      explain: "The Read (OCR) capability in Azure AI Vision extracts printed and handwritten text from images and documents. Sentiment and speech services work on text/audio, not scanned images.",
    },
    quotes: [
      { text: "\u201CI cleared AI-900 in my final year and it came up in every single placement interview. Two offers later, I'm joining as a junior AI engineer.\u201D", initial: "P", name: "Priya R.", role: "B.Tech final year, Hyderabad", cert: "AI-900 CERTIFIED" },
      { text: "\u201CNo coding background at all, but the lessons made generative AI finally click. Passed comfortably in three weeks of evenings.\u201D", initial: "N", name: "Naveen G.", role: "Business Analyst", cert: "AI-900 CERTIFIED" },
      { text: "\u201CThe mock tests were almost identical in style to the real exam. I walked in already knowing the format.\u201D", initial: "K", name: "Kavya S.", role: "Fresher, Bengaluru", cert: "AI-900 CERTIFIED" },
    ],
    articles: [
      { tag: "Compare", title: "AI-900 vs AZ-900: which should you take first?", blurb: "Two beginner exams, two different doors. How to pick based on the job you want." },
      { tag: "Careers", title: "What an AI-900 is actually worth in India", blurb: "The roles it opens, and how to position it on your résumé and LinkedIn." },
      { tag: "Update", title: "Generative AI on the AI-900: what changed", blurb: "Azure OpenAI, GPT and responsible AI are now examinable. Here's what to study." },
      { tag: "Study plan", title: "Zero to AI-900 in 4 weeks", blurb: "A realistic self-paced plan around a full-time job or college." },
    ],
  },
  "ab-900": {
    code: "AB-900", name: "Copilot & Agent Administration", accent: "#E7B94C",
    level: "Fundamentals · New 2026",
    tagline: "Configure, secure and govern Microsoft 365 Copilot and AI agents — the newest Microsoft credential on Earth. Walk in first.",
    officialUrl: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ab-900",
    facts: [
      { k: "Level", v: "Fundamentals" }, { k: "Duration", v: "45 min" },
      { k: "Questions", v: "~60" }, { k: "Passing score", v: "700 / 1000" },
      { k: "Format", v: "Online proctored" }, { k: "Validity", v: "Never expires" },
    ],
    whyHead: "The rarest Microsoft badge in India — for now.",
    whySub: "AB-900 went generally available in 2026. Almost nobody holds it yet, and every Copilot rollout will soon need someone who does.",
    why: [
      { stat: "2026", title: "Brand-new credential", body: "Microsoft launched the Copilot & Agent Administration exam in 2026. The field of certified holders is nearly empty." },
      { stat: "Every", title: "Copilot rollout needs an admin", body: "Organisations deploying Copilot need people who can govern licensing, access, prompts and data protection safely." },
      { stat: "1st", title: "First-mover premium", body: "In 18 months this badge will be common. Today it makes you the only certified person in the room." },
    ],
    domains: [
      { name: "Identify Microsoft 365 core features, services and objects", weight: "20–25%", bar: "25%" },
      { name: "Perform basic administrative tasks for Copilot and agents", weight: "25–30%", bar: "30%" },
      { name: "Manage security, compliance and data protection with Microsoft Purview", weight: "45–50%", bar: "50%" },
    ],
    modules: [
      { no: "01", title: "Microsoft 365 tenant, admin centers & core objects", body: "Users, groups, teams, sites and libraries, and the admin centers — Microsoft 365, Exchange, SharePoint, Teams, Entra, Purview — you'll work in." },
      { no: "02", title: "Licensing & access control for Copilot", body: "How license types assigned to users and groups control access to Copilot and Microsoft 365 features, and how to enable or disable Copilot." },
      { no: "03", title: "Enabling, configuring & governing Copilot", body: "Prompt governance, billing and usage monitoring, and strategies for tracking and driving adoption across the organisation." },
      { no: "04", title: "Building, testing & publishing agents", body: "Creating, editing, testing and publishing agents, and configuring user access and permissions for them." },
      { no: "05", title: "Agent lifecycle, approval & monitoring", body: "Managing agent approval and governance, and monitoring usage, operational insights and the agent lifecycle from the admin centers." },
      { no: "06", title: "Data protection & compliance with Purview", body: "Applying data protection, sensitivity and governance controls so Copilot and agents stay compliant with organisational policy." },
    ],
    sample: {
      q: "A user must be prevented from using Microsoft 365 Copilot while keeping access to their other Microsoft 365 apps. What should you do?",
      options: [{ k: "A", t: "Delete the user account" }, { k: "B", t: "Unassign the Microsoft 365 Copilot license" }, { k: "C", t: "Block sign-in with Conditional Access" }, { k: "D", t: "Remove the user from all groups" }],
      answer: "B — Unassign the Copilot license",
      explain: "Copilot access is controlled by its own license, independently of other Microsoft 365 apps. Removing that license disables Copilot for the user while leaving the rest of their access intact.",
    },
    quotes: [
      { text: "\u201CJoined the first AB-900 batch on a hunch. Our org is rolling out Copilot and suddenly I'm the go-to person in every meeting.\u201D", initial: "A", name: "Ayesha M.", role: "M365 Administrator", cert: "AB-900 FIRST COHORT" },
      { text: "\u201CBeing certified before the wave hit meant I got pulled into the Copilot governance project. Best career bet I've made.\u201D", initial: "R", name: "Rahul V.", role: "IT Support Lead", cert: "AB-900 CERTIFIED" },
      { text: "\u201CThe Purview and data-protection part sounds scary but the classes broke it down simply. Passed first attempt.\u201D", initial: "D", name: "Divya P.", role: "Power Platform Admin", cert: "AB-900 CERTIFIED" },
    ],
    articles: [
      { tag: "Opinion", title: "Why AB-900 is 2026's most future-proof cert", blurb: "A new exam, a nearly empty field, and a hiring wave that hasn't peaked yet." },
      { tag: "Guide", title: "Copilot governance 101 for M365 admins", blurb: "Licensing, prompt controls, data protection — the admin's mental model." },
      { tag: "Explainer", title: "AI agents in Microsoft 365, explained simply", blurb: "What agents are, how they're built, approved and monitored." },
      { tag: "Careers", title: "The case for certifying first", blurb: "Why early holders of a brand-new credential stand out the most." },
    ],
  },
  "az-900": {
    code: "AZ-900", name: "Azure Fundamentals", accent: "#22C7E6",
    level: "Fundamentals · Beginner",
    tagline: "The proven on-ramp to a cloud career — core Azure services, security, pricing and governance, all in plain language.",
    officialUrl: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900",
    facts: [
      { k: "Level", v: "Fundamentals" }, { k: "Duration", v: "45–60 min" },
      { k: "Questions", v: "40–60" }, { k: "Passing score", v: "700 / 1000" },
      { k: "Format", v: "Online proctored" }, { k: "Validity", v: "Never expires" },
    ],
    whyHead: "Cloud is where the jobs are.",
    whySub: "Azure dominates Indian enterprise, and AZ-900 is the credential recruiters filter for first.",
    why: [
      { stat: "14M", title: "Cloud jobs projected in India", body: "Nasscom & Oliver Wyman project millions of cloud roles this decade, with Azure leading at banks and insurers." },
      { stat: "#1", title: "Azure runs Indian enterprise", body: "From BFSI to GCCs, Azure is the default cloud — making AZ-900 an instantly recognisable signal." },
      { stat: "Filter", title: "The credential recruiters screen for", body: "AZ-900 is one of the most-requested fundamentals certs on Indian job listings. It gets you past the first filter." },
    ],
    domains: [
      { name: "Describe cloud concepts", weight: "25–30%", bar: "30%" },
      { name: "Describe Azure architecture and services", weight: "35–40%", bar: "40%" },
      { name: "Describe Azure management and governance", weight: "30–35%", bar: "35%" },
    ],
    modules: [
      { no: "01", title: "Cloud concepts: IaaS, PaaS, SaaS", body: "Cloud service and deployment models, the shared responsibility model, and the benefits of cloud — capex vs opex, scalability, reliability." },
      { no: "02", title: "Core Azure architecture", body: "Regions, region pairs, availability zones, resource groups, subscriptions and management groups — how Azure is organised." },
      { no: "03", title: "Compute & networking services", body: "Virtual machines, App Service, containers, functions, plus virtual networks, VPN and load balancing — what each is for." },
      { no: "04", title: "Storage services & data options", body: "Blob, file, disk and queue storage, redundancy options and how to move data into Azure." },
      { no: "05", title: "Identity, access & security", body: "Microsoft Entra ID, authentication, single sign-on, conditional access and Microsoft Defender for Cloud." },
      { no: "06", title: "Cost, SLAs & governance", body: "Pricing and TCO calculators, cost management, service-level agreements, Azure Policy, tags and the governance tools." },
    ],
    sample: {
      q: "Which cloud service model gives you the most control over the operating system, while Microsoft manages the physical hardware?",
      options: [{ k: "A", t: "Software as a Service (SaaS)" }, { k: "B", t: "Platform as a Service (PaaS)" }, { k: "C", t: "Infrastructure as a Service (IaaS)" }, { k: "D", t: "Function as a Service (FaaS)" }],
      answer: "C — Infrastructure as a Service (IaaS)",
      explain: "IaaS gives you control over the OS and runtime while the provider manages the physical infrastructure. PaaS and SaaS abstract progressively more away from you.",
    },
    quotes: [
      { text: "\u201CI studied at night after work, at my own speed. The lessons are so simply explained that I never once felt lost. Passed AZ-900 in five weeks.\u201D", initial: "S", name: "Srinivas K.", role: "Cloud Administrator, GCC", cert: "AZ-900 CERTIFIED" },
      { text: "\u201CSwitched from a non-tech role. AZ-900 gave me the vocabulary to even sit in cloud interviews — and then to clear them.\u201D", initial: "M", name: "Meena J.", role: "Career switcher", cert: "AZ-900 CERTIFIED" },
      { text: "\u201CThe pricing and governance topics finally made sense with real examples. Straightforward pass.\u201D", initial: "T", name: "Tarun B.", role: "Support Engineer", cert: "AZ-900 CERTIFIED" },
    ],
    articles: [
      { tag: "Careers", title: "AZ-900: the fastest on-ramp to cloud in India", blurb: "Why this is the cert most Indian cloud careers start with." },
      { tag: "Basics", title: "IaaS vs PaaS vs SaaS, explained simply", blurb: "The one concept the exam keeps testing — made intuitive." },
      { tag: "Stack", title: "How AZ-900 pairs with AI-900 and DP-900", blurb: "Building a fundamentals trio that recruiters love." },
      { tag: "Exam", title: "AZ-900 exam-day checklist & common traps", blurb: "The wording tricks and topics people underestimate." },
    ],
  },
  "dp-900": {
    code: "DP-900", name: "Azure Data Fundamentals", accent: "#9B7BFF",
    level: "Fundamentals · Beginner",
    tagline: "Every AI system runs on data. Learn core data concepts and analytics on Azure — from zero to exam-ready.",
    officialUrl: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-900",
    facts: [
      { k: "Level", v: "Fundamentals" }, { k: "Duration", v: "45–60 min" },
      { k: "Questions", v: "40–60" }, { k: "Passing score", v: "700 / 1000" },
      { k: "Format", v: "Online proctored" }, { k: "Validity", v: "Never expires" },
    ],
    whyHead: "Data is the fuel every AI job runs on.",
    whySub: "Behind every AI and cloud role is a data foundation — and DP-900 is the credential that proves you have it.",
    why: [
      { stat: "Fuel", title: "AI is built on data", body: "Models are only as good as the data behind them. Data literacy is the quiet prerequisite for AI and analytics roles." },
      { stat: "Fast", title: "Analytics roles are surging", body: "Data analyst and engineering roles are among the fastest-growing in India's tech hiring." },
      { stat: "Path", title: "Gateway to data engineering", body: "DP-900 is the first step toward DP-203 and a full data-engineering career on Azure." },
    ],
    domains: [
      { name: "Describe core data concepts", weight: "25–30%", bar: "30%" },
      { name: "Identify considerations for relational data on Azure", weight: "20–25%", bar: "25%" },
      { name: "Describe considerations for working with non-relational data", weight: "15–20%", bar: "20%" },
      { name: "Describe an analytics workload on Azure", weight: "25–30%", bar: "30%" },
    ],
    modules: [
      { no: "01", title: "Core data concepts", body: "Relational vs non-relational data, structured, semi-structured and unstructured data, and transactional vs analytical workloads." },
      { no: "02", title: "Roles & responsibilities in data", body: "What database administrators, data engineers and data analysts actually do — and where you fit." },
      { no: "03", title: "Relational data on Azure", body: "The Azure SQL family — Azure SQL Database, Managed Instance and SQL on VMs — plus MySQL and PostgreSQL options." },
      { no: "04", title: "Non-relational data on Azure", body: "Azure Cosmos DB, table, blob and file storage, and when a non-relational store is the right choice." },
      { no: "05", title: "Modern data warehousing & analytics", body: "Data ingestion and processing, Azure Synapse Analytics and Microsoft Fabric, and the modern analytics pipeline." },
      { no: "06", title: "Data visualization with Power BI", body: "Turning data into dashboards and reports, and the role of visualization in the analytics workflow." },
    ],
    sample: {
      q: "Which Azure service is best suited for storing highly-structured, transactional relational data?",
      options: [{ k: "A", t: "Azure Blob Storage" }, { k: "B", t: "Azure Cosmos DB" }, { k: "C", t: "Azure SQL Database" }, { k: "D", t: "Azure Table Storage" }],
      answer: "C — Azure SQL Database",
      explain: "Azure SQL Database (part of the Azure SQL family) is a managed relational database built for structured, transactional workloads. Cosmos DB and Table/Blob storage are non-relational options.",
    },
    quotes: [
      { text: "\u201CI wanted analytics, not just theory. DP-900 gave me the data vocabulary and the mock tests kept me honest. Cleared it in a month.\u201D", initial: "R", name: "Ravi T.", role: "Aspiring Data Analyst", cert: "DP-900 CERTIFIED" },
      { text: "\u201CThe relational vs non-relational stuff finally made sense with the examples. Now moving on to DP-203.\u201D", initial: "S", name: "Sneha L.", role: "BI Trainee", cert: "DP-900 CERTIFIED" },
      { text: "\u201CSelf-paced was perfect around my job. Simple explanations, no jargon dumps. Passed first go.\u201D", initial: "H", name: "Harish N.", role: "Ops Analyst", cert: "DP-900 CERTIFIED" },
    ],
    articles: [
      { tag: "Careers", title: "Why data skills underpin every AI job", blurb: "The prerequisite nobody advertises — and how to prove you have it." },
      { tag: "Basics", title: "Relational vs non-relational data for beginners", blurb: "When to reach for SQL, and when not to." },
      { tag: "Roadmap", title: "From DP-900 to data engineer", blurb: "The path from fundamentals to DP-203 and a real data role." },
      { tag: "Trends", title: "Microsoft Fabric and the future of analytics", blurb: "What Fabric changes, and why it matters for the exam." },
    ],
  },
};

export const COURSE_ORDER = ["ab-900", "ai-900", "az-900", "dp-900"];

export const ARTICLE_SLUGS: Record<string, string[]> = {
  "ai-900": ["ai-900-vs-az-900", "ai-900-worth-india", "ai-900-generative-ai", "ai-900-4-weeks"],
  "ab-900": ["ab-900-future-proof", "ab-900-copilot-governance", "ab-900-agents-explained", "ab-900-certify-first"],
  "az-900": ["az-900-onramp", "az-900-iaas-paas-saas", "az-900-fundamentals-trio", "az-900-exam-day"],
  "dp-900": ["dp-900-data-underpins-ai", "dp-900-relational-vs-non", "dp-900-to-data-engineer", "dp-900-fabric"],
};
