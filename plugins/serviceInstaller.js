import {CategoryService} from "../services/categoryService";

export default ({ app, $axios , nuxtState}, inject) => {
    console.log("inject");
    inject("categoryService", new CategoryService($axios));
    console.log(nuxtState);
    if (nuxtState) {
        nuxtState.data[nuxtState.data.length - 2] = nuxtState.data[nuxtState.data.length - 1];
    }
}
