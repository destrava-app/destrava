'use client';

import { pushEvent } from './storage';

let wakeLock: any = null;

export async function requestWakeLock() {
  try {
    // @ts-ignore
    if ('wakeLock' in navigator) {
      // @ts-ignore
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLock.addEventListener?.('release', () => {
        pushEvent({ when: Date.now(), type: 'session', payload: { wakeLock: 'released' } });
      });
      pushEvent({ when: Date.now(), type: 'session', payload: { wakeLock: 'acquired' } });
    }
  } catch (e) {
    pushEvent({ when: Date.now(), type: 'session', payload: { wakeLockError: String(e) } });
  }
}

export function releaseWakeLock() {
  try { wakeLock?.release?.(); } catch {}
  wakeLock = null;
}

export async function enterFullscreen(el?: HTMLElement | null) {
  try {
    const target = el || document.documentElement;
    if (target.requestFullscreen) await target.requestFullscreen();
    // @ts-ignore
    else if (target.webkitRequestFullscreen) target.webkitRequestFullscreen();
    pushEvent({ when: Date.now(), type: 'session', payload: { fullscreen: 'on' } });
  } catch (e) {
    pushEvent({ when: Date.now(), type: 'session', payload: { fullscreenError: String(e) } });
  }
}
export async function exitFullscreen() {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    // @ts-ignore
    else if (document.webkitFullscreenElement) document.webkitExitFullscreen?.();
    pushEvent({ when: Date.now(), type: 'session', payload: { fullscreen: 'off' } });
  } catch {}
}

export function setupVisibilityLogging() {
  const handler = () => {
    pushEvent({ when: Date.now(), type: 'visibility', payload: { hidden: document.hidden } });
  };
  document.addEventListener('visibilitychange', handler);
  return () => document.removeEventListener('visibilitychange', handler);
}

export function beep(ms = 120) {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.type = 'sine'; o.frequency.value = 880; o.connect(g); g.connect(ctx.destination);
    o.start();
    setTimeout(()=>{ o.stop(); ctx.close(); }, ms);
  } catch {}
}

export function vibrate(pattern: number | number[] = [60, 30, 60]) {
  try { navigator.vibrate?.(pattern); } catch {}
}
