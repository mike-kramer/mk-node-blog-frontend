<template>
    <ul class="category-path">
        <li v-for="cat in categoryPath">
            <nuxt-link :to="`/categories/${cat.id}`" v-if="!admin">{{cat.name}}</nuxt-link>
            <span v-else>{{cat.name}}</span>
        </li>
    </ul>
</template>

<script>
    export default {
        props: ["categoryPath", "admin"]
    }
</script>

<style scoped lang="scss">
    .category-path {
        list-style: none;
        display: inline-flex;
        flex-wrap: wrap;
        li {
            margin-right: 10px;
            &:after {
                content: " > ";
                margin-left: 10px;
            }
            &:last-child {
                &:after {
                    content: "";
                }
            }
        }
    }
</style>
