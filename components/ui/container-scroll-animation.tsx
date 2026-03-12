"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

interface ContainerScrollProps {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}

export const ContainerScroll = ({
  titleComponent,
  children,
}: ContainerScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 0.5], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <div
      className="relative flex h-[50rem] items-center justify-center md:h-[70rem]"
      ref={containerRef}
    >
      <div
        className="relative w-full py-10 md:py-40"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          style={{ translateY: translate, opacity }}
          className="mx-auto max-w-5xl text-center"
        >
          {titleComponent}
        </motion.div>
        
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

interface CardProps {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}

export const Card = ({ rotate, scale, children }: CardProps) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
      }}
      className="relative -mt-8 mx-auto h-[25rem] w-full max-w-5xl overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-1 shadow-2xl md:h-[35rem] md:rounded-[30px] md:p-2"
    >
      {/* Glow effect */}
      <div className="absolute -inset-px rounded-[24px] bg-gradient-to-r from-[#2997ff]/20 via-transparent to-[#5856d6]/20 opacity-50 blur-xl md:rounded-[30px]" />
      
      {/* Inner content */}
      <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-[#0a0a0a] md:rounded-[26px]">
        {children}
      </div>
      
      {/* Corner highlights */}
      <div className="pointer-events-none absolute top-0 left-0 h-20 w-20 rounded-tl-[24px] bg-gradient-to-br from-white/10 to-transparent md:rounded-tl-[30px]" />
      <div className="pointer-events-none absolute top-0 right-0 h-20 w-20 rounded-tr-[24px] bg-gradient-to-bl from-white/10 to-transparent md:rounded-tr-[30px]" />
    </motion.div>
  );
};
