import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:3007/",
      "/api/campeones": "http://localhost:3007/",
      "/api/campeones/jugadores/66": "http://localhost:3007/",
      "/api/campeones/mejores_jugadores/66": "http://localhost:3007/",
      "/api/jornadas/ed/sub23": "http://localhost:3007/",
      "/api/jornadas/ed/sub23/3": "http://localhost:3007/",
      "/api/admin/Jugadores": "http://localhost:3007/",
     


    },
  },
  plugins: [react()],
});


