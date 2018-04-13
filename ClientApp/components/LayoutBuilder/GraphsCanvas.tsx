import * as React from 'react';
import * as ReactGridLayout from 'react-grid-layout';
import * as styles from './GraphsCanvas.scss';
import {Layout} from "react-grid-layout";

const layout: Layout[] = [
    {i: 'a', x: 0, y: 0, w: 1, h: 1},
    {i: 'b', x: 1, y: 0, w: 1, h: 1},
    {i: 'c', x: 2, y: 0, w: 1, h: 1},
    {i: 'd', x: 3, y: 0, w: 1, h: 1},
];


export default class GraphsCanvas extends React.Component {
    render() {
        return (
            <ReactGridLayout className={'layout'} layout={layout} cols={12} rowHeight={90} width={1200}>
                <div className={styles.item} key={'a'}>a</div>
                <div className={styles.item} key={'b'}>b</div>
                <div className={styles.item} key={'c'}>c</div>
                <div className={styles.item} key={'d'}>d</div>
            </ReactGridLayout>
        );
    }
}