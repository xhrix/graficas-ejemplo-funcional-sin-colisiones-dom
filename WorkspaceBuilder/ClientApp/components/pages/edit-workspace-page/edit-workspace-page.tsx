import * as React from 'react';
import * as styles from '../workspaces-page/workspaces-page.scss';
import EditWorkspaceHeader from "./edit-workspace-header/edit-workspace-header";
import EditorModal from "../../editor-modal/editor-modal";
import Workspace from "../../../models/workspace";
import WorkspaceService from "../../../services/workspace-service";
import {observer} from "mobx-react";
import {observable} from "mobx";
import WorkspaceCategory from "../../../models/workspace-category";
import WorkspaceCategoryService from "../../../services/workspace-category-service";
import ChartMeta from "../../../models/chart-meta";
import {Breakpoints, Layout, Layouts, Responsive, WidthProvider} from "react-grid-layout";
import {
    appendLayout,
    emptyNormalizedLayouts, removeLayoutByKey
} from "../../../lib/components/react-sortable-savable-grid/ReactGridLayoutUtil";
import ChartService from "../../../services/chart-service";
import * as uuid from 'uuid/v4';
import * as mainButtonStyle from "../../styles/buttons/main-action-button.scss";

interface EditWorkspacePageProps {
    workspaceId: number;
}

interface EditWorkspacePageState {
    availableCharts: ChartMeta[];
    selectedCharts: ChartMeta[];
    layouts: Layouts;
    breakpoint: Breakpoints;
}

const ResponsiveReactGridLayout = WidthProvider(Responsive);

@observer
export default class EditWorkspacePage extends React.Component<EditWorkspacePageProps, EditWorkspacePageState> {

    @observable
    private workspace?: Workspace;

    @observable
    private workspaceCategories: WorkspaceCategory[] = [];

    @observable
    private selectedCategory?: WorkspaceCategory;

    @observable
    private showModal = false;

    constructor(props: EditWorkspacePageProps) {
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
            availableCharts: await ChartService.getAvailableCharts()
        });
        this.workspace = await WorkspaceService.getById(this.props.workspaceId);
        this.workspaceCategories = await WorkspaceCategoryService.getAll();
    }

    private onCategoryClick = (category: WorkspaceCategory) => {
        this.selectedCategory = category;
    };

    private isSelected = (value: ChartMeta) => {
        return !!(this.state.selectedCharts.find(x => value.chartGUID === x.chartGUID));
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

        return <div className={styles.gridItem} key={layout.i} data-grid={layout}>
            <GridItem chartMeta={chartMeta} onRemoveChartMeta={this.removeGridItemByChartMetaOnly}/>
        </div>;
    };

    render() {
        const layouts: Layout[] = (this.state.layouts as any)[this.state.breakpoint] ? (this.state.layouts as any)[this.state.breakpoint] : [];

        return (
            <div className={styles.container}>
                <EditWorkspaceHeader
                    onEditClick={() => console.log('TODO: Make the title editable.')}
                    title={`Edit Workspace ${this.props.workspaceId}`}/>
                <EditorModal
                    workspaceCategories={this.workspaceCategories}
                    onCategoryClick={this.onCategoryClick}
                    selectedCategory={this.selectedCategory}
                    isChartSelected={this.isSelected}
                    onChartClick={this.toggleSelection}
                    shown={this.showModal}
                    onCloseClick={() => this.showModal = false}
                />

                <ResponsiveReactGridLayout
                    onLayoutChange={this.onLayoutChange}
                    rowHeight={30}
                    cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
                    layouts={this.state.layouts}
                    onBreakpointChange={this.onBreakpointChange}
                >
                    {layouts.map((layout, i) => this.gridItem(layout, i))}
                </ResponsiveReactGridLayout>

                <button onClick={() => this.showModal = !this.showModal} className={mainButtonStyle.container}
                        type="button">
                    <i className="material-icons">add</i>
                </button>
            </div>
        );
    }
}

interface GridItemProps {
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
        const {chartMeta} = this.props;

        return (
            <div>
                <iframe src={chartMeta.url}
                        onLoad={() => this.setState({loaded: true})}/>
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