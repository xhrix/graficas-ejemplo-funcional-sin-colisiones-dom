import {WorkspaceMocks} from "../mocks/workspace-mocks";

export default class WorkspaceService {
    public static async getById(id: number) {
        return WorkspaceMocks.find(x => x.id === id);
    }
}