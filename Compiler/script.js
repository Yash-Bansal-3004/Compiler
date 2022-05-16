var compileBtn = document.getElementById("compileButton");
var console = document.getElementById("output");

compileBtn.onclick = function(event){
  compile();
}

function compile(){

  var code = document.getElementById("textArea").value;
  var langid = document.getElementById("langId").value;

  var request = new XMLHttpRequest();
  request.open("POST", "https://codequotient.com/api/executeCode");
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify({ "code" : code , langId : langid}));
  //console.innerHTML = JSON.stringify({ "code" : code , langId : langid});

  request.addEventListener("load", function(event){
    var response = JSON.parse(event.target.responseText);
    //console.innerHTML = response.error;

    if(response.error){
        console.innerHTML = "Please Type The Code";
        return;
    }
    setTimeout(function(){
        display(response.codeId);
    }, 5000);

  });
}

function display(codeId){

  var request = new XMLHttpRequest();
  request.open("GET", `https://codequotient.com/api/codeResult/${codeId}`);
  request.send();

  request.addEventListener("load", function(event){
    //console.innerHTML = "Hii hello";

    var response = JSON.parse(event.target.responseText);
        //console.innerHTML = response.data;
    var error = JSON.parse(response.data).errors;
    var output = JSON.parse(response.data).output;

    if(error){
        console.innerHTML = error;
    }
    else{
        console.innerHTML = output;
    }
    return;
  });
};