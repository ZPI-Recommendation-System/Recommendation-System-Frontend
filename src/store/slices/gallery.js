import { createSlice } from '@reduxjs/toolkit'

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    images: [],
    selected: 0,
    visible: false,
  },
  reducers: {
    show: (state, { payload: { images } }) => {
        state.images = images
        state.selected = 0
        state.visible = true
    },
    hide: (state) => {
        state.visible = false
    },
    next: (state) => {
        state.selected = (state.selected + 1) % state.images.length
    },
    previous: (state) => {
        state.selected = (state.selected - 1 + state.images.length) % state.images.length
    }
  }
})

// Action creators are generated for each case reducer function
export const { show, hide, next, previous } = gallerySlice.actions
export const selectedImage = (state) => state.gallery.images[state.gallery.selected]
export const visible = (state) => state.gallery.visible

export default gallerySlice.reducer