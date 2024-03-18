const baseUrl = 'https://media-streaming-app-backend-production.up.railway.app'

export type TParams = {
  userId: string
}

export type TCredentials = {
  t: string
}

type TUser = {
  name: string
  email: string
  password: string
}

const create = async (user: TUser) => {
  try {
    const response = await fetch(baseUrl + '/api/users/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const list = async (signal: AbortSignal) => {
  try {
    const response = await fetch(baseUrl + '/api/users/', {
      method: 'GET',
      signal: signal
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const read = async (params: TParams, credentials: TCredentials, signal: AbortSignal) => {
  try {
    const response = await fetch(baseUrl + '/api/users/' + params.userId, {
      method: 'GET',
      signal: signal,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const update = async (params: TParams, credentials: TCredentials, user: FormData) => {
  try {
    const response = await fetch(baseUrl + '/api/users/' + params.userId, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: user
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const remove = async (params: TParams, credentials: TCredentials) => {
  try {
    const response = await fetch(baseUrl + '/api/users/' + params.userId, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

export { create, list, read, update, remove }
