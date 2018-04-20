import * as React from 'react';
import {RouteComponentProps} from "react-router";
import WorkspacesPage from "../pages/workspaces/workspaces-page";

interface MatchProps {
}

const WorkspacesRoot = ({match}: RouteComponentProps<MatchProps>) => (
    <WorkspacesPage/>
);

export default WorkspacesRoot;