<script setup>
import { eventsService } from '@/services/EventsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { Modal } from 'bootstrap';
import { ref } from 'vue';
import { useRouter } from 'vue-router';



const types = ['concert', 'convention', 'sport', 'digital']

const editableEventData = ref({
  name: '',
  location: '',
  type: '',
  startDate: '',
  capacity: '',
  description: '',
  coverImg: '',
})

const router = useRouter()

async function createEvent() {
  try {
    const event = await eventsService.createEvent(editableEventData.value)
    editableEventData.value = {
      name: '',
      location: '',
      type: '',
      startDate: '',
      capacity: '',
      description: '',
      coverImg: '',
    }
    Modal.getInstance('#eventModal').hide()
    router.push({ name: 'Event Details', params: { eventId: event.id } })
  }
  catch (error) {
    Pop.meow(error);
    logger.error('creating event', error)

  }
}
</script>


<template>
  <form @submit.prevent="createEvent()">
    <div class="form-floating mb-3">
      <input v-model="editableEventData.name" type="text" class="form-control" id="name" placeholder="Event Name..."
        minlength="3" maxlength="50" required>
      <label for="name">Event Name</label>
    </div>
    <div class="form-floating mb-3">
      <input v-model="editableEventData.location" type="text" class="form-control" id="location"
        placeholder="Event Location..." minlength="1" maxlength="500" required>
      <label for="location">Event Location</label>
    </div>
    <div class="form-floating mb-3">
      <select v-model="editableEventData.type" type="url" class="form-control text-capitalize" id="type"
        placeholder="Event Type..." maxlength="2000" aria-label="Event Type" required>
        <option selected value="" disabled>Choose a Type</option>
        <option v-for="type in types" :key="type" :value="type" class="text-capitalize">
          {{ type }}
        </option>
      </select>
      <label for="type">Event Type</label>
    </div>
    <div class="d-flex justify-content-between">
      <div class="form-floating mb-3">
        <input v-model="editableEventData.startDate" type="date" class="form-control" id="startDate"
          placeholder="Start Date..." required>
        <label for="startDate">StartDate</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="editableEventData.capacity" type="number" class="form-control" id="capacity"
          placeholder="Capacity..." min="1" max="5000" required>
        <label for="capacity">Capacity</label>
      </div>
    </div>
    <div class="form-floating mb-3">
      <input v-model="editableEventData.coverImg" type="url" class="form-control" id="coverImg"
        placeholder="Event CoverImg..." maxlength="2000" required>
      <label for="coverImg">Event CoverImg</label>
    </div>
    <div class="form-floating mb-3">
      <textarea v-model="editableEventData.description" class="form-control" id="description"
        placeholder="Event Description..." minlength="15" maxlength="1000" required></textarea>
      <label for="description">Event Description</label>
    </div>
    <div class="text-end">
      <button class="btn btn-primary" type="submit">Create Event</button>
    </div>
  </form>
</template>


<style lang="scss" scoped></style>