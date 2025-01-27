import fetch, { apiNames } from "fetch"
import { hairCutActions } from "redux-slice"

async function fetchData(dispatch, cb) {
    let { list } = await fetch(apiNames.beta).get("/haircut/comments/1")
    dispatch(hairCutActions.updateComments(list))
    cb && cb(true)
}

export default fetchData