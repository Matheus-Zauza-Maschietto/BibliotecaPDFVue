<template>
    <div class="modal fade newPDFModal" :class="{show: modalIsOpen}" :style="{display: getDisplay()}">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Selecionar o arquivo PDF</h1>
                    <span style="color: red;" class="fs-3 hover-click" @click="closeModal()">
                        <font-awesome-icon icon="fa-solid fa-xmark"/>
                    </span>
                </div>
                <div class="modal-body">    
                    <div class="my-5 col-9 m-auto">
                        <input 
                            class="form-control" 
                            type="file" 
                            accept=".pdf" 
                            @change="handleFileChange"
                        >
                    </div>
                    <div class="form-check mt-5 mb-3 d-flex justify-content-center">
                        <input 
                            class="form-check-input me-3" 
                            type="checkbox" 
                            value="" 
                            id="flexCheckDefault" 
                            @click="personalizedText = !personalizedText">
                        <label class="form-check-label text-white" for="flexCheckDefault">
                            Adicionar nome personalizado ao arquivo
                        </label>
                    </div>
                    <div class="col-9 m-auto">
                        <input 
                            type="text" 
                            class="form-control mb-5" 
                            :style="{display: getPersonalizedTextDisplay()}" 
                            placeholder="Digite o nome do arquivo ..." 
                            v-model="customFileName">
                    </div>
                </div>
                <div class="modal-footer">
                    <button 
                        type="button" 
                        class="btn btn-success mx-auto my-2" 
                        @click="postPDFFile"
                        :disabled="disableButton"
                    >
                        Adicionar PDF selecionado
                    </button>
                </div>
            </div> 
        </div>
    </div>
</template>

<script>
import Pdf from '@/services/Pdf';

export default {
    name: "newPDFModal",
    props: {
        "modalIsOpen": Boolean
    },
    data() {
        return {
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
                this.disableButton = false;
            } catch (error) {
                alert('Erro ao adicionar PDF, por favor tente novamente !');
                this.disableButton = false;
            }
            this.$emit('newPdf', true)
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
