<script>
import { getCalendarDates } from "@/components/dateUtil";
import AddEventModal from "@/components/AddEventModal.vue";
import EditEventModal from "@/components/EditEventModal.vue";
import { randomString } from "@/components/uuid";
import EventList from "@/components/EventList.vue";

export default {
  components: { EventList, EditEventModal, AddEventModal },
  data() {
    return {
      date: null,
      calendarData: [],
      showAddModal: false,
      showEditModal: false,
      showRemoveModal: false,
      selectedDay: null,
      selectedEvent: null,
    };
  },
  computed: {},
  created() {
    this.date = new Date();

    const calendarDates = getCalendarDates(
      this.date.getFullYear(),
      this.date.getMonth()
    );

    this.mapDatesToData(calendarDates);
  },
  methods: {
    onDayClick(day) {
      this.showAddModal = true;
      this.selectedDay = day;
    },
    addEvent(text) {
      const trimmed = text.trim();
      if (!text) {
        return;
      }
      this.selectedDay.events.push({
        id: randomString(),
        text: trimmed,
      });
      this.showAddModal = false;
    },
    editEvent(day, event) {
      this.selectedDay = day;
      this.selectedEvent = event;
      this.showEditModal = true;
    },
    deleteEvent(day, event) {
      day.events = day.events.filter((e) => e !== event);
    },
    mapDatesToData: function (calendarDates) {
      this.calendarData = calendarDates.map((date) => ({
        dateObject: date,
        events: [],
      }));
    },
  },
};
</script>

<template>
  <div class="calendar">
    <header>
      <h1>
        {{ this.date.toLocaleString("default", { month: "long" }) }}
        {{ this.date.getFullYear() }}
      </h1>
    </header>

    <ul class="grid weekdays">
      <li v-for="day of calendarData.slice(0, 7)" :key="day">
        {{ day.dateObject.toLocaleString("default", { weekday: "long" }) }}
      </li>
    </ul>

    <ol class="grid day-grid">
      <li
        v-for="day of calendarData"
        :key="day"
        :class="{
          'other-month': day.dateObject.getMonth() !== this.date.getMonth(),
          day: true,
        }"
        @click.exact="() => onDayClick(day)"
      >
        {{ day.dateObject.getDate() }}
        <EventList
          :day="day"
          :edit-event="editEvent"
          :delete-event="deleteEvent"
        />
      </li>
    </ol>
    <AddEventModal
      v-if="showAddModal"
      @close="showAddModal = false"
      @submit="addEvent"
    />
    <EditEventModal
      v-if="showEditModal"
      @close="showEditModal = false"
      :event="selectedEvent"
      :day="selectedDay"
      @submit="
        (text) => {
          selectedEvent.text = text;
          showEditModal = false;
        }
      "
    />
  </div>
</template>
<style scoped>
.calendar {
  font-family: system-ui;
}

header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1em;
  background: #000;
  color: #fff;
  min-height: 5vh;
  text-align: center;
}

ul.grid,
ol.grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1em;
  margin: 0 auto;
  max-width: 64em;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  margin-left: 0;
  font-size: 1rem;
  cursor: pointer;
  flex-direction: column;
}

li.day {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

ul.event-list li {
  font-size: 0.75rem;
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

ul.weekdays {
  margin-bottom: 1em;
}

ul.weekdays li {
  height: 2vw;
}

ol.day-grid > li {
  background-color: lightgrey;
  border: 1px solid lightgrey;
  height: 12vw;
  max-height: 125px;
  overflow: hidden;
}

ol.day-grid li.other-month {
  background-color: #fff;
}

@media all and (max-width: 800px) {
  ul,
  ol {
    grid-gap: 0.25em;
  }
}
</style>
