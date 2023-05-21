<template>
  <UHeader v-on:getAxios="dataCatalog"></UHeader>
  <div class="wrapper-catalog">
    <div class="catalog_container">
      <div class="catalog_title">
        <p>Категории товаров</p>
      </div>
      <ULoader v-if="isLoader"></ULoader>
      <div class="wrapper-catalog-items">
        <div
          class="wrapper-catalog_item"
          v-for="catalogObject in catalogArray"
          :key="catalogObject.id"
          :style="{
            backgroundImage: `url(${catalogObject.image})`,
            color: `${catalogObject.text_color}`,
          }"
          @click="
            $router.push({
              name: 'U-catalog-item',
              query: {},
              params: { category: catalogObject['slug'] },
            })
          "
        >
          {{ catalogObject.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ULoader from "../components/UI/U-loader";
import UHeader from "../components/U-header";
export default {
  components: {
    ULoader,
    UHeader,
  },
  name: "U-catalog",
  created() {},
  data() {
    return {
      catalogArray: [],
      isLoader: true,
    };
  },
  props: {},
  mounted() {
    this.dataCatalog();
  },
  methods: {
    dataCatalog(data) {
      this.catalogArray = data;
      if (this.catalogArray !== undefined) this.isLoader = false;
    },
  },
};
</script>

<style>

.wrapper-catalog-items {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.wrapper-catalog_item {
  cursor: pointer;
  width: 271px;
  height: 152px;
  border-radius: 5px;
  padding: 20px;
  font-weight: 600;
  font-size: 24px;
  transition: all 0.3s ease;
  background-size: cover;
  background-position: center;
  
}
.wrapper-catalog_item:hover {
  transform: scale(1.05);
}
</style>
