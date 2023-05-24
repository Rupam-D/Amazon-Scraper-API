const express = require("express")
const { request } = require("http")
const app = express()
const port = process.env.PORT || 8000

// scraper api
const scraperUrl = (api) => `http://api.scraperapi.com?api_key=${api}&autoparse=true`


app.use(express.json())

// routing
app.get("/", (req, res) => {
     res.send(`Welcome to AMAZON Scarpper API`)
})

//Scrapping
app.get("/product/:id", async (req, res) => {
     try {
          const { id } = req.params
          const { api_key } = req.query
          await fetch(`${scraperUrl(api_key)}&url=https://www.amazon.in/dp/${id}`)           //api for the get request
               .then(response => response.json())
               .then(data => res.status(200).send((data)));
     } catch (e) { res.status(404).send("errir") }
})

app.get("/product/:id/reviews", async (req, res) => {
     try {
          const { id } = req.params
          const { api_key } = req.query
          await fetch(`${scraperUrl(api_key)}&url=https://www.amazon.in/product-reviews/${id}`)           //api for the get request
               .then(response => response.json())
               .then(data => res.status(200).send(JSON.stringify(data)));
     } catch (e) { res.status(404).send(e) }
})

app.get("/search/:searchQuery", async (req, res) => {
     try {
          const { searchQuery } = req.params
          const { api_key } = req.query
          await fetch(`${scraperUrl(api_key)}&url=https://www.amazon.in/s?k=${searchQuery}`)           //api for the get request
               .then(response => response.json())
               .then(data => res.status(200).send((data)));
     } catch (e) { res.status(404).send(e) }
})



// listening
app.listen(port, () => {
     console.log(`Amazon Scrapper API is running to http://localhost:${port}`)
})