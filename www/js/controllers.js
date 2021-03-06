/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})
.controller('EventCtrl',function($scope, $http,$stateParams, $ionicPopup,$timeout, ionicMaterialMotion, ionicMaterialInk,$sce,$cordovaFileTransfer, $ionicLoading,$state) {
     $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');
    
    
     $scope.authorization = {
                category: '',
                title: '',
                start:'',
                end: '',
                details:'',
                city: '',
                venuename:'',
                venuearea: '',
                add_details: '',
                organiser_name: '',
                organiser_Contact: '',               
                image: ''              
                  
  };
    $scope.imgupld = function()
    {
               
            $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
           //console.log('Doing login', $scope.authorization);
      $.ajax({
        type: 'POST',
        url: '/Cart/remove_item/'+res_id+'/'+id,
        success: function(return_data){
//console.log(return_data);
            var data=JSON.parse(return_data);
// console.log(data);
            if(mob==0)
                show_cart(data);
                else
                    show_mobile_cart(data);
        }
    });
    }
       $scope.signIn = function() {
           
            $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
           //console.log('Doing login', $scope.authorization);
                           
    $http.post('http://humarimandi.com/api/index.php/vedio/addevents', {
                category: $scope.authorization.category,
                title: $scope.authorization.title,
                start: $scope.authorization.start,
                end: $scope.authorization.end,
                details: $scope.authorization.details,
                city: $scope.authorization.city,
                venuename: $scope.authorization.venuename,
                venuearea: $scope.authorization.venuearea,
                add_details: $scope.authorization.add_details,
                organiser_name: $scope.authorization.organiser_name,
                organiser_Contact: $scope.authorization.organiser_Contact
                
            })
    .success(function(data){
         $ionicLoading.hide();
   
       var alertPopup =  $ionicPopup.alert({
       title: 'Success',
       template: 'Event Inserted Successfully'
     });
 
   alertPopup.then(function(res) {
   $scope.insert_id = data;
       $state.go('insert-image')
   });
    });     
   
     }
   
  
     $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
$http.get('http://humarimandi.com/api/index.php/vedio/getAllEvents')
    .success(function(data){
    $scope.AllEvents=data.getAllEvents;
   
        $scope.photo = $sce.trustAsResourceUrl('http://humarimandi.com/api/images/');
    });
 $scope.register =function(data){
    console.log(data);
             $http.post("http://humarimandi.com/api/index.php/vedio/addevents",data).success(function(data) {

            $scope.response = data; console.log(data);
       
        }) }
   
})
   
.controller('CropImgCtrl', function($scope, $stateParams) {
  $scope.imagestring = decodeURIComponent($stateParams.imageURI);
})
.controller('FriendsCtrl', function($scope, $http,$stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,$sce,$ionicLoading) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');
    $scope.showstartCard = false;
    $scope.mainscreen = true;
    $scope.searchdata = false;
    $scope.carr = function()
    {
       $scope.showstartCard = true;
       $scope.mainscreen = false;
       $scope.searchdata = true;
    }
  
    // Delay expansion
     $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
     $scope.photo = $sce.trustAsResourceUrl('http://humarimandi.com/api/images/');
    $http.get('http://humarimandi.com/api/index.php/vedio/getAllVedio')
    .success(function(data){
    $scope.allvedios=data.allvedios;
    $scope.allcategories=data.allcategories;
       $scope.code = 'NAT';
        $scope.code2 = 'MMV';
      
    }); 
    $http.get('http://humarimandi.com/api/index.php/vedio/getMarathiNataktype1')
    .success(function(data){
    $scope.allnatak=data.allvedios;
    });
    $scope.t1 = function()
    {
        $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
    $http.get('http://humarimandi.com/api/index.php/vedio/getMarathiNataktype1')
    .success(function(data){$ionicLoading.hide();
    $scope.allnatak=data.allvedios;
    });
    }
    $scope.t2 = function()
    {$ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
        $http.get('http://humarimandi.com/api/index.php/vedio/getMarathiNataktype2')
    .success(function(data){$ionicLoading.hide();
    $scope.allnatak=data.allvedios;
    });
    }
    $scope.t3 = function()
    {
    $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
        $http.get('http://humarimandi.com/api/index.php/vedio/getMarathiNataktype3')
    .success(function(data){ $ionicLoading.hide();
    $scope.allnatak=data.allvedios;
    });
    }
    
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
         $ionicLoading.hide();
    }, 3000);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})




.controller('ViewCategoriesCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion,$http,$sce, ionicMaterialInk) {
    
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');
    
     var id=$stateParams.categoryid;    
     $http.get('http://humarimandi.com/api/index.php/vedio/viewcategory/'+id)
    .success(function(data){
         console.log(data);
    $scope.viewcategory=data.viewcategory;
    $scope.catName=data.catName;
         $scope.photo = $sce.trustAsResourceUrl('http://humarimandi.com/api/images/');
         
    });  
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ActivityCtrl', function($scope, $http,$stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,$sce) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    var id=$stateParams.vedioId;
    $http.get('http://humarimandi.com/api/index.php/vedio/getSingle/'+id)
    .success(function(data){
        
        $scope.vedio = data.song;
        $scope.likes = data.likes;
        $scope.views = data.views;
        $scope.vid = $sce.trustAsResourceUrl('http://humarimandi.com/api/vedios/'+data.song.file_path);
        $scope.photo = $sce.trustAsResourceUrl('http://humarimandi.com/api/images/');
       //$scope.vid = "http://humarimandi.com/api/vedios/Manjhi_The_man.mp4";
});
     $scope.like = function(user)
    {
        if(window.localStorage['like'])
        {  
            window.localStorage.removeItem('like');
        $http.get('http://humarimandi.com/api/index.php/vedio/likes/'+user)
    .success(function(data){ 
            $scope.likes = data.likes;
    });
        }
       
        
    }

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

;
