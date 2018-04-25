import * as React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Layout} from './components/Layout/Layout';
import {Redirect} from "react-router";
import ChartsRoot from "./components/roots/ChartsRoot";
import PlaygroundRoot from "./components/roots/PlaygroundRoot";
import WorkspacesRoot from "./components/roots/workspaces-root";
import EditWorkspaceRoot from "./components/roots/edit-workspace-root";

export const routes = <Layout>
    <Switch>
        <Route exact path='/workspaces' component={WorkspacesRoot}/>
        <Route exact path='/workspaces/:id/edit' component={EditWorkspaceRoot}/>
        <Route exact path='/charts' component={ChartsRoot}/>
        <Route exact path='/playground' component={PlaygroundRoot}/>
        <Route exact path='/charts/:id' component={ChartsRoot}/>
        <Redirect to="/workspaces"/>
    </Switch>
</Layout>;
