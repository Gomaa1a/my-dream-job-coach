import { useEffect, useState } from "react";

const StatsBar = () => {
  const [count, setCount] = useState(47);

  useEffect(() => {
    const list = localStorage.getItem("hr_waitlist");
    if (list) {
      const parsed = JSON.parse(list);
      setCount(Math.max(47, parsed.length));
    }
  }, []);

  return (
    <div className="bg-cream-dark border-b-[1.5px] border-primary py-2.5 px-8 flex items-center justify-center gap-8 text-sm font-medium text-primary">
      <span className="flex items-center gap-1.5">🔥 <strong className="font-extrabold">{count}+</strong> job seekers signed up</span>
      <span className="opacity-30">|</span>
      <span className="flex items-center gap-1.5">🎯 Beta launching soon — limited spots</span>
    </div>
  );
};

export default StatsBar;
