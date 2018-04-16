import * as React from "react";
import {WidthProvider, Responsive} from "react-grid-layout";
import * as styles from './PlaygroundRoot.scss';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};

/**
 * This layout demonstrates how to sync multiple responsive layouts to localstorage.
 */
export default class ResponsiveLocalStorageLayout extends React.PureComponent<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            layouts: JSON.parse(JSON.stringify(originalLayouts))
        };
    }

    static get defaultProps() {
        return {
            className: "layout",
            cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
            rowHeight: 30
        };
    }

    resetLayout() {
        this.setState({layouts: {}});
    }

    onLayoutChange(layout: any, layouts: any) {
        saveToLS("layouts", layouts);
        this.setState({layouts});
    }

    render() {
        return (
            <div>
                <button onClick={() => this.resetLayout()}>Reset Layout</button>
                <ResponsiveReactGridLayout
                    className="layout"
                    cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
                    rowHeight={30}
                    layouts={this.state.layouts}
                    onLayoutChange={(layout, layouts) =>
                        this.onLayoutChange(layout, layouts)
                    }
                >
                    <div className={styles.item} key="1" data-grid={{w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3}}>
                        <span className="text">1</span>
                    </div>
                    <div className={styles.item} key="2" data-grid={{w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3}}>
                        <span className="text">2</span>
                    </div>
                    <div className={styles.item} key="3" data-grid={{w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3}}>
                        <span className="text">3</span>
                    </div>
                    <div className={styles.item} key="4" data-grid={{w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3}}>
                        <span className="text">4</span>
                    </div>
                    <div className={styles.item} key="5" data-grid={{w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3}}>
                        <span className="text">5</span>
                    </div>
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