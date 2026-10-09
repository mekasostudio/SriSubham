// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    optimizeDeps: {
      // Prebundle the lazy room and gallery dependencies with React at startup.
      // Discovering them later can reload an open preview with mixed React chunks.
      include: [
        "@react-three/fiber",
        "@react-three/drei",
        "three",
        "@tanstack/react-query",
        "@radix-ui/react-slot",
        "@radix-ui/react-dialog",
        "lucide-react",
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
        "zod",
      ],
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
