import { createSlice } from '@reduxjs/toolkit'

export const historySlice = createSlice({
  name: 'history',
  initialState: {
    lastPage : 0,
    lastFormPage : 0
  },
  reducers: {
    setPage(state, {payload: [index, isForm]}) {
        if (isForm) {
            state.lastFormPage = index;
        }
        state.lastPage = index;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setPage } = historySlice.actions

export const historyPart = (state) => state.history
export const lastPage = (state) => state.history.lastPage
export const lastFormPage = (state) => state.history.lastFormPage

export default historySlice.reducer