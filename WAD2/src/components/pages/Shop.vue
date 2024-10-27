<template>
    <div>

        <head>
            <link rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        </head>
        <NavBar></NavBar>

        <div v-if="shopPage==='shop'">

            <!-- Filter Panel Start -->
            <div class="filterpanel">
                <FilterBar/>
            </div>
            <!-- Filter Panel End -->

            <div class="shop-cards-container">
                <ShopCard @toggleShop="toggleShop('item')" @click="setcurrItemId(item.asin)" v-for="item in items"
                    :itemName='item.name' :itemPrice="item.price" :itemRating="1"/>
            </div>
        </div>

        <div v-if="shopPage==='item'">
            <ShopItem @addToCart="addToCart" @toggleShop="toggleShop" @addQuantity="addQuantity" @minusQuantity="minusQuantity" :itemId="currItemId" :quantity="currQuantity" :itemObject="items[currItemId]" :cartItemCount="cartItemCount" :imageSource="currImageSource"/>
        </div>

        <div v-if="shopPage==='cart'">
            <ShopCart @toggleShop="toggleShop" @checkout="checkout()" :shopcartCart="cart"/>
        </div>

        <div v-if="shopPage==='checkout'">
            <ShopCheckOut @toggleShop="toggleShop"/>
        </div>
    </div>
</template>

<script>
import ShopCard from './ShopCard.vue'
import ShopItem from './ShopItem.vue'
import ShopCart from './ShopCart.vue'
import FilterBar from './FilterBar.vue'
import ShopCheckOut from './ShopCheckOut.vue'

import data from '../../assets/amazon_pet_supplies_dataset_sample_small.json'

export default {
    components: {
        ShopCard,
        ShopItem,
        ShopCart,
        FilterBar,
        ShopCheckOut,
    },
    data() {
        return {
            shopPage: 'shop',
            currItemId: '',
            currQuantity: 1,
            currImageSource: "../../assets/dog_sitting.jpg",
            cart : {},
            items2:data,
            items: {
                '1': {
                    name: 'Dog Food',
                    price: 1.01,
                    rating: 1.1,
                    shipping: 'Free',
                    types: ['Small', 'Medium', 'Large'],
                    description: 'Desc 1',
                    reviews: {
                        '1':{name:'Abe', rating:1, reviewText:'Taste good! Yes I ate it.'},
                        '2':{name:'Ben', rating:2, reviewText:'Taste bad! I\'m a dog'}
                    },
                },
                '2': {
                    name: 'Kitty Litter',
                    price: 2.02, 
                    rating: 2.2, 
                    shipping: '$2.00', 
                    types: ['Small', 'Medium', 'Large'],
                    description: 'Desc 2',
                    reviews: {
                        '3':{name:'Cathryn', rating:4, reviewText:'Taste good! Yes I ate it.'}
                    },
                },
                '3': { 
                    name: 'Cat Food', 
                    price: 3.03, 
                    rating: 3.3, 
                    shipping: 'Free', 
                    types: ['Small', 'Medium', 'Large'],
                    description: 'Desc 3',
                    reviews: {
                        '4':{name:'David', rating:5, reviewText:'Works very good'},
                    },
                },
            }
        }
    },
    methods: {
        toggleShop(shopPage) {
            // Toggle shop from cards to item
            this.shopPage = shopPage
            this.currQuantity = 1
            console.log('toggleShop: ', shopPage)
        },
        setcurrItemId(itemId) {
            this.currItemId = itemId
            // console.log(this.currItemId)
        },
        addQuantity(){
            this.currQuantity += 1
            console.log('addQuantity',this.currQuantity)
        },
        minusQuantity(){
            this.currQuantity -= 1
            if (this.currQuantity < 1){
                this.currQuantity = 1
            }
            console.log('minusQuantity',this.currQuantity)
        },
        addToCart(itemObj){
            if (itemObj.id in this.cart){
                this.cart[itemObj.id].quantity += itemObj.quantity
            }else{
                this.cart[itemObj.id] = {}
                this.cart[itemObj.id].quantity = itemObj.quantity
                this.cart[itemObj.id].name = itemObj.name
                this.cart[itemObj.id].type = itemObj.type
                this.cart[itemObj.id].imageSource = itemObj.imageSource
            }
            console.log('addToCart', this.cart)
        },
        checkout(){
            console.log('checkout')
            this.cart = {}
            this.currItemId = ''
            this.currQuantity = 1
        },
    },
    computed:{
        cartItemCount(){
            return Object.keys(this.cart).length
        }
    },
}
</script>

<style scoped>
.filterpanel {
    width: 20%;
    height: auto;
    display: inline-block;
    color: white;
    border: 1px solid white;
    margin: 0px;
}

div.shop-cards-container {
    display: inline-block;
    width: 80%;
}
</style>

