//importeer node modules
import express from 'express'
import fetch from "node-fetch";

//url opslaan in een constante
const url = 'https://whois.fdnd.nl/api/v1/squad/'

// Maak een nieuwe express app
const app = express()

// Stel in hoe we express gebruiken
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'));

// Maak een route voor de index
app.get('/', (request, response) => {
  console.log(request.query.squad)
  //haalt uit de index.ejs de data op die uit de api gehaald moet worden
  let slug = request.query.squad || 'squad-a-2022'
  let orderBy = request.query.orderBy || 'name'
  let squadUrl = url + slug + '?orderBy=' + orderBy + '&direction=ASC'
  //fetch data en stuur het object mee tijdens renderen
  fetchJson(squadUrl).then((data) => {
   response.render('index', data)

  })

})


// Stel het poortnummer in en start express
app.set('port', process.env.PORT || 8000)
app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})

// haal data op van de api en stuur message mee
async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error)
}


// function getRandomInt(max) {
//   const colors =[ '050542', '66e5bf', 'a675f5']
  
//     return  colors[Math.floor(Math.random() * max)] ;

// }
