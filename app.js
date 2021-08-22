let data = []
let content = document.querySelector('#content')

const getData = async (link) => {
    let response = await fetch(link) //1.60s
    let resData = await response.json()
    return resData
}

content.innerHTML = `<div class="alert alert-warning" role="alert">
    Loading ...
    </div>`
getData("https://restcountries.eu/rest/v2/all")
    .then((e) => {
        data = e
        if (data === null || data === undefined || data.length === 0) {
            content.innerHTML = `<div class="alert alert-danger" role="alert">
            No Data
          </div>`
        }
        else {
            putData(data.slice(0,10))
        }
    })
    .catch((err) => {
        console.log(err.message)
    })

const putData = (finalData) => {
    content.innerHTML = ''
    finalData.map((country) => content.innerHTML +=
        `
    <div class="card mx-3 my-3 " style="width:18rem;opacity:0.9;border-radius:7%">
        <div class="card-header text-center">
        ${country.name}
        </div>
        <img src="${country.flag}" class="card-img-top p-3" >
        <div class="card-body ">
            <p>Capital: ${country.capital}</p>           
            <p>Native-Name: ${country.nativeName}</p>
            <p>Region: ${country.region}</p>
            <p>Timezone: ${country.timezones}</p>
            <p>Currency: ${country.currencies[0].name}</p>
        </div>
    </div>
    `
    )
}
document.querySelector('#search').addEventListener('input', (event) => {
    // console.log(event.target.value);
    let finalData = data.filter((country) => country.name.toLowerCase().startsWith(event.target.value.toLowerCase()))
    // console.log(finalData);
    if (event.target.value === ''){
        finalData = finalData.slice(0,10)
    }
    if (finalData.length === 0) {
        content.innerHTML = `<div class="alert alert-warning" role="alert">
        Country Not Found
      </div>`
    }else{
        putData(finalData)
    }
})
const getIP = async() => {
    let myIP = await fetch('https://api.ipify.org/?format=json')
    let ipResult = await myIP.json()
    return ipResult
}

getIP().then(ip=>{
    document.querySelector('#ip').textContent = `Your IP is : ${ip.ip}`
})