<template>
    <v-layout
        column
        justify-center
        align-center
    >
        <v-card width="100%">
            <v-card-title class="headline">
                Последние публикации
            </v-card-title>
            <v-card-text>
                <v-card width="100%" style="margin-bottom: 20px;" v-for="post in posts" v-bind:key="post.id" color="yellow">
                    <v-card-title>{{post.title}}</v-card-title>
                    <v-card-subtitle>
                        {{reformatDate(post.createdAt, 'DD.MM.YYYY')}}
                        <category-path :category-path="categoryPath(post.category)"></category-path>
                    </v-card-subtitle>
                    <v-card-text>{{post.text}}</v-card-text>
                    <v-card-actions>
                        <v-btn :to="`post/${post.id}`" nuxt>Читать</v-btn>
                    </v-card-actions>
                </v-card>
            </v-card-text>
        </v-card>
    </v-layout>
</template>

<script>
    import datetime from "../mixins/datetime";
    import helpers from "../mixins/helpers";
    import CategoryPath from "../components/assistants/categoryPath";

    export default {
        components: {CategoryPath},
        mixins: [datetime, helpers],
        async asyncData({$axios, app}) {
            const [posts, postsCount] = await $axios.$get("posts");
            return {
                posts,
                postsCount,
                categories: await app.$categoryService.getCategories()
            }
        },
    }
</script>
<style lang="scss">

</style>
<router>
    {
        namedViews: {
            views: {
                sidebar: '~/components/assistants/defaultSidebar'
            },
            chunkNames: {
                sidebar: '~/components/assistants/defaultSidebar'
            }
        }
    }
</router>
