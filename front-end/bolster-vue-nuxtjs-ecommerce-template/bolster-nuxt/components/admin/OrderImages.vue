<template>
    <tr>
        <td v-if="item.image1">
            <img :src="item.image1" alt="Image 1" class="order-image" @click="openImagePopup(item.image1)">
        </td>
        <td v-if="item.image2">
            <img :src="item.image2" alt="Image 2" class="order-image" @click="openImagePopup(item.image2)">
        </td>
        <td v-if="item.image3">
            <img :src="item.image3" alt="Image 3" class="order-image" @click="openImagePopup(item.image3)">
        </td>
        <td v-if="item.image4">
            <img :src="item.image4" alt="Image 4" class="order-image" @click="openImagePopup(item.image4)">
        </td>
        <td v-if="item.image5">
            <img :src="item.image5" alt="Image 5" class="order-image" @click="openImagePopup(item.image5)">
        </td>
    </tr>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    methods: {
        openImagePopup(imageUrl) {
            const width = 800; // 팝업 너비
            const height = 600; // 팝업 높이
            const left = (screen.width - width) / 2;
            const top = (screen.height - height) / 2;
            const popup = window.open("", "imagePopup", `width=${width},height=${height},top=${top},left=${left}`);
            popup.document.write(`
                <html>
                <head>
                    <title>원본 이미지</title>
                </head>
                <body style="margin:0; display:flex; justify-content:center; align-items:center; height:100vh;">
                    <img src="${imageUrl}" style="max-width:100%; max-height:100%;">
                </body>
                </html>
            `);
        }
    },
};
</script>

<style scoped>
.order-image {
    max-width: 100px;
    height: auto;
    cursor: pointer;
}
th, td {
    white-space: nowrap;
    text-align: center;
}
</style>
