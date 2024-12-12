import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"


class CommentsService {
  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator')
    return comment
  }

  async getCommentsByEvent(eventId) {
    const comments = await dbContext.Comments.find({ eventId: eventId }).populate('creator')
    return comments
  }

  async deleteComment(commentId, userId) {
    const comment = await dbContext.Comments.findById(commentId)
    if (comment == null) { throw new BadRequest(`No comment at id: ${commentId}`) }
    if (userId != comment.creatorId) throw new Forbidden("This is not yours, criminal")
    if (userId == comment.creatorId) {

      await comment.deleteOne()
    }
    return `${comment.body} was deleted`

  }
}
// async editEvent(updateData, userId) {
//   const eventOg = await this.getEventById(updateData.id, userId)
//   if (eventOg.isCanceled == true) return BadRequest
//   if (userId != eventOg.creatorId) { throw new Forbidden("You are not the father, of this event") }
//   if (userId == eventOg.creatorId) {
//     eventOg.name = updateData.name ?? eventOg.name
//     eventOg.description = updateData.description ?? eventOg.description
//   }
//   await eventOg.save()
//   return eventOg
// }
export const commentsService = new CommentsService()