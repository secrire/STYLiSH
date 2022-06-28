let nextPage;  //必先設一個全域初始變數
let productCategories;

// --- ajax 取後端api ---

function getData (url, callback) {   //讓四個類別都可取到api->function
let xhr = new XMLHttpRequest();      //先寫ajax
xhr.open('GET', url);
xhr.send();

xhr.onreadystatechange = function() {
    if(xhr.readyState === 4){
      isLoading=false;    //要變回false 才會成立條件 觸發下一頁
      if(xhr.status === 200){  //雙重條件 以免readyState還在123-4就consolelog(error)
        callback(xhr.response);
      }else{
        console.log(`Error: ${xhr.status} Error Message: ${xhr.statusText}`);
      }
    }
};
xhr.responseType = 'json';  //讓取到的資料response變成json型
};

// --- create HTML ---

function showData (res){       //讓ajax取到res時會發生的事

nextPage = res.next_paging;    // 不能有let 才會和全域變數nextPage有關

let products = document.querySelector('.products');
 products.innerHTML = "";       //讓productsHTML內容清空再改變

    for(let i=0 ; i< res.data.length ; i+=1){

let productDiv = document.createElement('div');
productDiv.className = "product-div";

let productImg = document.createElement('img');
productImg.className = "product-img";
productImg.src = res.data[i].main_image;

productImg.addEventListener('click', () => {
  window.location=`${window.location.origin}/product.html?id=${res.data[i].id}`;
  })

let productColors = document.createElement('div');
productColors.className = "product-colors";
res.data[i].colors.forEach((color) => {
    let productColor = document.createElement('span');
    productColor.className = "product-color";
    productColor.style.backgroundColor = `#${color.code}`;
    productColors.appendChild(productColor);
});

let productTitle = document.createElement('div');
productTitle.className = "product-title";
productTitle.textContent = `${res.data[i].title}`;

let productPrice = document.createElement('div');
productPrice.className = "product-price";
productPrice.textContent = `TWD.${res.data[i].price}`;

productDiv.appendChild(productImg);
productDiv.appendChild(productColors);
productDiv.appendChild(productTitle);
productDiv.appendChild(productPrice);

products.appendChild(productDiv);
    } 
};



// --- for next page html不清空 接續下一頁內容 ---
function showDataNextPage (res){       //讓ajax取到res時會發生的事
  nextPage = res.next_paging; 
  
let products = document.querySelector('.products');
// products.innerHTML = "";       //讓productsHTML內容清空再改變

    for(let i=0 ; i< res.data.length ; i+=1){

let productDiv = document.createElement('div');
productDiv.className = "product-div";

let productImg = document.createElement('img');
productImg.className = "product-img";
productImg.src = res.data[i].main_image;

productImg.addEventListener('click', () => {     //直接在create的element上附加click功能，再appendchild到頁面上
  window.location=`${window.location.origin}//product.html?id=${res.data[i].id}`;
  })

let productColors = document.createElement('div');
productColors.className = "product-colors";
res.data[i].colors.forEach((color) => {
    let productColor = document.createElement('span');
    productColor.className = "product-color";
    productColor.style.backgroundColor = `#${color.code}`;
    productColors.appendChild(productColor);
});
let productTitle = document.createElement('div');
productTitle.className = "product-title";
productTitle.textContent = `${res.data[i].title}`;

let productPrice = document.createElement('div');
productPrice.className = "product-price";
productPrice.textContent = `TWD.${res.data[i].price}`;

productDiv.appendChild(productImg);
productDiv.appendChild(productColors);
productDiv.appendChild(productTitle);
productDiv.appendChild(productPrice);

products.appendChild(productDiv);
    } 
};



// --- web product categories ---

let currentUrl = location.href;
let currentUrlNew = new URL(currentUrl);
let currentUrlTag = currentUrlNew.searchParams.get('tag');
let currentUrlSearchText = currentUrlNew.searchParams.get('searchText');

if( currentUrlTag === null && currentUrlSearchText == null){    //不是undefined,可console.log確認
  productCategories = "all";
getData(`https://api.appworks-school.tw/api/1.0/products/${productCategories}`, showData);
}else if(currentUrlTag === 'women'){
  productCategories = "women";       //為了nextpage${productcategories}必須設以下變數url
  getData(`https://api.appworks-school.tw/api/1.0/products/${productCategories}`, showData);  
}else if(currentUrlTag === 'men'){
  productCategories = "men";
  getData(`https://api.appworks-school.tw/api/1.0/products/${productCategories}`, showData);  
}else if(currentUrlTag === 'accessories'){
  productCategories = "accessories";
  getData(`https://api.appworks-school.tw/api/1.0/products/${productCategories}`, showData);  
}else if(currentUrlSearchText !== undefined){
  getData(`https://api.appworks-school.tw/api/1.0/products/search?keyword=${currentUrlSearchText}`, showData); 
}

/*
productCategories = "women";
if (currentUrlTag ===`${productCategories}`){
  getData(`https://api.appworks-school.tw/api/1.0/products/${productCategories}`, showData);
}

productCategories = "men"; 
if (currentUrlTag ===`${productCategories}`){
  getData(`https://api.appworks-school.tw/api/1.0/products/${productCategories}`, showData);
}

productCategories = "accessories";  
if (currentUrlTag ===`${productCategories}`){
  getData(`https://api.appworks-school.tw/api/1.0/products/${productCategories}`, showData);
}

// search
if(currentUrlSearchText !== undefined){
getData(`https://api.appworks-school.tw/api/1.0/products/search?keyword=${currentUrlSearchText}`, showData);
}
*/
// mobile product categories
/*
document.querySelector('.women').addEventListener('click', () => {
    productCategories = "women";
    getData(`https://api.appworks-school.tw/api/1.0/products/${productCategories}`), showData;
    //window.location = `https://secrire.github.io/Front-End-Class-Batch11/students/szuhan/index.html?tag=${productCategories}`
  })
  
document.querySelector('.men').addEventListener('click', () => {
  productCategories = "men";  
  getData(`https://api.appworks-school.tw/api/1.0/products/${productCategories}`, showData)
  })
  
document.querySelector('.accessories').addEventListener('click', () => {
  productCategories = "accessories";  
  getData(`https://api.appworks-school.tw/api/1.0/products/${productCategories}`, showData)
  })
*/


// --- search ---
  // web search 
let searchInput =  document.querySelector('.search-input');
  document.querySelector('.search-icon').addEventListener('click', () => {
    window.location = `index.html?searchText=${searchInput.value}`;
  })

// mobile search 

let mobileSearchIcon = document.querySelector('.mobile-search-icon');
  mobileSearchIcon.addEventListener('click', () => {
    let mobileSearchInput = document.createElement('input');
    mobileSearchInput.className = "mobile-search-input";
    mobileSearchInput.type = "text";

    let newMobileSearchIcon = document.createElement('img');
    newMobileSearchIcon.className = "new-mobile-search-icon";
    newMobileSearchIcon.src = "images/search.png";

    newMobileSearchIcon.addEventListener('click', () => {
      window.location = `index.html?searchText=${mobileSearchInput.value}`;
     })

    let header = document.querySelector('.header'); 
    header.innerHTML = "";    
    header.appendChild(mobileSearchInput);
    header.appendChild(newMobileSearchIcon);
  
  //let mobileSearchInput =  document.querySelector('.mobile-search-input');
  })   //點新icon 要在 點舊icon 函式內 因都在點舊icon後發生？




// get paging data from Product List API and set it as parameter of request for next page
// --- Infinite Scroll --- If user almost scroll down to the bottom, to load and show next page automatically

let isLoading = false;   //加條件：在fetch過程中不能重覆觸發 全觸發
//let isEnd = false;   //没有更多數據時不能再觸發  改成nextPage


function fetchData(){ 
  
let productsBottomHeight = document.querySelector('.products').getBoundingClientRect().bottom;
let distance = productsBottomHeight - window.innerHeight;
let nearlyBottomHeight = 200; 

if (isLoading === false && nextPage !== undefined && (distance < nearlyBottomHeight)
  ){
 getData(`https://api.appworks-school.tw/api/1.0/products/${productCategories}?paging=${nextPage}`, showDataNextPage);
 isLoading = true;    //持續觸發 
  }
}

window.addEventListener('scroll',fetchData);    //事件（獲取數據的函數）都觸發在卷軸滾動時


// --- Build key visual section dynamically ---

let banner = document.querySelector('.banner');

function changeBanner (res){ 
  //banner.innerHTML = "";       //讓HTML內容清空再改變
  for(let i=0 ; i< res.data.length ; i+=1){
    let bannerDiv = document.createElement('div');
    bannerDiv.className = "banner-div";
    bannerDiv.id = `bannerDiv${i}`;
    bannerDiv.style.opacity = 0;
   
    let bannerText = document.createElement('div');
    bannerText.className = "banner-text";

    let story = res.data[i].story.split("\r\n");
    for (let k=0 ; k< story.length ; k+=1){
      if( k < story.length -1){
      let bannerTextGroup1 = document.createElement ("div");
      bannerTextGroup1.className = "banner-text-group1";
      bannerTextGroup1.textContent = story[k];
      bannerText.appendChild(bannerTextGroup1);
    } else{
      let bannerTextGroup2 = document.createElement ("div");
      bannerTextGroup2.className = "banner-text-group2";
      bannerTextGroup2.textContent = story[k];
      bannerText.appendChild(bannerTextGroup2);
    }
  }

    let bannerPhoto = document.createElement('img');
    bannerPhoto.className = `banner-photo`;
    // bannerPhoto.src = `https://api.appworks-school.tw${res.data[i].picture}`;
    bannerPhoto.src = res.data[i].picture;
    
    let bannerDots = document.createElement('div');
     bannerDots.className = "banner-dots";
    
     for(let j=0 ; j< res.data.length; j+=1){
    let bannerDot = document.createElement('div');
     bannerDot.className = "banner-dot";
     bannerDot.id = `bannerDot${j}`;
     bannerDots.appendChild(bannerDot);
     }
    
    bannerDiv.appendChild(bannerText);
    bannerDiv.appendChild(bannerPhoto);
    bannerDiv.appendChild(bannerDots);
  
    banner.appendChild(bannerDiv);
  }
 

//If user click on one of them, send user to the corresponding link.
// --- slide effect --- 

let currentBannerIndex = 0;  

function slide(){
 let bannerDivs = document.querySelectorAll(".banner-div");  //選"全部"bannerDiv使其成列

    for(var i = 0; i< bannerDivs.length; i+=1){
        let eachBannerDiv = document.getElementById(`bannerDiv${i}`);
        eachBannerDiv.style.opacity = 0;
        let eachBannerDot = document.getElementById(`bannerDot${i}`);
        eachBannerDot.style.backgroundColor = 'lightgray';
    }
   
    let currentBannerDiv = document.getElementById(`bannerDiv${currentBannerIndex}`);
    currentBannerDiv.style.opacity = 1;
    let currentBannerDot = document.getElementById(`bannerDot${currentBannerIndex}`);
    currentBannerDot.style.backgroundColor = "brown";

    if(currentBannerIndex< bannerDivs.length-1){
        currentBannerIndex += 1;
    }else{
        currentBannerIndex = 0;
      }       
    }
  
slide();
setInterval(slide, 10000);    //change to next slide every 10 seconds automatically
}

//Connect to Marketing Campaign API by AJAX for the links, stories and image paths.
getData(`https://api.appworks-school.tw/api/1.0/marketing/campaigns`, changeBanner);


/*window.setInterval("getData(`https://api.appworks-school.tw/api/1.0/marketing/campaigns`, showDataMarketing)",10000);  
getData需有“”，否則回傳值undefined,getData也在一開始呼叫當下就執行
不是十秒抓一次資料，三張圖變得很快所以只看到第三張。是抓一次資料，十秒去變不同圖片的顯示
*/

// --- Show totalqty in cart icon ---
if(JSON.parse(localStorage.getItem("totalqty")) === null){
  document.querySelector('.cart-number').textContent = '0';
  document.querySelector('.mobile-cart-number').textContent = '0';
}else{
document.querySelector('.cart-number').textContent = JSON.parse(localStorage.getItem("totalqty")); 
document.querySelector('.mobile-cart-number').textContent = JSON.parse(localStorage.getItem("totalqty")); 
}


