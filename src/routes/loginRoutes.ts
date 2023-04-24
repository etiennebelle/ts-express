import { Router, Request, Response } from "express";

interface RequestWithBody extends Request{
    body: { [key: string]: string | undefined }
}

const router = Router();

router.get('/', (req: Request, res: Response) => {
    // Look at req.session property
    // First look if this user has a session && if he's logged in
    if (req.session && req.session.loggedIn) {
        res.send(`
        <div>
            <div>You are logged in</div>
            <a href="/logout">Logout</a>
        </div>
        `)
    } else {
        res.send(`
        <div>
            <div>You need to log in</div>
            <a href="/login">Login</a>
        </div>
        `)
    }
})

router.get('/login', (req: Request, res: Response) => {
    res.send(`
        <form method='POST'>
            <div>
                <label>Email</label>
                <input name="email">
            </div>
            <div>
                <label>Password</label>
                <input name="password" type="password">
            </div>
            <button>Submit</button>
        </form>
    `)
})

router.post('/login', (req: RequestWithBody, res: Response) => {
    const { email, password } = req.body;
    
    if (email && password && email === 'bl.etienne7@gmail.com' && password === '123456') {
        // Mark this user as logged in
        req.session = { loggedIn: true }
        res.redirect('/')
        // Redirect him to the root route
    } else {
        res.send('Invalid email or password')
    }
})

export { router };