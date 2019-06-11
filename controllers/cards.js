const knex = require("../db/knex.js");

module.exports = {
    // CHANGE ME TO AN ACTUAL FUNCTION
    index: function(req, res) {
        if (!req.session.deck) {
            req.session.deck = [];
        }

        knex('cards')
            .then((results) => {
                res.render('index', { cards: results, deck: req.session.deck });
            })
    },
    create: function(req, res) {
        console.log(req.body)
        knex('cards')
            .insert(req.body)
            .then(() => {
                res.redirect('/')
            })
    },
    add: function(req, res) {
        knex('cards')
            .where('id', req.params.id)
            .then((result) => {
                req.session.deck.push(result[0]);
                res.redirect('/')
            })
    },
    remove: function(req, res) {
        let deck = req.session.deck;
        if (deck.length == 1) {
            deck = [];
            res.redirect('/')
            return;
        }

        for (var i = 0; i < deck.length; i++) {
            if (deck[i].id == req.params.id) {
                deck.splice(i, 1);
                res.redirect('/')
                return;
            }
        }
        res.redirect('/')
    }
}