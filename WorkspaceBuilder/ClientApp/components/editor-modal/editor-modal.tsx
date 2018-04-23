import * as React from 'react';
import * as styles from './editor-modal.scss';
import WorkspaceCategory from "../../models/workspace-category";

interface EditorModalProps {
    workspaceCategories: WorkspaceCategory[];
}

export default class EditorModal extends React.Component<EditorModalProps> {
    render() {
        const {workspaceCategories} = this.props;

        return (
            <div className={styles.container}>
                <span className={styles.triangle}/>

                <div className={styles.commonHeader}/>

                <div className={styles.carets}>
                    <div className={styles.caret}>
                        <div className={styles.header}>
                            <div className={styles.title}>Categorías</div>
                        </div>

                        <ul className={styles.content}>
                            {workspaceCategories.map(cat => (
                                <li key={`ws-cat-${cat.id}`} className={styles.item}>
                                    <span className={styles.image}/>
                                    <span className={styles.text}>{cat.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.caret}>
                        <div className={styles.header}>
                            <div className={styles.title}>Indicadores</div>
                        </div>

                        <ul className={styles.content}>
                            {workspaceCategories.map(cat => (
                                <li key={`ws-subcat-${cat.id}`} className={styles.item}>
                                    <span className={styles.image}/>
                                    <span className={styles.text}>{cat.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}