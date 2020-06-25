export  default (state = [], action) => {
    switch (action.type) {
        case 'FETCH_PLAYER_LIST':
        return action.payload;
    default:
          return state;
    }
}