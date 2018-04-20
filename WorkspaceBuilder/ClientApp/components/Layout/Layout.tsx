import * as React from 'react';
import * as styles from './Layout.scss';
import Header from "../header/header";

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div className={styles.container}>
            <Header title={'Demo - Layout builder'}/>
            {/*{this.props.children}*/}
        </div>;
    }
}
