export const sort = (state = { sort: 'popular' }, action) => {
  switch(action.type) {
    case 'CHANGE_SORT':
      const newValue = action.value
      return {
        ...state,
        sort: newValue
      }
    default:
      return state
  }
}
