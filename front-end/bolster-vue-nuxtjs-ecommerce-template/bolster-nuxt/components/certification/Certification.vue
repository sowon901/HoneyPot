<template>
  <div class="imp-container">
    <h1>아임포트 본인인증</h1>
    <a-form
      :form="form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
      :colon="false"
      labelAlign="left"
      @submit="handleSubmit"
    >
      <a-form-item label="주문번호">
        <a-input
          v-decorator="[
            'merchantUid',
            { initialValue: initialMerchantUid },
          ]"
          size="large"
        />
      </a-form-item>
      <a-form-item label="회사명">
        <a-input
          v-decorator="['company', { initialValue: 'SIOT' }]"
          size="large"
        />
      </a-form-item>
      <a-form-item label="통신사">
        <a-select
          v-decorator="['carrier', { initialValue: 'SKT' }]"
          size="large"
        >
          <a-select-option value="SKT">
            SKT
          </a-select-option>
          <a-select-option value="KTF">
            KT
          </a-select-option>
          <a-select-option value="LGT">
            LGU+
          </a-select-option>
          <a-select-option value="MVNO">
            알뜰폰
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="이름">
        <a-input
          v-decorator="['name']"
          size="large"
        />
      </a-form-item>
      <a-form-item label="전화번호">
        <a-input
          v-decorator="['phone']"
          type="number"
          size="large"
        />
      </a-form-item>
      <a-form-item label="허용최소연령">
        <a-input
          v-decorator="['minAge']"
          type="number"
          size="large"
        />
      </a-form-item>
      <a-button size="large" @click="handleGoBack">
        뒤로가기
      </a-button>
      <a-button type="primary" html-type="submit" size="large">
        본인인증
      </a-button>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, {name: 'certification'}),
      initialMerchantUid: `mid_${new Date().getTime()}`,
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          const {
            merchantUid, company, carrier, name, phone, minAge,
          } = values;
          const {IMP} = window;
          IMP.init('imp16476367');
          const data = {
            merchant_uid: merchantUid,
            company,
            carrier,
            name,
            phone,
            min_age: minAge,
          };
          // IMP.certification(data, this.callback);
          IMP.certification({
            // merchant_uid : 'merchant_' + new Date().getTime() //본인인증과 연관된 가맹점 내부 주문번호가 있다면 넘겨주세요
            pg: 'inicis_unified.MIIiasTest',//본인인증 설정이 2개이상 되어 있는 경우 필수
            merchant_uid: "ORD20180131-0000011", // 주문 번호
            m_redirect_url: "{10.0.11.7:8080}", // 모바일환경에서 popup:false(기본값) 인 경우 필수, 예: https://www.myservice.com/payments/complete/mobile
            popup: false // PC환경에서는 popup 파라미터가 무시되고 항상 true 로 적용됨
          }, function (rsp) { // callback
            if (rsp.success) { // 인증 성공 시
              // jQuery로 HTTP 요청
              jQuery.ajax({
                url: "{/certifications}",
                method: "POST",
                headers: {"Content-Type": "application/json"},
                data: {imp_uid: rsp.imp_uid}
              });
            } else {
              alert("인증에 실패하였습니다. 에러 내용: " + rsp.error_msg);
            }
          });
        }
      });
    },
    handleGoBack() {
      this.$router.push('/');
    },
    callback(response) {
      // 본인인증 종료 후 result 페이지로 이동
      const query = {
        ...response,
        type: 'certification',
      };
      this.$router.push({path: '/result', query});

    },
  },
};
</script>
