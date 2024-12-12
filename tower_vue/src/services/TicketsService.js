import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { Ticket } from "@/models/Ticket.js"
// import { applyStyles } from "@popperjs/core/index.js"


class TicketsService{

  async getMyTickets(){
    const response = await api.get('account/tickets')
    logger.log('got my tickets', response.data)
    const tickets = response.data.map(ticketPOJO => new Ticket(ticketPOJO))
    AppState.tickets = tickets
  }
  
  async deleteTicket(ticketId) {
    const response = await api.delete(`api/tickets/${ticketId}`)
    logger.log('deleted ticket', response.data)
    const ticketIndex = AppState.tickets.findIndex(ticket=>ticket.id==ticketId)
    AppState.tickets.splice(ticketIndex, 1)
  }
  async getTicketProfilesByEvent(eventId) {
    const response = await api.get(`api/events/${eventId}/tickets`)
    logger.log('got tickets by event', response.data)
    const tickets = response.data.map(ticketPOJO => new Ticket(ticketPOJO))
    AppState.ticketProfiles = tickets
  }

  async createTicket(eventData) {
    const response = await api.post('api/tickets', eventData)
    logger.log('created ticket', response.data)
    const ticket = new Ticket(response.data)
    AppState.ticketProfiles.push(ticket)
  }
}



export const ticketsService = new TicketsService()