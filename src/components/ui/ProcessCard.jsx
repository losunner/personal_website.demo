import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const ProcessCard = ({ data, index, total }) => {
  const cardRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  });

  // Calculate dynamic target scale and brightness based on position in stack to form a pyramid
  const targetScale = 1 - (total - index - 1) * 0.04; 
  const targetBrightness = 1 - (total - index - 1) * 0.15;

  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const filter = useTransform(
    scrollYProgress, 
    [0, 1], 
    ["brightness(1)", `brightness(${targetBrightness})`]
  );

  // Dynamic taupe background color logic
  const bgLightness = Math.max(80 - index * 5, 40); // Getting darker per card
  const bgColor = `hsl(33, 20%, ${bgLightness}%)`;

  return (
    <motion.div
      ref={cardRef}
      style={{
        scale,
        filter,
        backgroundColor: bgColor,
        top: `calc(100px + ${index * 20}px)`,
      }}
      className="sticky w-full origin-top rounded-[2rem] border border-black/5 p-8 md:p-16 mb-24 shadow-2xl flex flex-col md:flex-row gap-12 md:gap-24 min-h-[500px]"
    >
      {/* Left Column (Text) */}
      <div className="flex-1 lg:flex-[1.2] flex flex-col justify-center">
        <p className="text-xs uppercase tracking-[0.2em] font-medium mb-6 opacity-60">
          / {data.eyebrow}
        </p>
        <h3 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tighter mb-8 text-ink">
          {data.title}
        </h3>
        <p className="text-lg md:text-xl text-ink/80 leading-relaxed font-light">
          {data.description}
        </p>
      </div>

      {/* Right Column (Image) */}
      <div className="flex-1 w-full h-[300px] md:h-auto rounded-3xl overflow-hidden shadow-lg bg-black/5">
        {data.images?.[0] ? (
          <img src={data.images[0]} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-ink/20 text-sm">Image</div>
        )}
      </div>
    </motion.div>
  );
};
