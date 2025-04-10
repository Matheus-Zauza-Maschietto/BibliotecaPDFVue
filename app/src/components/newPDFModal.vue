<template>
    <div class="modal fade newPDFModal" :class="{show: modalIsOpen}" :style="{display: getDisplay()}">
        <div class="modal-dialog modal-dialog-centered">
            <form class="modal-content" @submit.prevent="postPDFFile">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Selecionar o arquivo PDF</h1>
                    <span style="color: red;" class="fs-3 hover-click" @click="closeModal()">
                        <font-awesome-icon icon="fa-solid fa-xmark"/>
                    </span>
                </div>
                <div class="modal-body d-flex flex-column align-items-center">    
                    <div class="col-9 my-5">
                        <input 
                            class="form-control" 
                            type="file" 
                            accept=".pdf" 
                            @change="handleFileChange"
                            ref="fileInput"
                        >
                    </div>
                    <div class="form-check col-9 d-flex justify-content-center mb-5">
                        <input 
                            class="form-check-input me-3" 
                            type="checkbox" 
                            value="" 
                            id="publicPdf" 
                            :checked="publicFile"
                            v-model="publicFile"
                        >

                        <label class="form-check-label text-white" for="publicPdf">
                            Arquivo de acesso publico
                        </label>
                    </div>
                    <div class="form-check col-9 d-flex justify-content-center mb-3">
                        <input 
                            class="form-check-input me-3" 
                            type="checkbox" 
                            value="" 
                            id="personalizedName" 
                            :checked="personalizedText"
                            v-model="personalizedText"
                        >

                        <label class="form-check-label text-white" for="personalizedName">
                            Adicionar nome personalizado ao arquivo
                        </label>
                    </div>
                    <div class="col-9 mb-5">
                        <input 
                            type="text" 
                            class="form-control" 
                            :style="{display: getPersonalizedTextDisplay()}" 
                            placeholder="Digite o nome do arquivo ..." 
                            v-model="customFileName">
                    </div>
                </div>
                <div class="modal-footer d-flex flex-column justify-content-around">
                    <loadingComponent v-if="disableButton"/>
                    <button 
                        type="submit" 
                        class="btn btn-success mx-auto my-2" 
                        :disabled="disableButton"
                    >
                        Adicionar PDF selecionado
                    </button>
                </div>
            </form> 
        </div>
    </div>
</template>

<script>
import Pdf from '@/services/Pdf';
import loadingComponent from './loadingComponent.vue';

export default {
    name: "newPDFModal",
    props: {
        "modalIsOpen": Boolean
    },
    components: {
        loadingComponent
    },
    data() {
        return {
            publicFile: false,
            inputFileValue: null,
            personalizedText: false,
            file: null,
            customFileName: '',
            disableButton: false
        };
    },
    methods: {
        getDisplay() {
            return this.modalIsOpen ? "block" : "none";
        },

        closeModal() {
            this.$emit("closeModal", "");
            this.file = null;
            this.personalizedText = false;
            this.customFileName = '';
            this.inputFileValue = null;
            this.disableButton = false;
        },

        getPersonalizedTextDisplay() {
            return this.personalizedText ? "block" : "none";
        },

        handleFileChange(event) {
            const selectedFile = event.target.files[0];
            if (selectedFile && selectedFile.type === "application/pdf") {
                this.file = selectedFile;
            } else {
                this.file = null;
                alert("Por favor selecione um arquivo PDF valido.");
            }
        },

        async postPDFFile() {
            this.disableButton = true;
            if (!this.file) {
                alert("No file selected.");
                this.disableButton = false;
                return;
            }

            const formData = new FormData();
            formData.append('isPublic', this.publicFile);
            if (this.personalizedText && this.customFileName.trim()) {
                formData.append('formFile', this.file, this.customFileName.trim());
            }
            else {
                formData.append('formFile', this.file);
            }

            try {
                const response = await Pdf.postFile(formData);
                alert(`${response.data.messages.find(p => p)}`);
                this.closeModal();

            } catch (error) {
                alert('Erro ao adicionar PDF, por favor tente novamente !');
            }
            finally {
                this.file = null;
                this.personalizedText = false;
                this.customFileName = '';
                this.disableButton = false;
                this.inputFileValue = null;
                this.$emit('newPdf', true)
            }
        }
    }
};
</script>

<style scoped>
    .newPDFModal {
        backdrop-filter: blur(10px);
    }
    .modal-content {
        background-color: #1D1D1D;
    }
</style>
