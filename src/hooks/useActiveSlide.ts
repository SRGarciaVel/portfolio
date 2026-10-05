"use client";

import { useSyncExternalStore } from "react";

let activeSlide = 0;
const listeners = new Set<() => void>();

export function setActiveSlide(index: number) {
  if (index === activeSlide) return;
  activeSlide = index;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useActiveSlide(): number {
  return useSyncExternalStore(subscribe, () => activeSlide, () => 0);
}
