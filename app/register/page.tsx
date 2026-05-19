"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // ✅ PHONE STATE (FIXED - WAS MISSING BEFORE)
  const [phone, setPhone] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const name = form.get("name")?.toString();
    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();

    if (!name || !email || !phone || !password) {
      alert("Please fill in all fields");
      return;
    }

    // ✅ VALIDATION: Kenyan phone rules
    const cleanPhone = phone.replace(/\D/g, "");

    if (cleanPhone.length !== 10) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    if (!cleanPhone.startsWith("07") && !cleanPhone.startsWith("01")) {
      alert("Enter a valid Kenyan phone number (07XXXXXXXX or 01XXXXXXXX)");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            phone: cleanPhone, // ✅ store CLEAN number only
          },
        },
      });

      if (error) {
        alert(error.message);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-6">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 shadow-xl"
      >

        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black text-blue-600">
            MkopoHela
          </h1>

          <h2 className="mt-5 text-2xl font-bold text-slate-900">
            Create Account
          </h2>
        </div>

        {/* FORM */}
        <form onSubmit={handleRegister} className="space-y-5">

          <input
            name="name"
            type="text"
            placeholder="Full Name"
            className="input"
          />

          <input
  name="phone"
  placeholder="07XXXXXXXX"
  className="input"
  type="text"
  inputMode="numeric"
  autoComplete="tel"
  value={phone}
  onChange={(e) => {
    // STEP 1: remove EVERYTHING except numbers
    let value = e.target.value.replace(/[^0-9]/g, "");

    // STEP 2: force max 10 digits
    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    setPhone(value);
  }}
  onPaste={(e) => {
    // STEP 3: clean pasted text too
    e.preventDefault();
    const pasted = e.clipboardData.getData("text");
    const cleaned = pasted.replace(/[^0-9]/g, "").slice(0, 10);
    setPhone(cleaned);
  }}
/>

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="input"
          />

          <input
            name="password"
            type="password"
            placeholder="Password (min 6 chars)"
            className="input"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 py-4 font-bold text-white shadow-lg hover:scale-[1.01] transition"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="mt-6 text-center text-slate-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-blue-600">
            Login
          </Link>
        </p>

      </motion.div>

      {/* STYLE */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 14px 16px;
          border-radius: 14px;
          border: 1px solid #e2e8f0;
          outline: none;
        }

        .input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
        }
      `}</style>

    </section>
  );
}