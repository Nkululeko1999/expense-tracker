export const errorHandler = (req, res, err, next) => {
    console.error(err.stack); //log error for debugging purposes

    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message
    });
}