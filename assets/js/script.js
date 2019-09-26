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
			allCourses.push(myObj[i]["course"]["name"]);
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
presencialSelect = 1;
adistaciaSelect = 1;
function filterCidade(){
	citySelect = document.getElementById("select-city").value;
	//console.log(citySelect);
}
function filterCourse(){
	courseSelect = document.getElementById("select-course").value;
	//console.log(courseSelect);
}

function changePresencial(){
	if(presencialSelect == 1){
		presencialSelect = 0;
	}else{
		presencialSelect = 1;
	}

}
function changeaDistacia(){
	if(adistaciaSelect == 1){
		adistaciaSelect = 0;
	}else{
		adistaciaSelect = 1;
	}

}

function filterPricefirst(){
	precoSelect = slider.value;
	//console.log(precoSelect);
}
function filterAll(){
	sortUniversityName(myObj);
  	filterCidade();
  	filterCourse();
  	filterPricefirst();
}




//results
var resultsIndex = [];
function  getIndexAfterFilter(){

	console.log(precoSelect);
	
	for(let i = 1; i < myObj.length; i++){
		if(myObj[i]["campus"]["city"] == citySelect && 
			(myObj[i]["course"]["name"] == courseSelect || courseSelect== "") &&
			(myObj[i]["price_with_discount"] <= precoSelect)){
			
			if(myObj[i]["course"]["kind"] == "Presencial" && presencialSelect== 1){
				resultsIndex.push(i);
			}
			if(myObj[i]["course"]["kind"] == "EaD" && adistaciaSelect == 1){
				resultsIndex.push(i);
			}
			
		}
	}
}

function addCheckbox(id,idinput){
	let div = document.createElement("div");
	div.classList.add("modal-reults-margin");

	let label = document.createElement("label");
	label.classList.add("container-checkbox");
	label.classList.add("modal-reults-margin");

	let input = document.createElement("input");
	input.setAttribute("type", "checkbox");
	input.setAttribute("id", idinput);


	let span = document.createElement("span");
	span.classList.add("checkmark-checkbox");

	label.appendChild(input);
	label.appendChild(span);
	div.appendChild(label);

	let element = document.getElementById(id);
	element.appendChild(div);
}


function addLogo(id,index){
	let div = document.createElement("div");
	div.setAttribute("class","modal-img-width");

	let img = document.createElement("img");
	img.setAttribute("class","modal-img");
	let nameUniversity = myObj[index]["university"]["name"];

	if(myObj[index]["university"]["name"] == "Anhembi Morumbi" ||
	 myObj[index]["university"]["name"] == "UNICSUL" ||
	 myObj[index]["university"]["name"] == "UNIP" ){
		img.setAttribute("style","margin-top: 10px;");
	}

	img.setAttribute("src", "assets/img/"+nameUniversity.toLowerCase()+".png");


	div.appendChild(img);

	let element = document.getElementById(id);
	element.appendChild(div);
}

function addText(id,index){
	let div1 = document.createElement("div");

	let div2 = document.createElement("div");
	div2.setAttribute("class","modal-title-result");
	div2.innerHTML = myObj[index]["course"]["name"];
	
	
	div1.appendChild(div2);


	let div3 = document.createElement("div");
	div3.setAttribute("class","modal-text-result");
	div3.innerHTML = myObj[index]["course"]["level"];

	div1.appendChild(div3);
	
	let element = document.getElementById(id);
	element.appendChild(div1);
}


function addTextBolsa(id,index){

	let div1 = document.createElement("div");
	div1.setAttribute("class","modal-bolsa");
	
	
	let div2 = document.createElement("div");
	div2.setAttribute("class","modal-text-bolsa");
	div2.innerHTML = "Bolsa de ";

	let margin = ((myObj[index]["course"]["name"]).length - 8)*7.5;
	div2.style.marginLeft = -margin+"px";
	

	let strong = document.createElement("strong");
	strong.setAttribute("class","modal-bold-bolsa");
	strong.innerHTML = myObj[index]["discount_percentage"]+"%";

	div2.appendChild(strong);
	div1.appendChild(div2);


	let div3 = document.createElement("div");
	div3.style.marginLeft = -margin+"px";
	let strong1 = document.createElement("strong");
	strong1.setAttribute("class","modal-bold-bolsa");
	strong1.innerHTML = "R$ "+Math.round(myObj[index]["price_with_discount"])+"/mês";

	div3.appendChild(strong1);
	div1.appendChild(div3);
	

	let element = document.getElementById(id);
	element.appendChild(div1);
}

var counthrID = 1;
function addhr(id){
	let hr = document.createElement("hr");
	hr.setAttribute("class","hr-modal");
	hr.setAttribute("id","hrcount"+counthrID);
	counthrID++;

	let element = document.getElementById(id);
	element.after(hr);

}

function addResultModal(id,index,idinput){
	addCheckbox(id,idinput);
	addLogo(id,index);
	addText(id,index);
	addTextBolsa(id,index);
	addhr(id);
}

function showResultModal(){
	if(resultsIndex[0]){
		addResultModal("first-result",resultsIndex[0],"checkbox1");
	}
	if(resultsIndex[1]){
		addResultModal("second-result",resultsIndex[1],"checkbox2");
	}
	if(resultsIndex[2]){
		addResultModal("third-result",resultsIndex[2],"checkbox3");
	}
	if(resultsIndex[3]){
		addResultModal("fourth-result",resultsIndex[3],"checkbox4");
	}
	if(resultsIndex[4]){
		addResultModal("fifth-result",resultsIndex[4],"checkbox5");
	}
}

function resultsOverlay(){

	getIndexAfterFilter();
	console.log(resultsIndex);
	showResultModal();

	//console.log(document.getElementById("second-result").value);
	
}

function removeChildModal(){

	let firstdiv = document.getElementById("first-result");
	let seconddiv = document.getElementById("second-result");
	let thirddiv = document.getElementById("third-result");
	let fourthdiv = document.getElementById("fourth-result");
	let fifthdiv = document.getElementById("fifth-result");

	let hr1 = document.getElementById("hrcount1");
	let hr2 = document.getElementById("hrcount2");
	let hr3 = document.getElementById("hrcount3");
	let hr4 = document.getElementById("hrcount4");
	let hr5 = document.getElementById("hrcount5");

	if(firstdiv.hasChildNodes()){
		hr1.remove();
	}
  	while (firstdiv.hasChildNodes()) {
    	firstdiv.removeChild(firstdiv.firstChild);
  	}
  	

  	if(seconddiv.hasChildNodes()){
		hr2.remove();
	}
  	while (seconddiv.hasChildNodes()) {
    	seconddiv.removeChild(seconddiv.firstChild);
  	}
  	

  	if(thirddiv.hasChildNodes()){
		hr3.remove();
	}
  	while (thirddiv.hasChildNodes()) {
    	thirddiv.removeChild(thirddiv.firstChild);
  	}
  	

  	if(fourthdiv.hasChildNodes()){
		hr4.remove();
	}
  	while (fourthdiv.hasChildNodes()) {
    	fourthdiv.removeChild(fourthdiv.firstChild);
  	}
  	

  	if(fifthdiv.hasChildNodes()){
		hr5.remove();
	}
  	while (fifthdiv.hasChildNodes()) {
    	fifthdiv.removeChild(fifthdiv.firstChild);
  	}
  	counthrID = 1;
}


function filterResults(){

	resultsIndex = [];
	filterAll();
	getIndexAfterFilter();

	removeChildModal();
	console.log(resultsIndex);
	showResultModal();
	
}
