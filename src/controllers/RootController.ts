import { NextFunction, Request, Response, Router } from 'express'
import { get, post, controller, use, bodyValidator } from './decorators'

function protectedFn(req: Request, res: Response, next: NextFunction) {
    if (req.session && req.session.loggedIn) {
        next()
        return
    }

    res.status(403).send('UnAuthorized')
}

@controller('')
class RootController {
    @get('/')
    dashboard(req: Request, res: Response) {
        if (req.session && req.session.loggedIn) {
            res.send(`
                <div>
                    <h1>You are logged in.</h1>
                    <a href="/auth/logout">Log out</a>
                </div>
            `)
        } else {
            res.send(`
                <div>
                    <h1>You are not logged in.</h1>
                    <a href="/auth/login">Log In</a>
                </div>
            `)
        }
    }

    @get('/protected')
    @use(protectedFn)
    getProtected(req: Request, res: Response) {
        res.send(`Protected`)
    }
}
