"use client";

import { useEffect, useRef, useState } from "react";

const FALLBACK_DURATION = 6;
const DESKTOP_BREAKPOINT = 768;
const SCROLL_PIXELS_PER_SECOND = 960;
const MIN_SCROLL_DISTANCE = 4200;
const END_FRAME_OFFSET = 0.016;

export default function HomeScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoDuration, setVideoDuration] = useState(FALLBACK_DURATION);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const scrollTriggerRef = useRef<{ kill: () => void } | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
    const handleChange = () => {
      setIsDesktop(mediaQuery.matches);
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      if (video.duration && video.duration > 0) {
        setVideoDuration(video.duration);
        video.pause();
        video.currentTime = 0;
        setIsLoaded(true);
      }
    };

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop || !isLoaded) return;

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let isCancelled = false;

    const setupScrollTrigger = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (isCancelled) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }

      const tween = gsap.to(video, {
        currentTime: videoDuration - END_FRAME_OFFSET,
        ease: "none",
        lazy: false,
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () =>
            `+=${Math.max(videoDuration * SCROLL_PIXELS_PER_SECOND, MIN_SCROLL_DISTANCE)}`,
          scrub: 0.45,
          pin: true,
          anticipatePin: 1.4,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },
      });

      scrollTriggerRef.current = tween.scrollTrigger as { kill: () => void };
    };

    void setupScrollTrigger();

    return () => {
      isCancelled = true;
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, [isDesktop, isLoaded, videoDuration]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, []);

  if (!isDesktop) {
    return null;
  }

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-black"
      style={{ height: "100vh" }}
    >
      <div className="flex h-full w-full items-center justify-center bg-black px-4 sm:px-6 md:px-10">
        <video
          ref={videoRef}
          className="h-auto max-h-[75vh] w-full max-w-[1000px] bg-black object-contain"
          src="/home-page-video.mp4"
          muted
          playsInline
          preload="auto"
          style={{ willChange: "transform" }}
        />
      </div>
    </div>
  );
}
