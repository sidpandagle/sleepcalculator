import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sleep Schedule — Sleep Calculators",
    short_name: "Sleep Schedule",
    description: "Free sleep calculators based on 90-minute sleep cycles.",
    start_url: "/",
    display: "standalone",
    background_color: "#080B16",
    theme_color: "#080B16",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
