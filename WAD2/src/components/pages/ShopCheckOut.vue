<template>
  <div class="shop-checkout-text fs-">
    Thank you for buying our products! No payment needed!
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