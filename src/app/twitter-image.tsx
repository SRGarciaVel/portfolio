import { ImageResponse } from "next/og";
import { OgCard, ogImageSize, ogImageContentType } from "@/lib/ogCard";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return new ImageResponse(<OgCard />, { ...size });
}
