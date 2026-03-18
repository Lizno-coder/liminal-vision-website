"use client";

import { useEffect, useRef } from "react";

const FALLBACK_DURATION = 6;
const HEADER_OFFSET = 96;
const SCRUB_DISTANCE_PER_SECOND = 360;
const MIN_SCRUB_DISTANCE = 1600;
const ACTIVATION_PADDING = 180;
const END_FRAME_OFFSET = 0.016;
const TOUCH_MULTIPLIER = 1.1;
const KEY_DELTA = 140;
const PAGE_DELTA = 420;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

type ScrollMetrics = {
  lockTop: number;
  releaseTop: number;
};

type PageLockStyles = {
  bodyOverflow: string;
  bodyPosition: string;
  bodyTop: string;
  bodyLeft: string;
  bodyRight: string;
  bodyWidth: string;
  bodyPaddingRight: string;
  bodyTouchAction: string;
  htmlOverflow: string;
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
  const pageLockTopRef = useRef<number | null>(null);
  const pageLockStylesRef = useRef<PageLockStyles | null>(null);

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
      const lockTop = Math.max(absoluteTop - HEADER_OFFSET, 0);
      const releaseTop = Math.max(lockTop + section.offsetHeight - HEADER_OFFSET, lockTop);

      return { lockTop, releaseTop };
    };

    const lockPage = (targetTop: number) => {
      if (pageLockTopRef.current === targetTop) {
        return;
      }

      const body = document.body;
      const html = document.documentElement;

      pageLockStylesRef.current = {
        bodyOverflow: body.style.overflow,
        bodyPosition: body.style.position,
        bodyTop: body.style.top,
        bodyLeft: body.style.left,
        bodyRight: body.style.right,
        bodyWidth: body.style.width,
        bodyPaddingRight: body.style.paddingRight,
        bodyTouchAction: body.style.touchAction,
        htmlOverflow: html.style.overflow,
        htmlOverscrollBehavior: html.style.overscrollBehavior,
      };

      const scrollbarWidth = Math.max(window.innerWidth - html.clientWidth, 0);

      window.scrollTo({ top: targetTop, behavior: "auto" });

      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.top = `${-targetTop}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.touchAction = "none";

      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }

      html.style.overflow = "hidden";
      html.style.overscrollBehavior = "none";

      pageLockTopRef.current = targetTop;
    };

    const unlockPage = (targetTop: number) => {
      const styles = pageLockStylesRef.current;
      const body = document.body;
      const html = document.documentElement;

      if (styles) {
        body.style.overflow = styles.bodyOverflow;
        body.style.position = styles.bodyPosition;
        body.style.top = styles.bodyTop;
        body.style.left = styles.bodyLeft;
        body.style.right = styles.bodyRight;
        body.style.width = styles.bodyWidth;
        body.style.paddingRight = styles.bodyPaddingRight;
        body.style.touchAction = styles.bodyTouchAction;
        html.style.overflow = styles.htmlOverflow;
        html.style.overscrollBehavior = styles.htmlOverscrollBehavior;
      } else {
        body.style.removeProperty("overflow");
        body.style.removeProperty("position");
        body.style.removeProperty("top");
        body.style.removeProperty("left");
        body.style.removeProperty("right");
        body.style.removeProperty("width");
        body.style.removeProperty("padding-right");
        body.style.removeProperty("touch-action");
        html.style.removeProperty("overflow");
        html.style.removeProperty("overscroll-behavior");
      }

      pageLockStylesRef.current = null;
      pageLockTopRef.current = null;
      window.scrollTo({ top: targetTop, behavior: "auto" });
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

    const handleScrub = (rawDelta: number) => {
      if (!rawDelta) {
        return false;
      }

      const metrics = getMetrics();

      if (!metrics) {
        return false;
      }

      const { lockTop, releaseTop } = metrics;
      const currentScroll = window.scrollY;
      const direction = Math.sign(rawDelta);
      const movingDown = direction > 0;
      const movingUp = direction < 0;
      const pageIsLocked = pageLockTopRef.current !== null;
      const approachingFromAbove =
        movingDown &&
        progressRef.current < 1 &&
        currentScroll < lockTop &&
        currentScroll + rawDelta >= lockTop - ACTIVATION_PADDING;
      const approachingFromBelow =
        movingUp &&
        progressRef.current > 0 &&
        currentScroll > releaseTop &&
        currentScroll + rawDelta <= releaseTop + ACTIVATION_PADDING;
      const sectionRect = sectionRef.current?.getBoundingClientRect();
      const sectionVisible =
        !!sectionRect &&
        sectionRect.top <= HEADER_OFFSET + ACTIVATION_PADDING &&
        sectionRect.bottom >= window.innerHeight * 0.45;
      const shouldLock =
        pageIsLocked || sectionVisible || approachingFromAbove || approachingFromBelow;

      if (!shouldLock) {
        return false;
      }

      if (!pageIsLocked) {
        lockPage(lockTop);
      }

      const nextProgress = clamp(
        progressRef.current + rawDelta / scrubDistanceRef.current,
        0,
        1
      );
      const videoReachedEnd = movingDown && progressRef.current >= 1;
      const videoReachedStart = movingUp && progressRef.current <= 0;

      if (videoReachedEnd) {
        unlockPage(releaseTop + 2);
        return false;
      }

      if (videoReachedStart) {
        unlockPage(Math.max(lockTop - 2, 0));
        return false;
      }

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

    const handleTouchEnd = () => {
      touchStartYRef.current = null;
    };

    const keepLockedPosition = () => {
      if (pageLockTopRef.current !== null && Math.abs(window.scrollY - pageLockTopRef.current) > 1) {
        window.scrollTo({ top: pageLockTopRef.current, behavior: "auto" });
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchcancel", handleTouchEnd);
    window.addEventListener("scroll", keepLockedPosition, { passive: true });

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
      window.removeEventListener("scroll", keepLockedPosition);

      if (pageLockTopRef.current !== null) {
        unlockPage(pageLockTopRef.current);
      }
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
