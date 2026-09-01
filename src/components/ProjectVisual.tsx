"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import DashboardVisual from "./visuals/DashboardVisual";

export type VisualVariant =
  | "sync"
  | "pipeline"
  | "scoring"
  | "funnels"
  | "accounts"
  | "dashboard";

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

/* ------------------------------------------------------------------
   5. accounts - four sub-accounts joined by webhooks, with the
      sensitive data destroyed at the moment of approval
   ------------------------------------------------------------------ */
function AccountsVisual({ play }: { play: boolean }) {
  const CYCLE = 6;
  const nodes = [
    { x: 62, label: "CLOSER" },
    { x: 210, label: "VALIDATOR" },
    { x: 358, label: "RETENTION" },
  ];
  const nodeY = 62;
  const halfW = 46;

  return (
    <>
      {/* return path for DNF and chargeback, arcing back to the Closer */}
      <path
        d={`M ${358} ${nodeY - 17} C 358 22, 62 22, 62 ${nodeY - 17}`}
        fill="none"
        stroke={LINE}
        strokeWidth={1.4}
        strokeDasharray="4 4"
      />
      {/* SMIL keeps the packet on the curve; rendered only while in view */}
      {play ? (
        <circle r={2.4} fill={FAINT}>
          <animateMotion
            dur={`${CYCLE}s`}
            repeatCount="indefinite"
            keyPoints="0;0;1;1"
            keyTimes="0;0.68;0.95;1"
            calcMode="linear"
            path={`M ${358} ${nodeY - 17} C 358 22, 62 22, 62 ${nodeY - 17}`}
          />
          <animate
            attributeName="opacity"
            dur={`${CYCLE}s`}
            repeatCount="indefinite"
            values="0;0;1;1;0;0"
            keyTimes="0;0.68;0.72;0.92;0.95;1"
          />
        </circle>
      ) : null}
      <text x={210} y={20} textAnchor="middle" {...labelProps}>
        DNF / CHARGEBACK RETURNS
      </text>

      {/* forward connectors */}
      {[0, 1].map((i) => (
        <line
          key={i}
          x1={nodes[i].x + halfW}
          y1={nodeY}
          x2={nodes[i + 1].x - halfW}
          y2={nodeY}
          stroke={LINE}
          strokeWidth={1.5}
        />
      ))}

      {/* payloads shrink as they move right: fewer, smaller packets downstream */}
      {[
        { seg: 0, count: 3, r: 3.2, delay: 0.2 },
        { seg: 1, count: 2, r: 2, delay: 2.6 },
      ].map(({ seg, count, r, delay }) =>
        Array.from({ length: count }).map((_, d) => (
          <motion.circle
            key={`${seg}-${d}`}
            cy={nodeY}
            r={r}
            fill={ACCENT}
            initial={{ cx: nodes[seg].x + halfW, opacity: 0 }}
            animate={
              play
                ? {
                    cx: [nodes[seg].x + halfW, nodes[seg + 1].x - halfW],
                    opacity: [0, 1, 1, 0],
                  }
                : {}
            }
            transition={{
              duration: 1.1,
              delay: delay + d * 0.22,
              repeat: Infinity,
              repeatDelay: CYCLE - 1.1,
              ease: "easeInOut",
            }}
          />
        )),
      )}

      {/* the three working accounts */}
      {nodes.map((node, i) => (
        <g key={node.label}>
          <motion.rect
            x={node.x - halfW}
            y={nodeY - 17}
            width={halfW * 2}
            height={34}
            rx={8}
            fill="var(--color-canvas)"
            stroke={LINE}
            strokeWidth={1.5}
            animate={
              play
                ? { stroke: [LINE, LINE, ACCENT, LINE] }
                : {}
            }
            transition={{
              duration: CYCLE,
              times: [0, 0.05 + i * 0.18, 0.15 + i * 0.18, 0.32 + i * 0.18],
              repeat: Infinity,
            }}
          />
          <text x={node.x} y={nodeY + 4} textAnchor="middle" {...labelProps} fill="var(--color-ink)">
            {node.label}
          </text>
        </g>
      ))}

      {/* what the Closer holds, and loses on approval */}
      <motion.text
        x={62}
        y={nodeY + 30}
        textAnchor="middle"
        {...labelProps}
        fontSize={7}
        initial={{ opacity: 0 }}
        animate={play ? { opacity: [0, 1, 1, 0, 0] } : {}}
        transition={{
          duration: CYCLE,
          times: [0, 0.06, 0.52, 0.58, 1],
          repeat: Infinity,
        }}
      >
        SSN · BANKING · MEDICAL
      </motion.text>
      <motion.text
        x={62}
        y={nodeY + 30}
        textAnchor="middle"
        {...labelProps}
        fontSize={7}
        fill={ACCENT}
        initial={{ opacity: 0 }}
        animate={play ? { opacity: [0, 0, 1, 1, 0] } : {}}
        transition={{
          duration: CYCLE,
          times: [0, 0.58, 0.63, 0.9, 1],
          repeat: Infinity,
        }}
      >
        WIPED ON APPROVAL
      </motion.text>

      {/* every event mirrors down into Central */}
      {nodes.map((node, i) => (
        <g key={`mirror-${node.label}`}>
          <line
            x1={node.x}
            y1={nodeY + 17}
            x2={210}
            y2={128}
            stroke={LINE}
            strokeWidth={1}
            strokeDasharray="3 5"
          />
          <motion.circle
            r={2}
            fill={FAINT}
            initial={{ cx: node.x, cy: nodeY + 17, opacity: 0 }}
            animate={
              play
                ? { cx: [node.x, 210], cy: [nodeY + 17, 128], opacity: [0, 1, 0] }
                : {}
            }
            transition={{
              duration: 1.2,
              delay: 0.9 + i * 0.9,
              repeat: Infinity,
              repeatDelay: CYCLE - 1.2,
              ease: "easeIn",
            }}
          />
        </g>
      ))}

      <rect
        x={210 - 52}
        y={128}
        width={104}
        height={28}
        rx={8}
        fill="var(--color-accent-soft)"
        stroke={ACCENT}
        strokeWidth={1.4}
      />
      <text x={210} y={146} textAnchor="middle" {...labelProps} fill={ACCENT}>
        CENTRAL MIRROR
      </text>
    </>
  );
}

const VARIANTS: Record<VisualVariant, (p: { play: boolean }) => React.ReactElement> = {
  sync: SyncVisual,
  pipeline: PipelineVisual,
  scoring: ScoringVisual,
  funnels: FunnelsVisual,
  accounts: AccountsVisual,
  dashboard: DashboardVisual,
};

/** Schematics use a wide short frame; the UI mock uses a 16:9 screen. */
const VIEWBOXES: Partial<Record<VisualVariant, string>> = {
  dashboard: "0 0 420 236",
};
const DEFAULT_VIEWBOX = "0 0 420 170";

/** Variants that paint their own full background need no grid behind them. */
const FULL_BLEED = new Set<VisualVariant>(["dashboard"]);

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
      {FULL_BLEED.has(variant) ? null : (
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(80%_70%_at_50%_50%,black,transparent)]"
        />
      )}
      <svg
        viewBox={VIEWBOXES[variant] ?? DEFAULT_VIEWBOX}
        className="relative block h-auto w-full"
        role="img"
        aria-label={
          variant === "dashboard"
            ? "Mock-up of the dashboard interface, shown with demo data"
            : `Animated schematic of the ${variant} architecture`
        }
      >
        <Variant play={play} />
      </svg>
    </div>
  );
}
