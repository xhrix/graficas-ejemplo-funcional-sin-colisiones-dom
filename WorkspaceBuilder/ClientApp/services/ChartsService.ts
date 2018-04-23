import ChartMeta from "../models/chart-meta";
import {ChartMetaMocks} from "../mocks/chart-meta-mocks";

export default class ChartsService {
    public static async getAvailableCharts(): Promise<ChartMeta[]> {
        return ChartMetaMocks;
    }
}