import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  /** @type {import('./models/Event.js').Event[]} user info from the database*/
  events: [],
  /** @type {import('./models/Event.js').Event} user info from the database*/
  activeEvent: null,
    /** @type {import('./models/Ticket.js').Ticket[]} user info from the database*/
    tickets: [],
    /** @type {import('./models/Ticket.js').Ticket[]} user info from the database*/
    ticketProfiles: [],
    /** @type {import('./models/Comment.js').Comment[]} user info from the database*/
    comments: [],
})

