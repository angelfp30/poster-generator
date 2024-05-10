import { useState, useEffect } from 'react'
import './App.css'

const CLIENT_ID = "0a8d87d67964494e9b88ebd208c0bef8"
const CLIENT_SECRET = "810c8abff5c14a868c56efc5787d19e2"

function App() {
  const [searchInput, setSearchInput] = useState('')
  const [accessToken, setAccessToken] = useState('')

  useEffect(() => {
    const authParameters = {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
  }, [])

  async function search() {
    console.log("Search for " + searchInput)

    const searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    }

    const albumID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=album', searchParameters)
     .then(response => response.json())
     .then(data => console.log(data))

  }

  return (
    <>
      <div className='app'>
        <input type="text" onKeyDown={event => {
          if (event.key == 'Enter') {
            search()
          }
        }} onChange={event => setSearchInput(event.target.value)}/>
        <button onClick={search}>Search</button>
      </div>  
    </>
  )
}

export default App
