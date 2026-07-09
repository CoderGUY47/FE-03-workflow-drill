// Prompt used (round 2, precise, explore-plan-code):
//
// "In src/SettingsForm.tsx (this repo uses TypeScript + Tailwind, see
// src/settingsSchema.ts for the existing pattern), build a profile settings
// form with fields: name, email, new password (optional), confirm password,
// notifications toggle.
//
// Constraints:
// - Validate with react-hook-form + zod (reuse the settingsSchema below).
// - Every input needs a <label htmlFor>, aria-invalid, and
//   aria-describedby pointing at its error message.
// - Trim/lowercase email before validating; reject whitespace-only values.
// - If password is filled, confirmPassword must match; if password is
//   empty, skip the match check (password change is optional).
// - Disable the submit button while submitting; show inline errors, not
//   alert().
// - Plan first: list the components/functions you'll create and how
//   errors flow before writing code.
// - After writing it, write RTL + Vitest tests for: empty submit,
//   whitespace-only email, mismatched passwords, successful submit,
//   aria-invalid on failed validation. Run them and report pass/fail."

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type ReactNode } from "react";
import { settingsSchema, type SettingsFormValues } from "./settingsSchema";

interface SettingsFormProps {
  onSave?: (values: SettingsFormValues) => Promise<void> | void;
}

export default function SettingsForm({ onSave }: SettingsFormProps) {
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      notifications: true,
    },
  });

  const onSubmit = async (values: SettingsFormValues) => {
    setSaveStatus("idle");
    await onSave?.(values);
    setSaveStatus("saved");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full space-y-5 p-8"
      aria-label="Account settings"
    >
      {/* Form header */}
      <div className="pb-4 border-b border-slate-800">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Profile Settings
        </h2>
        <p className="text-slate-500 text-xs mt-1">Update your name, email and security preferences.</p>
      </div>

      <Field label="Name" id="name" error={errors.name?.message}>
        <input
          id="name"
          placeholder="John Doe"
          {...register("name")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-purple-500/50 transition-all duration-200"
        />
      </Field>

      <Field label="Email" id="email" error={errors.email?.message}>
        <input
          id="email"
          type="email"
          placeholder="john@example.com"
          {...register("email")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-purple-500/50 transition-all duration-200"
        />
      </Field>

      {/* Divider before password section */}
      <div className="flex items-center gap-3 pt-1">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">Security</span>
        <div className="flex-1 h-px bg-slate-800" />
      </div>

      <Field label="New password" id="password" error={errors.password?.message}>
        <input
          id="password"
          type="password"
          placeholder="Min 8 characters"
          {...register("password")}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
          className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-purple-500/50 transition-all duration-200"
        />
      </Field>

      <Field
        label="Confirm password"
        id="confirmPassword"
        error={errors.confirmPassword?.message}
      >
        <input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          {...register("confirmPassword")}
          aria-invalid={!!errors.confirmPassword}
          aria-describedby={
            errors.confirmPassword ? "confirmPassword-error" : undefined
          }
          className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-purple-500/50 transition-all duration-200"
        />
      </Field>

      <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
        <input
          id="notifications"
          type="checkbox"
          {...register("notifications")}
          className="w-4 h-4 rounded border-slate-700 bg-slate-900 cursor-pointer accent-purple-500"
        />
        <label htmlFor="notifications" className="flex-1 text-sm font-medium text-slate-300 select-none cursor-pointer">
          Receive email notifications
          <span className="block text-xs text-slate-600 font-normal">Get notified about account activity</span>
        </label>
        <span className="text-xs text-purple-400 font-semibold">ON</span>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl shadow-xl shadow-purple-950/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98] tracking-wide"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Saving...
          </span>
        ) : "Save Settings"}
      </button>

      <p aria-live="polite" className="text-sm font-medium text-emerald-400 text-center mt-2 flex items-center justify-center gap-1.5 h-5">
        {saveStatus === "saved" ? (
          <>
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Settings saved.
          </>
        ) : ""}
      </p>
    </form>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="block text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-2">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-rose-400 mt-1.5 flex items-center gap-1">
          <span aria-hidden="true">⚠️</span> {error}
        </p>
      )}
    </div>
  );
}
