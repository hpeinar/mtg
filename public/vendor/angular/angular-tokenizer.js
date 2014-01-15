var taManager = angular.module('cmTokenizer', []);

taManager.directive('cmTokenizer', function() {
    return {
        restrict:'A',
        scope:{
            tokens: '=',
            options: '=',
            placeholder: '@'
        },
        replace:true,
        template:'<div class="cm-tokenizer" style="padding:3px; border-radius:7px; outline: none; border: 2px solid white;" data-ng-style="active">' +
            '<span class="label label-primary" style="text-align:inline; margin:1px; float:left;" data-ng-repeat="token in tokens">{{token}} <span data-ng-click="remove(token)" class="clickable">&times;</span></span>' +
            '<input data-ng-model="tagField" placeholder="{{placeholder}}" list="cm-tokenizer-list-{{id}}" style="border:0; outline:none;"/>' +
            '<datalist id="cm-tokenizer-list-{{id}}"><option data-ng-repeat="option in options | filter: isAlreadyUsed" value="{{option}}="></option></datalist>' +
            '</div>',

        link: function(scope, element, attrs) {
            scope.active = {};
            scope.id = Math.random().toString(36).substr(2);
            element.find('input')
            .on('focus', function () {
                scope.active = {
                    'border-color': '#9ecaed',
                    'box-shadow': '0 0 10px #9ecaed'
                };
                scope.$apply();
            })
            .on('blur', function () {
                scope.active = {
                    'border-color': 'white'
                };
                scope.$apply();
            });

            scope.isAlreadyUsed = function (el) {
                return !scope.tokens || !scope.tokens.some(function (token) {
                    return token.indexOf(el + '=') !== -1;
                });
            };

            scope.tagField = '';

            // Remove a tag
            scope.remove = function(tag) {
                scope.tokens = scope.tokens.filter(function(currentTag){
                    return currentTag.toLowerCase() != tag.toLowerCase();
                });
            };

            // Add a tag
            scope.add = function(tag){
                // Remove previous occurence if exists (avoid duplicated tag)
                scope.remove(tag);
                // Add tag to tagList
                scope.tokens.push(tag);
            }

            // switch tag from tagField to TagList
            scope.switchToTagList = function(){
                scope.$apply(function() {
                    if (scope.tagField.trim().length > 0) {
                        scope.add(scope.tagField.trim());
                        scope.tagField = '';
                    }
                });
            }

            // Registering event on backspace, enter or lost focus
            element.find('input')
                .bind("keydown", function(e){
                // On backspace load the previous tag into tagField input
                if(e.keyCode == 8){
                    scope.$apply(function() {
                        if (scope.tagField=='') {
                        scope.tagField = scope.tokens.pop();
                        }
                    });
                // On Enter switch tag to taglist
                }else if(e.keyCode == 13){
                    scope.switchToTagList();
                    }
                })
                // On lost focus -> add current tagfield content into tags array
                .bind("focusout", function(e){
                    scope.$apply(function() {
                        scope.tagField = '';
                    });
                });
        }
    }
});
