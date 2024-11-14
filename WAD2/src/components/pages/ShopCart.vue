<template>
  <div class='container-fluid'>

    <!-- <div class='row'>
      <div class='col-2 d-flex justify-content-left'>
        <button type="button" class="shop-item-backbutton" @click="this.$emit('toggleShop', 'shop')">Back to
          Shop</button>
      </div>
    </div> -->

    <!-- No items in Cart -->
    <div v-if="Object.keys(shopcartCart).length === 0" class="row justify-content-center my-3">No items in cart</div>

    <div class='row mb-2' v-for="(info, id) in shopcartCart">
      <div class="col-1"></div>
      <div class="col-10">
        <!-- Item Card -->
        <div class="card">
          <div class='container-fluid'>
            <div class='row'>
              <div class='col-2'>
                <img :src="info.imageSource" class="card-img" alt="Product Image">
              </div>
              <div class='col-2 my-auto'>
                {{ info.name }}
              </div>
              <div class='col-2 my-auto'>
                {{ info.type }}
              </div>
              <div class='col my-auto'>
                Quantity:
                <button :id="id" type="button" class="shop-item-quantity-button d-inline" @click="changeQuantityInput(id, -1)">-</button>

                <input :id="'input '+id" type="number" min="1"
                  class="form-control w-25 d-inline shop-item-quantity-input" :value="info.quantity">
                
                  <button :id="id" type="button" class="shop-item-quantity-button d-inline"
                  @click="changeQuantityInput(id, 1)">+</button>
              </div>
              <div class='col-1'></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-1"></div>
    </div>

    <div class="row" v-if="Object.keys(shopcartCart).length !== 0">
      <div class="col-8"></div>
      <div class="col-4">
        <button type="button" class="shop-cart-checkout-button" @click="checkout()">Check Out</button>
      </div>
    </div>
  </div>

</template>

<script scoped>
export default {
  name: 'ShopCart',
  components: {

  },
  props: {
    shopcartCart: Object,
  },
  data() {
    return {

    }
  },
  methods: {
    checkout() {
      this.$emit('toggleShop', 'checkout')
      this.$emit('checkout')
    },
    changeQuantityInput(id, amount) {
      // console.log(id, amount)
      let quantityInputEle = document.getElementById('input '+id)
      quantityInputEle.value = Number(quantityInputEle.value) + amount
      if (Number(quantityInputEle.value) < 1) {
        quantityInputEle.value = 1
      }
    }
  }
}
</script>

<style>
.shop-item-backbutton {
  margin: 10px 0 10px 0;
  font-size: 0.75em;
}

.shop-item-cart-button {
  margin-top: 10px;
}

.shop-item-quantity-button {
  font-size: 0.82em;
  margin: 0 5px 0 5px;
  border-radius: 5px;
  border: #ecdfcc solid 1px;
}

.shop-item-quantity-input,
input[type="number"].shop-item-quantity-input:focus {
  background-color: #1a1a1a;
  color: #ecdfcc;
  border: #ecdfcc solid 1px;
  text-align: center;
}

input[type="number"].shop-item-quantity-input::-webkit-inner-spin-button,
input[type="number"].shop-item-quantity-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.shop-cart-checkout-button {
  margin: 10px;
  border-radius: 5px;
}
</style>
