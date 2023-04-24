import { Router, Request, Response, NextFunction } from "express";

interface RequestWithBody extends Request{
    body: { [key: string]: string | undefined }
}

// 231 Protected Routes
// Logged In Middleware
function requireAuth(req: Request, res: Response, next: NextFunction): void {
    if (req.session && req.session.loggedIn) {
        next()
        return;
    }

    res.status(403);
    res.send('Not permitted');
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

// 230 Log Out
router.get('/logout', (req: Request, res: Response) => {
    req.session = undefined
    res.redirect('/')
})

// 231 Protected Routes
router.get('/protected', requireAuth, (req: Request, res: Response) => {
    res.send('Welcome to protected route logged in User :-)')
})

export { router };