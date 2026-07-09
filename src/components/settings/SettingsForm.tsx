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
      className="p-6 max-w-md mx-auto space-y-4"
      aria-label="Account settings"
    >
      <h2 className="text-xl font-bold">Settings</h2>

      <Field label="Name" id="name" error={errors.name?.message}>
        <input
          id="name"
          {...register("name")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="border p-2 w-full rounded"
        />
      </Field>

      <Field label="Email" id="email" error={errors.email?.message}>
        <input
          id="email"
          type="email"
          {...register("email")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="border p-2 w-full rounded"
        />
      </Field>

      <Field label="New password" id="password" error={errors.password?.message}>
        <input
          id="password"
          type="password"
          {...register("password")}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
          className="border p-2 w-full rounded"
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
          {...register("confirmPassword")}
          aria-invalid={!!errors.confirmPassword}
          aria-describedby={
            errors.confirmPassword ? "confirmPassword-error" : undefined
          }
          className="border p-2 w-full rounded"
        />
      </Field>

      <div className="flex items-center gap-2">
        <input id="notifications" type="checkbox" {...register("notifications")} />
        <label htmlFor="notifications">Email notifications</label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : "Save"}
      </button>

      <p aria-live="polite" className="text-sm text-green-600">
        {saveStatus === "saved" ? "Settings saved." : ""}
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
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-red-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
