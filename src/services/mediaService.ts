import { TMedia } from '../views/media/MediaList'
import { TParams, TCredentials } from './userService'

const baseUrl = 'https://media-streaming-app-backend-production.up.railway.app'

const create = async (params: TParams, credentials: TCredentials, media: FormData) => {
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

const listPopular = async (signal: AbortSignal) => {
  try {
    const response = await fetch(baseUrl + '/api/media/popular', {
      method: 'GET',
      signal: signal,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const listByUser = async (params: TParams) => {
  try {
    const response = await fetch(baseUrl + '/api/media/by/' + params.userId, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const read = async (params: { mediaId: string }, signal: AbortSignal) => {
  try {
    const response = await fetch(baseUrl + '/api/media/' + params.mediaId, {
      method: 'GET',
      signal: signal
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

export { create, listPopular, listByUser, read }
