<template>
  <UNoProduct v-if="isNoProduct"></UNoProduct>
  <div class="wrapper-category-item">
    <div
      class="category-item"
      v-for="subCategoryItem in subCategoryItems"
      :key="subCategoryItem.id"
    >
      <UCartItem
        :image="subCategoryItem.main_image_thumb_300"
        :categoryName="subCategoryItem.category.name"
        :present_name="subCategoryItem.present_name"
        :comment_name="subCategoryItem.comment_name"
        :price="subCategoryItem.price"
        :conditionsButton="{
          allowed: subCategoryItem.allowed,
          available: subCategoryItem.available,
        }"
      ></UCartItem>
    </div>
  </div>
</template>

<script>
import UNoProduct from "../components/UI/U-noProduct";
import UCartItem from "../components/U-cartItem";

import axios from "axios";
export default {
  components: {
    UNoProduct,
    UCartItem,
  },
  name: "U-subcategory",
  created() {},
  data() {
    return {
      subCategory: this.$attrs.sub_category,
      subCategoryItems: [],
      isNoProduct: false,
    };
  },
  props: {
    sityId: {
      type: Number,
    },
  },
  watch: {
    "$attrs.sub_category": function (newVal) {
      this.subCategory = newVal;
      this.getSubCategory();
    },
    sityId: function () {
      this.getSubCategory();
    },
  },
  mounted() {
    this.getSubCategory();
    this.$emit("vIf");
  },
  methods: {
    getSubCategory() {
      this.isNoProduct = false;

      axios
        .get(
          `https://nlstar.com/ru/api/catalog3/v1/menutags/${this.subCategory}/?city_id=${this.sityId}`
        )
        .then((response) => {
          this.subCategoryItems = response.data.products;
          if (!this.subCategoryItems.length) this.isNoProduct = true;
        })
        .catch(() => {
          console.log("error");
        });
    },
  },
};
</script>

<style></style>
