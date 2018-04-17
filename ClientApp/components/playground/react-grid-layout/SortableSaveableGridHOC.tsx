/*
The only responsibility of this HOC is to provide the logic to add/remove items, as well as provide a way to allow
the client code to save the new layout every time it changes.

The layout provided by this HOC is responsive.
 */

import * as React from "react";
import {WidthProvider, Responsive, Layout, Breakpoints, Layouts} from "react-grid-layout";
import * as uuid from 'uuid/v4';
import * as styles from "../../roots/PlaygroundRoot.scss";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

/**
 * Makes sure the layouts have all the different breakpoint keys.
 *
 * @param {ReactGridLayout.Layouts} layouts - Layouts that might not be normalized.
 */
const normalizeLayouts = (layouts: Layouts) => {
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
const randomLayout = () => ({i: "grid-item-" + uuid(), x: 0, y: 0, w: 2, h: 2} as Layout);

/**
 * Generates normalized {@see ReactGridLayout.Layouts} using a provided layout for every breakpoint.
 *
 * @param layout - When called, returns the layout to use for every breakpoint.
 * @returns {ReactGridLayout.Layouts}
 */
const normalizedLayoutsOf = (layout: () => Layout[]) => ({
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
const emptyNormalizedLayouts = () => normalizedLayoutsOf(() => []);

interface State {
    breakpoint: Breakpoints;
    layouts: Layouts;
    newCounter: number;
}

function saveToLS(key: any, value: any) {
    if (window.localStorage) {
        window.localStorage.setItem(
            "rgl-8",
            JSON.stringify({
                [key]: value
            })
        );
    }
}

export interface Config {
    getSavedLayouts: Promise<Layouts>;
}

export const sortableSaveableGrid = (config: Config) => (Component: React.ComponentType) => {
    return class SortableSaveableGrid extends React.PureComponent<any, State> {
        constructor(props: any) {
            super(props);

            const layouts = emptyNormalizedLayouts(); // Start with empty layouts.;

            this.state = {
                breakpoint: 'lg', // Any default starting breakpoint, it will be properly updated at render-time.
                layouts,
                newCounter: layouts.xs ? +layouts.xs.length || 0 : 0,
            };
        }

        gridItem = (el: Layout) => {
            return (
                // TODO: Remove styles.item
                <div className={styles.item} key={el.i} data-grid={el}>
                    <Component/>
                    <span className={styles.closeBtn} onClick={() => this.onRemoveItem(el.i)}>x</span>
                </div>
            );
        };

        onAddItem = () => {
            console.log("adding", "n" + this.state.newCounter);
            this.setState({
                // Add a new item. It must have a unique key!
                layouts: {
                    xxs: (this.state.layouts.xxs ? this.state.layouts.xxs : []).concat(randomLayout()),
                    lg: (this.state.layouts.lg ? this.state.layouts.lg : []).concat(randomLayout()),
                    xs: (this.state.layouts.xs ? this.state.layouts.xs : []).concat(randomLayout()),
                    sm: (this.state.layouts.sm ? this.state.layouts.sm : []).concat(randomLayout()),
                    md: (this.state.layouts.md ? this.state.layouts.md : []).concat(randomLayout()),
                },
                // Increment the counter to ensure key is always unique.
                newCounter: this.state.newCounter + 1
            });
        };

        resetLayout() {
            this.setState({layouts: normalizedLayoutsOf(() => [])});
        }

        // We're using the cols coming back from this to calculate where to add new items.
        onBreakpointChange = (breakpoint: Breakpoints, cols: number) => {
            console.log({breakpoint, cols});
            this.setState({breakpoint});
        };

        onRemoveItem = (i: any) => {
            console.log("removing", i);
            this.setState({
                layouts: {
                    sm: this.state.layouts.sm ? this.state.layouts.sm.filter(x => x.i !== i) : [],
                    lg: this.state.layouts.lg ? this.state.layouts.lg.filter(x => x.i !== i) : [],
                    xs: this.state.layouts.xs ? this.state.layouts.xs.filter(x => x.i !== i) : [],
                    xxs: this.state.layouts.xxs ? this.state.layouts.xxs.filter(x => x.i !== i) : [],
                    md: this.state.layouts.md ? this.state.layouts.md.filter(x => x.i !== i) : [],
                }
            });
        };

        onLayoutChange = (layout: Layout, layouts: Layouts) => {
            console.log("On Layout Change", {layout, layouts});
            saveToLS("layouts", layouts);
            this.setState({layouts});
        };

        componentDidMount() {
            config.getSavedLayouts.then(layouts => this.setState({
                layouts: normalizeLayouts(layouts),
                newCounter: layouts.xs ? +layouts.xs.length || 0 : 0,
            }))
        }

        render() {
            return (
                <div>
                    <h2>{this.state.breakpoint}</h2>
                    <button onClick={this.onAddItem}>Add Item</button>
                    <ResponsiveReactGridLayout
                        className="layout"
                        onLayoutChange={this.onLayoutChange}
                        rowHeight={30}
                        cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
                        layouts={this.state.layouts}
                        onBreakpointChange={this.onBreakpointChange}
                    >
                        {((this.state.layouts as any)[this.state.breakpoint] ? (this.state.layouts as any)[this.state.breakpoint] : []).map((el: Layout) => this.gridItem(el))}
                    </ResponsiveReactGridLayout>
                </div>
            );
        }
    }
};