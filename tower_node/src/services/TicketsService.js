import { dbContext } from "../db/DbContext"


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
        path: 'ticketCount',
      }
    })
    return tickets
  }

}

export const ticketsService = new TicketsService()