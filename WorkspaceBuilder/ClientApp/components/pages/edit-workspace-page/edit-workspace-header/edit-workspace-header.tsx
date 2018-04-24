import * as React from 'react';
import * as styles from './edit-workspace-header.scss';
import * as headerStyles from '../../../header/header.scss';

const EditWorkspaceHeader = ({title, onAddClick}: { title: string, onAddClick: () => void }) => <header
    className={headerStyles.container}>
    <ul className={styles.actions}/>
    <span className={styles.titleText}>{title}</span>
    <ul className={styles.actions}>
        <li>
            <a className={styles.action} onClick={e => e.preventDefault() || onAddClick()}>
                <i className="material-icons">add</i>
            </a>
        </li>
    </ul>
</header>;

export default EditWorkspaceHeader;