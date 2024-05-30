<template>
    <tr>
        <td>{{ item.productName }}</td>
        <td>{{ item.priceUnit }}</td>
        <td>{{ item.startPrice }}</td>
        <td>{{ item.timeLimit }}시간</td>
        <td>{{ item.ptypeName }}</td>
        <td>{{ item.idolName }}</td>
        <td class="wrap-text">{{ plainText(item.productInfo) }}</td>
        <td>{{ item.storageStatus }}</td>
        <td>
            <div class="button-group">
                <button class="decline" @click="openPopup">거절</button>
                <button class="approve" @click="approveItem">승인</button>
                <button class="finalApprove" @click="finalApproveItem">최종 승인</button>
            </div>
        </td>
    </tr>
</template>

<script>

export default {
    components: {

    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    methods: {
        plainText(html) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            return tempDiv.textContent || tempDiv.innerText || '';
        },
        openPopup() {
            const width = 400;
            const height = 400;
            const left = (screen.width - width) / 2;
            const top = (screen.height - height) / 2;
            const popup = window.open("", "popup", `width=${width},height=${height},top=${top},left=${left}`);

            popup.item = this.item;

            const popupContent =
                '<html>' +
                '<head>' +
                '<title>거절 사유 입력</title>' +
                '<style>' +
                'body { font-family: Arial, sans-serif; padding: 20px; }' +
                'h3 { margin-top: 0; }' +
                'textarea { width: 100%; height: 100px; }' +
                '.buttons { display: flex; justify-content: flex-end; margin-top: 10px; }' +
                'button { padding: 5px 10px; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.3s; margin-left: 10px; }' +
                'button.confirm {\n' +
                '    padding: 5px 10px;\n' +
                '    background-color: #007bff;\n' +
                '    color: white;\n' +
                '    border: none;\n' +
                '    border-radius: 5px;\n' +
                '    cursor: pointer;\n' +
                '    transition: background-color 0.3s;\n' +
                '}\n' +
                'button.confirm:hover { background-color: #0056b3;; }' +
                'button.cancel { background-color: lightgray; }' +
                'button.cancel:hover { background-color: gray; color: white; }' +
                '.modal-buttons { display: flex; justify-content: flex-end; margin-top: 0px; }' +
                '.checkbox-group { display: flex; flex-direction: column; margin-bottom: 10px; }' +
                '.checkbox-group label { margin: 5px 0; }' +
                '</style>' +
                '</head>' +
                '<body>' +
                '<h3>거절 사유를 입력하세요</h3>' +
                '<div class="checkbox-group">' +
                '<label><input type="checkbox" value="상품 불량"> 상품 불량</label>' +
                '<label><input type="checkbox" value="경매 시간 부적합"> 경매 시간 부적합</label>' +
                '<label><input type="checkbox" value="카테고리 부적합"> 카테고리 부적합</label>' +
                '<label><input type="checkbox" value="아이돌 부적합"> 아이돌 부적합</label>' +
                '<label><input type="checkbox" value="상품명/상품설명 부적합"> 상품명/상품설명 부적합</label>' +
                '<label><input type="checkbox" value="기타"> 기타</label>' +
                '</div>' +
                '<textarea id="declineReason"></textarea><br>' +
                '<div class="modal-buttons">' +
                '<button class="cancel" onclick="window.close();">취소</button>' +
                '<button class="confirm" onclick="confirmAndClose();">확인</button>' +
                '</div>' +
                '<script>' +
                'async function confirmAndClose() {' +
                'const selectedReasons = Array.from(document.querySelectorAll(\'.checkbox-group input:checked\'))' +
                '.map(checkbox => checkbox.value)' +
                '.join(\', \');' +
                'const textareaValue = document.getElementById(\'declineReason\').value;' +
                'const reason = selectedReasons ? selectedReasons + \', \' + textareaValue : textareaValue;' +
                'await fetch("http://localhost:8080/admin/decline-product", {' +
                'method: "POST",' +
                'headers: {' +
                '"Content-Type": "application/json",' +
                '"Authorization": "Bearer " + sessionStorage.getItem(\'JWT_TOKEN\'),' +
                '},' +
                'body: JSON.stringify({ productId: window.item.productId, serialNumber: window.item.serialNumber, declineReason: reason })' +
                '});' +
                'window.opener.confirmDecline(reason);' +
                'window.close();' +
                '}' +
                '<\/script>' +
                '</body>' +
                '</html>';
            popup.document.write(popupContent);
        },
        approveItem() {
            this.$emit('approve', this.item);
        },
        finalApproveItem() {
            this.$emit('finalApprove', this.item);
        },
        confirmDecline(reason) {
            this.$emit('decline', reason);
        },
    },
};
</script>

<style scoped>
button {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 0 5px;
}

button.approve {
    background-color: lightgreen;
}

button.approve:hover {
    background-color: green;
    color: white;
}

button.finalApprove {
    background-color: lightblue;
}

button.finalApprove:hover {
    background-color: blue;
    color: white;
}

button.decline {
    background-color: lightcoral;
}

button.decline:hover {
    background-color: red;
    color: white;
}

.order-image {
    max-width: 200px;
    height: auto;
}
.wrap-text {
    word-wrap: break-word;
    white-space: normal;
}
.button-group {
    display: flex;
    justify-content: center;
}
th, td {
    white-space: nowrap;
    text-align: center;
}
</style>
