import * as React from 'react';
import {RouteComponentProps} from "react-router";

interface MatchProps {
}

const PlaygroundRoot = ({match}: RouteComponentProps<MatchProps>) => (
    <div>
        Playground
    </div>
);

export default PlaygroundRoot;