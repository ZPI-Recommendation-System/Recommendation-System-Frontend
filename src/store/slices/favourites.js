import { createSlice } from '@reduxjs/toolkit'

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    list: []
  },
  reducers: {
    select: (state, {payload: laptop}) => {
        const index=state.list.indexOf(laptop);
        if (index !== -1) {
            // uncheck laptop on second click
            state.list.splice(index, 1);
        } 
        else {
            state.list.push(laptop)
        }
    }
  }
})

// Action creators are generated for each case reducer function
export const { select } = favouritesSlice.actions

export const favouritesCount = (state) => state.favourites.list.length
export const isFavourited = (id) => (state) => state.favourites.list.indexOf(id) !== -1

export default favouritesSlice.reducer