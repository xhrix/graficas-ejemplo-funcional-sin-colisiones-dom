import {WorkspaceMocks} from "../mocks/workspace-mocks";
import Workspace from "../models/workspace";
import {emptyNormalizedLayouts} from "../lib/components/react-sortable-savable-grid/ReactGridLayoutUtil";

export default class WorkspaceService {
    /**
     * Returns a Workspace by its id or an empty and fully populated Workspace.
     *
     * @param {number} id
     * @returns {Promise<Workspace | undefined>}
     */
    public static async getByIdOrEmpty(id: number) {
        return WorkspaceMocks.find(x => x.id === id) || new Workspace(0, '', '', [], emptyNormalizedLayouts());
    }
}