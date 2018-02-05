export class DataSet<T> {
    public readonly resultsCount: Number;
    public readonly startIndex: number;
    public readonly totalResults: number;
    public readonly results: Array<T>;

    public constructor(items: Array<T>, startIndex: number, totalResults: number) {
        this.results = items;
        this.resultsCount = items.length;
        this.startIndex = startIndex;
        this.totalResults = totalResults;
    }
}
