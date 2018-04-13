import * as React from 'react';
import * as styles from './LayoutBuilder.scss';
import AvailableItems from "./AvailableItems/AvailableItems";
import SortableComponent from "./SortableComponent";
import GraphsCanvas from "./GraphsCanvas";

interface Props {
    id?: number;
}

export default class LayoutBuilder extends React.Component<Props> {
    public render() {
        return (
            <div className={styles.container}>
                <AvailableItems/>
                <SortableComponent/>
                <GraphsCanvas/>
            </div>
        );
    }
}