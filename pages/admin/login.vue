<template>
    <v-layout
        column
        justify-center
        align-center
    >
        <v-card max-width="400px">
            <v-card-title>Вход в админку</v-card-title>
            <v-card-text>
                <form>
                    <v-text-field
                        v-model="userData.username"
                        label="Имя пользователя *"
                        required
                        :error-messages="usernameError"
                        @input="$v.userData.username.$touch()"
                        @blur="$v.userData.username.$touch()"
                    ></v-text-field>
                    <v-text-field
                        v-model="userData.password"
                        label="Пароль *"
                        type="password"
                        required
                        :error-messages="usernameError"
                        @input="$v.userData.username.$touch()"
                        @blur="$v.userData.username.$touch()"
                    ></v-text-field>
                    <v-btn @click="login" color="success">Войти</v-btn>
                </form>
            </v-card-text>
        </v-card>
    </v-layout>
</template>

<script>
    import {validationMixin} from "vuelidate";
    import {required} from 'vuelidate/lib/validators'

    export default {
        mixins: [validationMixin],
        auth: "guest",
        head() {
            return {
                title: "Логин"
            };
        },
        data() {
            return {
                userData: {
                    username: "",
                    password: ""
                }
            }
        },

        validations: {
            userData: {
                username: {required},
                password: {required}
            }
        },

        computed: {
            usernameError() {
                if (!this.$v.userData.username.$dirty) {
                    return [];
                }
                return this.$v.userData.username.required ? []: ["Введите имя пользователя"];
            },
            passwordError() {
                if (!this.$v.userData.password.$dirty) {
                    return [];
                }
                return this.$v.userData.password.required ? []: ["Введите имя пользователя"];
            }
        },
        methods: {
            async login() {
                if (this.$v.$invalid) {
                    this.$v.$touch();
                    return;
                }
                try {
                    let response = await this.$auth.loginWith('local', { data: this.userData })
                    console.log(response)
                } catch (err) {
                    console.log(err)
                }
            }
        }

    }
</script>

<style scoped>

</style>
