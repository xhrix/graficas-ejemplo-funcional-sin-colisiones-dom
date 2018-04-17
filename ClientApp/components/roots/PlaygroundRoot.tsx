import * as React from 'react';
import {RouteComponentProps} from "react-router";
import SortableSavableGridIFrames from "../playground/react-grid-layout/SortableSavableGridIFrames";

interface MatchProps {

}

const PlaygroundRoot = ({match}: RouteComponentProps<MatchProps>) => (
    <SortableSavableGridIFrames/>
);

export default PlaygroundRoot;
