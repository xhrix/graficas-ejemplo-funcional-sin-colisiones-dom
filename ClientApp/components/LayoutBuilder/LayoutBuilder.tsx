import * as React from 'react';
import {arrayMove, SortableContainer, SortableElement} from 'react-sortable-hoc';
import * as styles from './LayoutBuilder.scss';
import ChartsService from "../../services/ChartsService";

const SortableItem = SortableElement<{ value: string }>(({value}) => (
    <li className={styles.gridItem}>
        <span className={styles.handle}/>
        <iframe src={value}/>
    </li>
));

const SortableList = SortableContainer<{ items: string[] }>(({items}) => {
    return (
        <ul className={styles.grid}>
            {(items).map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value}/>
            ))}
        </ul>
    );
});

class SortableComponent extends React.Component {
    async componentDidMount() {
        this.setState({
            items: [...await ChartsService.getAvailableCharts()]
        });
    }

    state = {
        items: [],
    };

    onSortEnd = ({oldIndex, newIndex}: any) => {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex),
        });
    };

    render() {
        return <SortableList axis={'xy'} items={this.state.items} onSortEnd={this.onSortEnd}/>;
    }
}


interface Props {
    id?: number;
}

export default class LayoutBuilder extends React.Component<Props> {
    public render() {
        return (
            <div className={styles.container}>
                <SortableComponent/>
            </div>
        );
    }
}