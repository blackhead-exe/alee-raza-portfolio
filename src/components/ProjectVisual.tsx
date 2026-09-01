"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

export type VisualVariant = "sync" | "pipeline" | "scoring" | "funnels";

const ACCENT = "var(--color-accent)";
const LINE = "var(--color-line)";
const FAINT = "var(--color-faint)";

/** Shared label styling inside the SVGs. */
const labelProps = {
  fontSize: 9,
  fill: FAINT,
  fontFamily: "var(--font-sans)",
  letterSpacing: 0.4,
} as const;

/* ------------------------------------------------------------------
   1. sync - CRM to Sheets to Dashboard, on a repeating 15 minute loop
   ------------------------------------------------------------------ */
function SyncVisual({ play }: { play: boolean }) {
  const boxes = [
    { x: 18, label: "GHL CRM" },
    { x: 166, label: "SHEETS" },
    { x: 314, label: "DASHBOARD" },
  ];

  return (
    <>
      {/* connectors */}
      {[0, 1].map((i) => (
        <line
          key={i}
          x1={106 + i * 148}
          y1={92}
          x2={166 + i * 148}
          y2={92}
          stroke={LINE}
          strokeWidth={1.5}
        />
      ))}

      {/* packets travelling left to right along both connectors */}
      {[0, 1].map((i) =>
        [0, 1, 2].map((d) => (
          <motion.circle
            key={`${i}-${d}`}
            cy={92}
            r={2.8}
            fill={ACCENT}
            initial={{ cx: 106 + i * 148, opacity: 0 }}
            animate={
              play
                ? {
                    cx: [106 + i * 148, 166 + i * 148],
                    opacity: [0, 1, 1, 0],
                  }
                : {}
            }
            transition={{
              duration: 1.4,
              delay: d * 0.42 + i * 0.28,
              repeat: Infinity,
              repeatDelay: 0.6,
              ease: "easeInOut",
            }}
          />
        )),
      )}

      {boxes.map((box, i) => (
        <g key={box.label}>
          <motion.rect
            x={box.x}
            y={62}
            width={88}
            height={60}
            rx={9}
            fill="var(--color-canvas)"
            stroke={i === 2 ? ACCENT : LINE}
            strokeWidth={1.5}
            initial={{ opacity: 0, y: 8 }}
            animate={play ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.12 }}
          />
          <text x={box.x + 44} y={114} textAnchor="middle" {...labelProps}>
            {box.label}
          </text>
        </g>
      ))}

      {/* miniature bar chart living inside the dashboard box */}
      {[0, 1, 2, 3].map((i) => (
        <motion.rect
          key={i}
          x={330 + i * 15}
          width={8}
          rx={2}
          fill={ACCENT}
          fillOpacity={0.75}
          initial={{ height: 4, y: 96 }}
          animate={
            play
              ? {
                  height: [4, 10 + i * 6, 8 + i * 4, 4 + i * 7],
                  y: [96, 86 - i * 6, 88 - i * 4, 92 - i * 7],
                }
              : {}
          }
          transition={{
            duration: 2.8,
            delay: i * 0.15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* the every-15-minutes loop, drawn as a sweeping arc */}
      <motion.circle
        cx={210}
        cy={40}
        r={13}
        fill="none"
        stroke={ACCENT}
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray="20 62"
        initial={{ rotate: 0 }}
        animate={play ? { rotate: 360 } : {}}
        transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
        style={{ originX: "210px", originY: "40px" }}
      />
      <text x={210} y={22} textAnchor="middle" {...labelProps}>
        EVERY 15 MIN
      </text>
    </>
  );
}

/* ------------------------------------------------------------------
   2. pipeline - eight stages with a pulse running through them
   ------------------------------------------------------------------ */
function PipelineVisual({ play }: { play: boolean }) {
  const count = 8;
  const startX = 34;
  const gap = 50;
  const y = 88;

  return (
    <>
      <line
        x1={startX}
        y1={y}
        x2={startX + gap * (count - 1)}
        y2={y}
        stroke={LINE}
        strokeWidth={1.5}
      />

      {/* progress line filling across the stages */}
      <motion.line
        x1={startX}
        y1={y}
        x2={startX + gap * (count - 1)}
        y2={y}
        stroke={ACCENT}
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={play ? { pathLength: [0, 1, 1, 0] } : {}}
        transition={{
          duration: 4.4,
          times: [0, 0.55, 0.85, 1],
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {Array.from({ length: count }).map((_, i) => (
        <g key={i}>
          <circle cx={startX + i * gap} cy={y} r={8} fill="var(--color-canvas)" stroke={LINE} strokeWidth={1.5} />
          <motion.circle
            cx={startX + i * gap}
            cy={y}
            r={8}
            fill={ACCENT}
            initial={{ scale: 0, opacity: 0 }}
            animate={play ? { scale: [0, 1, 1, 0], opacity: [0, 1, 1, 0] } : {}}
            transition={{
              duration: 4.4,
              times: [0, 0.12, 0.8, 1],
              delay: i * 0.3,
              repeat: Infinity,
              repeatDelay: 0.2,
              ease: "easeOut",
            }}
            style={{ originX: `${startX + i * gap}px`, originY: `${y}px` }}
          />
        </g>
      ))}

      <text x={startX} y={y + 26} textAnchor="middle" {...labelProps}>
        TARGETED
      </text>
      <text x={startX + gap * (count - 1)} y={y + 26} textAnchor="middle" {...labelProps}>
        CLOSED
      </text>
      <text x={210} y={42} textAnchor="middle" {...labelProps}>
        8-STAGE BD PIPELINE
      </text>
    </>
  );
}

/* ------------------------------------------------------------------
   3. scoring - a weighted score sweeping across five tiers
   ------------------------------------------------------------------ */
function ScoringVisual({ play }: { play: boolean }) {
  const tiers = ["PLATINUM", "GREEN", "YELLOW", "AMBER", "RED"];
  const cx = 210;
  const cy = 122;
  const r = 66;

  return (
    <>
      {/* gauge track */}
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none"
        stroke={LINE}
        strokeWidth={9}
        strokeLinecap="round"
      />
      {/* gauge fill sweeping up and settling back */}
      <motion.path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none"
        stroke={ACCENT}
        strokeWidth={9}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={play ? { pathLength: [0, 0.82, 0.62, 0.82] } : {}}
        transition={{
          duration: 3.6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* needle */}
      <motion.line
        x1={cx}
        y1={cy}
        x2={cx}
        y2={cy - r + 14}
        stroke="var(--color-ink)"
        strokeWidth={2.5}
        strokeLinecap="round"
        initial={{ rotate: -90 }}
        animate={play ? { rotate: [-90, 58, 18, 58] } : {}}
        transition={{
          duration: 3.6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        style={{ originX: `${cx}px`, originY: `${cy}px` }}
      />
      <circle cx={cx} cy={cy} r={4.5} fill="var(--color-ink)" />

      {/* tier chips lighting up in turn */}
      {tiers.map((tier, i) => (
        <motion.g
          key={tier}
          initial={{ opacity: 0.28 }}
          animate={play ? { opacity: [0.28, 1, 0.28] } : {}}
          transition={{
            duration: 3.6,
            delay: i * 0.26,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <rect
            x={26 + i * 74}
            y={26}
            width={64}
            height={17}
            rx={8.5}
            fill="var(--color-accent-soft)"
            stroke={ACCENT}
            strokeWidth={1}
          />
          <text x={58 + i * 74} y={38} textAnchor="middle" {...labelProps} fill={ACCENT}>
            {tier}
          </text>
        </motion.g>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------
   4. funnels - parallel B2C and B2B journeys
   ------------------------------------------------------------------ */
function FunnelsVisual({ play }: { play: boolean }) {
  const funnels = [
    { x: 108, label: "B2C", stages: 5 },
    { x: 312, label: "B2B", stages: 4 },
  ];

  return (
    <>
      {funnels.map((funnel, fi) => (
        <g key={funnel.label}>
          <text x={funnel.x} y={30} textAnchor="middle" {...labelProps} fill={ACCENT}>
            {funnel.label}
          </text>

          {Array.from({ length: funnel.stages }).map((_, i) => {
            const width = 108 - i * 18;
            const y = 44 + i * 22;
            return (
              <g key={i}>
                <rect
                  x={funnel.x - width / 2}
                  y={y}
                  width={width}
                  height={16}
                  rx={4}
                  fill="var(--color-canvas)"
                  stroke={LINE}
                  strokeWidth={1.4}
                />
                <motion.rect
                  x={funnel.x - width / 2}
                  y={y}
                  width={width}
                  height={16}
                  rx={4}
                  fill={ACCENT}
                  initial={{ opacity: 0 }}
                  animate={play ? { opacity: [0, 0.85, 0.85, 0] } : {}}
                  transition={{
                    duration: 3.4,
                    times: [0, 0.2, 0.75, 1],
                    delay: i * 0.28 + fi * 0.5,
                    repeat: Infinity,
                    repeatDelay: 0.4,
                    ease: "easeInOut",
                  }}
                />
              </g>
            );
          })}

          {/* lead dropping in from the top */}
          <motion.circle
            cx={funnel.x}
            r={3.4}
            fill={ACCENT}
            initial={{ cy: 40, opacity: 0 }}
            animate={
              play
                ? {
                    cy: [36, 44 + funnel.stages * 22],
                    opacity: [0, 1, 1, 0],
                  }
                : {}
            }
            transition={{
              duration: 2.2,
              delay: fi * 0.5,
              repeat: Infinity,
              repeatDelay: 1.2,
              ease: "easeIn",
            }}
          />
        </g>
      ))}

      {/* the shared automation spine between the two funnels */}
      <line x1={210} y1={40} x2={210} y2={140} stroke={LINE} strokeWidth={1.5} strokeDasharray="4 5" />
      <text x={210} y={154} textAnchor="middle" {...labelProps}>
        14 WORKFLOWS
      </text>
    </>
  );
}

const VARIANTS: Record<VisualVariant, (p: { play: boolean }) => React.ReactElement> = {
  sync: SyncVisual,
  pipeline: PipelineVisual,
  scoring: ScoringVisual,
  funnels: FunnelsVisual,
};

/**
 * A small animated schematic standing in for a screenshot. Each variant
 * shows how the system actually behaves rather than what it looks like,
 * which keeps client data out of a public portfolio.
 */
export default function ProjectVisual({ variant }: { variant: VisualVariant }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduced = useReducedMotion();
  const Variant = VARIANTS[variant];
  const play = inView && !reduced;

  return (
    <div
      ref={ref}
      className="relative overflow-hidden border-b border-line bg-surface"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(80%_70%_at_50%_50%,black,transparent)]"
      />
      <svg
        viewBox="0 0 420 170"
        className="relative block h-auto w-full"
        role="img"
        aria-label={`Animated schematic of the ${variant} architecture`}
      >
        <Variant play={play} />
      </svg>
    </div>
  );
}
