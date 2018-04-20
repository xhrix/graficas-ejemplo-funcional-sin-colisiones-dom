import * as React from 'react';
import * as styles from './workspace-preview.scss';
import Workspace from "../../models/workspace";

const WorkspacePreview = ({workspace}: { workspace: Workspace }) => (
    <div className={styles.container}>
        <span className={styles.previewImg} style={{backgroundImage: `url(${workspace.previewUrl})`}}/>
        <div className={styles.name}>{workspace.name}</div>
    </div>
);

export default WorkspacePreview;