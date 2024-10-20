<template>

    <div class='container-fluid'>

        <div class='row'>
            <div class='col-2 d-flex justify-content-left'>
                <button type="button" class="shop-item-backbutton" @click="this.$emit('toggleShop')">Back to Shop</button>
            </div>
        </div>
        
        <div class='row'>

            <!-- Image Column -->
            <div class='col-3 d-flex justify-content-center'>
                <img src="../../assets/dog_sitting.jpg" class="item-img shop-item-img-margin
" alt="...">
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
                            {{itemObject.shipping}}
                        </div>
                    </div>
                    <div class='row pb-2'>
                        <div class='col-3 d-flex align-items-center'>
                            Type
                        </div>
                        <div class='col-9'>
                            <select class="form-select shop-item-type-select">
                                <option value="" selected hidden>Select Type</option>
                                <option v-for="type in itemObject.types">{{ type }}</option>
                            </select>
                        </div>
                    </div>
                    <div class='row pb-2'>
                        <div class='col-3 d-flex align-items-center'>
                            Quantity
                        </div>
                        <div class='col'>
                            <input type="number" v-model="quantity" class="form-control w-25 d-inline shop-item-quantity-input">
                            <button type="button" class="shop-item-quantity-button" @click="addQuantity">+</button>
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
                            <Review v-for="review in itemObject.reviews" :name="review.name" :rating="review.rating" :reviewText="review.reviewText"></Review>
                        </div>
                    </div>
                </div>
                <!-- Item Info Container -->

            </div>
            <!-- Item Info Column -->

        </div>
    </div>

</template>

<script>
import NavBar from '../NavBar.vue'
import Review from './Review.vue'

export default {
    name: 'ShopItem',
    components: {
        Review,
    },
    props:{
        itemId:String,
        itemObject:Object,
    },
    data() {
        return {
            quantity: 1,
        }
    },
    methods:{
        addQuantity(){
            this.quantity += 1
        },
    }
}
</script>

<style scoped>
.shop-item-backbutton{
    margin: 10px 0 10px 0 ;
    font-size: 0.75em;
}

.shop-item-img-margin{
    width: 70%;
    height: fit-content;
    margin: 50px 0px 0px 0px;
}

.shop-item-quantity-button{
    font-size: 0.82em;
    margin-left: 10px;
    border-radius: 5px;
    border: #ecdfcc solid 1px;
}

.shop-item-type-select{
    background-color: #1a1a1a;
    color: #ecdfcc;
    border: #ecdfcc solid 1px;
    width: fit-content;
    max-width: 100%;
}

.shop-item-quantity-input, input[type="number"].shop-item-quantity-input:focus{
    background-color: #1a1a1a;
    color: #ecdfcc;
    border: #ecdfcc solid 1px;
    text-align: center;
}

input[type="number"].shop-item-quantity-input::-webkit-inner-spin-button, input[type="number"].shop-item-quantity-input::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>