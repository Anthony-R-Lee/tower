import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Event } from "@/models/Event.js"
import { AppState } from "@/AppState.js"


class EventsService {
  async getEvents() {
    const response = await api.get('api/events')
    logger.log('got events', response.data)
    const events = response.data.map(eventPOJO => new Event(eventPOJO))
    AppState.events = events
  }

  async createEvent(eventData){
    const response = await api.post(`api/events`, eventData)
    logger.log('created event', response.data)
    const event = new Event(response.data)
    AppState.events.push(event)
  }

  async getEventById(eventId){
    AppState.activeEvent = null
    const response = await api.get(`api/events/${eventId}`)
    logger.log('got event by id', response.data)
    const event = new Event(response.data)
    AppState.activeEvent = event
  }

  async cancelEvent(eventId){
    const response = await api.delete(`api/events/${eventId}`)
    logger.log('canceled event', response.data)
    const event = new Event(response.data)
    AppState.activeEvent = event
  }

}

export const eventsService = new EventsService()