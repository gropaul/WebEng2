import AboutPage from '../pages/about.jsx';
import MAP from '../pages/map.jsx';
// import InfoPage from '../pages/infos.jsx'
import NotFoundPage from '../pages/404.jsx';

var routes = [
  {
    path: '/',
    component: MAP,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  /*{
    path: '/infos/',
    component: InfoPage,
  },*/
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
