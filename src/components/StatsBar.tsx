import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const StatsBar = () => {
  const [count, setCount] = useState(47);

  useEffect(() => {
    const fetchCount = async () => {
      const { count: total } = await supabase
        .from("waitlist_signups")
        .select("*", { count: "exact", head: true });
      if (total !== null) {
        setCount(Math.max(47, total));
      }
    };
    fetchCount();
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
