import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import PecaConsulta from '../pages/peca/consulta/Peca-consulta';
import Peca from '../pages/peca/peca';

const Routes = () => 
<BrowserRouter>
<Switch>
    <Route exact path="/" component={PecaConsulta} />
    <Route exact path="/peca-detalhe" component={Peca} />
</Switch>
</BrowserRouter>;

export default Routes;