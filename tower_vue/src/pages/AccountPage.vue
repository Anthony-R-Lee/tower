<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '@/utils/Pop.js';
import { logger } from '@/utils/Logger.js';
import { ticketsService } from '@/services/TicketsService.js';
import EventCard from '@/components/EventCard.vue';

const account = computed(() => AppState.account)

const tickets = computed(() => AppState.tickets)

onMounted(() => {
  getMyTickets()
})

async function getMyTickets() {
  try {
    await ticketsService.getMyTickets()
  } catch (error) {
    Pop.meow(error)
    logger.error('getting my tickets', error)
  }
}

async function deleteTicket(ticketId) {
  try {
    await ticketsService.deleteTicket(ticketId)
  }
  catch (error) {
    Pop.meow(error);
    logger.error('deleting ticket', error)
  }
}

</script>

<template>
  <div>
    <div v-if="account">
      <div class="container">
        <section class="row">
          <div class="col-md-12">
            <div class="text-center">
              <span class="d-flex justify-content-center align-items-center text-capitalize">
                <img :src="account.picture" :alt="account.name" class="profile-img m-3">
                <div>
                  <h1 class="ps-3">{{ account.name }}</h1>
                  <p>number of events i created will go here {{ tickets.length }} tickets</p>
                </div>
              </span>
            </div>
          </div>
        </section>
        <section class="row">
          <h4 class="text-bold pt-5 ps-5 ms-5 fw-bold">
            Your Events
          </h4>
          <h4 class="text-bold pt-5 ps-5 ms-5 fw-bold">
            Upcoming Events
          </h4>
          <div v-for="ticket in tickets" :key="ticket.id" class="col-md-6 mb-3 px-5 ">
            <EventCard :event="ticket.event" />
            <button @click="deleteTicket(ticket.id)" class="btn btn-primary px-2">Unattend</button>
          </div>
        </section>
      </div>
    </div>
    <div v-else>
      <h1 class="text-center">Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
.profile-img {
  border-radius: 100px;
  min-height: 5em;
}
</style>
