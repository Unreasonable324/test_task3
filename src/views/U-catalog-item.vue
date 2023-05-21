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
        <div class="no-product" v-if="isNoProduct">
          К сожалению в данной категории товаров не найдено :(
        </div>
        <ULoader v-if="isLoader"></ULoader>

        <div class="wrapper-side-bar" v-if="children.length >= 2">
          <!-- <div
            class="side-bar_item"
            @click="
              () => {
                $router.push({
                  name: 'U-catalog-item',
                  query: {},
                  params: { category: category },
                });
                categoryItemsArray = true;
              }
            "
          >
            Все продукты
          </div> -->
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
import ULoader from '../components/UI/U-loader'
import UCartItem from "../components/U-cartItem";
import axios from "axios";
import UHeader from "../components/U-header";

export default {
  components: {
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
    // xxx(key) {
    //   console.log(key);
    // this.respondToRouteChanges = false;

    // this.$router.push([key]).finally(() => {
    //   this.respondToRouteChanges = true;
    // });
    // let xxx = `/${key}`;
    // this.respondToRouteChanges = false;
    // console.log(this.$router.replace);
    // this.$router.replace({ query: [key] }).finally(() => {
    //   console.log(this.respondToRouteChanges);
    //   this.respondToRouteChanges = true;
    // });

    // this.$router.replace({query: [key]})

    // this.$router.replace({
    //   query: { ...this.$route.query, page: [key] },
    // });
    // },
    dataCatalog(data, sityId) {
      this.sityId = sityId;
      this.categoryArray = data;
      this.children = [];
      this.isLoader = true;
      // console.log(sityId);
      axios
        // .get(`https://nlstar.com/ru/api/catalog3/v1/menutags/${this.category}`)
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
          console.log(8546);
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
/* .side-bar_item:active{
  background: red;
} */
/* .router-link-active {
  background: #e9eef3;
} */
.router-link-exact-active {
  background: #e9eef3;
}
.wrapper-catalog-item-content {
  /* position: relative; */
  gap: 34px;
  display: flex;
}
.wrapper-category-item {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 200px;
  /* justify-content: space-between; */
}
.category-item {
  display: flex;
  flex-direction: column;
  width: 276px;
  /* height: 494px; */
  background: #fff;
  box-shadow: 0px 2px 10px rgba(151, 151, 151, 0.2);
  border-radius: 0px 0px 5px 5px;
}
.no-product {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  /* background: rgba(255, 0, 0, 0.535); */
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  font-size: 40px;
}
.loader {
  width: 100px;
  height: 100px;
  border: 8px solid #000000;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
