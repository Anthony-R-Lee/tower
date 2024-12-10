import { dbContext } from "../db/DbContext"


class EventsService {
  async createEvent(eventData) {
    const event = await dbContext.Events.create(eventData)
    await event.populate('creator')
    // TODO add ticket count
    // await event.populate('ticketCount')
    return event
  }

  async getAllEvents() {
    // TODO add ticket count
    const events = await dbContext.Events.find().populate('creator')
    return events
  }

  async getEventById(eventId) {
    // TODO add ticket count
    const event = (await dbContext.Events.findById(eventId)).populate('creator')
    return event
  }
}

export const eventsService = new EventsService()