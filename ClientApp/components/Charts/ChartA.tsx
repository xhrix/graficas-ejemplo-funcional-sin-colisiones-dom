import * as React from 'react';
import * as $ from 'jquery';
import * as uuid from 'uuid/v4';
import {NavLink} from "react-router-dom";

interface ChartAProps {
    data: {
        title: string;
    }
}

export class ChartA extends React.Component<ChartAProps, {}> {

    private readonly chartUid: string;

    constructor(props: ChartAProps) {
        super(props);
        this.chartUid = uuid();
    };

    componentDidMount() {
        const that = this;
        const Highcharts = (window as any).Highcharts;
        // Get the CSV and create the chart
        $.ajax({
            url: 'https://cdn.rawgit.com/highcharts/highcharts/v6.0.4/samples/data/analytics.csv',
            success: function (csv) {
                Highcharts.chart(that.chartUid, {

                    data: {
                        csv: csv.replace(/\n\n/g, '\n')
                    },

                    title: {
                        text: 'Daily visits at www.highcharts.com'
                    },

                    subtitle: {
                        text: 'Source: Google Analytics'
                    },

                    xAxis: {
                        tickInterval: 7 * 24 * 3600 * 1000, // one week
                        tickWidth: 0,
                        gridLineWidth: 1,
                        labels: {
                            align: 'left',
                            x: 3,
                            y: -3
                        }
                    },

                    yAxis: [{ // left y axis
                        title: {
                            text: null
                        },
                        labels: {
                            align: 'left',
                            x: 3,
                            y: 16,
                            format: '{value:.,0f}'
                        },
                        showFirstLabel: false
                    }, { // right y axis
                        linkedTo: 0,
                        gridLineWidth: 0,
                        opposite: true,
                        title: {
                            text: null
                        },
                        labels: {
                            align: 'right',
                            x: -3,
                            y: 16,
                            format: '{value:.,0f}'
                        },
                        showFirstLabel: false
                    }],

                    legend: {
                        align: 'left',
                        verticalAlign: 'top',
                        borderWidth: 0
                    },

                    tooltip: {
                        shared: true,
                        crosshairs: true
                    },

                    plotOptions: {
                        series: {
                            cursor: 'pointer',
                            point: {
                                events: {
                                    click: function (e: any) {
                                        (window as any).hs.htmlExpand(null, {
                                            pageOrigin: {
                                                x: e.pageX || e.clientX,
                                                y: e.pageY || e.clientY
                                            },
                                            headingText: (this as any).series.name,
                                            maincontentText: Highcharts.dateFormat(
                                                '%A, %b %e, %Y', (this as any).x) + ':<br/> ' +
                                            (this as any).y + ' visits',
                                            width: 200
                                        });
                                    }
                                }
                            },
                            marker: {
                                lineWidth: 1
                            }
                        }
                    },

                    series: [{
                        name: 'All visits',
                        lineWidth: 4,
                        marker: {
                            radius: 4
                        }
                    }, {
                        name: 'New visitors'
                    }]
                });
            }
        });

    }

    public render() {
        return <div className="col-sm">
            <div className="jumbotron">
                <NavLink to={'/charts/1'}>
                    <h1 className="display-4">Graph {this.props.data.title}!</h1>
                </NavLink>
                <p className="lead">Data sample source A.</p>
                <div id={this.chartUid} style={{minWidth: '310px', height: '400px', margin: '0 auto'}}/>
            </div>
        </div>;
    }
}
