<template>
  <UHeader v-on:getAxios="dataCatalog"></UHeader>
  <div class="wrapper-catalog-item">
    <div class="catalog-item_container">
      <div class="catalog-item_title">
        <router-link to="/"
          ><img src="../assets/icons/backtolink.png" alt=""
        /></router-link>
        <p>{{ categoruName }}</p>
      </div>
      <div class="wrapper-catalog-item-content">
        <UNoProduct v-if="isNoProduct"></UNoProduct>
        <ULoader v-if="isLoader"></ULoader>
        <div class="wrapper-side-bar" v-if="children.length >= 2">
          <div class="side-bar_item" @click="categoryItemsArray = true">
            <router-link :to="{ name: 'U-catalog-item', params: { category: category } }">
              Все продукты
            </router-link>
          </div>
          <div
            class="side-bar_item"
            v-for="kid in children"
            :key="kid.id"
            @click="categoryItemsArray = false"
          >
            <router-link
              :to="{ name: 'U-subcategory', params: { sub_category: kid['slug'] } }"
            >
              {{ kid.name }}
            </router-link>
          </div>
        </div>
        <div class="wrapper-category-item" v-if="categoryItemsArray">
          <div
            class="category-item"
            v-for="CategoryItem in categoryItems"
            :key="CategoryItem.id"
          >
            <UCartItem
              :image="CategoryItem.main_image_thumb_300"
              :categoryName="CategoryItem.category.name"
              :present_name="CategoryItem.present_name"
              :comment_name="CategoryItem.comment_name"
              :price="CategoryItem.price"
              :conditionsButton="{
                allowed: CategoryItem.allowed,
                available: CategoryItem.available,
              }"
            ></UCartItem>
          </div>
        </div>
        <router-view
          :sityId="sityId"
          @vIf="
            () => {
              categoryItemsArray = false;
            }
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import UNoProduct from "../components/UI/U-noProduct";
import ULoader from "../components/UI/U-loader";
import UCartItem from "../components/U-cartItem";
import axios from "axios";
import UHeader from "../components/U-header";

export default {
  components: {
    UNoProduct,
    ULoader,
    UCartItem,
    UHeader,
  },
  name: "U-catalog-item",
  created() {},
  data() {
    return {
      category: this.$attrs.category,
      categoryItems: [],
      categoryArray: [],
      categoryItemsArray: true,
      children: [],
      categoruName: "",
      sityId: "",
      isLoader: false,
      isNoProduct: false,
    };
  },
  props: {},
  mounted() {
    this.dataCatalog();
  },
  methods: {
    dataCatalog(data, sityId) {
      this.sityId = sityId;
      this.categoryArray = data;
      this.children = [];
      this.isLoader = true;
      this.isNoProduct = false;
      axios
        .get(
          `https://nlstar.com/ru/api/catalog3/v1/menutags/${this.category}/?city_id=${sityId}`
        )
        .then((response) => {
          this.categoryItems = response.data.products;
          this.subCategoryName();
          this.isLoader = false;
          if (!this.categoryItems.length) this.isNoProduct = true;
        })
        .catch(() => {
          console.log("error");
        });
    },
    subCategoryName() {
      for (const categoryItems of this.categoryArray) {
        if (categoryItems.slug === this.category) {
          this.categoruName = categoryItems.name;
          this.children.push(...categoryItems.children);
        }
      }
    },
  },
};
</script>

<style>
.wrapper-catalog-item {
}
.catalog-item_container {
}
.catalog-item_title {
  display: flex;
  align-items: center;
  gap: 10px;
}
.wrapper-side-bar {
}

.side-bar_item a {
  padding-left: 12px;
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 16px;
  text-decoration: none;
  color: black;
  width: 240px;
  height: 40px;
  border-bottom: 1px solid #e9eef3;
  cursor: pointer;
}
.side-bar_item:hover {
  background: #e9eef3;
}

.router-link-exact-active {
  background: #e9eef3;
}
.wrapper-catalog-item-content {
  gap: 34px;
  display: flex;
}
.wrapper-category-item {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 200px;
}
.category-item {
  display: flex;
  flex-direction: column;
  width: 276px;
  background: #fff;
  box-shadow: 0px 2px 10px rgba(151, 151, 151, 0.2);
  border-radius: 0px 0px 5px 5px;
}
</style>
