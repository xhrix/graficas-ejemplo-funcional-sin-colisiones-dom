import * as React from 'react';
import * as styles from './editor-modal.scss';

export default class EditorModal
    extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <span className={styles.triangle}/>
                <div className={styles.header}>
                    <div className={styles.title}>Categorías</div>
                </div>

                <ul className={styles.content}>
                    <li className={styles.item}><span className={styles.image}/><span className={styles.text}>Workstation Depalletizer</span></li>
                    <li className={styles.item}><span className={styles.image}/><span className={styles.text}>Workstation Depalletizer</span></li>
                    <li className={styles.item}><span className={styles.image}/><span className={styles.text}>Workstation Depalletizer</span></li>
                    <li className={styles.item}><span className={styles.image}/><span className={styles.text}>Workstation Depalletizer</span></li>
                    <li className={styles.item}><span className={styles.image}/><span className={styles.text}>Workstation Depalletizer</span></li>
                    <li className={styles.item}><span className={styles.image}/><span className={styles.text}>Workstation Depalletizer</span></li>
                    <li className={styles.item}><span className={styles.image}/><span className={styles.text}>Workstation Depalletizer</span></li>
                    <li className={styles.item}><span className={styles.image}/><span className={styles.text}>Workstation Depalletizer</span></li>
                    <li className={styles.item}><span className={styles.image}/><span className={styles.text}>Workstation Depalletizer</span></li>
                    <li className={styles.item}><span className={styles.image}/><span className={styles.text}>Workstation Depalletizer</span></li>
                    <li className={styles.item}><span className={styles.image}/><span className={styles.text}>Workstation Depalletizer</span></li>
                    <li className={styles.item}><span className={styles.image}/><span className={styles.text}>Workstation Depalletizer</span></li>
                </ul>
            </div>
        );
    }
}