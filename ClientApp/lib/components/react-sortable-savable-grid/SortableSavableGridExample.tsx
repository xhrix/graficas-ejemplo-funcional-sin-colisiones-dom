import * as React from 'react';
import {
    SortableSavableGridConfig,
    InjectedGridItemProps,
    sortableSavableGrid,
} from "./SortableSavableGrid";
import {Layout, Layouts} from "react-grid-layout";
import {
    appendLayout,
    emptyNormalizedLayouts,
    normalizedLayoutsOf,
    normalizeLayouts,
    randomLayout, removeLayoutByKey
} from "./ReactGridLayoutUtil";

const styles: any = {
    ctn: {background: 'gainsboro', height: '100%', width: '100%'},
    closeBtn: {position: 'absolute', right: '2px', top: '0', cursor: 'pointer'},
};

interface GridItemProps extends InjectedGridItemProps {

}

class GridItem extends React.Component<GridItemProps> {
    render() {
        return (
            <div style={styles.ctn}>
                {this.props.layout.i}
                <span style={styles.closeBtn}
                      onClick={() => this.props.removeFromGrid(this.props.layout.i || '')}>x</span>
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

const getSavedLayouts: Promise<Layouts> = Promise.resolve(JSON.parse(JSON.stringify(getFromLS("layouts") || {})));

const config: SortableSavableGridConfig = {
    rowHeight: 30,
    cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
};

const MySortableSavableGrid = sortableSavableGrid(config)(GridItem);

interface State {
    layouts: Layouts;
}

export default class SortableSavableGridExample extends React.Component<any, State> {

    constructor(props: any) {
        super(props);
        const layouts = emptyNormalizedLayouts(); // Start with empty layouts.
        this.state = {
            layouts
        };
    }

    private addItem = () => {
        this.setState({
            layouts: appendLayout(this.state.layouts, randomLayout),
        });
    };

    private resetLayout = () => {
        this.setState({layouts: normalizedLayoutsOf(() => [])});
    };

    private onLayoutChange = (layout: Layout, layouts: Layouts) => {
        this.setState({layouts});
        saveToLS("layouts", layouts);
    };

    private removeItem = (key: string) => {
        this.setState({
            layouts: removeLayoutByKey(this.state.layouts, key)
        });
    };

    componentDidMount() {
        getSavedLayouts.then(layouts => this.setState({
            layouts: normalizeLayouts(layouts),
        }))
    }

    render() {
        return (
            <div>
                <button onClick={this.addItem}>Add</button>
                <button onClick={this.resetLayout}>Reset</button>
                <MySortableSavableGrid layouts={this.state.layouts}
                                       onRemoveItemClicked={this.removeItem}
                                       onLayoutChange={this.onLayoutChange}/>
            </div>
        );
    }
}
