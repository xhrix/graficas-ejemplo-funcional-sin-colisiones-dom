import ChartMeta from "./chart-meta";

export default class WorkspaceCategory {
    constructor(public id: number, public name: string, public thumbnailUrl: string, public charts: ChartMeta[]) {

    }
}