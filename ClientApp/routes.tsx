import * as React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Layout} from './components/Layout';
import {Redirect} from "react-router";
import ChartsRoot from "./components/roots/ChartsRoot";

export const routes = <Layout>
    <Switch>
        <Route exact path='/charts' component={ChartsRoot}/>
        <Route exact path='/charts/:id' component={ChartsRoot}/>
        <Redirect to="/charts"/>
    </Switch>
</Layout>;
