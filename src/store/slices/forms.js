import { createSlice } from '@reduxjs/toolkit'

export const formSlice = createSlice({
  name: 'form',
  initialState: {
    "price":0,
    "disk":0
  },
  reducers: {
    setSliderValue: (state, {payload: [form, value]}) => {
      state[form] = value
    },
    toggleChoice: (state, {form, choice}) => {
      state[form][choice] = !state[form][choice]
    }
  }
})

// Action creators are generated for each case reducer function
export const { setSliderValue, toggleChoice } = formSlice.actions

export default formSlice.reducer