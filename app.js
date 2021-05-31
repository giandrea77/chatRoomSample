var http = require('http'),
    express = require("express"),
    decode = require("./engine/jwt.js"),
    mongoose = require("mongoose")

const app = express();

// ** Config section 
var serverConfig = require('./config/serverConfig').get('local'), port = serverConfig.port;

app.set("port", port);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// ** MongoDB Section **
// mongoose.Promise = global.Promise;
const CONNECTION_URL = `mongodb://localhost:27017/chatMongo`
mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

mongoose.connection.on('connected', () => {
    console.log('[chatApp] Mongo has connected succesfully')
})
mongoose.connection.on('reconnected', () => {
    console.log('[chatApp] Mongo has reconnected')
})
mongoose.connection.on('error', error => {
    console.log('[chatApp] Mongo connection has an error (Please be sure chatMongo is available on localhost mongoDB server): ' + mongoDbUri, error)
    mongoose.disconnect()
})
mongoose.connection.on('disconnected', () => {
    console.log('[chatApp] Mongo connection is disconnected')
})

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('[chatApp] Mongoose disconnected on app termination');
        process.exit(0);
    });
});

// ** Welcome page **
app.get('/', (req, res) => {
    return res.send('Thanks for reaching this chat!');
});

// ** Routes Section **
var routes = require('./routes/routes'); //importing route
routes(app); //register the route

//  ** catch 404 and forward to error handler **
app.use('*', (req, res) => {
    return res.status(404).json({
        success: false,
        message: 'API endpoint doesnt exist'
    })
});

// ** Add headers **
app.use(function(req, res, next) {

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app._router.stack.forEach(function(r){
    if (r.route && r.route.path){
        console.log(r.route.path)
    }
});


/** Create HTTP server. */
const server = http.createServer(app);
/** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */

server.on("listening", () => {
    console.log(`Listening on port:: http://localhost:${port}/`)
    console.log("########################################################################");
    console.log('[chatApp] RESTful API server started on port ' + port);
    console.log('[chatApp] MongoDB ' + CONNECTION_URL);
    console.log("########################################################################");
});

module.exports = app;