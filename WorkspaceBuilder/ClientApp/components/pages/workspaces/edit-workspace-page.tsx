import * as React from 'react';
import * as styles from './workspaces-page.scss';
import EditWorkspaceHeader from "./edit-workspace-header/edit-workspace-header";
import EditorModal from "../../editor-modal/editor-modal";

interface EditWorkspacePageProps {
    workspaceId: number;
}

export default class EditWorkspacePage extends React.Component<EditWorkspacePageProps> {
    render() {
        const {workspaceId} = this.props;
        return (
            <div className={styles.container}>
                <EditWorkspaceHeader title={`Edit Workspace ${workspaceId}`}/>
                <EditorModal/>
            </div>
        );
    }
}