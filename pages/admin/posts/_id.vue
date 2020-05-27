<template>
    <div class="d-flex">
        <v-card class="flex-grow-1">
            <v-card-title>Редактировать пост</v-card-title>
            <v-card-text>
                <v-text-field
                    v-model="post.title"
                    :error-messages="fieldErrors('title')"
                    label="Заголовок"
                    @input="$v.post.title.$touch()"
                    @blur="$v.post.title.$touch()"
                ></v-text-field>
                <v-overflow-btn
                    :items="categoryList"
                    :error-messages="fieldErrors('categoryId')"
                    v-model="post.categoryId"
                    label="Категория"
                    item-value="id"
                    item-text="name"
                    @input="$v.post.categoryId.$touch()"
                    @blur="$v.post.categoryId.$touch()"
                ></v-overflow-btn>
                <v-textarea
                    :error-messages="fieldErrors('text')"
                    v-model="post.excerpt"
                    label="Краткое содержание"
                    @input="$v.post.text.$touch()"
                    @blur="$v.post.text.$touch()"
                ></v-textarea>
                <v-textarea
                    :error-messages="fieldErrors('text')"
                    v-model="post.text"
                    label="Текст"
                    @input="$v.post.text.$touch()"
                    @blur="$v.post.text.$touch()"
                ></v-textarea>
            </v-card-text>
            <v-card-actions>
                <v-btn color="success" @click="save()">Сохранить</v-btn>
            </v-card-actions>
        </v-card>
        <file-uploader style="width: 300px;"></file-uploader>
    </div>
</template>

<script>
    import {validationMixin} from "vuelidate";
    import {required} from 'vuelidate/lib/validators'
    import fileUploader from "../../../components/assistants/fileUploader";


    export default {
        mixins: [validationMixin],
        components: {fileUploader},
        async asyncData({$axios, params, app}) {
            const categories = await app.$categoryService.getCategories();
            const post = params.id === 'new' ? {title: "", text: "", excerpt: "", categoryId: null}
                : await $axios.$get(`/posts-admin/${params.id}`);
            if (params.id !== 'new') {
                post.categoryId = post.category.id
            }
            return {post, categories};
        },
        head() {
            return {
                title: "Редактирование поста"
            };
        },
        computed: {
            categoryList() {
                let list = [];
                let buildList = (categories, prevStr) => {
                    for (let c of categories) {
                        let categoryFullName = prevStr + (prevStr ? " > " : "") + c.name;
                        list.push({id: c.id, name: categoryFullName});
                        if (c.children.length) {
                            buildList(c.children, categoryFullName);
                        }
                    }
                }
                buildList(this.categories, "");
                return list;
            },
        },
        validations: {
            post: {
                categoryId: {required},
                title: {required},
                text: {required}
            }
        },
        methods: {
            fieldErrors(field) {
                const titles = {categoryId: "категорию", title: "заголовок", text: "Текст"};
                if (!this.$v.post[field].$dirty) {
                    return [];
                }
                return this.$v.post[field].required ? [] : [`Необзодимо задать ${titles[field]}`];
            },
            save() {
                if (this.$v.$invalid) {
                    this.$v.$touch();
                    return;
                }
                this.$axios.$post(
                    this.$route.params.id === "new" ? "/posts-admin" : `/posts-admin/${this.post.id}`,
                    this.post
                ).then(() => {
                    this.$router.back();
                })
            }

        }
    }
</script>

<style scoped lang="scss">
</style>
