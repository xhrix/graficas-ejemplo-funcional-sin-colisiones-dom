import * as React from 'react';
import Header from "../../header/header";
import * as styles from './workspaces-page.scss';
import {WorkspaceMocks} from "../../../mocks/workspace-mocks";
import Workspace from "../../../models/workspace";

const workspaces = WorkspaceMocks;

const WorkspaceComponent = ({workspace}: { workspace: Workspace }) => (
    <div>
        {workspace.id}
        <br/>
        {workspace.name}
    </div>
);

export default class WorkspacesPage extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <Header title="Workspaces"/>
                {workspaces.map(workspace =>
                    <WorkspaceComponent key={`work-space-${workspace.id}`} workspace={workspace}/>)}
            </div>
        );
    }
}