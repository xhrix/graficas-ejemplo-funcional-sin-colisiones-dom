export default class Paths {
    public static workspaces() {
        return '/workspaces';
    }

    public static editWorkspace(id: number) {
        return `/workspaces/${id}/edit`;
    }
}