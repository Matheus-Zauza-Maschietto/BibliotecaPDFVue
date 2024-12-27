<template>
    <div class="background d-flex justify-content-center align-items-center flex-column top-0 bottom-0">
        <form @submit.prevent="createAccount">
            <h1 class="mb-3">Biblioteca PDF</h1>
            <div class="mb-3">
                <label for="emailInput" class="form-label">Email</label>
                <input type="email" class="form-control" id="emailInput" v-model="fields.email" />
            </div>
            <div class="mb-3">
                <label for="nomeInput" class="form-label">Nome</label>
                <input type="text" class="form-control" id="nomeInput" v-model="fields.userName" />
            </div>
            <div class="mb-3">
                <label for="passwordInput" class="form-label">Senha</label>
                <input type="password" class="form-control" id="passwordInput" v-model="fields.password" />
            </div>
            <div class="mb-3">
                <label for="passwordInput" class="form-label">Confirmar Senha</label>
                <input type="password" class="form-control" id="passwordInput" v-model="fields.confirmPassword" />
            </div>
            <span class="mb-3 text-danger text-wrap" :class="showErrors == false ? 'visually-hidden' : ''">
                {{ errorMessage }}
            </span>
            <button type="submit" class="btn btn-dark w-100" @click="createAccount()">Criar Conta</button>
        </form>
        <router-link to="login" class="m-3 text-decoration-none text-white">Fazer login</router-link>
    </div>
</template>

<script>
    import Usuario from '@/services/Usuario';


    export default {
        name: "CadastroView",
        data() {
            return {
                fields: {
                    userName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                },
                showErrors: false,
                errorMessage: '',
            }
        },
        methods: {
            createAccount() {
                Usuario.cadastro(this.fields)
                    .then(() => {
                        this.$router.push('/login')
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
    }
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