import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const NotFound = () => {
  const containerRef = useRef(null);
  const numberRef = useRef(null);
  const houseRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".error-label", {
        opacity: 0,
        y: 15,
        duration: 0.6,
        ease: "power2.out",
      })
        .from(
          numberRef.current,
          {
            opacity: 0,
            scale: 0.92,
            duration: 1.1,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(
          houseRef.current,
          {
            opacity: 0,
            scale: 0.85,
            y: 30,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.7"
        )
        .from(
          contentRef.current.children,
          {
            opacity: 0,
            y: 25,
            stagger: 0.1,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.5"
        );

      // Very subtle architectural floating
      gsap.to(houseRef.current, {
        y: -7,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Subtle mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      gsap.to(numberRef.current, {
        x: x * 8,
        y: y * 5,
        duration: 1.2,
        ease: "power2.out",
      });

      gsap.to(houseRef.current, {
        x: x * 14,
        y: y * 8,
        duration: 1.2,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#0c0f0d] text-[#f1f3ee]"
    >
      {/* GRID */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,0.35) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.35) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "92px 92px",
        }}
      />

      {/* HEADER */}
      <header className="absolute left-0 top-0 z-30 flex w-full items-center justify-between px-8 py-8 md:px-12">
        <Link
          to="/"
          className="text-[15px] font-semibold tracking-[0.22em]"
        >
          Use<span className="text-[#18d6a0]">Estate</span>
        </Link>

        <span className="text-[11px] tracking-[0.28em] text-white/35">
          ERROR / 404
        </span>
      </header>

      {/* CENTER */}
      <main className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-16">
        <div className="relative">

          {/* HUGE 404 */}
          <div
            ref={numberRef}
            className="
              select-none
              text-[clamp(13rem,31vw,31rem)]
              font-bold
              leading-[0.72]
              tracking-[-0.085em]
              text-[#29302c]
            "
          >
            404
          </div>

          {/* HOUSE */}
          <div
            ref={houseRef}
            className="
              absolute
              left-1/2
              top-1/2
              w-[210px]
              -translate-x-1/2
              -translate-y-1/2
              md:w-[290px]
            "
          >
            <svg
              viewBox="0 0 400 280"
              className="w-full"
              fill="none"
            >
              {/* roof */}
              <path
                d="M70 130L200 35L330 130"
                stroke="#dce2d4"
                strokeWidth="3"
              />

              <path
                d="M88 128L200 48L312 128"
                stroke="#7e8879"
                strokeWidth="2"
              />

              {/* house */}
              <path
                d="M95 126V235H305V126"
                stroke="#9ba590"
                strokeWidth="2"
              />

              {/* left window */}
              <rect
                x="125"
                y="145"
                width="45"
                height="45"
                stroke="#a8b19c"
                strokeWidth="2"
              />

              <path
                d="M147.5 145V190M125 167.5H170"
                stroke="#7d8878"
                strokeWidth="1.5"
              />

              {/* right window */}
              <rect
                x="230"
                y="145"
                width="45"
                height="45"
                stroke="#a8b19c"
                strokeWidth="2"
              />

              <path
                d="M252.5 145V190M230 167.5H275"
                stroke="#7d8878"
                strokeWidth="1.5"
              />

              {/* door */}
              <rect
                x="182"
                y="165"
                width="36"
                height="70"
                stroke="#a8b19c"
                strokeWidth="2"
              />

              {/* ground */}
              <path
                d="M60 235H340"
                stroke="#a8b19c"
                strokeWidth="2"
              />

              {/* tiny door handle */}
              <circle
                cx="211"
                cy="200"
                r="2"
                fill="#a8b19c"
              />
            </svg>
          </div>
        </div>

        {/* CONTENT */}
        <div
          ref={contentRef}
          className="relative z-10 mt-14 flex flex-col items-center text-center"
        >
          <div className="error-label mb-6 text-[11px] font-medium uppercase tracking-[0.45em] text-[#20d8a1]">
            Property Not Found
          </div>

          <h1 className="max-w-[720px] text-[clamp(2.5rem,5vw,4.8rem)] font-medium leading-[0.98] tracking-[-0.045em]">
            Looks like this property
            <br />
            doesn't exist.
          </h1>

          <p className="mt-7 max-w-[540px] text-[15px] leading-7 text-white/40">
            The page you're looking for may have been moved,
            removed, or never existed in the first place.
          </p>

          <Link
            to="/"
            className="
              group
              mt-9
              flex
              items-center
              gap-4
              rounded-full
              border
              border-white/20
              px-6
              py-3
              text-[13px]
              uppercase
              tracking-[0.18em]
              transition-all
              duration-300
              hover:border-[#20d8a1]
              hover:bg-[#20d8a1]
              hover:text-[#08100c]
            "
          >
            <span>Back to home</span>

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </main>

      {/* FOOTER */}
      <div className="absolute bottom-7 left-8 right-8 flex justify-between text-[9px] uppercase tracking-[0.35em] text-white/20 md:left-12 md:right-12">
        <span>MERNESTATE</span>
        <span>NOT FOUND</span>
      </div>
    </div>
  );
};

export default NotFound;