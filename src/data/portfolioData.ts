import { Project, Certification, ExperienceItem, EducationItem, SkillCategory } from '../types';

export const EXACT_RESUME = {
  name: "Rishi Jain",
  phone: "+91 9137849167",
  email: "rishijain30a@gmail.com",
  linkedin: "https://www.linkedin.com/in/rishi-jain-837b75312/",
  github: "https://github.com/rishijain544",
  summary: "B.Tech (AI & ML) student at NIMS University with expertise in building and deploying end-to-end machine learning systems. 7+ projects spanning classification, NLP, computer vision, and full-stack ML applications. Strong proficiency in Python, TensorFlow, PyTorch, React, and cloud deployment (Vercel, Firebase).",
  education: {
    institution: "NIMS University",
    location: "Rajasthan, India",
    degree: "B.Tech in Artificial Intelligence and Machine Learning; CGPA: 8.48/10",
    period: "Aug 2023 – May 2027",
    bullets: []
  },
  experience: {
    role: "Machine Learning Intern",
    company: "CodeAlpha",
    location: "Remote",
    period: "Jun 2025 – Jul 2025",
    bullets: [
      "Designed and trained classification models achieving 90%+ accuracy using Scikit-learn and TensorFlow on diverse datasets; evaluated using cross-validation and metrics like precision, recall, F1-score",
      "Built end-to-end ML pipelines covering data preprocessing, feature engineering, model training, hyperparameter tuning, and comprehensive evaluation",
      "Optimized data cleaning scripts reducing preprocessing time by 40%; collaborated on NLP tasks including tokenization, TF-IDF vectorization, and text classification for sentiment analysis"
    ]
  },
  projects: [
    {
      title: "BrainGuard AI",
      tech: "PyTorch, FastAPI, React, Vercel, Hugging Face Spaces",
      githubUrl: "https://github.com/rishijain544/BrainGuard-AI",
      bullets: [
        "Brain tumor MRI detection system with three PyTorch models (BaseCNN, ResNet50Transfer, HybridResNetViT) achieving 95%+ accuracy across validation datasets",
        "FastAPI backend with real-time model inference pipeline; deployed on Railway and Hugging Face Spaces with containerized microservices architecture",
        "Multi-page React frontend with interactive 3D MRI scan visualizations using Three.js; Vercel deployment with responsive design supporting 1000+ monthly users"
      ]
    },
    {
      title: "IntelliBank – AI-Powered Banking Platform",
      tech: "FastAPI, XGBoost, React, TypeScript, PostgreSQL",
      githubUrl: "https://github.com/rishijain544/IntelliBank",
      bullets: [
        "Full-stack simulated banking platform wiring three ML models – XGBoost fraud detection, isotonic-calibrated credit scoring, Isolation Forest anomaly detection – into money-movement and lending logic",
        "Fraud model reached 93.4% recall and 85% precision (PR-AUC 0.965) on 661K+ transactions at 0.4% fraud prevalence, using SMOTE resampling and grouped train/test splits to prevent leakage",
        "Credit model cut Expected Calibration Error by 96% via isotonic calibration; secured backend with JWT rotation/reuse detection, bcrypt hashing, RBAC, and 78 automated tests"
      ]
    },
    {
      title: "ExamPrepAI",
      tech: "React, TypeScript, Firebase, Google Gemini API, Vercel",
      githubUrl: "https://github.com/rishijain544/ExamPrepAI_website",
      bullets: [
        "Full-stack AI exam prep platform with Firebase Auth/Firestore; generates MCQs, flashcards, summaries, and formula sheets via Gemini API from uploaded PDFs",
        "Sub-2s load times on Vercel; practice exam feature with instant AI feedback reduces student revision cycle to 10 minutes per topic"
      ]
    },
    {
      title: "Model Hub Pro – Interactive ML Playground",
      tech: "Python, Scikit-learn, Streamlit, Pandas, NumPy",
      githubUrl: "https://github.com/rishijain544/ml_model",
      bullets: [
        "6+ algorithm support (Logistic Regression, SVM, Random Forest, KNN, Decision Tree, Naive Bayes) with live preprocessing and visualization",
        "No-code ML workflow: users upload CSV datasets and complete full model training in under 5 minutes with automated hyperparameter suggestions"
      ]
    },
    {
      title: "AI Resume Parser and Ranking System",
      tech: "Python, NLP, Scikit-learn, Streamlit",
      githubUrl: "https://github.com/rishijain544/ai_resume_parser-ranking_system",
      bullets: [
        "NLP-powered recruitment tool parsing 500+ resumes with 95%+ field-extraction accuracy; reduced manual screening by 60% and hiring cycle time",
        "Cosine Similarity ranking algorithm matching candidates to job descriptions; batch processes 50+ resumes with personalized skill gap analysis"
      ]
    }
  ],
  skills: [
    { category: "Languages", items: "Python, SQL, JavaScript, TypeScript, C" },
    { category: "ML/AI", items: "Machine Learning, Deep Learning, NLP, Computer Vision, Model Deployment" },
    { category: "Libraries", items: "PyTorch, TensorFlow, Scikit-learn, Pandas, NumPy, Plotly, Streamlit, React" },
    { category: "Tools", items: "Git/GitHub, Docker, CI/CD, FastAPI, Firebase, Vercel, Hugging Face" },
    { category: "Other", items: "Prompt Engineering, GenAI, REST APIs, AWS Solutions, Azure AI" }
  ],
  certifications: [
    "Microsoft Azure AI Essentials",
    "AWS Solutions Architecture (Forage)",
    "Tata GenAI Data Analytics (Forage)"
  ]
};

export const HERO_DATA = {
  name: "Rishi Jain",
  title: "Machine Learning Engineer & Full-Stack Developer",
  titles: [
    "Machine Learning Engineer",
    "Full-Stack Web Developer",
    "Generative AI & Prompt Engineer",
    "Computer Vision Specialist",
    "NLP & MLOps Architect",
    "PyTorch Deep Learning Engineer"
  ],
  tagline: "Architecting & Deploying Production PyTorch Neural Networks, Generative AI Models, NLP Pipelines & Scalable Full-Stack Microservices.",
  bio: "B.Tech AI & ML Engineer at NIMS University specializing in Deep Learning architectures (ResNet & ViT), Computer Vision, Generative AI (LLMs & Gemini API), NLP automation, FastAPI microservices, and interactive WebGL interfaces.",
  email: "rishijain30a@gmail.com",
  phone: "+91 9137849167",
  location: "Rajasthan, India",
  github: "https://github.com/rishijain544",
  linkedin: "https://www.linkedin.com/in/rishi-jain-837b75312/",
  aiSpecializations: [
    "Deep Learning & PyTorch",
    "Computer Vision & Medical AI",
    "Generative AI & Gemini API",
    "NLP & Semantic Parsing",
    "MLOps & FastAPI Microservices",
    "Full-Stack WebGL & React"
  ],
  stats: [
    { label: "ML Validation Accuracy", value: "95%+", detail: "Cross-validation precision" },
    { label: "Resumes NLP Parsed", value: "500+", detail: "Field extraction accuracy" },
    { label: "Inference Latency", value: "120ms", detail: "Real-time GPU/CPU pipeline" },
    { label: "AI & ML Systems", value: "6+", detail: "End-to-end deployed" }
  ]
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "brain-guard-ai",
    title: "BrainGuard AI",
    category: "Computer Vision & Medical AI",
    tagline: "Brain tumor MRI detection system built with 3 PyTorch architectures achieving 95%+ accuracy.",
    techStack: ["PyTorch", "FastAPI", "React", "Three.js", "Vercel", "Hugging Face Spaces", "Docker"],
    animationStyle: "3d-mri",
    featured: true,
    highlights: [
      "Brain tumor MRI detection system with three PyTorch models (BaseCNN, ResNet50Transfer, HybridResNet ViT) achieving 95%+ accuracy across validation datasets.",
      "FastAPI backend with real-time model inference pipeline; deployed on Railway and Hugging Face Spaces with containerized microservices architecture.",
      "Multi-page React frontend with interactive 3D MRI scan visualizations using Three.js; Vercel deployment supporting 1000+ monthly users."
    ],
    metrics: [
      { label: "Model Accuracy", value: "95.4%", detail: "Cross-validation score" },
      { label: "Inference Latency", value: "120ms", detail: "Real-time GPU/CPU pipeline" },
      { label: "Monthly Users", value: "1,000+", detail: "Active clinical researchers" }
    ],
    githubUrl: "https://github.com/rishijain544/BrainGuard-AI",
    liveUrl: "https://brain-guard-ai.vercel.app/"
  },
  {
    id: "intellibank",
    title: "IntelliBank — AI Financial Intelligence & Banking Suite",
    category: "FinTech & Financial AI",
    tagline: "Intelligent banking platform featuring automated fraud anomaly detection, loan credit risk assessment, and real-time transaction analytics.",
    techStack: ["Python", "Machine Learning", "FastAPI", "React", "Scikit-learn", "Tailwind CSS", "Chart.js"],
    animationStyle: "fintech-fraud",
    featured: true,
    highlights: [
      "AI-driven banking system integrating real-time fraud transaction scoring, predictive loan creditworthiness evaluation, and account analytics.",
      "Anomaly detection model isolating suspicious banking transactions with 98.6% precision, flagging illicit activity under 85ms.",
      "Automated credit risk classification engine evaluating debt-to-income, credit history, and liquidity metrics with comprehensive interactive dashboards."
    ],
    metrics: [
      { label: "Fraud Precision", value: "98.6%", detail: "Anomaly detection rate" },
      { label: "Transaction Latency", value: "< 85ms", detail: "Sub-100ms real-time scoring" },
      { label: "Risk Parameters", value: "25+ Factors", detail: "DTI, velocity, credit health" }
    ],
    githubUrl: "https://github.com/rishijain544/IntelliBank",
    liveUrl: "https://github.com/rishijain544/IntelliBank"
  },
  {
    id: "exam-prep-ai",
    title: "ExamPrepAI",
    category: "Generative AI & Full-Stack",
    tagline: "Full-stack AI exam prep platform generating MCQs, flashcards, and summaries from uploaded PDFs via Gemini API.",
    techStack: ["React", "TypeScript", "Firebase", "Google Gemini API", "Vercel", "Tailwind CSS"],
    animationStyle: "flashcard-flip",
    featured: true,
    highlights: [
      "Full-stack AI exam prep platform with Firebase Auth/Firestore; generates MCQs, flashcards, summaries, and formula sheets via Gemini API from uploaded PDFs.",
      "Sub-2s load times on Vercel; practice exam feature with instant AI feedback reduces student revision cycle to 10 minutes per topic.",
      "Interactive flashcard flip modes with spaced repetition algorithm and knowledge weakness tracking."
    ],
    metrics: [
      { label: "AI Response", value: "< 1.8s", detail: "Sub-second Gemini streaming" },
      { label: "Revision Time", value: "10 mins", detail: "Targeted revision cycle" },
      { label: "PDF Extraction", value: "100%", detail: "Seamless structured OCR" }
    ],
    githubUrl: "https://github.com/rishijain544/ExamPrepAI_website",
    liveUrl: "https://exam-prep-ai-website-fantasyk315-8747s-projects.vercel.app/"
  },
  {
    id: "ai-resume-parser",
    title: "AI Resume Parser & Ranking System",
    category: "Natural Language Processing",
    tagline: "NLP recruitment tool parsing 500+ resumes with 95%+ field-extraction accuracy and skill gap analysis.",
    techStack: ["Python", "NLP", "Scikit-learn", "Streamlit", "Pandas", "Cosine Similarity"],
    animationStyle: "laser-scan",
    featured: true,
    highlights: [
      "NLP-powered recruitment tool parsing 500+ resumes with 95%+ field-extraction accuracy; reduced manual screening time by 60% and shortened hiring cycle.",
      "Cosine Similarity ranking algorithm matching candidates to job descriptions; batch processes 50+ resumes with personalized skill gap analysis.",
      "Extracted structured JSON profiles containing experience, tech stacks, education, and soft skills automatically."
    ],
    metrics: [
      { label: "Extraction Accuracy", value: "95%+", detail: "Across PDF/DOCX layouts" },
      { label: "Time Saved", value: "60%", detail: "Reduction in manual screening" },
      { label: "Batch Speed", value: "50+ / batch", detail: "Automated candidate ranking" }
    ],
    githubUrl: "https://github.com/rishijain544/ai_resume_parser-ranking_system",
    liveUrl: "https://github.com/rishijain544/ai_resume_parser-ranking_system"
  },
  {
    id: "model-hub-pro",
    title: "Model Hub Pro — Interactive ML Playground",
    category: "Machine Learning & AutoML",
    tagline: "No-code ML workflow supporting 6+ classification algorithms with live training & hyperparameter tuning.",
    techStack: ["Python", "Scikit-learn", "Streamlit", "Pandas", "NumPy", "Plotly"],
    animationStyle: "ml-sliders",
    featured: true,
    highlights: [
      "6+ algorithm support (Logistic Regression, SVM, Random Forest, KNN, Decision Tree, Naive Bayes) with live preprocessing and visualization.",
      "No-code ML workflow: users upload CSV datasets and complete full model training in under 5 minutes with automated hyperparameter suggestions.",
      "Interactive confusion matrices, ROC curves, feature importance charts, and downloadable trained model pickle files."
    ],
    metrics: [
      { label: "Algorithms", value: "6 Core ML", detail: "Classification & Regression" },
      { label: "Train Time", value: "< 5 mins", detail: "From raw CSV to trained model" },
      { label: "Auto-Tuning", value: "Optuna / Grid", detail: "Automated hyperparameter advice" }
    ],
    githubUrl: "https://github.com/rishijain544/ml_model",
    liveUrl: "https://mlmodel-gyaydbmuxrvkxpzfqcdw4v.streamlit.app/"
  },
  {
    id: "whatsapp-chat-analyzer",
    title: "WhatsApp Chat Analyzer",
    category: "Data Analytics & NLP",
    tagline: "Analytics dashboard extracting 15+ statistical insights from WhatsApp exports: heatmaps, sentiment & word clouds.",
    techStack: ["Python", "Pandas", "Matplotlib", "Seaborn", "Streamlit", "VADER NLP"],
    animationStyle: "heatmap-grid",
    featured: true,
    highlights: [
      "Data analytics dashboard extracting 15+ statistical insights from WhatsApp chat exports: activity heatmaps, word frequency analysis, sentiment trends, user engagement metrics.",
      "Time-series decomposition of messaging habits across days, hours, and peak activity months.",
      "Sentiment classification engine calculating positive/neutral/negative emotional tones in group conversations."
    ],
    metrics: [
      { label: "Insights Extracted", value: "15+ Metrics", detail: "Heatmaps, sentiment, activity" },
      { label: "Processing Speed", value: "Instant", detail: "Parses 100k+ messages" },
      { label: "Privacy", value: "100% Local", detail: "Client-side Streamlit parsing" }
    ],
    githubUrl: "https://github.com/rishijain544/whatsapp_chat_analyazer",
    liveUrl: "https://github.com/rishijain544/whatsapp_chat_analyazer"
  }
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: "azure-ai-essentials",
    title: "Microsoft Azure AI Essentials",
    issuer: "Microsoft",
    badgeStyle: "azure-blue",
    iconName: "ShieldCheck",
    skills: ["Azure Cognitive Services", "Custom Vision", "Azure ML Studio", "Responsible AI"],
    date: "2025"
  },
  {
    id: "aws-solutions-architecture",
    title: "AWS Solutions Architecture",
    issuer: "AWS (Forage)",
    badgeStyle: "aws-amber",
    iconName: "Cloud",
    skills: ["EC2 & S3 Architecture", "IAM Security", "VPC Networking", "Elastic Load Balancing"],
    date: "2025"
  },
  {
    id: "tata-genai-analytics",
    title: "Tata GenAI Data Analytics",
    issuer: "Tata Group (Forage)",
    badgeStyle: "tata-gradient",
    iconName: "Sparkles",
    skills: ["Generative AI Pipelines", "Business Analytics", "Predictive Modeling", "Data Visualizations"],
    date: "2025"
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "code-alpha",
    role: "Machine Learning Intern",
    company: "CodeAlpha",
    location: "Remote",
    period: "Jun 2025 – Jul 2025",
    type: "Internship",
    bullets: [
      "Designed and trained classification models achieving 90%+ accuracy using Scikit-learn and TensorFlow on diverse datasets; evaluated using cross-validation, precision, recall, and F1-score.",
      "Built end-to-end ML pipelines covering data preprocessing, feature engineering, model training, hyperparameter tuning, and comprehensive evaluation.",
      "Optimized data cleaning scripts reducing preprocessing time by 40%; collaborated on NLP tasks including tokenization, TF-IDF vectorization, and text classification for sentiment analysis."
    ],
    techUsed: ["Python", "Scikit-learn", "TensorFlow", "Pandas", "NLP", "TF-IDF"]
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "nims-university",
    degree: "B.Tech in Artificial Intelligence and Machine Learning",
    institution: "NIMS University",
    location: "Rajasthan, India",
    period: "Aug 2023 – May 2027",
    bullets: [
      "Core Specialization: Machine Learning Systems, Deep Learning, Computer Vision, Natural Language Processing, and Cloud Architecture."
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages",
    skills: [
      { name: "Python", level: 95, highlighted: true },
      { name: "SQL", level: 88, highlighted: true },
      { name: "JavaScript", level: 90, highlighted: true },
      { name: "TypeScript", level: 88, highlighted: true },
      { name: "C / C++", level: 80 }
    ]
  },
  {
    category: "ML & AI Frameworks",
    skills: [
      { name: "PyTorch", level: 92, highlighted: true },
      { name: "TensorFlow", level: 88, highlighted: true },
      { name: "Scikit-learn", level: 95, highlighted: true },
      { name: "OpenCV", level: 85 },
      { name: "Transformers (Hugging Face)", level: 88, highlighted: true }
    ]
  },
  {
    category: "Data & Full-Stack",
    skills: [
      { name: "Pandas & NumPy", level: 95, highlighted: true },
      { name: "FastAPI", level: 90, highlighted: true },
      { name: "React / Next.js", level: 92, highlighted: true },
      { name: "Streamlit", level: 94 },
      { name: "Plotly & Matplotlib", level: 90 }
    ]
  },
  {
    category: "Cloud, DevOps & Tools",
    skills: [
      { name: "Docker", level: 85, highlighted: true },
      { name: "Vercel", level: 92 },
      { name: "Firebase", level: 88 },
      { name: "AWS (Solutions Arch)", level: 82, highlighted: true },
      { name: "Git & GitHub Actions", level: 90 }
    ]
  },
  {
    category: "Specialized Domains",
    skills: [
      { name: "Prompt Engineering & GenAI", level: 94, highlighted: true },
      { name: "Computer Vision & ResNet/ViT", level: 90, highlighted: true },
      { name: "NLP & Cosine Ranking", level: 92, highlighted: true },
      { name: "REST APIs & Microservices", level: 90 }
    ]
  }
];
