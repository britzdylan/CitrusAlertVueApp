async function deleteStuff() {
  let headersList = {
    Accept: '*/*',
    'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiJjNGFhMWRkZTg2ODg0MDFmNTExYmJjYmFmNDM2Nzk1Y2I4YjhlNjExMGI0MmQ2MmQzOWUwM2EyOTU2ZGQ2N2YwYWUzYmQxZTM3YmViYjY0NCIsImlhdCI6MTY4ODYzNTU2NC42NDMwNDUsIm5iZiI6MTY4ODYzNTU2NC42NDMwNDcsImV4cCI6MTcyMDI1Nzk2NC42MzUwMDQsInN1YiI6IjQxOTQ4MyIsInNjb3BlcyI6W119.D3xzkVLdl6L5b7acOViLu41oXyTpMOOiz1S26lDdOevturtmVhZJCXc36XmlqhLvgupU99Oc64qayeKHml2Esv-OJtgYmeBLS-oKe57K0howXM6mrPc6OSOnLEFryCA2jpu5__8XOB4nqBjLE-n66YKqaMHO3kDJlzk3vOwm-0eBHfXXMCzzng5gOad9HPa78z4m5t6uGJQ5UVmVSJUmSYDP8KO_peth1d2xKB4GsL6ZT0A8Kh1X0OwaAwKjO9IpaY9Dyi2SuXC70bp26dQGKmsE3YkbwxnkbZqEoHk-6m6qrzYlCjDyCcECT9IPdSC3pvpH2Gzgw-0Ky8U_1L9vX6Mp_x7TWxXoAuexJOkW9x0Z_J1t0Xh_kTN5mDvokIKpAhbIcKcrOyum24bLS48UG2EeYSFFl1zNGv1agOqnpb7u4y4wqxc3G3LEo804-V9Uohr-fHCc2k1R1WKsfau9Z0czTd31xMXZ_roIqhFXjBtxIUVPVJtJgF-KkzXJAVQq',
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }

  let response = await fetch('https://api.lemonsqueezy.com/v1/webhooks?page[size]=100', {
    method: 'GET',
    headers: headersList
  })

  let data = await response.json()
  data.data.forEach(async (e) => {
    let response = await fetch(`https://api.lemonsqueezy.com/v1/webhooks/${e.id}`, {
      method: 'DELETE',
      headers: headersList
    })
    console.log(response.status)
  })
//   console.log(await response.json())
}

deleteStuff()
