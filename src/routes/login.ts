import { NextFunction, Request, Response, Router } from 'express'

interface RequestWithBody extends Request {
    body: { [key: string]: string | undefined }
}

function protectedFn(req: Request, res: Response, next: NextFunction) {
    if (req.session && req.session.loggedIn) {
        next()
        return
    }

    res.status(403).send('UnAuthorized')
}

const router = Router()

router.get('/', (req: Request, res: Response) => {
    if (req.session && req.session.loggedIn) {
        res.send(`
            <div>
                <h1>You are logged in.</h1>
                <a href="/logout">Log out</a>
            </div>
        `)
    } else {
        res.send(`
            <div>
                <h1>You are not logged in.</h1>
                <a href="/login">Log In</a>
            </div>
        `)
    }
})

router.get('/login', (req: Request, res: Response) => {
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
})

router.post('/login', (req: RequestWithBody, res: Response) => {
    const { email, password } = req.body

    if (email && password && email === 'hi@gmail.com' && password === 'password') {
        req.session = { loggedIn: true }
        res.redirect('/')
    }
    return res.send('You must provide email')
})

router.get('/logout', (req: Request, res: Response) => {
    req.session = undefined
    res.redirect('/')
})

router.get('/protected', protectedFn, (req: Request, res: Response) => {
    res.send(`Protected`)
})

export { router }
