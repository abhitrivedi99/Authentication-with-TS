import express from 'express'
import cookieSession from 'cookie-session'
import {router as controllerRouter} from './controllers/decorators/controller'
import './controllers/LoginController'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieSession({keys: ['grocery']}))

app.use(controllerRouter)

app.listen(3000, () => {
    console.log(`server is started`)
})
