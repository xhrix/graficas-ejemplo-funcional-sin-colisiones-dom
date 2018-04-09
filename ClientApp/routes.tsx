import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Charts } from './components/Charts';

export const routes = <Layout>
    <Route exact path='/' component={ Charts } />
</Layout>;
