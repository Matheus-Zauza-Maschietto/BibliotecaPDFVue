<template>
  <form @submit.prevent="searchTerm(query)" class="input-group my-3">
        <input type="text" v-model="query" class="form-control" placeholder="Digite uma busca ...">
        <button type="submit" class="input-group-text" id="basic-addon1">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="fs-3 p-1" v-if="!isSearching" />
                <div class="spinner-border" role="status" aria-hidden="true" v-else/>
        </button>
  </form>
</template>

<script>
import Pdf from '@/services/Pdf'; 

export default {
    name: "searchPdfComponent",
    data() {
        return {
            isSearching: false,
            query: ''
        }
    },
    methods: {
        async searchTerm(term) {
            try {
                if(term == ''){
                    this.cleanSearch();
                    return;
                }
                
                this.isSearching = true;
                
                const searchResponse = await Pdf.searchTerm(term);
                if(searchResponse.data.Status == 1){
                    throw Error(searchResponse.data.messages.find(p => p))
                }

                this.$emit('foundedPdfs', searchResponse.data.response);
            }
            catch{
                alert("Houve um erro ao realizar a pesquisa !");
            }
            finally{
                this.isSearching = false;
            }
        },
        cleanSearch() {
            this.$emit('cleanSearch');
        }
    }
}
</script>

<style>

</style>