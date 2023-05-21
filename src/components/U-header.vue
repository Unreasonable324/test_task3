<template>
  <div class="header">
    <div class="header_container">
      <div class="wrapper-choosing_a_city" @click="isModalWindow = true">
        <img src="../assets/icons/Fill1.png" alt="" />
        <span>{{ sityName }}</span>
      </div>
    </div>
  </div>
  <UModalWindowSearchSity
    v-if="isModalWindow"
    v-on:dataSity="dataSity"
    v-on:isModalWindow="
      () => {
        isModalWindow = false;
      }
    "
  ></UModalWindowSearchSity>
</template>

<script>
import axios from "axios";
import UModalWindowSearchSity from "./U-modal-window-search-sity";
export default {
  components: { UModalWindowSearchSity },
  name: "U-header",
  created() {},
  data() {
    return {
      isModalWindow: false,
      sityName: "Новосибирск",
      catalogArray: [],
      sityId: 1,
    };
  },
  props: {},

  mounted() {
    this.getAxios();
    if (localStorage.sityId) this.sityId = +localStorage.sityId;
    if (localStorage.sityName) this.sityName = localStorage.sityName;
  },
  watch: {
    sityId(newId) {
      localStorage.sityId = newId;
    },
    sityName(newName) {
      localStorage.sityName = newName;
    },
    isModalWindow: function () {
      if (this.isModalWindow) {
        document.documentElement.style.overflow = "hidden";
        return;
      }

      document.documentElement.style.overflow = "auto";
    },
  },
  methods: {
    dataSity(sityId, sityName) {
      this.isModalWindow = !this.isModalWindow;
      this.sityName = sityName;
      this.sityId = sityId;
      this.getAxios();
    },
    getAxios() {
      axios
        .get(`https://nlstar.com/ru/api/catalog3/v1/menutags/?city_id=${this.sityId}`)
        .then((response) => {
          this.catalogArray = response.data.tags;
          this.$emit("getAxios", this.catalogArray, this.sityId);
        });
    },
  },
};
</script>

<style>
.header {
  width: 100%;
  box-shadow: 0px 2px 4px rgba(39, 39, 39, 0.1);
  display: flex;
  align-items: center;
  height: 72px;
  background: #fff;
}
.header_container {
  min-width: 1170px;
}
.wrapper-choosing_a_city {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
}
.wrapper-choosing_a_city:hover span {
  color: blue;
}
</style>
