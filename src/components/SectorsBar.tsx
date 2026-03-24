const sectors = [
  "Product Management", "Data Science", "UX Design", "Marketing",
  "Finance", "DevOps", "AI / ML", "Business Analysis",
];

const SectorsBar = () => (
  <div className="bg-navy-light border-b-2 border-primary overflow-hidden">
    <div className="flex whitespace-nowrap">
      {sectors.map((s) => (
        <div key={s} className="px-8 py-3.5 text-xs font-bold tracking-[0.1em] uppercase text-white/50 border-r-[1.5px] border-white/[0.08] flex items-center gap-1.5 shrink-0">
          {s} <span className="text-hr-blue text-sm font-black">+</span>
        </div>
      ))}
    </div>
  </div>
);

export default SectorsBar;
