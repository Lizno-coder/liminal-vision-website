"use client";

import { useAnimationFrame } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const FALLBACK_DURATION = 6;
const HEADER_OFFSET = 96;
const MOBILE_PIXELS_PER_SECOND = 220;
const DESKTOP_PIXELS_PER_SECOND = 280;
const MIN_SCROLL_VIEWPORTS = 1.2;
const END_FRAME_OFFSET = 0.016;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function HomeScrollVideo() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const durationRef = useRef(FALLBACK_DURATION);
  const currentTimeRef = useRef(0);
  const [sectionHeight, setSectionHeight] = useState("260dvh");

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const updateLayout = () => {
      const viewportHeight = window.innerHeight;
      const stageHeight = Math.max(viewportHeight - HEADER_OFFSET, viewportHeight * 0.72);
      const pixelsPerSecond =
        window.innerWidth < 768 ? MOBILE_PIXELS_PER_SECOND : DESKTOP_PIXELS_PER_SECOND;
      const scrollDistance = Math.max(
        viewportHeight * MIN_SCROLL_VIEWPORTS,
        durationRef.current * pixelsPerSecond
      );

      setSectionHeight(`${Math.round(stageHeight + scrollDistance)}px`);
    };

    const syncDuration = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) {
        return;
      }

      durationRef.current = video.duration;
      video.pause();
      video.currentTime = 0;
      currentTimeRef.current = 0;
      updateLayout();
    };

    updateLayout();

    if (video.readyState >= 1) {
      syncDuration();
    }

    video.addEventListener("loadedmetadata", syncDuration);
    window.addEventListener("resize", updateLayout);

    return () => {
      video.removeEventListener("loadedmetadata", syncDuration);
      window.removeEventListener("resize", updateLayout);
    };
  }, []);

  useAnimationFrame((_, delta) => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) {
      return;
    }

    const stageHeight = Math.max(window.innerHeight - HEADER_OFFSET, 1);
    const totalScrollable = Math.max(section.offsetHeight - stageHeight, 1);
    const distanceIntoSection = HEADER_OFFSET - section.getBoundingClientRect().top;
    const progress = clamp(distanceIntoSection / totalScrollable, 0, 1);
    const duration =
      Number.isFinite(video.duration) && video.duration > 0
        ? video.duration
        : durationRef.current;
    const targetTime =
      progress >= 1 ? Math.max(duration - END_FRAME_OFFSET, 0) : progress * duration;
    const easing = 1 - Math.exp(-delta / 42);
    const nextTime =
      Math.abs(targetTime - currentTimeRef.current) < 0.004
        ? targetTime
        : currentTimeRef.current + (targetTime - currentTimeRef.current) * easing;

    currentTimeRef.current = nextTime;

    if (Math.abs(video.currentTime - nextTime) > 0.004) {
      video.currentTime = nextTime;
    }
  });

  return (
    <section ref={sectionRef} className="relative bg-black" style={{ height: sectionHeight }}>
      <div
        className="sticky flex min-h-[calc(100dvh-6rem)] items-center justify-center bg-black px-4 sm:px-6 md:px-10"
        style={{ top: HEADER_OFFSET }}
      >
        <video
          ref={videoRef}
          className="h-auto max-h-[68dvh] w-full max-w-[980px] bg-black object-contain [transform:translateZ(0)]"
          src="/home-page-video.mp4"
          muted
          playsInline
          preload="auto"
        />
      </div>
    </section>
  );
}
