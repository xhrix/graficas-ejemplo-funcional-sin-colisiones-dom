export default class Paths {
    public static workspaces() {
        return '/workspaces';
    }

    public static singleWorkspaces(id: number) {
        return `/workspaces/${id}`;
    }
}