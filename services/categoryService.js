export class CategoryService {
    constructor($axios) {
        this.$axios = $axios;
    }

    getCategories() {
        if (!this.categoriesPromise) {
            this.categoriesPromise = this.$axios.$get("posts/categories").then((resp) => {
                return resp.length ? resp[0].children : [];
            });
        }
        return this.categoriesPromise;
    }
}
