import { configureStore } from "@reduxjs/toolkit";
import { ApiSlice } from "../services/cryptoApi";
import { ApiNewsSlice } from "../services/cryptoNewsApi";

export default configureStore({
    reducer:{
        [ApiSlice.reducerPath] : ApiSlice.reducer,
        [ApiNewsSlice.reducerPath] : ApiNewsSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(ApiSlice.middleware , ApiNewsSlice.middleware),

});
