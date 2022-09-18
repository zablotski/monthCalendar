<template>
  <EventModal @close="$emit('close')">
    <template #header>Add Event:</template>
    <template #body>
      <input type="text" v-model="text" name="newEvent" id="newEventInput" />
      <button class="modal-default-button" @click="$emit('submit', text)">
        OK
      </button>
    </template>
  </EventModal>
</template>
<script>
import EventModal from "@/components/EventModal.vue";

export default {
  name: "AddEventModal",
  data: function () {
    return {
      text: "",
    };
  },
  components: { EventModal },
  emits: ["submit", "close"],
};
</script>
<style scoped></style>
