import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import HeatmapGrid from './HeatmapGrid';
import Chart from './Chart';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/chart" component={Chart} />
      <Route path="/" component={HeatmapGrid} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root') // make sure this is the same as the id of the div in your index.html
);
