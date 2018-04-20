import * as React from 'react';
import Header from "../../header/header";
import * as styles from './workspaces-page.scss';

export default class WorkspacesPage extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <Header title="Workspaces"/>
                Workspaces...
            </div>
        );
    }
}