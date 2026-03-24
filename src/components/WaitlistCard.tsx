import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const BASE_URL = typeof window !== "undefined" ? window.location.origin : "";
const WAITLIST_WEBHOOK_URL = import.meta.env.VITE_WAITLIST_WEBHOOK_URL || "";

function hashCode(str: string): string {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return "hr" + Math.abs(h).toString(36);
}

const WaitlistCard = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState(0);
  const [refCount, setRefCount] = useState(0);
  const [spotsGained, setSpotsGained] = useState(0);
  const [refUrl, setRefUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const me = localStorage.getItem("hr_me");
    if (me) {
      const parsed = JSON.parse(me);
      showSuccess(parsed);
    }
  }, []);

  const showSuccess = async (me: { name: string; email: string; code: string }) => {
    const { data: allSignups } = await supabase
      .from("waitlist_signups")
      .select("email, referral_code, referred_by")
      .order("created_at", { ascending: true });

    const list = allSignups || [];
    const pos = list.findIndex(e => e.email === me.email) + 1 || list.length;
    const refs = list.filter(e => e.referred_by === me.code).length;
    const spots = Math.floor(refs / 3) * 10;
    const url = BASE_URL + "?ref=" + me.code;

    setPosition(pos);
    setRefCount(refs);
    setSpotsGained(spots);
    setRefUrl(url);
    setSubmitted(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !goal) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

    setLoading(true);
    const code = hashCode(email);
    const ref = new URLSearchParams(window.location.search).get("ref") || null;

    const { error } = await supabase.from("waitlist_signups").insert({
      name,
      email,
      goal,
      referral_code: code,
      referred_by: ref,
    });

    if (error && error.code !== "23505") {
      // 23505 = unique violation (already signed up)
      console.error("Signup error:", error);
      setLoading(false);
      return;
    }

    const me = { name, email, code };
    localStorage.setItem("hr_me", JSON.stringify(me));
    await showSuccess(me);

    if (WAITLIST_WEBHOOK_URL) {
      fetch(WAITLIST_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          goal,
          referral_code: code,
          referred_by: ref,
          signed_at: new Date().toISOString(),
        }),
      }).catch((webhookError) => {
        console.warn("Waitlist webhook failed", webhookError);
      });
    }

    setLoading(false);
  };

  const copyRef = () => {
    navigator.clipboard.writeText(refUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareText = encodeURIComponent(
    `I just joined HireReady — the AI interview coach for MENA job seekers. Join me and we both get faster beta access: ${refUrl}`
  );

  return (
    <div id="waitlist" className="bg-primary rounded-[20px] border-[2.5px] border-primary p-8 pb-7 relative shadow-[6px_6px_0_hsl(var(--navy))] animate-fade-up" style={{ animationDelay: "0.2s" }}>
      <div className="relative z-10">
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3.5 py-1.5 text-[0.7rem] font-bold tracking-widest uppercase text-lime mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse-dot" />
              Reserve Your Spot
            </span>
            <h3 className="text-[1.6rem] font-extrabold text-primary-foreground tracking-tight leading-tight mb-1.5">Be First to Access Beta</h3>
            <p className="text-[0.82rem] text-white/50 mb-6 leading-relaxed">Join the waitlist. Refer friends to move up faster and unlock beta access sooner.</p>

            <label className="block text-[0.68rem] font-bold tracking-widest uppercase text-white/45 mb-1.5">Full Name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" className="w-full bg-white/[0.08] border-[1.5px] border-white/[0.12] rounded-lg px-4 py-3 font-display text-sm text-primary-foreground outline-none focus:border-lime transition-colors mb-3.5 placeholder:text-white/25" />

            <label className="block text-[0.68rem] font-bold tracking-widest uppercase text-white/45 mb-1.5">Email Address</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="you@example.com" className="w-full bg-white/[0.08] border-[1.5px] border-white/[0.12] rounded-lg px-4 py-3 font-display text-sm text-primary-foreground outline-none focus:border-lime transition-colors mb-3.5 placeholder:text-white/25" />

            <label className="block text-[0.68rem] font-bold tracking-widest uppercase text-white/45 mb-1.5">Your Goal</label>
            <select value={goal} onChange={e => setGoal(e.target.value)} className="w-full bg-white/[0.08] border-[1.5px] border-white/[0.12] rounded-lg px-4 py-3 font-display text-sm text-primary-foreground outline-none cursor-pointer appearance-none focus:border-lime transition-colors mb-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(255,255,255,0.4)' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center" }}>
              <option value="" className="bg-navy-light">Select your goal</option>
              <option value="fresh" className="bg-navy-light">Fresh Graduate — First job</option>
              <option value="switcher" className="bg-navy-light">Career Switcher — Changing fields</option>
              <option value="promo" className="bg-navy-light">Professional — Targeting a promotion</option>
              <option value="abroad" className="bg-navy-light">Study Abroad — University interviews</option>
              <option value="tech" className="bg-navy-light">Tech Role — Software / Engineering</option>
              <option value="other" className="bg-navy-light">Other</option>
            </select>

            <button type="submit" disabled={loading} className="w-full bg-lime text-accent-foreground font-display text-sm font-extrabold tracking-wider uppercase py-3.5 rounded-lg border-none cursor-pointer hover:brightness-110 hover:-translate-y-px transition-all disabled:opacity-40 disabled:cursor-not-allowed mb-3">
              {loading ? "Reserving your spot..." : "Reserve My Beta Spot →"}
            </button>
            <p className="text-[0.68rem] text-white/30 text-center leading-relaxed">No spam. Free beta access when we launch. Referrals move you up.</p>
          </form>
        ) : (
          <div>
            <div className="w-12 h-12 rounded-full bg-lime flex items-center justify-center text-xl font-black text-accent-foreground mb-4">✓</div>
            <h3 className="text-2xl font-extrabold text-primary-foreground mb-1.5 tracking-tight">You're on the list!</h3>
            <p className="text-[0.82rem] text-white/50 leading-relaxed mb-5">We'll email you when your beta access is ready. Share below — every referral moves you up faster.</p>

            <div className="bg-white/[0.07] border border-white/10 rounded-lg p-4 flex justify-between items-center mb-5">
              {[
                { label: "Your Position", value: `#${position}`, caption: "in waitlist" },
                { label: "Referrals", value: String(refCount), caption: "friends referred" },
                { label: "Spots Gained", value: `+${spotsGained}`, caption: "from sharing" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  {i > 0 && <div className="w-px h-11 bg-white/10" />}
                  <div className="text-center">
                    <div className="text-[0.62rem] font-bold tracking-widest uppercase text-white/35 mb-1">{item.label}</div>
                    <div className="text-3xl font-extrabold text-lime tracking-tight leading-none">{item.value}</div>
                    <div className="text-[0.62rem] text-white/30 mt-0.5">{item.caption}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[0.68rem] font-bold tracking-widest uppercase text-white/45 mb-2">Your referral link</div>
            <div className="flex items-center gap-2 bg-white/[0.07] border border-white/10 rounded-lg px-3 py-2 mb-3">
              <span className="flex-1 text-xs text-white/40 truncate">{refUrl}</span>
              <button onClick={copyRef} className="bg-lime border-none rounded-md px-3 py-1.5 font-display text-[0.68rem] font-extrabold text-accent-foreground cursor-pointer uppercase tracking-wider hover:brightness-110 whitespace-nowrap">
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            <div className="flex gap-2 mb-3">
              <a href={`https://wa.me/?text=${shareText}`} target="_blank" rel="noopener noreferrer" className="flex-1 py-2.5 rounded-lg text-[0.7rem] font-bold cursor-pointer border-[1.5px] border-white/15 bg-white/[0.06] text-white/60 hover:border-white/35 hover:text-primary-foreground hover:bg-white/10 transition-all flex items-center justify-center gap-1.5 no-underline uppercase tracking-wider">
                WhatsApp
              </a>
              <a href={`https://twitter.com/intent/tweet?text=${shareText}`} target="_blank" rel="noopener noreferrer" className="flex-1 py-2.5 rounded-lg text-[0.7rem] font-bold cursor-pointer border-[1.5px] border-white/15 bg-white/[0.06] text-white/60 hover:border-white/35 hover:text-primary-foreground hover:bg-white/10 transition-all flex items-center justify-center gap-1.5 no-underline uppercase tracking-wider">
                X / Twitter
              </a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(refUrl)}`} target="_blank" rel="noopener noreferrer" className="flex-1 py-2.5 rounded-lg text-[0.7rem] font-bold cursor-pointer border-[1.5px] border-white/15 bg-white/[0.06] text-white/60 hover:border-white/35 hover:text-primary-foreground hover:bg-white/10 transition-all flex items-center justify-center gap-1.5 no-underline uppercase tracking-wider">
                LinkedIn
              </a>
            </div>

            <div className="bg-lime/10 border border-lime/25 rounded-lg px-3.5 py-2.5 text-xs text-lime font-medium text-center">
              Every 3 referrals moves you up 10 spots — share now 🚀
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitlistCard;
