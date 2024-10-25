<template>

    <div class='container-fluid'>

        <div class='row'>
            <div class='col-2 d-flex justify-content-left'>
                <button type="button" class="shop-item-backbutton" @click="this.$emit('toggleShop', 'shop')">Back to
                    Shop</button>
            </div>
            <div class='col-9'></div>
            <div class='col-1 d-flex justify-content-right'>
                <button type="button" class="shop-item-backbutton" @click="this.$emit('toggleShop', 'cart')">Cart {{
                    cartItemCount }}</button>
            </div>
        </div>

        <div class='row'>

            <!-- Image Column -->
            <div class='col-3 d-flex justify-content-center'>
                <img :src="getImageUrl(imageSource)" class="item-img shop-item-img-margin
" alt="Item Image">
            </div>
            <!-- Image Column -->

            <!-- Item Info Column -->
            <div class='col-6'>

                <!-- Item Info Container -->
                <div class='container-fluid'>
                    <div class='row'>
                        <div class='col'>
                            <h1>{{ itemObject.name }}</h1>
                        </div>
                    </div>
                    <div class='row pb-4'>
                        <div class='col'>
                            <h4>${{ itemObject.price }}</h4>
                        </div>
                    </div>
                    <div class='row pb-2'>
                        <div class='col-3'>
                            Shipping
                        </div>
                        <div class='col'>
                            {{ itemObject.shipping }}
                        </div>
                    </div>
                    <div class='row pb-2'>
                        <!-- TYPE INPUT -->
                        <div class='col-3 d-flex align-items-center'>
                            Type
                        </div>
                        <div class='col-9'>
                            <select id="type-input" class="form-select shop-item-type-select">
                                <option value="" selected hidden>Select Type</option>
                                <option v-for="type in itemObject.types">{{ type }}</option>
                            </select>
                        </div>
                    </div>
                    <div class='row pb-2'>
                        <!-- QUANTITY INPUT -->
                        <div class='col-3 d-flex align-items-center'>
                            Quantity
                        </div>
                        <div class='col'>
                            <button type="button" class="shop-item-quantity-button d-inline"
                                @click="changeQuantityInput(-1)">-</button>
                            <input id="quantity-input" type="number" min="1"
                                class="form-control w-25 d-inline shop-item-quantity-input" value=1>
                            <button type="button" class="shop-item-quantity-button d-inline"
                                @click="changeQuantityInput(1)">+</button>
                        </div>
                    </div>
                    <div class='row'>
                        <!-- ADD TO CART -->
                        <div class='col'>
                            <button type="button" class="shop-item-cart-button" @click="addToCart()">Add to
                                Cart</button>
                        </div>
                    </div>
                    <div class='row pt-5'>
                        <div class='col'>
                            <h4>Item Description</h4>
                            <p>{{ itemObject.description }}</p>
                        </div>
                    </div>
                    <div class='row pt-5'>
                        <div class='col'>
                            <h4>Product Ratings</h4>
                        </div>
                    </div>
                    <div class='row'>
                        <div class='col'>
                            <Review v-for="review in itemObject.reviews" :name="review.name" :rating="review.rating"
                                :reviewText="review.reviewText"></Review>
                        </div>
                    </div>
                </div>
                <!-- Item Info Container -->

            </div>
            <!-- Item Info Column -->

        </div>
    </div>

</template>

<script scoped>
import Review from './Review.vue'

export default {
    name: 'ShopItem',
    components: {
        Review,
    },
    props: {
        itemId: String,
        itemObject: Object,
        cartItemCount: Number,
        type: String,
        imageSource: String,
    },
    data() {
        return {

        }
    },
    methods: {
        getImageUrl(imageSource) {
            // This path must be correct for your file
            return new URL(`${imageSource}`, import.meta.url)
        },
        addToCart() {
            let t = document.getElementById('type-input').value
            console.log(t)
            if (t !== '') {
                let cartItem = {
                    id: this.itemId + "-" + t,
                    name: this.itemObject.name,
                    type: t,
                    quantity: Number(document.getElementById('quantity-input').value),
                    imageSource: this.getImageUrl(this.imageSource),
                }
                this.$emit('addToCart', cartItem)
            } else {
                alert("Please select a type!") // Change to display modal
            }
        },
        changeQuantityInput(amount) {
            let quantityInputEle = document.getElementById('quantity-input')
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

.shop-item-img-margin {
    width: 70%;
    height: fit-content;
    margin: 50px 0px 0px 0px;
}

.shop-item-type-select {
    background-color: #1a1a1a;
    color: #ecdfcc;
    border: #ecdfcc solid 1px;
    width: fit-content;
    max-width: 100%;
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

.shop-item-cart-button {
    margin-top: 10px;
}
</style>