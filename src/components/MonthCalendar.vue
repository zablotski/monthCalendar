<script>
import { getCalendarDates } from "@/services/dateUtil";
import AddEventModal from "@/components/modals/AddEventModal.vue";
import EditEventModal from "@/components/modals/EditEventModal.vue";
import { randomString } from "@/services/uuid";
import EventList from "@/components/EventList.vue";
import {
  getCalendarEvents,
  saveCalendarEvents,
} from "@/services/calendarService";

export default {
  components: { EventList, EditEventModal, AddEventModal },
  data() {
    return {
      inputDate: null,
      date: null,
      calendarData: [],
      showAddModal: false,
      showEditModal: false,
      showRemoveModal: false,
      selectedDay: null,
      selectedEvent: null,
    };
  },
  watch: {
    inputDate(newDate) {
      this.date = new Date(newDate);

      this.calendarData.length && saveCalendarEvents(this.calendarData);

      const calendarDates = getCalendarDates(
        +newDate.split("-")[0],
        newDate.split("-")[1] - 1
      );

      this.calendarData = getCalendarEvents(calendarDates);
    },
  },
  mounted() {
    const date = new Date();
    this.inputDate = `${date.getFullYear()}-${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}`;
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
  },
};
</script>

<template>
  <div class="calendar">
    <header>
      <h1>
        <input
          ref="monthInput"
          type="month"
          id="monthInput"
          name="monthInput"
          v-model="inputDate"
        />
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
