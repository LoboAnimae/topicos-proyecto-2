// Your code starts here

import express, {NextFunction, Request, Response} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

import indexRouter from './routes/index';
import usersRouter from './routes/authorization';
import CMiddleware from './Controllers/CMiddleware';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter); // Anybody can access here

app.use(CMiddleware.extractJWT);
app.use(CMiddleware.extractRequester);
app.use((req, res, next) => CMiddleware.barrier(res, next, () => {

}))
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
    next();
});

// error handler
app.use(function (err: { message: any; status: any; }, req: Request, res: Response, next: NextFunction) {
    res.status(400);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Started server on port ${PORT}`);
});