import { Account } from "./Account.js"
import { Event } from "./Event.js"


export class Ticket{
  constructor(data){
this.id = data.id
this.accountId = data.accountId
this.eventId = data.eventId
this.event = data.event ? new Event(data.event) : null
this.profile = data.profile ? new Account(data.profile) : null
  }
}
const data =
{
  "_id": "675a41299bf9da0d3ce00817",
  "accountId": "6758a99b25f750aecd7e2ece",
  "eventId": "675a41289bf9da0d3ce00814",
  "createdAt": "2024-12-12T01:49:29.207Z",
  "updatedAt": "2024-12-12T01:49:29.207Z",
  "__v": 0,
  "event": {
      "_id": "675a41289bf9da0d3ce00814",
      "creatorId": "6758a99b25f750aecd7e2ece",
      "name": "Cat-Con",
      "description": "Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.",
      "coverImg": "https://images.unsplash.com/photo-1559171667-74fe3499b5ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=60",
      "location": "At The Social Expo Center",
      "capacity": 9,
      "startDate": "2024-12-26T07:00:00.000Z",
      "isCanceled": false,
      "type": "convention",
      "createdAt": "2024-12-12T01:49:28.764Z",
      "updatedAt": "2024-12-12T01:49:28.764Z",
      "__v": 0,
      "ticketCount": [],
      "id": "675a41289bf9da0d3ce00814"
  },
  "id": "675a41299bf9da0d3ce00817"
}