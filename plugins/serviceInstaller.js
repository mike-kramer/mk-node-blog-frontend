import {CategoryService} from "../services/categoryService";

export default ({ app, $axios }, inject) => {
    console.log("inject");
    inject("categoryService", new CategoryService($axios));
}
