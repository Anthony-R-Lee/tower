<script setup>
import { Event } from '@/models/Event';


defineProps({
  event: { type: Event, required: true }
})


</script>


<template>
  <RouterLink :to="{ name: 'Event Details', params: { eventId: event.id } }" class="d-flex justify-content-center">
    <div v-if="event.creator" class="py-3 col-md-8 text-dark">
      <div class="cover-img" :style="{ backgroundImage: `url(${event.coverImg})` }">
      </div>
      <b>{{ event.name }}</b>
      <span class="text-success">
        <p>
          Hosted by {{ event.creator.name }}
        </p>
      </span>
      <span>
        <p>
          {{ event.startDate.toLocaleDateString() }} - {{ event.location }}
        </p>
      </span>
      <span>
        <p>
          {{ event.ticketCount }} attending
        </p>
      </span>
    </div>
  </RouterLink>
</template>


<style lang="scss" scoped>
.cover-img {
  min-height: 60vh;
  min-width: 100%;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
}
</style>