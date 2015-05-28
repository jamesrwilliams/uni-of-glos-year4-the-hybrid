angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('AJAXCtrl', function($scope, $http) {
	
	$scope.doRefresh = function(){
	
		$http.get('http://www.the-hybrid.co.uk/api.php?request=get_lore_posts').then(function(resp) {
	
			console.log('Success', resp);
			// For JSON responses, resp.data contains the result
	
			drawLore(resp.data);
	
		}, function(err) {
			
			console.log('ERR', err);
			// err.status will contain the status code
			
		})
	
		$scope.$broadcast('scroll.refreshComplete');
		
	}
	

})

.controller('HybridCtrl', function($scope, $ionicPopover, $ionicBackdrop, $timeout){
	
	var template = "<ion-popover-view><ion-header-bar><h1 class='title'>Popover</h1></ion-header-bar><ion-content>Wassss up!</ion-content></ion-popover-view>"
	
	$scope.popover = $ionicPopover.fromTemplate(template, {
		
		$scope: $scope
		
	});
	
	$scope.openPopover = function($event){
		
		$ionicBackdrop.retain();
		$scope.popover.show($event);	
		
	};

		
		console.log("Fired");
		
		
		$timeout(function(){
			
			$ionicBackdrop.release();
			
		}, 5000);
		
	
})

.controller('LoginCtrl', function($scope, $http){
	
 $scope.data = {}
  
  $scope.showPopup = function($scope, transformRequestAsFormPost) {	 
	  
	$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"; 
	
	var password = "d55194bead47cbdd71591b73f6465e53"
	var username = "admin@the-hybrid.co.uk";
	
	var _password = encodeURIComponent(password);
	var _username = encodeURIComponent(username);

	// console.log(_password);
	// console.log(_username);
	
	$http({
	
		method: 'POST',
		url: 'http://www.the-hybrid.co.uk/api.php',
		data: $.param({request: "get_user_data", username:_username, password: _password}),
		headers: {'Content-Type':'application/x-www-form-urlencoded'}
		
	})
	.success(function(dataFromServer, status, headers, config){
		
		console.log(config.data); 
		console.warn(dataFromServer);
	
	});
	$http({
	
		method: 'POST',
		url: 'http://www.jamesrwilliams.co.uk/hybrid/api.php',
		data: $.param({request: "user_data", username:_username, password: _password}),
		headers: {'Content-Type':'application/x-www-form-urlencoded'}
			
	})
	.success(function(dataFromServer, status, headers, config){
		
		//console.log(config.data); 
		console.log("James' " + dataFromServer);
	
	});
   
  };
  
})

.controller('MapCtrl',function($scope, $ionicPopup, $timeout, $http){
	
	var game;
	
	$scope.claim = function(){
		
		$scope.claimDialog();
		
	};
	
	$scope.claimDialog = function(){
		
		var claim = $ionicPopup.show({
			
			template: '<p>The fate of humanity is in your hand</p><button ng-click="vampire()" ng-value="1" class="button button-block">Vampire</button"><button ng-click="werewolf()" class="button button-block">Werewolf</button><button class="button button-block" ng-click="ghost()">Ghost</button><button ng-click="zombie()" class="button button-block">Zombie</button>',
				
			title:"Choose your side",
			scope: $scope,
			buttons: [
				
				{ text: 'Cancel', type: 'button-positive'	}
				
			]
			
		});

		claim.then(function(res) {
			
	    	console.log('Tapped!', res);
	    	
	  	});
	  	
	  	$timeout(function() {
		     claim.close(); //close the popup after 3 seconds for some reason
		  }, 5000);
  	
  	};
	
	$scope.showAlert = function() {
	
		var alertPopup = $ionicPopup.alert({
			
			title: 'Infection Requires an Internet Connection',
			template: 'It seems The Hybrid Companion cannot connect to the game servers. Please try again later.',
			animation: 'fade-in'
		
		});
		
		
	};
	
	$scope.vampire = function($scope){ claim_location(1, game); }
	$scope.werewolf = function($scope){ claim_location(2, game); }
	$scope.ghost = function($scope){ claim_location(3, game); }
	$scope.zombie = function($scope){ claim_location(4, game); }
	
	$scope.sendUpdate = function(){
		
			$http({
			
				method: 'POST',
				url: 'http://www.jamesrwilliams.co.uk/hybrid/api.php',
				data: $.param({request: "update_game", data:update_game}),
				headers: {'Content-Type':'application/x-www-form-urlencoded'}
					
			})
			.success(function(dataFromServer, status, headers, config){
				
				//console.log(config.data); 
				console.log("James' " + dataFromServer);
			
			});
			
	};
	
	$http.get('http://www.jamesrwilliams.co.uk/hybrid/api.php?request=fetch_game').then(function(resp) {
	
		
			game = resp.data;
			console.log("Fetch Success");
			initialise(resp.data);
			
	
		}, function(err) {
			
			$scope.showAlert();
			
		})
	
	
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Zombies', id: 1 },
    { title: '70px', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
