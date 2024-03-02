import axios from 'axios'

const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 5,
        language: 'en',
        access_token: 'pk.eyJ1IjoiYWxlam92ZSIsImEiOiJjbDQ5dnd3M3gxNjhwM2ttczM5ejRscWFmIn0.IeaQA2qFgl_KDxQ2tQcICw'
    }
})

export default searchApi;