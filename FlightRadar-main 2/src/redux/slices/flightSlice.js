import { createSlice } from "@reduxjs/toolkit";
import { getFlights } from "../actions/flightActions";

const initialState = {
  flights: [],
  isLoading: true,
  isError: false,
};

const flightSlice = createSlice({
  name: "flight",
  initialState,
  extraReducers: (builder) => {
    builder
      // When waiting for a response

      .addCase(getFlights.pending, (state) => {
        state.isLoading = true;
      })

      // When a positive response is received

      .addCase(getFlights.fulfilled, (state, action) => {
        state.isLoading = false,
          state.isError = false,
          state.flights = action.payload;
      })

      // When a negative response is received

      .addCase(getFlights.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        alert("An error occurred");
      });
  },
});

export default flightSlice.reducer;
