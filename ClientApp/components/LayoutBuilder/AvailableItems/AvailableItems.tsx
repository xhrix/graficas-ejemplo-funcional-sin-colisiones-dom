import * as React from 'react';
import ChartsService from "../../../services/ChartsService";

export default class AvailableItems extends React.Component {

    async componentDidMount() {
        this.setState({
            items: [...await ChartsService.getAvailableCharts()]
        });
    }

    state = {
        items: [],
    };

    render() {
        return (
            <div className="AvailableItems">

                <ul>
                    {this.state.items.map((x, i) => (
                        <li key={`available-item-${i}`}>{x}</li>
                    ))}
                </ul>
            </div>
        );
    }
}