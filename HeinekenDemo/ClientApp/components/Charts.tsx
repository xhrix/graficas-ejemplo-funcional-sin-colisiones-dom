import * as React from 'react';
import {ChartA} from './Charts/ChartA';
import {ChartB} from './Charts/ChartB';
import {ChartC} from "./Charts/ChartC";
import {ChartD} from "./Charts/ChartD";
import {ChartE} from "./Charts/ChartE";
import * as styles from './Charts.scss';

interface Props {
    id?: number;
}

export class Charts extends React.Component<Props> {
    public render() {
        const {id} = this.props;
        const single = !!id;

        return <div>
            <div className="container">
                <div className="row">
                    <div className={`col-sm ${styles.chart} ${single ? id == 1 ? styles.chartShown : styles.chartHidden : ''}`}>
                        <ChartA data={{title: 'Chart A'}}/>
                    </div>
                    <div className={`col-sm ${styles.chart} ${single ? id == 2 ? styles.chartShown : styles.chartHidden : ''}`}>
                        <ChartB data={{title: 'Chart B'}}/>
                    </div>
                    <div className={`col-sm mt-4 ${styles.chart} ${single ? id == 3 ? styles.chartShown : styles.chartHidden : ''}`}>
                        <ChartC data={{title: 'Chart C'}}/>
                    </div>
                    <div className={`col-sm mt-4 ${styles.chart} ${single ? id == 4 ? styles.chartShown : styles.chartHidden : ''}`}>
                        <ChartD data={{title: 'Chart D'}}/>
                    </div>
                    <div className={`col-sm mt-4 ${styles.chart} ${single ? id == 5 ? styles.chartShown : styles.chartHidden : ''}`}>
                        <ChartE data={{title: 'Chart E'}}/>
                    </div>
                </div>
            </div>
        </div>;
    }
}
