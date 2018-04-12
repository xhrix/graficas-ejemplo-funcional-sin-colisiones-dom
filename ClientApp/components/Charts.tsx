import * as React from 'react';
import {arrayMove, SortableContainer, SortableElement} from 'react-sortable-hoc';
import * as styles from './Charts.scss';

const SortableItem = SortableElement<{ value: string }>(({value}) => <li>{value}</li>);

const SortableList = SortableContainer<{ items: string[] }>(({items}) => {
    return (
        <ul>
            {(items).map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value}/>
            ))}
        </ul>
    );
});

class SortableComponent extends React.Component {
    state = {
        items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
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

export class Charts extends React.Component<Props> {
    public render() {
        return <SortableComponent/>;
    }
}
