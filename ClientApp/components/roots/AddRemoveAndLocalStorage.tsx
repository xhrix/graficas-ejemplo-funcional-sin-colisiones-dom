import * as React from "react";
import {WidthProvider, Responsive, Layout, Breakpoints, Layouts} from "react-grid-layout";
import * as styles from './PlaygroundRoot.scss';
import * as uuid from 'uuid/v4';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

/**
 * Makes sure the layouts have all the breakpoint keys.
 * @param {ReactGridLayout.Layouts} layouts - Maybe not normalized layouts.
 */
const normalizeLayouts = (layouts: Layouts) => {
    if (!layouts.hasOwnProperty('sm')) layouts.sm = [];
    if (!layouts.hasOwnProperty('md')) layouts.md = [];
    if (!layouts.hasOwnProperty('lg')) layouts.lg = [];
    if (!layouts.hasOwnProperty('xs')) layouts.xs = [];
    if (!layouts.hasOwnProperty('xxs')) layouts.xxs = [];
    return layouts;
};

const getSavedLayouts: () => Layouts = () => normalizeLayouts(JSON.parse(JSON.stringify(getFromLS("layouts") || {})));

const layoutForItem = (counter: number) => ({
    i: "grid-item-" + uuid(),
    x: 0,
    y: 0,
    w: 2,
    h: 2
} as Layout);

const generateLayouts = (layout: () => Layout[]) => ({
    sm: layout(),
    md: layout(),
    lg: layout(),
    xs: layout(),
    xxs: layout(),
} as Layouts);

interface State {
    breakpoint: Breakpoints;
    layouts: Layouts;
    newCounter: number;
}

/**
 * This layout demonstrates how to sync multiple responsive layouts to localstorage.
 */
export default class AddRemoveAndLocalStorage extends React.PureComponent<any, State> {
    constructor(props: any) {
        super(props);

        const layouts = getSavedLayouts();
        this.state = {
            breakpoint: 'lg',
            layouts,
            newCounter: layouts.xs ? layouts.xs.length : 0,
        };
    }

    gridItem = (el: Layout) => {
        return (
            <div className={styles.item} key={el.i} data-grid={el}>
                <span className="text">{el.i}</span>
                <span className={styles.closeBtn} onClick={() => this.onRemoveItem(el.i)}>x</span>
            </div>
        );
    };

    onAddItem = () => {
        console.log("adding", "n" + this.state.newCounter);
        this.setState({
            // Add a new item. It must have a unique key!
            layouts: {
                xxs: (this.state.layouts.xxs ? this.state.layouts.xxs : []).concat(layoutForItem(this.state.newCounter)),
                lg: (this.state.layouts.lg ? this.state.layouts.lg : []).concat(layoutForItem(this.state.newCounter)),
                xs: (this.state.layouts.xs ? this.state.layouts.xs : []).concat(layoutForItem(this.state.newCounter)),
                sm: (this.state.layouts.sm ? this.state.layouts.sm : []).concat(layoutForItem(this.state.newCounter)),
                md: (this.state.layouts.md ? this.state.layouts.md : []).concat(layoutForItem(this.state.newCounter)),
            },
            // Increment the counter to ensure key is always unique.
            newCounter: this.state.newCounter + 1
        });
    };

    resetLayout() {
        this.setState({layouts: generateLayouts(() => [])});
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

function getFromLS(key: any) {
    let ls: any = {};
    if (window.localStorage) {
        try {
            ls = JSON.parse(window.localStorage.getItem("rgl-8") || '{}') || {};
        } catch (e) {
            /*Ignore*/
        }
    }
    return ls[key];
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