import { createSlice } from '@reduxjs/toolkit'

export const selectionSlice = createSlice({
  name: 'selection',
  initialState: {
    selected: []
  },
  reducers: {
    reset: (state) => {
        state.selected = []
    },
    setSelected: (state, {payload: selected}) => {
        state.selected = [...selected]
    },
    select: (state, {payload: laptop}) => {
        const index=state.selected.indexOf(laptop);
        if (index !== -1) {
            // uncheck laptop on second click
            state.selected.splice(index, 1);
        } 
        else if (state.selected.length === 2) {
            // deselect first laptop to keep the count of two
            state.selected = [state.selected[1], laptop]
        }
        else {
            // add laptop to selected
            state.selected.push(laptop)
        }
    }
  }
})

// Action creators are generated for each case reducer function
export const { reset, select, setSelected } = selectionSlice.actions

export default selectionSlice.reducer