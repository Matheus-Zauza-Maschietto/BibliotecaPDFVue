<template>
  <div class="pdf-card col p-2 m-2 position-relative rounded" @click="openPdf()">
    <div class="internal-card hover-click position-relative rounded">
        <div class="favorite position-absolute">
            <font-awesome-icon icon="fa-solid fa-star" style="color: rgb(211 164 0);" class="function-icon" v-if="isFavorited" @click.stop="switchFavorite()" />
            <font-awesome-icon icon="fa-regular fa-star" style="color: rgb(211 164 0);" class="function-icon" v-else @click.stop="switchFavorite()" />
        </div>
        <font-awesome-icon icon="fa-regular fa-file-pdf" class="pdf-icon position-absolute"/>
        <span class="fs-5 w-100 text-nowrap text-center my-2 position-absolute bottom-0">{{ getPdfName() }}</span>
    </div>
    <div class="card-functions d-flex justify-content-evenly align-items-center">
        <button class="btn btn-dark function-icon-button" @click.stop="editeCard = true" >
            <font-awesome-icon icon="fa-solid fa-pencil" class="edit-function"/>
        </button>
        <button class="btn btn-dark function-icon-button" @click.stop="deleteCard = true"  >
            <font-awesome-icon icon="fa-solid fa-trash" class="delete-function"/>
        </button>
    </div>
    <div class="position-absolute top-0 start-0 h-100 z-2 delete-confirm rounded" :style="{'width': deleteCard ? '100%' : '0%' }" @click.stop="" >
        <div class="position-relative w-100 h-100 p-3 confirm-body" :style="{'display': deleteCard ? 'block' : 'none' }">
            <button class="btn btn-close top-0 end-0 position-absolute m-3" @click.stop="deleteCard = false"></button>
            <h1 class="fs-4 mt-3 text-dark">Tem certeza que deseja excluir o seguinte pdf:</h1>
            <p class="fs-5 fw-bolder">{{ fileName }}</p>
            <loadingComponent v-if="tryingDelete"/>
            <div class="d-flex justify-content-evenly my-auto">
                <button class="btn btn-secondary" @click="deleteCard = false">
                    Cancelar
                </button>
                <button class="btn btn-danger" @click="deletePdf()" :disabled="tryingDelete">
                    Deletar
                </button>
            </div>
        </div>
    </div>
    <div class="position-absolute top-0 start-0 h-100 z-2 update-confirm rounded" :style="{'width': editeCard ? '100%' : '0%' }" @click.stop="" >
        <div class="position-relative w-100 h-100" :style="{'display': editeCard ? 'block' : 'none' }">
            <button class="btn btn-close top-0 end-0 m-3 position-absolute" @click.stop="editeCard = false"></button>
            
        </div>
    </div>
  </div>
</template>

<script>
import Pdf from '@/services/Pdf';
import loadingComponent from './loadingComponent.vue';

export default {
    name: "pdfCard",
    props: ["fileId", "fileName", "fileImg", "isFavorited"],
    components: {
        loadingComponent
    },
    data() {
        return {
            deleteCard: false,
            editeCard: false,
            tryingDelete: false
        }
    },
    methods: {
        openPdf() {
            this.$router.push(`/pdf/${this.fileId}`);
        },
        getPdfName(){
            let fileName = this.fileName.replace('.pdf', '');
            if(fileName.length <= 20)
                return fileName;
            else
                return fileName.substring(0, 17)+'...'
        },
        async switchFavorite(){
            if(this.isFavorited){
                this.$emit('favorite', false);
                const response = await Pdf.unfavorite(this.fileId);
                if(!response.status == 200){
                    this.$emit('favorite', true);
                }
            }
            else{
                this.$emit('favorite', true);
                const response = await Pdf.favorite(this.fileId);
                if(!response.status == 200){
                    this.$emit('favorite', false);
                }
            }
        },
        async deletePdf(){
            try{
                this.tryingDelete = true
                let response = await Pdf.deleteById(this.fileId)
                if(response.status == 200){
                    this.$emit('deleted')
                }
            }
            catch {
                alert("Houve um erro durante a deleção. Tente novamente.");
            }
            finally{
                this.tryingDelete = false;
            }
        
        }
        
    }
}
</script>

<style>
.confirm-body {
    transition-delay: 0.2s;
}

.pdf-card{
    height: 320px;
    width: 250px;
    background: var(--background-color);
    display: grid;
    grid-template-rows: 1fr 1fr;
}

.favorite{
    top: 5px;
    left: 5px;
}

.function-icon{
    font-size: 30px;
    transition-duration: 0.3s;
}

.internal-card {
    width: 100%;
    height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: var(--white);
}

.function-icon:hover{
    cursor: pointer;
    transform: scale(1.15);
}

.function-icon-button > svg{
    font-size: 29px;
    transition-duration: 0.3s;
}

.function-icon-button:hover > svg {
    cursor: pointer;
    transform: scale(1.10);
}

.pdf-icon {
    font-size: 110px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.edit-function {
    color: var(--card-gray);
}

.delete-function {
    color: red;
}

.delete-confirm, .update-confirm {
    transition-duration: 0.1s;
    background: var(--card-gray);
}

</style>