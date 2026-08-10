import { type ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import heroEstate from '@assets/generated_images/hero-estate.jpg';
import stairwell from '@assets/generated_images/stairwell.jpg';
import asphalt from '@assets/ChatGPT_Image_Aug_9,_2026,_03_01_38_PM_1786253514550.png';
import windowImg from '@assets/generated_images/window.jpg';
import rooftop from '@assets/ChatGPT_Image_Aug_10,_2026,_05_05_14_AM_1786304514365.png';
import dragonfly from '@assets/ChatGPT_Image_Aug_9,_2026,_03_06_56_PM_1786253850408.png';
import coverImage from '@assets/insect-kin_2_1786244795412.jpg';
import darkCribLogo from '@assets/Dark_Crib_Publishing_1_1786329845958.jpg';
import authorPhoto from '@assets/Paper_23_1786245757626.jpg';

// ─── Insect SVGs ────────────────────────────────────────────────────────────

const INSECT_RED = 'hsl(4 82% 46%)';

/** Top-down dragonfly silhouette */
function DragonflySVG({ size = 220, opacity = 0.92 }: { size?: number; opacity?: number }) {
  return (
    <svg
      width={size}
      height={size * 1.65}
      viewBox="0 0 300 495"
      fill={INSECT_RED}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Compound eyes */}
      <ellipse cx="120" cy="30" rx="20" ry="17" />
      <ellipse cx="180" cy="30" rx="20" ry="17" />
      {/* Head bridge */}
      <ellipse cx="150" cy="34" rx="18" ry="14" />
      {/* Thorax */}
      <ellipse cx="150" cy="76" rx="22" ry="28" />
      {/* ── Wings ── */}
      {/* Upper wings — large, sweeping */}
      <path d="M128 62 C95 44 35 22 6 52 C-8 80 22 122 68 116 C100 112 122 94 128 84 Z" />
      <path d="M172 62 C205 44 265 22 294 52 C308 80 278 122 232 116 C200 112 178 94 172 84 Z" />
      {/* Lower wings — slightly smaller */}
      <path d="M130 88 C100 76 42 66 16 88 C2 106 30 140 72 134 C102 128 126 112 130 100 Z" />
      <path d="M170 88 C200 76 258 66 284 88 C298 106 270 140 228 134 C198 128 174 112 170 100 Z" />
      {/* ── Abdomen — segmented, tapering ── */}
      <path d="M133 102 L167 102 L169 128 Q150 136 131 128 Z" />
      <ellipse cx="150" cy="143" rx="17" ry="14" />
      <ellipse cx="150" cy="167" rx="15" ry="13" />
      <ellipse cx="150" cy="190" rx="13" ry="12" />
      <ellipse cx="150" cy="211" rx="11" ry="10" />
      <ellipse cx="150" cy="231" rx="9"  ry="9"  />
      <ellipse cx="150" cy="249" rx="7.5" ry="8" />
      <ellipse cx="150" cy="266" rx="6"  ry="7"  />
      <ellipse cx="150" cy="281" rx="5"  ry="6.5"/>
      <ellipse cx="150" cy="295" rx="4"  ry="5.5"/>
      <ellipse cx="150" cy="308" rx="3"  ry="5"  />
      <path d="M147 312 L153 312 L152 330 L148 330 Z" />
      {/* ── Legs ── */}
      <line x1="130" y1="72" x2="82"  y2="100" stroke={INSECT_RED} strokeWidth="3" fill="none" />
      <line x1="128" y1="82" x2="78"  y2="112" stroke={INSECT_RED} strokeWidth="3" fill="none" />
      <line x1="128" y1="92" x2="80"  y2="124" stroke={INSECT_RED} strokeWidth="3" fill="none" />
      <line x1="170" y1="72" x2="218" y2="100" stroke={INSECT_RED} strokeWidth="3" fill="none" />
      <line x1="172" y1="82" x2="222" y2="112" stroke={INSECT_RED} strokeWidth="3" fill="none" />
      <line x1="172" y1="92" x2="220" y2="124" stroke={INSECT_RED} strokeWidth="3" fill="none" />
    </svg>
  );
}

/** Small housefly / beetle silhouette */
function InsectFlySVG({ size = 48, opacity = 0.88 }: { size?: number; opacity?: number }) {
  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 80 104"
      fill={INSECT_RED}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Head */}
      <ellipse cx="40" cy="14" rx="14" ry="11" />
      {/* Thorax */}
      <ellipse cx="40" cy="36" rx="13" ry="16" />
      {/* Wings */}
      <path d="M27 28 C10 18 2 8 8 22 C14 36 26 38 27 32 Z" />
      <path d="M53 28 C70 18 78 8 72 22 C66 36 54 38 53 32 Z" />
      <path d="M28 38 C12 30 4 24 10 36 C16 48 28 48 28 42 Z" />
      <path d="M52 38 C68 30 76 24 70 36 C64 48 52 48 52 42 Z" />
      {/* Abdomen */}
      <ellipse cx="40" cy="58" rx="11" ry="12" />
      <ellipse cx="40" cy="76" rx="8"  ry="9"  />
      <ellipse cx="40" cy="91" rx="5"  ry="6"  />
      {/* Legs */}
      <line x1="27" y1="34" x2="8"  y2="46" stroke={INSECT_RED} strokeWidth="2" fill="none" />
      <line x1="27" y1="40" x2="6"  y2="54" stroke={INSECT_RED} strokeWidth="2" fill="none" />
      <line x1="53" y1="34" x2="72" y2="46" stroke={INSECT_RED} strokeWidth="2" fill="none" />
      <line x1="53" y1="40" x2="74" y2="54" stroke={INSECT_RED} strokeWidth="2" fill="none" />
    </svg>
  );
}

/** Wraps an insect in a gentle, perpetual floating animation */
function FloatAnim({
  children,
  duration = 7,
  delay = 0,
  yRange = 14,
  rotRange = 3,
  baseRotation = 0,
  className = '',
}: {
  children: ReactNode;
  duration?: number;
  delay?: number;
  yRange?: number;
  rotRange?: number;
  baseRotation?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none select-none ${className}`}
      style={{ rotate: baseRotation }}
      animate={{
        y: [0, -yRange, 0],
        rotate: [baseRotation, baseRotation + rotRange, baseRotation - rotRange, baseRotation],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Utility components ──────────────────────────────────────────────────────

function FadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ParallaxImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  return (
    <div ref={ref} className={`overflow-hidden relative ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1.1 }}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="bg-background text-foreground min-h-screen overflow-x-hidden selection:bg-primary selection:text-primary-foreground">

      {/* 1. HERO */}
      <section className="relative h-[100dvh] w-full flex items-center justify-center border-b border-border">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 overflow-hidden">
            <ParallaxImage src={heroEstate} alt="Ashbrook Court at night" className="w-full h-full" />
            <div className="absolute inset-0" style={{ backgroundColor: 'hsl(80 55% 10%)', mixBlendMode: 'multiply', opacity: 0.55 }} />
            <div className="absolute inset-0" style={{ backgroundColor: 'transparent', backdropFilter: 'saturate(0.4) hue-rotate(20deg)' }} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10" />
        </div>

        {/* Insects — hero */}
        {/* Large dragonfly hovering upper-right over the building */}
        <FloatAnim baseRotation={-18} duration={8} delay={0} yRange={16} className="top-[8%] right-[-2%] z-20">
          <DragonflySVG size={240} opacity={0.90} />
        </FloatAnim>
        {/* Small dragonfly, lower-left */}
        <FloatAnim baseRotation={30} duration={6} delay={1.5} yRange={10} className="bottom-[20%] left-[4%] z-20">
          <DragonflySVG size={90} opacity={0.80} />
        </FloatAnim>
        {/* Tiny fly, mid-right */}
        <FloatAnim baseRotation={-5} duration={5} delay={3} yRange={8} className="top-[42%] right-[8%] z-20">
          <InsectFlySVG size={38} opacity={0.75} />
        </FloatAnim>

        <div className="relative z-10 flex flex-col items-center text-center w-full px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="w-full"
          >
            <h1 className="font-serif tracking-wide uppercase leading-none w-full"
                style={{ fontSize: 'clamp(4rem, 14vw, 16rem)', color: 'hsl(42 30% 88%)' }}>
              Insect Kin
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase mt-4">
              Matthew Tait
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.2 }}
          >
            <p className="font-sans italic text-base md:text-lg tracking-wide mt-6"
               style={{ color: 'hsl(42 20% 62%)' }}>
              Something is growing beneath Ashbrook Court.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 2.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-muted-foreground to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* 2. THE BLURB */}
      <section className="py-32 md:py-48 px-6 bg-background relative">
        {/* Dragonfly bleeding in from top-right */}
        <FloatAnim baseRotation={12} duration={9} delay={0.5} yRange={18} className="-top-16 right-[1%] z-10">
          <DragonflySVG size={180} opacity={0.88} />
        </FloatAnim>
        {/* Tiny fly bottom-left */}
        <FloatAnim baseRotation={-25} duration={5.5} delay={2} yRange={8} className="bottom-12 left-[6%] z-10">
          <InsectFlySVG size={34} opacity={0.72} />
        </FloatAnim>

        <div className="max-w-3xl mx-auto relative z-10">
          <FadeIn>
            <div className="mb-12">
              <div className="h-[1px] w-12 mb-8" style={{ backgroundColor: 'hsl(var(--ochre))' }} />
              <p className="text-sm font-sans uppercase tracking-widest font-semibold" style={{ color: 'hsl(var(--ochre))' }}>
                A claustrophobic supernatural horror novella from award-winning author Matthew Tait.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-3xl md:text-5xl font-serif italic leading-snug text-foreground mb-8">
              At the height of a global pandemic, Lucas and Vanessa awake in darkness.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-lg md:text-2xl font-sans text-muted-foreground font-light leading-relaxed mb-12">
              They've been stolen from their lives and dumped inside Ashbrook Court – an abandoned social housing estate in Adelaide long since left to rot. As memories return and the body count rises, they begin to uncover the truth about Ashbrook Court.
            </p>
          </FadeIn>
          <FadeIn delay={0.6}>
            <p className="text-4xl md:text-6xl font-serif italic tracking-wide text-primary">
              Something is waiting.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 3. REVIEWS */}
      <section className="py-24 md:py-32 px-6 border-t border-border relative"
               style={{ backgroundColor: 'hsl(38 10% 7%)' }}>
        {/* Small insects in the margins */}
        <FloatAnim baseRotation={12} duration={7} delay={1} yRange={9} className="top-10 left-6 z-10">
          <InsectFlySVG size={32} opacity={0.68} />
        </FloatAnim>
        <FloatAnim baseRotation={-20} duration={6} delay={0} yRange={8} className="bottom-10 right-8 z-10">
          <InsectFlySVG size={28} opacity={0.60} />
        </FloatAnim>

        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-16 text-center">
              Readers on Insect Kin
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Review 1 */}
            <FadeIn delay={0.1}>
              <div className="flex flex-col h-full border-l-2 pl-8" style={{ borderColor: 'hsl(var(--primary))' }}>
                <span className="font-serif text-6xl leading-none mb-6" style={{ color: 'hsl(var(--primary))', opacity: 0.6 }}>&ldquo;</span>
                <p className="font-sans text-base md:text-lg leading-relaxed text-foreground font-normal flex-1">
                  Wyndham's <em>The Day of the Triffids</em> meets Ballard's <em>High-Rise</em> played out in suburban Adelaide. While the title is taken from a song by Bush, this horror story had me hearing <em>Come to Daddy</em> by Aphex Twin accompanied by the fluttering of countless chitin wings. Against the backdrop of the pandemic, Matthew Tait offers us this nightmarish tale set in an abandoned housing estate undergoing a metamorphosis.
                </p>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mt-8">
                  — Amazon Review
                </p>
              </div>
            </FadeIn>

            {/* Review 2 */}
            <FadeIn delay={0.25}>
              <div className="flex flex-col h-full border-l-2 pl-8" style={{ borderColor: 'hsl(var(--primary))' }}>
                <span className="font-serif text-6xl leading-none mb-6" style={{ color: 'hsl(var(--primary))', opacity: 0.6 }}>&ldquo;</span>
                <p className="font-sans text-base md:text-lg leading-relaxed text-foreground font-normal flex-1">
                  Matthew Tait creates his own version of the Candyman in this short but powerful story about a supernatural executioner of Adelaide's social underbelly. Tait draws shades of Bentley Little and Richard Laymon for his violent and gritty tale, which for the most part feels strangely akin to Adelaide's own shocking true crime past.
                </p>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mt-8">
                  — Amazon Review
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 4. ASHBROOK COURT */}
      <section
        className="py-24 px-6 border-t border-border relative"
        style={{ backgroundColor: 'hsl(var(--section-forest))' }}
      >
        {/* Two small flies in the margins */}
        <FloatAnim baseRotation={15} duration={6} delay={0} yRange={7} className="top-16 right-8 z-10">
          <InsectFlySVG size={44} opacity={0.82} />
        </FloatAnim>
        <FloatAnim baseRotation={-35} duration={7} delay={2.5} yRange={9} className="bottom-20 left-10 z-10">
          <InsectFlySVG size={32} opacity={0.70} />
        </FloatAnim>
        {/* Small dragonfly, right column mid */}
        <FloatAnim baseRotation={8} duration={8.5} delay={1} yRange={12} className="top-1/2 right-4 z-10">
          <DragonflySVG size={100} opacity={0.78} />
        </FloatAnim>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <FadeIn>
            <ParallaxImage src={stairwell} alt="A claustrophobic concrete stairwell"
              className="aspect-[4/5] w-full bg-muted border border-border" />
          </FadeIn>
          <div className="flex flex-col justify-center">
            <FadeIn>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                ASHBROOK COURT — UNIT 01
              </h2>
              <h3 className="text-4xl md:text-5xl font-serif font-medium tracking-wide mb-8"
                  style={{ color: 'hsl(42 25% 86%)' }}>
                Ashbrook Court
              </h3>
              <div className="space-y-6 text-lg font-sans text-muted-foreground font-light leading-relaxed">
                <p>Ageing apartment blocks. Concrete, brick, asphalt. Corridors that smell of damp and cheap cleaning chemicals.</p>
                <p>This isn't a gothic castle. There are no ancient curses here. Just neglected gardens, rusted fences, and weeds forcing their way through cracked concrete under the oppressive Australian heat.</p>
                <p>The ordinariness is the trap. The familiar suburban textures are the walls of the cage.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 4. 3:00 AM — most ominous, largest dragonfly */}
      <section
        className="py-32 px-6 border-y border-border relative overflow-visible"
        style={{ backgroundColor: 'hsl(var(--section-ominous))' }}
      >
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none translate-x-1/2 -translate-y-1/3"
             style={{ backgroundColor: 'hsl(38 40% 18% / 0.5)' }} />

        {/* Dominant dragonfly, left edge — the centrepiece of the page's insect drama */}
        <FloatAnim baseRotation={-28} duration={10} delay={0} yRange={20} rotRange={4} className="top-8 -left-8 z-10">
          <DragonflySVG size={280} opacity={0.94} />
        </FloatAnim>
        {/* Small fly, right side */}
        <FloatAnim baseRotation={20} duration={5} delay={1.8} yRange={7} className="bottom-16 right-10 z-10">
          <InsectFlySVG size={40} opacity={0.78} />
        </FloatAnim>
        {/* Medium dragonfly, bottom-right bleeding into next section */}
        <FloatAnim baseRotation={-10} duration={8} delay={3} yRange={14} className="-bottom-16 right-[3%] z-10">
          <DragonflySVG size={150} opacity={0.82} />
        </FloatAnim>

        {/* Full-width rooftop image above the prose */}
        <div className="max-w-7xl mx-auto mb-16 relative z-10">
          <FadeIn>
            <ParallaxImage
              src={rooftop}
              alt="The rooftop of Ashbrook Court at night"
              className="w-full aspect-[21/9] border border-border"
            />
          </FadeIn>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="order-2 lg:order-1 flex flex-col justify-center">
            <FadeIn>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">NOTICE — LEVEL 3</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-medium tracking-wide mb-8"
                  style={{ color: 'hsl(42 22% 82%)' }}>
                3:00 AM
              </h3>
              <div className="space-y-6 text-lg font-sans text-muted-foreground font-light leading-relaxed">
                <p>The estate is quiet now.</p>
                <p>The windows are dark. The corridors are empty. Weeds have pushed through the concrete and the buildings have begun to surrender to time.</p>
                <p>But abandonment is not the same thing as death.</p>
                <p>Something remains beneath Ashbrook Court.</p>
                <p>Something has survived the silence.</p>
                <p className="text-foreground font-medium">Something has been growing in the dark.</p>
              </div>
            </FadeIn>
          </div>
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
            <FadeIn delay={0.2}>
              <ParallaxImage src={asphalt} alt="Cracked asphalt and dead grass"
                className="aspect-square w-full bg-muted border border-border mt-12" />
            </FadeIn>
            <FadeIn delay={0.4}>
              <ParallaxImage src={windowImg} alt="A single glowing window at night"
                className="aspect-square w-full bg-muted border border-border" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 5. SOMETHING IS HATCHING — densest insect section */}
      <section
        className="py-32 px-6 relative"
        style={{ backgroundColor: 'hsl(var(--section-deep))' }}
      >
        {/* Cluster of dragonflies and flies — swarm feeling */}
        <FloatAnim baseRotation={8} duration={9} delay={0} yRange={18} className="top-10 right-[3%] z-10">
          <DragonflySVG size={200} opacity={0.92} />
        </FloatAnim>
        <FloatAnim baseRotation={-20} duration={7} delay={1.2} yRange={14} className="bottom-16 left-[2%] z-10">
          <DragonflySVG size={140} opacity={0.85} />
        </FloatAnim>
        <FloatAnim baseRotation={40} duration={5} delay={0.8} yRange={8} className="top-1/3 left-[10%] z-10">
          <InsectFlySVG size={50} opacity={0.88} />
        </FloatAnim>
        <FloatAnim baseRotation={-12} duration={4.5} delay={2.5} yRange={6} className="top-1/2 right-[22%] z-10">
          <InsectFlySVG size={36} opacity={0.78} />
        </FloatAnim>
        <FloatAnim baseRotation={25} duration={6} delay={3.5} yRange={10} className="bottom-8 right-[12%] z-10">
          <InsectFlySVG size={42} opacity={0.80} />
        </FloatAnim>

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <FadeIn>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] mb-4"
                style={{ color: 'hsl(var(--iridescent))' }}>
              INCIDENT REPORT — SECTOR 7
            </h2>
            <h3 className="text-4xl md:text-6xl font-serif font-medium tracking-wide mb-16"
                style={{ color: 'hsl(42 25% 86%)' }}>
              Something is hatching
            </h3>
          </FadeIn>
          <div className="w-full max-w-4xl mb-16">
            <FadeIn delay={0.2}>
              <ParallaxImage src={dragonfly} alt="A dragonfly on a rusted railing"
                className="aspect-[21/9] w-full bg-muted border border-border" />
            </FadeIn>
          </div>
          <FadeIn delay={0.4}>
            <p className="text-xl md:text-2xl font-sans text-muted-foreground font-light max-w-3xl leading-relaxed">
              They are not decorative. They are not beautiful. They watch from the rusted railings and the peeling stairwells. The hum of insects you can't quite locate. The sickening iridescence under a bare bulb.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 6. AUTHOR */}
      <section
        className="py-24 md:py-36 px-6 border-t border-border relative"
        style={{ backgroundColor: 'hsl(var(--section-warm))' }}
      >
        {/* Subtle presence — one small dragonfly, corner */}
        <FloatAnim baseRotation={-8} duration={8} delay={1} yRange={11} className="top-10 right-6 z-10">
          <DragonflySVG size={108} opacity={0.76} />
        </FloatAnim>
        <FloatAnim baseRotation={30} duration={5.5} delay={0} yRange={7} className="bottom-12 left-8 z-10">
          <InsectFlySVG size={30} opacity={0.68} />
        </FloatAnim>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">
          <FadeIn>
            <div className="relative">
              <img src={authorPhoto} alt="Matthew Tait"
                className="w-full max-w-sm grayscale contrast-110 border border-border/40 shadow-[0_20px_60px_rgba(0,0,0,0.6)]" />
              <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase mt-4">
                Matthew Tait — Adelaide, South Australia
              </p>
            </div>
          </FadeIn>
          <div className="flex flex-col justify-start lg:pt-4">
            <FadeIn>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">About the Author</h2>
              <h3 className="text-3xl md:text-4xl font-serif font-medium tracking-wide mb-8"
                  style={{ color: 'hsl(42 28% 86%)' }}>
                Matthew Tait
              </h3>
              <div className="space-y-5 font-sans text-base md:text-lg text-muted-foreground font-light leading-relaxed">
                <p>Matthew Tait is an award-winning Australian horror author whose work blends psychological intensity with uncanny, brutal atmosphere. He published his first collection of dark fiction in 2011 and has since built a catalogue of titles praised for their originality and emotional depth.</p>
                <p>His novel <em className="text-foreground font-normal">Deception Pass</em> won the Australasian Shadows Award for Best Novel, an honour for which he has been nominated three times. His short story <em className="text-foreground font-normal">Car Crash Weather</em> received a commendation from the Australian Horror Writers Association in 2006.</p>
                <p>A former horror columnist and lifelong devotee of the genre, Tait writes every draft longhand — in pen and paper — before any manuscript touches a keyboard. A working method that has shaped the deliberate, sentence-level attention his prose is known for.</p>
                <p>He lives and writes in Adelaide, South Australia, and is currently undertaking a full ground-up rewrite of his 2014 novel <em className="text-foreground font-normal">Davey Ribbon</em>.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION */}
      <section
        className="py-48 px-6 border-t border-border relative flex flex-col items-center text-center overflow-hidden"
        style={{ backgroundColor: 'hsl(var(--section-rust))' }}
      >
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'radial-gradient(ellipse at center, hsl(8 40% 14% / 0.8) 0%, transparent 70%)' }} />

        {/* Two dragonflies flanking the cover */}
        <FloatAnim baseRotation={6} duration={9} delay={0} yRange={16} className="top-8 left-[3%] z-10">
          <DragonflySVG size={160} opacity={0.87} />
        </FloatAnim>
        <FloatAnim baseRotation={-14} duration={8} delay={2} yRange={13} className="top-16 right-[2%] z-10">
          <DragonflySVG size={120} opacity={0.80} />
        </FloatAnim>
        <FloatAnim baseRotation={18} duration={5} delay={1} yRange={8} className="bottom-16 right-[10%] z-10">
          <InsectFlySVG size={38} opacity={0.74} />
        </FloatAnim>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
          <FadeIn>
            <img src={coverImage} alt="Insect Kin Cover"
              className="w-full max-w-[240px] md:max-w-xs shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-border/30" />
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="text-5xl md:text-7xl font-serif tracking-wide mb-6 uppercase"
                  style={{ color: 'hsl(42 28% 86%)' }}>
                Insect Kin
              </h2>
              <p className="text-xl font-sans text-muted-foreground mb-12 font-light">
                Available now. Don't look away.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://www.amazon.com.au/Insect-Kin-Matthew-Tait/dp/B0G4GZLPTM/ref=tmm_pap_swatch_0"
                   target="_blank" rel="noopener noreferrer"
                   className="inline-block bg-primary text-primary-foreground font-mono text-sm uppercase tracking-[0.2em] px-10 py-5 hover:bg-foreground hover:text-background transition-colors duration-300 border border-transparent hover:border-border">
                  Paperback
                </a>
                <a href="https://www.amazon.com.au/Insect-Kin-Matthew-Tait-ebook/dp/B0G47SQVG2/?_encoding=UTF8&pd_rd_w=myzgf&content-id=amzn1.sym.7153b2d3-487c-46f2-9cd8-b060e652f2e8&pf_rd_p=7153b2d3-487c-46f2-9cd8-b060e652f2e8&pf_rd_r=355-7962748-1400305&pd_rd_wg=vDNLQ&pd_rd_r=f63a9248-af4f-4647-acb6-09becc57e6fd"
                   target="_blank" rel="noopener noreferrer"
                   className="inline-block bg-transparent text-foreground font-mono text-sm uppercase tracking-[0.2em] px-10 py-5 border border-border hover:border-foreground hover:text-foreground transition-colors duration-300">
                  eBook
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-border text-center text-sm font-sans text-muted-foreground font-light bg-background relative">
        {/* One last small dragonfly, barely visible */}
        <FloatAnim baseRotation={-5} duration={10} delay={0} yRange={6} className="top-2 right-8 z-10">
          <InsectFlySVG size={26} opacity={0.55} />
        </FloatAnim>
        <p className="font-mono text-xs uppercase tracking-[0.2em] relative z-10">
          © {new Date().getFullYear()} Matthew Tait. All rights reserved.
        </p>
        <p className="mt-4 opacity-50 relative z-10">The horror is already here.</p>

        <div className="mt-12 flex justify-center relative z-10">
          <img
            src={darkCribLogo}
            alt="Dark Crib Publications"
            className="w-36 md:w-44"
            style={{ mixBlendMode: 'screen', opacity: 0.85 }}
          />
        </div>
      </footer>

    </main>
  );
}
