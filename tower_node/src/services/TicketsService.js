import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"


class TicketsService {

  async createTicket(ticketData) {
    const ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate('profile')
    await ticket.populate('event')
    return ticket
  }

  async getMyTickets(userId) {
    const tickets = await dbContext.Tickets.find({ accountId: userId }).populate({
      path: 'event',
      populate: {
        path: 'creator ticketCount'
      }
    })
    return tickets
  }
  async getTicketsByEvent(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId: eventId }).populate('profile')
    return tickets
  }

  async deleteTicket(ticketId, userId) {
    const ticketToDelete = await dbContext.Tickets.findById(ticketId)
    if (ticketToDelete == null) {
      throw new Error("Invalid ticket");
    }
    if (ticketToDelete.accountId != userId) {
      throw new Forbidden("Stop stealing other people's tickets")
    }
    await ticketToDelete.deleteOne()
    return 'No longer attending that event'
  }
}

export const ticketsService = new TicketsService()