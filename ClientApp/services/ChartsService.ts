import ChartMeta from "../models/ChartMeta";

export default class ChartsService {
    public static async getAvailableCharts(): Promise<ChartMeta[]> {
        return [
            new ChartMeta('chart-GUID-1', '/lib/highcharts/examples/line-basic/index.htm', 'https://picsum.photos/200/300/?image=351'),
            new ChartMeta('chart-GUID-2', '/lib/highcharts/examples/spline-inverted/index.htm', 'https://picsum.photos/200/300/?image=91'),
            new ChartMeta('chart-GUID-3', '/lib/highcharts/examples/area-stacked/index.htm', 'https://picsum.photos/200/300/?image=663'),
            new ChartMeta('chart-GUID-4', '/lib/highcharts/examples/column-stacked-and-grouped/index.htm', 'https://picsum.photos/200/300/?image=737'),
            new ChartMeta('chart-GUID-5', '/lib/highcharts/examples/pie-donut/index.htm', 'https://picsum.photos/200/300/?image=667'),
            new ChartMeta('chart-GUID-6', '/lib/highcharts/examples/gauge-speedometer/index.htm', 'https://picsum.photos/200/300/?image=183'),
            new ChartMeta('chart-GUID-7', '/lib/highcharts/examples/funnel/index.htm', 'https://picsum.photos/200/300/?image=694'),
        ];
    }
}