import * as React from 'react';
import * as styles from './PlaygroundRoot.scss';
import * as _ from "lodash";
import {Responsive, WidthProvider} from "react-grid-layout";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
export default class AddRemoveLayout extends React.PureComponent<any, any> {
    static defaultProps = {
        className: "layout",
        cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
        rowHeight: 100
    };

    constructor(props: any) {
        super(props);

        this.state = {
            items: [0, 1, 2, 3, 4].map(function (i, key, list) {
                return {
                    i: i.toString(),
                    x: i * 2,
                    y: 0,
                    w: 2,
                    h: 2,
                    add: i.toString() === (list.length - 1).toString()
                };
            }),
            newCounter: 0
        };

        this.onAddItem = this.onAddItem.bind(this);
        this.onBreakpointChange = this.onBreakpointChange.bind(this);
    }

    createElement = (el: any) => {
        const removeStyle: any = {
            position: "absolute",
            right: "2px",
            top: 0,
            cursor: "pointer"
        };
        const i = el.add ? "+" : el.i;
        return (
            <div className={styles.item} key={i} data-grid={el}>
                {el.add ? (
                    <span
                        className="add text"
                        onClick={this.onAddItem}
                        title="You can add an item by clicking here, too."
                    >
            Add +
          </span>
                ) : (
                    <span className="text">{i}</span>
                )}
                <span
                    className="remove"
                    style={removeStyle}
                    onClick={() => this.onRemoveItem(i)}
                >
          x
        </span>
            </div>
        );
    };

    onAddItem() {
        /*eslint no-console: 0*/
        console.log("adding", "n" + this.state.newCounter);
        this.setState({
            // Add a new item. It must have a unique key!
            items: this.state.items.concat({
                i: "n" + this.state.newCounter,
                x: (this.state.items.length * 2) % (this.state.cols || 12),
                y: Infinity, // puts it at the bottom
                w: 2,
                h: 2
            }),
            // Increment the counter to ensure key is always unique.
            newCounter: this.state.newCounter + 1
        });
    }

    // We're using the cols coming back from this to calculate where to add new items.
    onBreakpointChange = (breakpoint: any, cols: any) => {
        this.setState({
            breakpoint: breakpoint,
            cols: cols
        });
    }

    onLayoutChange = (layout: any) => {
        if (typeof this.props.onLayoutChange === "function") this.props.onLayoutChange(layout);
        this.setState({layout: layout});
    }

    onRemoveItem = (i: any) => {
        console.log("removing", i);
        this.setState({items: _.reject(this.state.items, {i: i})});
    };

    render() {
        return (
            <div>
                <button onClick={this.onAddItem}>Add Item</button>
                <ResponsiveReactGridLayout
                    onLayoutChange={this.onLayoutChange}
                    onBreakpointChange={this.onBreakpointChange}
                    {...this.props}
                >
                    {_.map(this.state.items, el => this.createElement(el))}
                </ResponsiveReactGridLayout>
            </div>
        );
    }
}