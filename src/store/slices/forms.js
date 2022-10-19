import { createSlice } from '@reduxjs/toolkit'

export const formSlice = createSlice({
  name: 'form',
  initialState: {
  },
  reducers: {
    setSliderValue: (state, {payload: [form, value]}) => {
      state[form] = value
    },
    createToggles: (state, {payload: [form, keys]}) => {
      const keyFalseValuePairs = new Array(keys.map(key => [key, false]));
      state[form] = Object.fromEntries(keyFalseValuePairs);
    },
    toggleChoice: (state, {payload: [form, choice]}) => {
      state[form][choice] = !state[form][choice]
    }
  }
})

// Action creators are generated for each case reducer function
export const { setSliderValue, toggleChoice, createToggles } = formSlice.actions

export default formSlice.reducer