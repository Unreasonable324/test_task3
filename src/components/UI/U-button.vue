<template>
  <div class="btn"><slot></slot></div>
</template>

<script>
export default {
  name: "U-button",
  created() {},
  data() {
    return {};
  },
  props: {
    isActive: {
      type: Boolean,
    },
  },
  methods: {},
};
</script>

<style>
.btn {
  height: 48px;
  border: 2px solid rgba(151, 151, 151, 0.3);
  border-radius: 24px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.75px;
  text-transform: uppercase;
  color: #acacac;
  cursor: not-allowed;
}

.btn_enabled {
  z-index: 2;
  position: relative;
  cursor: pointer;
  color: #ffffff;
  background: linear-gradient(270deg, #ffa800 0%, #ff6f00 60.2%);
}
.btn_enabled::after {
  z-index: -1;
  position: absolute;
  content: "";
  top: 10px;
  width: 85%;
  height: 90%;
}
.btn_enabled:hover::after {
  background: linear-gradient(
    270deg,
    rgba(255, 168, 0, 0.6) 0%,
    rgba(255, 111, 0, 0.6) 100%
  );
  filter: blur(13.5914px);
}
</style>
