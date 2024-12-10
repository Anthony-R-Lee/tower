import { dbContext } from "../db/DbContext"


class EventsService {
  async createEvent(eventData) {
    const event = await dbContext.Events.create(eventData)
    await event.populate('creator',)
    // await event.populate('ticketCount')
    return event
  }
}

export const eventsService = new EventsService()