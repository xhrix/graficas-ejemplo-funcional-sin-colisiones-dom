import ChartMeta from "../models/ChartMeta";

export default class ChartsService {
    public static async getAvailableCharts(): Promise<ChartMeta[]> {
        return [
            new ChartMeta('/lib/highcharts/examples/line-basic/index.htm', 'https://picsum.photos/200/300/?image=351'),
            new ChartMeta('/lib/highcharts/examples/spline-inverted/index.htm', 'https://picsum.photos/200/300/?image=91'),
            new ChartMeta('/lib/highcharts/examples/area-stacked/index.htm', 'https://picsum.photos/200/300/?image=663'),
            new ChartMeta('/lib/highcharts/examples/column-stacked-and-grouped/index.htm', 'https://picsum.photos/200/300/?image=737'),
            new ChartMeta('/lib/highcharts/examples/pie-donut/index.htm', 'https://picsum.photos/200/300/?image=667'),
            new ChartMeta('/lib/highcharts/examples/gauge-speedometer/index.htm', 'https://picsum.photos/200/300/?image=183'),
            new ChartMeta('/lib/highcharts/examples/funnel/index.htm', 'https://picsum.photos/200/300/?image=694'),
        ];
    }
}