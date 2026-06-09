"use client";

/**
 * HeroIllustration — Premium Logistics Scene Animation
 *
 * Architecture:
 *  Each element uses a two-stage motion pattern:
 *  1. Entrance: motion.div with initial/animate for the enter-from state
 *  2. Ambient: inner motion.div that starts its loop after the entrance delay
 *
 * Animation wave sequence:
 *  0.00s  Back racks      — fade + scale blur (background depth)
 *  0.12s  Second rack     — same, slightly offset
 *  0.30s  Warehouse       — scale-and-fade (landmark element)
 *  0.70s  Container       — drops in with spring bounce
 *  1.00s  Big truck       — diagonal from upper-left
 *  1.20s  Small truck     — diagonal from upper-left, trailing
 *  1.40s  Forklift        — mechanical slide from left
 *  1.60s  Worker stacker  — diagonal from upper-right
 *  1.75s  Worker pallet   — diagonal from upper-right, trailing
 *  1.90s  Scale           — rises from below
 *  2.00s  Empty pallets   — spring pop
 *  2.15s  Pallet+boxes    — spring pop
 */

import { motion, useReducedMotion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

// ─── Easing presets ───────────────────────────────────────────────────────────
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];
const SPRING_SOFT   = { type: "spring" as const, stiffness: 90,  damping: 16, mass: 0.8 };
const SPRING_BOUNCE = { type: "spring" as const, stiffness: 120, damping: 12, mass: 0.9 };
const SPRING_SNAPPY = { type: "spring" as const, stiffness: 140, damping: 18, mass: 0.7 };

// ─── Entrance "from" states ───────────────────────────────────────────────────
const FROM = {
  rack:          { opacity: 0, scale: 0.88, filter: "blur(4px)" },
  warehouse:     { opacity: 0, scale: 0.92, y: 12 },
  container:     { opacity: 0, y: -80, scale: 0.95 },
  truckBig:      { opacity: 0, x: -120, y: -80, rotate: -4 },
  truckSmall:    { opacity: 0, x: -100, y: -60, rotate: -3 },
  forklift:      { opacity: 0, x: -60,  y: 20 },
  workerStacker: { opacity: 0, x: 70,   y: -60, rotate: 3 },
  workerPallet:  { opacity: 0, x: 80,   y: -50, rotate: 4 },
  scale:         { opacity: 0, y: 40, scale: 0.9 },
  smallItem:     { opacity: 0, scale: 0.75, y: 20 },
};

// ─── Entrance "to" states ─────────────────────────────────────────────────────
const TO_VISIBLE = { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" };

// ─── A single animated scene element ─────────────────────────────────────────
interface SceneElementProps {
  src: StaticImageData;
  alt: string;
  positionClass: string;       // absolute position + z-index classes
  dropShadow?: string;         // tailwind drop-shadow class
  from: object;                // entrance "hidden" state
  enterTransition: object;     // framer transition for entrance
  delay: number;               // entrance delay in seconds
  ambient?: {                  // optional perpetual loop after entrance
    keyframes: object;
    duration: number;
    loopDelay?: number;        // extra start delay before first loop
  };
  priority?: boolean;
}

function SceneElement({
  src,
  alt,
  positionClass,
  dropShadow = "drop-shadow-md",
  from,
  enterTransition,
  delay,
  ambient,
  priority = false,
}: SceneElementProps) {
  const reducedMotion = useReducedMotion();

  // In reduced-motion mode render statically
  if (reducedMotion) {
    return (
      <div className={positionClass}>
        <Image src={src} alt={alt} className={`w-full h-auto object-contain ${dropShadow}`} />
      </div>
    );
  }

  const ambientAnimProps = ambient
    ? {
        animate: {
          ...ambient.keyframes,
          transition: {
            delay: delay + (ambient.loopDelay ?? 1.2),
            duration: ambient.duration,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        },
      }
    : {};

  return (
    <motion.div
      className={positionClass}
      initial={from}
      animate={{
        ...TO_VISIBLE,
        // Merge ambient as a second animate pass — works because Framer
        // processes array keyframes separately from scalar targets
        ...(ambient ? {} : {}),
      }}
      transition={{ ...enterTransition, delay }}
    >
      {/* Inner div handles ambient loop independently */}
      <motion.div
        className="w-full"
        {...ambientAnimProps}
      >
        <Image
          src={src}
          alt={alt}
          className={`w-full h-auto object-contain ${dropShadow}`}
          priority={priority}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface HeroIllustrationProps {
  images: {
    img1:  StaticImageData;  // Big truck
    img2:  StaticImageData;  // Small truck
    img3:  StaticImageData;  // Forklift
    img4:  StaticImageData;  // Scale / scanner
    img5:  StaticImageData;  // Worker with pallet jack
    img6:  StaticImageData;  // Worker with stacker
    img7:  StaticImageData;  // Empty pallets
    img8:  StaticImageData;  // Pallet with boxes
    img9:  StaticImageData;  // (reserved / extra)
    img10: StaticImageData;  // Warehouse
    img11: StaticImageData;  // Storage rack
    img12: StaticImageData;  // Shipping container
  };
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function HeroIllustration({ images }: HeroIllustrationProps) {
  return (
    <div className="relative w-full aspect-[1.1] scale-100 lg:scale-[1.15] lg:translate-x-[2%]">

      {/* ── Wave 0: Back rack — depth layer ─────────────────────────────────── */}
      <SceneElement
        src={images.img11}
        alt="Storage rack"
        positionClass="absolute top-[10%] right-[0%] w-[35%] z-0"
        dropShadow="drop-shadow-sm"
        from={FROM.rack}
        enterTransition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
        delay={0.0}
        priority
      />

      {/* ── Wave 0b: Second rack ─────────────────────────────────────────────── */}
      <SceneElement
        src={images.img11}
        alt="Storage rack"
        positionClass="absolute top-[20%] right-[-12%] w-[35%] z-[1]"
        dropShadow="drop-shadow-sm"
        from={FROM.rack}
        enterTransition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
        delay={0.12}
      />

      {/* ── Wave 1: Warehouse ────────────────────────────────────────────────── */}
      <SceneElement
        src={images.img10}
        alt="Warehouse building"
        positionClass="absolute top-[15%] right-[6%] w-[60%] z-20"
        dropShadow="drop-shadow-xl"
        from={FROM.warehouse}
        enterTransition={{ duration: 1.0, ease: EASE_OUT_EXPO }}
        delay={0.3}
        priority
      />

      {/* ── Wave 2: Shipping container — bouncy drop ─────────────────────────── */}
      <SceneElement
        src={images.img12}
        alt="Shipping container"
        positionClass="absolute bottom-[52%] right-[90%] w-[32%] z-10"
        dropShadow="drop-shadow-md"
        from={FROM.container}
        enterTransition={SPRING_BOUNCE}
        delay={0.7}
      />

      {/* ── Wave 3: Big truck — upper-left diagonal ───────────────────────────── */}
      <SceneElement
        src={images.img1}
        alt="Large cargo truck"
        positionClass="absolute bottom-[25%] right-[85%] w-[42%] z-40"
        dropShadow="drop-shadow-2xl"
        from={FROM.truckBig}
        enterTransition={SPRING_SOFT}
        delay={1.0}
        ambient={{
          keyframes: { y: [0, -6, -3, 0], rotate: [0, 0.4, -0.2, 0] },
          duration: 4.2,
          loopDelay: 1.4,
        }}
        priority
      />

      {/* ── Wave 4: Small truck — upper-left diagonal ─────────────────────────── */}
      <SceneElement
        src={images.img2}
        alt="Small cargo truck"
        positionClass="absolute bottom-[35%] left-[0%] w-[25%] z-30"
        dropShadow="drop-shadow-lg"
        from={FROM.truckSmall}
        enterTransition={SPRING_SOFT}
        delay={1.2}
        ambient={{
          keyframes: { y: [0, -5, -2, 0], rotate: [0, 0.3, -0.15, 0] },
          duration: 3.8,
          loopDelay: 1.3,
        }}
      />

      {/* ── Wave 5: Forklift — mechanical horizontal slide ───────────────────── */}
      <SceneElement
        src={images.img3}
        alt="Forklift"
        positionClass="absolute top-[32%] left-[12%] w-[25%] z-20"
        dropShadow="drop-shadow-md"
        from={FROM.forklift}
        enterTransition={SPRING_SNAPPY}
        delay={1.4}
        ambient={{
          keyframes: { x: [0, 2, -1, 0], rotate: [0, 0.3, -0.2, 0] },
          duration: 3.8,
          loopDelay: 1.2,
        }}
      />

      {/* ── Wave 6: Worker (stacker) — upper-right diagonal ──────────────────── */}
      <SceneElement
        src={images.img6}
        alt="Warehouse worker with stacker"
        positionClass="absolute top-[52%] left-[26%] w-[23%] z-30"
        dropShadow="drop-shadow-md"
        from={FROM.workerStacker}
        enterTransition={SPRING_SOFT}
        delay={1.6}
        ambient={{
          keyframes: { y: [0, -4, 0] },
          duration: 3.0,
          loopDelay: 1.2,
        }}
      />

      {/* ── Wave 7: Worker (pallet jack) — upper-right diagonal ──────────────── */}
      <SceneElement
        src={images.img5}
        alt="Worker with pallet jack"
        positionClass="absolute bottom-[40%] left-[20%] w-[25%] z-40"
        dropShadow="drop-shadow-lg"
        from={FROM.workerPallet}
        enterTransition={SPRING_SOFT}
        delay={1.75}
        ambient={{
          keyframes: { y: [0, -4.5, 0] },
          duration: 3.2,
          loopDelay: 1.15,
        }}
      />

      {/* ── Wave 8: Scale / cargo scanner ────────────────────────────────────── */}
      <SceneElement
        src={images.img4}
        alt="Cargo scale"
        positionClass="absolute bottom-[25%] right-[30%] w-[22%] z-40"
        dropShadow="drop-shadow-lg"
        from={FROM.scale}
        enterTransition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        delay={1.9}
      />

      {/* ── Wave 9: Empty pallets ─────────────────────────────────────────────── */}
      <SceneElement
        src={images.img7}
        alt="Empty pallets"
        positionClass="absolute bottom-[40%] left-[80%] w-[20%] z-30"
        dropShadow="drop-shadow-md"
        from={FROM.smallItem}
        enterTransition={SPRING_BOUNCE}
        delay={2.0}
        ambient={{
          keyframes: { scale: [1, 1.025, 1] },
          duration: 3.5,
          loopDelay: 1.1,
        }}
      />

      {/* ── Wave 10: Pallet with boxes ────────────────────────────────────────── */}
      <SceneElement
        src={images.img8}
        alt="Pallet with cargo boxes"
        positionClass="absolute bottom-[30%] left-[70%] w-[20%] z-50"
        dropShadow="drop-shadow-md"
        from={FROM.smallItem}
        enterTransition={SPRING_BOUNCE}
        delay={2.15}
        ambient={{
          keyframes: { scale: [1, 1.03, 1] },
          duration: 3.8,
          loopDelay: 1.05,
        }}
      />

    </div>
  );
}
