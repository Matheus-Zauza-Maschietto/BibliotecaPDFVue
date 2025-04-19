<template>
    <div class="background">
        <userComponent />
        <titleComponent />
        <h1 class="mt-5 mb-4 fs-3 text-center">Configurações</h1>
        <div class="col-10 col-md-7 col-lg-4 m-auto d-flex flex-column justify-content-between">
            <div>
                <div class="mb-3">
                    <label for="userName" class="form-label fs-4 text-white">Nome de usuário</label>
                    <input type="text" class="form-control fs-5" id="userName" readonly :value="name">
                    <button class="btn btn-light mt-4 fs-5 w-100">Alterar Nome de Usuário</button>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label fs-4 text-white">Email</label>
                    <input type="email" class="form-control fs-5" id="email" readonly :value="email">
                    <button class="btn btn-light mt-4 fs-5 w-100">Alterar Email</button>
                </div>
                <div class="mb-3">
                    <label class="form-label fs-4 text-white">Armazenamento</label>
                    <progressBarComponent 
                        width="100%" 
                        height="37px"
                        :loading="capacityUsed"
                        type="bg-success"
                    />
                    <button class="btn btn-light mt-4 fs-5 w-100">Alterar Plano de Armazenamento</button>
                </div>
            </div>
            <div class="position-absolute bottom-0 col-10 col-md-7 col-lg-4 my-4">
                <button @click.stop="logout()" class="btn btn-danger logout w-100 fs-4 mx-auto py-1 rounded">
                    Logout
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import userComponent from '@/components/userComponent.vue'
import titleComponent from '@/components/titleComponent.vue';
import progressBarComponent from '@/components/progressBarComponent.vue';
import Usuario from '@/services/Usuario';

export default {
    name: "perfilView",
    components: {
        userComponent,
        titleComponent,
        progressBarComponent
    },
    data() {
        return {
            name: '',
            email: '',
            capacityUsed: 0
        }
    },
    methods: {
        logout() {
            localStorage.setItem('token', '');
            this.$store.commit('token', '');
            Usuario.setToken('');
            this.$router.push('/login')
        },
        async getSelf(){
            Usuario.getSelf()
                .then((response) => {
                    this.$store.commit('self', response.data.response)
                    localStorage.setItem('self', JSON.stringify(response.data.response));
                    this.name = response.data.response.name;
                    this.email = response.data.response.email;
                    this.capacityUsed = response.data.response.capacityUsed.toFixed(2);
                })
                .catch((error) => {
                    this.showErrors = true;
                    this.errorMessage = error?.response?.data?.messages?.find(p => p) ?? "Houve um erro, tente novamente mais tarde."
                    
                    setTimeout(() => {
                        this.showErrors = false;
                    }, 6000)
                })
        }
    },
    async created() {
        this.getSelf()
    },
}
</script>

<style scoped>
.background {
    background: var(--background-color);
    height: 100vh;
}

.user-icon {
    font-size: 100px;
}

.user-background {
    border: solid;
    width: 150px;
    height: 150px;
}
</style>