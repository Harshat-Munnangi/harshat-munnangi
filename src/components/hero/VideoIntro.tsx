"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import gsap from "gsap";
import styles from "./VideoIntro.module.css";
import { MutedIcon, PauseIcon, PlayIcon, UnmutedIcon } from "./icons";

type VideoIntroProps = {
  imageSrc: StaticImageData;
  imageAlt: string;
  /** Drop in a video URL later — controls and the sound hint activate automatically. */
  videoSrc?: string;
};

export default function VideoIntro({ imageSrc, imageAlt, videoSrc }: VideoIntroProps) {
  const hasVideo = Boolean(videoSrc);

  const rootRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(hasVideo);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rootRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.8, ease: "power2.out" }
      );

      gsap.fromTo(
        foregroundRef.current,
        { scale: 1 },
        {
          scale: 1.035,
          duration: 18,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!hasVideo) return;
    const timer = setTimeout(() => setShowSoundHint(false), 4500);
    return () => clearTimeout(timer);
  }, [hasVideo]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      bgVideoRef.current?.play();
      setIsPlaying(true);
    } else {
      video.pause();
      bgVideoRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
    setShowSoundHint(false);
  };

  return (
    <div ref={rootRef} className={styles.root}>
      <div className={styles.backgroundLayer} aria-hidden="true">
        {hasVideo ? (
          <video
            ref={bgVideoRef}
            className={styles.media}
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <Image
            src={imageSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.media}
          />
        )}
      </div>

      <div ref={foregroundRef} className={styles.foregroundLayer}>
        {hasVideo ? (
          <video
            ref={videoRef}
            className={styles.media}
            src={videoSrc}
            autoPlay
            loop
            muted={isMuted}
            playsInline
          />
        ) : (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className={styles.media}
          />
        )}
      </div>

      <div className={styles.vignette} aria-hidden="true" />
      <div className={styles.bottomGradient} aria-hidden="true" />

      {hasVideo && (
        <>
          <div
            className={`${styles.soundHint} ${
              showSoundHint ? styles.soundHintVisible : ""
            }`}
            aria-hidden={!showSoundHint}
          >
            <span className={styles.soundHintPulse} />
            Tap for sound
          </div>

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.controlButton}
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button
              type="button"
              className={styles.controlButton}
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? <MutedIcon /> : <UnmutedIcon />}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
