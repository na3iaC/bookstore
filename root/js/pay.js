document.addEventListener("DOMContentLoaded", nav)
function nav(){
  const x = document.getElementById("topNav");
  if (x.className === "navigation") {
    x.className += " responsive";
  } else {
    x.className = "navigation";
  }
}


let maskCardNo;
let promiseMessage;

window.onload = () =>{
  


document.getElementById('continue').addEventListener('click',(e)=>{
  e.preventDefault()
  /*regex check whether card number is valid
16 digits
Starting with 51, 52, 53, 54, 55
*/ 

/*get inputted card number */
  let cardNum=document.getElementById('card').value 
  const pattern=/^(5[1-5])[0-9]{14}$/
 

  
  /*get inputted expiry date from form */
  let expM =document.getElementById('expiryMonth').value
  let expY=document.getElementById('expiryYear').value
  
  /*use date function to get current month and year */
  const todayDate = new Date()
 /*month is a zero based index so +1 to get normal 12 months*/ 
  const todM = todayDate.getMonth()+1;
  const todY= todayDate.getFullYear()



  /*get inputted security code */
    const secCode = document.getElementById('CVV').value
    /*regex to check its a 3 to 4 digit number */
    const cvvPattern=/^[0-9]{3,4}$/
  
   

    /*if all details are valid post the details to the server */
    if(cardNum.match(pattern)&&(((todM<expM)&&(todY==expY))||(todY<expY))&&secCode.match(cvvPattern)){
      
    
            /*Regular expression that replaces all digits before the last 4 with an asterisk */
    
            maskCardNo = cardNum.replace(/\d(?=\d{4})/g, "*");
            /*save the hidden card number in local storage to access from the success page */
            localStorage.setItem("hidCard",maskCardNo)
            
        
      
      
          const url="https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard";
          const data = {
            /*changing the data types to the required ones */
            "master_card":parseInt(cardNum),
            "exp_year": parseInt(expY),
            "exp_month": parseInt(expM),
            "cvv_code": secCode,
          };
          
        console.log(data)
        
          fetch(url,{
            method: "post",
            headers:{
              "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        
          })
         
        
          .then((response)=>{
            
            
            if(response.status === 200){
             
           /*if status OK return promise */
              return response.json();
        
            }else if(response.status ===400){
              throw "Bad data was sent to the server";
            }else{throw "Something went wrong";
          }
          })
          
          .then((result) => {
            /*take promise result split to get just the message */
            let res=JSON.stringify(result)
            let myArray= res.split(",")
            promiseMessage=myArray[0]
            
            
           
          })
          
        
          .then(
          /*save promise result to local storage to display on success.html*/
            localStorage.setItem("message",promiseMessage.toString()),
            
            /*and redirect to success page that has success message */
            window.location.assign("../root/success.html"),
             
          
          )
          .catch((error)=>{
           /*catch error and display to user using the empty form response div */
            document.getElementById("formResponse").innerHTML=error;
          })
        
    
    
    
    
    
    }else{
      /*clear form*/
      document.getElementById("paymentForm").reset();
      /*if there is invalid input notify users using the empty form response div */
      document.getElementById("formResponse").innerHTML="Please enter valid details"
    }
     
   




 
  
})






}
