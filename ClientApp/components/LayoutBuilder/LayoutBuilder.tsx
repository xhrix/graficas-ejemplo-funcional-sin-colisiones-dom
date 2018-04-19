import * as React from 'react';
import * as styles from './LayoutBuilder.scss';
import ChartMeta from "../../models/ChartMeta";
import ChartsService from "../../services/ChartsService";
import * as availablesStyles from './AvailableItems/AvailableItems.scss';
import {
    appendLayout,
    emptyNormalizedLayouts,
    randomLayout,
    removeLayoutByKey
} from "../../lib/components/react-sortable-savable-grid/ReactGridLayoutUtil";
import {Breakpoints, Layout, Layouts, Responsive, WidthProvider} from "react-grid-layout";

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
            const indexInSelectedCharts = this.state.selectedCharts.findIndex(x => x.chartGUID === value.chartGUID);
            const layout = this.state.layouts.xs ? this.state.layouts.xs[indexInSelectedCharts] : null;
            if (!layout) throw new Error(`Layouts and Charts don't match anymore.`);
            const layouts = removeLayoutByKey(this.state.layouts, layout.i || '');
            const selectedCharts = this.state.selectedCharts.filter(x => x.chartGUID !== value.chartGUID);
            this.setState({selectedCharts, layouts});
        } else {

            // Add
            const newLayout = randomLayout();
            this.setState({
                selectedCharts: this.state.selectedCharts.concat([value]),
                layouts: appendLayout(this.state.layouts, () => newLayout),
            });
        }
    };

    private onLayoutChange = (layout: Layout, layouts: Layouts) => {
        this.setState({layouts});
        // saveToLS("layouts", layouts);
    };

    private removeItem = (key: string) => {
        throw new Error('Not implemented');
        // this.setState({
        //     layouts: removeLayoutByKey(this.state.layouts, key)
        // });
    };

    onBreakpointChange = (breakpoint: Breakpoints, cols: number) => {
        this.setState({breakpoint});
    };

    private gridItem = (el: Layout, index: number) => {
        const chartMeta = this.state.selectedCharts.length > index ? this.state.selectedCharts[index] : null;

        if (!chartMeta) {
            throw new Error(`Charts and Layouts don't match anymore.`);
        }

        return (
            <div className={styles.gridItem} key={el.i} data-grid={el}>
                <iframe src={chartMeta.url}
                        onLoad={x => console.log('TODO: Put a loading thing while the iframe shows up.', x)}/>
                <span className={styles.fullHandle}/>
                <span className={styles.removeGridItem}>✕</span>
                {/*<UnwrappedComponent layout={el} removeFromGrid={this.props.onRemoveItemClicked}/>*/}
            </div>
        );
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