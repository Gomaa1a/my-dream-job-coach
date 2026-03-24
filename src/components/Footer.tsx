const Footer = () => (
  <footer className="bg-primary px-16 py-8 flex items-center justify-between flex-wrap gap-4 border-t-2 border-white/[0.08] max-md:px-6">
    <a href="#" className="flex items-center gap-2 text-xl font-extrabold text-primary-foreground tracking-tight no-underline">
      <span className="w-2.5 h-2.5 rounded-full bg-hr-blue" />
      HireReady
    </a>
    <p className="text-xs text-white/30">
      Built with ❤ in Cairo, Egypt &nbsp;·&nbsp;{" "}
      <a href="mailto:hello@hireready.ai" className="text-lime no-underline hover:underline">hello@hireready.ai</a>
    </p>
    <p className="text-xs text-white/30">© 2025 HireReady. All rights reserved.</p>
  </footer>
);

export default Footer;
