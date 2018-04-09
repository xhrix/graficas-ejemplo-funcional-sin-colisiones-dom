import * as React from 'react';
import * as uuid from 'uuid/v4';
import {NavLink} from "react-router-dom";

interface Props {
    data: {
        title: string;
    }
}

export class ChartE extends React.Component<Props, {}> {

    private readonly chartUid: string;

    constructor(props: Props) {
        super(props);
        this.chartUid = uuid();
    };

    componentDidMount() {
        const that = this;
        const Highcharts = (window as any).Highcharts;


        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        Highcharts.chart(that.chartUid, {
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = (this as any).series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = Math.random();
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: 'Live random data'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + (this as any).series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', (this as any).x) + '<br/>' +
                        Highcharts.numberFormat((this as any).y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                }())
            }]
        });
    }

    public render() {
        return <div className="jumbotron">
            <NavLink to={'/charts/5'}>
                <h1 className="display-4">Graph {this.props.data.title}!</h1>
            </NavLink>
            <p className="lead">Another one.</p>
            <div id={this.chartUid} style={{minWidth: '310px', height: '400px', margin: '0 auto'}}/>
        </div>;
    }
}
