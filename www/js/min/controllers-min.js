angular.module("starter.controllers",[]).controller("AppCtrl",function(t,o,e){t.loginData={},o.fromTemplateUrl("templates/login.html",{scope:t}).then(function(o){t.modal=o}),t.closeLogin=function(){t.modal.hide()},t.login=function(){t.modal.show()},t.doLogin=function(){console.log("Doing login",t.loginData),e(function(){t.closeLogin()},1e3)}}).controller("AJAXCtrl",function(t,o){t.doRefresh=function(){o.get("http://www.the-hybrid.co.uk/api.php?request=get_lore_posts").then(function(t){$("#lore_output").text(""),drawLore(t.data)},function(t){console.log("ERR",t)}),t.$broadcast("scroll.refreshComplete")},t.doRefresh()}).controller("HybridCtrl",function(t,o,e,n){}).controller("PlayerCtrl",function(t,o,e,n){t.playerRefresh=function(){t.getPlayerData(),t.$broadcast("scroll.refreshComplete")},t.getPlayerData=function(){var o=window.localStorage.getItem("the-hybrid_player");t.loginPrompt=function(){var o=e.show({template:"Please Login to Access Player Data",title:"Choose your side",scope:t,buttons:[{text:"Login",type:"button-positive",onTap:function(t){n.go("app.login"),console.log("Login Pressed")}},{text:"Register",type:"button",onTap:function(t){return console.log("Register Pressed"),window.open("http://www.the-hybrid.co.uk","_system","location=yes"),!1}}]});o.then(function(t){})},null!=o?console.log("Loaded"):t.loginPrompt()},t.getPlayerData()}).controller("LoginCtrl",function(t,o,e){t.data={},t.showPopup=function(t,n){o.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded";var a=$("#password").val(),l=$("#username").val(),i=encodeURIComponent(a),r=encodeURIComponent(l);o({method:"POST",url:"http://www.the-hybrid.co.uk/api.php",data:$.param({request:"get_player_data",username:l,password:i}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).success(function(t,o,n,a){console.log(a),console.warn(t);var l=JSON.stringify(t);window.localStorage.setItem("the-hybrid_player",l),e.go("app.player")})}}).controller("MapCtrl",function(t,o,e,n){var a;t.claim=function(){t.claimDialog()},t.claimDialog=function(){var n=o.show({template:'<p>The fate of humanity is in your hand</p><button ng-click="vampire()" ng-value="1" class="button button-block">Vampire</button"><button ng-click="werewolf()" class="button button-block">Werewolf</button><button class="button button-block" ng-click="ghost()">Ghost</button><button ng-click="zombie()" class="button button-block">Zombie</button>',title:"Choose your side",scope:t,buttons:[{text:"Cancel",type:"button-positive"}]});n.then(function(t){}),e(function(){n.close()},5e3)},t.showAlert=function(){var t=o.alert({title:"Infection Requires an Internet Connection",template:"It seems The Hybrid Companion cannot connect to the game servers. Please try again later.",animation:"fade-in"})},t.vampire=function(t){claim_location(1,a)},t.werewolf=function(t){claim_location(2,a)},t.ghost=function(t){claim_location(3,a)},t.zombie=function(t){claim_location(4,a)},t.sendUpdate=function(){claim.close(),n({method:"POST",url:"http://www.jamesrwilliams.co.uk/hybrid/api.php",data:$.param({request:"update_game",data:update_game}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).success(function(t,o,e,n){})},n.get("http://www.jamesrwilliams.co.uk/hybrid/api.php?request=fetch_game").then(function(t){a=t.data,a=a.replace(/\\"/g,'"'),a=a.substring(1,a.length-1),a=JSON.parse(a),initialise(a)},function(o){t.showAlert()})});