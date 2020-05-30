'use strict';
const stripe = require('stripe')('sk_test_Oaf5tqZ2eCKingQGOgxdh26l00ckuQ43jV');
module.exports = function(Charge) {
  Charge.beforeRemote('create', function(context, chargeInstance, next) {
    var amount = context.args.data.amount;
    var currency = context.args.data.currency;
    var source = context.args.data.source;
    var description = context.args.data.description;
    stripe.charges.create({
      amount: amount,
      currency: currency,
      source: source, // obtained with Stripe.js
      description: description,
    }, function(err, charge) {
      if (err) {
        console.log(err);
        charge = err.message;
      }
      context.args.data.charge = charge;
      next();
    });
  });
};
