import * as moment from 'moment';

export default class Category {

    public id: number;
    public title: string;
    public createdAt: string;
    public updatedAt: string;
    public deletedAt: string;

    constructor(title: string = '') {
        this.title = title;
    }

    public static buildCategoriesFromResponse(response: any[]): Category[] {
        const categories: Category[] = [];
        const dateFields: Array<string> = ['deletedAt', 'createdAt', 'updatedAt'];
        for (const obj of response) {
            const category = new Category();
            for (const key of Object.keys(obj)) {
                if (dateFields.includes(key)) {
                    category[key] = moment.utc(obj[key]).format('DD/MM/YYYY');
                } else {
                    category[key] = obj[key];
                }
            }
            categories.push(category);
        }
        return categories;
    }
}
