import { createSlice } from '@reduxjs/toolkit'

export const dialogSlice = createSlice({
  name: 'favourites',
  initialState: {
    x: 0,
    y: 0,
    text: '',
    visible: false,
  },
  reducers: {
    show: (state, { payload: { x, y, text } }) => {
        state.x = x
        state.y = y
        state.text = text
        state.visible = true
    },
    hide: (state) => {
        state.visible = false
    }
  }
})

// Action creators are generated for each case reducer function
export const { show, hide } = dialogSlice.actions

export default dialogSlice.reducer