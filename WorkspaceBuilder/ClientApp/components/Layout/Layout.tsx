import * as React from 'react';
import * as styles from './Layout.scss';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div className={styles.container}>
            {this.props.children}
        </div>;
    }
}
