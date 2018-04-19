import * as React from "react";
import {WidthProvider, Responsive, Layout, Breakpoints, Layouts} from "react-grid-layout";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface State {
    breakpoint: Breakpoints;
}

/**
 * Configuration of a sortable savable grid.
 */
export interface SortableSavableGridConfig {
    rowHeight: number;
    cols: {[P in Breakpoints]: number };
}

/**
 * Properties that the wrapped component is injected.
 */
export interface InjectedGridItemProps {
    /**
     * Layout of the grid item.
     */
    layout: Layout;

    /**
     * Call this method to remove the item from the grid.
     *
     * Typically you might want to imperatively call this method when a 'close' button is clicked.
     *
     * @param {string} itemKey - Key of the item to be removed. Get this value from the {@see ReactGridLayout.Layout.i} property of {@see InjectedGridItemProps.layout}.
     */
    removeFromGrid: (itemKey: string) => void;
}

/**
 * Properties that the wrapped component is injected.
 */
export interface InjectedGridProps {
    /**
     * Layout of the grid item.
     */
    layouts: Layouts;

    /**
     * Called when the layout changes.
     *
     * @param {ReactGridLayout.Layout} layout
     * @param {ReactGridLayout.Layouts} layouts
     */
    onLayoutChange: (layout: Layout, layouts: Layouts) => void;

    /**
     * Called when a grid item is requesting to be removed from the grid.
     *
     * @param {string} itemKey - Key of the item to be removed.
     */
    onRemoveItemClicked: (itemKey: string) => void;
}

/**
 * Configures a sortable savable grid HOC.
 *
 * @param {Config} config - Configuration.
 */
export const sortableSavableGrid = (config: SortableSavableGridConfig) => <TItemProps extends InjectedGridItemProps>(UnwrappedComponent: React.ComponentType<TItemProps>) => {

    /**
     * HOC that encapsulates the logic to handle a responsive and sortable grid of items, with the ability to add
     * or remove items from it, as well as a way to provide a way to save and load a layout from any source.
     */
    return class SortableSavableGrid extends React.PureComponent<InjectedGridProps, State> {
        constructor(props: any) {
            super(props);
            this.state = {
                breakpoint: 'lg', // Any default starting breakpoint, it will be properly updated at render-time.
            };
        }

        // We're using the cols coming back from this to calculate where to add new items.
        onBreakpointChange = (breakpoint: Breakpoints, cols: number) => {
            console.log({breakpoint, cols});
            this.setState({breakpoint});
        };

        gridItem = (el: Layout) => {
            return (
                <div key={el.i} data-grid={el}>
                    <UnwrappedComponent layout={el} removeFromGrid={this.props.onRemoveItemClicked}/>
                </div>
            );
        };

        render() {
            const layouts: Layout[] = (this.props.layouts as any)[this.state.breakpoint] ? (this.props.layouts as any)[this.state.breakpoint] : [];
            return (
                <ResponsiveReactGridLayout
                    onLayoutChange={this.props.onLayoutChange}
                    rowHeight={config.rowHeight}
                    cols={config.cols}
                    layouts={this.props.layouts}
                    onBreakpointChange={this.onBreakpointChange}
                >
                    {layouts.map(layout => this.gridItem(layout))}
                </ResponsiveReactGridLayout>
            );
        }
    }
};