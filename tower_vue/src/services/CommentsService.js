import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { Comment } from "@/models/Comment.js";
import { AppState } from "@/AppState.js";


class CommentsService{
  async getCommentsByEvent(eventId){
    AppState.comments = []
    const response = await api.get(`api/events/${eventId}/comments`)
    logger.log('got comments by event', response.data)
    const comments = response.data.map(commentPOJO => new Comment(commentPOJO))
    AppState.comments = comments
  }

  async createComment(commentData) {
    const response = await api.post('api/comments', commentData)
    logger.log('created comment', response.data)
    const comment = new Comment(response.data)
    AppState.comments.push(comment)
  }
  async deleteComment(commentId) {
    const response = await api.delete(`api/comments/${commentId}`)
    logger.log('deleted comment')
    const commentIndex = AppState.comments.findIndex(comment => comment.id = commentId)
    AppState.comments.splice(commentIndex, 0)
  }
}

export const commentsService = new CommentsService()