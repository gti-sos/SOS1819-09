// Disabled a button if all the field are empty
function bouton(){
        if(!document.getElementById("country").value == "" && !document.getElementById("year").value == "" && !document.getElementById("methane").value == "" && !document.getElementById("co2").value == "" && !document.getElementById("no").value == ""){
            document.getElementById("post").disabled = false;
        }else{
            document.getElementById("post").disabled = true;
        }
    }