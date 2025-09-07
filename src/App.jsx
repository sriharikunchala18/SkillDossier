import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, Users, Sun, Moon, ChevronRight, CheckCircle2, Mail, Phone, MapPin, Calendar, Filter } from "lucide-react";

// --- Utilities
const cx = (...classes) => classes.filter(Boolean).join(" ");

// --- Theme Toggle
function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  React.useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setDark((d) => !d)}
      className="inline-flex items-center gap-2 rounded-2xl border px-3 py-1 text-sm shadow-sm hover:shadow-md transition"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="hidden sm:inline">{dark ? "Light" : "Dark"} mode</span>
    </button>
  );
}

// --- Mock Data
const MENTORS = [
  {
    id: "m1",
    name: "samyuktha Menon",
    title: "Senior Frontend Engineer @ FinTech",
    skills: ["React", "TypeScript", "System Design"],
    rating: 4.9,
    years: 8,
    price: 0,
    timezone: "+05:30",
    about: "Mentors juniors transitioning into frontend roles. Focus on roadmaps and portfolio reviews.",
    image:"/assets/mentors/mentor1.png",
  },
  {
    id: "m2",
    name: "Ishita Kapoor",
    title: "Data Scientist @ HealthTech",
    skills: ["Machine Learning", "Python", "MLOps"],
    rating: 4.8,
    years: 6,
    price: 15,
    timezone: "+05:30",
    about: "ML career guidance, capstone projects, interview prep.",
    image: "/assets/mentors/mentor2.png",
  },
  {
    id: "m3",
    name: "Rohit Kumar",
    title: "Backend Engineer @ SaaS Unicorn",
    skills: ["Node.js", "Databases", "System Design"],
    rating: 4.7,
    years: 7,
    price: 10,
    timezone: "+05:30",
    about: "Scalable APIs, DB design, and practical system design walkthroughs.",
    image: "/assets/mentors/mentor3.png",
  },
  {
    id: "m4",
    name: "Neha Sharma",
    title: "Mobile Lead @ EdTech",
    skills: ["Flutter", "Android", "iOS"],
    rating: 4.8,
    years: 9,
    price: 12,
    timezone: "+05:30",
    about: "End-to-end mobile architecture, publishing, and performance.",
    image: "/assets/mentors/mentor4.png",
  },
];

// --- Navbar
function Navbar({ page, setPage }) {
  return (
    <div className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-neutral-900/70 border-b">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400" />
          <span className="font-semibold text-lg">SkillDossier</span>
        </div>
        <div className="hidden md:flex items-center gap-1">
          {[
            ["Home", "home"],
            ["Mentors", "mentors"],
            ["Dashboard", "dashboard"],
            ["Contact", "contact"],
          ].map(([label, key]) => (
            <button
              key={key}
              onClick={() => setPage(key)}
              className={cx(
                "px-3 py-2 rounded-xl text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10",
                page === key && "bg-black/10 dark:bg-white/10"
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setPage("mentors")}
            className="hidden sm:inline-flex items-center gap-2 rounded-2xl bg-blue-600 text-white px-4 py-2 text-sm shadow hover:shadow-lg"
          >
            Find a Mentor <ChevronRight className="h-4 w-4" />


          </button>
        </div>
      </div>
    </div>
  );
}

// --- Home Page
function Home({ setPage }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-10"
    >
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Grow faster with real-world <span className="text-blue-600">mentorship</span>
          </h1>
          <p className="mt-4 text-neutral-600 dark:text-neutral-300">
            SkillDossier connects learners with vetted professionals. Discover mentors, book 1:1 sessions, and track progress in a simple dashboard.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => setPage("mentors")} className="rounded-2xl bg-blue-600 text-white px-5 py-3 shadow hover:shadow-lg">Browse Mentors</button>
            <button onClick={() => setPage("dashboard") } className="rounded-2xl border px-5 py-3 shadow-sm hover:shadow-md">Open Dashboard</button>
          </div>
          <ul className="mt-6 grid sm:grid-cols-3 gap-3 text-sm">
            {[
              "Vetted Experts",
              "Accessible Pricing",
              "Project Guidance",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" />{t}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border p-6 shadow-sm">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="rounded-2xl p-4 bg-black/5 dark:bg-white/10">
              <div className="text-3xl font-bold">250+</div>
              <div className="text-xs opacity-80">Mentors</div>
            </div>
            <div className="rounded-2xl p-4 bg-black/5 dark:bg-white/10">
              <div className="text-3xl font-bold">4.8★</div>
              <div className="text-xs opacity-80">Avg Rating</div>
            </div>
            <div className="rounded-2xl p-4 bg-black/5 dark:bg-white/10">
              <div className="text-3xl font-bold">10k+</div>
              <div className="text-xs opacity-80">Sessions</div>
            </div>
          </div>
          <div className="mt-6 rounded-2xl p-4 border text-sm">
            <div className="font-medium mb-2">How it works</div>
            <ol className="space-y-2">
              {[
                "Search mentors by skill & experience",
                "Request a session and propose time",
                "Meet, learn, and track progress",
              ].map((s, i) => (
                <li key={s} className="flex items-start gap-3">
                  <div className="mt-0.5 h-5 w-5 rounded-full bg-blue-600 text-white text-xs grid place-items-center">{i+1}</div>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </motion.main>
  );
}

// --- Mentor Card
function MentorCard({ m, onRequest }) {
  return (
    <motion.div layout className="rounded-3xl border p-5 shadow-sm hover:shadow-md transition">
      <img
        src={m.image}
        alt={m.name}
        className="w-20 h-20 rounded-full object-cover mb-3"
      />
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold">{m.name}</div>
          <div className="text-sm opacity-80">{m.title}</div>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Star className="h-4 w-4" />{m.rating}
        </div>
      </div>
      ...
    </motion.div>
  );
}

// --- Request Modal
function RequestModal({ open, onClose, mentor }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const valid = name && /.+@.+\..+/.test(email) && date;

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-lg rounded-3xl bg-white dark:bg-neutral-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="font-semibold">Request Session {mentor ? `with ${mentor.name}` : ""}</div>
              <button onClick={onClose} className="rounded-xl px-2 py-1 text-sm hover:bg-black/5 dark:hover:bg-white/10">Close</button>
            </div>
            <div className="mt-4 grid gap-3">
              <label className="grid gap-1 text-sm">
                <span>Name</span>
                <input value={name} onChange={(e)=>setName(e.target.value)} className="rounded-xl border px-3 py-2 bg-transparent" placeholder="Your full name" />
              </label>
              <label className="grid gap-1 text-sm">
                <span>Email</span>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} className="rounded-xl border px-3 py-2 bg-transparent" placeholder="you@example.com" />
              </label>
              <label className="grid gap-1 text-sm">
                <span>Preferred Date</span>
                <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="rounded-xl border px-3 py-2 bg-transparent" />
              </label>
              <label className="grid gap-1 text-sm">
                <span>Notes</span>
                <textarea value={notes} onChange={(e)=>setNotes(e.target.value)} className="rounded-xl border px-3 py-2 bg-transparent" placeholder="What would you like to cover?" />
              </label>
              <button disabled={!valid} className={cx("rounded-2xl px-4 py-2 text-sm shadow", valid ? "bg-blue-600 text-white hover:shadow-lg" : "bg-neutral-300 text-neutral-500 cursor-not-allowed")}
                onClick={()=>{
                  onClose();
                  alert("Request submitted (demo). Check Dashboard → Mentee → Requests.");
                }}
              >Submit Request</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- Mentors Page
function Mentors() {
  const [q, setQ] = useState("");
  const [skill, setSkill] = useState("All");
  const [price, setPrice] = useState("Any");
  const [selected, setSelected] = useState(null);
  const skills = useMemo(() => ["All", ...Array.from(new Set(MENTORS.flatMap((m) => m.skills)))], []);

  const filtered = MENTORS.filter((m) => {
    const matchesQ = [m.name, m.title, m.skills.join(" ")].join(" ").toLowerCase().includes(q.toLowerCase());
    const matchesSkill = skill === "All" || m.skills.includes(skill);
    const matchesPrice = price === "Any" || (price === "Free" ? m.price === 0 : m.price > 0);
    return matchesQ && matchesSkill && matchesPrice;
  });

  return (
    <motion.main initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold">Find your mentor</h2>
        <div className="flex items-center gap-2 text-sm opacity-80"><Filter className="h-4 w-4"/>Smart filters</div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <label className="col-span-2 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 opacity-60" />
          <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search by name, skill, or title" className="w-full rounded-2xl border pl-9 pr-3 py-2 bg-transparent" />
        </label>
        <div className="grid grid-cols-2 gap-2">
          <select value={skill} onChange={(e)=>setSkill(e.target.value)} className="rounded-2xl border px-3 py-2 bg-transparent">
            {skills.map((s)=> <option key={s}>{s}</option>)}
          </select>
          <select value={price} onChange={(e)=>setPrice(e.target.value)} className="rounded-2xl border px-3 py-2 bg-transparent ">
            {["Any","Free","Paid"].map((p)=> <option key={p}>{p}</option>)}
          </select>
        </div>
      </div>

      <motion.div layout className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((m) => (
          <MentorCard key={m.id} m={m} onRequest={(mm)=>setSelected(mm)} />
        ))}
      </motion.div>

      <RequestModal open={!!selected} mentor={selected} onClose={()=>setSelected(null)} />
    </motion.main>
  );
}

// --- Dashboard Page
function Dashboard() {
  const [tab, setTab] = useState("mentee");

  return (
    <motion.main initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <div className="inline-flex rounded-2xl border p-1">
          {[
            ["Mentee", "mentee"],
            ["Mentor", "mentor"],
          ].map(([label, key]) => (
            <button key={key} onClick={()=>setTab(key)} className={cx("px-4 py-2 rounded-xl text-sm", tab===key && "bg-black/10 dark:bg-white/10")}>{label}</button>
          ))}
        </div>
      </div>

      {tab === "mentee" ? <MenteePanel/> : <MentorPanel/>}
    </motion.main>
  );
}

function PanelCard({ title, children, aside }) {
  return (
    <div className="rounded-3xl border p-5 shadow-sm grid md:grid-cols-[1fr,260px] gap-4">
      <div>
        <div className="font-medium mb-2">{title}</div>
        {children}
      </div>
      {aside && (
        <div className="rounded-2xl border p-4 bg-black/5 dark:bg-white/10 text-sm">
          {aside}
        </div>
      )}
    </div>
  );
}

function MenteePanel(){
  return (
    <div className="mt-6 grid gap-4">
      <PanelCard title="Your Requests" aside={<div>
        <div className="font-medium">Tips</div>
        <ul className="mt-2 list-disc pl-5 space-y-1 opacity-80">
          <li>Be specific with goals</li>
          <li>Attach a short portfolio</li>
        </ul>
      </div>}>
        <div className="text-sm opacity-80">No active requests. Submit one from Mentors → Request.</div>
      </PanelCard>
      <PanelCard title="Saved Mentors">
        <div className="grid gap-3 sm:grid-cols-2">
          {MENTORS.slice(0,2).map((m)=>(
            <div key={m.id} className="rounded-2xl border p-4 text-sm flex items-center justify-between">
              <div>
                <div className="font-medium">{m.name}</div>
                <div className="opacity-80">{m.title}</div>
              </div>
              <button className="rounded-xl border px-3 py-1">View</button>
            </div>
          ))}
        </div>
      </PanelCard>
      <PanelCard title="Progress">
        <div className="grid grid-cols-3 gap-3 text-center">
          {["Profile", "First Session", "Project"].map((s, i)=>(
            <div key={s} className="rounded-2xl p-4 bg-black/5 dark:bg-white/10">
              <div className="text-2xl font-bold">{[100, 40, 10][i]}%</div>
              <div className="text-xs opacity-80">{s}</div>
            </div>
          ))}
        </div>
      </PanelCard>
    </div>
  );
}

function MentorPanel(){
  return (
    <div className="mt-6 grid gap-4">
      <PanelCard title="Incoming Requests" aside={<div>
        <div className="font-medium">Availability</div>
        <div className="mt-2 text-sm opacity-80">Mon–Fri • 7–9 PM IST</div>
        <button className="mt-3 w-full rounded-xl border px-3 py-2 text-sm">Edit</button>
      </div>}>
        <div className="text-sm opacity-80">No new requests. (Demo)</div>
      </PanelCard>
      <PanelCard title="Your Ratings">
        <div className="flex items-center gap-2"><Star className="h-4 w-4"/> 4.8 average across 120 sessions</div>
      </PanelCard>
    </div>
  );
}

// --- Contact Page
function Contact(){
  const [form, setForm] = useState({ name: "", email: "", topic: "General", message: "" });
  const valid = form.name && /.+@.+\..+/.test(form.email) && form.message.length > 8;
  return (
    <motion.main initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold">Contact</h2>
      <div className="mt-4 grid md:grid-cols-2 gap-6">
        <div className="rounded-3xl border p-6 shadow-sm">
          <div className="grid gap-3">
            <label className="grid gap-1 text-sm">
              <span>Name</span>
              <input className="rounded-xl border px-3 py-2 bg-transparent" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} />
            </label>
            <label className="grid gap-1 text-sm">
              <span>Email</span>
              <input className="rounded-xl border px-3 py-2 bg-transparent" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} />
            </label>
            <label className="grid gap-1 text-sm">
              <span>Topic</span>
              <select className="rounded-xl border px-3 py-2 bg-transparent" value={form.topic} onChange={(e)=>setForm({...form, topic:e.target.value})}>
                {['General', 'Mentorship Request', 'Partnership', 'Support'].map(t=> <option key={t}>{t}</option>)}
              </select>
            </label>
            <label className="grid gap-1 text-sm">
              <span>Message</span>
              <textarea rows={5} className="rounded-xl border px-3 py-2 bg-transparent" value={form.message} onChange={(e)=>setForm({...form, message:e.target.value})} />
            </label>
            <button disabled={!valid} className={cx("rounded-2xl px-4 py-2 text-sm shadow", valid ? "bg-blue-600 text-white hover:shadow-lg" : "bg-neutral-300 text-neutral-500 cursor-not-allowed")}
              onClick={()=>alert("Thanks! We will get back to you shortly. (Demo)")}
            >Send Message</button>
          </div>
        </div>
        <div className="grid gap-3 h-fit">
          <div className="rounded-3xl border p-6">
            <div className="font-medium mb-2">Contact Info</div>
            <div className="space-y-2 text-sm opacity-90">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4"/> hello@skilldossier.io</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4"/> +91 90000 00000</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/> Hyderabad, IN</div>
              <div className="flex items-center gap-2"><Calendar className="h-4 w-4"/> Mon–Fri • 10am–6pm IST</div>
            </div>
          </div>
          <div className="rounded-3xl border p-6 bg-black/5 dark:bg-white/10">
            <div className="font-medium mb-2">Why SkillDossier?</div>
            <ul className="list-disc pl-5 text-sm space-y-1 opacity-90">
              <li>1:1 guidance from industry experts</li>
              <li>Structured roadmaps and feedback</li>
              <li>Friendly pricing and scholarships</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.main>
  );
}

// --- Footer
function Footer(){
  return (
    <footer className="mt-16 border-t">
      <div className="container mx-auto px-4 py-8 grid sm:grid-cols-3 gap-6 text-sm">
        <div>
          <div className="font-semibold">SkillDossier</div>
          <p className="opacity-80 mt-2">Career growth & mentorship platform — learner first.</p>
        </div>
        <div>
          <div className="font-medium">Explore</div>
          <ul className="mt-2 space-y-1 opacity-90">
            <li>Mentors</li>
            <li>Dashboard</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <div className="font-medium">Legal</div>
          <ul className="mt-2 space-y-1 opacity-90">
            <li>Terms</li>
            <li>Privacy</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

// --- Root App
export default function App(){
  const [page, setPage] = useState("home");
  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Navbar page={page} setPage={setPage} />
      <AnimatePresence mode="wait">
        {page === "home" && <Home key="home" setPage={setPage} />}
        {page === "mentors" && <Mentors key="mentors" />}
        {page === "dashboard" && <Dashboard key="dashboard" />}
        {page === "contact" && <Contact key="contact" />}
      </AnimatePresence>
      <Footer />
      <div className="pb-10" />
    </div>
  );
} 