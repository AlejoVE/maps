
export const getUserLocation = async (): Promise<[number, number]> => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            resolve([coords.longitude, coords.latitude])
        }, (err) => {
            alert('We could not get the geolocation')
            console.log(err)
            reject()
        })
    })
}