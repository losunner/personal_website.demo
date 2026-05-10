import { motion, useTransform } from "framer-motion";
import clsx from "clsx";

const Word = ({ word, start, end, scrollYProgress, isChinese, isLast }) => {
  // Map global scroll progress to opacity for this specific word
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}{!isChinese && !isLast ? "\u00A0" : ""}
    </motion.span>
  );
};

export const ScrollRevealText = ({ text, className, scrollYProgress, index = 0, total = 1 }) => {
  const isChinese = /[\u4e00-\u9fa5]/.test(text);
  // For Chinese, reveal character by character. For others, word by word.
  const units = isChinese ? text.split("") : text.split(" ");
  
  // Calculate the segment of the global scroll progress this paragraph occupies
  const segmentStart = index / total;
  const segmentEnd = (index + 1) / total;

  return (
    <p className={clsx("text-justify", className)}>
      {units.map((unit, i) => {
        // Calculate the specific start and end for this word within the paragraph's segment
        const unitStart = segmentStart + (i / units.length) * (segmentEnd - segmentStart);
        const unitEnd = segmentStart + ((i + 1) / units.length) * (segmentEnd - segmentStart);
        
        return (
          <Word
            key={`${unit}-${i}`}
            word={unit}
            start={unitStart}
            end={unitEnd}
            scrollYProgress={scrollYProgress}
            isChinese={isChinese}
            isLast={i === units.length - 1}
          />
        );
      })}
    </p>
  );
};

