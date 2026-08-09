import { type ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import heroEstate from '@assets/generated_images/hero-estate.jpg';
import stairwell from '@assets/generated_images/stairwell.jpg';
import asphalt from '@assets/generated_images/asphalt.jpg';
import windowImg from '@assets/generated_images/window.jpg';
import dragonfly from '@assets/generated_images/dragonfly.jpg';
import coverImage from '@assets/insect-kin_2_1786244795412.jpg';
import authorPhoto from '@assets/Paper_23_1786245757626.jpg';

function FadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ParallaxImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

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

export default function Home() {
  return (
    <main className="bg-background text-foreground min-h-screen overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      
      {/* 1. HERO */}
      <section className="relative h-[100dvh] w-full flex items-center justify-center border-b border-border">
        <div className="absolute inset-0 z-0">
          <ParallaxImage src={heroEstate} alt="Ashbrook Court at night" className="w-full h-full opacity-30 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center w-full px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="w-full"
          >
            <h1 className="font-serif tracking-wide text-zinc-100 uppercase leading-none w-full"
                style={{ fontSize: 'clamp(4rem, 14vw, 16rem)' }}>
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
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="mb-12">
              <div className="h-[1px] w-12 bg-primary mb-8" />
              <p className="text-sm font-sans uppercase tracking-widest text-primary font-semibold">
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
            <p className="text-4xl md:text-6xl font-serif italic text-primary tracking-wide">
              Something is waiting.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 3. ASHBROOK COURT (The Setting) */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <ParallaxImage 
              src={stairwell} 
              alt="A claustrophobic concrete stairwell" 
              className="aspect-[4/5] w-full bg-muted border border-border" 
            />
          </FadeIn>
          <div className="flex flex-col justify-center">
            <FadeIn>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">ASHBROOK COURT — UNIT 01</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-medium tracking-wide mb-8 text-white">Ashbrook Court</h3>
              <div className="space-y-6 text-lg font-sans text-muted-foreground font-light leading-relaxed">
                <p>
                  Ageing apartment blocks. Concrete, brick, asphalt. Corridors that smell of damp and cheap cleaning chemicals.
                </p>
                <p>
                  This isn't a gothic castle. There are no ancient curses here. Just neglected gardens, rusted fences, and weeds forcing their way through cracked concrete under the oppressive Australian heat.
                </p>
                <p>
                  The ordinariness is the trap. The familiar suburban textures are the walls of the cage.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 4. THE UNCANNY ORDINARY */}
      <section className="py-32 px-6 bg-card border-y border-border relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 flex flex-col justify-center">
            <FadeIn>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">NOTICE — LEVEL 3</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-medium tracking-wide mb-8 text-white">3:00 AM</h3>
              <div className="space-y-6 text-lg font-sans text-muted-foreground font-light leading-relaxed">
                <p>
                  Feels like walking through a housing estate at 3am when you can't sleep. Everything is exactly where it should be. The bins are out. The lights are on in some windows. The concrete is wet.
                </p>
                <p>
                  And something you cannot name has changed.
                </p>
                <p className="text-foreground font-medium">
                  The mundane is the threat. Stillness with the slow accumulation of wrongness beneath it.
                </p>
              </div>
            </FadeIn>
          </div>
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
            <FadeIn delay={0.2}>
              <ParallaxImage 
                src={asphalt} 
                alt="Cracked asphalt and dead grass" 
                className="aspect-square w-full bg-muted border border-border mt-12" 
              />
            </FadeIn>
            <FadeIn delay={0.4}>
              <ParallaxImage 
                src={windowImg} 
                alt="A single glowing window at night" 
                className="aspect-square w-full bg-muted border border-border" 
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 5. THE THREAT (Dragonflies) */}
      <section className="py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <FadeIn>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">INCIDENT REPORT — SECTOR 7</h2>
            <h3 className="text-4xl md:text-6xl font-serif font-medium tracking-wide mb-16 text-white">Something is hatching</h3>
          </FadeIn>
          
          <div className="w-full max-w-4xl mb-16">
            <FadeIn delay={0.2}>
              <ParallaxImage 
                src={dragonfly} 
                alt="A dragonfly on a rusted railing" 
                className="aspect-[21/9] w-full bg-muted border border-border" 
              />
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
      <section className="py-24 md:py-36 px-6 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <div className="relative">
              <img
                src={authorPhoto}
                alt="Matthew Tait"
                className="w-full max-w-sm grayscale contrast-110 border border-border/40 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
              />
              <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase mt-4">
                Matthew Tait — Adelaide, South Australia
              </p>
            </div>
          </FadeIn>
          <div className="flex flex-col justify-start lg:pt-4">
            <FadeIn>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">About the Author</h2>
              <h3 className="text-3xl md:text-4xl font-serif font-medium tracking-wide mb-8 text-zinc-100">Matthew Tait</h3>
              <div className="space-y-5 font-sans text-base md:text-lg text-muted-foreground font-light leading-relaxed">
                <p>
                  Matthew Tait is an award-winning Australian horror author whose work blends psychological intensity with uncanny, brutal atmosphere. He published his first collection of dark fiction in 2011 and has since built a catalogue of titles praised for their originality and emotional depth.
                </p>
                <p>
                  His novel <em className="text-foreground font-normal">Deception Pass</em> won the Australasian Shadows Award for Best Novel, an honour for which he has been nominated three times. His short story <em className="text-foreground font-normal">Car Crash Weather</em> received a commendation from the Australian Horror Writers Association in 2006.
                </p>
                <p>
                  A former horror columnist and lifelong devotee of the genre, Tait writes every draft longhand — in pen and paper — before any manuscript touches a keyboard. A working method that has shaped the deliberate, sentence-level attention his prose is known for.
                </p>
                <p>
                  He lives and writes in Adelaide, South Australia, and is currently undertaking a full ground-up rewrite of his 2014 novel <em className="text-foreground font-normal">Davey Ribbon</em>.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION */}
      <section className="py-48 px-6 bg-card border-t border-border relative flex flex-col items-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
          <FadeIn>
            <img 
              src={coverImage} 
              alt="Insect Kin Cover" 
              className="w-full max-w-[240px] md:max-w-xs shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-border/30"
            />
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="text-5xl md:text-7xl font-serif tracking-wide text-white mb-6 uppercase">
                Insect Kin
              </h2>
              <p className="text-xl font-sans text-muted-foreground mb-12 font-light">
                Available now. Don't look away.
              </p>
              <a 
                href="#" 
                className="inline-block bg-primary text-primary-foreground font-mono text-sm uppercase tracking-[0.2em] px-12 py-5 hover:bg-white hover:text-black transition-colors duration-300 border border-transparent hover:border-white"
              >
                Get the Book
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-border text-center text-sm font-sans text-muted-foreground font-light">
        <p className="font-mono text-xs uppercase tracking-[0.2em]">© {new Date().getFullYear()} Matthew Tait. All rights reserved.</p>
        <p className="mt-4 opacity-50">The horror is already here.</p>
      </footer>

    </main>
  );
}
