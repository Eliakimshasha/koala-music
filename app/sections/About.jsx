import React from "react";

export default function About() {
  return (
    <section
      id="about"
      className="section-stack section-alt relative py-0 lg:py-16 px-6"
    >
      <div className="tracking-[0.02em] maini flex flex-col items-center justify-center min-h-screen gap-9 px-8">
        <div className="relative overflow-hidden min-w-[280px] md:min-w-[500px] lg:flex-1 flex flex-col gap-8 justify-center items-center">
          <h1 className="font-bold msg-one uppercase text-6xl md:text-8xl text-center text-accent-faint tracking-tighter">
            More <br /> Than
          </h1>
          <div className="absolute top-1/2 z-20 -translate-y-1/2 left-1/2 min-w-fit -rotate-6 border-2 bg-accent border-strong px-4 py-2 -translate-x-1/2">
            <h1 className="font-bold uppercase text-4xl lg:text-8xl text-accent-contrast tracking-tighter">
              Music
            </h1>
          </div>
          <h1 className="font-bold msg-two lg:mt-16 mt-5 uppercase text-center text-6xl md:text-8xl text-msg-two tracking-tighter">
            Pure <br /> Feelings
          </h1>
        </div>
        <div className="text-center text-muted lg:max-w-2xl text-xs">
          Every release is built for late-night drives, slow dances, and the
          kind of honesty that sticks with you. Koala turns emotion into
          sound - pure, warm, unforgettable.
        </div>
      </div>
    </section>
  );
}
