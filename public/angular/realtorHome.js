
/**
 * Created by soham on 5/10/17.
 */
//
var realtorHome = angular.module('realtorHome', []);


//defining the login controller
realtorHome.controller('realtorHome', function($scope, $http) {


    $scope.pickImage = function(){

            filepicker.setKey('A3YdX7UK4QhO5ThMDmFscz')
            filepicker.pickMultiple(
                {
                    mimetype: 'image/*',
                    container: 'modal',
                    services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'GOOGLE_DRIVE', 'DROPBOX']
                },
                function(Blob){


                        $scope.properties = Blob;

                    //for(i =0; i<$scope.properties.length; i++){
                    //    alert($scope.properties[i].url);
                    //}

                },
                function(FPError){
                    console.log(FPError.toString());
                });


        }


    $scope.addProperty = function() {


        $http({

            method : "POST",
            url : '/addListing',

            data : {
                "onwer": $scope.owner,
                "address" : $scope.address,
                "city" : $scope.city,
                "state" : $scope.state,
                "zip" : $scope.zip,
                "neighbourhood" : $scope.neighbourhood,
                "description" : $scope.description,
                "price" : $scope.price,
                "status" : $scope.status,
                "parking" : $scope.parking,
                "fireplace" : $scope.fireplace,
                "garage" : $scope.garage,
                "image" : $scope.properties[0].url
            }
        }).success(function(data) {

            //checking the response data for statusCode
            if (data.status == 400) {
                $scope.invalid_login = false;
                $scope.unexpected_error = true;
            }
            else {
                //Making a get call to the '/redirectToHomepage' API
                alert("Redirecting...")
                window.location.assign("/addListingPage");
            }
        }).error(function(error) {
            alert('error');
        });
    };
})

realtorHome.controller('listings', function($scope, $http) {

    $http({

        method: "GET",
        url: '/showListings',

    }).success(function(data){


        $scope.listings = data;

    }).error(function(error){
        alert("Error "+error)
    })

    $scope.openModal = function(address){
        $http({
            method: "GET",
            url : "/showSpecificListing",
            params:{
                address: address
            }
        }).success(function(data){
            alert("Loading Data...")
            $scope.listing = data[0];
        }).error(function(error){
            alert(error)
        })
    }

});