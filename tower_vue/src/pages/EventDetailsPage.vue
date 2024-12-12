<script setup>
import { AppState } from '@/AppState';
import CommentForm from '@/components/CommentForm.vue';
import { commentsService } from '@/services/CommentsService';
import { eventsService } from '@/services/EventsService';
import { ticketsService } from '@/services/TicketsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const event = computed(() => AppState.activeEvent)

const account = computed(() => AppState.account)

const ticketProfiles = computed(() => AppState.ticketProfiles)

const hasTicket = computed(() =>
  ticketProfiles.value.some(ticketProfile =>
    ticketProfile.accountId == account.value.id
  )
)

const route = useRoute()

const comments = computed(() => AppState.comments)

watch(route, () => {
  getEventById()
  getTicketProfilesByEvent()
  getCommentsByEvent()
}, { immediate: true })

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
    const yes = await Pop.confirm(`Do you really want to ${event.value.isCanceled ? 'uncancel' : 'cancel'} ${event.value.name}`, "This is a fabulous event!", "Obviously!")
    if (!yes) return
    const eventId = route.params.eventId
    await eventsService.cancelEvent(eventId)
  }
  catch (error) {
    Pop.meow(error);
    logger.log('canceling event', error)
  }
}

async function createTicket() {
  try {
    const eventData = { eventId: route.params.eventId }
    await ticketsService.createTicket(eventData)
  }
  catch (error) {
    Pop.meow(error);
    logger.error('creating ticket', error)
  }
}

async function getTicketProfilesByEvent() {
  try {
    const eventId = route.params.eventId
    await ticketsService.getTicketProfilesByEvent(eventId)
  }
  catch (error) {
    Pop.meow(error);
    logger.error('getting ticket profiles by event', error)
  }
}

async function getCommentsByEvent() {
  try {
    const eventId = route.params.eventId
    await commentsService.getCommentsByEvent(eventId)
  }
  catch (error) {
    Pop.meow(error);
    logger.error('getting comments by event', error)
  }
}

function getSpotsLeft() {
  const spotsLeft = (event.value.capacity - ticketProfiles.value.length)
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
          <div class="text-end">

            <button v-if="event.creatorId == account?.id" class="btn bg-body-secondary fw-bold dropdown-toggle"
              type="button" data-bs-toggle="dropdown" aria-expanded="false">
            </button>
            <span>
              <ul role="button" class="dropdown-menu">
                <li @click="cancelEvent()" class="dropdown-item" href="#" role="button">Cancel Event</li>
              </ul>
            </span>
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
            <div v-if="(event.capacity - ticketProfiles.length) == 0"
              class="card bg-primary border border-0 px-3 ms-4 text-light fw-bold">
              SOLD OUT
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
                <span v-if="account" class="text-success text-end fw-bold">Join the conversation</span>
                <CommentForm v-if="account" />
                <div v-for="comment in comments" :key="comment.id" class="card border-0 rounded-0 my-3 p-3 bg-light">
                  <div class="d-flex align-items-center">
                    <img :src="comment.creator.picture" :alt="comment.creator.name" class="profile-img">
                    <span class="text-capitalize ps-2 fw-bold fs-5">
                      {{ comment.creator.name }}
                    </span>
                  </div>
                  <span class="ms-5 ps-2">
                    {{ comment.body }}
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
          <b class="text-center text-body-secondary pb-2">Grab a Ticket!</b>
          <div v-if="account">
            <div v-if="hasTicket == false" class=" d-flex justify-content-center">
              <button @click="createTicket()" class="btn btn-primary m-3" :disabled="event.isCanceled">Attend</button>
            </div>
            <div v-else class=" d-flex justify-content-center">
              <button class="btn btn-primary m-3" disabled>Attending</button>
            </div>
          </div>
        </div>
        <div class="text-end pt-2 mb-5">
          <span class="text-success"></span> <span>spots left
          </span>
        </div>
        <div class="mb-5">
          <span class="fs-5 fw-bold">Attendees</span>
          <div class="card bg-body-secondary border px-5 my-3">
            <div v-for="ticketProfile in ticketProfiles" :key="ticketProfile.id" class="pt-3">
              <img :src="ticketProfile.profile.picture" :alt="ticketProfile.profile.name" class="profile-img mb-2">
              <span class="fw-bold ms-3 text-capitalize fs-5 text-body-secondary">{{ ticketProfile.profile.name
                }}</span>
            </div>
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