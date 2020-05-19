<template>
    <div>
        <v-dialog
            v-model="editCategoryModal"
            width="500"
        >
            <v-card>
                <v-card-title primary-title>
                    Редактировани категории
                </v-card-title>
                <v-card-text>
                    <v-text-field
                        v-model="editedCategory.name"
                        label="Название категории"
                        :error-messages="nameErrors"
                        @input="$v.editedCategory.name.$touch()"
                        @blur="$v.editedCategory.name.$touch()"
                    ></v-text-field>
                    <v-btn success-btn @click="save()">Сохранить</v-btn>
                </v-card-text>
            </v-card>

        </v-dialog>
        <v-card>
            <v-card-title>Категории</v-card-title>
            <v-card-text>
                <v-treeview
                    dense
                    :items="categories"
                >
                    <template v-slot:label="{ item, open, leaf }">
                        {{item.name}}
                        <v-icon @click="createChild(item)">mdi-plus-circle-outline</v-icon>
                        <template v-if="item.name !== 'root'">
                            <v-icon @click="editCategory(item)">mdi-pencil-box</v-icon>
                        </template>
                        <template v-if="item.children.length === 0">
                            <v-icon>mdi-delete</v-icon>
                        </template>
                    </template>
                </v-treeview>
            </v-card-text>
        </v-card>
    </div>

</template>

<script>
    import {validationMixin} from "vuelidate";
    import {required} from 'vuelidate/lib/validators'
    import helpers from "../../../mixins/helpers";
    export default {
        mixins: [validationMixin, helpers],
        async asyncData({$axios}) {
            let categories = await $axios.$get("category-admin/full-tree");
            return {categories};
        },
        watch: {
            editCategoryModal() {
                if (!this.editCategoryModal) {
                    this.$v.$reset();
                }
            }
        },
        data() {
            return {
                editCategoryModal: false,
                editedCategory: {
                    id: null,
                    parentId: null,
                    name: ""
                }
            }
        },
        validations: {
            editedCategory: {
                name: {required}
            }
        },
        computed: {
            nameErrors() {
                return this.fieldErrors(
                    "editedCategory",
                    "name",
                    {name: "Название"},
                    {required: "Необходимо заполнить название"}
                )
            }
        },
        methods: {
            editCategory(item) {
                this.editedCategory.parentId = item.parentId;
                this.editedCategory.id = item.id;
                this.editedCategory.name = item.name;
                this.editCategoryModal = true;
            },
            createChild(item) {
                this.editedCategory.parentId = item.id;
                this.editedCategory.id = null;
                this.editedCategory.name = "";
                this.editCategoryModal = true;
            },
            save() {
                if (this.$v.invalid) {
                    this.$v.$touch();
                    return;
                }
                let promise = null;
                let data = Object.assign({}, this.editedCategory);
                if (!this.editedCategory.id) {
                    delete data.id;
                    promise = this.$axios.$post("category-admin/create", data);
                } else {
                    delete data.parentId;
                    promise = this.$axios.$post("category-admin/update", data)
                }
                promise
                    .then(() => this.$axios.$get("category-admin/full-tree"))
                    .then(categories => {
                        this.categories = categories;
                        this.editCategoryModal = false;
                    });
            }

        }
    }
</script>

<style scoped>

</style>
