<template>
  <EventModal @close="$emit('close')">
    <template #header>Edit Event:</template>
    <template #body>
      <input type="text" v-model="text" name="editEvent" id="editEventInput" />
      <button class="modal-default-button" @click="$emit('submit', text)">
        OK
      </button>
    </template>
  </EventModal>
</template>
<script>
import EventModal from "@/components/EventModal.vue";
export default {
  components: { EventModal },
  name: "EditEventModal",
  data() {
    return {
      text: this.event.text,
    };
  },
  props: {
    event: Object,
    day: Object,
  },
};
</script>
<style scoped></style>
