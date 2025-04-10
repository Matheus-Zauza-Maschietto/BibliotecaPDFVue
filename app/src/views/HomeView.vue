<template>
  <div class="home">
    <userComponent/>
    <newPDFModal 
        :modalIsOpen="modalIsOpen" 
        @closeModal="modalIsOpen=false" 
        @newPdf="loadPdfs()"
    />
    <header class="mb-3">
      <titleComponent/>
      <div class="col-11 col-md-9 m-auto p-1 mt-5 cabecalho rounded position-relative">
        <h2>Meus PDFs</h2>
        <div class="d-flex flex-row-reverse justify-content-evenly align-items-center">
          <font-awesome-icon icon="fa-solid fa-plus" class="fs-1 hover-click add-pdf-btn col-3" @click="openModal()" />
          <searchPdfComponent 
            class="col-10"
            @foundedPdfs="loadSearchPdfs($event)"  
            @cleanSearch="loadPdfs()"
          />
        </div>
      </div>
    </header>
    <body class="col-11 col-md-9 m-auto p-1 overflow-y-auto overflow-x-hidden rounded">
      <loadingComponent v-if="showLoadComponent" />
      <div class="row row-cols-md-3 row-cols-sm-2 row-cols-1 justify-content-around g-4 p-4" v-else>
        <pdfCard 
            v-for="pdf in pdfsList" 
            :key="pdf.id"
            :fileId="pdf.id" 
            :fileName="pdf.fileName" 
            :isFavorited="pdf.isFavorite"
            @favorite="switchFavorite(pdf, $event)"
            @deleted="deletePDF(pdf)"
        />
      </div>
    </body>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import searchPdfComponent from '@/components/searchPdfComponent.vue';
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
    userComponent,
    searchPdfComponent
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
    deletePDF(element) {
      this.pdfsList = this.pdfsList.filter(pdf => pdf.id !== element.id);
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
    },
    loadSearchPdfs(pdfs) {
      this.pdfsList = pdfs
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
    display: grid;
    grid-template-rows: min-content 1fr;
  }
  h1{
    color: var(--white);
  }

  body {
    height: 100%;
  }

  h2{
    color: black; 
  }

  .cabecalho, body{
    background-color: var(--bs-body-bg);
  }

  .cabecalho {
    min-height: 110px;
  }

  .add-pdf-btn{
    color: var(--background-color);
  }
</style>