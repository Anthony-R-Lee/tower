<script setup>
import { AppState } from '@/AppState';
import EventCard from '@/components/EventCard.vue';
import { eventsService } from '@/services/EventsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted, ref } from 'vue';

const events = computed(() => {
  if (activeFilterType.value == 'all') return AppState.events
  return AppState.events.filter(event => event.type == activeFilterType.value)
})

const activeFilterType = ref('all')

const types = [
  { name: 'all', emoji: '♾️' },
  { name: 'concert', emoji: '🎸' },
  { name: 'convention', emoji: '🫂' },
  { name: 'sport', emoji: '⚽' },
  { name: 'digital', emoji: '🖥️' },
]

const account = computed(() => AppState.account)

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
      <h4 class=" fw-bold pt-5 ps-5 ms-5">
        How Tower Works
      </h4>
      <div>
        <div class="col-md-12 d-flex justify-content-around align-items-center m-5">
          <div class="d-flex col-md-4 bg-body-secondary border-0 rounded-1 align-items-center p-3">
            <i v-if="account" class="mdi mdi-magnify fs-1 text-success" role="button"></i>
            <div class="ms-5">
              <b class="fs-5">Discover Events your're Interested In</b>
              <p>Browse through community hosted events for all the things you love</p>
            </div>
          </div>
          <div class="d-flex col-md-4 bg-body-secondary border-0 rounded-1 align-items-center p-3">
            <i v-if="account" class="mdi mdi-plus fs-1 text-success" data-bs-toggle="modal" data-bs-target="#eventModal"
              role="button"></i>
            <div class="ps-5">
              <b class="fs-5">Start an Event to Invite your Friends</b>
              <p>Create your own Tower event, and draw from a community of millions</p>
              <button v-if="account" class="btn text-success fw-bold" data-bs-toggle="modal"
                data-bs-target="#eventModal">Create an Event</button>
            </div>
          </div>
        </div>
      </div>

      <h4 class="text-bold pt-5 ps-5 ms-5 fw-bold text-capitalize">
        Explore {{ activeFilterType }} Categories
      </h4>
      <div class="d-flex justify-content-center">
        <div v-for="type in types" :key="'filter-' + type.name" class="col-md-2 d-flex justify-content-center p-5">
          <div @click="activeFilterType = type.name" role="button"
            class="d-flex text-center bg-body-secondary border-0 rounded-1 px-4 filter-button">
            <span class="text-capitalize text-center p-2">
              <p class="fs-1">{{ type.emoji }}</p>
              <b class="fs-5">{{ type.name }}</b>
            </span>
          </div>
        </div>
      </div>
      <h4 class="text-bold pt-5 ps-5 ms-5 fw-bold">
        Upcoming Events
      </h4>
      <section class="row d-flex col-md-12">

        <div v-for="event in events" :key="event.id" class="col-md-4">
          <EventCard :event="event" />
        </div>
      </section>
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
