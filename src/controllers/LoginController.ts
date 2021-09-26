import { NextFunction, Request, Response, Router } from 'express'
import { get, post, controller, use, bodyValidator } from './decorators'

@controller('/auth')
class LoginController {
    @get('/login')
    getLogin(req: Request, res: Response): void {
        res.send(`
            <form method="POST">
                <div>
                    <label>Email</label>
                    <input name="email" />
                </div>
                <div>
                    <label>Password</label>
                    <input name="password" type="password" />
                </div>     
                <button>Submit</button>
            </form>
        `)
    }

    @post('/login')
    @bodyValidator('email', 'password')
    login(req: Request, res: Response) {
        const { email, password } = req.body

        if (email && password && email === 'hi@gmail.com' && password === 'password') {
            req.session = { loggedIn: true }
            res.redirect('/')
        } else {
            res.send('You must provide valid email/password')
        }
    }

    @get('/logout')
    logout(req: Request, res: Response) {
        req.session = undefined
        res.redirect('/')
    }
}
