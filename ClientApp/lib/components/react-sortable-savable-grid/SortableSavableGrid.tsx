import * as React from "react";
import {WidthProvider, Responsive, Layout, Breakpoints, Layouts} from "react-grid-layout";
import {emptyNormalizedLayouts, normalizedLayoutsOf, normalizeLayouts, randomLayout} from "./ReactGridLayoutUtil";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface State {
    breakpoint: Breakpoints;
    layouts: Layouts;
}

/**
 * Configuration of a sortable savable grid.
 */
export interface SortableSavableGridConfig {
    getSavedLayouts: Promise<Layouts>;
    onLayoutChange: (layout: Layout, layouts: Layouts) => void;
    rowHeight: number;
    cols: {[P in Breakpoints]: number };
}

/**
 * Interaction API that the sortable savable grid exposes.
 */
export interface SortableSavableGridApi {
    /**
     * Adds an item to the grid.
     */
    addItem: () => void;

    /**
     * Removes all the items in the grid.
     */
    resetLayout: () => void;

    /**
     * Removes an item from the grid identified by a key.
     *
     * Note: The key of the item is the value found in {@see ReactGridLayout.Layout.i}.
     * @param {string} itemKey - Key of the item to remove.
     */
    removeItem: (itemKey: string) => void;
}

/**
 * Properties that the wrapped component is injected.
 */
export interface InjectedSortableSavableGridProps {
    /**
     * Layout of the grid item.
     */
    layout: Layout;
}

/**
 * Configures a sortable savable grid HOC.
 *
 * @param {Config} config - Configuration.
 */
export const sortableSavableGrid = (config: SortableSavableGridConfig) => <P extends InjectedSortableSavableGridProps>(UnwrappedComponent: React.ComponentType<P>) => {

    /**
     * HOC that encapsulates the logic to handle a responsive and sortable grid of items, with the ability to add
     * or remove items from it, as well as a way to provide a way to save and load a layout from any source.
     */
    return class SortableSavableGrid extends React.PureComponent<any, State> implements SortableSavableGridApi {
        constructor(props: any) {
            super(props);

            const layouts = emptyNormalizedLayouts(); // Start with empty layouts.

            this.state = {
                breakpoint: 'lg', // Any default starting breakpoint, it will be properly updated at render-time.
                layouts,
            };
        }

        addItem = () => {
            this.setState({
                layouts: {
                    xxs: (this.state.layouts.xxs ? this.state.layouts.xxs : []).concat(randomLayout()),
                    lg: (this.state.layouts.lg ? this.state.layouts.lg : []).concat(randomLayout()),
                    xs: (this.state.layouts.xs ? this.state.layouts.xs : []).concat(randomLayout()),
                    sm: (this.state.layouts.sm ? this.state.layouts.sm : []).concat(randomLayout()),
                    md: (this.state.layouts.md ? this.state.layouts.md : []).concat(randomLayout()),
                },
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

        removeItem = (i: string) => {
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
            this.setState({layouts});
            config.onLayoutChange(layout, layouts);
        };

        componentDidMount() {
            config.getSavedLayouts.then(layouts => this.setState({
                layouts: normalizeLayouts(layouts),
            }))
        }

        gridItem = (el: Layout) => {
            return (
                <div key={el.i} data-grid={el}>
                    <UnwrappedComponent layout={el}/>
                </div>
            );
        };

        render() {
            const layouts: Layout[] = (this.state.layouts as any)[this.state.breakpoint] ? (this.state.layouts as any)[this.state.breakpoint] : [];
            return (
                <ResponsiveReactGridLayout
                    onLayoutChange={this.onLayoutChange}
                    rowHeight={config.rowHeight}
                    cols={config.cols}
                    layouts={this.state.layouts}
                    onBreakpointChange={this.onBreakpointChange}
                >
                    {layouts.map(layout => this.gridItem(layout))}
                </ResponsiveReactGridLayout>
            );
        }
    }
};