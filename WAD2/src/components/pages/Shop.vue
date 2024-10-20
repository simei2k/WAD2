<template>
<div>
    <head>
        <link rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>
    <NavBar></NavBar>

    <div v-if="isShop">
        <!-- Filter Panel Start -->
        <div class="filterpanel">
            <p>Filter Panel</p>
        </div>
        <!-- Filter Panel End -->

        <!-- Start Cards -->
        <div class="shop-cards-container">
            <!-- <ShopCard v-for="n in 10" itemName='name' itemPrice="price"></ShopCard> -->
            <ShopCard @toggleShop="toggleShop()" @click="setcurrItemId(idx)" v-for="(item,idx) in items" :itemName='item.name' :itemPrice="item.price" :itemRating="item.rating">
            </ShopCard>
        </div>
        <!-- End Cards -->
    </div>
    <div v-if="!isShop">
        <ShopItem  @toggleShop="toggleShop()" :itemId="currItemId" :itemObject="items[currItemId]"></ShopItem>
    </div>
</div>
</template>

<script>
import NavBar from '../NavBar.vue'
import ShopCard from '../ShopCard.vue'
import ShopItem from './ShopItem.vue'

export default {
    components: {
        ShopCard,
        ShopItem,
    },
    data() {
        return {
            isShop: true,
            currItemId: '',
            items: {
                '1': { name: 'Dog Food', price: 1.01, rating: 1.1, description:'Desc 1' },
                '2': { name: 'Kitty Litter', price: 2.02, rating: 2.2 },
                '3': { name: 'Cat Food', price: 3.03, rating: 3.3 },
            }
        }
    },
    methods:{
        toggleShop(){
            // Toggle shop from cards to item
            this.isShop = !this.isShop
            // console.log('shopToggle')
        },
        setcurrItemId(itemId){
            this.currItemId = itemId
            // console.log(this.currItemId)
        }
    }
}
</script>

<style scoped>
.filterpanel {
    width: 17%;
    height: auto;
    display: inline-block;
    color: white;
    border: 1px solid white;
    margin: 0px;
}

div.shop-cards-container {
    display: inline-block;
    width: 83%;
}
</style>