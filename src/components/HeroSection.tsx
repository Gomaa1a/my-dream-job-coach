import WaitlistCard from "./WaitlistCard";

const HeroSection = () => {
  return (
    <section className="bg-background px-16 py-[4.5rem] pb-20 grid grid-cols-2 gap-12 items-center min-h-[calc(100vh-100px)] border-b-2 border-primary max-md:grid-cols-1 max-md:px-6 max-md:py-12 max-md:min-h-0">
      <div className="relative">
        <div className="animate-fade-up" style={{ animationDelay: "0.05s" }}>
          <span className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-[0.72rem] font-bold tracking-[0.1em] uppercase px-4 py-2 rounded-full border-2 border-primary mb-8">
            <span className="w-[7px] h-[7px] rounded-full bg-lime animate-pulse-dot" />
            Waitlist Open — Beta Coming Soon
          </span>
        </div>

        <h1 className="animate-fade-up text-[clamp(3rem,5.5vw,4.8rem)] font-extrabold leading-none tracking-tight text-primary mb-2.5" style={{ animationDelay: "0.1s" }}>
          Stop <span className="relative inline-block">
            freezing
            <span className="absolute bottom-[12%] left-0 right-0 h-[5px] bg-hr-orange rounded-sm -rotate-[1.5deg]" />
          </span>
          <br />in interviews.
          <br /><span className="inline-block bg-lime px-[0.25em] py-[0.1em] rounded-md text-primary leading-tight">Get hired.</span>
        </h1>

        <p className="animate-fade-up text-base text-muted-foreground leading-relaxed max-w-[480px] mb-10" style={{ animationDelay: "0.15s" }}>
          Practice with a tough AI interviewer that adapts to your sector,
          experience level, and CV. Get a detailed 6-dimension performance
          report after every session. Built for MENA job seekers.
        </p>

        <div className="animate-fade-up flex gap-4 flex-wrap" style={{ animationDelay: "0.2s" }}>
          <a href="#waitlist" className="bg-primary text-primary-foreground font-display text-[0.82rem] font-bold tracking-[0.08em] uppercase px-7 py-3.5 rounded-full border-2 border-primary no-underline inline-flex items-center hover:bg-hr-blue hover:border-hr-blue hover:-translate-y-0.5 transition-all">
            Join Waitlist — It's Free
          </a>
          <a href="#how" className="bg-transparent text-primary font-display text-[0.82rem] font-bold tracking-[0.06em] uppercase px-7 py-3.5 rounded-full border-2 border-primary no-underline inline-flex items-center hover:bg-primary hover:text-primary-foreground transition-all">
            See How It Works
          </a>
        </div>
      </div>

      <WaitlistCard />
    </section>
  );
};

export default HeroSection;
