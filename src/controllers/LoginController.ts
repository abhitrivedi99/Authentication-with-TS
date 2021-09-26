import {NextFunction, Request, Response, Router} from 'express'
import {get} from './decorators/routes'
import {controller} from './decorators/controller'

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


// getHome()
// router.get('/', (req: Request, res: Response) => {
//     if (req.session && req.session.loggedIn) {
//         res.send(`
//             <div>
//                 <h1>You are logged in.</h1>
//                 <a href="/logout">Log out</a>
//             </div>
//         `)
//     } else {
//         res.send(`
//             <div>
//                 <h1>You are not logged in.</h1>
//                 <a href="/login">Log In</a>
//             </div>
//         `)
//     }
// })


// router.post('/login', (req: RequestWithBody, res: Response) => {
//     const { email, password } = req.body
//
//     if (email && password && email === 'hi@gmail.com' && password === 'password') {
//         req.session = { loggedIn: true }
//         res.redirect('/')
//     }
//     return res.send('You must provide email')
// })
//
// router.get('/logout', (req: Request, res: Response) => {
//     req.session = undefined
//     res.redirect('/')
// })
//
// router.get('/protected', protectedFn, (req: Request, res: Response) => {
//     res.send(`Protected`)
// })

}