<template>

    <div class='container-fluid'>

        <div class='row'>
            <div class='col-1 d-flex justify-content-center'>
                <button type="button" class="shop-item-backbutton-margin" @click="this.$emit('shopToggle')">Back</button>
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
            <div class='col'>

                <!-- Item Info Container -->
                <div class='container-fluid'>
                    <div class='row'>
                        <div class='col'>
                            <h1>Item Name</h1>
                        </div>
                    </div>
                    <div class='row pb-4'>
                        <div class='col'>
                            <h4>Item Price</h4>
                        </div>
                    </div>
                    <div class='row pb-2'>
                        <div class='col-2'>
                            Shipping
                        </div>
                        <div class='col'>
                            Shipping info
                        </div>
                    </div>
                    <div class='row pb-2'>
                        <div class='col-2'>
                            Type
                        </div>
                        <div class='col'>
                            <select name="" id="">
                                <option value="" selected hidden>Select Type</option>
                                <option value="">Option 1</option>
                                <option value="">Option 2</option>
                                <option value="">Option 3</option>
                            </select>
                        </div>
                    </div>
                    <div class='row pb-2'>
                        <div class='col-2'>
                            Quantity
                        </div>
                        <div class='col'>
                            Quantity info
                        </div>
                    </div>
                    <div class='row pt-5'>
                        <div class='col-9'>
                            <h4>Item Description</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                    </div>
                    <div class='row pt-5'>
                        <div class='col-9'>
                            <h4>Product Ratings</h4>
                        </div>
                    </div>
                    <div class='row'>
                        <div class='col-9'>
                            review component here
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

export default {
    name: 'ShopItem',
    components: {

    },
    data() {
        return {

        }
    }
}
</script>

<style scoped>
.shop-item-backbutton-margin{
    margin: 10px 0 10px 0 ;
}

.shop-item-img-margin{
    width: 70%;
    height: fit-content;
    margin: 50px 0px 0px 0px;
}
</style>