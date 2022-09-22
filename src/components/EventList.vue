<template>
  <ul class="event-list">
    <li v-for="event of day.events" :key="event" class="event-item">
      <span class="event-text">{{ event.text }}</span>
      <span class="actions-list">
        <button @click.stop="() => deleteEvent(day, event)">X</button>
        <button @click.stop="() => editEvent(day, event)">&#9998;</button>
      </span>
    </li>
  </ul>
</template>
<script>
export default {
  name: "EventList",
  props: {
    day: { events: Array },
    editEvent: Function,
    deleteEvent: Function,
  },
};
</script>
<style scoped>
ul.event-list {
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 100%;
}

ul.event-list {
  display: flex;
  flex-direction: column;
}

.event-item {
  font-size: 0.75rem;
  list-style: none;
  background-color: #fff;
  border: 1px solid lightgrey;
  padding: 0.125rem;
  display: grid;
  grid-template-columns: repeat(2, auto);
  height: 1.25rem;
}

.actions-list {
  display: none;
  justify-self: end;
}

.event-item:hover .actions-list {
  display: flex;
}

.actions-list > * {
  margin-left: 0.125rem;
}

.event-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 1.25rem;
}
</style>
