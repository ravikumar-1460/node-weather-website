const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// console.log(__dirname)
// // console.log(__filename)
// console.log(path.join(__dirname, '../public'))

const app = express()

const port = process.env.PORT || 8000 

//define paths for express config
const publicdirpath = path.join(__dirname, '../public') //one time use function
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')


//setup static directory to server
app.use(express.static(publicdirpath))  //take root url inside all static html display
// app.get('', (req, res)=> {
//     res.send('<h1>hello express</h1>')
// })

// app.get('/help',(req,res) => {
//     res.send([{
//         name: 'ravi'
//     }, {
//         name: 'adhi'
//     }])
// })

// app.get('/about',(req,res) => {
//     res.send('<h1>about page</h1>')
// })

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)



app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather',
        name: 'Ravi'
    })
})
app.get('/about', (req, res)=> {
    res.render('about', {
        title: 'About Me',
        name: 'Ravi'
    })
})
app.get('/help', (req, res)=> {
    res.render('help', {
        title: 'Help Page',
        name: 'Ravi',
        message: 'Message is display is here'
    })
})
app.get('/weather',(req,res) => {
    if(!req.query.address) {
        return res.send({           //return to function stops
            error: 'u must provide a address'
        })
    }
    geocode(req.query.address , (error, {latitude,longitude,location}= {})=> {
        if(error) {
            return res.send({ error })
        }
        
        forecast(latitude,longitude, (error, forecastdata) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })
   
})

app.get('/product', (req,res)=> {
    if(!req.query.search) {
        return res.send({
            error: 'u must provide search term'
        })
    }
    res.send({
        products: []
    })
    console.log(req.query)
})
app.get('/help/*', (req,res)=> {
    res.render('404page',{
        title: '404 Page',
        message: 'Help article not founded',
        name: 'Ravi'
    })
})

app.get('*', (req,res)=> {
    res.render('404page', {
        title: '404 Page',
        message: 'Page not found',
        name: 'ravi'
    })
})





app.listen(port, () => {            //at one time using function
    console.log('server is on port' +port)
})