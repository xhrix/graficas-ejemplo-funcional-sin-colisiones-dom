import * as React from 'react';
import * as styles from './editor-modal.scss';
import WorkspaceCategory from "../../models/workspace-category";
import ChartMeta from "../../models/chart-meta";

interface EditorModalProps {
    workspaceCategories: WorkspaceCategory[];
    onCategoryClick: (category: WorkspaceCategory) => void;
    selectedCategory?: WorkspaceCategory;
    isChartSelected: (chartMeta: ChartMeta) => boolean;
    onChartClick: (chartMeta: ChartMeta) => void;
}

export default class EditorModal extends React.Component<EditorModalProps> {

    private graphics() {
        const {selectedCategory, isChartSelected, onChartClick} = this.props;
        if (!selectedCategory) return <div className={styles.content}/>;

        return (
            <ul className={styles.content}>
                {!selectedCategory.charts.length ? (
                    <li className={styles.item}>
                        <span className={styles.text}>No hay gráficos para esta categoría</span>
                    </li>
                ) : selectedCategory.charts.map(chart => (
                    <li
                        key={`ws-cat-chart-${chart.chartGUID}`}
                        className={styles.item}
                        onClick={() => onChartClick(chart)}
                    >
                        <div className={styles.chartItem}>
                            <div className={styles.chartItemInfo}>
                                <span className={styles.image}/>
                                <span className={styles.text}>{chart.name}</span>
                            </div>
                            <span
                                className={`${styles.selectIndicator} ${isChartSelected(chart) ? styles.active : ''}`}/>
                        </div>
                    </li>
                ))}
            </ul>
        );
    }

    private categories() {
        const {workspaceCategories, onCategoryClick} = this.props;

        return (
            <ul className={styles.content}>
                {workspaceCategories.map(cat => (
                    <li key={`ws-cat-${cat.id}`} className={styles.item}
                        onClick={() => onCategoryClick(cat)}>
                        <span className={styles.image}/>
                        <span className={styles.text}>{cat.name}</span>
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (
            <div className={styles.container}>
                <span className={styles.triangle}/>

                <div className={styles.commonHeader}/>

                <div className={styles.carets}>
                    <div className={styles.caret}>
                        <div className={styles.header}>
                            <div className={styles.title}>Categorías</div>
                        </div>
                        {this.categories()}
                    </div>

                    <div className={styles.caret}>
                        <div className={styles.header}>
                            <div className={styles.title}>Indicadores</div>
                        </div>
                        {this.graphics()}
                    </div>
                </div>
            </div>
        );
    }
}