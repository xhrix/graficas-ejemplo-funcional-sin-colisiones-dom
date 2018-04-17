import * as React from 'react';
import {RouteComponentProps} from "react-router";
import {
    Config,
    InjectedSortableSavableGridProps,
    sortableSavableGrid,
    SortableSavableGridApi
} from "../playground/react-grid-layout/SortableSavableGrid";
import {Layouts} from "react-grid-layout";
import * as styles from './PlaygroundRoot.scss';

interface GridItemProps extends InjectedSortableSavableGridProps {

}

class GridItem extends React.Component<GridItemProps> {
    render() {
        return (
            <div className={styles.item}>
                {this.props.layout.i}
                <span className={styles.closeBtn} onClick={() => grid.removeItem(this.props.layout.i || '')}>x</span>
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

const config: Config = {
    getSavedLayouts,
    onLayoutChange: (layout, layouts) => saveToLS("layouts", layouts),
    rowHeight: 30,
    cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
};

const MySortableSavableGrid = sortableSavableGrid(config)(GridItem);

interface MatchProps {
}

let grid: SortableSavableGridApi;

const PlaygroundRoot = ({match}: RouteComponentProps<MatchProps>) => (
    <div>
        <button className={styles.cuteButton} onClick={() => grid.addItem()}>Add</button>
        <button className={styles.cuteButton} onClick={() => grid.resetLayout()}>Reset</button>
        <MySortableSavableGrid ref={(ref: SortableSavableGridApi) => grid = ref}/>
    </div>
);

export default PlaygroundRoot;
