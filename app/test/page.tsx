"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function TestPage() {
  useEffect(() => {
    const test = async () => {
      const { data, error } = await supabase.from("loans").select("*");

      console.log("DATA:", data);
      console.log("ERROR:", error);
    };

    test();
  }, []);

  return (
    <div className="p-10">
      <h1>Testing Supabase Connection...</h1>
      <p>Check browser console</p>
    </div>
  );
}