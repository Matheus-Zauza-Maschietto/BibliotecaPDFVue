<template>
    <div class="background d-flex justify-content-center align-items-center flex-column">
        <titleComponent />
        <div class="back-drop d-flex justify-content-center align-items-center flex-column rounded p-4">
            <form @submit.prevent="createAccount" class="w-100">
                <h1 class="mb-3">Biblioteca PDF</h1>
                <div class="mb-3">
                    <label for="emailInput" class="form-label">Email</label>
                    <input type="email" class="form-control" id="emailInput" v-model="fields.email" placeholder="Digite seu E-Mail aqui" />
                </div>
                <div class="mb-3">
                    <label for="nomeInput" class="form-label">Nome</label>
                    <input type="text" class="form-control" id="nomeInput" v-model="fields.userName" placeholder="Digite seu nome aqui" />
                </div>
                <div class="mb-3">
                    <label for="passwordInput" class="form-label">Senha</label>
                    <input type="password" class="form-control" id="passwordInput" v-model="fields.password" placeholder="Digite sua senha aqui" />
                </div>
                <div class="mb-3">
                    <label for="passwordInput" class="form-label">Confirmar Senha</label>
                    <input type="password" class="form-control" id="passwordInput" v-model="fields.confirmPassword" placeholder="Digite novamente sua senha aqui" />
                </div>
                <div class="mb-3 bg-danger rounded p-2" :class="showErrors == false ? 'visually-hidden' : ''">
                    <span class="text-bg-danger text-wrap" >
                        {{ errorMessage }}
                    </span>
                </div>
                <button type="submit" class="btn btn-dark w-100" @click="createAccount()">Criar Conta</button>
            </form>
            <router-link to="login" class="m-3 text-decoration-none">Fazer login</router-link>
        </div>
    </div>
</template>

<script>
import Usuario from '@/services/Usuario';
import titleComponent from '@/components/titleComponent.vue';

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
    components: {
        titleComponent
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
    background-color: var(--background-color);
}

form {
    font-size: large;
    max-width: 450px;
    min-width: 300px;
    width: 60%;
}

.back-drop {
    background-color: var(--white);
    min-width: 300px;
    max-width: 600px;
    width: 40%;
}

label, a {
    color: var(--background-color);
}
</style>