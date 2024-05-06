let BASE_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"


let display_table = document.querySelector("#myTable tbody")
const market_cap_btn = document.querySelector("#mkt_cap_btn")
const percentage_btn = document.querySelector("#percentage_btn")
let searchInput = document.querySelector("#user_input")


//async-await
const getCryptoDataUsingAsyncAwait = async () => {
    try {
        const response = await fetch(BASE_URL)
        const data = await response.json()

        localStorage.setItem("cryptoData",JSON.stringify(data))
        data.forEach(element => {
            createTable(element)
        })
    }
    catch (e) {
        console.log(e)
    }
}


//user search 
searchInput.addEventListener("input", (eventDetails) => {
    eventDetails.preventDefault()
    const searchText = searchInput.value.trim().toLowerCase()
    filterCryptoData(searchText)
})

function filterCryptoData(searchText) {
    const data_obj = localStorage.getItem("cryptoData")
    const crypto_data = JSON.parse(data_obj)
    
    const filteredData = crypto_data.filter(crypto => {
        return crypto.name.toLowerCase().includes(searchText) || crypto.symbol.toLowerCase().includes(searchText)
    });

    display_table.innerHTML = ""

    filteredData.forEach(element => {
        createTable(element)
    });
}


//sort by market cap 
market_cap_btn.addEventListener("click", (eventDetails) => {
    eventDetails.preventDefault()
    const data_obj = localStorage.getItem("cryptoData")
    const crypto_data = JSON.parse(data_obj)
    crypto_data.sort(function(a,b){
        return a.market_cap - b.market_cap
    })
    display_table.innerHTML = ""

    crypto_data.forEach(element => {
        createTable(element)
    })

})

//sort by percentage
percentage_btn.addEventListener("click", (eventDetails) => {
    eventDetails.preventDefault()
    const data_obj = localStorage.getItem("cryptoData")
    const crypto_data = JSON.parse(data_obj)
    crypto_data.sort(function(a,b){
        return a.market_cap_change_percentage_24h - b.market_cap_change_percentage_24h
    })
    display_table.innerHTML = ""

    crypto_data.forEach(element => {
        createTable(element)
    })
})


//table creation
function createTable(crypto_obj) {
    let table_row = document.createElement("tr")
    let table_data1 = document.createElement("td")
    table_data1.className = "img"

    let crypto_img = document.createElement("img")
    crypto_img.src = `${crypto_obj.image}`

    table_data1.append(crypto_img)
    table_row.append(table_data1)


    let table_data2 = document.createElement("td")
    table_data2.className = "name"
    table_data2.innerText = `${crypto_obj.name}`
    table_row.append(table_data2)


    let table_data3 = document.createElement("td")
    table_data3.className = "symbol"
    table_data3.innerText = `${crypto_obj.symbol.toUpperCase()}`
    table_row.append(table_data3)


    let table_data4 = document.createElement("td")
    table_data4.className = "current_price"
    table_data4.innerText = `$${crypto_obj.current_price}`
    table_row.append(table_data4)


    let table_data5 = document.createElement("td")
    table_data5.className = "total_volume"
    table_data5.innerText = `$${crypto_obj.total_volume.toLocaleString()}`
    table_row.append(table_data5)


    let table_data6 = document.createElement("td")
    table_data6.className = "percentage"
    let percent = crypto_obj.market_cap_change_percentage_24h.toFixed(2)
    if (percent > 0) {
        table_data6.classList.add("green")
    }
    else {
        table_data6.classList.add("red")
    }
    table_data6.innerText = `${percent}%`
    table_row.append(table_data6)


    let table_data7 = document.createElement("td")
    table_data7.className = "market_cap"
    table_data7.innerText = `Mkt Cap : $${crypto_obj.market_cap.toLocaleString()}`
    table_row.append(table_data7)

    display_table.append(table_row)

}

window.addEventListener("load", () => {
    getCryptoDataUsingAsyncAwait()
})
