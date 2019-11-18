import * as moment from 'moment';

export default class FinancialResource {

    public id: number;
    public title: string;
    public createdAt: string;
    public updatedAt: string;
    public deletedAt: string;

    constructor(title: string = '') {
        this.title = title;
    }

    public static buildCategoriesFromResponse(response: any[]): FinancialResource[] {
        const financialResources: FinancialResource[] = [];
        const dateFields: Array<string> = ['deletedAt', 'createdAt', 'updatedAt'];
        for (const obj of response) {
            const financialResource = new FinancialResource();
            for (const key of Object.keys(obj)) {
                if (dateFields.includes(key)) {
                    financialResource[key] = moment.utc(obj[key]).format('DD/MM/YYYY');
                } else {
                    financialResource[key] = obj[key];
                }
            }
            financialResources.push(financialResource);
        }
        return financialResources;
    }
}
