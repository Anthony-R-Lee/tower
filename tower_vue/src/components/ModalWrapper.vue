<script setup>
import EventForm from './EventForm.vue';


</script>


<template>
  <div class="modal fade" id="eventModal" tabindex="-1" aria-labelledby="eventModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title p-5">
            Create New Event
          </h1>
          <button class="btn-close text-bold" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-5">
          <EventForm />
        </div>
      </div>
    </div>

  </div>
</template>


<style lang="scss" scoped></style>