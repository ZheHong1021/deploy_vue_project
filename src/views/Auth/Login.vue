<template>
  <v-container class="d-flex justify-center align-center" fill-height>
    <v-card class="pa-5" elevation="10">
      <v-card-title class="text-h5 font-weight-bold">
        登入頁面
      </v-card-title>

      <v-form v-model="valid" ref="form" @submit.prevent="login">
        <v-card-text>
          <!-- 帳號 -->
          <v-text-field
            v-model="username"
            :rules="[rules['requiredRules'], rules['usernameRules']]"
            label="帳號"
            outlined
            required
          ></v-text-field>
          <!-- 密碼 -->
          <v-text-field
            v-model="password"
            :rules="[rules['requiredRules'], rules['passwordRules']]"
            label="密碼"
            outlined
            type="password"
            required
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" type="submit" class="font-weight-bold"
            :loading="loading"
            :disabled="loading">
            登入
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { rules } from '@/utils';
export default {
  data() {
    return {

      //#region (輸入)
      username: "haha",
      password: "haha45La",
      // username: null,
      // password: null,
      //#endregion

      // (驗證)
      valid: false,

      // 登入載入中
      loading: false,

      // 將 rules給載入
      rules: rules,

    };
  },
  methods: {
    async login() {
      // 前端驗證(Vuetify)      
      if(!this.$refs.form.validate()){
        this.$swal.fire("請確認填寫完整", "", "warning")
        return
      }

      // 執行 API
      this.loading = true
      const formData = new FormData()
      formData.append("username", this.username)
      formData.append("password", this.password)
      await this.$store.dispatch("auth/login", formData) // 登入
      this.loading = false
    },
  },
};
</script>

<style scoped>
.v-card {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.v-btn {
  width: 100%;
}
</style>
