import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  isLoading:false,
  error:null
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },


    loader:(state) => {
        state.isLoading = true
      },

      error:(state,action) => {
        state.error = action.payload
        state.isLoading = false
      },
      success: (state,action) => {

        state.value += action.payload;
        state.isLoading = false

      },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount ,loader,error,success} = counterSlice.actions

export default counterSlice.reducer