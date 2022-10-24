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
      const keyFalseValuePairs = Array.from(keys.map(key => [key, false]));
      state[form] = Object.fromEntries(keyFalseValuePairs);
    },
    untoggleChoices: (state, {payload: form}) => {
      for(let key of Object.keys(state[form])) {
        state[form][key] = false;
      }
    },
    toggleChoice: (state, {payload: [form, choice]}) => {
      state[form][choice] = !state[form][choice]
      console.log("toggleChoice", form, choice, state)
    }
  }
})

// Action creators are generated for each case reducer function
export const { setSliderValue, toggleChoice, untoggleChoices, createToggles } = formSlice.actions

export default formSlice.reducer