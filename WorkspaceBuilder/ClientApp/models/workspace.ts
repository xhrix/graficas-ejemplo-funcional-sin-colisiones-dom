import ChartMeta from "./chart-meta";
import {Layouts} from "react-grid-layout";

export default class Workspace {
    constructor(public id: number, public name: string, public thumbnailUrl: string, public charts: ChartMeta[], public layouts: Layouts) {

    }
}