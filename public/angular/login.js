/**
 * Created by soham on 5/10/17.
 */
var Login = angular.module('login', []);
//defining the login controller
Login.controller('login', function($scope, $http) {

    $scope.invalid_login = true;
    $scope.unexpected_error = true;
    $scope.login = function() {

        $http({
            method : "POST",
            url : '/loginCheck',
            data : {
                "username" : $scope.username,
                "password" : $scope.password
            }
        }).success(function(data) {

            //checking the response data for statusCode
            if (data.status == 400) {
                alert("Invalid Login")
                $scope.invalid_login = false;
                $scope.unexpected_error = true;
            }
            else
            //Making a get call to the '/redirectToHomepage' API
                window.location.assign("/addListingPage");
        }).error(function(error) {
           alert('error')
        });
    };
})