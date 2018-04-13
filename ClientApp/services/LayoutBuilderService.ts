import {observable} from "mobx";

export default class LayoutBuilderService {

    @observable
    public selectedCharts: string[] = [];

    public isSelected(value: string) {
        return !!(this.selectedCharts.find(x => value === x));
    }

    public toggleSelection(value: string) {
        if (this.isSelected(value)) {
            this.selectedCharts = this.selectedCharts.filter(x => x !== value);
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