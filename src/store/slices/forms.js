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
    createToggles: (state, {payload: [form, keys]}) => {
      state[form] = Object.fromEntries(keys.map(key => [key, false]))
    },
    toggleChoice: (state, {payload: [form, choice]}) => {
      state[form][choice] = !state[form][choice]
    }
  }
})

// Action creators are generated for each case reducer function
export const { setSliderValue, toggleChoice, createToggles } = formSlice.actions

export default formSlice.reducer