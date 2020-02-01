import { SelectQueryBuilder } from "typeorm";
import { toDto } from "../transformers/to-dto";
import { DataSet } from "./data-set";

export class SearchQuery {

    public readonly skip: number;
    public readonly take: number;
    public readonly orderBy: Array<OrderBy>;
    public readonly filters: Array<Filter>;

    public constructor(queryString: { [key: string]: string }) {
        this.skip = parseInt(queryString.skip, 10) || 0;
        this.take = parseInt(queryString.take, 10) || 20;
        this.orderBy = queryString.orderby ? queryString.orderby.split(",").map(o => new OrderBy(o)) : [ ];
        this.filters = queryString.where ? queryString.where.split(",").map(o => new Filter(o)) : [ ];
    }

    public async apply<T>(queryBuilder: SelectQueryBuilder<T>) {
        // TODO: APPLY FILTERS WITH ANDS, ORS AND BRACKETS
        //      APPLY INCLUDES AND EXCLUDES
        //      DOCUMENT SYNTAX

        this.filters.forEach(filter =>
            queryBuilder.where(
                `${filter.left} ${filter.operator} :value`,
                { value: filter.right }
            )
        );

        const totalResults = await queryBuilder.getCount();

        this.orderBy.forEach(orderBy => queryBuilder.addOrderBy(orderBy.property, orderBy.direction));

        const models = await queryBuilder
            .addOrderBy("1") // needed for mssql to skip and take (requires at least one order by)
            .skip(this.skip)
            .take(this.take)
            .getMany();

        return new DataSet(models.map(toDto), this.skip, totalResults);

    }
}

export class OrderBy {
    public readonly direction: "ASC" | "DESC";
    public readonly property: string;

    public constructor(orderByString: string) {
        this.property = orderByString.split(":")[0];
        this.direction = orderByString.split(":")[1] as "ASC" | "DESC" || "ASC";
    }
}

export class Filter {
    public readonly left: Filter | string;
    public readonly operator: "=";
    public readonly right: Filter | string;

    public constructor(filterString: any) {

        const filterParts = filterString.split(" ");

        if (filterParts.length !== 3) {
            throw new Error(`invalid filter: ${filterString}`);
        }

        this.left = filterParts[0];
        this.operator = filterParts[1];
        this.right = filterParts[2];

        if (typeof this.left === "string" && /[A-Z]+(\.[A-Z]+)+/i.test(this.left) === false) {
            throw new Error(`invalid filter: ${filterString}`);
        }

        if (/^(<>|![<>=]|[<>=]|[<>]=)$/.test(this.operator)
        && /^(NOT )?(ALL|AND|ANY|BETWEEN|EXISTS|IN|LIKE|OR|IS NULL|UNIQUE)$/.test(this.operator) === false) {
            throw new Error(`invalid filter: ${filterString}`);
        }
    }

    /*
    public build() {
        const left = typeof this.left === "string" ? this.left : this.left.build();

        const index = 1;

        return {
            filterString: `${left} ${this.operator} :r${index}`,

        };
    }
    */
}
