import asyncComponent from './AsyncComponent';

const routes = [
  {
    index: 0,
    name: 'HOME',
    path: '/',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/Home').then(module => module.default),
    ),
  },
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
    name: 'SUPPLIER_BY_ID',
    path: '/supplier/:idSupplier/:idSupplierByCall',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/Supplier').then(module => module.default),
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
  {
    index: 7,
    name: 'SURVEYS',
    path: '/surveys',
    exact: true,
    component: asyncComponent(() =>
     import('./pages/Surveys').then(module => module.default),
    ),
  },
  {
    index: 8,
    name: 'CALLREPORT',
    path: '/callReport',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/CallReport').then(module => module.default),
    ),
  },
  {
    index: 9,
    name: 'RESULTS',
    path: '/results',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/Results').then(module => module.default),
    ),
  },
  {
    index: 10,
    name: 'PENDINGS',
    path: '/pendings',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/Pendings').then(module => module.default),
    ),
  },
  {
    index: 11,
    name: 'ENDEDEVALUATOR',
    path: '/endedEvaluator',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/EndedEvaluator').then(module => module.default),
    ),
  },
  {
    index: 12,
    name: 'SECTOR',
    path: '/sector',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/Sector').then(module => module.default),
    ),
  },
  {
    index: 13,
    name: 'SERVICE',
    path: '/service',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/Service').then(module => module.default),
    ),
  },
];

export default routes;
