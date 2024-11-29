
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 0,
    "route": "/page/*"
  },
  {
    "renderMode": 0,
    "route": "/pokemon/*"
  }
],
  assets: new Map([
['index.csr.html', {size: 696, hash: '3a0ea1cbeb680d32d666755b1f4bf679e4aeb6576ad82029e6ecbfe8104de756', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)}], 
['index.server.html', {size: 1005, hash: 'f5b7cdd4bb943c9222d2db32710ed8471c047064677b50859adafbff931e5f65', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)}], 
['index.html', {size: 16374, hash: 'd2e9bca438989853429a58a6024f3adce4d1f1eda2b592d827f73f23d5fc8267', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)}], 
['styles-ZDHJN6RM.css', {size: 79, hash: 'EfdkENaAH9o', text: () => import('./assets-chunks/styles-ZDHJN6RM_css.mjs').then(m => m.default)}]
]),
  locale: undefined,
};
