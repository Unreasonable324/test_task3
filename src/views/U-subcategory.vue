<template>
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
      <!-- <img :src="subCategoryItem.main_image_thumb_300" alt="" />
      <div class="sub-categoty-item-data">
        <div class="category_name_item">{{ subCategoryItem.category.name }}</div>
        <div class="present_name_item">{{ subCategoryItem.present_name }}</div>

        <div class="sub_data_item">
          <div class="comment_name_item">{{ subCategoryItem.comment_name }}</div>
          <div class="price_item">{{ subCategoryItem.price }} ₽</div>

          <UButton
            :class="{ btn_enabled: subCategoryItem.allowed || subCategoryItem.available }"
            >{{
              subCategoryItem.allowed || subCategoryItem.available
                ? "В корзину"
                : "Нет в наличии"
            }}</UButton
          >
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import UCartItem from "../components/U-cartItem";

// import UButton from "../components/UI/U-button";
import axios from "axios";
export default {
  components: { UCartItem },
  name: "U-subcategory",
  created() {},
  data() {
    return {
      subCategory: this.$attrs.sub_category,
      subCategoryItems: [],
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
      // console.log(newVal);
      // console.log(oldVal);
      this.getSubCategory();
    },
  },
  mounted() {
    this.getSubCategory();
    this.$emit("vIf");
  },
  methods: {
    getSubCategory() {
      axios
        .get(
          `https://nlstar.com/ru/api/catalog3/v1/menutags/${this.subCategory}/?city_id=${this.sityId}`
        )
        .then((response) => {
          this.subCategoryItems = response.data.products;
        })
        .catch(() => {
          console.log(8546);
        });
    },
  },
};
</script>

<style>

</style>
