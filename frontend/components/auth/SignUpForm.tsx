"use client";

import { useState } from "react";
import {
  BsEnvelope,
  BsPerson,
  BsLock,
  BsEye,
  BsEyeSlash,
} from "react-icons/bs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, SignUpFormData } from "@/schemas/auth/index";
import SubmitButton from "../ui/SubmitButton";
import Input from "../ui/Input";
import { useSignUp } from "@/hooks/modules/auth/useAuth";
import { useRouter, useSearchParams } from "next/navigation";

export function SignUpForm() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
    mode: "onTouched",
  });

  const handleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const onSubmit = (data: SignUpFormData) => {
    signUp(data, {
      onSuccess: () => router.replace(callbackUrl ?? "/"),
    });
  };

  const { mutate: signUp } = useSignUp();
  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="relative">
          <BsPerson
            className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
            size={18}
          />

          <Input
            placeholder="First name"
            id="firstName"
            ariaInvalid={!!errors.firstName}
            ariaDescribedby="firstName-error"
            inputProps={register("firstName")}
            className="w-full rounded-2xl border border-white/5 bg-black/20 py-4 pl-14 pr-5 text-white placeholder:text-zinc-500 outline-none transition focus:border-emerald-500/50"
          />
        </div>
        {errors.firstName && (
          <label className="ml-2 text-xs text-red-400" htmlFor="firstName">
            {errors.firstName.message}
          </label>
        )}
      </div>

      <div>
        <div className="relative">
          <BsPerson
            className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
            size={18}
          />

          <Input
            placeholder="Last name (optional)"
            inputProps={register("lastName")}
            id="lastName"
            ariaInvalid={!!errors.lastName}
            ariaDescribedby="lastName-error"
            className="w-full rounded-2xl border border-white/5 bg-black/20 py-4 pl-14 pr-5 text-white placeholder:text-zinc-500 outline-none transition focus:border-emerald-500/50"
          />
        </div>
        <div className="h-1 mt-1">
          {errors.lastName && (
            <label className="ml-2 text-xs text-red-400" htmlFor="lastName">
              {errors.lastName.message}
            </label>
          )}
        </div>
      </div>

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
        {errors.email && (
          <label className="ml-2 text-xs text-red-400" htmlFor="email">
            {errors.email.message}
          </label>
        )}
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
            id="password"
            ariaInvalid={!!errors.password}
            ariaDescribedby="password-error"
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
        {errors.password && (
          <label className="ml-2 text-xs text-red-400" htmlFor="password">
            {errors.password.message}
          </label>
        )}
      </div>

      <div>
        <div className="relative">
          <BsLock
            className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
            size={18}
          />

          <Input
            type={isVisible ? "text" : "password"}
            placeholder="Confirm password"
            inputProps={register("confirmPassword")}
            id="confirmPassword"
            ariaInvalid={!!errors.confirmPassword}
            ariaDescribedby="confirmPassword-error"
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

        {errors.confirmPassword && (
          <label
            className="ml-2 text-xs text-red-400"
            htmlFor="confirmPassword"
          >
            {errors.confirmPassword.message}
          </label>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-center text-white font-sans gap-2">
          <Input
            id="agree"
            type="checkbox"
            ariaInvalid={!!errors.agree}
            ariaDescribedby="agree-error"
            inputProps={register("agree")}
          />
          <label htmlFor="agree">I agree to the Terms of Service</label>
        </div>
        {errors.agree && (
          <label className="ml-2 text-xs text-red-400" htmlFor="agree">
            {errors.agree.message}
          </label>
        )}
      </div>

      <SubmitButton>Create account</SubmitButton>
    </form>
  );
}
