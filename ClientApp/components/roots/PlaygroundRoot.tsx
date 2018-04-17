import * as React from 'react';
import {RouteComponentProps} from "react-router";
import SortableSavableGridExample from "../playground/react-grid-layout/SortableSavableGridExample";

interface MatchProps {

}

const PlaygroundRoot = ({match}: RouteComponentProps<MatchProps>) => (
    <SortableSavableGridExample/>
);

export default PlaygroundRoot;
