import {ChartMetaMocks} from "./chart-meta-mocks";
import WorkspaceCategory from "../models/workspace-category";

export const WorkspaceCategoryMocks: WorkspaceCategory[] = [
    {
        id: 1,
        name: 'Category One',
        charts: ChartMetaMocks.slice(0),
    },
    {
        id: 2,
        name: 'Category Two',
        charts: ChartMetaMocks.slice(1),
    },
    {
        id: 3,
        name: 'Category Three',
        charts: ChartMetaMocks.slice(2),
    },
    {
        id: 4,
        name: 'Category Four',
        charts: ChartMetaMocks.slice(3),
    },
    {
        id: 5,
        name: 'Category Five',
        charts: ChartMetaMocks.slice(4),
    },
    {
        id: 6,
        name: 'Category Siz',
        charts: ChartMetaMocks.slice(5),
    },
    {
        id: 7,
        name: 'Category Seven',
        charts: [],
    },
    {
        id: 8,
        name: 'Category Eight',
        charts: ChartMetaMocks.reverse(),
    },
    {
        id: 9,
        name: 'Category Nine',
        charts: ChartMetaMocks.reverse().slice(1),
    },
    {
        id: 10,
        name: 'Category Ten',
        charts: ChartMetaMocks.reverse().slice(2),
    },
    {
        id: 11,
        name: 'Category Eleven',
        charts: ChartMetaMocks.reverse().slice(3),
    },
    {
        id: 12,
        name: 'Category Twelve',
        charts: ChartMetaMocks,
    }
];