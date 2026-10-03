"use client";

import { useRef, type ReactNode } from "react";
import { useLayeredPins } from "@/hooks/useLayeredPins";

export default function LayeredStack({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayeredPins(ref);
  return <div ref={ref}>{children}</div>;
}
