"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', (req, res) => {
    // Look at req.session property
    // First look if this user has a session && if he's logged in
    if (req.session && req.session.loggedIn) {
        res.send(`
        <div>
            <div>You are logged in</div>
            <a href="/logout">Logout</a>
        </div>
        `);
    }
    else {
        res.send(`
        <div>
            <div>You need to log in</div>
            <a href="/login">Login</a>
        </div>
        `);
    }
});
router.get('/login', (req, res) => {
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
    `);
});
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email && password && email === 'bl.etienne7@gmail.com' && password === '123456') {
        // Mark this user as logged in
        req.session = { loggedIn: true };
        res.redirect('/');
        // Redirect him to the root route
    }
    else {
        res.send('Invalid email or password');
    }
});
// 230 Log Out
router.get('/logout', (req, res) => {
    req.session = undefined;
    res.redirect('/');
});
