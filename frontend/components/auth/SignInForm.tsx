"use client";

import { useState } from "react";
import { BsEnvelope, BsLock, BsEye, BsEyeSlash } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, SignInFormData } from "@/schemas/auth/signIn.schema";
import SubmitButton from "../ui/SubmitButton";
import Input from "../ui/Input";

export function SignInForm() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<SignInFormData>({
    resolver: zodResolver(SignInSchema),
    mode: "onTouched",
  });

  const handleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const onSubmit = (data: SignInFormData) => {
    const serverRequest = async () => {
      const result = await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!data.email.includes("taken@")) {
            reset();
            resolve("Success");
          } else {
            setError("email", { message: "This email is already taken!" });
            reject("Error");
          }
        }, 1000);
      });
      console.log(result);
    };
    serverRequest();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="relative">
          <BsEnvelope
            className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
            size={18}
          />

          <Input
            type="email"
            id="email"
            placeholder="Email"
            ariaInvalid={!!errors.email}
            ariaDescribedby="email-error"
            inputProps={register("email")}
            className="w-full rounded-2xl border border-white/5 bg-black/20 py-4 pl-14 pr-5 text-white placeholder:text-zinc-500 outline-none transition focus:border-emerald-500/50"
          />
        </div>

        <div className="h-5 mt-1">
          {errors.email && (
            <p className="ml-2 text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <div className="relative">
          <BsLock
            className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
            size={18}
          />

          <Input
            type={isVisible ? "text" : "password"}
            placeholder="Password"
            inputProps={register("password")}
            ariaInvalid={!!errors.password}
            ariaDescribedby="password-error"
            id="password"
            className="w-full rounded-2xl border border-white/5 bg-black/20 py-4 pl-14 pr-5 text-white placeholder:text-zinc-500 outline-none transition focus:border-emerald-500/50"
          />

          {isVisible ? (
            <BsEye
              size={18}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 cursor-pointer active:scale-95"
              onClick={handleVisibility}
            />
          ) : (
            <BsEyeSlash
              size={18}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 cursor-pointer active:scale-95"
              onClick={handleVisibility}
            />
          )}
        </div>

        <div className="h-5 mt-1">
          {errors.password && (
            <p className="ml-2 text-xs text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <SubmitButton>Sign in</SubmitButton>
    </form>
  );
}
