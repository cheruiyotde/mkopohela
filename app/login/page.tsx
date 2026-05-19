"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      if (!data.session) {
        alert("Login failed");
        return;
      }

      // 🔥 IMPORTANT: force session refresh
      router.push("/dashboard");
      router.refresh();

    } catch (err) {
      console.error(err);
      alert("Login error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-6">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-10 shadow-xl"
      >

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black text-slate-900">
            MkopoHela
          </h1>

          <h2 className="mt-6 text-3xl font-bold text-slate-900">
            Welcome Back
          </h2>

          <p className="mt-3 text-slate-600">
            Login to access your dashboard
          </p>
        </div>

        <div className="space-y-6">

          {/* EMAIL */}
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-blue-500"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-blue-500"
            />
          </div>

          {/* BUTTON */}
          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 py-4 font-bold text-white shadow-lg transition hover:scale-[1.01]"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </div>

        <p className="mt-8 text-center text-slate-600">
          Don’t have an account?{" "}
          <Link href="/register" className="font-semibold text-blue-600">
            Register
          </Link>
        </p>

      </motion.div>
    </section>
  );
}