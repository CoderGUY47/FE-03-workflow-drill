import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SettingsForm from "./SettingsForm";

describe("SettingsForm", () => {
  it("shows validation errors on empty submit", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);
    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(
      await screen.findByText(/name must be at least 2 characters/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument();
  });

  it("rejects an email that is only whitespace", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);
    await user.type(screen.getByLabelText(/^name$/i), "Hasan");
    await user.type(screen.getByLabelText(/^email$/i), "   ");
    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(
      await screen.findByText(/enter a valid email address/i)
    ).toBeInTheDocument();
  });

  it("rejects mismatched passwords", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);
    await user.type(screen.getByLabelText(/^name$/i), "Hasan");
    await user.type(screen.getByLabelText(/^email$/i), "hasan@example.com");
    await user.type(screen.getByLabelText(/new password/i), "password123");
    await user.type(screen.getByLabelText(/confirm password/i), "password124");
    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(
      await screen.findByText(/passwords do not match/i)
    ).toBeInTheDocument();
  });

  it("submits successfully with valid data and calls onSave", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    render(<SettingsForm onSave={onSave} />);

    await user.type(screen.getByLabelText(/^name$/i), "Hasan Islam");
    await user.type(screen.getByLabelText(/^email$/i), "hasan@example.com");
    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Hasan Islam", email: "hasan@example.com" })
    );
    expect(await screen.findByText(/settings saved/i)).toBeInTheDocument();
  });

  it("marks invalid fields with aria-invalid for screen readers", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);
    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(await screen.findByLabelText(/^name$/i)).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });
});
