import { referrerPolicy } from "helmet";
import { Schema } from "mongoose";

export const EventSchema = new Schema({
  creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
  name: { type: String, minLength: 3, maxLength: 50, required: true },
  description: { type: String, minLength: 15, maxLength: 1000, required: true },
  coverImg: { type: String, maxLength: 1000, required: true },
  location: { type: String, minLength: 1, maxLength: 500, required: true },
  capacity: { type: Number, min: 1, max: 5000, required: true },
  startDate: { type: Date, required: true },
  isCanceled: { type: Boolean, default: false, required: true },
  type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true }
},
  {
    timestamps: true,
    toJSON: { virtuals: true }
  })


EventSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true

})
// EventSchema.virtual('ticketCount', {
//   localField: '',
//   ref: 'Account',
//   foreignField: '_id',
//   justOne: true
