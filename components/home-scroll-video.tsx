"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FALLBACK_DURATION = 6;
const END_FRAME_OFFSET = 0.016;

export default function HomeScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoDuration, setVideoDuration] = useState(FALLBACK_DURATION);
  const [isLoaded, setIsLoaded] = useState(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Kill any existing ScrollTrigger for this component
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
    }

    // Create the scroll-driven video animation with PINNING
    const tween = gsap.to(video, {
      currentTime: videoDuration - END_FRAME_OFFSET,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${videoDuration * 250}`, // 250px scroll per second of video
        scrub: 0.8, // Smooth scrubbing
        pin: true, // PIN the section during scroll
        anticipatePin: 1,
        onUpdate: (self) => {
          // Optional debug
        },
      },
    });

    scrollTriggerRef.current = tween.scrollTrigger as ScrollTrigger;

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, [isLoaded, videoDuration]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      // Clean up any remaining ScrollTriggers from this component
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === containerRef.current) {
          st.kill();
        }
      });
    };
  }, []);

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
