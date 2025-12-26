
            // Send
function send(){
    let name = document.getElementById('name').value.length;
    let email = document.getElementById('email').value.length;

    if(name >= 4 && email >= 4){
        alert("SuccessFully Message Send");
    }
    else{
        alert('Please Enter Valid Inputs');
    }
}
