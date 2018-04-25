import * as React from 'react';
import * as styles from './edit-workspace-header.scss';
import * as headerStyles from '../../../header/header.scss';

const EditWorkspaceHeader = ({title, onEditClick}: { title: string, onEditClick: () => void }) => <header
    className={headerStyles.container}>
    <ul className={styles.actions}/>
    <span className={styles.titleText}>{title}</span>
    <ul className={styles.actions}>
        <li>
            <a className={styles.action} onClick={e => e.preventDefault() || onEditClick()}>
                <i className="material-icons">edit</i>
            </a>
        </li>
    </ul>
</header>;

export default EditWorkspaceHeader;