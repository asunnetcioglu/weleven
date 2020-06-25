import { combineReducers } from "redux";
import PlayerListReducer from './player_list_reducer';

export default  combineReducers({
    playerList: PlayerListReducer,
});
