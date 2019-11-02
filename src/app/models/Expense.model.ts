export default class Expense {

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

    public static buildExpensesFromResponse(response: any[]): Expense[] {
        const expenses: Expense[] = [];
        const dateFields: Array<string> = ['date', 'createdAt', 'updatedAt'];
        const numberFields: Array<string> = ['value'];
        for (const obj of response) {
            const expense = new Expense();
            for (const key of Object.keys(obj)) {
                if (dateFields.includes(key)) {
                    expense[key] = new Date(obj[key]);
                } else if (numberFields.includes(key)) {
                    expense[key] = Number.parseFloat(obj[key]);
                } else {
                    expense[key] = obj[key];
                }
            }
            expenses.push(expense);
        }
        return expenses;
    }
}
