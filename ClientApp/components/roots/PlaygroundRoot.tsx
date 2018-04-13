import * as React from 'react';
import {RouteComponentProps} from "react-router";
import * as ReactGridLayout from 'react-grid-layout';
import * as styles from './PlaygroundRoot.scss';
import * as _ from "lodash";
import {Layout, Responsive, WidthProvider} from "react-grid-layout";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

// layout is an array of objects, see the demo for more complete usage
const layout = [
    {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
    {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
    {i: 'c', x: 4, y: 0, w: 1, h: 2}
];


class MyFirstGrid extends React.Component {
    render() {
        return (
            <ReactGridLayout className={'layout'} layout={layout} cols={12} rowHeight={30} width={1200}>
                <div className={styles.item} key={'a'}>a</div>
                <div className={styles.item} key={'b'}>b</div>
                <div className={styles.item} key={'c'}>c</div>
            </ReactGridLayout>
        );
    }
}


interface MatchProps {
}

const PlaygroundRoot = ({match}: RouteComponentProps<MatchProps>) => (
    <div>
        <ShowcaseLayout/>
    </div>
);

export default PlaygroundRoot;

function generateLayout(): Layout[] {
    return _.map(_.range(0, 25), function (item: number, i: number) {
        const y = Math.ceil(Math.random() * 4) + 1;
        return {
            x: (_.random(0, 5) * 2) % 12,
            y: Math.floor(i / 6) * y,
            w: 2,
            h: y,
            i: i.toString(),
            static: Math.random() < 0.05
        };
    });
}

class ShowcaseLayout extends React.Component<any, any> {
    static defaultProps = {
        className: "layout",
        rowHeight: 30,
        cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
        initialLayout: generateLayout()
    };

    state = {
        currentBreakpoint: "lg",
        compactType: "vertical",
        mounted: false,
        layouts: {lg: this.props.initialLayout}
    };

    componentDidMount() {
        this.setState({mounted: true});
    }

    generateDOM() {
        return _.map(this.state.layouts.lg, (l: Layout, i: number) => {
            return (
                <div key={i} className={l.static ? "static" : ""}>
                    {l.static ? (
                        <span className="text"
                              title="This item is static and cannot be removed or resized.">Static - {i}</span>
                    ) : (
                        <span className="text">{i}</span>
                    )}
                </div>
            );
        });
    }

    onBreakpointChange = (breakpoint: string) => {
        this.setState({
            currentBreakpoint: breakpoint
        });
    };

    onCompactTypeChange = () => {
        const {compactType: oldCompactType} = this.state;
        const compactType = oldCompactType === "horizontal" ? "vertical" : oldCompactType === "vertical" ? null : "horizontal";
        this.setState({compactType});
    };

    onNewLayout = () => {
        this.setState({
            layouts: {lg: generateLayout()}
        });
    };

    render() {
        return (
            <div>
                <div>
                    Current Breakpoint: {this.state.currentBreakpoint} ({
                    this.props.cols[this.state.currentBreakpoint]
                }{" "}
                    columns)
                </div>
                <div>
                    Compaction type:{" "}
                    {_.capitalize(this.state.compactType) || "No Compaction"}
                </div>
                <button onClick={this.onNewLayout}>Generate New Layout</button>
                <button onClick={this.onCompactTypeChange}>
                    Change Compaction Type
                </button>
                <ResponsiveReactGridLayout
                    {...this.props}
                    layouts={this.state.layouts}
                    onBreakpointChange={this.onBreakpointChange}
                    // WidthProvider option
                    measureBeforeMount={false}
                    // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
                    // and set `measureBeforeMount={true}`.
                    useCSSTransforms={this.state.mounted}
                    compactType={this.state.compactType}
                    preventCollision={!this.state.compactType}
                >
                    {this.generateDOM()}
                </ResponsiveReactGridLayout>
            </div>
        );
    }
}