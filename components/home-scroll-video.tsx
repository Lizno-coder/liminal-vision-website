"use client";

import { useEffect, useRef, useState } from "react";

const FALLBACK_DURATION = 6;

export default function HomeScrollVideo() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const frameRef = useRef<number | null>(null);

  const [videoDuration, setVideoDuration] = useState(FALLBACK_DURATION);
  const [sectionHeight, setSectionHeight] = useState("400vh");

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
      const scrollDistance = Math.max(viewportHeight * 3.2, videoDuration * 420);
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
      <div className="sticky top-0 h-screen overflow-hidden">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src="/home-page-video.mp4"
          muted
          playsInline
          preload="auto"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/35" />
      </div>
    </section>
  );
}
