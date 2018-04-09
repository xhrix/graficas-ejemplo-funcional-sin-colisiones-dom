import * as React from 'react';

interface ChartAProps {
    data: {
        title: string;
    }
}

export class ChartA extends React.Component<ChartAProps, {}> {
    public render() {
        return <div>
            <h1>Chart A</h1>
            <p>chart: {this.props.data.title}</p>
        </div>;
    }
}
