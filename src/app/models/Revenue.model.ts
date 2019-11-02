export default class Revenue {

    public id: number;
    public title: string;
    public value: number;
    public date: Date;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(title: string = '', value: number = 0, date: Date = new Date()) {
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
                    revenue[key] = new Date(obj[key]);
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
