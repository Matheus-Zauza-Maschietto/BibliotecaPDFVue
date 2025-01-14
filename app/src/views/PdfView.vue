<template>
    <div class="pdf-view-container">
        <header class="position-relative top-0 w-100 z-1">
            <h1 class="m-auto text-center align-self-center fs-2">Visualizador de PDF</h1>
            <router-link to="/" class="back-to-home fs-3 text-white">
                Voltar
            </router-link>
        </header>
        <div v-if="errorMessage" class="error-message fs-3"> 
            <p>{{ errorMessage }}</p>
        </div>
        <iframe v-else-if="pdfBlobUrl" :src="pdfBlobUrl" width="100%" height="100%"></iframe>
        <loadingComponent v-else/>
    </div>
</template>

<script>
    import Pdf from '@/services/Pdf';
    import loadingComponent from '@/components/loadingComponent.vue';

    export default {
        name: "PdfView",
        data() {
            return {
                pdfBlobUrl: null,
                errorMessage: null
            };
        },
        components: {
            loadingComponent
        },
        methods: {
            async fetchPdf() {
                try {
                    const encodedPdfName = this.$route.params.encodedPdfName;

                    const decodedPdfName = decodeURIComponent(encodedPdfName);

                    const response = await Pdf.getFile(decodedPdfName)

                    const fileContent = response.data;

                    if (fileContent) {
                        const blob = new Blob([fileContent], { type: 'application/pdf' });
                        const tempUrl = URL.createObjectURL(blob);
                        this.pdfBlobUrl = tempUrl;
                    } else {
                        throw new Error('Dados inválidos retornados da API.');
                    }
                } catch (error) {
                    console.error('Erro ao buscar o PDF:', error);
                    this.errorMessage = 'Não foi possível carregar o PDF. Tente novamente mais tarde.';
                }
            }
        },
        async created() {
            await this.fetchPdf();
        }
    };
</script>

<style scoped>
    .pdf-view-container {
        text-align: center;
        background-color: var(--background-color);
        height: 100vh;
        display: grid;
        grid-template-rows: auto 1fr;
    }

    .error-message {
        color: red;
        font-weight: bold;
    }
    header {
        min-height: 50px;
        height: 5%;
    }

    .back-to-home {
        top: 50%;
        left: 20px;
        transform: translateY(-50%);
        position: absolute;
    }

    iframe {
        width: 100%;
    }

</style>