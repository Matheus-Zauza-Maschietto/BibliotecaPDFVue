<template>
    <div class="modal fade newPDFModal" :class="{show: modalIsOpen}" :style="{display: getDisplay()}"  >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" >
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Selecionar o arquivo PDF</h1>
                    <span style="color: red;" class="fs-3" @click="closeModal()">
                        <font-awesome-icon icon="fa-solid fa-xmark"/>
                    </span>
                </div>
                <div class="modal-body">    
                    <div class="my-5 col-9 m-auto">
                        <input class="form-control" type="file" accept=".pdf">
                    </div>
                    <div class="form-check mt-5 mb-3 d-flex justify-content-center">
                        <input class="form-check-input me-3" type="checkbox" value="" id="flexCheckDefault" @click="personalizedText = !personalizedText">
                        <label class="form-check-label" for="flexCheckDefault">
                            Adicionar nome personalizado ao arquivo
                        </label>
                    </div>
                    <div class="col-9 m-auto">
                        <input type="text" class="form-control mb-5" style="" :style="{display: getPersonalizedTextDisplay()}" placeholder="Digite o nome do arquivo ...">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success mx-auto my-2">Adicionar PDF selecionado</button>
                </div>
            </div> 
        </div>
    </div>
</template>

<script>
export default {
    name: "newPDFModal",
    props: {
        "modalIsOpen": Boolean
    },
    data(){
        return {
            personalizedText: false
        }
    },
    methods: {
        getDisplay(){
            return this.modalIsOpen ? "block" : "none"
        },
        closeModal(){
            this.$emit("fecharModal", "")
        },
        getPersonalizedTextDisplay(){
            return this.personalizedText ? "block" : "none";
        }
    }
}
</script>

<style scoped>
.modal-content{
    background-color: #1D1D1D;
}
</style>