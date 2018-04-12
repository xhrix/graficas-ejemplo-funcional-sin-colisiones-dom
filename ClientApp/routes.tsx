import * as React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Layout} from './components/Layout';
import {Redirect} from "react-router";
import ChartsRoot from "./components/roots/ChartsRoot";
import LayoutBuilderRoot from "./components/roots/LayoutBuilderRoot";

export const routes = <Layout>
    <Switch>
        <Route exact path='/charts' component={ChartsRoot}/>
        <Route exact path='/charts/:id' component={ChartsRoot}/>
        <Route exact path='/layout-builder' component={LayoutBuilderRoot}/>
        <Redirect to="/charts"/>
    </Switch>
</Layout>;
