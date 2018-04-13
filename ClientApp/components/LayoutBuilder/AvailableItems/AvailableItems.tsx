import * as React from 'react';
import ChartsService from "../../../services/ChartsService";
import LayoutBuilderService from "../../../services/LayoutBuilderService";
import {observer} from "mobx-react";
import * as styles from './AvailableItems.scss';

@observer
export default class AvailableItems extends React.Component {

    async componentDidMount() {
        this.setState({
            items: [...await ChartsService.getAvailableCharts()]
        });
    }

    state = {
        items: [] as string[],
    };

    render() {
        const l = LayoutBuilderService.Instance;
        return (
            <div className="AvailableItems">

                <ul className={styles.previews}>
                    {this.state.items.map((x, i) => (
                        <li className={styles.preview} key={`available-item-${i}`}>
                            <label>
                                <input type='checkbox'
                                       checked={l.isSelected(x)}
                                       onChange={() => l.toggleSelection(x)}
                                />
                                <span className={styles.previewImg} style={{backgroundImage: `url('${x}')`}}/>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}