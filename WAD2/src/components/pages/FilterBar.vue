<template>
  <div class="price-filter">
    <div class="filter-title">

    </div>

    <div>
      <label class="filter-label" for="min-price">Min Price:</label>
      <input type="number" v-model="minPrice" class="min-price" placeholder="0" @input="updatePriceFilter" min="0" />
    </div>

    <div>
      <label class="filter-label" for="max-price">Max Price:</label>
      <input type="number" v-model="maxPrice" class="max-price" placeholder="1000" @input="updatePriceFilter"
        :min="minPrice" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      minPrice: 0,
      maxPrice: 1000,
      min: 0,
      max: 1000,
      currentPriceRange: 500,
    }
  },
  methods: {
    updatePriceFilter() {
      this.$emit("price-filter", { min: this.minPrice, max: this.maxPrice });
    }
  }
}
</script>

<style scoped>
/* Container for the filter bar */
.price-filter {
  /* display: flex;
  align-items: left;
  padding: 10px;
  background-color: #1a1a1a;
  border: 1px solid #fff;
  border-radius: 5px; */
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
</style>
