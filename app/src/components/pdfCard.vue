<template>
  <div class="pdfcard col p-4">
    <div class="d-flex flex-column border border-3 py-3 rounded h-100">
        <div class="imgDiv d-flex align-items-center justify-content-center overflow-hidden w-100">
            <img :src="fileImg == null ? 'https://cdn-icons-png.flaticon.com/512/482/482216.png' : fileImg" alt="" class="h-100 object-fit-contain">
        </div>
        <span class="cardText fs-5 text-center m-2">{{ fileName }}</span>
    </div>
  </div>
</template>

<script>
export default {
    name: "pdfCard",
    props: ["fileName", "fileImg"]
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

.pdfcard>div:hover{
    cursor: pointer;
}

</style>