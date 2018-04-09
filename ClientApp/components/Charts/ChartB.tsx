import * as React from 'react';

interface ChartBProps {
    data: {
        title: string;
    }
}

export class ChartB extends React.Component<ChartBProps, {}> {
    public render() {
        return <div className="col-sm">
            <div className="jumbotron">
                <h1 className="display-4">Graph {this.props.data.title}!</h1>
                <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr className="my-4" />
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
            </div>
        </div>;
    }
}
