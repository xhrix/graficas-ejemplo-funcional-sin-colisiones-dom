import * as React from 'react';
import Header from "../../header/header";
import * as styles from './workspaces-page.scss';

interface EditWorkspacePageProps {
    workspaceId: number;
}

export default class EditWorkspacePage extends React.Component<EditWorkspacePageProps> {
    render() {
        const {workspaceId} = this.props;
        return (
            <div className={styles.container}>
                <Header title={`Edit Workspace ${workspaceId}`}/>
            </div>
        );
    }
}