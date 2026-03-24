const steps = [
  { num: "01", title: "Upload your CV", desc: "Drop your resume (PDF or Word) and the AI reads it to personalise every question to your real background.", color: "lime" },
  { num: "02", title: "Choose your sector", desc: "Pick from 10+ industries — Tech, Finance, Healthcare, Marketing, HR, and more. Or type a custom role.", color: "blue" },
  { num: "03", title: "15-min AI interview", desc: "A structured 5-phase interview: Opening, Technical, Behavioral, Situational, Closing — just like the real thing.", color: "orange" },
  { num: "04", title: "Get your report", desc: "Scores across 6 dimensions with specific feedback on what you said well and where to improve.", color: "purple" },
];

const colorMap: Record<string, { bg: string; titleColor: string; numColor: string; descColor: string }> = {
  lime: { bg: "bg-lime", titleColor: "text-accent-foreground", numColor: "text-accent-foreground/60", descColor: "text-accent-foreground/65" },
  blue: { bg: "bg-hr-blue", titleColor: "text-primary-foreground", numColor: "text-white/70", descColor: "text-white/65" },
  orange: { bg: "bg-hr-orange", titleColor: "text-primary-foreground", numColor: "text-white/70", descColor: "text-white/65" },
  purple: { bg: "bg-hr-purple", titleColor: "text-primary-foreground", numColor: "text-white/70", descColor: "text-white/65" },
};

const HowItWorks = () => (
  <section id="how" className="bg-primary py-20 px-16 border-b-2 border-primary max-md:py-14 max-md:px-6">
    <h2 className="text-[clamp(2.2rem,4vw,3.2rem)] font-extrabold tracking-tight text-primary-foreground text-center mb-2">How it works</h2>
    <p className="text-center text-base text-white/45 mb-12">From CV upload to detailed report in 4 simple steps.</p>
    <div className="grid grid-cols-4 gap-5 max-w-[1100px] mx-auto max-md:grid-cols-2">
      {steps.map((step) => {
        const c = colorMap[step.color];
        return (
          <div key={step.num} className={`${c.bg} rounded-2xl p-7 relative overflow-hidden`}>
            <div className="absolute -bottom-2.5 -right-1 text-[7rem] font-extrabold leading-none opacity-15 pointer-events-none select-none">{step.num}</div>
            <div className={`text-[0.7rem] font-bold tracking-[0.1em] uppercase mb-4 ${c.numColor}`}>Step {step.num}</div>
            <h3 className={`text-lg font-extrabold tracking-tight mb-2 relative ${c.titleColor}`}>{step.title}</h3>
            <p className={`text-[0.8rem] leading-relaxed relative ${c.descColor}`}>{step.desc}</p>
          </div>
        );
      })}
    </div>
  </section>
);

export default HowItWorks;
