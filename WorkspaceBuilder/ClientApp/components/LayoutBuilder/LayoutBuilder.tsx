import * as React from 'react';
import * as styles from './LayoutBuilder.scss';
import ChartMeta from "../../models/ChartMeta";
import ChartsService from "../../services/ChartsService";
import * as availablesStyles from './AvailableItems/AvailableItems.scss';
import {
    appendLayout,
    emptyNormalizedLayouts,
    removeLayoutByKey
} from "../../lib/components/react-sortable-savable-grid/ReactGridLayoutUtil";
import {Breakpoints, Layout, Layouts, Responsive, WidthProvider} from "react-grid-layout";
import * as uuid from 'uuid/v4';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface Props {
}

interface State {
    availableCharts: ChartMeta[];
    selectedCharts: ChartMeta[];
    layouts: Layouts;
    breakpoint: Breakpoints;
}

export default class LayoutBuilder extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            availableCharts: [],
            selectedCharts: [],
            layouts: emptyNormalizedLayouts(), // Start with empty layouts.
            breakpoint: 'lg', // Any default starting breakpoint, it will be properly updated at render-time.
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
            // Remove
            this.removeGridItemByChartMetaOnly(value);
        } else {
            // Add
            const newLayout = {i: "grid-item-" + uuid(), x: 0, y: 0, w: 3, h: 10} as Layout;
            this.setState({
                selectedCharts: this.state.selectedCharts.concat([value]),
                layouts: appendLayout(this.state.layouts, () => newLayout),
            });
        }
    };

    private removeGridItemByChartMetaOnly = (chartMeta: ChartMeta) => {
        const indexInSelectedCharts = this.state.selectedCharts.findIndex(x => x.chartGUID === chartMeta.chartGUID);
        const layout = this.state.layouts.xs ? this.state.layouts.xs[indexInSelectedCharts] : null;
        if (!layout) throw new Error(`Charts and Layouts don't match anymore.`);
        const layouts = removeLayoutByKey(this.state.layouts, layout.i || '');
        const selectedCharts = this.state.selectedCharts.filter(x => x.chartGUID !== chartMeta.chartGUID);
        this.setState({selectedCharts, layouts});
    };

    private onLayoutChange = (layout: Layout, layouts: Layouts) => {
        this.setState({layouts});
        // saveToLS("layouts", layouts);
    };

    onBreakpointChange = (breakpoint: Breakpoints, cols: number) => {
        this.setState({breakpoint});
    };

    private gridItem = (layout: Layout, index: number) => {
        const chartMeta = this.state.selectedCharts.length > index ? this.state.selectedCharts[index] : null;

        if (!chartMeta) {
            throw new Error(`Charts and Layouts don't match anymore.`);
        }

        return <div key={layout.i} data-grid={layout}>
            <GridItem layout={layout} chartMeta={chartMeta}
                      onRemoveChartMeta={this.removeGridItemByChartMetaOnly}/>
        </div>;
    };

    public render() {
        const layouts: Layout[] = (this.state.layouts as any)[this.state.breakpoint] ? (this.state.layouts as any)[this.state.breakpoint] : [];
        return (
            <div className={styles.container}>
                <h3>{this.state.breakpoint}</h3>
                <div className="AvailableItems">
                    <ul className={availablesStyles.previews}>
                        {this.state.availableCharts.map((chart, i) => (
                            <li className={availablesStyles.preview} key={`available-item-${i}`}>
                                <label>
                                    <input type='checkbox'
                                           checked={this.isSelected(chart)}
                                           onChange={() => this.toggleSelection(chart)}
                                    />
                                    <span className={availablesStyles.previewImg}
                                          style={{backgroundImage: `url('${chart.thumbnailUrl}')`}}>
                                    <span>{chart.url}</span>
                                </span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Sortable charts */}
                <ResponsiveReactGridLayout
                    onLayoutChange={this.onLayoutChange}
                    rowHeight={30}
                    cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
                    layouts={this.state.layouts}
                    onBreakpointChange={this.onBreakpointChange}
                >
                    {layouts.map((layout, i) => this.gridItem(layout, i))}
                </ResponsiveReactGridLayout>
            </div>
        );
    }
}

interface GridItemProps {
    layout: Layout;
    chartMeta: ChartMeta;
    onRemoveChartMeta: (chartMeta: ChartMeta) => void;
}

interface GridItemState {
    loaded: boolean;
}

class GridItem extends React.Component<GridItemProps, GridItemState> {
    constructor(props: GridItemProps) {
        super(props);
        this.state = {
            loaded: false
        };
    }

    private skeleton = () => this.state.loaded ? null :
        <div className={styles.skeleton}>
            <span className={styles.skeletonLine}/>
            <span className={styles.skeletonLine}/>
            <span className={styles.skeletonLine}/>
        </div>;

    render() {
        const {layout, chartMeta} = this.props;

        return (
            <div className={styles.gridItem}>
                <iframe src={chartMeta.url}
                        onLoad={x => this.setState({loaded: true})}/>
                <span className={styles.fullHandle}/>
                {this.skeleton()}
                <a className={styles.removeGridItem}
                   onClick={e => e.preventDefault() || this.props.onRemoveChartMeta(this.props.chartMeta)}
                   onMouseDown={e => e.stopPropagation()}>
                    ✕
                </a>
            </div>
        );
    }
}