import {ChartMetaMocks} from "./chart-meta-mocks";
import WorkspaceCategory from "../models/workspace-category";

export const WorkspaceCategoryMocks: WorkspaceCategory[] = [
    {
        id: 1,
        name: 'Category One',
        thumbnailUrl: '/images/demo-category-1.png',
        charts: ChartMetaMocks.slice(0),
    },
    {
        id: 2,
        name: 'Category Two',
        thumbnailUrl: '/images/demo-category-2.png',
        charts: ChartMetaMocks.slice(1),
    },
    {
        id: 3,
        name: 'Category Three',
        thumbnailUrl: '/images/demo-category-3.png',
        charts: ChartMetaMocks.slice(2),
    },
    {
        id: 4,
        name: 'Category Four',
        thumbnailUrl: '/images/demo-category-4.png',
        charts: ChartMetaMocks.slice(3),
    },
    {
        id: 5,
        name: 'Category Five',
        thumbnailUrl: '/images/demo-category-5.png',
        charts: ChartMetaMocks.slice(4),
    },
    {
        id: 6,
        name: 'Category Siz',
        thumbnailUrl: '/images/demo-category-6.png',
        charts: ChartMetaMocks.slice(5),
    },
    {
        id: 7,
        name: 'Category Seven',
        thumbnailUrl: '/images/demo-category-7.png',
        charts: [],
    },
    {
        id: 8,
        name: 'Category Eight',
        thumbnailUrl: '/images/demo-category-8.png',
        charts: ChartMetaMocks.reverse(),
    },
    {
        id: 9,
        name: 'Category Nine',
        thumbnailUrl: '/images/demo-category-9.png',
        charts: ChartMetaMocks.reverse().slice(1),
    },
    {
        id: 10,
        name: 'Category Ten',
        thumbnailUrl: '/images/demo-category-10.png',
        charts: ChartMetaMocks.reverse().slice(2),
    },
    {
        id: 11,
        name: 'Category Eleven',
        thumbnailUrl: '/images/demo-category-11.png',
        charts: ChartMetaMocks.reverse().slice(3),
    },
    {
        id: 12,
        name: 'Category Twelve',
        thumbnailUrl: '/images/demo-category-12.png',
        charts: ChartMetaMocks,
    }
];