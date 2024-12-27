<template>
  <div class="home">
    <header>
      <h1 class="text-center m-auto pt-4">Biblioteca <span style="color: #ff0000;">PDF</span></h1>
      <div class="col-9 m-auto p-1 mt-5 cabecalho rounded position-relative">
        <h2>Meus PDFs</h2>
        <span class="appendPDFBtn fs-1 hover-click" @click="openModal()">
          <font-awesome-icon icon="fa-solid fa-plus"/>
        </span>
      </div>
    </header>
    <newPDFModal :modalIsOpen="modalIsOpen" @fecharModal="modalIsOpen=false" />
    <body class="col-9 m-auto p-1 mt-3 body row row-cols-md-3 row-cols-sm-2 row-cols-1 overflow-y-scroll rounded">
      <pdfCard v-for="pdf in pdfsList" :key="pdf.name" fileName="pdf.name"/>
    </body>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import pdfCard from '@/components/pdfCard.vue';
import newPDFModal from '@/components/newPDFModal.vue';
import Pdf from '@/services/Pdf';

export default {
  name: 'HomeView',
  components: {
    pdfCard,
    newPDFModal
  },
  data(){
    return{
      modalIsOpen: false,
      pdfsList: []
    }
  },
  methods:{
    openModal(){
      this.modalIsOpen = true;
    }
  },

  async created() {
    try {
      console.log(this.$store.state)
      const response = await Pdf.getAll(this.$store.state.token);
      console.log(response)
      this.pdfsList = response.data.response;
    } catch (err) {
      console.log(err)
      this.error = 'Failed to load posts. Please try again.';
    }
  },
}
</script>

<style>
  .home{
    background: #1D1D1D;
    height: 100vh;
  }
  h1{
    color: #F4F4F4;
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