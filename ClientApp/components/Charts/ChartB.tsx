import * as React from 'react';

interface ChartBProps {
    data: {
        title: string;
    }
}

export class ChartB extends React.Component<ChartBProps, {}> {
    public render() {
        return <div>
            <h1>Chart B</h1>
            <p>chart: {this.props.data.title}</p>
        </div>;
    }
}
