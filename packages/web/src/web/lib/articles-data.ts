// Shared article + blog content for Skilltimate.

export interface CourseMeta { code: string; name: string; accent: string; file: string }
export interface ArticleBlock { t: "p" | "list"; x?: string; items?: string[] }
export interface ArticleSection { h: string; blocks: ArticleBlock[] }
export interface ArticleFaq { q: string; a: string }
export interface Article {
  slug: string; course: string; tag: string; title: string; blurb: string;
  date: string; dateLabel: string; readTime: string; lead: string;
  sections: ArticleSection[]; takeaways: string[]; faq: ArticleFaq[]; related: string[];
}

export const COURSES: Record<string, CourseMeta> = {
  "ai-900": { code: "AI-900", name: "Azure AI Fundamentals", accent: "#2E8FFF", file: "AI-900.dc.html" },
  "ab-900": { code: "AB-900", name: "Copilot & Agent Administration", accent: "#E7B94C", file: "AB-900.dc.html" },
  "az-900": { code: "AZ-900", name: "Azure Fundamentals", accent: "#22C7E6", file: "AZ-900.dc.html" },
  "dp-900": { code: "DP-900", name: "Azure Data Fundamentals", accent: "#9B7BFF", file: "DP-900.dc.html" }
};

export const ARTICLES: Article[] = [
  // ---------------- AI-900 ----------------
  {
    slug: "ai-900-vs-az-900",
    course: "ai-900", tag: "Compare",
    title: "AI-900 vs AZ-900: which should you take first?",
    blurb: "Two beginner exams, two different doors. How to pick based on the job you want.",
    date: "2026-02-18", dateLabel: "18 Feb 2026", readTime: "6 min read",
    lead: "AI-900 and AZ-900 are the two most popular Microsoft fundamentals exams in India, and they sit at almost the same difficulty. So the real question is not which is easier — it's which one points at the job you actually want.",
    sections: [
      { h: "What each exam actually proves", blocks: [
        { t: "p", x: "AI-900 (Azure AI Fundamentals) proves you understand artificial intelligence, machine learning and generative AI at a conceptual level — no coding, no maths-heavy detours. AZ-900 (Azure Fundamentals) proves you understand cloud computing itself: core Azure services, security, pricing and governance." },
        { t: "p", x: "Both are beginner-level, both never expire, and both take around 45–60 minutes. Neither has a prerequisite. You can take them in any order." }
      ]},
      { h: "Pick by the role you're aiming for", blocks: [
        { t: "list", items: [
          "Want an AI, data-science-adjacent or 'AI literacy' role? Start with AI-900 — it maps directly to the language recruiters now expect.",
          "Want cloud administration, support, DevOps or a general IT foundation? Start with AZ-900 — it's the credential most Indian cloud job listings screen for first.",
          "Not sure yet? AZ-900 is the safer default because cloud fundamentals underpin almost every other Microsoft path." ]}
      ]},
      { h: "The honest recommendation", blocks: [
        { t: "p", x: "If AI is the reason you're here, take AI-900 first — it keeps you motivated and it's the most in-demand fundamentals badge of 2026. If you want the broadest possible foundation, take AZ-900 first, then stack AI-900 on top. Many of our learners do both within a couple of months, and together they read very strongly on a résumé." }
      ]}
    ],
    takeaways: [
      "Both are beginner exams at similar difficulty — order is a strategy choice, not a difficulty one.",
      "AI-900 signals AI literacy; AZ-900 signals cloud fundamentals.",
      "Doing both, in either order, is the strongest fundamentals story for a fresher."
    ],
    faq: [
      { q: "Is AI-900 harder than AZ-900?", a: "No. They are both fundamentals-level exams with a 700/1000 pass mark and no prerequisites. Most learners find them comparable in difficulty." },
      { q: "Can I take both?", a: "Yes, and we recommend it. Together they cover AI and cloud fundamentals — a combination recruiters in India value highly." },
      { q: "Do these certifications expire?", a: "No. Microsoft fundamentals certifications do not expire once earned." }
    ],
    related: ["ai-900-worth-india", "az-900-fundamentals-trio", "ai-900-4-weeks"]
  },
  {
    slug: "ai-900-worth-india",
    course: "ai-900", tag: "Careers",
    title: "What an AI-900 is actually worth in India",
    blurb: "The roles it opens, and how to position it on your résumé and LinkedIn.",
    date: "2026-02-12", dateLabel: "12 Feb 2026", readTime: "7 min read",
    lead: "AI-900 will not, on its own, make you an AI engineer. What it does is get you past the first filter — and in a hiring market flooded with applications, that first filter is where most freshers quietly disappear.",
    sections: [
      { h: "What AI-900 opens", blocks: [
        { t: "p", x: "Think of AI-900 as proof of AI literacy. It signals to a recruiter that you understand the vocabulary — machine learning, generative AI, responsible AI — well enough to be useful in a team building or adopting AI." },
        { t: "list", items: [
          "Junior / trainee roles in AI, data and analytics teams",
          "Business analyst, product and support roles where AI understanding is now expected",
          "A credible starting point before deeper certs like AI-102 or DP-100" ]}
      ]},
      { h: "How to position it", blocks: [
        { t: "p", x: "Don't bury it. Put 'Microsoft Certified: Azure AI Fundamentals (AI-900)' in your headline and your certifications section, and add the official Credly badge to LinkedIn. In interviews, pair it with a small project — even a no-code one — so the badge reads as applied knowledge, not a box ticked." }
      ]},
      { h: "A realistic expectation", blocks: [
        { t: "p", x: "AI-900 is a door-opener, not a salary guarantee. Its value is highest for students, freshers and career-switchers who need something concrete and recognised to show. Combine it with AZ-900 and a portfolio project and it becomes a genuinely strong entry-level story." }
      ]}
    ],
    takeaways: [
      "AI-900's real value is getting you past résumé screening as a fresher or switcher.",
      "Put it in your LinkedIn headline and add the Credly badge.",
      "Pair it with a small project so it reads as applied, not theoretical."
    ],
    faq: [
      { q: "Will AI-900 get me an AI job on its own?", a: "It helps you get shortlisted, but you'll want to pair it with projects and ideally a second cert. It's a foundation, not a finish line." },
      { q: "Is AI-900 recognised by Indian employers?", a: "Yes. It's an official Microsoft certification and one of the most requested fundamentals badges on Indian job listings." }
    ],
    related: ["ai-900-vs-az-900", "ai-900-4-weeks", "dp-900-data-underpins-ai"]
  },
  {
    slug: "ai-900-generative-ai",
    course: "ai-900", tag: "Update",
    title: "Generative AI on the AI-900: what changed",
    blurb: "Azure OpenAI, GPT and responsible AI are now examinable. Here's what to study.",
    date: "2026-01-28", dateLabel: "28 Jan 2026", readTime: "5 min read",
    lead: "The AI-900 exam was refreshed to reflect how much generative AI has taken over the field. If you're studying from older material, you're missing one of the most heavily weighted parts of the current exam.",
    sections: [
      { h: "What's new", blocks: [
        { t: "p", x: "Generative AI workloads now carry roughly 20–25% of the exam — the single largest domain. That means Azure OpenAI, large language models, GPT-style models and the basics of prompting are all fair game." },
        { t: "list", items: [
          "What large language models are and how they generate text",
          "Azure OpenAI Service and the kinds of tasks it powers",
          "Prompt basics and why prompt quality matters",
          "Responsible AI applied specifically to generative systems" ]}
      ]},
      { h: "What to prioritise", blocks: [
        { t: "p", x: "Spend real time on the six responsible-AI principles — fairness, reliability & safety, privacy & security, inclusiveness, transparency and accountability — because the exam loves to test them in the context of generative AI. Know the difference between AI, machine learning and generative AI cold; that distinction anchors half the domain." }
      ]}
    ],
    takeaways: [
      "Generative AI is now the largest single domain on AI-900 (~20–25%).",
      "Know Azure OpenAI, LLMs and prompt basics conceptually.",
      "The six responsible-AI principles are heavily tested — memorise them."
    ],
    faq: [
      { q: "Do I need to write code for the generative AI section?", a: "No. AI-900 is entirely conceptual. You need to understand what these tools do, not build with them." },
      { q: "Is old AI-900 study material still useful?", a: "Partly, but it will under-cover generative AI. Use current material for that domain." }
    ],
    related: ["ai-900-vs-az-900", "ab-900-agents-explained", "ai-900-4-weeks"]
  },
  {
    slug: "ai-900-4-weeks",
    course: "ai-900", tag: "Study plan",
    title: "Zero to AI-900 in 4 weeks",
    blurb: "A realistic self-paced plan around a full-time job or college.",
    date: "2026-01-20", dateLabel: "20 Jan 2026", readTime: "6 min read",
    lead: "You don't need to quit your job or clear your calendar. AI-900 is very achievable in four weeks at roughly 45 minutes a day — the trick is sequencing the topics so momentum builds instead of stalling.",
    sections: [
      { h: "The four-week plan", blocks: [
        { t: "list", items: [
          "Week 1 — AI foundations: what AI, ML and deep learning are, common workloads, and the six responsible-AI principles.",
          "Week 2 — Machine learning on Azure plus computer vision: core ML concepts, Azure ML workspace, image analysis and OCR.",
          "Week 3 — Natural language processing and generative AI: text analytics, speech, translation, LLMs and Azure OpenAI.",
          "Week 4 — Mock tests only: full-length timed papers, review every wrong answer, repeat until you're consistently above 800." ]}
      ]},
      { h: "How to actually stick to it", blocks: [
        { t: "p", x: "Study at the same time every day — early morning or right after dinner works best for most of our learners. Keep sessions short and finish each one with three mock questions on what you just watched. The final week is the most important: do not book the exam until your mock scores are steady." }
      ]}
    ],
    takeaways: [
      "Four weeks at ~45 min/day is realistic alongside work or college.",
      "Sequence topics; leave the last week entirely for timed mocks.",
      "Book the exam only once mock scores sit comfortably above 800."
    ],
    faq: [
      { q: "Can I do it faster than four weeks?", a: "Yes — motivated full-time learners often finish in two. Four weeks is the comfortable pace around other commitments." },
      { q: "How many mock tests should I take?", a: "As many as it takes to be consistently above 800. With Skilltimate the mock tests are unlimited." }
    ],
    related: ["ai-900-vs-az-900", "ai-900-worth-india", "az-900-exam-day"]
  },

  // ---------------- AB-900 ----------------
  {
    slug: "ab-900-future-proof",
    course: "ab-900", tag: "Opinion",
    title: "Why AB-900 is 2026's most future-proof cert",
    blurb: "A new exam, a nearly empty field, and a hiring wave that hasn't peaked yet.",
    date: "2026-03-02", dateLabel: "02 Mar 2026", readTime: "6 min read",
    lead: "Most certifications are worth taking because everyone respects them. AB-900 is worth taking because almost nobody has it yet — and that gap is exactly where the opportunity lives.",
    sections: [
      { h: "The first-mover window", blocks: [
        { t: "p", x: "AB-900 — Microsoft 365 Copilot & Agent Administration — went generally available in 2026. The pool of certified professionals is still tiny, while nearly every organisation adopting Copilot will soon need someone who can govern it safely." },
        { t: "p", x: "That mismatch between demand and supply is the whole thesis. In eighteen months this badge will be common. Today it can make you the only certified person in the room." }
      ]},
      { h: "Why the demand is structural, not hype", blocks: [
        { t: "list", items: [
          "Copilot rollouts need licensing, access and prompt governance — a real admin job.",
          "Data protection and compliance (via Microsoft Purview) make it a security-adjacent skill, not a nice-to-have.",
          "Agents add a whole new lifecycle to manage: build, approve, monitor, retire." ]}
      ]}
    ],
    takeaways: [
      "AB-900 launched in 2026 — the certified field is still nearly empty.",
      "Demand is structural: every Copilot rollout needs a governed admin.",
      "The value is highest now, while you can be the first in your org."
    ],
    faq: [
      { q: "Is it risky to take such a new certification?", a: "The opposite — being early is the advantage. The exam maps to a real, growing admin role, so the skills hold value regardless." },
      { q: "Do I need to be an M365 admin already?", a: "No. AB-900 is a fundamentals exam. It teaches the admin concepts from the ground up." }
    ],
    related: ["ab-900-copilot-governance", "ab-900-certify-first", "ab-900-agents-explained"]
  },
  {
    slug: "ab-900-copilot-governance",
    course: "ab-900", tag: "Guide",
    title: "Copilot governance 101 for M365 admins",
    blurb: "Licensing, prompt controls, data protection — the admin's mental model.",
    date: "2026-02-25", dateLabel: "25 Feb 2026", readTime: "8 min read",
    lead: "Governing Copilot isn't one big switch — it's a handful of controls working together. Get the mental model right and the whole AB-900 security domain (nearly half the exam) becomes intuitive.",
    sections: [
      { h: "The three layers of control", blocks: [
        { t: "list", items: [
          "Access — who can use Copilot, controlled through licensing assigned to users and groups.",
          "Usage — how Copilot behaves: prompt governance, billing and adoption monitoring from the admin centers.",
          "Protection — what Copilot can touch: sensitivity labels, data protection and compliance policies via Microsoft Purview." ]}
      ]},
      { h: "Where beginners get it wrong", blocks: [
        { t: "p", x: "The most common misconception is that blocking Copilot means blocking the user. It doesn't. Copilot access is tied to its own license, independent of the rest of Microsoft 365 — so you can remove Copilot for one person while leaving all their other apps untouched." },
        { t: "p", x: "The second is underestimating Purview. Data protection and compliance is the single largest exam domain (roughly 45–50%), because it's what keeps Copilot from surfacing information a user shouldn't see." }
      ]}
    ],
    takeaways: [
      "Think in three layers: access (licensing), usage (governance), protection (Purview).",
      "Removing a Copilot license disables Copilot only — not the user's other apps.",
      "Purview / data protection is ~half the AB-900 exam. Study it hardest."
    ],
    faq: [
      { q: "What is Microsoft Purview's role with Copilot?", a: "Purview applies sensitivity, data-protection and compliance controls so Copilot and agents respect organisational policy about what data can be used or surfaced." },
      { q: "How do I stop one user from using Copilot?", a: "Unassign that user's Microsoft 365 Copilot license. Their other apps keep working." }
    ],
    related: ["ab-900-future-proof", "ab-900-agents-explained", "ab-900-certify-first"]
  },
  {
    slug: "ab-900-agents-explained",
    course: "ab-900", tag: "Explainer",
    title: "AI agents in Microsoft 365, explained simply",
    blurb: "What agents are, how they're built, approved and monitored.",
    date: "2026-02-16", dateLabel: "16 Feb 2026", readTime: "6 min read",
    lead: "An 'agent' sounds abstract until you frame it plainly: it's a purpose-built AI helper that does a specific job inside your organisation. AB-900 expects you to understand its whole lifecycle — not to write one.",
    sections: [
      { h: "What an agent actually is", blocks: [
        { t: "p", x: "Where Copilot is a general assistant, an agent is scoped to a task — answering HR policy questions, drafting from a specific knowledge base, triaging tickets. It's built on your data and published to the people who need it." }
      ]},
      { h: "The agent lifecycle", blocks: [
        { t: "list", items: [
          "Build — create and edit the agent against a defined data source.",
          "Test — validate its answers before anyone else sees it.",
          "Publish — make it available and configure who can access it.",
          "Govern & monitor — approval workflows, usage insights and retirement, all from the admin centers." ]}
      ]}
    ],
    takeaways: [
      "An agent is a task-scoped AI helper; Copilot is the general assistant.",
      "AB-900 tests the lifecycle: build, test, publish, govern, monitor.",
      "You manage access and approval for agents just like other M365 resources."
    ],
    faq: [
      { q: "Do I need to code to manage agents for AB-900?", a: "No. The exam covers configuring, publishing, approving and monitoring agents — administration, not development." },
      { q: "Who approves an agent before it goes live?", a: "Approval and governance sit with administrators through the M365 admin centers, following your organisation's policy." }
    ],
    related: ["ab-900-copilot-governance", "ab-900-future-proof", "ai-900-generative-ai"]
  },
  {
    slug: "ab-900-certify-first",
    course: "ab-900", tag: "Careers",
    title: "The case for certifying first",
    blurb: "Why early holders of a brand-new credential stand out the most.",
    date: "2026-02-05", dateLabel: "05 Feb 2026", readTime: "5 min read",
    lead: "The best time to earn a certification is right after it launches, before the market catches up. AB-900 is in exactly that window — and the learners moving now are the ones who'll be leading Copilot projects a year from today.",
    sections: [
      { h: "Scarcity is the advantage", blocks: [
        { t: "p", x: "When thousands of people hold a badge, it's a baseline. When almost nobody does, it's a differentiator. Certifying early on AB-900 means being the obvious pick when your organisation's Copilot governance project needs an owner." }
      ]},
      { h: "It compounds", blocks: [
        { t: "p", x: "Early holders don't just get the badge — they get the first real projects, which become the experience that makes the next role easier to land. That head start is hard to buy back once the field fills up." }
      ]}
    ],
    takeaways: [
      "A rare credential differentiates; a common one only qualifies.",
      "Early certification often leads to the first real projects.",
      "The first-mover advantage disappears once everyone catches up."
    ],
    faq: [
      { q: "What if the exam changes after I certify?", a: "Fundamentals certifications don't expire, and the core admin skills carry forward even as details evolve." }
    ],
    related: ["ab-900-future-proof", "ab-900-copilot-governance", "ai-900-worth-india"]
  },

  // ---------------- AZ-900 ----------------
  {
    slug: "az-900-onramp",
    course: "az-900", tag: "Careers",
    title: "AZ-900: the fastest on-ramp to cloud in India",
    blurb: "Why this is the cert most Indian cloud careers start with.",
    date: "2026-02-22", dateLabel: "22 Feb 2026", readTime: "6 min read",
    lead: "If you want a cloud career in India, AZ-900 is the most reliable first step. It's the credential recruiters recognise instantly, and it gives you the vocabulary to hold your own in a cloud interview.",
    sections: [
      { h: "Why AZ-900, and why first", blocks: [
        { t: "p", x: "Azure dominates Indian enterprise — from BFSI to global capability centres — so an Azure fundamentals badge is instantly meaningful to hiring managers. AZ-900 has no prerequisites, so it's a genuine entry point rather than a checkpoint you reach later." },
        { t: "list", items: [
          "Recognised by the employers who hire the most cloud talent in India",
          "No prerequisites — a true beginner's starting line",
          "Sets up deeper Azure certs like AZ-104 and beyond" ]}
      ]},
      { h: "What comes after", blocks: [
        { t: "p", x: "Once AZ-900 lands, the natural next steps are role-based: AZ-104 for administrators, AZ-204 for developers. But even on its own, AZ-900 is enough to get a fresher shortlisted for support and junior cloud roles." }
      ]}
    ],
    takeaways: [
      "AZ-900 is the most recognised cloud entry credential in India.",
      "No prerequisites — you can start today.",
      "It sets up role-based certs like AZ-104 later."
    ],
    faq: [
      { q: "Is AZ-900 enough to get a cloud job?", a: "It gets freshers shortlisted for support and junior roles. Pair it with projects or a role-based cert to go further." },
      { q: "What should I take after AZ-900?", a: "AZ-104 (administrator) or AZ-204 (developer), depending on the direction you want." }
    ],
    related: ["ai-900-vs-az-900", "az-900-iaas-paas-saas", "az-900-fundamentals-trio"]
  },
  {
    slug: "az-900-iaas-paas-saas",
    course: "az-900", tag: "Basics",
    title: "IaaS vs PaaS vs SaaS, explained simply",
    blurb: "The one concept the exam keeps testing — made intuitive.",
    date: "2026-02-08", dateLabel: "08 Feb 2026", readTime: "5 min read",
    lead: "If there's one idea AZ-900 tests relentlessly, it's the three cloud service models. Once you can picture who manages what, the exam questions on this topic become almost free marks.",
    sections: [
      { h: "The pizza analogy that sticks", blocks: [
        { t: "p", x: "Think of running a pizza restaurant. IaaS is renting a kitchen — you still cook, but you don't own the building. PaaS is a kitchen with ingredients and ovens ready — you just make the pizza. SaaS is ordering delivery — you do nothing but eat." },
        { t: "list", items: [
          "IaaS — you manage the OS, runtime and apps; the provider manages hardware. (e.g. Azure VMs)",
          "PaaS — the provider manages the OS and runtime; you manage your app. (e.g. Azure App Service)",
          "SaaS — the provider manages everything; you just use it. (e.g. Microsoft 365)" ]}
      ]},
      { h: "How the exam phrases it", blocks: [
        { t: "p", x: "Watch for the words 'most control' (points to IaaS) versus 'least management' (points to SaaS). The exam rarely names the service directly — it describes the responsibility split and expects you to identify the model." }
      ]}
    ],
    takeaways: [
      "IaaS = most control; SaaS = least management; PaaS sits between.",
      "The exam describes the responsibility split, not the service name.",
      "Anchor each model to one concrete Azure example."
    ],
    faq: [
      { q: "Which model gives the most control over the OS?", a: "IaaS. You manage the operating system while the provider manages the physical hardware." },
      { q: "Is Microsoft 365 IaaS, PaaS or SaaS?", a: "SaaS — you consume the software and Microsoft manages everything underneath." }
    ],
    related: ["az-900-onramp", "az-900-exam-day", "dp-900-relational-vs-non"]
  },
  {
    slug: "az-900-fundamentals-trio",
    course: "az-900", tag: "Stack",
    title: "How AZ-900 pairs with AI-900 and DP-900",
    blurb: "Building a fundamentals trio that recruiters love.",
    date: "2026-01-30", dateLabel: "30 Jan 2026", readTime: "5 min read",
    lead: "Any one fundamentals badge is good. The three together — AZ-900, AI-900 and DP-900 — tell a complete story: you understand the cloud, the AI that runs on it, and the data that fuels both.",
    sections: [
      { h: "Why the trio works", blocks: [
        { t: "list", items: [
          "AZ-900 — the cloud platform everything else runs on.",
          "DP-900 — the data foundation every AI and analytics workload depends on.",
          "AI-900 — the AI and generative-AI layer employers are hiring for now." ]},
        { t: "p", x: "There's real overlap between them, so studying one makes the next faster. Most learners can clear all three inside a couple of months of steady, self-paced study." }
      ]},
      { h: "A sensible order", blocks: [
        { t: "p", x: "Start with AZ-900 for the platform grounding, then DP-900 for data, then AI-900 to bring it together. By the third exam you'll notice how much of the vocabulary already feels familiar." }
      ]}
    ],
    takeaways: [
      "AZ-900 + DP-900 + AI-900 covers cloud, data and AI fundamentals.",
      "The exams overlap, so each one makes the next quicker.",
      "A sensible order is AZ-900 → DP-900 → AI-900."
    ],
    faq: [
      { q: "How long to finish all three?", a: "Steady self-paced learners often complete the trio within about two months." },
      { q: "Do employers value multiple fundamentals certs?", a: "Yes — together they demonstrate breadth, which is exactly what entry-level hiring looks for." }
    ],
    related: ["ai-900-vs-az-900", "az-900-onramp", "dp-900-to-data-engineer"]
  },
  {
    slug: "az-900-exam-day",
    course: "az-900", tag: "Exam",
    title: "AZ-900 exam-day checklist & common traps",
    blurb: "The wording tricks and topics people underestimate.",
    date: "2026-01-15", dateLabel: "15 Jan 2026", readTime: "6 min read",
    lead: "Most people who narrowly miss AZ-900 don't fail on knowledge — they fail on wording and nerves. A little preparation for the exam itself, not just the content, is what turns a borderline score into a comfortable pass.",
    sections: [
      { h: "Before you start", blocks: [
        { t: "list", items: [
          "Test your webcam, mic and internet if you're taking it online proctored.",
          "Clear your desk — proctored exams have strict rules about what's around you.",
          "Have your ID ready and join early; late arrivals can be turned away." ]}
      ]},
      { h: "Traps to watch for", blocks: [
        { t: "list", items: [
          "'Most control' vs 'least management' — the service-model wording trap.",
          "Shared responsibility — know what the customer manages vs the provider, per model.",
          "Governance tools — don't confuse Azure Policy (rules) with tags (organisation/billing labels).",
          "SLAs and cost tools — small topics, but easy marks if you've reviewed them." ]}
      ]}
    ],
    takeaways: [
      "Many near-misses are about wording and nerves, not knowledge.",
      "Prep the logistics: ID, clear desk, working webcam, join early.",
      "Re-read service-model and shared-responsibility questions slowly."
    ],
    faq: [
      { q: "Is AZ-900 negative marked?", a: "No. There is no penalty for wrong answers, so never leave a question blank." },
      { q: "What score do I need to pass?", a: "700 out of 1000." }
    ],
    related: ["az-900-iaas-paas-saas", "az-900-onramp", "ai-900-4-weeks"]
  },

  // ---------------- DP-900 ----------------
  {
    slug: "dp-900-data-underpins-ai",
    course: "dp-900", tag: "Careers",
    title: "Why data skills underpin every AI job",
    blurb: "The prerequisite nobody advertises — and how to prove you have it.",
    date: "2026-02-20", dateLabel: "20 Feb 2026", readTime: "5 min read",
    lead: "Every impressive AI system sits on top of something far less glamorous: data. Understanding how data is stored, moved and analysed is the quiet prerequisite behind most AI and analytics roles — and DP-900 is how you prove you have it.",
    sections: [
      { h: "AI is only as good as its data", blocks: [
        { t: "p", x: "Models learn from data, are evaluated on data and fail because of data. That's why data-literate people are valuable on AI teams even in non-modelling roles — they understand where the fuel comes from and how clean it is." }
      ]},
      { h: "What DP-900 proves", blocks: [
        { t: "list", items: [
          "You know relational vs non-relational data and when to use each.",
          "You understand core Azure data services and analytics workloads.",
          "You can speak the language of data engineers and analysts." ]}
      ]}
    ],
    takeaways: [
      "AI runs on data; data literacy is a hidden prerequisite for AI roles.",
      "DP-900 proves you understand storage, movement and analytics.",
      "It pairs naturally with AI-900 for an AI-adjacent career story."
    ],
    faq: [
      { q: "Should I take DP-900 before AI-900?", a: "Either order works, but DP-900 first gives you the data grounding that makes AI concepts click faster." },
      { q: "Is DP-900 only for future data engineers?", a: "No. It's valuable for analysts, AI team members and anyone who works near data." }
    ],
    related: ["dp-900-relational-vs-non", "dp-900-to-data-engineer", "ai-900-worth-india"]
  },
  {
    slug: "dp-900-relational-vs-non",
    course: "dp-900", tag: "Basics",
    title: "Relational vs non-relational data for beginners",
    blurb: "When to reach for SQL, and when not to.",
    date: "2026-02-10", dateLabel: "10 Feb 2026", readTime: "5 min read",
    lead: "The relational-versus-non-relational distinction is the backbone of DP-900. Once you can decide which one a scenario calls for, a big chunk of the exam takes care of itself.",
    sections: [
      { h: "The core difference", blocks: [
        { t: "p", x: "Relational data lives in tables with a fixed structure and clear relationships — think rows and columns you can join. Non-relational (NoSQL) data is flexible: documents, key-value pairs, or files that don't fit neatly into rigid tables." },
        { t: "list", items: [
          "Relational — structured, transactional, consistent. (e.g. Azure SQL Database)",
          "Non-relational — flexible schema, huge scale, varied shapes. (e.g. Azure Cosmos DB, Blob storage)" ]}
      ]},
      { h: "How to choose", blocks: [
        { t: "p", x: "Reach for relational when the data is structured and you need reliable transactions — orders, payments, records. Reach for non-relational when the data is unstructured, changes shape, or arrives at massive scale — logs, documents, media, IoT streams." }
      ]}
    ],
    takeaways: [
      "Relational = structured tables and transactions; non-relational = flexible and scalable.",
      "Azure SQL Database is the go-to relational service; Cosmos DB is a common non-relational one.",
      "Match the store to the data's shape and consistency needs."
    ],
    faq: [
      { q: "Which Azure service is best for structured transactional data?", a: "Azure SQL Database, part of the Azure SQL family." },
      { q: "Is non-relational always better for scale?", a: "Often, for unstructured or massively varied data — but relational databases scale well too for structured workloads." }
    ],
    related: ["dp-900-data-underpins-ai", "az-900-iaas-paas-saas", "dp-900-to-data-engineer"]
  },
  {
    slug: "dp-900-to-data-engineer",
    course: "dp-900", tag: "Roadmap",
    title: "From DP-900 to data engineer",
    blurb: "The path from fundamentals to DP-203 and a real data role.",
    date: "2026-01-25", dateLabel: "25 Jan 2026", readTime: "6 min read",
    lead: "DP-900 is the first rung, not the whole ladder. Here's the realistic path from a fundamentals badge to an actual data-engineering role on Azure.",
    sections: [
      { h: "The path", blocks: [
        { t: "list", items: [
          "DP-900 — fundamentals: data concepts, relational and non-relational stores, analytics workloads.",
          "Hands-on practice — build small pipelines, load data, try Power BI and Synapse / Fabric.",
          "DP-203 — the role-based Azure Data Engineer certification.",
          "Portfolio + interviews — projects that show you can move and shape real data." ]}
      ]},
      { h: "Don't skip the middle", blocks: [
        { t: "p", x: "The gap between DP-900 and DP-203 is hands-on practice. Fundamentals give you the map; only building something teaches you the terrain. Even a small end-to-end project — ingest, store, visualise — makes the jump to DP-203 far less intimidating." }
      ]}
    ],
    takeaways: [
      "DP-900 → hands-on practice → DP-203 → portfolio is the realistic path.",
      "The fundamentals give vocabulary; projects give the actual skill.",
      "A small end-to-end data project bridges DP-900 and DP-203."
    ],
    faq: [
      { q: "Can I jump straight to DP-203?", a: "You can, but DP-900 first makes DP-203 much easier by grounding the vocabulary." },
      { q: "How important are projects?", a: "Very. For data-engineering roles, a portfolio often matters as much as the certification." }
    ],
    related: ["dp-900-data-underpins-ai", "dp-900-fabric", "az-900-fundamentals-trio"]
  },
  {
    slug: "dp-900-fabric",
    course: "dp-900", tag: "Trends",
    title: "Microsoft Fabric and the future of analytics",
    blurb: "What Fabric changes, and why it matters for the exam.",
    date: "2026-01-12", dateLabel: "12 Jan 2026", readTime: "5 min read",
    lead: "Microsoft Fabric is reshaping how analytics is done on Azure by pulling the whole data pipeline into one platform. For DP-900, you don't need to master it — but you do need to know what it is and why it matters.",
    sections: [
      { h: "What Fabric is", blocks: [
        { t: "p", x: "Fabric is an all-in-one analytics platform that brings data ingestion, storage, engineering, warehousing and Power BI reporting together under one roof, instead of stitching separate services yourself." }
      ]},
      { h: "Why it matters for DP-900", blocks: [
        { t: "list", items: [
          "It's the direction Microsoft's analytics stack is heading — worth recognising by name.",
          "It reinforces the modern analytics pipeline the exam describes: ingest, process, serve, visualise.",
          "Power BI, which you do need to know, is a first-class part of Fabric." ]}
      ]}
    ],
    takeaways: [
      "Fabric unifies the analytics pipeline into a single platform.",
      "DP-900 wants recognition and the pipeline concept, not deep expertise.",
      "Power BI sits inside Fabric and remains exam-relevant."
    ],
    faq: [
      { q: "Do I need hands-on Fabric experience for DP-900?", a: "No. Conceptual awareness of what Fabric does and where it fits is enough for the fundamentals exam." },
      { q: "Is Power BI part of Fabric?", a: "Yes — Power BI is the visualisation layer within Microsoft Fabric." }
    ],
    related: ["dp-900-to-data-engineer", "dp-900-relational-vs-non", "dp-900-data-underpins-ai"]
  }
];

export function bySlug(slug) {
  return ARTICLES.find(a => a.slug === slug) || null;
}
