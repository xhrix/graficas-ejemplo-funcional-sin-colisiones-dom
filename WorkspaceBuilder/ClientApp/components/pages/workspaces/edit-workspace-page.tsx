import * as React from 'react';
import * as styles from './workspaces-page.scss';
import EditWorkspaceHeader from "./edit-workspace-header/edit-workspace-header";
import EditorModal from "../../editor-modal/editor-modal";
import Workspace from "../../../models/workspace";
import WorkspaceService from "../../../services/workspace-service";
import {observer} from "mobx-react";
import {observable} from "mobx";
import WorkspaceCategory from "../../../models/workspace-category";
import WorkspaceCategoryService from "../../../services/workspace-category-service";

interface EditWorkspacePageProps {
    workspaceId: number;
}

@observer
export default class EditWorkspacePage extends React.Component<EditWorkspacePageProps> {

    @observable
    private workspace?: Workspace;

    @observable
    private workspaceCategories: WorkspaceCategory[] = [];

    async componentDidMount() {
        this.workspace = await WorkspaceService.getById(this.props.workspaceId);
        this.workspaceCategories = await WorkspaceCategoryService.getAll();
    }

    render() {
        return (
            <div className={styles.container}>
                <EditWorkspaceHeader title={`Edit Workspace ${this.props.workspaceId}`}/>
                <EditorModal workspaceCategories={this.workspaceCategories}/>
                <div>
                    {!this.workspace ? 'Not found' : this.workspace.charts.map(chart => (
                        <div>{chart.chartGUID}</div>
                    ))}
                </div>
            </div>
        );
    }
}