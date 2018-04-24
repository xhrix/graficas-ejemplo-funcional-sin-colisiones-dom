import {ChartMetaMocks} from "./chart-meta-mocks";
import WorkspaceCategory from "../models/workspace-category";

export const WorkspaceCategoryMocks: WorkspaceCategory[] = [
    {
        id: 1,
        name: 'Category One',
        previewUrl: '/images/demo-category-1.png',
        charts: ChartMetaMocks.slice(0),
    },
    {
        id: 2,
        name: 'Category Two',
        previewUrl: '/images/demo-category-2.png',
        charts: ChartMetaMocks.slice(1),
    },
    {
        id: 3,
        name: 'Category Three',
        previewUrl: '/images/demo-category-3.png',
        charts: ChartMetaMocks.slice(2),
    },
    {
        id: 4,
        name: 'Category Four',
        previewUrl: '/images/demo-category-4.png',
        charts: ChartMetaMocks.slice(3),
    },
    {
        id: 5,
        name: 'Category Five',
        previewUrl: '/images/demo-category-5.png',
        charts: ChartMetaMocks.slice(4),
    },
    {
        id: 6,
        name: 'Category Siz',
        previewUrl: '/images/demo-category-6.png',
        charts: ChartMetaMocks.slice(5),
    },
    {
        id: 7,
        name: 'Category Seven',
        previewUrl: '/images/demo-category-7.png',
        charts: [],
    },
    {
        id: 8,
        name: 'Category Eight',
        previewUrl: '/images/demo-category-8.png',
        charts: ChartMetaMocks.reverse(),
    },
    {
        id: 9,
        name: 'Category Nine',
        previewUrl: '/images/demo-category-9.png',
        charts: ChartMetaMocks.reverse().slice(1),
    },
    {
        id: 10,
        name: 'Category Ten',
        previewUrl: '/images/demo-category-10.png',
        charts: ChartMetaMocks.reverse().slice(2),
    },
    {
        id: 11,
        name: 'Category Eleven',
        previewUrl: '/images/demo-category-11.png',
        charts: ChartMetaMocks.reverse().slice(3),
    },
    {
        id: 12,
        name: 'Category Twelve',
        previewUrl: '/images/demo-category-12.png',
        charts: ChartMetaMocks,
    }
];