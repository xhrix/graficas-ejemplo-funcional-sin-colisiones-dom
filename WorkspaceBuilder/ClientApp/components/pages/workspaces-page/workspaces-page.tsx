import * as React from 'react';
import Header from "../../header/header";
import * as styles from './workspaces-page.scss';
import * as mainButtonStyle from '../../styles/buttons/main-action-button.scss';
import {WorkspaceMocks} from "../../../mocks/workspace-mocks";
import WorkspacePreview from "../../workspace-preview/workspace-preview";

const workspaces = WorkspaceMocks;

export default class WorkspacesPage extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <Header title="Workspaces"/>
                <div className={styles.workspaces}>
                    {workspaces.map(workspace =>
                        <WorkspacePreview key={`work-space-${workspace.id}`} workspace={workspace}/>)}
                </div>

                <button className={mainButtonStyle.container} type="button">
                    <i className="material-icons">add</i>
                </button>
            </div>
        );
    }
}