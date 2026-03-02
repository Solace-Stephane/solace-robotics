"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      robotType: formData.get("robotType"),
      notes: formData.get("notes"),
    };

    try {
      const response = await fetch("/api/pilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json?.error || "Submission failed.");
      }

      setStatus("success");
      setMessage("Submitted. We will contact you with pilot onboarding details.");
      event.currentTarget.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unexpected error.");
    }
  }

  return (
    <form className="lead-form" onSubmit={onSubmit}>
      <label>
        Name
        <input name="name" required autoComplete="name" />
      </label>
      <label>
        Email
        <input name="email" required type="email" autoComplete="email" />
      </label>
      <label>
        Company
        <input name="company" required autoComplete="organization" />
      </label>
      <label>
        Robot stack
        <input name="robotType" placeholder="e.g., Franka / UR / custom" required />
      </label>
      <label>
        Pilot goals
        <textarea name="notes" rows={5} required placeholder="What policy problem do you want solved in the next 90 days?" />
      </label>

      <button className="btn btn-solid" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting…" : "Submit pilot request"}
      </button>

      {message ? <p className={status === "error" ? "form-error" : "form-success"}>{message}</p> : null}
    </form>
  );
}
