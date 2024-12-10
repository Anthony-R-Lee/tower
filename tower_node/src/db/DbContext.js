import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { EventSchema, } from '../models/Event';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);

  Events = mongoose.model('Event', EventSchema)
}

export const dbContext = new DbContext()
