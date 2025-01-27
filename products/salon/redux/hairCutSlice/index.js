import { createSlice } from "@reduxjs/toolkit"

const hairCutSlice = createSlice({
    name: "hairCut",
    initialState: {
        list: [],
        comments: []
    },
    reducers: {
        updateList: (state, action) => {
            state.list = action.payload
        },
        updateComments: (state, action) => {
            state.comments = action.payload
        }
    }
})

export default hairCutSlice