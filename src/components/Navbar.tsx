const Navbar = () => {
  return (
    <nav className="bg-background border-b-2 border-primary px-8 h-16 flex items-center justify-between sticky top-0 z-50 max-md:px-5">
      <a href="#" className="flex items-center gap-2 text-xl font-extrabold text-primary tracking-tight no-underline">
        <span className="w-2.5 h-2.5 rounded-full bg-hr-blue" />
        HireReady
      </a>
      <ul className="flex items-center gap-10 list-none max-md:hidden">
        <li><a href="#how" className="text-sm font-medium text-primary no-underline hover:opacity-60 transition-opacity">How it works</a></li>
        <li><a href="#features" className="text-sm font-medium text-primary no-underline hover:opacity-60 transition-opacity">Features</a></li>
        <li>
          <a href="#waitlist" className="bg-hr-blue text-primary-foreground font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full no-underline hover:brightness-110 hover:-translate-y-px transition-all">
            Join Waitlist
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
