<template>
    <div class="background d-flex justify-content-center align-items-center flex-column">
        <titleComponent/>
        <div class="back-drop d-flex justify-content-center align-items-center flex-column rounded">
            <form @submit.prevent="login" class="w-100 p-4 p-xl-0">
                <h2 class="mb-5 mt-3">Login</h2>
                <div class="mb-3">
                    <label for="emailInput" class="form-label">E-Mail</label>
                    <input type="email" class="form-control" id="emailInput" v-model="fields.email" placeholder="Digite seu E-Mail aqui" />
                </div>
                <div class="mb-3">
                    <label for="passwordInput" class="form-label">Senha</label>
                    <input type="password" class="form-control" id="passwordInput" v-model="fields.password" placeholder="Digite sua senha aqui" />
                </div>
                <div class="mb-3 bg-danger rounded p-2" :class="showErrors == false ? 'visually-hidden' : ''">
                    <span class="text-bg-danger text-wrap" >
                        {{ errorMessage }}
                    </span>
                </div>
                <loadingComponent v-if="isLogging"/>
                <button type="submit" class="btn btn-dark w-100">Fazer login</button>
            </form>
            <router-link to="cadastro" class="m-3 text-decoration-none">Criar uma conta</router-link>
        </div>
    </div>
</template>

<script>
import titleComponent from '@/components/titleComponent.vue';
import Usuario from '@/services/Usuario';
import loadingComponent from '@/components/loadingComponent.vue';

export default {
    name: "LoginView",
    data() {
        return {
            fields: {
                email: '',
                password: ''
            },
            isLogging: false,
            showErrors: false,
            errorMessage: '',
        }
    },
    components: {
        titleComponent,
        loadingComponent
    },
    methods: {
        async login() {
            try{
                this.isLogging = true;
                const response = await Usuario.login(this.fields)
                Usuario.setToken(response.data.response)
                this.$store.commit('token', response.data.response)
                localStorage.setItem('token', response.data.response);
                this.$router.push('/')
            }
            catch(error){
                this.showErrors = true;
                this.errorMessage = error?.response?.data?.messages?.find(p => p) ?? "Houve um erro, tente novamente mais tarde."
                
                setTimeout(() => {
                    this.showErrors = false;
                }, 6000)
            }
            finally{
                this.isLogging = false;
            }
        }
    }
};
</script>

<style scoped>
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