import Workspace from "../models/workspace";
import {ChartMetaMocks} from "./chart-meta-mocks";
import {LayoutsWithThreeItemsMock} from "./layouts-mocks";

const ChartMetas = ChartMetaMocks.slice(0, 3);
export const WorkspaceMocks: Workspace[] = [
    new Workspace(1, 'Workspace One', '/images/demo-charts-preview-1.png', ChartMetas, LayoutsWithThreeItemsMock),
    new Workspace(2, 'Workspace Two', '/images/demo-charts-preview-2.png', ChartMetas, LayoutsWithThreeItemsMock),
    new Workspace(3, 'Workspace Three', '/images/demo-charts-preview-3.png', ChartMetas, LayoutsWithThreeItemsMock),
    new Workspace(4, 'Workspace Four', '/images/demo-charts-preview-4.png', ChartMetas, LayoutsWithThreeItemsMock),
    new Workspace(5, 'Workspace Five', '/images/demo-charts-preview-5.png', ChartMetas, LayoutsWithThreeItemsMock),
    new Workspace(6, 'Workspace Siz', '/images/demo-charts-preview-6.png', ChartMetas, LayoutsWithThreeItemsMock),
    new Workspace(7, 'Workspace Seven', '/images/demo-charts-preview-7.png', ChartMetas, LayoutsWithThreeItemsMock),
    new Workspace(8, 'Workspace Eight', '/images/demo-charts-preview-8.png', ChartMetas, LayoutsWithThreeItemsMock),
    new Workspace(9, 'Workspace Nine', '/images/demo-charts-preview-9.png', ChartMetas, LayoutsWithThreeItemsMock),
    new Workspace(10, 'Workspace Ten', '/images/demo-charts-preview-10.png', ChartMetas, LayoutsWithThreeItemsMock),
    new Workspace(11, 'Workspace Eleven', '/images/demo-charts-preview-11.png', ChartMetas, LayoutsWithThreeItemsMock),
    new Workspace(12, 'Workspace Twelve', '/images/demo-charts-preview-12.png', ChartMetas, LayoutsWithThreeItemsMock),
];