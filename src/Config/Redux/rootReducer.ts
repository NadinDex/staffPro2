import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../../Modules/Auth/userSlice";
import clientsReducer from "../../Modules/Clients/clientsSlice";
import accountReducer from "../../Modules/Accounts/accountSlice";
import discussionReducer from "../../Modules/Discussions/discusSlice";
import reportReducer from "../../Modules/Reports/reportSlice";

export const rootReducer = combineReducers({
  user: userReducer,
  clients: clientsReducer,
  //accounts: accountReducer,
  invoices: accountReducer,
  discussions: discussionReducer,
  reports: reportReducer,
});
