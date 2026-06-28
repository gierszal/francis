"use client";

import { useState } from "react";
import { VscLock } from "react-icons/vsc";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";

export function AuthForm() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-[36px] border border-white/10 bg-zinc-900/95 p-10 shadow-2xl">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-3xl bg-emerald-500 text-black shadow-lg shadow-emerald-500/20">
            <VscLock size={28} />
          </div>

          <h1 className="text-3xl font-bold text-white">
            {isLogin ? "Welcome back" : "Create account"}
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            {isLogin
              ? "Sign in to access more features."
              : "Create an account to unlock full access."}
          </p>
        </div>

        {isLogin ? <SignInForm /> : <SignUpForm />}

        <div className="mt-8 text-center">
          <span className="text-zinc-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>

          <button
            onClick={() => setIsLogin((prev) => !prev)}
            className="ml-2 font-medium text-emerald-400 transition hover:text-emerald-300 cursor-pointer"
          >
            {isLogin ? "Create one" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
