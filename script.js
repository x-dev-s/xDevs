// function Submit() {
// 	var rate = document.querySelector("#review").value;
// 	if (rate.toLowerCase().includes('bad') || rate.toLowerCase().includes('worst') || rate.toLowerCase().includes('miserable')) {
// 		var rating = "<span>&#128546; We are sorry for inconvenience!!</span>";
// 		console.log(rating)
// 		document.getElementById("comment").innerHTML = rating
// 	} 
// 	else {
// 		var rating = "<span>&#128512; We are glad to serve you!!</span>";
// 		document.getElementById("comment").innerHTML = rating
// 	}
// }

document.querySelector("#ratings button:first-child").onclick = function Satisfied(){
	document.querySelector("#ratings").innerHTML = "<span>&#128512;</span>"
}

document.querySelector("#ratings button:nth-child(2)").onclick = function pSatisfied(){
	document.querySelector("#ratings").innerHTML = "<span>&#128524;</span>"
}

document.querySelector("#ratings button:last-child").onclick = function dSatisfied(){
	document.querySelector("#ratings").innerHTML = "<span>&#128528;</span>"
}

document.querySelector("button").addEventListener("click", function (event){
	var rate = document.querySelector("#review").value;
	if (rate.toLowerCase().includes('bad') || rate.toLowerCase().includes('worst') || rate.toLowerCase().includes('miserable')) {
		var rating = "<span>&#128546; We are sorry for inconvenience!!</span>";
		console.log(rating)
		document.getElementById("comment").innerHTML = rating
	} 
	else {
		var rating = "<span>&#128512; We are glad to serve you!!</span>";
		document.getElementById("comment").innerHTML = rating
	}
})