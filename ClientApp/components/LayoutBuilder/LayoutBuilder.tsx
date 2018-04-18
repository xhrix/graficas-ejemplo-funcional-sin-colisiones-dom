import * as React from 'react';
import * as styles from './LayoutBuilder.scss';
import ChartMeta from "../../models/ChartMeta";
import ChartsService from "../../services/ChartsService";
import * as availablesStyles from './AvailableItems/AvailableItems.scss';

interface Props {
}

interface State {
    availableCharts: ChartMeta[];
    selectedCharts: ChartMeta[];
}

export default class LayoutBuilder extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            availableCharts: [],
            selectedCharts: [],
        };
    }

    async componentDidMount() {
        this.setState({
            availableCharts: await ChartsService.getAvailableCharts()
        });
    }

    private isSelected = (value: ChartMeta) => {
        return !!(this.state.selectedCharts.find(x => value.url === x.url));
    };

    private toggleSelection = (value: ChartMeta) => {
        if (this.isSelected(value)) {
            this.setState({
                selectedCharts: this.state.selectedCharts.filter(x => x.url !== value.url)
            })
        } else {
            this.setState({
                selectedCharts: this.state.selectedCharts.concat([value])
            })
        }
    };


    public render() {
        return (
            <div className={styles.container}>
                <div className="AvailableItems">
                    <ul className={availablesStyles.previews}>
                        {this.state.availableCharts.map((x, i) => (
                            <li className={availablesStyles.preview} key={`available-item-${i}`}>
                                <label>
                                    <input type='checkbox'
                                           checked={this.isSelected(x)}
                                           onChange={() => this.toggleSelection(x)}
                                    />
                                    <span className={availablesStyles.previewImg}
                                          style={{backgroundImage: `url('${x.thumbnailUrl}')`}}>
                                    <span>{x.url}</span>
                                </span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}