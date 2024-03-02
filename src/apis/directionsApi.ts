import axios from 'axios'

const directionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        language: 'en',
        access_token: 'pk.eyJ1IjoiYWxlam92ZSIsImEiOiJjbDQ5dnd3M3gxNjhwM2ttczM5ejRscWFmIn0.IeaQA2qFgl_KDxQ2tQcICw'
    }
})

export default directionsApi;