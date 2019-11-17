import * as moment from 'moment';

export default class Revenue {

    public id: number;
    public title: string;
    public value: number;
    public date: string;
    public CategoryId: number | string;
    public createdAt: string;
    public updatedAt: string;

    constructor(title: string = '', value: number = 0, date: string = moment().format('DD/MM/YYYY')) {
        this.title = title;
        this.value = value;
        this.date = date;
    }

    public static buildRevenuesFromResponse(response: any[]): Revenue[] {
        const revenues: Revenue[] = [];
        const dateFields: Array<string> = ['date', 'createdAt', 'updatedAt'];
        const numberFields: Array<string> = ['value'];
        for (const obj of response) {
            const revenue = new Revenue();
            for (const key of Object.keys(obj)) {
                if (dateFields.includes(key)) {
                    revenue[key] = moment.utc(obj[key]).format('DD/MM/YYYY');
                } else if (numberFields.includes(key)) {
                    revenue[key] = Number.parseFloat(obj[key]);
                } else {
                    revenue[key] = obj[key];
                }
            }
            revenues.push(revenue);
        }
        return revenues;
    }
}
