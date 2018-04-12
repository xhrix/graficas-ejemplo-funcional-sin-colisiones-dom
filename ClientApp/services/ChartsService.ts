export default class ChartsService {
    public static async getAvailableCharts(): Promise<string[]> {
        return [
            'https://picsum.photos/200/300/?image=350',
            'https://picsum.photos/200/300/?image=90',
            'https://picsum.photos/200/300/?image=662',
            'https://picsum.photos/200/300/?image=736',
            'https://picsum.photos/200/300/?image=666',
            'https://picsum.photos/200/300/?image=182',
            'https://picsum.photos/200/300/?image=692',
        ];
    }
}