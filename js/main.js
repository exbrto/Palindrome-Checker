// A palindrome is a word or phrase that is the same backwards as it is forwards
// the logic needs to be done on the server side. The user of the site will,
// input their word or phrase, click the button which sends the that input to the
// server side where the palindrome logic will be done. The server side will then 
// send back the result if it is or isnt a palindorme


document.querySelector('button').addEventListener('click', sendPalindrome)


function sendPalindrome(){

    let userInput = document.querySelector('input').value; // Input the user enters for the palindorme

    fetch(`/api?palindrome=${userInput}`)      
    .then (res => res.text())
    .then (data => {
        console.log(data)
        document.querySelector('h2').textContent = `${userInput} ${data}`;

    })
    
}