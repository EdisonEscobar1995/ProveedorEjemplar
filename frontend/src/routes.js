import asyncComponent from './AsyncComponent';

const routes = [
  {
    title: 'Supplier',
    index: 1,
    path: '/',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/Supplier').then(module => module.default),
    ),
  },
  {
    title: 'Sector',
    index: 2,
    path: '/sector',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/Sector').then(module => module.default),
    ),
  },
  {
    title: 'Convocatorias',
    index: 3,
    path: '/call',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/Call').then(module => module.default),
    ),
  },
];

export default routes;
