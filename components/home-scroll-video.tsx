"use client";

import { useEffect, useRef, useState } from "react";

const FALLBACK_DURATION = 6;
const FALLBACK_SECTION_HEIGHT = "280vh";

export default function HomeScrollVideo() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const frameRef = useRef<number | null>(null);

  const [videoDuration, setVideoDuration] = useState(FALLBACK_DURATION);
  const [sectionHeight, setSectionHeight] = useState(FALLBACK_SECTION_HEIGHT);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const syncDuration = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) {
        return;
      }

      setVideoDuration(video.duration);
      video.pause();
      video.currentTime = 0;
    };

    if (video.readyState >= 1) {
      syncDuration();
    }

    video.addEventListener("loadedmetadata", syncDuration);

    return () => {
      video.removeEventListener("loadedmetadata", syncDuration);
    };
  }, []);

  useEffect(() => {
    const updateSectionHeight = () => {
      const viewportHeight = window.innerHeight;
      const scrollDistance = Math.max(viewportHeight * 1.85, videoDuration * 180);
      setSectionHeight(`${Math.round(scrollDistance + viewportHeight)}px`);
    };

    updateSectionHeight();
    window.addEventListener("resize", updateSectionHeight);

    return () => {
      window.removeEventListener("resize", updateSectionHeight);
    };
  }, [videoDuration]);

  useEffect(() => {
    const updateVideoTime = () => {
      const section = sectionRef.current;
      const video = videoRef.current;

      if (!section || !video) {
        return;
      }

      const viewportHeight = window.innerHeight;
      const totalScrollable = Math.max(section.offsetHeight - viewportHeight, 1);
      const sectionTop = section.getBoundingClientRect().top;
      const progress = Math.min(Math.max(-sectionTop / totalScrollable, 0), 1);
      const duration =
        Number.isFinite(video.duration) && video.duration > 0
          ? video.duration
          : videoDuration;
      const nextTime = progress * duration;

      if (Math.abs(video.currentTime - nextTime) > 0.016) {
        video.currentTime = nextTime;
      }
    };

    const requestUpdate = () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(updateVideoTime);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [videoDuration]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-black px-4 sm:px-6 md:px-10">
        <video
          ref={videoRef}
          className="h-auto max-h-[72vh] w-full max-w-[1040px] object-contain"
          src="/home-page-video.mp4"
          muted
          playsInline
          preload="metadata"
        />
      </div>
    </section>
  );
}
