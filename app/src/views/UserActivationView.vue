<template>
  <div class="background">
    <titleComponent/>
    <loadingComponent v-if="loading"/>
    <h1 class="fs-4" v-else >{{ message }}</h1>
  </div>
</template>

<script>
import titleComponent from '@/components/titleComponent.vue';
import loadingComponent from '@/components/loadingComponent.vue';
import Usuario from '@/services/Usuario';

export default {
    name: "userActivationView",
    data(){
      return {
        message: '',
        loading: true
      }
    },
    components: {
      titleComponent,
      loadingComponent
    },
    methods: {
      async activeUser(){
        const userId = this.$route.params.id;
        const userToken = this.$route.params.token;

        Usuario.active(userId, userToken)
          .then((response) => {
            this.loading = false;
            if(response.status == 200){
              this.message = "Usuário ativado com sucesso."
              setTimeout(() => {
                this.$router.push('/login')
              }, 2500)
            }
            else {
              this.message = "Houve um erro ao ativar o usuário, contate o suporte."
            }
          })
          .catch(() => {
            this.loading = false;
            this.message = "Houve um erro ao ativar o usuário, contate o suporte."
          });
      }
    },
    async created(){
      this.activeUser();
    }
}
</script>

<style scoped>
  .background {
    background: var(--background-color);
    height: 100vh;
  }
</style>