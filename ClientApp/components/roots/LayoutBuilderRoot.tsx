import * as React from 'react';
import {RouteComponentProps} from "react-router";
import LayoutBuilder from "../LayoutBuilder/LayoutBuilder";

interface MatchProps {
}

const LayoutBuilderRoot = ({match}: RouteComponentProps<MatchProps>) => (
    <LayoutBuilder/>
);

export default LayoutBuilderRoot;