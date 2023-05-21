<template>
  <div class="wrapper-loader" >
    <span>Подождите идет загрузка</span><span class="loader"></span>
  </div>
</template>

<script>
export default {
  name: "U-loader",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>

<style>
.wrapper-loader {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: whitesmoke;
  padding: 15px;
  box-shadow: 0px 2px 10px rgba(151, 151, 151, 0.2);
  border-radius:5px;
  border: 1px solid rgb(227, 227, 227);
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
