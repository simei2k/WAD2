<template>
  <div class="shop-checkout-text">
    <h1><label>Thank you for buying our products! No payment needed!</label></h1>
    <button class="mx-auto m-3" @click="this.$emit('toggleShop','shop')">Back to Shop</button>
  </div>
</template>

<script>
export default {
  name:'ShopCheckOut',
  data() {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>

<style>
.shop-checkout-text{
  text-align: center;
}
</style>