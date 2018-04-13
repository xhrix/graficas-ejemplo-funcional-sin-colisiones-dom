import * as React from 'react';
import ChartsService from "../../../services/ChartsService";
import LayoutBuilderService from "../../../services/LayoutBuilderService";
import {observer} from "mobx-react";

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

                <ul>
                    {this.state.items.map((x, i) => (
                        <li key={`available-item-${i}`}>
                            <label>
                                {x}
                                <input type='checkbox'
                                       checked={l.isSelected(x)}
                                       onChange={() => l.toggleSelection(x)}
                                />
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}