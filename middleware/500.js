'use strict';

/**
 * Note that there's nothing special about this middleware on it's own.
 * It will only "fire" if you define it last in the chain in your server
 * and if someone requests a route that has not been defined.  In that case,
 * this will run and send a proper 404 header and message.
 * @param req
 * @param res
 * @param next
 */
module.exports = (req,res,next) => {
  console.log('Internal Server Error');
  res.status(500);
  res.send('Oops, we ran into an internal server error. Please try again later.');
  res.end();
};
