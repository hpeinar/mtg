'use strict';

(function (app) {
    app.filter('typeFilter', function() {
        function capitaliseFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        return function(input, type) {
            return input.filter(function(card) {
                return (card.types.indexOf(capitaliseFirstLetter(type)) !== -1);
            });
        }
    });

    app.controller('Home.IndexController', [
        '$scope',
        '$state',
        '$http',
        '$sce',
        function ($scope, $state, $http, $sce) {
            $scope.viewType = 'images';

            $scope.selectedCard = null;
            $scope.collection = [];


            $scope.addCard = function addCard(card) {
                card.count = 1;

                function findFromCollection(coll, card) {
                    var foundIndex = 0;
                    if(coll.some(function(c, index) {
                        foundIndex = index;
                        return (c.name === card.name);
                    })) {
                        return foundIndex;
                    } else {
                        return false;
                    }
                }

                // keep the collection array so we can sort it
                var collectionCard = findFromCollection($scope.collection, card);
                if(collectionCard !== false) {
                    $scope.collection[collectionCard].count++;
                } else {
//                    // remap fields to root
//                    for(var field in card.fields) {
//                        card[field] = card.fields[field];
//                    }
//                    delete card.fields;
                    $scope.collection.push(card);
                }

                console.log(card, $scope.collection);
            };

            $scope.getCardAutocomplete = function getCardAutocomplete(query) {
                if(!query) {
                    return [];
                }

                return $http.get('/cards/search/'+ query.toLowerCase())
                    .then(function(data) {
                        var cards = data.data;
                        if(cards && cards.length > 0) {
                            cards.forEach(function(card) {
                                card.value = card.name;
                            });
                        }

                        return cards;
                    });
            };
        }
    ]);
}(window.MTG.main));
