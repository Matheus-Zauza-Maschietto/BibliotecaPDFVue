<template>
    <div class="position-fixed top-0 end-0 w-0 h-0 z-1">
        <div @click.stop="isOpen = !isOpen"
            class="position-fixed userMenu z-3 p-3 rounded-circle border-2 border-white d-flex justify-content-center align-items-center">
            <font-awesome-icon icon="fa-solid fa-user" class="user-icon" />
        </div>
        <div class="z-2 side-menu position-relative position-fixed top-0 end-0"
            :style="{ 'transform': isOpen ? 'translateX(0)' : 'translateX(100%)' }">

            <div class="fs-4 mt-5 text-black" id="user-name">
                {{ name }}
            </div>
            <br>
            <ul class="h-75 d-flex flex-column justify-content-start border-top">
                <li class="m-4">
                    <router-link to="/" class="fs-4 text-decoration-none">Inicio</router-link>
                </li>
                <li class="m-4">
                    <router-link to="perfil" class="fs-4 text-decoration-none">Configurações</router-link>
                </li>
            </ul>
            <div class="w-100 bottom-0 end-0 position-absolute d-flex justify-content-center my-2">
                <button @click.stop="logout()" class="btn btn-danger logout w-75 fs-4 mx-auto py-1 rounded">
                    Logout
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Usuario from '@/services/Usuario';

export default {
    name: "userComponent",
    data() {
        return {
            isOpen: false,
            name: null,
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
            const self = localStorage.getItem('self');
            if(self)
            {
                const selfObject = JSON.parse(self);
                this.$store.commit('self', selfObject);   
                this.name = selfObject.name;
                return;
            }


            Usuario.getSelf()
                .then((response) => {
                    this.$store.commit('self', response.data.response)
                    localStorage.setItem('self', JSON.stringify(response.data.response));
                    this.userName = response.data.response.userName;
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

#user-name {
    top: 0px;
    left: 0px;
    width: 70%!important;
    padding: 0px 10px;
}

.userMenu {
    width: 70px;
    height: 70px;
    border: solid;
    background: var(--background-color);
    top: 30px;
    right: 30px;
}

.userMenu:hover {
    transform: scale(1.03);
    cursor: pointer;
}

ul > li {
    list-style: none;
}

.side-menu {
    top: 0;
    right: 0;
    height: 100vh;
    background: white;
    transition-duration: 0.5s;
    width: 350px;
}

.user-icon{
    font-size: 45px;
}

.logout {
    transition-delay: 0.3;
}
</style>