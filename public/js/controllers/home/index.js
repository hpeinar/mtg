'use strict';

(function (app) {
    app.controller('Home.IndexController', [
        '$scope',
        '$state',
        '$http',
        '$sce',
        function ($scope, $state, $http, $sce) {
            $scope.selectedCard = "";
            $scope.collection = [];

            $scope.addCard = function addCard(card) {
                $scope.collection.push(card);
                console.log($scope.collection);
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
                                card.name = card.fields.name;
                                card.value = card.fields.name;
                            });
                        }

                        return cards;
                    });
            };
        }
    ]);
}(window.MTG.main));
