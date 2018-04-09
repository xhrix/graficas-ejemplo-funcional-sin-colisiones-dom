import * as React from 'react';
import {Route} from 'react-router-dom';
import {Layout} from './components/Layout';
import {Charts} from './components/Charts';
import {Redirect} from "react-router";

export const routes = <Layout>
    <Route exact path='/graphs' component={Charts}/>
    <Route exact path='/' component={() => <Redirect to="/graphs"/>}/>
</Layout>;
