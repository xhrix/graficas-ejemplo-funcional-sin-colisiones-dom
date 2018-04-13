import {arrayMove, SortableContainer, SortableElement} from "react-sortable-hoc";
import ChartMeta from "../../models/ChartMeta";
import * as styles from "./LayoutBuilder.scss";
import {observer} from "mobx-react";
import * as React from "react";
import LayoutBuilderService from "../../services/LayoutBuilderService";


const SortableItem = SortableElement<{ value: ChartMeta }>(({value}) => (
    <li className={styles.gridItem}>
        <span className={styles.handle}/>
        <iframe src={value.url}/>
    </li>
));

const SortableList = SortableContainer<{ items: ChartMeta[] }>(({items}) => {
    return (
        <ul className={styles.grid}>
            {(items).map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value}/>
            ))}
        </ul>
    );
});

@observer
export default class SortableComponent extends React.Component {

    private readonly layoutBuilderService = LayoutBuilderService.Instance;

    onSortEnd = ({oldIndex, newIndex}: any) => {
        this.layoutBuilderService.selectedCharts = arrayMove(this.layoutBuilderService.selectedCharts, oldIndex, newIndex);
    };

    render() {
        return <SortableList axis={'xy'} items={this.layoutBuilderService.selectedCharts} onSortEnd={this.onSortEnd}/>;
    }
}