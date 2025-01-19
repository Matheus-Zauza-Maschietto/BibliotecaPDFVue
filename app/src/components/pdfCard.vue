<template>
  <div class="pdf-card d-flex flex-column col p-0 m-2" @click="openPdf()">
    <div class="internal-card hover-click position-relative">
        <div class="favorite position-absolute">
            <font-awesome-icon icon="fa-solid fa-star" style="color: rgb(211 164 0);" class="function-icon" v-if="isFavorited" @click.stop="switchFavorite()" />
            <font-awesome-icon icon="fa-regular fa-star" style="color: rgb(211 164 0);" class="function-icon" v-else @click.stop="switchFavorite()" />
        </div>
        <font-awesome-icon icon="fa-regular fa-file-pdf" class="pdf-icon position-absolute"/>
        <span class="fs-5 w-100 text-nowrap text-center my-2 position-absolute bottom-0">{{ getPdfName() }}</span>
    </div>
    <div class="card-functions d-flex justify-content-evenly align-items-center">
        <button class="btn btn-dark function-icon-button">
            <font-awesome-icon icon="fa-solid fa-pencil" class="edit-function" @click.stop="" />
        </button>
        <button class="btn btn-dark function-icon-button">
            <font-awesome-icon icon="fa-solid fa-trash" class="delete-function" @click.stop="" />
        </button>
    </div>
  </div>
</template>

<script>
import Pdf from '@/services/Pdf';

export default {
    name: "pdfCard",
    props: ["fileName", "fileImg", "isFavorited"],
    methods: {
        openPdf() {
            const encodedPdfName = encodeURIComponent(this.fileName);
            this.$router.push(`/pdf/${encodedPdfName}`);
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
                const response = await Pdf.unfavorite(this.fileName);
                if(!response.status == 200){
                    this.$emit('favorite', true);
                }
            }
            else{
                this.$emit('favorite', true);
                const response = await Pdf.favorite(this.fileName);
                if(!response.status == 200){
                    this.$emit('favorite', false);
                }
            }
        },
        
    }
}
</script>

<style>
.pdf-image{
    height: 90%;
}

.pdf-card{
    height: 300px;
    width: 250px;
    border-radius: 10px;
    background: var(--background-color);
}

.internal-card {
    background: var(--white);
    border-radius: 10px;
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
    width: 225px;
    height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 15px auto;
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

</style>