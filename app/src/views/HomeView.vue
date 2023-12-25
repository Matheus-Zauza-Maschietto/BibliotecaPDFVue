<template>
  <div class="home">
    <header>
      <h1 class="text-center m-auto pt-4">Biblioteca <span style="color: #ff0000;">PDF</span></h1>
      <div class="col-9 m-auto p-1 mt-5 cabecalho rounded position-relative">
        <h2>Meus PDFs</h2>
        <span class="appendPDFBtn fs-1" @click="openModal()">
          <font-awesome-icon icon="fa-solid fa-plus"/>
        </span>
      </div>
    </header>
    <newPDFModal :modalIsOpen="modalIsOpen" @fecharModal="modalIsOpen=false" />
    <body class="col-9 m-auto p-1 mt-3 body row row-cols-md-3 row-cols-sm-2 row-cols-1 overflow-y-scroll rounded">
      <pdfCard fileName="Teste" fileImg="https://img.freepik.com/vetores-gratis/unicornio-fofo-ilustracao-do-icone-do-vetor-dos-desenhos-animados-surpreso-conceito-de-icone-de-natureza-animal-isolado-plano_138676-7054.jpg"/>
      <pdfCard fileName="Teste"/>
      <pdfCard fileName="Teste"/>
      <pdfCard fileName="Teste"/>
      <pdfCard fileName="Teste"/>
      <pdfCard fileName="Teste"/>
      <pdfCard fileName="Teste" fileImg="https://img.freepik.com/vetores-gratis/unicornio-fofo-ilustracao-do-icone-do-vetor-dos-desenhos-animados-surpreso-conceito-de-icone-de-natureza-animal-isolado-plano_138676-7054.jpg"/>
      <pdfCard fileName="Teste"/>
      <pdfCard fileName="Teste" fileImg="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc77BKyQK4uus6JRfSbNOd8L6rXQsypcosrQ&usqp=CAU"/>
      <pdfCard fileName="Teste"/>
      <pdfCard fileName="Teste"/>
      <pdfCard fileName="Teste"/>
      <pdfCard fileName="Teste" fileImg="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc77BKyQK4uus6JRfSbNOd8L6rXQsypcosrQ&usqp=CAU"/>
      <pdfCard fileName="Teste" fileImg="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc77BKyQK4uus6JRfSbNOd8L6rXQsypcosrQ&usqp=CAU"/>
      <pdfCard fileName="Teste" fileImg="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc77BKyQK4uus6JRfSbNOd8L6rXQsypcosrQ&usqp=CAU"/>
      <pdfCard fileName="Teste" fileImg="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc77BKyQK4uus6JRfSbNOd8L6rXQsypcosrQ&usqp=CAU"/>
      <pdfCard fileName="Teste" fileImg="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc77BKyQK4uus6JRfSbNOd8L6rXQsypcosrQ&usqp=CAU"/>
      <pdfCard fileName="Teste" fileImg="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc77BKyQK4uus6JRfSbNOd8L6rXQsypcosrQ&usqp=CAU"/>
      <pdfCard fileName="Teste" fileImg="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc77BKyQK4uus6JRfSbNOd8L6rXQsypcosrQ&usqp=CAU"/>
      <pdfCard fileName="Teste"/>
    </body>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import pdfCard from '@/components/pdfCard.vue';
import newPDFModal from '@/components/newPDFModal.vue';
 
export default {
  name: 'HomeView',
  components: {
    pdfCard,
    newPDFModal
  },
  data(){
    return{
      modalIsOpen: false
    }
  },
  methods:{
    openModal(){
      this.modalIsOpen = true;
    }
  }
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

  .appendPDFBtn:hover{
    cursor: pointer;
  }
</style>