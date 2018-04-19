import {Layout, Layouts} from "react-grid-layout";

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

/**
 * Appends a layout to a normalized {@see ReactGridLayout.Layouts} and returns it.
 *
 * This method does not modify the original {@param layouts}.
 *
 * @param {ReactGridLayout.Layouts} layouts - Where to append the layout.
 * @param newLayout - Returns the layout to append.
 * @returns {ReactGridLayout.Layouts} - A new {@see ReactGridLayout.Layouts} containing the new layout.
 */
export const appendLayout = (layouts: Layouts, newLayout: () => Layout): Layouts => ({
    xxs: (layouts.xxs ? layouts.xxs : []).concat(newLayout()),
    xs: (layouts.xs ? layouts.xs : []).concat(newLayout()),
    sm: (layouts.sm ? layouts.sm : []).concat(newLayout()),
    md: (layouts.md ? layouts.md : []).concat(newLayout()),
    lg: (layouts.lg ? layouts.lg : []).concat(newLayout()),
});

/**
 * Returns a normalized {@see ReactGridLayout.Layouts} which does not contain the layout with a given {@see ReactGridLayout.Layout.i}.
 *
 * This method does not modify the original {@param layouts}.
 *
 * @param {ReactGridLayout.Layouts} layouts - Source of layouts.
 * @param key - Key of the layout to remove.
 * @returns {ReactGridLayout.Layouts} - A new {@see ReactGridLayout.Layouts} with the desired layouts removed.
 */
export const removeLayoutByKey = (layouts: Layouts, key: string): Layouts => ({
    xxs: layouts.xxs ? layouts.xxs.filter(x => x.i !== key) : [],
    xs: layouts.xs ? layouts.xs.filter(x => x.i !== key) : [],
    sm: layouts.sm ? layouts.sm.filter(x => x.i !== key) : [],
    md: layouts.md ? layouts.md.filter(x => x.i !== key) : [],
    lg: layouts.lg ? layouts.lg.filter(x => x.i !== key) : [],
});