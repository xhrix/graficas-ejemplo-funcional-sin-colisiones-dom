import * as React from 'react';
import * as styles from './editor-modal.scss';
import WorkspaceCategory from "../../models/workspace-category";
import ChartMeta from "../../models/chart-meta";
import * as $ from 'jquery';
import {observable} from "mobx";
import {observer} from "mobx-react";

interface EditorModalProps {
    workspaceCategories: WorkspaceCategory[];
    onCategoryClick: (category: WorkspaceCategory) => void;
    selectedCategory?: WorkspaceCategory;
    isChartSelected: (chartMeta: ChartMeta) => boolean;
    onChartClick: (chartMeta: ChartMeta) => void;
    shown: boolean;
    onCloseClick: () => void;
}

@observer
export default class EditorModal extends React.Component<EditorModalProps> {

    private carrets: HTMLDivElement | null;

    @observable
    private search = '';

    @observable
    private graphicsSearch = '';

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
        if (!selectedCategory) return <div className={`styles.content`}/>;

        const search = this.graphicsSearch.toLocaleLowerCase();
        const filteredCharts = search === '' ? selectedCategory.charts : selectedCategory.charts.filter(x => x.name.toLocaleLowerCase().indexOf(search) !== -1);

        return (
            <ul className={styles.list}>
                {!selectedCategory.charts.length ? (
                    <li className={styles.listItem}>
                        <span className={styles.listItemText}>No hay gráficos para esta categoría</span>
                    </li>
                ) : filteredCharts.map(chart => (
                    <li
                        key={`ws-cat-chart-${chart.chartGUID}`}
                        className={styles.listItem}
                        onClick={() => onChartClick(chart)}
                    >
                        <span
                            className={isChartSelected(chart) ? styles.selectIndicatorActive : styles.selectIndicator}/>
                        <span className={styles.listItemImage} style={{backgroundImage: `url(${chart.thumbnailUrl})`}}/>
                        <span className={styles.listItemText}>{chart.name}</span>
                    </li>
                ))}
            </ul>
        );
    }

    private categories() {
        const {workspaceCategories} = this.props;

        const search = this.search.toLocaleLowerCase();
        const filteredCategories = search === '' ? workspaceCategories : workspaceCategories.filter(x => x.name.toLocaleLowerCase().indexOf(search) !== -1);

        return (
            <ul className={styles.list}>
                {filteredCategories.map(cat => (
                    <li
                        key={`ws-cat-${cat.id}`}
                        className={styles.listItem}
                        onClick={() => this.onCategoryClick(cat)}>
                        <span className={styles.listItemImage} style={{backgroundImage: `url(${cat.thumbnailUrl})`}}/>
                        <span className={styles.listItemText}>{cat.name}</span>
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
                <div className={`${styles.container} ${shown ? `styles.shown` : ''}`}>

                    {/*Row 1: Context arrow*/}
                    <div className={`${styles.rowContextArrow}`}>
                        <span className={`${`styles.triangle`}`}/>
                    </div>


                    {/*Row 2: Body*/}
                    <div ref={x => this.carrets = x} className={`${`styles.carets`} ${styles.rowBody}`}>

                        {/*First caret*/}
                        <div className={styles.caret}>

                            {/*Row 2.1: Body Header*/}
                            <div className={styles.rowBodyHeader}>
                                <span className={styles.rowBodyHeaderTitle}>Categorías</span>
                            </div>

                            {/*Row 2.2: Body Content*/}
                            <div className={styles.rowBodyContent}>
                                {this.categories()}
                            </div>

                            {/*Row 2.3: Body Search*/}
                            <div className={styles.rowBodySearch}>
                                <input value={this.search} onChange={e => this.search = e.currentTarget.value}
                                       type="text" placeholder={`Buscar...`}/>
                            </div>
                        </div>

                        {/*Second caret*/}
                        <div className={styles.caret}>

                            {/*Row 2.1: Body Header*/}
                            <div className={styles.rowBodyHeader}>
                                <a onClick={e => e.preventDefault() || this.onBackToCategoriesClick()}
                                   className={styles.rowBodyHeaderBackButton}>
                                    <i className="material-icons">arrow_back</i>
                                </a>
                                <span className={styles.rowBodyHeaderTitle}>Indicadores</span>
                            </div>

                            {/*Row 2.2: Body Content*/}
                            <div className={styles.rowBodyContent}>
                                {this.graphics()}
                            </div>

                            {/*Row 2.3: Body Search*/}
                            <div className={styles.rowBodySearch}>
                                <input value={this.graphicsSearch}
                                       onChange={e => this.graphicsSearch = e.currentTarget.value}
                                       type="text" placeholder={`Buscar...`}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}