<template>
  <img :src="image" alt="" />
  <div class="sub-categoty-item-data">
    <div class="category_name_item">{{ categoryName }}</div>
    <div class="present_name_item">{{ present_name }}</div>
    <div class="sub_data_item">
      <div class="comment_name_item">{{ comment_name }}</div>
      <div class="price_item">{{ price }} ₽</div>
      <UButton
        :class="{ btn_enabled: conditionsButton.allowed || conditionsButton.available }"
        >{{
          conditionsButton.allowed || conditionsButton.available
            ? "В корзину"
            : "Нет в наличии"
        }}</UButton
      >
    </div>
  </div>
</template>

<script>
import UButton from "../components/UI/U-button";

export default {
  components: {
    UButton,
  },
  name: "U-cartItem",
  created() {},
  data() {
    return {};
  },
  props: {
    image: {
      type: String,
    },
    categoryName: {
      type: String,
    },
    present_name: {
      type: String,
    },
    comment_name: {
      type: String,
    },
    price: {
      type: String,
    },
    conditionsButton: {
      type: Boolean,
    },
  },
  methods: {},
};
</script>

<style>
.sub-category-item img {
  width: 100%;
}
.sub-categoty-item-data {
  display: flex;
  flex-direction: column;
  padding: 0 32px 25px 32px;
  text-align: center;
  flex: 1;
}
.category_name_item {
  font-weight: 400;
  font-size: 14px;
  color: #979797;
  margin-bottom: 4px;
}
.present_name_item {
  font-weight: 600;
  font-size: 20px;
  color: #272727;
  margin-bottom: 9px;
}
.comment_name_item {
  font-weight: 400;
  font-size: 16px;
  color: #272727;
  margin-bottom: 14px;
}
.price_item {
  font-weight: 600;
  font-size: 26px;
  color: #272727;
  margin-bottom: 16px;
}
.sub_data_item {
  margin-top: auto;
}
</style>
