


/*access the hidden card number and promise message previously saved in local storage and assign */
const hiddenCard = localStorage.getItem("hidCard")
const promMessage=  localStorage.getItem("message")
window.onload = () =>{
  



/*replace the empty div with the hidden card number and the other with the promise result */
    document.getElementById("cardConf").innerHTML="Your credit card number ends in " + hiddenCard
    document.getElementById("messageConf").innerHTML= promMessage+"}"
}