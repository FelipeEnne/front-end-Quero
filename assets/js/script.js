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
  selectCity();
  selectCourse();
  filterAll();
  resultsOverlay();
}


//overlay primeiro select
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



//ranger
var slider = document.getElementById("myRange");
var output = document.getElementById("price");
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}
output.innerHTML = formatNumber(slider.value);
slider.oninput = function() {
	output.innerHTML = formatNumber(this.value);
}



//filters
function sortUniversityName(myObj){
	myObj.sort(function (a, b) {
	  return a.university.name < b.university.name ? -1 :
		(a.university.name > b.university.name ? 1 : 0);
  });
}

var citySelect, courseSelect, presencialSelect, adistaciaSelect, precoSelect;

function filterCidade(){
	var citySelect = document.getElementById("select-city").value;
	//console.log(citySelect);
}
function filterCourse(){
	var courseSelect = document.getElementById("select-course").value;
	//console.log(courseSelect);
}
function filterHow(){
	var presencialSelect = document.getElementById("presencial").value;
	var adistaciaSelect = document.getElementById("adistancia").value;
	//console.log(presencialSelect);
	//console.log(adistaciaSelect);
}
function filterPricefirst(){
	var precoSelect = slider.value;
	//console.log(precoSelect);
}
function filterAll(){
	sortUniversityName(myObj);
  	filterCidade();
  	filterCourse();
  	filterHow();
  	filterPricefirst();
}

function addCheckbox(id){
	let div = document.createElement("div");
	div.classList.add("modal-reults-margin");

	let label = document.createElement("label");
	label.classList.add("container-checkbox");
	label.classList.add("modal-reults-margin");

	let input = document.createElement("input");
	input.setAttribute("type", "checkbox");


	let span = document.createElement("span");
	span.classList.add("checkmark-checkbox");

	label.appendChild(input);
	label.appendChild(span);
	div.appendChild(label);

	let element = document.getElementById(id);
	element.appendChild(div);
}

function resultsOverlay(){

	addCheckbox("second-result");
	
}
