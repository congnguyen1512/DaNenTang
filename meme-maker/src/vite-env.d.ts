/// <reference types="vite/client" />

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// Extend Window interface for Capacitor
interface Window {
  Capacitor?: {
    isNativePlatform(): boolean;
    getPlatform(): string;
  };
}