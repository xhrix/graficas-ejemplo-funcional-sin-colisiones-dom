import {observable} from "mobx";
import ChartMeta from "../models/ChartMeta";

export default class LayoutBuilderService {

    @observable
    public selectedCharts: ChartMeta[] = [];

    public isSelected(value: ChartMeta) {
        return !!(this.selectedCharts.find(x => value.url === x.url));
    }

    public toggleSelection(value: ChartMeta) {
        if (this.isSelected(value)) {
            this.selectedCharts = this.selectedCharts.filter(x => x.url !== value.url);
        } else {
            this.selectedCharts = this.selectedCharts.concat([value]);
        }
    }

    private static instance: LayoutBuilderService;

    public static get Instance() {
        if (!LayoutBuilderService.instance) {
            LayoutBuilderService.instance = new LayoutBuilderService();
        }
        return LayoutBuilderService.instance;
    }
}