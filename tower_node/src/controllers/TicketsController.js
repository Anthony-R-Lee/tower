import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { ticketsService } from "../services/TicketsService";


export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
      .delete('/:ticketId', this.deleteTicket)
  }
  /**
  * @param {import("express").Request} request
  * @param {import("express").Response} response
  * @param {import("express").NextFunction} next
  */
  async createTicket(request, response, next) {
    try {
      const ticketData = request.body
      ticketData.accountId = request.userInfo.id
      const ticket = await ticketsService.createTicket(ticketData)
      response.send(ticket)
    }
    catch (error) {
      next(error)
    }
  }

  async deleteTicket(request, response, next) {
    try {
      const ticketId = request.params.ticketId
      const userId = request.userInfo.id
      const message = await ticketsService.deleteTicket(ticketId, userId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
}