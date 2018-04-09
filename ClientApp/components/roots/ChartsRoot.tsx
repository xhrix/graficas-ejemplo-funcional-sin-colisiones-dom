import * as React from 'react';
import {RouteComponentProps} from "react-router";
import {ChartA} from "../Charts/ChartA";
import {ChartB} from "../Charts/ChartB";
import {Charts} from "../Charts";

interface MatchProps {
    id?: number;
}

const WhatChart = (id?: number) => {
    switch (id) {
        case 1:
            return <ChartA data={{title: 'Chart A'}}/>;
        case 2:
            return <ChartB data={{title: 'Chart B'}}/>;
        default:
            return <div>Not found</div>;
    }
};

const ChartsRoot = ({match}: RouteComponentProps<MatchProps>) => (

    match.params.id ? WhatChart(+match.params.id) : <Charts/>
);

export default ChartsRoot;