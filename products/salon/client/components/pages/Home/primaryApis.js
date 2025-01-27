import fetch, { apiNames } from "fetch"
import { hairCutActions } from "redux-slice"

export default async function (dispatch) {
    const p1 = fetch(apiNames.beta).get("/haircut/list")
    // const p2 = fetch(apiNames.beta).get("haircut/comments/1")
    // const [{ list: hairList }, { list: commentsList }] = await Promise.all([p1, p2])
    const [{ list: hairList }] = await Promise.all([p1])
    // dispatch(hairCutActions.updateComments(commentsList))
    dispatch(hairCutActions.updateList(hairList))
}