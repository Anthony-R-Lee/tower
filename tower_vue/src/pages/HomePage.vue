<script setup>
import { AppState } from '@/AppState';
import EventCard from '@/components/EventCard.vue';
import { eventsService } from '@/services/EventsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';

const events = computed(() => AppState.events)

onMounted(() => {
  getEvents()
})


async function getEvents() {
  try {
    await eventsService.getEvents()
  }
  catch (error) {
    Pop.meow(error);
    logger.error('getting events', error)
  }
}
</script>

<template>
  <div class="container-fluid">
    <section class="row bg-img">
      <div class="w-100 event-hero"
        style="background-image: url(https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hlZXJzfGVufDB8fDB8fHww);">
      </div>
      <h4 class=" text-bold pt-5 ps-5 ms-5">
        How Tower Works
      </h4>
      <div>
        <div class="col-md-12 d-flex justify-content-around align-items-center m-5">
          <div class="d-flex col-md-4 bg-body-secondary border border-0 align-items-center p-3">
            <i class="mdi mdi-magnify fs-1 text-success" role="button"></i>
            <div class="ms-5">
              <b class="fs-5">Discover Events your're Interested In</b>
              <p>Browse through community hosted events for all the things you love</p>
            </div>
          </div>
          <div class="d-flex col-md-4 bg-body-secondary border border-0 align-items-center p-3">
            <i class="mdi mdi-plus fs-1 text-success" data-bs-toggle="modal" data-bs-target="#eventModal"
              role="button"></i>
            <div class="ps-5">
              <b class="fs-5">Start an Event to Invite your Friends</b>
              <p>Create your own Tower event, and draw from a community of millions</p>
              <span class="text-success fw-bold" role="button" data-bs-toggle="modal"
                data-bs-target="#eventModal">Create an Event</span>
            </div>
          </div>
        </div>
      </div>

      <h4 class="text-bold pt-5 ps-5 ms-5 fw-bold">
        Explore {{ }} Categories
      </h4>
      <div class="d-flex">
        categories will go here
      </div>
      <h4 class="text-bold pt-5 ps-5 ms-5 fw-bold">
        Upcoming Events
      </h4>
      <div v-for="event in events" :key="event.id" class="d-flex col-md-4">
        <EventCard :event="event" />
      </div>
    </section>
  </div>

</template>

<style scoped lang="scss">
.event-hero {
  min-height: 50vh;
  background-size: cover;
  background-position: center;
}
</style>
