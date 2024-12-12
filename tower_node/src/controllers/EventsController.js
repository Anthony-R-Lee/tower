import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { eventsService } from "../services/EventsService";
import { logger } from "../utils/Logger";
import { ticketsService } from "../services/TicketsService";


export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:eventId', this.getEventById)
      .get('/:eventId/tickets', this.getTicketsByEvent)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:eventId', this.editEvent)
      .delete('/:eventId', this.cancelEvent)
  }

  async getTicketsByEvent(request, response, next) {
    try {
      const eventId = request.params.eventId
      const tickets = await ticketsService.getTicketsByEvent(eventId)
      response.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async getAllEvents(request, response, next) {
    try {
      const events = await eventsService.getAllEvents()
      response.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getEventById(request, response, next) {
    try {
      const eventId = request.params.eventId
      const event = await eventsService.getEventById(eventId)
      response.send(event)
    } catch (error) {
      next(error)
    }
  }
  async createEvent(request, response, next) {
    try {
      const eventData = request.body
      eventData.creatorId = request.userInfo.id
      const event = await eventsService.createEvent(eventData)
      response.send(event)
    }
    catch (error) {
      next(error);
    }
  }

  async editEvent(request, response, next) {
    try {
      const eventId = request.params.eventId
      const updateData = request.body
      const user = request.userInfo.id
      updateData.id = eventId
      const editedEvent = await eventsService.editEvent(updateData, user.id)
      response.send(editedEvent)
    } catch (error) {
      next(error)
    }
  }

  async cancelEvent(request, response, next) {
    try {
      const eventId = request.params.eventId
      const userId = request.userInfo.id
      const event = await eventsService.cancelEvent(eventId, userId)
      response.send(event)
    } catch (error) {
      next(error)
    }
  }
}
