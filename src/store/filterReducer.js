export const FILTER_VALUES = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
}

export const filterReducer = (state = 'all', action) => {
  switch (action.type) {
    case 'SET_FILTER': {
      const { filter } = action.payload
      return filter
    }
    default:
      return state
  }
}

export const filterActions = {
  /**
   * @description Set the filter value, if the filter is not valid throw a error
   * @param {String} filter the filter value can be `all`, `active` or `completed`
   * @returns {Object: {type: String, payload: Object}} the payload object
   * @throws {Error} if the filter is not valid
   */
  setFilter: (filter) => {
    for (const validFilter of Object.values(FILTER_VALUES)) {
      if (validFilter === filter) {
        return {
          type: 'SET_FILTER',
          payload: { filter },
        }
      }
    }
    throw new Error(`Invalid filter: ${filter}`)
  },
}
