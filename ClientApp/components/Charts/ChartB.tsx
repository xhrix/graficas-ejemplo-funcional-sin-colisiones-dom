import * as React from 'react';
import * as uuid from 'uuid/v4';

interface ChartBProps {
    data: {
        title: string;
    }
}

export class ChartB extends React.Component<ChartBProps, {}> {

    private readonly chartUid: string;

    constructor(props: ChartBProps) {
        super(props);
        this.chartUid = uuid();
    };

    componentDidMount() {
        const that = this;
        const Highcharts = (window as any).Highcharts;

        Highcharts.chart(that.chartUid, {
            chart: {
                polar: true
            },

            title: {
                text: 'Highcharts Polar Chart'
            },

            pane: {
                startAngle: 0,
                endAngle: 360
            },

            xAxis: {
                tickInterval: 45,
                min: 0,
                max: 360,
                labels: {
                    formatter: function () {
                        return (this as any).value + '°';
                    }
                }
            },

            yAxis: {
                min: 0
            },

            plotOptions: {
                series: {
                    pointStart: 0,
                    pointInterval: 45
                },
                column: {
                    pointPadding: 0,
                    groupPadding: 0
                }
            },

            series: [{
                type: 'column',
                name: 'Column',
                data: [8, 7, 6, 5, 4, 3, 2, 1],
                pointPlacement: 'between'
            }, {
                type: 'line',
                name: 'Line',
                data: [1, 2, 3, 4, 5, 6, 7, 8]
            }, {
                type: 'area',
                name: 'Area',
                data: [1, 8, 2, 7, 3, 6, 4, 5]
            }]
        });
    }

    public render() {
        return <div className="col-sm">
            <div className="jumbotron">
                <h1 className="display-4">Graph {this.props.data.title}!</h1>
                <p className="lead">Another graph.</p>
                <div id={this.chartUid}
                     style={{minWidth: '310px', maxWidth: '400px', height: '400px', margin: '0 auto'}}/>
            </div>
        </div>;
    }
}
