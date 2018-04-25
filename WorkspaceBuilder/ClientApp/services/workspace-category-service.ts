import {WorkspaceCategoryMocks} from "../mocks/workspace-category-mocks";

export default class WorkspaceCategoryService {
    public static async getAll() {
        return WorkspaceCategoryMocks;
    }
}