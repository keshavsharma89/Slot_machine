//This would be the only controller we are goint to use since it a single page app
myApp.controller('slotController', ['$scope', function($scope) {
	// we use this varialbe to the error messages
	$scope.msg='';
	
	// this small watch block will keep on empty our message vaiable so that the top error message disapear
	$scope.$watch('msg', function(newValue, oldValue){
		if($scope.msg!=''){
			setTimeout(function(){
				$scope.$apply(function () { $scope.msg=''; });
			}, 3000);
		}
	});
	
	// we will show the button using same flag
	$scope.showbtn=true;
	
	/*
	 * here is the list of variable we will be using
	 * ele array will basically contain all working elements or machines
	 * degub array will contain the dropdown and  checkbox that is realated to the degub mode
	 * paytable will be the static value, keeping our date here in json is very useful as we can changes it easly when needed
	 * */
	$scope.ele=[];
	$scope.debug=[];
	// Assigning first value to all the symbol dropdown
	$scope.debug.symbol1={id: 0, label: "Cherry"};
	$scope.debug.symbol2={id: 0, label: "Cherry"};
	$scope.debug.symbol3={id: 0, label: "Cherry"};	
	// Assigning first value to all the line dropdown
	$scope.debug.line1={id: 1, label: "Top"};
	$scope.debug.line2={id: 1, label: "Top"};
	$scope.debug.line3={id: 1, label: "Top"};
	// and here is the json for paytable rules
	$scope.paytable=[{images:['Cherry.png','Cherry.png','Cherry.png'],line:'Top',amount:2000}, {images:['Cherry.png','Cherry.png','Cherry.png'],line:'Center',amount:1000}, {images:['Cherry.png','Cherry.png','Cherry.png'],line:'Bottom',amount:4000}, {images:['7.png','7.png','7.png'],line:'Any',amount:150}, {images:['Cherry.png','7.png'],line:'Any',amount:75}, {images:['3xBAR.png','3xBAR.png','3xBAR.png'],line:'Any',amount:50}, {images:['2xBAR.png','2xBAR.png','2xBAR.png'],line:'Any',amount:20}, {images:['BAR.png','BAR.png','BAR.png'],line:'Any',amount:10}];
	
	// We need symbols and line to show value in select box 
	$scope.symbols=[{id:0, label: 'Cherry'}, {id:1, label: '2 Bar'}, {id:2, label: '3 Bar'}, {id:3, label: 'Seven'}, {id:4, label: 'Bar'}];
	$scope.line=[{id:1, label: 'Top'}, {id:2, label: 'Center'}, {id:3, label: 'Bottom'}];
	
	// If no win happen, we will ask user to try again.
	$scope.nexttime=function(){
		$scope.$apply(function () {	
			$scope.msg='Sorry!!! Better luck next time';
		});
	}
	
	/*
	 * User hit a jackpot this function will be called
	 * win is the itration under which the user got his jackpot, this will be among 0-7, Since we have 8 win rules
	 * line will be the line number where win happen. since we have 3 win line so it will be among 1-3
	 * */
	$scope.jackpot= function(win, line){
		let lines, rule;
		// figouring out which line need to blink
		switch(line){
			case 1:
				lines=angular.element(document.getElementsByClassName("winline1"));
				break;
			case 2:
				lines=angular.element(document.getElementsByClassName("winline2"));
				break;
			case 3:
				lines=angular.element(document.getElementsByClassName("winline3"));
				break;
		}
		// figouring out which row need to blink in paytable
		switch(win){
			case 0:
				rule=angular.element(document.querySelector(".rule0"));
				break;
			case 1:
				rule=angular.element(document.querySelector(".rule1"));
				break;
			case 2:
				rule=angular.element(document.querySelector(".rule2"));
				break;
			case 3:
				rule=angular.element(document.querySelector(".rule3"));
				break;
			case 4:
				rule=angular.element(document.querySelector(".rule4"));
				break;
			case 5:
				rule=angular.element(document.querySelector(".rule5"));
				break;
			case 6:
				rule=angular.element(document.querySelector(".rule6"));
				break;
			case 7:
				rule=angular.element(document.querySelector(".rule7"));
				break;
		}
		lines.addClass('blinking');
		rule.addClass('blinking');
		// after adding blinking class we will revoke it after 5 seconds
		setTimeout(function(){
			lines.removeClass('blinking');
			rule.removeClass('blinking');
		}, 5000);
		
		// and will we will add win amount to his balance
		$scope.$apply(function () {		
			$scope.debug.balance=$scope.debug.balance+$scope.paytable[win].amount;
		});
	}
	
	/*
	 * This function will get the machine values and line positions do the math and return if any win happen or not
	 * we will accept 6 arguments all interger values
	 * m1, m2, m3 will be the value of all the machine it produce after shuffling.
	 * l1, l2, l3 will the win line where the shuffling stops
	 * */
	$scope.getresult= function(m1, l1, m2, l2, m3, l3){
		if(l1==1 && m1==0 && l2==1 && m2==0 && l3==1 && m3==0 ){
			$scope.jackpot(0, 1);// Itration one, three cherry on top line
		}else if(l1==2 && m1==4 && l2==2 && m2==4 && l3==2 && m3==4){
			$scope.jackpot(1, 2);// Three cherry on center line
		}else if(l1==3 && m1==4 && l2==3 && m2==4 && l3==3 && m3==4){
			$scope.jackpot(2, 3);// Three cherry on bottom line
		}else if(  
				(l1==1 && m1==3 && l2==1 && m2==3 && l3==1 && m3==3) || 
				(l1==2 && m1==2 && l2==2 && m2==2 && l3==2 && m3==2) ||
				(l1==3 && m1==2 && l2==3 && m2==2 && l3==3 && m3==2)
			){
			$scope.jackpot(3, l1);// Seven on any line
		}else if(  
				(l1==1 && (m1==3 || m1==0) && l2==1 && (m2==3 || m2==0) && l3==1 && (m3==3 || m3==0) ) || 
				(l1==2 && (m1==2 || m1==4) && l2==2 && (m2==2 || m2==4) && l3==2 && (m3==2 || m3==4) ) ||
				(l1==3 && (m1==2 || m1==4) && l2==3 && (m2==2 || m2==4) && l3==3 && (m3==2 || m3==4) )
			){
			$scope.jackpot(4, l1);// Any combination of seven or cherry on any line
		}else if(  
				(l1==1 && m1==2 && l2==1 && m2==2 && l3==1 && m3==2) || 
				(l1==2 && m1==1 && l2==2 && m2==1 && l3==2 && m3==1) ||
				(l1==3 && m1==1 && l2==3 && m2==1 && l3==3 && m3==1)
			){
			$scope.jackpot(5, l1);// 3bar on any line
		}else if(  
				(l1==1 && m1==1 && l2==3 && m2==1 && l3==1 && m3==1) || 
				(l1==2 && m1==0 && l2==2 && m2==0 && l3==2 && m3==0) ||
				(l1==3 && m1==0 && l2==3 && m2==0 && l3==3 && m3==0)
			){
			$scope.jackpot(6, l1);// 2bar on any line
		}else if(  
				(l1==1 && m1==4 && l2==1 && m2==4 && l3==1 && m3==4) || 
				(l1==2 && m1==3 && l2==2 && m2==3 && l3==2 && m3==3) ||
				(l1==3 && m1==3 && l2==3 && m2==3 && l3==3 && m3==3)
			){
			$scope.jackpot(7, l1);// 2bar on any line
		}else{
			$scope.nexttime(); // user win nothing
		}
	}
	
	// This function will stop all the machines
	$scope.stop=function(){
		// since we need some time and interval in machine stoping, we are using settimeout functions here 
		setTimeout(function(){
			$scope.ele[0].stop(); // Machine 1 will be stoped by this
			setTimeout(function(){
				$scope.ele[1].stop(); // Machine 2 will be stoped by this 
				setTimeout(function(){
					$scope.ele[2].stop(); // Machine 3 will be stoped by this
					// once all the machines are stoped and we have all the possiotion and win lines. we will call getresult to calculate if we have any win.
					$scope.getresult($scope.ele[0].active, $scope.ele[0].settings.online, $scope.ele[1].active, $scope.ele[1].settings.online, $scope.ele[2].active, $scope.ele[2].settings.online );
					// we will show the button again once we stop all the machines using same flag
					$scope.$apply(function () {	
						$scope.showbtn=true;
					});
				}, 1000);
			}, 1000);
		}, 2000);
	}
	
	// This function will work on click of shuffle button
	$scope.shuffle=function(){
		// we need to make sure that machines are already running
		var runflag=false;
		angular.forEach($scope.ele, function(value, key){
			if(value.running){
				runflag=true;
			}
		});
		
		// runflag will be true if even one of machine is running. But this is not mandatory since we will hide the spin button anyways
		if(runflag){
			alert('wait');
		}else{
			if($scope.debug.balance > 0){					
				// we will hide the button using this flag
				$scope.showbtn=false;
				
				// we will take one coin from balance to run the machine
				$scope.debug.balance--;
				
				//we will check here if the debug mode is on or off
				if($scope.debug.check){
					// if on we will set the values of the drop down to the corresponding machines
					console.log($scope.debug.symbol1+", "+$scope.debug.line1);
					
					$scope.ele[0].setRandomize( parseInt($scope.debug.symbol1.id), parseInt($scope.debug.line1.id));
					$scope.ele[1].setRandomize( parseInt($scope.debug.symbol2.id), parseInt($scope.debug.line2.id));
					$scope.ele[2].setRandomize( parseInt($scope.debug.symbol3.id), parseInt($scope.debug.line3.id));
				}else{
					// if off we need to unset if any values was set to any machines, so that we get correct random value
					angular.forEach($scope.ele, function(value, key){
						value.unsetRandom();
					});
				}
				
				// since all the setting are made now we will start shuffling
				angular.forEach($scope.ele, function(value, key){
				  value.shuffle();
				});
				
				// this function will stop the shuffling
				$scope.stop();
			}else{
				$scope.msg='You are out of credit !!!';
				angular.element(document.querySelector(".balindicator")).focus();
			}
		}
	}
}]);
