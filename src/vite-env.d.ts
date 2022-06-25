/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_RAPID_API_KEY: string;
  readonly VITE_RAPID_API_NEWS_HOST: string;
  readonly VITE_RAPID_API_COINR_HOST: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
