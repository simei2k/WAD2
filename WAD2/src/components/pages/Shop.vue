<script>
import NavBar from '../NavBar.vue'
import ShopCard from '../ShopCard.vue'

export default {
    components: {
        ShopCard,
    },
    data() {
        return {
            items: [
                { name: 'Dog Food', price: 1.01, rating: 1.1 },
                { name: 'Kitty Litter', price: 2.02, rating: 2.2 },
                { name: 'Cat Food', price: 3.03, rating: 3.3 },
            ]
        }
    }
}
</script>
<template>

    <head>
        <link rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>
    <NavBar></NavBar>
    <h1>this is shop</h1>

    <!-- Filter Panel Start -->
    <div class="filterpanel">
        <p>Filter Panel</p>
    </div>
    <!-- Filter Panel End -->

    <!-- Start Cards -->
    <div class="shop-cards-container">
        <!-- <ShopCard v-for="n in 10" itemName='name' itemPrice="price"></ShopCard> -->
        <ShopCard v-for="item in items" :itemName='item.name' :itemPrice="item.price" :itemRating="item.rating">
        </ShopCard>
    </div>
    <!-- End Cards -->
</template>

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