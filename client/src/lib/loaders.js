import apiRequest from '../lib/apiRequest.js'

export const singlePageLoader = async ({request, params}) => {
    const res = await apiRequest("/post/"+params.id)
    return res.data
}