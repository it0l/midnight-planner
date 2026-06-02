"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full p-8 bg-zinc-900/80 backdrop-blur-md border border-zinc-800/50 rounded-2xl shadow-2xl"
    >
      <div className="flex flex-col space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-zinc-100 tracking-tight">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="text-sm text-zinc-500 mt-2">
            {isLogin ? 'Enter your credentials to access your workspace' : 'Start your nocturnal journey'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <div className="relative group">
            <input
              type="email"
              id="email"
              className="block px-4 pb-2.5 pt-5 w-full text-sm text-zinc-100 bg-zinc-950/50 border border-zinc-800 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-zinc-500 focus:bg-zinc-900 peer transition-all duration-300"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-zinc-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-focus:text-zinc-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
            >
              Email
            </label>
          </div>

          <div className="relative group">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="block px-4 pb-2.5 pt-5 w-full text-sm text-zinc-100 bg-zinc-950/50 border border-zinc-800 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-zinc-500 focus:bg-zinc-900 peer transition-all duration-300 pr-12"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-zinc-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-focus:text-zinc-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
            >
              Password
            </label>
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-8 h-8 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={showPassword ? 'hide' : 'show'}
                  initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  transition={{ duration: 0.15 }}
                >
                  {showPassword ? <EyeOff size={18} className="text-zinc-300" /> : <Eye size={18} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 mt-4 bg-zinc-100 text-zinc-900 font-medium rounded-xl hover:bg-white hover:shadow-[0_0_20px_rgba(254,240,138,0.15)] transition-all duration-300"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </motion.button>
        </form>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}