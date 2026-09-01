"use client";

import { motion } from "motion/react";

/**
 * A mock-up of the Summer100 reporting UI, drawn as SVG.
 *
 * Every number here is invented. No client record, name or revenue
 * figure appears in this file, which is why it is a drawing rather
 * than a screenshot.
 */

const ACCENT = "var(--color-accent)";
const LINE = "var(--color-line)";
const INK = "var(--color-ink)";
const CANVAS = "var(--color-canvas)";

const label = {
  fill: "var(--color-faint)",
  fontFamily: "var(--font-sans)",
} as const;

/**
 * Categorical trio taken from the validated palette. Passes CVD and
 * normal-vision separation on all pairs against a light surface, so the
 * three donut segments stay distinguishable without relying on hue alone.
 */
const CAT = ["#2a78d6", "#eb6834", "#1baf7a"] as const;

/** The funnel encodes magnitude, so it uses one hue stepped light to dark. */
const BLUE_RAMP = ["#b7d3f6", "#86b6ef", "#3987e5", "#2a78d6", "#1c5cab"] as const;

const polar = (cx: number, cy: number, r: number, deg: number) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)] as const;
};

/** One donut segment: outer arc out, inner arc back, closed. */
function donutSegment(
  cx: number,
  cy: number,
  rOut: number,
  rIn: number,
  a0: number,
  a1: number,
) {
  const [x0, y0] = polar(cx, cy, rOut, a0);
  const [x1, y1] = polar(cx, cy, rOut, a1);
  const [x2, y2] = polar(cx, cy, rIn, a1);
  const [x3, y3] = polar(cx, cy, rIn, a0);
  const large = a1 - a0 > 180 ? 1 : 0;
  return [
    `M ${x0} ${y0}`,
    `A ${rOut} ${rOut} 0 ${large} 1 ${x1} ${y1}`,
    `L ${x2} ${y2}`,
    `A ${rIn} ${rIn} 0 ${large} 0 ${x3} ${y3}`,
    "Z",
  ].join(" ");
}

const NAV = [
  "Dashboard",
  "Funnel",
  "Operations",
  "Owners",
  "Nurture",
  "Data Quality",
  "Stuck",
];

const KPIS = [
  { label: "TOTAL LEADS", value: "1,284", delta: "+12%" },
  { label: "QUALIFIED", value: "412", delta: "+8%" },
  { label: "CONVERTED", value: "118", delta: "+5%" },
];

const FUNNEL = [
  { w: 164, value: "1,284" },
  { w: 116, value: "412" },
  { w: 84, value: "264" },
  { w: 62, value: "171" },
  { w: 46, value: "118" },
];

const SHARES = [55, 28, 17];
const LEGEND = ["Organic 55%", "Ads 28%", "Referral 17%"];

const D_CX = 320;
const D_CY = 148;

const SEGMENTS = (() => {
  let cursor = 0;
  return SHARES.map((share) => {
    // 1.5 degrees of surface either side keeps the segments from touching.
    const path = donutSegment(
      D_CX,
      D_CY,
      24,
      14.5,
      cursor + 1.5,
      cursor + (share / 100) * 360 - 1.5,
    );
    cursor += (share / 100) * 360;
    return path;
  });
})();

const SERIES = [
  0.24, 0.34, 0.29, 0.47, 0.41, 0.57, 0.65, 0.59, 0.74, 0.71, 0.85, 0.95,
];
const sx = (i: number) => 100 + (i * 298) / (SERIES.length - 1);
const sy = (v: number) => 222 - v * 22;
const LINE_PATH = SERIES.map((v, i) => `${i ? "L" : "M"} ${sx(i)} ${sy(v)}`).join(" ");
const AREA_PATH = `${LINE_PATH} L ${sx(SERIES.length - 1)} 222 L ${sx(0)} 222 Z`;

const panel = {
  fill: CANVAS,
  stroke: LINE,
  strokeWidth: 1,
  rx: 6,
} as const;

export default function DashboardVisual({ play }: { play: boolean }) {
  return (
    <>
      {/* ---- app chrome ---- */}
      <rect x={0} y={0} width={420} height={236} fill="var(--color-surface)" />
      <rect x={0} y={0} width={78} height={236} fill={INK} />
      <rect x={78} y={0} width={342} height={32} fill={CANVAS} />
      <line x1={78} y1={32} x2={420} y2={32} stroke={LINE} strokeWidth={1} />

      <rect x={12} y={13} width={13} height={13} rx={3.5} fill={ACCENT} />
      <text x={30} y={23} {...label} fontSize={6.2} letterSpacing={0.6} fill="#ffffff" fontWeight={600}>
        SUMMER100
      </text>

      {/* ---- sidebar nav, first item active ---- */}
      {NAV.map((item, i) => (
        <g key={item}>
          {i === 0 ? (
            <motion.rect
              x={8}
              y={41 + i * 20}
              width={62}
              height={15}
              rx={4}
              fill={ACCENT}
              initial={{ opacity: 0 }}
              animate={play ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.15 }}
            />
          ) : null}
          <text
            x={16}
            y={51.5 + i * 20}
            {...label}
            fontSize={6}
            fill={i === 0 ? "#ffffff" : "rgba(255,255,255,0.5)"}
          >
            {item}
          </text>
        </g>
      ))}

      {/* ---- topbar ---- */}
      <text x={90} y={20} {...label} fontSize={9.5} fill={INK} fontWeight={600}>
        Dashboard
      </text>
      <text x={380} y={19} textAnchor="end" {...label} fontSize={6}>
        Updated 2m ago
      </text>
      <circle cx={398} cy={16} r={7} fill="none" stroke={LINE} strokeWidth={1} />
      <motion.circle
        cx={398}
        cy={16}
        r={4.2}
        fill="none"
        stroke={ACCENT}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeDasharray="14 12"
        animate={play ? { rotate: 360 } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{ originX: "398px", originY: "16px" }}
      />

      {/* ---- KPI row ---- */}
      {KPIS.map((kpi, i) => {
        const x = 88 + i * 110;
        return (
          <motion.g
            key={kpi.label}
            initial={{ opacity: 0, y: 6 }}
            animate={play ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
          >
            <rect x={x} y={44} width={102} height={44} {...panel} />
            <text x={x + 9} y={59} {...label} fontSize={5.4} letterSpacing={0.7}>
              {kpi.label}
            </text>
            <text x={x + 9} y={79} {...label} fontSize={15} letterSpacing={-0.3} fill={INK} fontWeight={600}>
              {kpi.value}
            </text>
            <text x={x + 93} y={79} textAnchor="end" {...label} fontSize={6} fill={CAT[2]} fontWeight={600}>
              {kpi.delta}
            </text>
          </motion.g>
        );
      })}

      {/* ---- conversion funnel ---- */}
      <rect x={88} y={100} width={190} height={76} {...panel} />
      <text x={97} y={113} {...label} fontSize={5.6} letterSpacing={0.7}>
        CONVERSION FUNNEL
      </text>
      {FUNNEL.map((row, i) => {
        const y = 120 + i * 11;
        return (
          <motion.g
            key={i}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={play ? { scaleX: 1, opacity: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: 0.3 + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ originX: "183px", originY: `${y + 4.5}px` }}
          >
            <rect
              x={183 - row.w / 2}
              y={y}
              width={row.w}
              height={9}
              rx={2.5}
              fill={BLUE_RAMP[i]}
            />
            <text
              x={183}
              y={y + 6.6}
              textAnchor="middle"
              {...label}
              fontSize={5.4}
              fontWeight={600}
              fill={i < 2 ? INK : "#ffffff"}
            >
              {row.value}
            </text>
          </motion.g>
        );
      })}

      {/* ---- lead source, direct-labelled so identity is never colour alone ---- */}
      <rect x={286} y={100} width={124} height={76} {...panel} />
      <text x={295} y={113} {...label} fontSize={5.6} letterSpacing={0.7}>
        LEAD SOURCE
      </text>
      {SEGMENTS.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill={CAT[i]}
          initial={{ opacity: 0 }}
          animate={play ? { opacity: 1 } : {}}
          transition={{ duration: 0.45, delay: 0.4 + i * 0.12 }}
        />
      ))}
      <text
        x={D_CX}
        y={D_CY + 2.5}
        textAnchor="middle"
        {...label}
        fontSize={7.5}
        letterSpacing={-0.2}
        fill={INK}
        fontWeight={600}
      >
        1,284
      </text>
      {LEGEND.map((text, i) => (
        <g key={text}>
          <rect x={352} y={132 + i * 12} width={6} height={6} rx={1.5} fill={CAT[i]} />
          <text x={362} y={137.5 + i * 12} {...label} fontSize={5.2}>
            {text}
          </text>
        </g>
      ))}

      {/* ---- weekly trend: one series, so the title names it and no legend is needed ---- */}
      <rect x={88} y={184} width={322} height={44} {...panel} />
      <text x={97} y={196} {...label} fontSize={5.6} letterSpacing={0.7}>
        LEADS PER WEEK
      </text>
      <motion.path
        d={AREA_PATH}
        fill={ACCENT}
        fillOpacity={0.1}
        initial={{ opacity: 0 }}
        animate={play ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.85 }}
      />
      <motion.path
        d={LINE_PATH}
        fill="none"
        stroke={ACCENT}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={play ? { pathLength: 1 } : {}}
        transition={{ duration: 1.1, delay: 0.55, ease: "easeInOut" }}
      />
      <motion.circle
        cx={sx(SERIES.length - 1)}
        cy={sy(SERIES[SERIES.length - 1])}
        r={2.8}
        fill={ACCENT}
        stroke={CANVAS}
        strokeWidth={1.6}
        initial={{ scale: 0 }}
        animate={play ? { scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 18, delay: 1.5 }}
        style={{
          originX: `${sx(SERIES.length - 1)}px`,
          originY: `${sy(SERIES[SERIES.length - 1])}px`,
        }}
      />
    </>
  );
}
