"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { repairs, BUSINESS, type Device, type Issue } from "@/lib/repairData";

type CustomerInfo = {
  name: string;
  phone: string;
  email: string;
  notes: string;
};

type Step = 1 | 2 | 3 | 4 | 5;

const TOTAL_STEPS = 5;

function ProgressBar({ step }: { step: Step }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 h-1 bg-white/5">
      <div
        className="h-full bg-accent transition-all duration-500 ease-out"
        style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
      />
    </div>
  );
}

function StepLabel({ step }: { step: Step }) {
  const labels: Record<Step, string> = {
    1: "Select Device",
    2: "Select Issue",
    3: "Pricing",
    4: "Your Info",
    5: "Confirm",
  };
  return (
    <div className="flex items-center gap-2 mb-8">
      <span className="font-mono text-accent text-xs">
        STEP {step} / {TOTAL_STEPS}
      </span>
      <span className="text-muted text-xs">·</span>
      <span className="text-muted text-xs uppercase tracking-widest">
        {labels[step]}
      </span>
    </div>
  );
}

// Step 1
function DeviceSelect({
  onSelect,
}: {
  onSelect: (d: Device) => void;
}) {
  return (
    <div>
      <h1 className="text-white font-bold text-3xl md:text-4xl mb-2">
        What needs fixing?
      </h1>
      <p className="text-muted mb-10">Select your console to see repair options and pricing.</p>
      <div className="grid grid-cols-2 gap-4">
        {repairs.map((device) => (
          <button
            key={device.id}
            onClick={() => onSelect(device)}
            className="group bg-panel border border-white/10 rounded-2xl p-6 text-left hover:border-accent transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,255,156,0.15)]"
          >
            <span className="block font-mono text-accent text-xs mb-2 uppercase tracking-widest">
              {device.shortLabel}
            </span>
            <span className="block text-white font-semibold text-lg group-hover:text-accent transition-colors">
              {device.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Step 2
function IssueSelect({
  device,
  onSelect,
  onBack,
}: {
  device: Device;
  onSelect: (i: Issue) => void;
  onBack: () => void;
}) {
  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-muted text-sm mb-8 hover:text-white transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>
      <h1 className="text-white font-bold text-3xl md:text-4xl mb-2">
        What&apos;s the issue?
      </h1>
      <p className="text-muted mb-10">
        <span className="text-white">{device.label}</span> — select the problem.
      </p>
      <div className="space-y-3">
        {device.issues.map((issue) => (
          <button
            key={issue.id}
            onClick={() => onSelect(issue)}
            className="group w-full flex items-center justify-between bg-panel border border-white/10 rounded-xl px-6 py-5 hover:border-accent transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,255,156,0.1)]"
          >
            <span className="text-white font-medium group-hover:text-accent transition-colors">
              {issue.label}
            </span>
            <div className="flex items-center gap-4">
              <span className="text-muted text-sm font-mono">{issue.turnaround}</span>
              <span className="text-accent font-mono font-bold">${issue.price}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Step 3
function PriceDisplay({
  device,
  issue,
  onBook,
  onMailIn,
  onBack,
}: {
  device: Device;
  issue: Issue;
  onBook: () => void;
  onMailIn: () => void;
  onBack: () => void;
}) {
  return (
    <div className="text-center">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-muted text-sm mb-8 hover:text-white transition-colors mx-auto"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <p className="text-muted text-sm uppercase tracking-widest mb-4 font-mono">
        Repair Price
      </p>
      <div className="font-mono font-bold text-accent mb-2" style={{ fontSize: "clamp(3rem, 10vw, 5rem)" }}>
        ${issue.price}
      </div>
      <p className="text-white font-semibold text-lg mb-1">
        {device.label} — {issue.label}
      </p>
      <p className="text-muted text-sm mb-10">
        Estimated turnaround:{" "}
        <span className="text-white font-medium">{issue.turnaround}</span>
      </p>

      <div className="bg-panel border border-white/10 rounded-2xl p-6 mb-6 text-left space-y-3">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-accent mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-muted text-sm">Upfront pricing — no hidden fees</span>
        </div>
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-accent mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-muted text-sm">If we can&apos;t fix it, you pay nothing</span>
        </div>
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-accent mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-muted text-sm">Walk-in or mail-in — your choice</span>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={onBook}
          className="w-full bg-accent text-base font-bold py-4 rounded-xl hover:bg-accent-hover transition-colors text-lg"
        >
          Book This Repair →
        </button>
        <button
          onClick={onMailIn}
          className="w-full border border-white/20 text-white font-medium py-4 rounded-xl hover:border-white/40 transition-colors"
        >
          Mail It In Instead
        </button>
      </div>
    </div>
  );
}

// Step 4
function CustomerForm({
  info,
  onChange,
  onSubmit,
  onBack,
}: {
  info: CustomerInfo;
  onChange: (f: Partial<CustomerInfo>) => void;
  onSubmit: () => void;
  onBack: () => void;
}) {
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});

  const validate = () => {
    const e: Partial<CustomerInfo> = {};
    if (!info.name.trim()) e.name = "Name is required";
    if (!info.phone.trim()) e.phone = "Phone is required";
    if (Object.keys(e).length) { setErrors(e); return false; }
    return true;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (validate()) onSubmit();
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-muted text-sm mb-8 hover:text-white transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>
      <h1 className="text-white font-bold text-3xl md:text-4xl mb-2">Your info</h1>
      <p className="text-muted mb-10">We&apos;ll reach out to confirm and schedule your repair.</p>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label className="block text-muted text-xs uppercase tracking-widest mb-2 font-mono">
            Name *
          </label>
          <input
            type="text"
            autoComplete="name"
            value={info.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="Your name"
            className={`w-full bg-panel border rounded-xl px-4 py-4 text-white placeholder:text-white/20 outline-none focus:border-accent transition-colors ${
              errors.name ? "border-danger" : "border-white/10"
            }`}
          />
          {errors.name && (
            <p className="text-danger text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-muted text-xs uppercase tracking-widest mb-2 font-mono">
            Phone *
          </label>
          <input
            type="tel"
            autoComplete="tel"
            value={info.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="(555) 000-0000"
            className={`w-full bg-panel border rounded-xl px-4 py-4 text-white placeholder:text-white/20 outline-none focus:border-accent transition-colors font-mono ${
              errors.phone ? "border-danger" : "border-white/10"
            }`}
          />
          {errors.phone && (
            <p className="text-danger text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-muted text-xs uppercase tracking-widest mb-2 font-mono">
            Email <span className="text-white/30 normal-case">optional</span>
          </label>
          <input
            type="email"
            autoComplete="email"
            value={info.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="you@email.com"
            className="w-full bg-panel border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 outline-none focus:border-accent transition-colors"
          />
        </div>

        <div>
          <label className="block text-muted text-xs uppercase tracking-widest mb-2 font-mono">
            Notes <span className="text-white/30 normal-case">optional</span>
          </label>
          <textarea
            value={info.notes}
            onChange={(e) => onChange({ notes: e.target.value })}
            placeholder="Anything else we should know?"
            rows={3}
            className="w-full bg-panel border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 outline-none focus:border-accent transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-accent text-base font-bold py-4 rounded-xl hover:bg-accent-hover transition-colors text-lg mt-4"
        >
          Review Repair →
        </button>
      </form>
    </div>
  );
}

// Step 5
function Confirm({
  device,
  issue,
  info,
  onConfirm,
  onBack,
}: {
  device: Device;
  issue: Issue;
  info: CustomerInfo;
  onConfirm: () => void;
  onBack: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);

  const handleConfirm = () => {
    // Log submission (replace with real API/email handler)
    console.log("Repair booking:", { device: device.id, issue: issue.id, ...info });
    setSubmitted(true);
    onConfirm();
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-white font-bold text-2xl mb-3">You&apos;re booked!</h2>
        <p className="text-muted mb-8">
          We&apos;ll call <span className="text-white">{info.phone}</span> to confirm your repair.
        </p>
        <a
          href={BUSINESS.phoneHref}
          className="block w-full bg-accent text-base font-bold py-4 rounded-xl hover:bg-accent-hover transition-colors font-mono text-lg"
        >
          {BUSINESS.phone}
        </a>
        <p className="text-muted text-xs mt-3">
          Call or text us now to speed things up
        </p>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-muted text-sm mb-8 hover:text-white transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <h1 className="text-white font-bold text-3xl md:text-4xl mb-8">Confirm repair</h1>

      <div className="bg-panel border border-white/10 rounded-2xl p-6 mb-6 space-y-4">
        <div className="flex justify-between items-start">
          <span className="text-muted text-sm">Device</span>
          <span className="text-white font-medium">{device.label}</span>
        </div>
        <div className="border-t border-white/5" />
        <div className="flex justify-between items-start">
          <span className="text-muted text-sm">Repair</span>
          <span className="text-white font-medium">{issue.label}</span>
        </div>
        <div className="border-t border-white/5" />
        <div className="flex justify-between items-start">
          <span className="text-muted text-sm">Turnaround</span>
          <span className="text-white font-medium">{issue.turnaround}</span>
        </div>
        <div className="border-t border-white/5" />
        <div className="flex justify-between items-start">
          <span className="text-muted text-sm">Price</span>
          <span className="text-accent font-mono font-bold text-xl">${issue.price}</span>
        </div>
        <div className="border-t border-white/5" />
        <div className="flex justify-between items-start">
          <span className="text-muted text-sm">Name</span>
          <span className="text-white font-medium">{info.name}</span>
        </div>
        <div className="border-t border-white/5" />
        <div className="flex justify-between items-start">
          <span className="text-muted text-sm">Phone</span>
          <span className="text-white font-mono">{info.phone}</span>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleConfirm}
          className="w-full bg-accent text-base font-bold py-4 rounded-xl hover:bg-accent-hover transition-colors text-lg"
        >
          Confirm &amp; Start Repair
        </button>
        <Link
          href="/mail-in-repair"
          className="block w-full border border-white/20 text-white font-medium py-4 rounded-xl hover:border-white/40 transition-colors text-center"
        >
          Ship it instead →
        </Link>
      </div>
    </div>
  );
}

export default function RepairFunnel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>(1);
  const [device, setDevice] = useState<Device | null>(null);
  const [issue, setIssue] = useState<Issue | null>(null);
  const [mailIn, setMailIn] = useState(false);
  const [info, setInfo] = useState<CustomerInfo>({
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  useEffect(() => {
    const deviceId = searchParams.get("device");
    if (deviceId) {
      const found = repairs.find((d) => d.id === deviceId);
      if (found) {
        setDevice(found);
        setStep(2);
      }
    }
  }, [searchParams]);

  const handleDeviceSelect = (d: Device) => {
    setDevice(d);
    setStep(2);
  };

  const handleIssueSelect = (i: Issue) => {
    setIssue(i);
    setStep(3);
  };

  const handleBook = () => setStep(4);

  const handleMailIn = () => {
    setMailIn(true);
    router.push("/mail-in-repair");
  };

  const handleInfoSubmit = () => setStep(5);

  const handleConfirm = () => {
    // Confirmation handled inside Confirm component
  };

  return (
    <>
      <ProgressBar step={step} />
      <div className="min-h-screen bg-base pt-24 pb-32 px-4">
        <div className="max-w-lg mx-auto">
          <StepLabel step={step} />

          {step === 1 && (
            <DeviceSelect onSelect={handleDeviceSelect} />
          )}
          {step === 2 && device && (
            <IssueSelect
              device={device}
              onSelect={handleIssueSelect}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && device && issue && (
            <PriceDisplay
              device={device}
              issue={issue}
              onBook={handleBook}
              onMailIn={handleMailIn}
              onBack={() => setStep(2)}
            />
          )}
          {step === 4 && (
            <CustomerForm
              info={info}
              onChange={(f) => setInfo((p) => ({ ...p, ...f }))}
              onSubmit={handleInfoSubmit}
              onBack={() => setStep(3)}
            />
          )}
          {step === 5 && device && issue && (
            <Confirm
              device={device}
              issue={issue}
              info={info}
              onConfirm={handleConfirm}
              onBack={() => setStep(4)}
            />
          )}
        </div>
      </div>

      {/* Mobile sticky CTA */}
      {step < 5 && device && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-base/95 border-t border-white/10 px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-muted text-xs font-mono">
              {issue ? `$${issue.price}` : device.label}
            </span>
            <a
              href={BUSINESS.phoneHref}
              className="text-accent text-sm font-mono hover:text-accent-hover"
            >
              {BUSINESS.phone}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
