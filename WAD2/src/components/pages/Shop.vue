<template>
    <div>

        <head>
            <link rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        </head>

        <!-- Nav Bar -->
        <NavBar></NavBar>
        <!-- Nav Bar -->

        <!-- Back Button & Cart -->
        <div class="container">
            <div class='row'>
                <div class='col d-flex justify-content-start'>
                    <button v-if="['item', 'cart'].includes(shopPage)" type="button" class="shop-item-backbutton"
                        @click="toggleShop('shop')">Back to Shop</button>
                </div>
                <div class='col d-flex justify-content-end '>
                    <button v-if="['shop', 'item'].includes(shopPage)" type="button" class="shop-item-backbutton"
                        @click="toggleShop('cart')">
                        <img src="../../assets/cart.png" class="shop-item-backbutton-img mx-2">Cart
                        ({{ cartItemCount }})
                    </button>
                </div>
            </div>
        </div>
        <!-- Back Button & Cart -->

        <div v-if="shopPage === 'shop'">

            <!-- Filter Panel Start -->
            <div class="filterpanel p-3">
                <FilterBar @updateShopCards="updateShopCards" :maxPrice="highestItemPrice" :minPrice="lowestItemPrice"/>
            </div>
            <!-- Filter Panel End -->

            <div class="shop-cards-container px-5 py-3">
                <div v-for="(item, id) in filteredItems" class="d-inline-block">
                    <ShopCard v-if="(Number(item.price) > priceRange.min)" @toggleShop="toggleShop('item')"
                        @click="setcurrItemId(id)" :itemName='item.name' :itemPrice="item.price" :itemRating="item.rating" />
                </div>
            </div>
        </div>

        <div v-if="shopPage === 'item'">
            <ShopItem @addToCart="addToCart" @toggleShop="toggleShop" @addQuantity="addQuantity"
                @minusQuantity="minusQuantity" :itemId="currItemId" :quantity="currQuantity"
                :itemObject="items[currItemId]" :cartItemCount="cartItemCount" :imageSource="currImageSource" />
        </div>

        <div v-if="shopPage === 'cart'">
            <ShopCart @toggleShop="toggleShop" @checkout="checkout()" :shopcartCart="cart" />
        </div>

        <div v-if="shopPage === 'checkout'">
            <ShopCheckOut @toggleShop="toggleShop" />
        </div>
    </div>
</template>

<script>
import ShopCard from './ShopCard.vue'
import ShopItem from './ShopItem.vue'
import ShopCart from './ShopCart.vue'
import FilterBar from './FilterBar.vue'
import ShopCheckOut from './ShopCheckOut.vue'

// import data from '../../assets/amazon_pet_supplies_dataset_sample_small.json'

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
            priceRange: { min: 0, max: this.highestItemPrice },
            maxRating: 5,
            cart: {},
            // items2: data,
            items: {
                1: {
                    name: 'Dog Food',
                    price: 1.01,
                    rating: 1.1,
                    shipping: 'Free',
                    types: ['Small', 'Medium', 'Large'],
                    description: 'Desc 1',
                    reviews: {
                        '1': { name: 'Abe', rating: 1, reviewText: 'Taste good! Yes I ate it.' },
                        '2': { name: 'Ben', rating: 2, reviewText: 'Taste bad! I\'m a dog' }
                    },
                },
                2: {
                    name: 'Kitty Litter',
                    price: 2.02,
                    rating: 2.2,
                    shipping: '$2.00',
                    types: ['Small', 'Medium', 'Large'],
                    description: 'Desc 2',
                    reviews: {
                        '3': { name: 'Cathryn', rating: 4, reviewText: 'Taste good! Yes I ate it.' }
                    },
                },
                3: {
                    name: 'Cat Food',
                    price: 3.03,
                    rating: 3.3,
                    shipping: 'Free',
                    types: ['Small', 'Medium', 'Large'],
                    description: 'Desc 3',
                    reviews: {
                        '4': { name: 'David', rating: 5, reviewText: 'Works very good' },
                    },
                },
            },
            filteredItems : this.items,
        }
    },
    methods: {
        toggleShop(shopPage) {
            // Toggle shop from cards to item
            this.shopPage = shopPage
            this.currQuantity = 1
            console.log('Shop.vue > toggleShop()', shopPage)
        },
        setcurrItemId(itemId) {
            this.currItemId = itemId
            console.log(this.currItemId)
        },
        addQuantity() {
            this.currQuantity += 1
            console.log('Shop.vue > addQuantity()', this.currQuantity)
        },
        minusQuantity() {
            this.currQuantity -= 1
            if (this.currQuantity < 1) {
                this.currQuantity = 1
            }
            console.log('Shop.vue > minusQuantity()', this.currQuantity)
        },
        addToCart(itemObj) {
            if (itemObj.id in this.cart) {
                this.cart[itemObj.id].quantity += itemObj.quantity
            } else {
                this.cart[itemObj.id] = {}
                this.cart[itemObj.id].quantity = itemObj.quantity
                this.cart[itemObj.id].name = itemObj.name
                this.cart[itemObj.id].type = itemObj.type
                this.cart[itemObj.id].imageSource = itemObj.imageSource
            }
            console.log('Shop.vue > addToCart()', this.cart)
        },
        checkout() {
            console.log('checkout')
            this.cart = {}
            this.currItemId = ''
            this.currQuantity = 1
        },
        updateShopCards(filter) {
            this.priceRange.min = filter.min
            this.priceRange.max = filter.max
            this.maxRating = filter.rating
            console.log("Shop.vue > updateShopCards()", filter)
        },
    },
    computed: {
        cartItemCount() {
            return Object.keys(this.cart).length
        },
        filteredItems(){
            let filtered = {}
            for (const [id, item] of Object.entries(this.items)) {
                // console.log("Shop.vue > computed > filteredItems", info.price, this.priceRange.min)
                if (
                    Number(item.price) >= Number(this.priceRange.min) && 
                    Number(item.price) <= Number(this.priceRange.max) &&
                    Number(item.rating) <= Number(this.maxRating)
                ){
                    filtered[id] = item
                }
            }
            return filtered
        },
        highestItemPrice(){
            let highest = 0
            for (const [id, item] of Object.entries(this.items)) {
                if (item.price > highest){
                    highest = item.price
                }
            }
            return highest
        },
        lowestItemPrice(){
            let lowest = Infinity
            for (const [id, item] of Object.entries(this.items)) {
                if (item.price < lowest){
                    lowest = item.price
                }
            }
            return lowest
        }
    },
}
</script>

<style scoped>
.filterpanel {
    /* width: 20%; */
    height: auto;
    /* display: inline-block; */
    color: white;
    border: 1px solid white;
    margin: 0 15px 0 15px;
}

div.shop-cards-container {
    /* display: inline-block; */
    /* width: 80%; */
}

.shop-item-backbutton {
    margin: 10px 0 10px 0;
    font-size: 0.75em;
}

.shop-item-backbutton-img {
    width: 1.5em;
    height: 1.5em;
}
</style>
