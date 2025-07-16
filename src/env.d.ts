/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_IMGBB_API_KEY: string;
  // Add more env variables if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
