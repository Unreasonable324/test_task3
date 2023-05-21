<template>
  <div class="wrapper_modal_window">
    <div class="wrapper_modal_window_body">
      <span class="xmark" @click="$emit('isModalWindow')">&#x2573;</span>
      <div class="modal-window_tittle">Выбор населённого пункта:</div>
      <div class="wrapper-search_sity">
        <div class="wrapper-found-sities">
          <input
            type="text"
            placeholder="Например, Санкт-петербург"
            @input="input"
            v-model="sitySearch"
          />
          <div
            class="xmark_input"
            v-if="sitySearch.length"
            @click="
              {
                (sitySearch = ''), (sityId = '');
              }
            "
          >
            &#x2573;
          </div>
          <div class="found-sities" v-if="sitySearch.length >= 3">
            <div
              class="found-city"
              v-for="foundCity in foundCities"
              :key="foundCity.id"
              @click="choice(foundCity.id, foundCity.label, foundCity.city)"
            >
              {{ foundCity.label }}
            </div>
          </div>
        </div>
        <UButton
          :isActive="isActive"
          :class="{ btn_enabled: !!sityId }"
          @click="
            () => {
              $emit('dataSity', sityId, sityName);
            }
          "
        >
          Подтвердить
        </UButton>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UButton from "./UI/U-button";
export default {
  components: { UButton },
  name: "U-modal-window-search-sity",
  created() {},
  data() {
    return {
      isActive: false,
      foundCities: [],
      sitySearch: "",
      sityId: "",
      sityName: "",
    };
  },
  props: {},

  methods: {
    input() {
      this.sityId = "";
      axios
        .get(`https://nlstar.com/ru/api/catalog3/v1/city/?term=${this.sitySearch}`)
        .then((response) => (this.foundCities = response.data.data))
        .catch(() => {
          console.log("error");
          this.foundCities = [];
        });
    },
    choice(sityId, sitylabel, sityName) {
      this.foundCities = [];
      this.sitySearch = sitylabel;
      this.sityId = sityId;
      this.sityName = sityName;
    },
  },
};
</script>

<style>
.wrapper_modal_window {
  z-index: 10;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  background: #35364780;
  mix-blend-mode: normal;
}
.wrapper_modal_window_body {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 769px;
  height: 144px;
  padding: 30px 20px;
  background: #ffffff;
  box-shadow: 0px 2px 10px rgba(151, 151, 151, 0.2);
  border-radius: 5px;
}
.xmark {
  position: absolute;
  right: 18px;
  top: 18px;
  font-size: 18px;
  color: #979797;
  transition: all 0.3s ease;
  cursor: pointer;
}
.xmark:hover {
  color: black;
  transform: scale(1.1);
}
.xmark_input {
  position: absolute;
  right: 20px;
  top: 11px;
  color: #979797;
  transition: all 0.3s ease;
  cursor: pointer;
}
.xmark_input:hover {
  color: black;
}
.modal-window_tittle {
  margin-bottom: 12px;
}
.wrapper-search_sity {
  display: flex;
  gap: 18px;
  width: 100%;
}
.wrapper-search_sity input {
  width: 100%;
  height: 48px;
  background: #ffffff;
  border: none;
  border-radius: 5px;
  font-weight: 400;
  font-size: 18px;
}
.wrapper-search_sity input:focus {
  outline: none;
}
::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: #979797;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #979797;
  opacity: 1;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #979797;
  opacity: 1;
}
:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #979797;
}
::-ms-input-placeholder {
  /* Microsoft Edge */
  color: #979797;
}

::placeholder {
  /* Most modern browsers support this now. */
  color: #979797;
}

.wrapper-found-sities {
  position: relative;
  width: 540px;
  padding: 0 12px;
  background: #fff;
  border: 1px solid rgba(151, 151, 151, 0.5);
  border-radius: 5px;
}
.found-sities {
  width: 100%;
  max-height: 190px;
  overflow-y: auto;
  border-top: 1px solid rgba(151, 151, 151, 0.3);
}
.found-city {
  width: 100%;
  color: #979797;
  cursor: pointer;
  font-weight: 400;
  font-size: 18px;
  padding: 12px 0;
}
.found-city:hover {
  color: #000;
}

.found-sities::-webkit-scrollbar {
  width: 8px;
}

.found-sities::-webkit-scrollbar-button {
  height: 4px;
}

.found-sities::-webkit-scrollbar-thumb {
  border-radius: 50px;
  background-color: rgba(151, 151, 151, 0.3);
}
</style>
