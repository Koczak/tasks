import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
    // Static prerendering for the home page
    //just in case if we want to add some more static content to the home page,
  },
  {
    path: 'page/:page',
    renderMode: RenderMode.Server,
  },
  {
    path: 'pokemon/:id',
    renderMode: RenderMode.Server,
  },
];
