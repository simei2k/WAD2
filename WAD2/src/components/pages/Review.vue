<template>
  <div class="card w-100" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <div class="stars">
        <!-- Do math and display no. of stars. No rating above 5 stars -->
        <span class="fa fa-star checked" v-for="n in Math.min(5, Math.floor(rating))"></span>
        <span class="fa fa-star" v-for="n in 5 - Math.min(5, Math.floor(rating))"></span>
      </div>
      <p class="card-text">{{ reviewText }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Review',
  props: {
    name: String,
    rating: Number,
    reviewText: String,
  }
}
</script>

<style scoped>
.card {
  margin-bottom: 10px;
  padding: 13px;
}

.card-body {
  margin-top: 0px;
}

.stars {
  font-size: 0.7em;
  margin-bottom: 1em;
}
</style>