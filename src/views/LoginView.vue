<template>
  <v-container class="d-flex justify-center align-center login-container" fill-height>
    <v-card class="pa-5" max-width="400">
      <v-card-title class="text-h5">Login</v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="form">
          <v-text-field
            v-model="username"
            :rules="usernameRules"
            label="Username"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="login">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      username: '',
      password: '',
      usernameRules: [
        v => !!v || 'Username is required',
        v => v.length >= 3 || 'Username must be at least 3 characters',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be at least 6 characters',
      ],
    };
  },
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        // Handle login logic here
        console.log('Username:', this.username);
        console.log('Password:', this.password);
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  background: #f5f5f5;
}
.v-card {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.v-btn {
  width: 100%;
}
</style>
