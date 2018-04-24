import * as React from 'react';
import * as styles from './editor-modal.scss';
import WorkspaceCategory from "../../models/workspace-category";
import ChartMeta from "../../models/chart-meta";
import * as $ from 'jquery';

interface EditorModalProps {
    workspaceCategories: WorkspaceCategory[];
    onCategoryClick: (category: WorkspaceCategory) => void;
    selectedCategory?: WorkspaceCategory;
    isChartSelected: (chartMeta: ChartMeta) => boolean;
    onChartClick: (chartMeta: ChartMeta) => void;
    shown: boolean;
    onCloseClick: () => void;
}

export default class EditorModal extends React.Component<EditorModalProps> {

    private carrets: HTMLDivElement | null;

    private onCategoryClick = (category: WorkspaceCategory) => {
        this.props.onCategoryClick(category);
        if (this.carrets) {
            $(this.carrets).stop().animate({scrollLeft: this.carrets.offsetWidth}, 120, 'swing');
        }
    };

    private onBackToCategoriesClick = () => {
        if (this.carrets) {
            $(this.carrets).stop().animate({scrollLeft: 0}, 120, 'swing');
        }
    };

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
                                <span className={styles.image} style={{backgroundImage: `url(${chart.thumbnailUrl})`}}/>
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
                    <li
                        key={`ws-cat-${cat.id}`}
                        className={styles.item}
                        onClick={() => this.onCategoryClick(cat)}>
                        <span className={styles.image} style={{backgroundImage: `url(${cat.thumbnailUrl})`}}/>
                        <span className={styles.text}>{cat.name}</span>
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        const {shown, onCloseClick} = this.props;

        if (!shown) return null;

        return (
            <div>
                {shown ? <div className={styles.fade} onClick={() => onCloseClick()}/> : null}
                <div className={`${styles.container} ${shown ? styles.shown : ''}`}>
                    <span className={styles.triangle}/>

                    <div className={styles.commonHeader}/>

                    <div ref={x => this.carrets = x} className={styles.carets}>
                        <div className={styles.caret}>
                            <div className={styles.header}>
                                <div className={styles.title}>Categorías</div>
                            </div>
                            <input className={styles.searchInput} type="text" placeholder={`Buscar...`}/>
                            {this.categories()}
                        </div>

                        <div className={styles.caret}>
                            <div className={styles.header}>
                                <a onClick={e => e.preventDefault() || this.onBackToCategoriesClick()}
                                   className={styles.backButton}>
                                    <i className="material-icons">arrow_back</i>
                                </a>
                                <div className={styles.title}>Indicadores</div>
                            </div>
                            {this.graphics()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}