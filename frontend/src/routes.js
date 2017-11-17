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
];

export default routes;
