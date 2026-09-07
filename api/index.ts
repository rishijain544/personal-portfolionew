import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();

app.use(express.json());

// API Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Exam Prep Simulator API
app.post("/api/exam-prep", async (req, res) => {
  try {
    const { topic } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      return res.json({
        status: "simulated",
        topic: topic || "Machine Learning Concepts",
        flashcards: [
          {
            question: "What is the key difference between L1 and L2 regularization?",
            answer: "L1 (Lasso) shrinks coefficients to zero producing sparse models, while L2 (Ridge) shrinks coefficients close to zero but keeps all features."
          },
          {
            question: "Why use ResNet architectures in Deep Learning?",
            answer: "ResNet uses skip connections to bypass layers, resolving the vanishing gradient problem and allowing training of deep neural networks."
          },
          {
            question: "How does Cosine Similarity evaluate text embeddings?",
            answer: "It measures the cosine of the angle between two multi-dimensional vectors, quantifying semantic closeness independently of document length."
          }
        ],
        mcqs: [
          {
            question: "Which evaluation metric is best for imbalanced medical classification (e.g. Brain Tumor MRI)?",
            options: ["Accuracy", "Recall / Sensitivity", "Mean Squared Error", "Adjusted R2"],
            correctIndex: 1,
            explanation: "In medical diagnostics, false negatives (missing a tumor) are critical, so Recall is prioritized."
          }
        ],
        summary: "AI summary generated: Focus on key loss functions, overfitting mitigation, and precision-recall trade-offs."
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are ExamPrepAI, an expert learning engine. Generate 3 flashcards and 2 multiple-choice questions for the topic: "${topic || 'Machine Learning'}".
Return output strictly as a JSON object with keys:
"flashcards": [{"question": string, "answer": string}],
"mcqs": [{"question": string, "options": [string, string, string, string], "correctIndex": number, "explanation": string}],
"summary": string`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    const parsed = JSON.parse(text);
    res.json({ status: "live", ...parsed });
  } catch (err: any) {
    console.error("ExamPrepAI API Error:", err);
    res.status(500).json({ error: err.message || "Failed to generate exam prep material" });
  }
});

// IntelliBank Financial AI Risk & Anomaly Scoring API
app.post("/api/intellibank/score", (req, res) => {
  const { amount = 1250, channel = "Online Ecommerce", velocity = 1, creditScore = 720, income = 65000, loanRequested = 15000 } = req.body;
  
  let baseRisk = 2.5;
  if (amount > 5000) baseRisk += 25;
  else if (amount > 2000) baseRisk += 12;
  else if (amount > 1000) baseRisk += 5;

  if (channel === "Crypto Gateway") baseRisk += 22;
  else if (channel === "International Wire") baseRisk += 18;
  else if (channel === "Online Ecommerce") baseRisk += 6;
  else if (channel === "ATM Withdrawal") baseRisk += 8;

  if (velocity > 3) baseRisk += velocity * 4;

  const fraudProbability = Math.min(99.4, Math.max(0.4, Number((baseRisk + (Math.random() * 2 - 1)).toFixed(1))));
  const isFlagged = fraudProbability > 35;

  const dtiRatio = Number(((loanRequested / (income || 50000)) * 100).toFixed(1));
  let creditTier = "Prime Tier A";
  let loanApproved = true;
  let interestRate = 5.2;

  if (creditScore < 580 || dtiRatio > 55) {
    creditTier = "High Risk / Subprime";
    loanApproved = false;
    interestRate = 18.5;
  } else if (creditScore < 670 || dtiRatio > 40) {
    creditTier = "Near-Prime Tier B";
    loanApproved = true;
    interestRate = 9.8;
  } else if (creditScore >= 750 && dtiRatio < 25) {
    creditTier = "Super-Prime Tier A+";
    loanApproved = true;
    interestRate = 4.4;
  }

  res.json({
    status: "success",
    transaction: {
      amount,
      channel,
      fraudProbability,
      isFlagged,
      action: isFlagged ? "STEP_UP_MFA_REQUIRED" : "APPROVED_INSTANT",
      riskLevel: fraudProbability > 50 ? "CRITICAL" : fraudProbability > 25 ? "ELEVATED" : "LOW_RISK",
      latencyMs: Math.floor(45 + Math.random() * 35)
    },
    underwriting: {
      creditScore,
      creditTier,
      loanApproved,
      recommendedInterestRate: `${interestRate}%`,
      dtiRatio: `${dtiRatio}%`,
      maxEligibleAmount: Math.floor((income || 60000) * 0.45)
    }
  });
});

// Contact Message API
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }
  console.log(`[Contact Form Received] From: ${name} (${email}) - ${message}`);
  res.json({ success: true, message: "Thank you for reaching out! Rishi will reply shortly." });
});

export default app;
