/**
 * Created by soham on 5/10/17.
 */
/**
 * Created by soham on 5/10/17.
 */
var Signup = angular.module('signupApp', []);

//defining the login controller
Signup.controller('signup', function($scope, $http) {


    $scope.invalid_login = true;
    $scope.unexpected_error = true;
    $scope.submit = function() {


        $http({

            method : "POST",
            url : '/register',

            data : {
                "username" : $scope.username,
                "password" : $scope.password,
                "vrpassword" : $scope.vrpassword,
                "email" : $scope.email,
                "phone": $scope.phone
            }
        }).success(function(data) {

            //checking the response data for statusCode
            if (data.status == 400) {
                $scope.invalid_login = false;
                $scope.unexpected_error = true;
            }
            else {
                //Making a get call to the '/redirectToHomepage' API
                alert("You successfully registered! Redirecting...")
                window.location.assign("/login");
            }
        }).error(function(error) {
          alert('error');
        });
    };
})