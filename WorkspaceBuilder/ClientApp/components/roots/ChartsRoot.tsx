import * as React from 'react';
import {RouteComponentProps} from "react-router";
import {Charts} from "../Charts";

interface MatchProps {
    id?: number;
}

const ChartsRoot = ({match}: RouteComponentProps<MatchProps>) => (
    <Charts id={match.params.id}/>
);

export default ChartsRoot;