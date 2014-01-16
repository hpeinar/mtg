'use strict';

var express = require('express');
var elasticsearch = require('elasticsearch');
var app = express();
var config = require('easy-config');

var elasticClient = new elasticsearch.Client({
    host: config.elastic.host,
    log: "trace"
});

app.get('/search/:query', function(req, res) {
    elasticClient.search({
        index: 'sets',
        type: 'card',
        body: {
            sort: [
                {
                    multiverseid: {
                        order: "desc"
                    }
                }
            ],
            query: {
                wildcard: {
                    name:  req.params.query +'*'
                }
            }
        }
    }, function(error, response) {
        if(error) {
            res.send(error);
        } else {
            // remap
            response.hits.hits.forEach(function(card) {
                for(var field in card._source) {
                    card[field] = card._source[field];
                }
            });
            res.send(response.hits.hits);
        }
    })
});

module.exports = app;