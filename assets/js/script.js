//overlay
function onOverlay() {
  document.getElementById("overlay").style.display = "block";
}

function offOverlay() {
  document.getElementById("overlay").style.display = "none";
}


var myObj;

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


  mobileOnload();
  


}

function mobileOnload(){
  var windowWidth = window.innerWidth;
  
  var screenWidth = screen.width;
  //console.log(screenWidth);

  if(screenWidth<=425){
  document.getElementById("myRange");
  let widthChatWidth = screenWidth/3-2;
  let widthChat = widthChatWidth + "px";
  //console.log(tamanho);

  var footerChatMobile = document.getElementsByClassName("footer-chat-mobile");
  footerChatMobile[0].style.width = widthChat;
  footerChatMobile[1].style.width = widthChat;
  footerChatMobile[2].style.width = widthChat;


  let widthOverlayiconWidth = screenWidth-35;
  let widthOverlay = widthOverlayiconWidth + "px";
  var overlayIcon = document.getElementsByClassName("overlay-icon");
  overlayIcon[0].setAttribute("style", "margin-left: "+widthOverlay);

  var overlayContent = document.getElementsByClassName("modal-content");
  overlayContent[0].setAttribute("style", "width: "+ screenWidth+"px");

  let ModalResultado = screenWidth - 180;
  var overlayModalResultado = document.getElementsByClassName("modal-resultado");
  overlayModalResultado[0].setAttribute("style","margin-right: "+ ModalResultado+"px");

  let hrModal = screenWidth - 35;
  var overlayhrModal = document.getElementsByClassName("hr-modal-first");
  overlayhrModal[0].setAttribute("style","width: "+ hrModal+"px");


  var overlayhrModal = document.getElementsByClassName("hr-modal");
  overlayhrModal[0].setAttribute("style","width: "+ hrModal+"px");
  overlayhrModal[1].setAttribute("style","width: "+ hrModal+"px");
  overlayhrModal[2].setAttribute("style","width: "+ hrModal+"px");
  overlayhrModal[3].setAttribute("style","width: "+ hrModal+"px");
  overlayhrModal[4].setAttribute("style","width: "+ hrModal+"px");
}
};



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

	let span = document.createElement("span");
	span.classList.add("checkmark-checkbox");
	span.setAttribute("id", idinput);

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
	/*
	if(myObj[index]["university"]["name"] == "Anhembi Morumbi" ||
	 myObj[index]["university"]["name"] == "UNICSUL" ||
	 myObj[index]["university"]["name"] == "UNIP" ){
		img.setAttribute("style","margin-top: 10px;");
	}*/

	img.setAttribute("src",myObj[index]["university"]["logo_url"]);


	div.appendChild(img);

	let element = document.getElementById(id);
	element.appendChild(div);
}
/*
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
*/
function addTextAndBolsa(id,index){
	let div0 = document.createElement("div");
	div0.setAttribute("class","modal-title-result-mobile");

	let div1 = document.createElement("div");
	div1.setAttribute("class","modal-title-result-div");

	let div2 = document.createElement("div");
	div2.setAttribute("class","modal-title-result");
	div2.innerHTML = myObj[index]["course"]["name"];
	
	
	div1.appendChild(div2);


	let div3 = document.createElement("div");
	div3.setAttribute("class","modal-text-result");
	div3.innerHTML = myObj[index]["course"]["level"];

	div1.appendChild(div3);

	let element = document.getElementById(id);
	div0.appendChild(div1);


	div1 = document.createElement("div");
	div1.setAttribute("class","modal-bolsa");
	
	
	div2 = document.createElement("div");
	div2.setAttribute("class","modal-text-bolsa");
	div2.innerHTML = "Bolsa de ";


	strong = document.createElement("strong");
	strong.setAttribute("class","modal-bold-bolsa");
	strong.innerHTML = Math.round(myObj[index]["discount_percentage"])+"%";

	div2.appendChild(strong);
	div1.appendChild(div2);


	div3 = document.createElement("div");
	let strong1 = document.createElement("strong");
	strong1.setAttribute("class","modal-bold-bolsa");
	strong1.innerHTML = "R$ "+Math.round(myObj[index]["price_with_discount"])+"/mês";

	div3.appendChild(strong1);
	div1.appendChild(div3);
	

	div0.appendChild(div1);
	element.appendChild(div0);
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
	//addText(id,index);
	//addTextBolsa(id,index);

	addTextAndBolsa(id,index);
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
	//console.log(resultsIndex);
	showResultModal();

	addcheckboxSelect();
	
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
	checkboxSelect = [0,0,0,0,0];
	filterAll();
	getIndexAfterFilter();

	removeChildModal();
	
	
	//console.log(resultsIndex);
	showResultModal();

	enableSubmit();
	addcheckboxSelect();

}



//submit
var checkboxSelect = [0,0,0,0,0];
var reducer = (accumulator, currentValue) => accumulator + currentValue;
function removeDisable(){
	let checkbox1 = document.getElementById("checkbox1");
	checkbox1.parentNode.childNodes[0].removeAttribute("disabled");
	let checkbox2 = document.getElementById("checkbox2");
	checkbox2.parentNode.childNodes[0].removeAttribute("disabled");
	let checkbox3 = document.getElementById("checkbox3");
	checkbox3.parentNode.childNodes[0].removeAttribute("disabled");
	let checkbox4 = document.getElementById("checkbox4");
	checkbox4.parentNode.childNodes[0].removeAttribute("disabled");
	let checkbox5 = document.getElementById("checkbox5");
	checkbox5.parentNode.childNodes[0].removeAttribute("disabled");
}
function checkboxChange1(){

	if(checkboxSelect.reduce(reducer) <= 3){
		removeDisable();
	}
	
	if (checkboxSelect[0] == 0) {
		checkboxSelect[0] = 1;

		if(checkboxSelect.reduce(reducer) > 3){
			alert("Pode selecionar apenas 3 bolsas");
			let checkbox = document.getElementById("checkbox1");
			checkbox.parentNode.childNodes[0].setAttribute("disabled","disabled");
			checkboxSelect[0] = 0;
		}
	}else{
		checkboxSelect[0] = 0;
	}
	enableSubmit();
}
function checkboxChange2(){

	if(checkboxSelect.reduce(reducer) <= 3){
		removeDisable();
	}

	if (checkboxSelect[1] == 0) {
		checkboxSelect[1] = 1;
		if(checkboxSelect.reduce(reducer) > 3){
			alert("Pode selecionar apenas 3 bolsas");
			let checkbox = document.getElementById("checkbox2");
			checkbox.parentNode.childNodes[0].setAttribute("disabled","disabled");
			checkboxSelect[1] = 0;
		}
		
	}else{
		checkboxSelect[1] = 0;
	}
	enableSubmit();
}
function checkboxChange3(){
	if(checkboxSelect.reduce(reducer) <= 3){
		removeDisable();
	}
	if (checkboxSelect[2] == 0) {
		checkboxSelect[2] = 1;
		if(checkboxSelect.reduce(reducer) > 3){
			alert("Pode selecionar apenas 3 bolsas");
			let checkbox = document.getElementById("checkbox3");
			checkbox.parentNode.childNodes[0].setAttribute("disabled","disabled");
			checkboxSelect[2] = 0;
		}
	}else{
		checkboxSelect[2] = 0;
	}
	enableSubmit();
}
function checkboxChange4(){
	if(checkboxSelect.reduce(reducer) <= 3){
		removeDisable();
	}
	if (checkboxSelect[3] == 0) {
		checkboxSelect[3] = 1;
		if(checkboxSelect.reduce(reducer) > 3){
			alert("Pode selecionar apenas 3 bolsas");
			let checkbox = document.getElementById("checkbox4");
			checkbox.parentNode.childNodes[0].setAttribute("disabled","disabled");
			checkboxSelect[3] = 0;
		}
	}else{
		checkboxSelect[3] = 0;
	}
	enableSubmit();	
}
function checkboxChange5(){
	if(checkboxSelect.reduce(reducer) <= 3){
		removeDisable();
	}
	if (checkboxSelect[4] == 0) {
		checkboxSelect[4] = 1;
		if(checkboxSelect.reduce(reducer) > 3){
			alert("Pode selecionar apenas 3 bolsas");
			let checkbox = document.getElementById("checkbox5");
			checkbox.parentNode.childNodes[0].setAttribute("disabled","disabled");
			checkboxSelect[4] = 0;
		}
		
	}else{
		checkboxSelect[4] = 0;
	}
	enableSubmit();
}


function addcheckboxSelect(){
	if(resultsIndex[0]){
		let checkbox1 = document.getElementById("checkbox1");
		checkbox1.setAttribute("Onclick", "checkboxChange1();");
	}
	if(resultsIndex[1]){
		let checkbox2 = document.getElementById("checkbox2");
		checkbox2.setAttribute("Onclick", "checkboxChange2();");
	}
	if(resultsIndex[2]){
		let checkbox3 = document.getElementById("checkbox3");
		checkbox3.setAttribute("Onclick", "checkboxChange3();");
	}
	if(resultsIndex[3]){
		let checkbox4 = document.getElementById("checkbox4");
		checkbox4.setAttribute("Onclick", "checkboxChange4();");
	}
	if(resultsIndex[4]){
		let checkbox5 = document.getElementById("checkbox5");
		checkbox5.setAttribute("Onclick", "checkboxChange5();");
	}	
}

function enableSubmit(){

	let x = 0;
	
	checkboxSelectReturn = checkboxSelect;

	for (let i = 0; i < checkboxSelect.length; i++) {
		if (checkboxSelect[i] == 1) {
			let enablebutton = document.getElementById("adicionarBolsa");
			enablebutton.removeAttribute("disabled");
			
			x++;
		}
	}
	if(x == 0){
		let enablebutton = document.getElementById("adicionarBolsa");
		enablebutton.setAttribute("disabled","disabled");
	}

	//console.log(checkboxSelect.reduce(reducer));
	//console.log(checkboxSelect);
	//console.log(resultsIndex);
}


// Show Home
//var resultsIndex = [];
//var checkboxSelect = [0,0,0,0,0];
var resultsHome = [];

function getIndexresultsHome(){
	let xbreak = 0;
	for (let i = 0; i < checkboxSelect.length; i++) {
		if(checkboxSelect[i] == 1){
			resultsHome.push(resultsIndex[i]);
			xbreak++;
		}
		if(xbreak == 3){
			break;
		}
	}
}
function disablebolsaSubmit(){
	if(resultsHome[0]){
		let div = document.getElementById("bolsaSubmit-fist");
		div.setAttribute("style","display: block;");
	}
	//console.log(resultsHome);
	///*
	if(resultsHome[1]){
		let div = document.getElementById("bolsaSubmit-second");
		div.setAttribute("style","display: block;");
	}
	if(resultsHome[2]){
		let div = document.getElementById("bolsaSubmit-third");
		div.setAttribute("style","display: block;");
	}//*/
}


function addImageHome(id,index){
	let div = document.createElement("div");
	div.setAttribute("class","img-submit");

	let img = document.createElement("img");
	img.setAttribute("class","img-submit-icon");
	let nameUniversity = myObj[index]["university"]["name"];


	if(myObj[index]["university"]["name"] == "Anhembi Morumbi" ||
	 myObj[index]["university"]["name"] == "UNICSUL" ||
	 myObj[index]["university"]["name"] == "UNIP" ){
		img.setAttribute("style","padding-top: 15px;");
	}

	img.setAttribute("src", myObj[index]["university"]["logo_url"]);


	div.appendChild(img);

	let element = document.getElementById(id);
	element.appendChild(div);
}
function addUniversityHome(id,index){
	let div = document.createElement("div");
	div.setAttribute("class","submit-text-university");

	let nameUniversity = myObj[index]["university"]["name"];
	div.innerHTML = nameUniversity.toUpperCase();
	

	let element = document.getElementById(id);
	element.appendChild(div);
}
function addCourseHome(id,index){
	let div = document.createElement("div");
	div.setAttribute("class","submit-text-course");

	let nameCourse = myObj[index]["course"]["name"];
	div.innerHTML = nameCourse;
	

	let element = document.getElementById(id);
	element.appendChild(div);
}
function addScoreHome(id,index){
	let div = document.createElement("div");
	div.setAttribute("class","submit-score");


	let div1 = document.createElement("div");
	div1.setAttribute("class","submit-text-score");

	let nameScore = myObj[index]["university"]["score"];
	div1.innerHTML = nameScore;

	div.appendChild(div1);


	let div2 = document.createElement("div");
	div2.setAttribute("class","submit-img-star");

	let star = myObj[index]["university"]["score"];
	for (let i = 0; i < 5; i++){
		if (star > 1) {
			let img = document.createElement("img");
			img.setAttribute("src","assets/img/star3.png");
			div2.appendChild(img);
			star--;
		}else if (star > 0.3) {
			let img = document.createElement("img");
			img.setAttribute("src","assets/img/star2.png");
			div2.appendChild(img);
			star--;
		}else{
			let img = document.createElement("img");
			img.setAttribute("src","assets/img/star1.png");
			div2.appendChild(img);
			star--;
		}

	}

	div.appendChild(div2);

	

	let element = document.getElementById(id);
	element.appendChild(div);

	let hr = document.createElement("hr");
	hr.setAttribute("class","submit-hr");

	element.appendChild(hr);
}
function addKindHome(id,index){
	let div = document.createElement("div");
	div.setAttribute("class","submit-text-kind");

	let namekind = myObj[index]["course"]["kind"];
	if (namekind == "EaD") {
		namekind = "ENSINO A DISTÂNCIA";
	}
	let nameshift = myObj[index]["course"]["shift"];
	div.innerHTML = namekind.toUpperCase()+" • " +nameshift.toUpperCase();
	

	let element = document.getElementById(id);
	element.appendChild(div);
}
function addstartDateHome(id,index){
	let div = document.createElement("div");
	div.setAttribute("class","submit-text-startDate");

	let startDate = myObj[index]["start_date"];
	div.innerHTML = "Início das aulas em: "+startDate;
	

	let element = document.getElementById(id);
	element.appendChild(div);

	let hr = document.createElement("hr");
	hr.setAttribute("class","submit-hr");

	element.appendChild(hr);
}
function addfullPriceHome(id,index){

	let div1 = document.createElement("div");
	div1.setAttribute("class","submit-text-kind");
	div1.innerHTML = "Mensalidade com o Quero Bolsa:";
	let element = document.getElementById(id);
	element.appendChild(div1);

	let div = document.createElement("div");
	div.setAttribute("class","submit-text-fullPrice");


	let fullPrice = myObj[index]["full_price"];
	fullPrice = fullPrice.toString().replace(".", ",");
	
	div.innerHTML = "R$ "+ formatNumber(fullPrice);
	

	
	element.appendChild(div);
}
function addtextHomeEnabled(id,index){

	let div1 = document.createElement("div");
	div1.setAttribute("class","submit-text-kind");
	div1.innerHTML = "Bolsa indisponível.";

	let element = document.getElementById(id);

	element.appendChild(div1);


	let div2 = document.createElement("div");
	div2.setAttribute("class","submit-text-Enabled");

	div2.innerHTML = "Entre em contato com nosso atendimento para saber mais.";
	
	element.appendChild(div2);	
}

function addDiscountPriceHome(id,index){
	let div = document.createElement("div");
	div.setAttribute("class","submit-text-discount");


	let div1 = document.createElement("div");
	div1.setAttribute("class","submit-text-discountPrice");

	let fullPrice = myObj[index]["price_with_discount"];
	fullPrice = fullPrice.toString().replace(".", ",");
	
	div1.innerHTML = "R$ "+ formatNumber(fullPrice);
	div.appendChild(div1);

	let div2 = document.createElement("div");
	div2.setAttribute("class","submit-text-discountPricemes");
	div2.innerHTML = "/mês";
	div.appendChild(div2);

	let element = document.getElementById(id);
	element.appendChild(div);
}
var idButtonExcluir = 1;
function addSubmitButton(id,index){
	let div = document.createElement("div");
	div.setAttribute("class","submit-button");

	let button1 = document.createElement("button");
	button1.setAttribute("class","submit-excluir");
	button1.setAttribute("id","ButtonExcluir");
	button1.setAttribute("value",idButtonExcluir);
	button1.setAttribute("Onclick","removeFromHomeButton"+idButtonExcluir+"();");
	button1.innerHTML = "Excluir";
	div.appendChild(button1);

	let button2 = document.createElement("button");
	button2.setAttribute("class","submit-Veroferta");
	button2.innerHTML = "Ver oferta";
	div.appendChild(button2);

	let element = document.getElementById(id);
	element.appendChild(div);
	idButtonExcluir++;
}

function addSubmitButtonEnabled(id,index){
	let div = document.createElement("div");
	div.setAttribute("class","submit-button");

	let button1 = document.createElement("button");
	button1.setAttribute("class","submit-excluir");
	button1.setAttribute("id","ButtonExcluir");
	button1.setAttribute("value",idButtonExcluir);
	button1.setAttribute("Onclick","removeFromHomeButton"+idButtonExcluir+"();");
	button1.innerHTML = "Excluir";
	div.appendChild(button1);

	let button2 = document.createElement("button");
	button2.setAttribute("class","submit-Veroferta");
	button2.setAttribute("disabled","disabled");;
	button2.innerHTML = "Indisponível";
	div.appendChild(button2);

	let element = document.getElementById(id);
	element.appendChild(div);
	idButtonExcluir++;
}

function addHome(id,index){
	disablebolsaSubmit();
	addImageHome(id,index);
	addUniversityHome(id,index);
	addCourseHome(id,index);
	addScoreHome(id,index);
	addKindHome(id,index);
	addstartDateHome(id,index);

	//console.log(myObj[index]["enabled"]);
	if(myObj[index]["enabled"] == true){
	addfullPriceHome(id,index);
	addDiscountPriceHome(id,index);
	addSubmitButton(id,index);
	}

	if(myObj[index]["enabled"] == false){
	addtextHomeEnabled(id,index);
	addSubmitButtonEnabled(id,index);
	}
	//console.log(index);
	//console.log(myObj[index]["enrollment_semester"]);
	//console.log(myObj[index]["course"]["name"]);
}

function addHomeAll(){
	if(resultsHome[0]){
	addHome("bolsaSubmit-fist",resultsHome[0]);
	}
	if(resultsHome[1]){
	addHome("bolsaSubmit-second",resultsHome[1]);
	}
	if(resultsHome[2]){
	addHome("bolsaSubmit-third",resultsHome[2]);
	}
	
}
function removeFromHome(){

	let firstdiv = document.getElementById("bolsaSubmit-fist");
	let seconddiv = document.getElementById("bolsaSubmit-second");
	let thirddiv = document.getElementById("bolsaSubmit-third");

  	while (firstdiv.hasChildNodes()) {
    	firstdiv.removeChild(firstdiv.firstChild);
  	}
  	

  	while (seconddiv.hasChildNodes()) {
    	seconddiv.removeChild(seconddiv.firstChild);
  	}

  	while (thirddiv.hasChildNodes()) {
    	thirddiv.removeChild(thirddiv.firstChild);
  	}
  	firstdiv.setAttribute("style","display: none;");
  	seconddiv.setAttribute("style","display: none;");
	thirddiv.setAttribute("style","display: none;");
	idButtonExcluir = 1;
}
function removeFromHomeButton1(){
	

	let div = document.getElementById("bolsaSubmit-fist");
	while (div.hasChildNodes()) {
		div.removeChild(div.firstChild);
  	}
  	div.setAttribute("style","display: none;");
}
function removeFromHomeButton2(){
	let div = document.getElementById("bolsaSubmit-second");
	while (div.hasChildNodes()) {
		div.removeChild(div.firstChild);
	}
	div.setAttribute("style","display: none;");
}
function removeFromHomeButton3(){

		let div = document.getElementById("bolsaSubmit-third");
			while (div.hasChildNodes()) {
		    	div.removeChild(div.firstChild);
		  	}
		div.setAttribute("style","display: none;");
}

function addresultsHome(){

	//console.log(resultsHome);
	resultsHome = [];
	offOverlay();
	getIndexresultsHome();
	
	removeFromHome();
	
	
	addHomeAll();

	filterResults();
	
	//console.log(resultsHome);
}




function filterSemesterall(){
	let semestresAll = document.getElementById("semestresAll");
	let semestres1 = document.getElementById("semestres1");
	let semestres2 = document.getElementById("semestres2");

	semestresAll.setAttribute("class","semestres-text active-semestres-first");
	semestres1.setAttribute("class","semestres-text semestres-middle");
	semestres2.setAttribute("class","semestres-text semestres-last");
	
	//index começa a contar no 1 
	for (let i = 1; i < resultsHome.length+1; i++){
		let semester = (myObj[i]["enrollment_semester"]).toString().substr(-1);
		//console.log(semester);

		if(semester == 1 || semester == 2){
			let div1 = document.getElementById("bolsaSubmit-fist");
			let div2 = document.getElementById("bolsaSubmit-second");
			let div3 = document.getElementById("bolsaSubmit-third");
			//console.log(div1.hasChildNodes());
			if(div1.hasChildNodes() && i == 1){
				div1.setAttribute("style","display: block;");
			}
			if(div2.hasChildNodes() && i == 2){
				
				div2.setAttribute("style","display: block;");
			}
			if(div3.hasChildNodes() && i == 3){
				
				div3.setAttribute("style","display: block;");
			}
		}

	}
}

function filterSemester1(){

	filterSemesterall();

	let semestresAll = document.getElementById("semestresAll");
	let semestres1 = document.getElementById("semestres1");
	let semestres2 = document.getElementById("semestres2");

	semestresAll.setAttribute("class","semestres-text semestres-first");
	semestres1.setAttribute("class","semestres-text active-semestres-middle");
	semestres2.setAttribute("class","semestres-text semestres-last");

	//index começa a contar no 1 
	for (let i = 1; i < resultsHome.length+1; i++){
		let semester = (myObj[i]["enrollment_semester"]).toString().substr(-1);
		//console.log(semester);

		if(semester == 1){
			let div1 = document.getElementById("bolsaSubmit-fist");
			let div2 = document.getElementById("bolsaSubmit-second");
			let div3 = document.getElementById("bolsaSubmit-third");
			if(div1.hasChildNodes() && i == 1){
				div1.setAttribute("style","display: none;");
			}
			if(div2.hasChildNodes() && i == 2){
				
				div2.setAttribute("style","display: none;");
			}
			if(div3.hasChildNodes() && i == 3){
				
				div3.setAttribute("style","display: none;");
			}
		}

	}


	//console.log(resultsHome);
}

function filterSemester2(){

	filterSemesterall();

	let semestresAll = document.getElementById("semestresAll");
	let semestres1 = document.getElementById("semestres1");
	let semestres2 = document.getElementById("semestres2");

	semestresAll.setAttribute("class","semestres-text semestres-first");
	semestres1.setAttribute("class","semestres-text semestres-middle");
	semestres2.setAttribute("class","semestres-text active-semestres-last");

	//index começa a contar no 1 
	for (let i = 1; i < resultsHome.length+1; i++){
		let semester = (myObj[i]["enrollment_semester"]).toString().substr(-1);
		//console.log(semester);

		if(semester == 2){
			let div1 = document.getElementById("bolsaSubmit-fist");
			let div2 = document.getElementById("bolsaSubmit-second");
			let div3 = document.getElementById("bolsaSubmit-third");
			if(div1.hasChildNodes() && i == 1){
				div1.setAttribute("style","display: none;");
			}
			if(div2.hasChildNodes() && i == 2){
				
				div2.setAttribute("style","display: none;");
			}
			if(div3.hasChildNodes() && i == 3){
				
				div3.setAttribute("style","display: none;");
			}
		}

	}
}