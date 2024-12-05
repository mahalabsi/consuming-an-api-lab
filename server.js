const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const axios = require('axios')
const PORT = process.env.PORT ? process.env.PORT: 3000

// const apiCtrl = require("./controllers/api")
// app.use('/', apiCtrl)

app.use(express.urlencoded({extended: false}))


app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.post('/weather/show', (req,res) => {
  const zipCode= req.body.zip
  axios({
    method: 'post', 
    url: `https://api.openweathermap.org/data/2.5/weather?q=${zipCode},us&APPID=${process.env.api}`
})

// axios.get(`api.openweathermap.org/data/2.5/weather?q=${zipCode},us&APPID=70f173b2a0b1c0c4c209a15ab8db8226`)

 .then((response) => {
  console.log(response.data)
  res.render('weather/show.ejs', {data: response.data})
})
.catch((err) => {
  console.log(err)
})

})



app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`)
})