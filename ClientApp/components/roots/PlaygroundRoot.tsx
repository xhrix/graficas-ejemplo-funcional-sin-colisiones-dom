import * as React from 'react';
import {RouteComponentProps} from "react-router";
import * as ReactGridLayout from 'react-grid-layout';
import * as styles from './PlaygroundRoot.scss';
import ResponsiveLocalStorageLayout from "./LayoutLocalStorage";

// layout is an array of objects, see the demo for more complete usage
const layout = [
    {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
    {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
    {i: 'c', x: 4, y: 0, w: 1, h: 2}
];


class MyFirstGrid extends React.Component {
    render() {
        return (
            <ReactGridLayout className={'layout'} layout={layout} cols={12} rowHeight={30} width={1200}>
                <div className={styles.item} key={'a'}>a</div>
                <div className={styles.item} key={'b'}>b</div>
                <div className={styles.item} key={'c'}>c</div>
            </ReactGridLayout>
        );
    }
}


interface MatchProps {
}

const PlaygroundRoot = ({match}: RouteComponentProps<MatchProps>) => (
    <div>
        {/*<AddRemoveLayout/>*/}
        {/*<ShowcaseLayout/>*/}
        <ResponsiveLocalStorageLayout/>
    </div>
);

export default PlaygroundRoot;
