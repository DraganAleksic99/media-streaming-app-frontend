const baseUrl = 'http://localhost:3500'

const create = async (params, credentials, media) => {
  try {
    const response = await fetch(baseUrl + '/api/media/new/' + params.userId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: media
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

export { create }
