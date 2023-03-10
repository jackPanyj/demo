import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    {path: '/admin', component: 'admin'},
    {path: '/admin/dashboard', component: 'admin/dashboard'}
  ],
  npmClient: 'npm',
  proxy: {
    '/api': {
      'target': 'http://127.0.0.1:3000',
      'changeOrigin': true,
    },
  },
  writeToDisk: true,
});

