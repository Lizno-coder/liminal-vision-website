"use client";

import { useEffect, useRef } from "react";

const FALLBACK_DURATION = 6;
const HEADER_OFFSET = 96;
const SCRUB_DISTANCE_PER_SECOND = 360;
const MIN_SCRUB_DISTANCE = 1600;
const ACTIVATION_PADDING = 160;
const END_FRAME_OFFSET = 0.016;
const TOUCH_MULTIPLIER = 1.08;
const KEY_DELTA = 140;
const PAGE_DELTA = 420;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

type ScrollMetrics = {
  lockTop: number;
};

type OverscrollStyles = {
  bodyOverscrollBehavior: string;
  htmlOverscrollBehavior: string;
};

export default function HomeScrollVideo() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const durationRef = useRef(FALLBACK_DURATION);
  const scrubDistanceRef = useRef(MIN_SCRUB_DISTANCE);
  const touchStartYRef = useRef<number | null>(null);
  const activeRef = useRef(false);
  const lockedTopRef = useRef<number | null>(null);
  const overscrollStylesRef = useRef<OverscrollStyles | null>(null);

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
    const getMetrics = (): ScrollMetrics | null => {
      const section = sectionRef.current;

      if (!section) {
        return null;
      }

      const rect = section.getBoundingClientRect();
      const absoluteTop = window.scrollY + rect.top;

      return {
        lockTop: Math.max(absoluteTop - HEADER_OFFSET, 0),
      };
    };

    const setOverscrollLock = (enabled: boolean) => {
      const body = document.body;
      const html = document.documentElement;

      if (enabled) {
        if (!overscrollStylesRef.current) {
          overscrollStylesRef.current = {
            bodyOverscrollBehavior: body.style.overscrollBehavior,
            htmlOverscrollBehavior: html.style.overscrollBehavior,
          };
        }

        body.style.overscrollBehavior = "none";
        html.style.overscrollBehavior = "none";
        return;
      }

      if (!overscrollStylesRef.current) {
        body.style.removeProperty("overscroll-behavior");
        html.style.removeProperty("overscroll-behavior");
        return;
      }

      body.style.overscrollBehavior = overscrollStylesRef.current.bodyOverscrollBehavior;
      html.style.overscrollBehavior = overscrollStylesRef.current.htmlOverscrollBehavior;
      overscrollStylesRef.current = null;
    };

    const activate = (lockTop: number) => {
      activeRef.current = true;
      lockedTopRef.current = lockTop;
      setOverscrollLock(true);
      window.scrollTo({ top: lockTop, behavior: "auto" });
    };

    const deactivate = () => {
      activeRef.current = false;
      lockedTopRef.current = null;
      setOverscrollLock(false);
    };

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
        if (Math.abs(video.currentTime - nextTime) > 0.01) {
          video.currentTime = nextTime;
        }
      });
    };

    const getEntryDelta = (rawDelta: number, currentScroll: number, lockTop: number) => {
      if (rawDelta > 0 && currentScroll < lockTop) {
        return Math.max(rawDelta - (lockTop - currentScroll), 0);
      }

      if (rawDelta < 0 && currentScroll > lockTop) {
        return Math.min(rawDelta + (currentScroll - lockTop), 0);
      }

      return rawDelta;
    };

    const handleScrub = (rawDelta: number) => {
      if (!rawDelta) {
        return false;
      }

      const metrics = getMetrics();

      if (!metrics) {
        return false;
      }

      const { lockTop } = metrics;
      const currentScroll = window.scrollY;
      const movingDown = rawDelta > 0;
      const movingUp = rawDelta < 0;
      const isActive = activeRef.current;
      const canEnterFromAbove =
        movingDown &&
        currentScroll < lockTop &&
        currentScroll + rawDelta >= lockTop - ACTIVATION_PADDING;
      const canEnterFromBelow =
        movingUp &&
        currentScroll > lockTop &&
        currentScroll + rawDelta <= lockTop + ACTIVATION_PADDING;
      const canEnterNearLock =
        Math.abs(currentScroll - lockTop) <= ACTIVATION_PADDING &&
        ((movingDown && progressRef.current < 1) || (movingUp && progressRef.current > 0));

      if (!isActive && !canEnterFromAbove && !canEnterFromBelow && !canEnterNearLock) {
        return false;
      }

      if (!isActive) {
        activate(lockTop);
      } else if (lockedTopRef.current !== lockTop) {
        lockedTopRef.current = lockTop;
        window.scrollTo({ top: lockTop, behavior: "auto" });
      }

      const effectiveDelta = getEntryDelta(rawDelta, currentScroll, lockTop);
      const isPastEnd = movingDown && progressRef.current >= 1;
      const isPastStart = movingUp && progressRef.current <= 0;

      if (isPastEnd || isPastStart) {
        deactivate();
        return false;
      }

      const nextProgress = clamp(
        progressRef.current + effectiveDelta / scrubDistanceRef.current,
        0,
        1
      );

      setVideoProgress(nextProgress);

      return true;
    };

    const handleWheel = (event: WheelEvent) => {
      if (handleScrub(event.deltaY)) {
        event.preventDefault();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      let delta = 0;

      if (event.key === "ArrowDown") {
        delta = KEY_DELTA;
      } else if (event.key === "ArrowUp") {
        delta = -KEY_DELTA;
      } else if (event.key === "PageDown") {
        delta = PAGE_DELTA;
      } else if (event.key === "PageUp") {
        delta = -PAGE_DELTA;
      } else if (event.key === " ") {
        delta = event.shiftKey ? -PAGE_DELTA : PAGE_DELTA;
      }

      if (delta && handleScrub(delta)) {
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

      touchStartYRef.current = nextTouchY;

      if (handleScrub((previousTouchY - nextTouchY) * TOUCH_MULTIPLIER)) {
        event.preventDefault();
      }
    };

    const resetTouch = () => {
      touchStartYRef.current = null;
    };

    const keepLockedPosition = () => {
      if (activeRef.current && lockedTopRef.current !== null && Math.abs(window.scrollY - lockedTopRef.current) > 1) {
        window.scrollTo({ top: lockedTopRef.current, behavior: "auto" });
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", resetTouch);
    window.addEventListener("touchcancel", resetTouch);
    window.addEventListener("scroll", keepLockedPosition, { passive: true });

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      deactivate();
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", resetTouch);
      window.removeEventListener("touchcancel", resetTouch);
      window.removeEventListener("scroll", keepLockedPosition);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black">
      <div className="flex min-h-[calc(100dvh-6rem)] items-center justify-center bg-black px-4 sm:px-6 md:px-10">
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
