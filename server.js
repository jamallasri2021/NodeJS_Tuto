let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let session = require('express-session');

// Template engine
app.set('view engine', 'ejs');

//#region  Middleware
// Resources
app.use('/assets', express.static('public'));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//#endregion

//#region session
app.use(session({
    secret: 'cryptoMessage',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
//#endregion

//#region Routes
app.use(require('./middlewares/flash'))

app.get('/', (request, response) => {
    // if(request.session.error){
    //     response.locals.msgError = request.session.error;
    //     request.session.error = undefined;
    // }
    console.log(request.session);
    response.render('pages/index', { test: 'Edouard' });
});

app.post('/', (request, response) => {
    let msg = request.body.message;
    if (msg === undefined || msg === '') {
        //response.render('pages/index', { error: "You didn't type a message :(" });
        request.flash('error', "You didn't type a message :(");
    } else {
        let Message = require('./models/message');
        Message.create(request.body.message, () => {
            request.flash('success', 'Done :)');
        });
    }

    response.redirect('/');
});
//#endregion

app.listen(8080);