import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: { //프록시 설정 프로트엔드와 백엔드가 서로 다른 주소에서 돌아갈떄 통신 통로를 만들어주는 역활
    proxy: {
      "^/api": { // 1. '/api'로 시작하는 모든 요청을 잡아라!
        target: `http://localhost:3000`, // 2. 어디로 보낼까? 우리 백엔드 서버 주소인 3000번 포트로!
        changeOrigin: true, // 3. 요청을 보낼 때 주소를 백엔드 주소로 바꿔치기해라 (CORS 회피 핵심)
        rewrite: (path) => path.replace(/^\/api/, ""), // 4. 주소 세탁: 요청할 때 붙은 '/api'를 제거하고 보내라
      },
    },
  },
});
