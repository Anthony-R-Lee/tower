<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '@/utils/Pop.js';
import { logger } from '@/utils/Logger.js';
import { ticketsService } from '@/services/TicketsService.js';
import EventCard from '@/components/EventCard.vue';

const account = computed(() => AppState.account)

const tickets = computed(() => AppState.tickets)

const hasTickets = computed(() => tickets.value.some(tickets => tickets.accountId == account.value.id))

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
    const confirmed = await Pop.confirm("Are you sure you want to unattend this event")
    if (!confirmed) return
    await ticketsService.deleteTicket(ticketId)
    Pop.toast("No longer attending!")
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
                  <p v-if="tickets.length != 1">{{ tickets.length }} tickets</p>
                  <p v-else>{{ tickets.length }} ticket</p>
                </div>
              </span>
            </div>
          </div>
        </section>
        <section class="row">
          <div v-if="hasTickets == true">
            <h4 class="text-bold pt-5 ps-5 ms-5 fw-bold">
              Upcoming Events
            </h4>
          </div>
          <div v-else>
            <h4 class="text-bold pt-5 ps-5 ms-5 fw-bold">
              No Upcoming Events
            </h4>
          </div>
          <div v-for="ticket in tickets" :key="ticket.id" class="col-12 col-md-6 mb-3">
            <EventCard :event="ticket.event" />
            <button @click="deleteTicket(ticket.id)" class="btn btn-primary ms-5">Unattend</button>
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
