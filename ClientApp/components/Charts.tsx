import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ChartA } from './Charts/ChartA';
import { ChartB } from './Charts/ChartB';

export class Charts extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <h1>Charts</h1>
            <ChartA data={{title: 'Chart A'}}/>
            <ChartB data={{title: 'Chart B'}}/>
        </div>;
    }
}
