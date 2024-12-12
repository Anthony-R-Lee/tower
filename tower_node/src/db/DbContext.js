import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { EventSchema, } from '../models/Event';
import { TicketSchema } from '../models/Ticket';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);

  Events = mongoose.model('Event', EventSchema)
  Tickets = mongoose.model('Ticket', TicketSchema)
}

export const dbContext = new DbContext()
