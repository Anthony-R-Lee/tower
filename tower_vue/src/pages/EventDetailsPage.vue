<script setup>
import { AppState } from '@/AppState';
import { eventsService } from '@/services/EventsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const event = computed(() => AppState.activeEvent)

const route = useRoute()

onMounted(() => {
  getEventById()
})

async function getEventById() {
  try {
    const eventId = route.params.eventId
    await eventsService.getEventById(eventId)
  }
  catch (error) {
    Pop.meow(error);
    logger.log('getting event by id', error)
  }
}

async function cancelEvent() {
  try {
    const yes = await Pop.confirm(`Do you really want to cancel ${event.value.name}`, "This is a fabulous event!", "Yes, I want to cancel this event!")
    if (!yes) return
    const eventId = route.params.eventId
    await eventsService.cancelEvent(eventId)
  }
  catch (error) {
    Pop.meow(error);
    logger.log('canceling event', error)
  }
}
</script>


<template>
  <div v-if="event" class="container">
    <div>
      <section class="row event-hero justify-content-center" :style="{ backgroundImage: `url(${event.coverImg})` }">
      </section>
    </div>
    <section class="row d-flex">
      <div class="col-md-8 p-0">
        <div class="pt-5">
          <div class=" text-end">
            <button class="btn bg-body-secondary fw-bold dropdown-toggle" type="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              ...
            </button>
            <ul class="dropdown-menu">
              <li><span class="dropdown-item" href="#" role="button">Edit Event</span></li>
              <li @click="cancelEvent()" class="dropdown-item" href="#" role="button">Cancel Event</li>
            </ul>
          </div>
          <div class="d-flex align-items-center">
            <h4 class="fw-bold pb-3">
              {{ event.name }}
            </h4>
            <div class="card bg-body-secondary border border-0 px-3 ms-4 text-primary fw-bold">
              {{ event.type }}
            </div>
            <div v-if="event.isCanceled" class="card bg-danger border border-0 px-3 ms-4 text-light fw-bold">
              CANCELLED
            </div>
          </div>
          <p>
            {{ event.description }}
          </p>
          <div>
            <b class="fs-5 text-body-secondary">Date and Time</b>
            <div class="d-flex align-items-center">
              <p><i class="mdi mdi-calendar-clock-outline text-primary fs-3 pe-3"></i> Starts {{
                event.startDate.toLocaleString() }}
              </p>
            </div>
          </div>
          <div class="pb-5">
            <b class="fs-5 text-body-secondary">Location</b>
            <div class="d-flex align-items-center text-capitalize">
              <p><i class="mdi mdi-map-marker text-primary fs-3 pe-3"></i> {{ event.location }}
              </p>
            </div>
          </div>
          <div>
            <p class="fs-5 mb-3 fw-bold">See what folks are saying...</p>
            <div class="me-5 mb-5">
              <div class="card bg-body-secondary border p-3">
                <span class="text-success text-end fw-bold" role="button" data-bs-toggle="modal"
                  data-bs-target="#eventModal">Join the conversation</span>
                <textarea class="border-0 bg-light" name="comment" id="comment"
                  placeholder="Tell the people..."></textarea>
                <div class="text-end pt-2">
                  <button class="btn btn-success p-3 text-light">Post Comment</button>
                </div>
                <div class="card border-0 rounded-0 my-3 p-3 bg-light">
                  <div class="d-flex align-items-center">
                    <img :src="event.creator.picture" :alt="event.creator.name" class="profile-img">
                    <span class="text-capitalize ps-2 fw-bold fs-5">
                      {{ event.creator.name }}
                    </span>
                  </div>
                  <span class="ms-5 ps-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque enim ipsum tempora beatae aspernatur
                    nemo, cum nesciunt odit aut, dolor quo optio sunt placeat quidem. Doloremque aperiam sequi fugiat
                    officiis!
                  </span>
                  <div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4 pt-5">
        <div class="card bg-body-secondary border px-5 pt-3">
          <b class="fs-5 text-center">Interested in Going?</b>
          <b class="text-center text-body-secondary">Grab a Ticket!</b>
          <button class="btn btn-primary m-3" :disabled="event.isCanceled">Attend</button>
        </div>
        <div class="text-end pt-2 mb-5">
          <div>
            <span class="text-success">{{ event.ticketCount }}</span>
          </div>
          <span> spots left </span>
        </div>
        <div class="mb-5">
          <span class="fs-5 fw-bold">Attendees</span>
          <div class="card bg-body-secondary border px-5 mt-3">
            <div class="pt-3">
              <img :src="event.creator.picture" :alt="event.creator.name" class="profile-img">
              <span class="fw-bold ms-3 text-capitalize fs-5 text-body-secondary">{{ event.creator.name }}</span>
            </div>
            <span class="text-end text-body-secondary">See more </span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<style lang="scss" scoped>
.event-hero {
  min-height: 50vh;
  background-size: cover;
  background-position: center;
  border-radius: 15px;
}

.profile-img {
  max-height: 3em;
  border-radius: 100px;
}
</style>