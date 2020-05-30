'use strict';
const stripe = require('stripe')('sk_test_Oaf5tqZ2eCKingQGOgxdh26l00ckuQ43jV');
module.exports = function(Token) {
  Token.beforeRemote('create', function(context, chargeInstance, next) {
    var cardNumber = context.args.data.cardNumber;
    var expMonth = context.args.data.expMonth;
    var expYear = context.args.data.expYear;
    var cvc = context.args.data.cvc;
    stripe.tokens.create({
      card: {
        number: cardNumber,
        // eslint-disable-next-line camelcase
        exp_month: expMonth,
        // eslint-disable-next-line camelcase
        exp_year: expYear,
        cvc: cvc,
      },
    }, function(err, token) {
      if (err) {
        console.log(err);
        token = err.message;
      }
      context.args.data.token = token;
      next();
    });
  });
};
