import * as React from 'react';
import {RouteComponentProps} from "react-router";
import EditWorkspacePage from "../pages/edit-workspace-page/edit-workspace-page";

interface MatchProps {
    id: number;
}

const EditWorkspaceRoot = ({match}: RouteComponentProps<MatchProps>) => (
    <EditWorkspacePage workspaceId={+match.params.id}/>
);

export default EditWorkspaceRoot;