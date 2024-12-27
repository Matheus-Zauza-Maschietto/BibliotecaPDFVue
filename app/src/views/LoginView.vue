<template>
    <div class="background d-flex justify-content-center align-items-center flex-column top-0 bottom-0">
        <form @submit.prevent="login">
            <h1 class="mb-3">Biblioteca PDF</h1>
            <div class="mb-3">
                <label for="emailInput" class="form-label">Email</label>
                <input type="email" class="form-control" id="emailInput" v-model="fields.email" />
            </div>
            <div class="mb-3">
                <label for="passwordInput" class="form-label">Senha</label>
                <input type="password" class="form-control" id="passwordInput" v-model="fields.password" />
            </div>
            <span class="mb-3 text-danger text-wrap" :class="showErrors == false ? 'visually-hidden' : ''">
                {{ errorMessage }}
            </span>
            <button type="submit" class="btn btn-dark w-100" @click="login()">Fazer login</button>
        </form>
        <router-link to="cadastro" class="m-3 text-decoration-none text-white">Criar uma conta</router-link>
    </div>
</template>

<script>
import Usuario from '@/services/Usuario';

export default {
    name: "LoginView",
    data() {
        return {
            fields: {
                email: '',
                password: ''
            },
            showErrors: false,
            errorMessage: '',
        }
    },
    methods: {
        login() {
            Usuario.login(this.fields)
                .then((response) => {
                    console.log(response)
                    this.$store.commit('token', response.data.response)
                    this.$router.push('/')
                })
                .catch((error) => {
                    this.showErrors = true;
                    this.errorMessage = error.response.data.messages.find(p => p)
                    setTimeout(() => {
                        this.showErrors = false;
                    }, 6000)
                })
        }
    }
};
</script>

<style>
.background {
    width: 100vw;
    height: 100vh;
    background-color: forestgreen;
}

form {
    font-size: large;
    max-width: 450px;
    min-width: 300px;
    width: 60%;
}
</style>