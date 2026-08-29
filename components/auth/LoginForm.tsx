"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error ?? "Something went wrong.");
        return;
      }

      if (isLogin) {
        window.location.href = "/dashboard";
      } else {
        setMessage("Account created. You can sign in now.");
        setIsLogin(true);
        setPassword("");
      }
    } catch {
      setMessage("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full rounded-2xl border border-zinc-800/50 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur-md"
    >
      <div className="flex flex-col space-y-8">
        <div className="text-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-200/80">Midnight Planner</p>
          <h2 className="text-2xl font-medium tracking-tight text-zinc-100">
            {isLogin ? "Welcome back" : "Create an account"}
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            {isLogin ? "Return to your quiet workspace" : "Save your ideas after the lights go down"}
          </p>

          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-4 rounded-md border border-zinc-700/50 bg-zinc-800/50 px-4 py-2 text-sm font-medium text-zinc-300"
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <div className="relative group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="peer block w-full appearance-none rounded-xl border border-zinc-800 bg-zinc-950/50 px-4 pb-2.5 pt-5 text-sm text-zinc-100 transition-all duration-300 focus:border-zinc-500 focus:bg-zinc-900 focus:outline-none focus:ring-0"
              placeholder=" "
              autoComplete="email"
              required
            />
            <label htmlFor="email" className="absolute left-4 top-4 z-10 origin-[0] -translate-y-3 scale-75 text-sm text-zinc-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-zinc-300">
              Email
            </label>
          </div>

          <div className="relative group">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={8}
              className="peer block w-full appearance-none rounded-xl border border-zinc-800 bg-zinc-950/50 px-4 pb-2.5 pt-5 pr-12 text-sm text-zinc-100 transition-all duration-300 focus:border-zinc-500 focus:bg-zinc-900 focus:outline-none focus:ring-0"
              placeholder=" "
              autoComplete={isLogin ? "current-password" : "new-password"}
              required
            />
            <label htmlFor="password" className="absolute left-4 top-4 z-10 origin-[0] -translate-y-3 scale-75 text-sm text-zinc-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-zinc-300">
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-zinc-500 transition-colors hover:text-zinc-300"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {!isLogin && <p className="-mt-2 text-xs text-zinc-600">Use at least 8 characters.</p>}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full rounded-xl bg-zinc-100 py-3 font-medium text-zinc-900 transition-all duration-300 hover:bg-white hover:shadow-[0_0_20px_rgba(254,240,138,0.15)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
          </motion.button>
        </form>

        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={() => {
              setIsLogin((value) => !value);
              setMessage("");
              setPassword("");
            }}
            className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
