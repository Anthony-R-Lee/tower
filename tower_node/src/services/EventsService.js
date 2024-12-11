import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"


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
    const events = await dbContext.Events.find().populate('creator').sort('startDate')
    return events
  }

  async getEventById(eventId, userId) {
    // TODO add ticket count
    const event = await dbContext.Events.findById(eventId).populate('creator')
    if (event == null) throw new Error(`No event with id: ${eventId}`);
    return event
  }

  async editEvent(updateData, userId) {
    const eventOg = await this.getEventById(updateData.id, userId)
    eventOg.name = updateData.name ?? eventOg.name
    eventOg.description = updateData.description ?? eventOg.description
    await eventOg.save()
    return eventOg
  }

  async cancelEvent(eventId, userId) {
    const eventToCancel = await await this.getEventById(eventId)
    await eventToCancel.populate('isCanceled')
    if (eventToCancel.creatorId != userId) {
      throw new Forbidden("Get out of here thief")
    }
    eventToCancel.isCanceled = !eventToCancel.isCanceled
    await eventToCancel.save()
    return eventToCancel
  }
}

export const eventsService = new EventsService()