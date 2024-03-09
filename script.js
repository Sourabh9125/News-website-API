const API_KEY = "1d3a0eefa97b499d8fbc4ee93eeb40b7";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});




































































// const name="sourav";

// let a = null;
// // a=30;
// a=Number(a);
// let b = 60;
// console.log("name is",a);
// // console.log("a+b is ",a+b );
// console.log("the type of a is ",typeof(a))
// const a=50;
// const b=80;
// if(a>b){
//  console.log("a is greater",a);
// }
// else{
//     console.log("b is greater",b);
// }
// const grade = "a";
// switch (grade) {
//     case 'A':
//         console.log("A -> nice");
//         break;
//     case 'B':
//         console.log("A -> average");
//         break;
//     case 'C':
//         console.log("C -> not nice");
//         break;

//     default:
//         console.log("Invalid Grade");

// }

// for(let n=0;n<5;n++){
//     console.log("Hello");
// }
// let step=0;
// while(step<5){
//     step++;
//     if(step==2){
//         continue;
//      }
//     console.log("step",step);
   
    
// }
// const array=["Hello","There","whatsup"];
// console.log();

// const a=50;
// const b=90;
// sum(a, b);

// const c=5;
// const d=90;
// sum(c, d);

// const e=8;
// const f=10;
// sum(e, f);

// const sum = function (a,b){
//     const sum = a + b;
//    return sum;
// }
// const a=40;
// const b=50;

// const result = sum(a,b);
// console.log("Result is", result);

// const variable =(num)=>{
// return num*num;
// }

//      console.log(variable(9));   

// const ticket = new Promise(function(resolve,reject){
//        const isboard=false;
//        if(isboard){
//           resolve("You are not in the flight");

//        }
//        else{
//           reject("Your flight is cancalled");
//        }

// })

// ticket.then((data)=>{
//      console.log("Sorry",data);
// }).catch((data)=>{
//      console.log("whattt..",data);
// })

// function getcheese() {
//      return new Promise((reslove,reject) =>{
//           setTimeout(() => {
//                const cheese="🧀";
              
//                reslove(cheese);
               
//           }, 2000);
//      });
     
// }
// function makeDough(cheese) {
//      return new Promise((reslove,reject)=>{
//           setTimeout(() => {
//                const dough = cheese +"🥚";
             
//                reslove(dough);
               
//           }, 2000);
//      })
     
// }

// function makePizza(dough) {
//      return new Promise((reslove,reject)=>{
//           setTimeout(() => {
//                const pizza= dough +"🍕";
              
//                reslove(pizza);
//           }, 2000);
//      }) 
     
// }
// getcheese().then((cheese)=>{
//      console.log("here is cheese",cheese);
//     return makeDough(cheese);
// }).then((dough)=>{
//      console.log("Here is dough",dough);
//      return makePizza(dough);
// }).then((pizza)=>{
//      console.log("Your pizza is ready",pizza);
// })
