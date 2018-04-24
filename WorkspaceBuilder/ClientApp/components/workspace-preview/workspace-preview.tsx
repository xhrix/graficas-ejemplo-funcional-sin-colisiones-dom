import * as React from 'react';
import * as styles from './workspace-preview.scss';
import Workspace from "../../models/workspace";
import {Link} from "react-router-dom";
import Paths from "../routes/paths";

const WorkspacePreview = ({workspace}: { workspace: Workspace }) => (
    <Link to={Paths.editWorkspace(workspace.id)} className={styles.container}>
        <span className={styles.previewImg} style={{backgroundImage: `url(${workspace.thumbnailUrl})`}}/>
        <div className={styles.name}>{workspace.name}</div>
    </Link>
);

export default WorkspacePreview;