export class CategoryService {
    constructor($axios) {
        this.$axios = $axios;
    }

    getCategories() {
        if (!this.categoriesPromise) {
            this.categoriesPromise = this.$axios.$get("posts/categories").then((resp) => {
                let scan = (categories) => {
                    for (let c of categories) {
                        this.categoryById[c.id] = c;
                        if (c.children.length) {
                            scan(c.children);
                        }
                    }
                }
                this.categoryById = {};
                let categories = resp.length ? resp[0].children : [];
                scan(categories);
                return categories;
            });
        }
        return this.categoriesPromise;
    }

    async getCategory(id) {
        await this.getCategories();
        return this.categoryById[id];
    }
}
