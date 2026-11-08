"use client";

import { useEffect, useRef } from "react";
import { useAnimate, useReducedMotion } from "motion/react";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [scope, animate] = useAnimate();
  const reduce = useReducedMotion();
  const hasAnimated = useRef(false);
  useEffect(() => {
    if (reduce || !scope.current || hasAnimated.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        void animate(
          scope.current,
          { opacity: [0.35, 1], y: [22, 0] },
          { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
        );
        observer.disconnect();
      },
      { threshold: 0.08 },
    );
    observer.observe(scope.current);
    return () => observer.disconnect();
  }, [animate, delay, reduce, scope]);
  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
