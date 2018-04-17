import * as React from 'react';
import {
    SortableSavableGridConfig,
    InjectedSortableSavableGridProps,
    sortableSavableGrid,
    SortableSavableGridApi
} from "./SortableSavableGrid";
import {Layouts} from "react-grid-layout";

const styles: any = {
    ctn: {background: 'gainsboro', height: '100%', width: '100%'},
    closeBtn: {position: 'absolute', right: '2px', top: '0', cursor: 'pointer'},
};

interface GridItemProps extends InjectedSortableSavableGridProps {

}

class GridItem extends React.Component<GridItemProps> {
    render() {
        return (
            <div style={styles.ctn}>
                {this.props.layout.i}
                <span style={styles.closeBtn} onClick={() => grid.removeItem(this.props.layout.i || '')}>x</span>
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
    getSavedLayouts,
    onLayoutChange: (layout, layouts) => saveToLS("layouts", layouts),
    rowHeight: 30,
    cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
};

const MySortableSavableGrid = sortableSavableGrid(config)(GridItem);

let grid: SortableSavableGridApi;

const SortableSavableGridExample = () => (
    <div>
        <button onClick={() => grid.addItem()}>Add</button>
        <button onClick={() => grid.resetLayout()}>Reset</button>
        <MySortableSavableGrid ref={(ref: SortableSavableGridApi) => grid = ref}/>
    </div>
);

export default SortableSavableGridExample;
