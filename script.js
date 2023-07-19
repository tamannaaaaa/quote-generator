const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newquoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//Show Loading
function loading(){
    loader.hidden = false;
    quoteText.hidden = true;
}

//Complete Loading
function complete(){
    quoteText.hidden = false;
    loader.hidden = true;
}

// Show newquote
function newQuote(){
loading();
    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    //Check if author field is blank and replace it with 'Unknown'
    if(!quote.author){
        authorText.textContent='Unknown';
    }
    else{
        authorText.textContent=quote.author;
    }
   
    //Check the quote size to determine the styling
    if(quote.text.length>50){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent=quote.text;
complete();
}

// await can only be used inside a async function. An async function always returns a promise. 
// Get Quotes from API
async function getQuotes(){
loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }
    catch(error){
  //Catch error here
    }
}

//Tweet a Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=$(quoteText.textContent)-$(authorText.textContent)`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newquoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On load
getQuotes();