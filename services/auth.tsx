import axios from 'axios'

export async function signIn(
  email: string,
  password: string
): Promise<any> {
  const data = {
    identifier: email,
    password: password
  }
  try {
    const response = await fetch('http://localhost:1337/auth/local', {
      method: 'POST',
      headers: [['Content-Type', 'application/json']],
      body: JSON.stringify(data)
    }).catch((error) => {
      console.error('Error:', error)
    })
    return response.json()
  } catch (err) {
    console.log(err)
  }
}

export async function signInWithGoogle(): Promise<any> {
  const redirectUrl = 'http://localhost:1337/'
  try {
    let response = await fetch(
      `http://localhost:1337/auth/google/callback?${redirectUrl}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return response.json()
  } catch (err) {
    console.log(err)
  }
}

export async function signUp(
  username: string,
  email: string,
  password: string
) {
  const data = {
    username: username,
    email: email,
    password: password
  }
  try {
    const response = await axios.post(
      'http://localhost:1337/auth/local/register',
      data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    !response.data && console.log('from strapi')
    return response.data
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.table(error.response.data.data[0].messages)
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
    }
  }
}
