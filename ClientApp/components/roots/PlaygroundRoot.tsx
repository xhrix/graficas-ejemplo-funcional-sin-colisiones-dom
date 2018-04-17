import * as React from 'react';
import {RouteComponentProps} from "react-router";
import {Config, sortableSavableGrid} from "../playground/react-grid-layout/SortableSavableGrid";
import {Layouts} from "react-grid-layout";

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

const getSavedLayouts: Promise<Layouts> = Promise.resolve(JSON.parse(JSON.stringify(getFromLS("layouts") || {})));

const config: Config = {
    getSavedLayouts
};

const MyGrid = sortableSavableGrid(config)(GridItem);

interface MatchProps {
}

const PlaygroundRoot = ({match}: RouteComponentProps<MatchProps>) => (
    <div>
        <MyGrid/>
    </div>
);

export default PlaygroundRoot;
