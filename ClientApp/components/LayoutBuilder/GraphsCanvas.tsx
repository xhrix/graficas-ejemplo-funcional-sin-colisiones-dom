import * as React from 'react';
import * as ReactGridLayout from 'react-grid-layout';
import * as styles from './GraphsCanvas.scss';
import {Layout} from "react-grid-layout";
import {observer} from "mobx-react";
import LayoutBuilderService from "../../services/LayoutBuilderService";

@observer
export default class GraphsCanvas extends React.Component {
    private readonly layoutBuilderService = LayoutBuilderService.Instance;

    render() {
        const charts = this.layoutBuilderService.selectedCharts;
        const layout: Layout[] = charts.map((x, i) => ({
            i: `resizable-${x.url}`, x: i, y: 0, w: 1, h: 1
        }));
        return (
            <ReactGridLayout className={'layout'} layout={layout} cols={12} rowHeight={90} width={1200}>
                {charts.map(x => (
                    <div className={styles.item} key={`resizable-${x.url}`}>
                        <div className={styles.itemWrapper}>
                            <span className={styles.prevImg} style={{backgroundImage: `url('${x.thumbnailUrl}')`}}/>
                        </div>
                    </div>
                ))}
            </ReactGridLayout>
        );
    }
}