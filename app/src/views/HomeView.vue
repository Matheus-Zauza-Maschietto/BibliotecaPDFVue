<template>
  <div class="home">
    <userComponent/>
    <header>
      <titleComponent></titleComponent>
      <div class="col-9 m-auto p-1 mt-5 cabecalho rounded position-relative">
        <h2>Meus PDFs</h2>
        <span class="appendPDFBtn fs-1 hover-click" @click="openModal()">
          <font-awesome-icon icon="fa-solid fa-plus"/>
        </span>
      </div>
    </header>
    <newPDFModal 
        :modalIsOpen="modalIsOpen" 
        @closeModal="modalIsOpen=false" 
        @newPdf="loadPdfs()"
    />
    <body class="col-9 m-auto p-1 mt-3 body overflow-y-scroll rounded">
      <loadingComponent v-if="showLoadComponent" />
      <div class="row row-cols-md-3 row-cols-sm-2 row-cols-1" v-else>

        <pdfCard 
            v-for="pdf in pdfsList" 
            :key="pdf.fileName" 
            :fileName="pdf.fileName" 
            :isFavorited="pdf.isFavorite"
            @favorite="switchFavorite(pdf, $event)"
        />
      </div>
    </body>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import pdfCard from '@/components/pdfCard.vue';
import newPDFModal from '@/components/newPDFModal.vue';
import Pdf from '@/services/Pdf';
import titleComponent from '@/components/titleComponent.vue';
import loadingComponent from '@/components/loadingComponent.vue';
import userComponent from '@/components/userComponent.vue'

export default {
  name: 'HomeView',
  components: {
    pdfCard,
    newPDFModal,
    titleComponent,
    loadingComponent,
    userComponent
  },
  data(){
    return{
      modalIsOpen: false,
      pdfsList: [],
      showLoadComponent: false
    }
  },
  methods:{
    openModal(){
      this.modalIsOpen = true;
    },
    switchFavorite(pdf, event){
      pdf.isFavorite = event
      this.pdfsList = this.pdfsList.sort((a, b) => b.isFavorite - a.isFavorite);
    },
    async loadPdfs(){
      try {
        this.showLoadComponent = true;
        const response = await Pdf.getAll(this.$store.state.token);
        this.pdfsList = response.data.response.sort((a, b) => b.isFavorite - a.isFavorite);
      } catch (err) {
        this.error = 'Erro ao carregar os PDFs, por favor recarregue a pagina.';
      }
      finally{
        this.showLoadComponent = false;
      }
    }
  },

  async created() {
    this.loadPdfs()
  },
}
</script>

<style>
  .home{
    background: var(--background-color);
    height: 100vh;
  }
  h1{
    color: var(--white);
  }

  h2{
    color: black; 
  }

  .cabecalho, .body{
    background: #D9D9D9;
  }

  .body{
    height: 70%;
  }

  .appendPDFBtn{
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    right: 10px;
    color: green;
  }
</style>