import { Schema } from "mongoose";


export const TicketSchema = new Schema({
  accountId: { type: Schema.ObjectId, required: true, ref: 'Account' },
  eventId: { type: Schema.ObjectId, required: true, ref: 'TowerEvent' },
},
  {
    toJSON: { virtuals: true },
    timestamps: true
  }
)