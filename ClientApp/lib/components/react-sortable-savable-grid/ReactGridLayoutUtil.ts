import {Layout, Layouts} from "react-grid-layout";
import * as uuid from 'uuid/v4';

/**
 * Makes sure the layouts have all the different breakpoint keys.
 *
 * @param {ReactGridLayout.Layouts} layouts - Layouts that might not be normalized.
 */
export const normalizeLayouts = (layouts: Layouts) => {
    if (!layouts.hasOwnProperty('sm')) layouts.sm = [];
    if (!layouts.hasOwnProperty('md')) layouts.md = [];
    if (!layouts.hasOwnProperty('lg')) layouts.lg = [];
    if (!layouts.hasOwnProperty('xs')) layouts.xs = [];
    if (!layouts.hasOwnProperty('xxs')) layouts.xxs = [];
    return layouts;
};

/**
 * Generates a layout with a random {@see ReactGridLayout.Layout.i}.
 *
 * @returns {ReactGridLayout.Layout}
 */
export const randomLayout = () => ({i: "grid-item-" + uuid(), x: 0, y: 0, w: 2, h: 2} as Layout);

/**
 * Generates normalized {@see ReactGridLayout.Layouts} using a provided layout for every breakpoint.
 *
 * @param layout - When called, returns the layout to use for every breakpoint.
 * @returns {ReactGridLayout.Layouts}
 */
export const normalizedLayoutsOf = (layout: () => Layout[]) => ({
    sm: layout(),
    md: layout(),
    lg: layout(),
    xs: layout(),
    xxs: layout(),
} as Layouts);


/**
 * Generates normalized empty {@see ReactGridLayout.Layouts}.
 *
 * @returns {ReactGridLayout.Layouts}
 */
export const emptyNormalizedLayouts = () => normalizedLayoutsOf(() => []);