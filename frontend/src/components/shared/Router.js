import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from '../../routes';

function Router() {
  return (
    <Switch>
      {routes.map(route => (
        <Route
          key={route.index}
          component={route.component}
          exact={route.exact === true}
          path={route.path}
        />
      ))}
    </Switch>
  );
}

export default Router;
