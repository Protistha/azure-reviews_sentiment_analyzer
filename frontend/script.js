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
document.getElementById(
"loading"
).style.display="block";

let response=
await fetch(
"http://127.0.0.1:5000/analyze",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

key:key,

endpoint:endpoint,

review:review

})

});

let data=
await response.json();

document.getElementById(
"loading"
).style.display="none";

document.getElementById(
"result"
).style.display="block";

document.getElementById(
"sentiment"
).innerText=data.sentiment;

document.getElementById(
"phrases"
).innerText=data.phrases.join(", ");

document.getElementById(
"pos"
).style.width=data.positive+"%";

document.getElementById(
"neu"
).style.width=data.neutral+"%";

document.getElementById(
"neg"
).style.width=data.negative+"%";

if(data.sentiment=="positive")
emoji="😊";

else if(data.sentiment=="negative")
emoji="😡";

else
emoji="😐";

document.getElementById(
"emoji"
).innerText=emoji;

addHistory(review,data.sentiment);

}

function clearText(){

document.getElementById(
"review"
).value="";

}

function addHistory(review,sentiment){

let table=
document.getElementById("history");

let row=
table.insertRow(-1);

row.insertCell(0).innerText=
review;

row.insertCell(1).innerText=
sentiment;

}