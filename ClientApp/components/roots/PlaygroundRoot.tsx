import * as React from 'react';
import {RouteComponentProps} from "react-router";
import {Config, sortableSavableGrid, SortableSavableGridApi} from "../playground/react-grid-layout/SortableSavableGrid";
import {Layouts} from "react-grid-layout";
import * as styles from './PlaygroundRoot.scss';

class GridItem extends React.Component {
    render() {
        return (
            <span className="text">ELEMENTO</span>
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

const MyGrid = sortableSavableGrid(config)(GridItem);

interface MatchProps {
}

let grid: SortableSavableGridApi;

const PlaygroundRoot = ({match}: RouteComponentProps<MatchProps>) => (
    <div>
        <button
            className={styles.cuteButton}
            onClick={() => grid.addItem()}
        >
            Add
        </button>
        <MyGrid ref={(ref: SortableSavableGridApi) => grid = ref}/>
    </div>
);

export default PlaygroundRoot;
