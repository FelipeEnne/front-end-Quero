//overlay
function onOverlay() {
  document.getElementById("overlay").style.display = "block";
}

function offOverlay() {
  document.getElementById("overlay").style.display = "none";
}



var myObj, myJSON, text, obj;

var requestURL = 'https://testapi.io/api/redealumni/scholarships';

var request = new XMLHttpRequest();

request.open('GET', requestURL);

request.responseType = 'json';

request.send();

request.onload = function() {
  myObj  = request.response;
  
}


//overlay primeiro select
console.log(myObj);
var allCitys = ["São José dos Campos"];
function pushCitys(){

	for(let i = 0; i < myObj.length; i++){
		if(allCitys.indexOf(myObj[i]["campus"]["city"]) == -1){
			allCitys.push(myObj[i]["campus"]["city"])
		}
	}
}
function selectCity() {

	pushCitys();
	for(let i = 1; i < allCitys.length; i++){
		let option = document.createElement('option');
		option.textContent = allCitys[i];
		option.value = allCitys[i];
		document.getElementById("select-city").appendChild(option);
	}
	//console.log("teste")
}



//overlay segundo select
var allCourses = [];
function pushCourses(){
 
	for(let i = 0; i < myObj.length; i++){
		if(allCourses.indexOf(myObj[i]["course"]["name"]) == -1){
			allCourses.push(myObj[i]["course"]["name"])
		}
	}
}
function selectCourse() {

	pushCourses();
	for(let i = 1; i < allCourses.length; i++){
		let option = document.createElement('option');
		option.textContent = allCourses[i];
		option.value = allCourses[i];
		document.getElementById("select-course").appendChild(option);
	}
	//console.log(allCourses)
}




var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}