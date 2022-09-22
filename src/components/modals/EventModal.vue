<script>
export default {
  methods: {
    onWrapperClick(e) {
      if (e.target === this.$refs.modalWrapper) {
        this.$emit("close");
      }
    },
  },
  emits: ["close"],
};
</script>

<template>
  <div class="modal-mask">
    <div class="modal-wrapper" @click="onWrapperClick" ref="modalWrapper">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header"> </slot>
          <button class="modal-default-button" @click="$emit('close')">
            X
          </button>
        </div>

        <div class="modal-body">
          <slot name="body"></slot>
        </div>

        <div class="modal-footer">
          <slot name="footer"> </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0 auto;
  padding: 1rem;
  background-color: #fff;
}

.modal-header h3 {
  margin-top: 0;
  color: lightgrey;
}

.modal-body {
  margin: 1.25rem 0;
}

.modal-default-button {
  float: right;
}
</style>
