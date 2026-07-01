"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { OrbitControls, Float } from "@react-three/drei";
import type { Group } from "three";
import { useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Database,
  LineChart,
  Radar,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

type StageKey = "ingest" | "reason" | "act";

type Stage = {
  key: StageKey;
  label: string;
  title: string;
  description: string;
  signal: string;
  inputs: string[];
  outputs: string[];
  highlight: string;
};

type Metric = {
  label: string;
  value: string;
  detail: string;
};

type DashboardBar = {
  label: string;
  value: number;
  accent: string;
};

type AutomationCard = {
  title: string;
  description: string;
  status: string;
};

const stages: Stage[] = [
  {
    key: "ingest",
    label: "01 / Ingest",
    title: "Raw data lands in a governed stream",
    description:
      "Telemetry, CRM, support tickets, and product events are normalized before they hit the model layer.",
    signal: "118 live sources",
    inputs: ["Customer events", "Internal ops", "Market context"],
    outputs: ["Clean schema", "Confidence tags", "Priority queue"],
    highlight: "Noise reduced before modeling",
  },
  {
    key: "reason",
    label: "02 / Reason",
    title: "Signals are fused into a decision graph",
    description:
      "The system cross-references anomalies, trends, and leading indicators to surface what actually matters.",
    signal: "92% signal confidence",
    inputs: ["Normalized events", "Historical baselines", "Policy rules"],
    outputs: ["Risk score", "Theme clusters", "Recommended action"],
    highlight: "Correlation without clutter",
  },
  {
    key: "act",
    label: "03 / Act",
    title: "Decision-makers get a concise, accountable brief",
    description:
      "Teams receive the signal, the evidence, and the next best move in one compressed view that is easy to trust.",
    signal: "14 min to decision",
    inputs: ["Ranked insights", "Evidence trail", "Owner context"],
    outputs: ["Board brief", "Escalation path", "Audit trail"],
    highlight: "Ready for execution",
  },
];

const metrics: Metric[] = [
  { label: "Live sources", value: "118", detail: "across product, ops, and finance" },
  { label: "Signal confidence", value: "92%", detail: "weighted by recency and relevance" },
  { label: "Time to decision", value: "14 min", detail: "from event spike to action plan" },
];

const dashboardBars: DashboardBar[] = [
  { label: "Trust", value: 88, accent: "from-cyan-300/90 to-sky-500/50" },
  { label: "Momentum", value: 72, accent: "from-emerald-300/85 to-teal-500/45" },
  { label: "Risk", value: 41, accent: "from-amber-300/90 to-orange-500/40" },
  { label: "Adoption", value: 79, accent: "from-violet-300/85 to-fuchsia-500/45" },
];

const automationCards: AutomationCard[] = [
  {
    title: "Escalation routing",
    description: "Route high-confidence anomalies to the right operator with evidence attached.",
    status: "Auto",
  },
  {
    title: "Brief generation",
    description: "Convert clustered findings into an executive summary in one step.",
    status: "Live",
  },
  {
    title: "Policy checks",
    description: "Block low-confidence actions until the audit trail is complete.",
    status: "Guarded",
  },
];

function SignalCore() {
  const group = useRef<Group | null>(null);

  useFrame(({ clock, pointer }) => {
    if (!group.current) {
      return;
    }

    const elapsed = clock.getElapsedTime();
    group.current.rotation.y = elapsed * 0.18 + pointer.x * 0.35;
    group.current.rotation.x = Math.sin(elapsed * 0.45) * 0.12 + pointer.y * 0.2;
    group.current.position.y = Math.sin(elapsed * 0.8) * 0.08;
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.7} floatIntensity={1.3}>
        <mesh>
          <icosahedronGeometry args={[1.2, 2]} />
          <meshStandardMaterial
            color="#8ff3ff"
            emissive="#1d4ed8"
            emissiveIntensity={0.55}
            roughness={0.18}
            metalness={0.8}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.65, 0.04, 16, 240]} />
          <meshStandardMaterial color="#9ae6ff" emissive="#60a5fa" emissiveIntensity={0.95} />
        </mesh>
        <mesh rotation={[0, Math.PI / 3, 0]}>
          <torusGeometry args={[1.95, 0.018, 12, 240]} />
          <meshStandardMaterial color="#f8fafc" emissive="#c4b5fd" emissiveIntensity={0.8} />
        </mesh>
      </Float>
    </group>
  );
}

function StageVisual({ stage }: { stage: Stage }) {
  return (
    <motion.div
      key={stage.key}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex h-full flex-col justify-between rounded-[28px] border border-white/10 bg-white/6 p-6 shadow-[0_40px_120px_rgba(1,6,20,0.35)] backdrop-blur-xl"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-cyan-400/35 bg-cyan-300/10 px-3 py-1 text-xs font-medium tracking-[0.22em] text-cyan-100 uppercase">
            {stage.label}
          </span>
          <span className="text-xs font-medium tracking-[0.2em] text-white/45 uppercase">
            {stage.signal}
          </span>
        </div>
        <div className="h-[320px] overflow-hidden rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.28),transparent_40%),linear-gradient(180deg,rgba(8,15,35,0.8),rgba(5,10,22,0.95))] p-3">
          <Canvas
            camera={{ position: [0, 0, 5.2], fov: 38 }}
            dpr={[1, 1.75]}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={1.1} />
            <pointLight position={[6, 5, 6]} intensity={28} color="#9be7ff" />
            <pointLight position={[-6, -4, 4]} intensity={12} color="#7c3aed" />
            <SignalCore />
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              autoRotate={false}
              maxPolarAngle={Math.PI / 1.9}
              minPolarAngle={Math.PI / 3}
            />
          </Canvas>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold text-white">{stage.title}</p>
          <p className="max-w-xl text-sm leading-6 text-white/68">{stage.description}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-[11px] font-medium tracking-[0.2em] text-white/40 uppercase">Inputs</p>
          <ul className="mt-3 space-y-2 text-sm text-white/78">
            {stage.inputs.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-[11px] font-medium tracking-[0.2em] text-white/40 uppercase">Outputs</p>
          <ul className="mt-3 space-y-2 text-sm text-white/78">
            {stage.outputs.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-cyan-300" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

function DashboardPreview() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(7,12,26,0.95),rgba(4,8,18,0.92))] p-6 shadow-[0_40px_120px_rgba(1,6,20,0.34)] sm:p-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(99,102,241,0.16),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.1),transparent_26%)]" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-3">
          <p className="text-[11px] font-medium tracking-[0.28em] text-cyan-100 uppercase">
            03 / Intelligence Dashboard Preview
          </p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            A decision surface that turns the model output into a clear operational picture.
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-white/66 sm:text-base">
            The preview mixes signal health, automation readiness, and a live insight trace so
            decision-makers can scan, trust, and act in one place.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 text-xs font-medium text-white/68 sm:min-w-[360px]">
          {[
            { label: "Signals", value: "24" },
            { label: "Automations", value: "08" },
            { label: "Latency", value: "1.4s" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
              <p className="text-[11px] tracking-[0.18em] text-white/42 uppercase">{item.label}</p>
              <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[30px] border border-white/10 bg-black/18 p-5 backdrop-blur-xl sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-white">Insight health</p>
              <p className="mt-1 text-xs tracking-[0.22em] text-white/42 uppercase">
                Board-ready snapshot
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-medium text-emerald-100">
              <Sparkles className="h-3.5 w-3.5" />
              Live intelligence
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
            <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,18,38,0.95),rgba(5,10,22,0.96))] p-5">
              <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px]" />
              <div className="relative flex items-end justify-between gap-3">
                {dashboardBars.map((bar, index) => (
                  <motion.div
                    key={bar.label}
                    initial={{ scaleY: 0.35, opacity: 0 }}
                    whileInView={{ scaleY: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    className="group flex min-h-[240px] flex-1 flex-col justify-end gap-3 rounded-[22px] border border-white/8 bg-white/4 px-4 py-4"
                    style={{ transformOrigin: "bottom" }}
                  >
                    <div className="flex items-end justify-between gap-2">
                      <div>
                        <p className="text-[11px] tracking-[0.2em] text-white/42 uppercase">{bar.label}</p>
                        <p className="mt-2 text-2xl font-semibold text-white">{bar.value}%</p>
                      </div>
                      <div className={clsx("h-12 w-2 rounded-full bg-gradient-to-t", bar.accent)} />
                    </div>
                    <div className="relative mt-auto h-36 overflow-hidden rounded-[20px] border border-white/8 bg-black/18 p-2">
                      <div className="absolute inset-x-4 top-4 h-px bg-white/10" />
                      <div className="absolute inset-x-4 top-1/2 h-px bg-white/10" />
                      <div className="absolute inset-x-4 bottom-4 h-px bg-white/10" />
                      <motion.div
                        initial={{ height: "18%" }}
                        whileInView={{ height: `${bar.value}%` }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.75, delay: index * 0.08, ease: "easeOut" }}
                        className={clsx(
                          "absolute bottom-2 left-2 right-2 rounded-[16px] bg-gradient-to-t shadow-[0_0_48px_rgba(56,189,248,0.18)]",
                          bar.accent,
                        )}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[26px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-white">Insight trace</p>
                    <p className="mt-1 text-xs tracking-[0.2em] text-white/42 uppercase">
                      From anomaly to action
                    </p>
                  </div>
                  <LineChart className="h-5 w-5 text-cyan-200" />
                </div>
                <div className="mt-5 space-y-4">
                  {[
                    { label: "Detected variance", value: "Revenue dip in Region West" },
                    { label: "Confidence", value: "0.91 with evidence trail" },
                    { label: "Suggested move", value: "Notify owner and draft brief" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.35, delay: index * 0.08 }}
                      className="rounded-[20px] border border-white/8 bg-black/18 p-4"
                    >
                      <p className="text-[11px] tracking-[0.18em] text-white/42 uppercase">{item.label}</p>
                      <p className="mt-2 text-sm leading-6 text-white/80">{item.value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="rounded-[26px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <p className="text-sm font-medium text-white">Automation readiness</p>
                <div className="mt-4 space-y-3">
                  {automationCards.map((card, index) => (
                    <motion.div
                      key={card.title}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: 0.35, delay: 0.05 * index }}
                      whileHover={{ y: -2, scale: 1.01 }}
                      className="group rounded-[20px] border border-white/8 bg-black/18 p-4 transition-colors hover:border-cyan-300/25"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-medium text-white">{card.title}</p>
                        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] tracking-[0.18em] text-white/55 uppercase">
                          {card.status}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-white/60">{card.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 rounded-[30px] border border-white/10 bg-black/18 p-5 backdrop-blur-xl sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-white">Decision timeline</p>
              <p className="mt-1 text-xs tracking-[0.2em] text-white/42 uppercase">
                AI automations in motion
              </p>
            </div>
            <Workflow className="h-5 w-5 text-emerald-200" />
          </div>

          <div className="space-y-4">
            {[
              "Monitor the live source stream",
              "Cluster related anomalies into a single insight",
              "Generate a concise brief with evidence attached",
              "Trigger downstream automation and owner routing",
            ].map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3, delay: 0.06 * index }}
                className="flex gap-3 rounded-[22px] border border-white/8 bg-white/5 p-4"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10 text-xs font-semibold text-cyan-100">
                  0{index + 1}
                </div>
                <div>
                  <p className="text-sm leading-6 text-white/82">{step}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="rounded-[24px] border border-emerald-300/15 bg-emerald-300/8 p-5">
            <p className="text-[11px] font-medium tracking-[0.2em] text-emerald-100 uppercase">
              Automation outcome
            </p>
            <p className="mt-2 text-xl font-semibold text-white">
              Insight dispatched, owner notified, and brief queued for review.
            </p>
            <p className="mt-2 text-sm leading-6 text-white/60">
              The dashboard preview closes the story by showing how the intelligence layer becomes
              a concrete, accountable action surface.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default function Home() {
  const [activeStage, setActiveStage] = useState<StageKey>("reason");

  const currentStage = useMemo(
    () => stages.find((stage) => stage.key === activeStage) ?? stages[0],
    [activeStage],
  );

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-5 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.28em] text-cyan-100 uppercase">RacoAI / Xai</p>
            <h1 className="mt-1 text-sm text-white/62">Decision intelligence for teams that need clarity, not noise.</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-[0.18em] uppercase text-white/60">
            <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-emerald-100">
              Live sync
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Policy aware</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Audit ready</span>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.18fr_0.82fr]">
          <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(7,12,26,0.95),rgba(4,8,18,0.88))] px-6 py-8 shadow-[0_40px_120px_rgba(1,6,20,0.4)] sm:px-8 lg:px-10 lg:py-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.2),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.22),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.14),transparent_30%)]" />
            <div className="relative grid gap-10 xl:grid-cols-[1.02fr_0.98fr]">
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium tracking-[0.2em] text-white/65 uppercase"
                >
                  <Radar className="h-4 w-4 text-cyan-200" />
                  Interactive product experience
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="space-y-5"
                >
                  <p className="max-w-xl text-sm font-medium tracking-[0.28em] text-cyan-100 uppercase">
                    Raw data in. Board-ready insight out.
                  </p>
                  <h2 className="max-w-2xl text-4xl font-semibold leading-[1.02] text-balance text-white sm:text-5xl lg:text-6xl">
                    Xai turns fragmented operational data into a decision layer executives can trust.
                  </h2>
                  <p className="max-w-2xl text-base leading-7 text-white/68 sm:text-lg">
                    This experience shows the flow from ingestion to reasoning to action: a calm,
                    technically confident interface with 3D depth, evidence-first storytelling, and
                    just enough motion to make the pipeline feel alive.
                  </p>
                </motion.div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {metrics.map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.08 + index * 0.06 }}
                      className="rounded-[22px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                    >
                      <p className="text-[11px] font-medium tracking-[0.2em] text-white/45 uppercase">
                        {metric.label}
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-white">{metric.value}</p>
                      <p className="mt-1 text-sm leading-6 text-white/58">{metric.detail}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <button className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-medium text-slate-950 transition-transform hover:-translate-y-0.5">
                    Explore the pipeline
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/82 transition-colors hover:bg-white/10">
                    <Sparkles className="h-4 w-4 text-cyan-200" />
                    View signal trace
                  </button>
                </div>
              </div>

              <div className="relative min-h-[420px] rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(125,211,252,0.16),transparent_52%),linear-gradient(180deg,rgba(7,13,29,0.95),rgba(4,8,18,0.95))] p-4 sm:p-5">
                <div className="absolute inset-0 overflow-hidden rounded-[30px]">
                  <div className="absolute inset-x-8 top-10 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
                  <div className="absolute inset-y-8 left-10 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                  <div className="absolute right-10 top-14 h-24 w-24 rounded-full border border-cyan-300/20 bg-cyan-300/6 blur-3xl" />
                </div>
                <div className="relative flex h-full flex-col gap-4">
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <div>
                      <p className="text-[11px] font-medium tracking-[0.2em] text-white/40 uppercase">
                        Decision fabric
                      </p>
                      <p className="mt-1 text-sm text-white/72">Zoom in, rotate, and inspect the core.</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-white/50">
                      <ShieldCheck className="h-4 w-4 text-emerald-300" />
                      Governed output
                    </div>
                  </div>

                  <div className="grid flex-1 gap-4 md:grid-cols-[0.74fr_1.26fr]">
                    <div className="rounded-[28px] border border-white/10 bg-white/4 p-4 backdrop-blur-sm">
                      <p className="text-[11px] font-medium tracking-[0.2em] text-white/40 uppercase">Stages</p>
                      <div className="mt-4 space-y-2">
                        {stages.map((stage) => {
                          const active = stage.key === activeStage;

                          return (
                            <button
                              key={stage.key}
                              onClick={() => setActiveStage(stage.key)}
                              className={clsx(
                                "flex w-full items-start gap-3 rounded-2xl border px-3 py-3 text-left transition-colors",
                                active
                                  ? "border-cyan-300/35 bg-cyan-300/12"
                                  : "border-white/8 bg-white/4 hover:bg-white/8",
                              )}
                            >
                              <span
                                className={clsx(
                                  "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
                                  active ? "bg-cyan-300 text-slate-950" : "bg-white/10 text-white/70",
                                )}
                              >
                                {stage.label.split(" /")[0]}
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block text-sm font-medium text-white">{stage.title}</span>
                                <span className="mt-1 block text-xs leading-5 text-white/52">{stage.highlight}</span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      <StageVisual key={currentStage.key} stage={currentStage} />
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="grid gap-6">
            <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="text-[11px] font-medium tracking-[0.2em] text-white/40 uppercase">Why it works</p>
              <div className="mt-4 space-y-4">
                {
                  [
                    {
                      icon: Database,
                      title: "Structured intake",
                      text: "Sources are normalized into a clean contract before any reasoning layer touches them.",
                    },
                    {
                      icon: BrainCircuit,
                      title: "Reasoning with boundaries",
                      text: "The model surface is paired with policy and evidence so confidence is visible, not implied.",
                    },
                    {
                      icon: Workflow,
                      title: "Actionable delivery",
                      text: "The final output is compact enough for leadership, but detailed enough for operators.",
                    },
                    {
                      icon: LineChart,
                      title: "Continuous visibility",
                      text: "Every insight preserves traceability so the system can be trusted after the first demo.",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.08 * index }}
                      className="flex gap-4 rounded-[24px] border border-white/8 bg-black/15 p-4"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/12 text-cyan-100">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{item.title}</p>
                        <p className="mt-1 text-sm leading-6 text-white/60">{item.text}</p>
                      </div>
                    </motion.div>
                  ))
                }
              </div>
            </section>

            <section className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(14,24,44,0.9),rgba(5,9,20,0.95))] p-6">
              <p className="text-[11px] font-medium tracking-[0.2em] text-white/40 uppercase">Output snapshot</p>
              <div className="mt-4 rounded-[26px] border border-white/10 bg-black/25 p-5">
                <p className="text-sm font-medium text-cyan-100">Executive brief</p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight text-white">
                  Revenue risk is concentrated in two accounts, but the pattern is still reversible.
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/64">
                  Xai compresses the evidence into a single answer, with citations, confidence, and a
                  recommended escalation path. That is the product story in one screen.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    "Evidence trail attached",
                    "Owner assigned automatically",
                    "Escalation triggered",
                    "Board-ready summary generated",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded-2xl border border-white/8 bg-white/5 px-3 py-3 text-sm text-white/78">
                      <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </aside>
        </section>

        <DashboardPreview />
      </div>
    </main>
  );
}
