import * as React from 'react';
import {RouteComponentProps} from "react-router";
import SortableSavableGridExample from "../../lib/components/react-sortable-savable-grid/SortableSavableGridExample";

interface MatchProps {

}

const PlaygroundRoot = ({match}: RouteComponentProps<MatchProps>) => (
    <SortableSavableGridExample/>
);

export default PlaygroundRoot;
