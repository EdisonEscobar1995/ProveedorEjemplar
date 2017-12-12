import asyncComponent from './AsyncComponent';

const routes = [
  {
    index: 1,
    name: 'SUPPLIER',
    path: '/supplier',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/Supplier').then(module => module.default),
    ),
  },
  {
    index: 2,
    name: 'SECTOR',
    path: '/sector',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/Sector').then(module => module.default),
    ),
  },
  {
    index: 3,
    name: 'CALL',
    path: '/call',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/Call').then(module => module.default),
    ),
  },
  {
    index: 4,
    name: 'CALL_FORM',
    path: '/call/form',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/CallForm').then(module => module.default),
    ),
  },
  {
    index: 5,
    name: 'CALL_BY_ID',
    path: '/call/form/:id',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/CallForm').then(module => module.default),
    ),
  },
  {
    index: 6,
    name: 'MODIFIED_SUPPLIERS',
    path: '/modifiedSuppliers',
    exact: true,
    component: asyncComponent(() =>
     import('./pages/ModifiedSuppliers').then(module => module.default),
    ),
  },
];

export default routes;
