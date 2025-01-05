<template>
  <div class="pdfcard col p-4" @click="openPdf()">
    <div class="d-flex flex-column border border-3 py-3 rounded h-100 hover-click position-relative">
        <div class="favorite position-absolute">
            <font-awesome-icon icon="fa-solid fa-star" style="color: rgb(211 164 0);" class="favorite-icon" v-if="isFavorited" @click.stop="switchFavorite()" />
            <font-awesome-icon icon="fa-regular fa-star" style="color: rgb(211 164 0);" class="favorite-icon" v-else @click.stop="switchFavorite()" />
        </div>
        <div class="imgDiv d-flex align-items-center justify-content-center overflow-hidden w-100">
            <img :src="fileImg == null ? 'https://cdn-icons-png.flaticon.com/512/482/482216.png' : fileImg" alt="" class="h-100 object-fit-contain">
        </div>
        <span class="cardText fs-5 text-center m-2">{{ fileName }}</span>
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
.imgDiv{
    height: 90%;
}
.cardText{
    height: 10%;
}

.pdfcard{
    height: 250px;
}

.favorite{
    top: 5px;
    left: 5px;
}

.favorite-icon{
    font-size: 30px;
    transition-duration: 0.3s;
}

.favorite-icon:hover{
    cursor: pointer;
    transform: scale(1.15);
}

</style>