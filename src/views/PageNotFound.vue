<template>
  <div class="not-found">
    <h1>404 Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <router-link to="/">Go to Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound'
};
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
}
.not-found h1 {
  font-size: 3em;
  margin-bottom: 20px;
}
.not-found p {
  font-size: 1.2em;
  margin-bottom: 20px;
}
.not-found a {
  text-decoration: none;
  color: #42b983;
  font-size: 1.2em;
}
</style>
