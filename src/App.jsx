import { useState, useRef } from "react";

const ACCENT = "linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)";
const ACCENT_SOLID = "#7C3AED";

// ─── Prompt Engine ────────────────────────────────────────────────────────────
function buildResumePrompt({ name, email, phone, role, experience, skills, education, achievements }) {
  return `You are an elite resume writer at a top-tier executive recruitment firm. Your output must be ATS-optimized, recruiter-ready, and formatted with clean markdown.

CANDIDATE PROFILE:
- Full Name: ${name}
- Contact: ${email} | ${phone}
- Target Role: ${role}
- Years of Experience: ${experience}
- Core Skills: ${skills}
- Education: ${education}
- Key Achievements: ${achievements}

TASK: Write a complete, professional resume in markdown format.

STRICT REQUIREMENTS:
1. Start with a punchy 2-sentence professional summary tailored to "${role}"
2. List STAR-format bullet points (Situation→Task→Action→Result) for each experience entry
3. Quantify every achievement with realistic, plausible metrics (%, $, time saved, team size)
4. Include an ATS-optimized Skills section grouped by category
5. Use clean markdown: ## for sections, **bold** for company names, *italic* for dates
6. Tone: confident, specific, executive-level — no filler phrases like "responsible for"

OUTPUT FORMAT:
# [Full Name]
[email] | [phone] | LinkedIn: linkedin.com/in/[firstname-lastname]

## Professional Summary
[2 sentences, punchy, role-specific]

## Experience
[STAR-format bullets with metrics]

## Skills
[Grouped by category]

## Education
[Degree, institution, year]

## Key Achievements
[Headline-worthy wins]

Write ONLY the resume. No preamble, no explanation.`;
}

function buildCoverLetterPrompt({ name, role, company, skills, achievements, tone }) {
  return `You are a senior career coach who writes cover letters that get callbacks at FAANG companies and top startups.

CANDIDATE: ${name}
TARGET ROLE: ${role} at ${company}
KEY STRENGTHS: ${skills}
TOP ACHIEVEMENT: ${achievements}
DESIRED TONE: ${tone}

TASK: Write a compelling, personalized cover letter.

STRICT REQUIREMENTS:
1. Hook opening line — not "I am writing to apply for…" — something that immediately signals value
2. Paragraph 2: Connect one specific candidate achievement to a core pain point of this role
3. Paragraph 3: Show cultural fit and genuine enthusiasm for ${company}
4. Closing: Confident, forward-looking CTA — not desperate
5. Total length: 250–320 words
6. Tone must be: ${tone}
7. Never use: "I am a hard worker", "team player", "passionate about", "leverage synergies"

OUTPUT FORMAT:
[Date]

Hiring Manager
${company}

Dear Hiring Team,

[Body — 4 paragraphs]

Sincerely,
${name}

Write ONLY the cover letter. No preamble.`;
}

// ─── Mock Generators ──────────────────────────────────────────────────────────
function generateMockResume(form) {
  const role = form.role || "Software Engineer";
  const name = form.name || "Alex Johnson";
  const email = form.email || "alex@email.com";
  const phone = form.phone || "+1 (555) 000-0000";
  const skills = form.skills || "React, TypeScript, Node.js";
  const experience = form.experience || "3–6 (mid-level)";
  const education = form.education || "B.S. Computer Science";
  const achievements = form.achievements || "Led database migration cutting query times by 40%.";

  return `# ${name}
${email} | ${phone} | LinkedIn: linkedin.com/in/${name.toLowerCase().replace(/\s+/g, "-")}

## Professional Summary
Highly accomplished ${role} with over ${experience} of experience driving technical innovation and operational excellence. Proven track record of leveraging core strengths in **${skills.split(",")[0].trim() || "software development"}** to deliver scalable solutions, optimize system performance, and lead high-performing cross-functional teams.

## Experience
**Lead Systems Engineer** | *Oct 2022 – Present*
* **Situation & Task:** Tasked with resolving systemic performance bottlenecks in the primary cloud data pipeline.
* **Action:** Re-architected data ingestion pipeline and migrated legacy queries to a distributed caching layer using ${skills.split(",").slice(0, 3).map(s => s.trim()).join(", ") || "modern web technologies"}.
* **Result:** Reduced database query latency by **42%** and lowered monthly infrastructure costs by **$14,000**.

**Senior Software Engineer** | *Jun 2020 – Oct 2022*
* **Situation & Task:** Required to accelerate the feature delivery cycle for a key customer-facing microservice.
* **Action:** Orchestrated the implementation of automated CI/CD testing workflows and mentored 4 junior developers on best practices.
* **Result:** Boosted deployment frequency by **180%** and reduced production regression bugs by **35%**.

## Skills
* **Core Technologies:** ${skills}
* **Methodologies:** Agile/Scrum, CI/CD pipelines, System Architecture, Test-Driven Development (TDD)
* **Tools & Platforms:** Git, Docker, Amazon Web Services (AWS), Google Cloud Platform (GCP)

## Education
${education}

## Key Achievements
* **Performance Excellence:** ${achievements}
* **Project Leadership:** Successfully managed a cross-functional project team of 8 members to ship a major version upgrade 3 weeks ahead of schedule.`;
}

function generateMockCoverLetter(form) {
  const name = form.name || "Alex Johnson";
  const role = form.role || "Software Engineer";
  const company = form.company || "Stripe";
  const skills = form.skills || "full-stack development";
  const achievements = form.achievements || "increasing customer retention";
  const tone = form.tone || "Professional & Confident";

  return `June 23, 2026

Hiring Manager
${company}

Dear Hiring Team,

I am writing to express my strong interest in the ${role} position at ${company}. Having followed ${company}'s impressive growth and leadership in the industry, I am eager to bring my expertise in ${skills} to your team.

In my previous roles, I have consistently focused on delivering tangible, high-impact business results. A standout milestone in my career was ${achievements}. I achieved this by leveraging structured, data-driven methodologies and fostering collaboration across multiple teams. I am confident that I can replicate this level of execution to solve key pain points for ${company}.

I am particularly drawn to ${company} because of your culture of excellence, high engineering bar, and focus on customer-centric design. My experience aligns perfectly with your current initiatives, and I am excited about the opportunity to contribute to your mission.

Thank you for your time and consideration. I look forward to the possibility of discussing how my skills and achievements can drive success for the engineering team at ${company}.

Sincerely,
${name}`;
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  app: {
    minHeight: "100vh",
    background: "#0A0A0A",
    color: "#E4E4E7",
    fontFamily: "'Inter', 'Geist', system-ui, sans-serif",
    display: "flex",
    flexDirection: "column",
  },
  nav: {
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(10,10,10,0.85)",
    backdropFilter: "blur(12px)",
    position: "sticky",
    top: 0,
    zIndex: 50,
    padding: "0 24px",
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontWeight: 700,
    fontSize: 16,
    letterSpacing: "-0.02em",
  },
  logoDot: {
    width: 28,
    height: 28,
    borderRadius: 8,
    background: ACCENT,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
  },
  badge: {
    background: "rgba(124,58,237,0.15)",
    border: "1px solid rgba(124,58,237,0.3)",
    color: "#A78BFA",
    padding: "3px 10px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.05em",
  },
  main: {
    flex: 1,
    maxWidth: 1100,
    width: "100%",
    margin: "0 auto",
    padding: "48px 24px",
  },
  hero: {
    textAlign: "center",
    marginBottom: 48,
  },
  heroEyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "rgba(124,58,237,0.1)",
    border: "1px solid rgba(124,58,237,0.25)",
    borderRadius: 20,
    padding: "4px 14px",
    fontSize: 12,
    fontWeight: 600,
    color: "#A78BFA",
    letterSpacing: "0.05em",
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: "clamp(28px,5vw,48px)",
    fontWeight: 800,
    letterSpacing: "-0.04em",
    lineHeight: 1.1,
    marginBottom: 14,
    background: "linear-gradient(135deg, #FFFFFF 0%, #A1A1AA 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroSub: {
    color: "#71717A",
    fontSize: 16,
    maxWidth: 480,
    margin: "0 auto",
    lineHeight: 1.6,
  },
  tabs: {
    display: "flex",
    gap: 4,
    background: "#111111",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 12,
    padding: 4,
    marginBottom: 32,
    width: "fit-content",
  },
  tab: (active) => ({
    padding: "8px 20px",
    borderRadius: 9,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 14,
    transition: "all 0.2s",
    background: active ? ACCENT : "transparent",
    color: active ? "#fff" : "#71717A",
  }),
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 24,
    alignItems: "start",
  },
  card: {
    background: "#111111",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: 24,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#E4E4E7",
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    display: "block",
    fontSize: 12,
    fontWeight: 600,
    color: "#A1A1AA",
    marginBottom: 6,
    letterSpacing: "0.03em",
  },
  input: {
    width: "100%",
    background: "#161616",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    padding: "10px 14px",
    color: "#E4E4E7",
    fontSize: 14,
    outline: "none",
    transition: "border 0.2s",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  textarea: {
    width: "100%",
    background: "#161616",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    padding: "10px 14px",
    color: "#E4E4E7",
    fontSize: 14,
    outline: "none",
    transition: "border 0.2s",
    boxSizing: "border-box",
    resize: "vertical",
    minHeight: 80,
    fontFamily: "inherit",
    lineHeight: 1.5,
  },
  select: {
    width: "100%",
    background: "#161616",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    padding: "10px 14px",
    color: "#E4E4E7",
    fontSize: 14,
    outline: "none",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  btn: {
    width: "100%",
    padding: "12px 24px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 14,
    background: ACCENT,
    color: "#fff",
    letterSpacing: "0.01em",
    transition: "opacity 0.2s, transform 0.15s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontFamily: "inherit",
  },
  outputCard: {
    background: "#111111",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16,
    overflow: "hidden",
  },
  outputHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    background: "#161616",
  },
  outputTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: "#E4E4E7",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  outputActions: {
    display: "flex",
    gap: 8,
  },
  iconBtn: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 8,
    padding: "6px 12px",
    color: "#A1A1AA",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: 6,
    transition: "all 0.2s",
    fontFamily: "inherit",
  },
  outputBody: {
    padding: 24,
    maxHeight: 520,
    overflowY: "auto",
    lineHeight: 1.75,
    fontSize: 14,
    color: "#D4D4D8",
    whiteSpace: "pre-wrap",
    fontFamily: "'ui-monospace','SFMono-Regular','Menlo',monospace",
    fontSize: 13,
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 24px",
    gap: 12,
    color: "#52525B",
  },
  emptyIcon: {
    fontSize: 36,
    marginBottom: 4,
  },
  emptyTitle: {
    fontWeight: 700,
    fontSize: 15,
    color: "#3F3F46",
  },
  emptyText: {
    fontSize: 13,
    textAlign: "center",
    maxWidth: 240,
    lineHeight: 1.5,
  },
  spinner: {
    width: 18,
    height: 18,
    border: "2px solid rgba(255,255,255,0.2)",
    borderTop: "2px solid #fff",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  toast: (show) => ({
    position: "fixed",
    bottom: 24,
    right: 24,
    background: "#161616",
    border: "1px solid rgba(124,58,237,0.4)",
    borderRadius: 10,
    padding: "12px 18px",
    fontSize: 13,
    fontWeight: 600,
    color: "#A78BFA",
    transform: show ? "translateY(0)" : "translateY(20px)",
    opacity: show ? 1 : 0,
    transition: "all 0.3s",
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    gap: 8,
  }),
  qualityBar: {
    height: 3,
    borderRadius: 2,
    background: "rgba(255,255,255,0.06)",
    overflow: "hidden",
    marginTop: 12,
  },
  qualityFill: (pct) => ({
    height: "100%",
    width: `${pct}%`,
    background: ACCENT,
    borderRadius: 2,
    transition: "width 1.2s ease",
  }),
};

// ─── Field Component ──────────────────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      {children}
    </div>
  );
}

// ─── Markdown Renderer (basic) ────────────────────────────────────────────────
function RenderOutput({ text }) {
  if (!text) return null;
  return (
    <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word", fontFamily: "inherit", fontSize: 13, lineHeight: 1.8 }}>
      {text}
    </pre>
  );
}

// ─── Resume Form ──────────────────────────────────────────────────────────────
function ResumeForm({ onGenerate, loading, onValidationError }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    experience: "",
    skills: "",
    education: "",
    achievements: "",
  });
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) {
      setErrors((prev) => ({ ...prev, [k]: false }));
    }
  };

  const handleSubmit = () => {
    const required = ["name", "email", "role", "skills"];
    const newErrors = {};
    required.forEach((k) => {
      if (!form[k].trim()) {
        newErrors[k] = true;
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      onValidationError("Please fill in all required fields (marked with *).");
      return;
    }
    onGenerate(buildResumePrompt(form), form);
  };

  const progress = Object.values(form).filter(Boolean).length / Object.keys(form).length * 100;

  return (
    <div style={styles.card}>
      <div style={styles.cardTitle}>
        <span>📄</span> Candidate Profile
      </div>
      <div className="form-row">
        <Field label="FULL NAME *">
          <input 
            style={{ ...styles.input, borderColor: errors.name ? "#EF4444" : undefined }} 
            value={form.name} 
            onChange={set("name")} 
            placeholder="Alex Johnson" 
          />
          {errors.name && <span style={{ color: "#EF4444", fontSize: 11, marginTop: 4, display: "block" }}>Full name is required</span>}
        </Field>
        <Field label="TARGET ROLE *">
          <input 
            style={{ ...styles.input, borderColor: errors.role ? "#EF4444" : undefined }} 
            value={form.role} 
            onChange={set("role")} 
            placeholder="Senior Product Manager" 
          />
          {errors.role && <span style={{ color: "#EF4444", fontSize: 11, marginTop: 4, display: "block" }}>Target role is required</span>}
        </Field>
      </div>
      <div className="form-row">
        <Field label="EMAIL *">
          <input 
            style={{ ...styles.input, borderColor: errors.email ? "#EF4444" : undefined }} 
            type="email" 
            value={form.email} 
            onChange={set("email")} 
            placeholder="alex@email.com" 
          />
          {errors.email && <span style={{ color: "#EF4444", fontSize: 11, marginTop: 4, display: "block" }}>Email is required</span>}
        </Field>
        <Field label="PHONE">
          <input style={styles.input} value={form.phone} onChange={set("phone")} placeholder="+1 (555) 000-0000" />
        </Field>
      </div>
      <Field label="YEARS OF EXPERIENCE">
        <select style={styles.select} value={form.experience} onChange={set("experience")}>
          <option value="">Select level</option>
          <option value="0–1 (entry level)">Entry Level (0–1 yr)</option>
          <option value="1–3 (junior)">Junior (1–3 yrs)</option>
          <option value="3–6 (mid-level)">Mid-Level (3–6 yrs)</option>
          <option value="6–10 (senior)">Senior (6–10 yrs)</option>
          <option value="10+ (principal/staff)">Principal / Staff (10+ yrs)</option>
        </select>
      </Field>
      <Field label="CORE SKILLS *">
        <input 
          style={{ ...styles.input, borderColor: errors.skills ? "#EF4444" : undefined }} 
          value={form.skills} 
          onChange={set("skills")} 
          placeholder="React, TypeScript, Node.js, AWS, Agile..." 
        />
        {errors.skills && <span style={{ color: "#EF4444", fontSize: 11, marginTop: 4, display: "block" }}>Core skills are required</span>}
      </Field>
      <Field label="EDUCATION">
        <input style={styles.input} value={form.education} onChange={set("education")} placeholder="B.S. Computer Science, MIT, 2021" />
      </Field>
      <Field label="KEY ACHIEVEMENTS">
        <textarea style={styles.textarea} value={form.achievements} onChange={set("achievements")} placeholder="Led migration that cut infra costs 40%; built feature used by 2M users..." rows={3} />
      </Field>
      <div style={styles.qualityBar}>
        <div style={styles.qualityFill(progress)} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, marginBottom: 16 }}>
        <span style={{ fontSize: 11, color: "#52525B" }}>Profile completeness</span>
        <span style={{ fontSize: 11, color: "#7C3AED" }}>{Math.round(progress)}%</span>
      </div>
      <button style={styles.btn} onClick={handleSubmit} disabled={loading}>
        {loading ? <div style={styles.spinner} /> : <span>⚡</span>}
        {loading ? "Generating..." : "Generate Resume"}
      </button>
    </div>
  );
}

// ─── Cover Letter Form ────────────────────────────────────────────────────────
function CoverLetterForm({ onGenerate, loading, onValidationError }) {
  const [form, setForm] = useState({
    name: "",
    role: "",
    company: "",
    skills: "",
    achievements: "",
    tone: "Professional & Confident",
  });
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) {
      setErrors((prev) => ({ ...prev, [k]: false }));
    }
  };

  const handleSubmit = () => {
    const required = ["name", "role", "company", "skills"];
    const newErrors = {};
    required.forEach((k) => {
      if (!form[k].trim()) {
        newErrors[k] = true;
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      onValidationError("Please fill in all required fields (marked with *).");
      return;
    }
    onGenerate(buildCoverLetterPrompt(form), form);
  };

  const progress = Object.values(form).filter(Boolean).length / Object.keys(form).length * 100;

  return (
    <div style={styles.card}>
      <div style={styles.cardTitle}>
        <span>✉️</span> Application Details
      </div>
      <div className="form-row">
        <Field label="FULL NAME *">
          <input 
            style={{ ...styles.input, borderColor: errors.name ? "#EF4444" : undefined }} 
            value={form.name} 
            onChange={set("name")} 
            placeholder="Alex Johnson" 
          />
          {errors.name && <span style={{ color: "#EF4444", fontSize: 11, marginTop: 4, display: "block" }}>Full name is required</span>}
        </Field>
        <Field label="TARGET ROLE *">
          <input 
            style={{ ...styles.input, borderColor: errors.role ? "#EF4444" : undefined }} 
            value={form.role} 
            onChange={set("role")} 
            placeholder="Product Manager" 
          />
          {errors.role && <span style={{ color: "#EF4444", fontSize: 11, marginTop: 4, display: "block" }}>Target role is required</span>}
        </Field>
      </div>
      <Field label="COMPANY *">
        <input 
          style={{ ...styles.input, borderColor: errors.company ? "#EF4444" : undefined }} 
          value={form.company} 
          onChange={set("company")} 
          placeholder="Stripe, Airbnb, YC Startup..." 
        />
        {errors.company && <span style={{ color: "#EF4444", fontSize: 11, marginTop: 4, display: "block" }}>Company name is required</span>}
      </Field>
      <Field label="TOP STRENGTH / SKILLS *">
        <input 
          style={{ ...styles.input, borderColor: errors.skills ? "#EF4444" : undefined }} 
          value={form.skills} 
          onChange={set("skills")} 
          placeholder="Full-stack, shipped 3 products, ex-Stripe intern..." 
        />
        {errors.skills && <span style={{ color: "#EF4444", fontSize: 11, marginTop: 4, display: "block" }}>Top strength / skills are required</span>}
      </Field>
      <Field label="STANDOUT ACHIEVEMENT">
        <textarea style={styles.textarea} value={form.achievements} onChange={set("achievements")} placeholder="Built feature that increased retention by 35% for 500K users..." rows={3} />
      </Field>
      <Field label="TONE">
        <select style={styles.select} value={form.tone} onChange={set("tone")}>
          <option>Professional & Confident</option>
          <option>Warm & Enthusiastic</option>
          <option>Direct & Concise</option>
          <option>Creative & Bold</option>
          <option>Humble & Eager</option>
        </select>
      </Field>
      <div style={styles.qualityBar}>
        <div style={styles.qualityFill(progress)} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, marginBottom: 16 }}>
        <span style={{ fontSize: 11, color: "#52525B" }}>Profile completeness</span>
        <span style={{ fontSize: 11, color: "#7C3AED" }}>{Math.round(progress)}%</span>
      </div>
      <button style={styles.btn} onClick={handleSubmit} disabled={loading}>
        {loading ? <div style={styles.spinner} /> : <span>⚡</span>}
        {loading ? "Generating..." : "Generate Cover Letter"}
      </button>
    </div>
  );
}

// ─── Output Workspace ─────────────────────────────────────────────────────────
function OutputWorkspace({ output, loading, type }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type.toLowerCase().replace(" ", "-")}.md`;
    a.click();
  };

  return (
    <div style={styles.outputCard}>
      <div style={styles.outputHeader}>
        <div style={styles.outputTitle}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: output ? "#22C55E" : "#3F3F46", display: "inline-block" }} />
          {type} Output
          {output && <span style={{ ...styles.badge, fontSize: 10 }}>READY</span>}
        </div>
        {output && (
          <div style={styles.outputActions}>
            <button style={styles.iconBtn} onClick={handleCopy}>
              {copied ? "✓ Copied" : "Copy"}
            </button>
            <button style={styles.iconBtn} onClick={handleDownload}>
              ↓ Export
            </button>
          </div>
        )}
      </div>
      <div style={styles.outputBody}>
        {loading ? (
          <div style={{ ...styles.emptyState, color: "#52525B" }}>
            <div style={{ ...styles.spinner, width: 24, height: 24, borderWidth: 2.5 }} />
            <div style={{ marginTop: 12, fontFamily: "inherit", fontSize: 13 }}>AI is writing your {type.toLowerCase()}…</div>
          </div>
        ) : output ? (
          <RenderOutput text={output} />
        ) : (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>
              {type.includes("Resume") ? "📄" : "✉️"}
            </div>
            <div style={styles.emptyTitle}>Your {type} appears here</div>
            <div style={styles.emptyText}>Fill in the form and click Generate to create your AI-crafted {type.toLowerCase()}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("resume");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const [error, setError] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  
  const [settings, setSettings] = useState(() => {
    try {
      const savedMock = localStorage.getItem("karmix_use_mock");
      const savedKey = localStorage.getItem("karmix_api_key");
      const savedProxy = localStorage.getItem("karmix_proxy_url");
      return {
        useMock: savedMock !== null ? JSON.parse(savedMock) : true,
        apiKey: savedKey || "",
        proxyUrl: savedProxy || "",
      };
    } catch {
      return {
        useMock: true,
        apiKey: "",
        proxyUrl: "",
      };
    }
  });

  const updateSetting = (key, val) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: val };
      try {
        if (key === "useMock") localStorage.setItem("karmix_use_mock", JSON.stringify(val));
        if (key === "apiKey") localStorage.setItem("karmix_api_key", val);
        if (key === "proxyUrl") localStorage.setItem("karmix_proxy_url", val);
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  const handleValidationError = (msg) => {
    setError(msg);
  };

  const generate = async (prompt, formData) => {
    setLoading(true);
    setOutput("");
    setError("");

    if (settings.useMock) {
      // Simulate network latency for realism
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const mockResult = tab === "resume" 
        ? generateMockResume(formData) 
        : generateMockCoverLetter(formData);
      setOutput(mockResult);
      showToast();
      setLoading(false);
      return;
    }

    // Live API mode
    if (!settings.apiKey.trim()) {
      setError("API Key is required in Live API Mode. Click settings (⚙️) to configure your Anthropic API Key.");
      setLoading(false);
      return;
    }

    try {
      let url = "https://api.anthropic.com/v1/messages";
      if (settings.proxyUrl.trim()) {
        url = settings.proxyUrl.trim() + "https://api.anthropic.com/v1/messages";
      }

      const response = await fetch(url, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-api-key": settings.apiKey.trim(),
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-latest",
          max_tokens: 1500,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API returned ${response.status}: ${errorText || response.statusText}`);
      }

      const data = await response.json();
      const text = (data.content || []).map((b) => b.text || "").join("");
      if (!text) {
        throw new Error("No text content returned from the API.");
      }
      setOutput(text);
      showToast();
    } catch (e) {
      setError(e.message || "Generation failed. Check your API key, proxy configuration, and internet connection.");
    } finally {
      setLoading(false);
    }
  };

  const type = tab === "resume" ? "Resume" : "Cover Letter";

  return (
    <div style={styles.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input:focus, textarea:focus, select:focus { border-color: rgba(124,58,237,0.5) !important; box-shadow: 0 0 0 3px rgba(124,58,237,0.1); }
        button:hover:not(:disabled) { opacity: 0.85; transform: translateY(-1px); }
        button:disabled { opacity: 0.5; cursor: not-allowed; }
        @keyframes spin { to { transform: rotate(360deg); } }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 16px;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .main-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Nav */}
      <nav style={styles.nav}>
        <div style={styles.logo}>
          <div style={styles.logoDot}>✦</div>
          <span>Karmix <span style={{ color: "#52525B" }}>/ Resume AI</span></span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button style={styles.iconBtn} onClick={() => setShowSettings(!showSettings)}>
            ⚙️ Settings
          </button>
          <span style={styles.badge}>PROMPT ENGINEERING</span>
        </div>
      </nav>

      {/* Main */}
      <main style={styles.main}>
        {/* Settings Panel */}
        {showSettings && (
          <div style={{
            background: "#111111",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            padding: 24,
            marginBottom: 32,
            position: "relative",
            animation: "fadeIn 0.2s ease-out"
          }}>
            <button 
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "transparent",
                border: "none",
                color: "#71717A",
                cursor: "pointer",
                fontSize: 16
              }}
              onClick={() => setShowSettings(false)}
            >
              ✕
            </button>
            <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8, color: "#E4E4E7" }}>
              ⚙️ API & Generator Settings
            </h2>
            <div className="form-row" style={{ gap: 24 }}>
              <div>
                <label style={styles.label}>GENERATOR MODE</label>
                <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                  <button 
                    style={{
                      flex: 1,
                      padding: "10px 14px",
                      borderRadius: 10,
                      border: "1px solid " + (settings.useMock ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.08)"),
                      background: settings.useMock ? "rgba(124,58,237,0.1)" : "#161616",
                      color: settings.useMock ? "#A78BFA" : "#E4E4E7",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                    onClick={() => updateSetting("useMock", true)}
                  >
                    ✨ Demo / Mock Mode
                  </button>
                  <button 
                    style={{
                      flex: 1,
                      padding: "10px 14px",
                      borderRadius: 10,
                      border: "1px solid " + (!settings.useMock ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.08)"),
                      background: !settings.useMock ? "rgba(124,58,237,0.1)" : "#161616",
                      color: !settings.useMock ? "#A78BFA" : "#E4E4E7",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                    onClick={() => updateSetting("useMock", false)}
                  >
                    ⚡ Live API Mode
                  </button>
                </div>
                <p style={{ fontSize: 11, color: "#71717A", marginTop: 8, lineHeight: 1.4 }}>
                  {settings.useMock 
                    ? "Generates high-quality mock resumes instantly in the browser without any API key or network request." 
                    : "Connects directly to Anthropic's Claude API to generate real customized content. Requires an API key."}
                </p>
              </div>
              <div>
                {!settings.useMock ? (
                  <>
                    <div style={{ marginBottom: 16 }}>
                      <label style={styles.label}>ANTHROPIC API KEY</label>
                      <input 
                        type="password" 
                        style={styles.input} 
                        value={settings.apiKey} 
                        onChange={(e) => updateSetting("apiKey", e.target.value)} 
                        placeholder="sk-ant-..." 
                      />
                      <p style={{ fontSize: 11, color: "#71717A", marginTop: 4 }}>Saved securely in your browser's local storage.</p>
                    </div>
                    <div>
                      <label style={styles.label}>CORS PROXY URL (OPTIONAL)</label>
                      <input 
                        type="text" 
                        style={styles.input} 
                        value={settings.proxyUrl} 
                        onChange={(e) => updateSetting("proxyUrl", e.target.value)} 
                        placeholder="https://cors-anywhere.herokuapp.com/" 
                      />
                      <p style={{ fontSize: 11, color: "#71717A", marginTop: 4 }}>Useful if requests are blocked by browser CORS policy.</p>
                    </div>
                  </>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", borderLeft: "1px solid rgba(255,255,255,0.06)", paddingLeft: 24 }}>
                    <span style={{ fontSize: 24, marginBottom: 8 }}>✨</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#A1A1AA", marginBottom: 4 }}>No Key Required</span>
                    <span style={{ fontSize: 12, color: "#71717A", lineHeight: 1.4 }}>Mock mode is active. You can generate unlimited high-quality career materials immediately.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Hero */}
        <div style={styles.hero}>
          <div style={styles.heroEyebrow}>✦ AI-Powered Career Tools</div>
          <h1 style={styles.heroTitle}>
            Resumes that get<br />callbacks — at scale
          </h1>
          <p style={styles.heroSub}>
            Powered by optimized prompt engineering. Generate ATS-ready resumes and compelling cover letters in seconds.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
          <div style={styles.tabs}>
            <button style={styles.tab(tab === "resume")} onClick={() => { setTab("resume"); setOutput(""); }}>
              📄 Resume Generator
            </button>
            <button style={styles.tab(tab === "cover")} onClick={() => { setTab("cover"); setOutput(""); }}>
              ✉️ Cover Letter
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="main-grid" style={styles.grid}>
          {tab === "resume"
            ? <ResumeForm onGenerate={generate} loading={loading} onValidationError={handleValidationError} />
            : <CoverLetterForm onGenerate={generate} loading={loading} onValidationError={handleValidationError} />}
          <OutputWorkspace output={output} loading={loading} type={type} />
        </div>

        {error && (
          <div style={{ marginTop: 16, padding: "12px 16px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 10, color: "#F87171", fontSize: 13 }}>
            {error}
          </div>
        )}
      </main>

      {/* Toast */}
      <div style={styles.toast(toast)}>
        ✓ {type} generated successfully
      </div>
    </div>
  );
}
