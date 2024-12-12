<script setup>
import { commentsService } from '@/services/CommentsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { ref } from 'vue';
import { useRoute } from 'vue-router';



const route = useRoute()

const editableCommentData = ref({
  body: '',
  eventId: ''
})

async function createComment() {
  try {
    editableCommentData.value.eventId = route.params.eventId
    await commentsService.createComment(editableCommentData.value)
    editableCommentData.value = {
      body: '',
      eventId: ''
    }
  }
  catch (error) {
    Pop.meow(error);
    logger.error('creating comment', error)
  }
}
</script>


<template>

  <textarea v-model="editableCommentData.body" class="border-0 bg-light" name="comment" id="comment"
    placeholder="Tell the people..." required maxlength="1000"></textarea>
  <div class="text-end pt-2">
    <button @click.prevent="createComment()" class="btn btn-success p-3 text-light">Post Comment</button>
  </div>
</template>


<style lang="scss" scoped></style>