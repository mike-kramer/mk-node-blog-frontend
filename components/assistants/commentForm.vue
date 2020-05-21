<template>
    <v-card>
        <v-card-text>
            <form>
                <v-text-field
                    v-model="authorName"
                    :error-messages="authorNameErrors"
                    label="Имя"
                    required
                    @input="$v.authorName.$touch()"
                    @blur="$v.authorName.$touch()"
                >

                </v-text-field>
                <v-text-field
                    v-model="authorEmail"
                    :error-messages="authorEmailErrors"
                    label="E-mail"
                    @input="$v.authorEmail.$touch()"
                    @blur="$v.authorEmail.$touch()"
                ></v-text-field>
                <v-textarea
                    v-model="commentText"
                    :error-messages="commentTextErrors"
                    label="Комментарий"
                    @input="$v.commentText.$touch()"
                    @blur="$v.commentText.$touch()"
                ></v-textarea>
                <vue-recaptcha
                    ref="recaptcha"
                    @verify="onVerify"
                    @expired="onExpired"
                    :sitekey="$store.state.recaptchaKey"
                    :loadRecaptchaScript="true"
                ></vue-recaptcha>
                <div class="red" style="margin-top: 10px;" v-if="notRobotError">
                    Подтвердите, что вы не робот
                </div>
                <v-btn color="success" style="margin-top: 10px;" @click="submit">Отправить</v-btn>
            </form>
        </v-card-text>
    </v-card>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import {required, maxLength, email} from 'vuelidate/lib/validators'
    import VueRecaptcha from 'vue-recaptcha';

    export default {
        props: ["postId"],
        mixins: [validationMixin],
        components: {VueRecaptcha},
        validations()  {
            let validations = {
                authorName: {required, maxLength: maxLength(255)},
                commentText: {required}
            };
            validations.authorEmail = this.authorEmail !== "" ? {email}: {};
            return validations;
        },
        data() {
            return {
                authorName: "",
                authorEmail: "",
                commentText: "",
                notRobot: false,
                recaptchaAnswer: false,
                notRobotError: false,
            }
        },
        computed: {
            authorNameErrors() {
                const errors = []
                if (!this.$v.authorName.$dirty) return errors
                !this.$v.authorName.required && errors.push('Необходимо ввести имя');
                return errors;
            },
            authorEmailErrors() {
                const errors = []
                if (!this.$v.authorEmail.$dirty) return errors
                this.authorEmail  && !this.$v.authorEmail.email && errors.push('Введите верный e-mail');
                return errors;
            },
            commentTextErrors() {
                const errors = []
                if (!this.$v.commentText.$dirty) return errors;
                !this.$v.commentText.required && errors.push('Необходимо ввести текст комментария');
                return errors;
            }
        },
        methods: {
            submit() {
                if (this.$v.$invalid) {
                    this.$v.$touch();
                    return;
                }
                if (!this.notRobot) {
                    this.notRobotError = true;
                    return;
                }
                this.$axios.post(`posts/${this.postId}/comment`, {
                    authorName: this.authorName,
                    authorEmail: this.authorEmail,
                    commentText: this.commentText,
                    recaptchaAnswer: this.recaptchaAnswer
                }).then(
                    () => {
                        this.authorEmail = this.authorName = this.commentText = "";
                        this.$v.$reset();
                        this.notRobot = false;
                        this.$refs.recaptcha.reset();
                        this.$emit("commentPosted");
                    }
                )
            },
            onVerify(resp) {
                console.log(resp);
                this.notRobot = true;
                this.recaptchaAnswer = resp;
            },
            onExpired() {
                this.notRobot = false;
            }
        }
    }
</script>

<style scoped>

</style>
