import ROOT from '../pages/root.jsx';
import NotFoundPage from '../pages/404.jsx';

var routes = [
  {
    path: '/',
    component: ROOT,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
