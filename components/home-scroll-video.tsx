"use client";

import { useEffect, useRef } from "react";

const FALLBACK_DURATION = 6;
const HEADER_OFFSET = 96;
const MIN_SCRUB_DISTANCE = 1800;
const SCRUB_DISTANCE_PER_SECOND = 420;
const END_FRAME_OFFSET = 0.016;
const TOUCH_MULTIPLIER = 1.15;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function HomeScrollVideo() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const durationRef = useRef(FALLBACK_DURATION);
  const scrubDistanceRef = useRef(MIN_SCRUB_DISTANCE);
  const touchStartYRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const syncDuration = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) {
        return;
      }

      durationRef.current = video.duration;
      scrubDistanceRef.current = Math.max(
        MIN_SCRUB_DISTANCE,
        video.duration * SCRUB_DISTANCE_PER_SECOND
      );
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
    const setVideoProgress = (nextProgress: number) => {
      const video = videoRef.current;

      if (!video) {
        return;
      }

      const clampedProgress = clamp(nextProgress, 0, 1);
      const duration =
        Number.isFinite(video.duration) && video.duration > 0
          ? video.duration
          : durationRef.current;
      const nextTime =
        clampedProgress >= 1
          ? Math.max(duration - END_FRAME_OFFSET, 0)
          : clampedProgress * duration;

      progressRef.current = clampedProgress;

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        video.currentTime = nextTime;
      });
    };

    const getStageState = () => {
      const section = sectionRef.current;

      if (!section) {
        return null;
      }

      const rect = section.getBoundingClientRect();
      const lockTop = Math.max(window.scrollY + rect.top - HEADER_OFFSET, 0);
      const stageTop = rect.top;
      const stageBottom = rect.bottom;

      return { lockTop, stageTop, stageBottom };
    };

    const applyScrubDelta = (rawDelta: number) => {
      if (!rawDelta) {
        return false;
      }

      const stageState = getStageState();

      if (!stageState) {
        return false;
      }

      const { lockTop, stageTop, stageBottom } = stageState;
      const hasReachedStage = stageTop <= HEADER_OFFSET + 2;
      const stageStillVisible = stageBottom >= window.innerHeight * 0.45;
      const direction = Math.sign(rawDelta);
      const canScrubForward = direction > 0 && progressRef.current < 1;
      const canScrubBackward = direction < 0 && progressRef.current > 0;

      if (!hasReachedStage || !stageStillVisible) {
        return false;
      }

      if (!canScrubForward && !canScrubBackward) {
        return false;
      }

      if (Math.abs(window.scrollY - lockTop) > 1) {
        window.scrollTo({ top: lockTop, behavior: "auto" });
      }

      setVideoProgress(progressRef.current + rawDelta / scrubDistanceRef.current);

      return true;
    };

    const handleWheel = (event: WheelEvent) => {
      if (applyScrubDelta(event.deltaY)) {
        event.preventDefault();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      let delta = 0;

      if (event.key === "ArrowDown") {
        delta = 120;
      } else if (event.key === "ArrowUp") {
        delta = -120;
      } else if (event.key === "PageDown") {
        delta = 360;
      } else if (event.key === "PageUp") {
        delta = -360;
      } else if (event.key === " ") {
        delta = event.shiftKey ? -260 : 260;
      }

      if (delta && applyScrubDelta(delta)) {
        event.preventDefault();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const nextTouchY = event.touches[0]?.clientY;
      const previousTouchY = touchStartYRef.current;

      if (typeof nextTouchY !== "number" || typeof previousTouchY !== "number") {
        return;
      }

      const delta = (previousTouchY - nextTouchY) * TOUCH_MULTIPLIER;

      touchStartYRef.current = nextTouchY;

      if (applyScrubDelta(delta)) {
        event.preventDefault();
      }
    };

    const resetTouch = () => {
      touchStartYRef.current = null;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", resetTouch);
    window.addEventListener("touchcancel", resetTouch);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", resetTouch);
      window.removeEventListener("touchcancel", resetTouch);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#0a0a0a]">
      <div className="flex min-h-[calc(100dvh-6rem)] items-center justify-center bg-[#0a0a0a] px-4 sm:px-6 md:px-10">
        <video
          ref={videoRef}
          className="h-auto max-h-[68dvh] w-full max-w-[980px] object-contain"
          src="/home-page-video.mp4"
          muted
          playsInline
          preload="metadata"
        />
      </div>
    </section>
  );
}
