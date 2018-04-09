import * as React from 'react';
import {ChartA} from './Charts/ChartA';
import {ChartB} from './Charts/ChartB';

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
                    <div className={`col-sm xx-card ${single ? id == 1 ? 'xx-shown' : 'xx-hidden' : ''}`}>
                        <ChartA data={{title: 'Chart A'}}/>
                    </div>
                    <div className={`col-sm xx-card ${single ? id == 2 ? 'xx-shown' : 'xx-hidden' : ''}`}>
                        <ChartB data={{title: 'Chart B'}}/>
                    </div>
                </div>
            </div>
        </div>;
    }
}
