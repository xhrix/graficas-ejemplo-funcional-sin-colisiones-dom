import * as React from 'react';
import {RouteComponentProps} from "react-router";
import {SortableSaveableGridHOC} from "../playground/react-grid-layout/SortableSaveableGridHOC";

class GridItem extends React.Component {
    render() {
        return (
            <span className="text">ELEMENTO</span>
        );
    }
}

const MyGrid = SortableSaveableGridHOC(GridItem);

interface MatchProps {
}

const PlaygroundRoot = ({match}: RouteComponentProps<MatchProps>) => (
    <div>
        <MyGrid/>
    </div>
);

export default PlaygroundRoot;
