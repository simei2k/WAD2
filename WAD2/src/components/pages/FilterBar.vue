<template>
  <div class="container m-0">
    <div class="row">

      <div class="col-1 my-auto">
        Filter:
      </div>

      <div class="col">
        Search:
        <input class="mt-1" type="text" id="shop-filter-searchbar">
      </div>

      <div class="col">
        <!-- Min Price -->
        <div class="mb-1">
          <label class="filter-label" for="min-price">Min Price:</label>
          <input id="min-price" type="number" :value="minPrice" step="0.01" class="min-price" placeholder="0"
            @input="updateFilter" min="0" />
        </div>
        <!-- Min Price -->
        <!-- Max Price -->
        <div class="">
          <label class="filter-label" for="max-price">Max Price:</label>
          <input id="max-price" type="number" :value="maxPrice" step="0.1" class="max-price" placeholder="0"
            @input="updateFilter" min="0" />
        </div>
        <!-- Max Price -->
      </div>

      <div class="col">
        <!-- Rating -->
        <div class="d-inline-block">
          <label class="filter-label" for="max-price">Rating:</label>
          5<span class="fa fa-star checked"></span>
          <input id="shop-filter-rating-input" type="range" class="" value=5 @input="updateFilter" min="1" max="5" />
          1<span class="fa fa-star checked"></span>
        </div>
        <!-- Rating -->
      </div>

      <div class="col"></div>

    </div>
  </div>

  <!-- 
  <div class="price-filter align-items-center">
    <div class="filter-title d-inline-block my-auto">
      Filter:
    </div>

    <div class="d-inline-block mx-3">
      <div class="mb-1">
        <label class="filter-label" for="min-price">Min Price:</label>
        <input id="min-price" type="number" :value="minPrice" class="min-price" placeholder="0" @input="updateFilter"
          min="0" />
      </div>

      <div class="">
        <label class="filter-label" for="max-price">Max Price:</label>
        <input id="max-price" type="number" :value="maxPrice" class="max-price" placeholder="0" @input="updateFilter"
          min="0" />
      </div>
    </div>

    <div class="d-inline-block mx-3">
      <label class="filter-label" for="max-price">Rating:</label>
      1 <input id="shop-filter-rating-input" type="range" class="" @input="updateFilter" min="0" max="5" /> 5
    </div>

    <div class="d-inline mx-3">

    </div>
  </div> -->
</template>

<script>
export default {
  props: {
    maxPrice: Number,
    minPrice: Number
  },
  data() {
    return {
      // minPrice: 0,
      // maxPrice: 1000,
      // currentPriceRange: 500,
    }
  },
  methods: {
    updateFilter() {
      this.$emit("updateShopCards", {
        minPrice: Number(document.getElementById('min-price').value),
        maxPrice: Number(document.getElementById('max-price').value),
        maxRating: Number(document.getElementById('shop-filter-rating-input').value),
        search: document.getElementById('shop-filter-searchbar').value,
      });
      // console.log("FilterBar.vue > updatePriceFilter()")
    }
  }
}
</script>

<style scoped>
/* Container for the filter bar */
.price-filter {
  padding: 10px;
}

.filter-title {
  margin: 0 10px 10px 10px;
  text-align: center;
}

/* Style for the labels */
.filter-label {
  font-size: 0.7em;
  /* margin-right: 10px;
  
  color: #fff; */
}

/* Style for the min and max input boxes */
.min-price,
.max-price {
  font-size: 0.7em;
  width: 60px;
  margin: 0 0 0 10px;
  /* display: block;
  
  padding: 5px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  text-align: center; */
}

#shop-filter-rating-input {
  width: 4em;
}

.stars {
  font-size: 0.7em;
  margin-bottom: 1em;
}
</style>
