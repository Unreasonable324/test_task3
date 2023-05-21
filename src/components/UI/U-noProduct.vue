<template>
  <div class="no-product">К сожалению в данной категории товаров не найдено :(</div>
</template>

<script>
export default {
  name: "U-noProduct",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>

<style>
.no-product {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
</style>
