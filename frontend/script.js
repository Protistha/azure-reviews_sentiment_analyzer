async function analyze(){

let key=
document.getElementById("key").value;

let endpoint=
document.getElementById("endpoint").value;

let review=
document.getElementById("review").value;

if(key=="" || endpoint=="" || review==""){

alert("Enter all fields");

return;

}