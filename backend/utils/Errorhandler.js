import { ApiError } from "./ApiError.js";

const handleDBDuplicateFields = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate value ${value}.`;
    return new ApiError(message, 400);
};

const handleDBCastError = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new ApiError(message, 400);
};

const handleValidationError = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new ApiError(message, 400);
};

const handleJWTError = () => new ApiError('Invalid Token. Please login again.', 401);

const sendErrorDev = async (err, req, res) => {
    // Log error before responding



    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const  sendErrorProd = async (err, req, res) => {
    // Log error before responding


    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        // Unexpected error: don't leak details
        console.error('Unexpected Error:', err);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong on our end.',
        });
    }
};

export const errorhandler = async (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    



    if (process.env.NODE_ENV === 'development') {
        await sendErrorDev(err, req, res);
    } else if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'staging'
    ) {
        let error = { ...err };
        error.message = err.message; // copy message explicitly

        // schema error
        if (err.isJoi) error = new AppError(err.details[0].message, 400);

        if (error.name === 'CastError') error = handleDBCastError(error);
        if (error.code === 11000) error = handleDBDuplicateFields(error);
        if (error.name === 'ValidationError') error = handleValidationError(error);
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError')
            error = handleJWTError();

        await sendErrorProd(error, req, res);
    }
};