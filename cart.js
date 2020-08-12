let list;

let newTotalqty;
let newSubtotal;   
let deliveryFee;

let getList = JSON.parse(localStorage.getItem("list")); 
let subtotal;

let currentUrl = location.href;
let currentUrlNew = new URL(currentUrl);


// --- search ---
// Apply Product Search API to build search feature

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
  })   


// List items in the shopping cart
function renderCartboxes(){

    getList = JSON.parse(localStorage.getItem("list"));    //!!!!!

if(getList !== null){
let cartboxes = document.querySelector('.cartboxes');     
  
for(let i=0; i< getList.length; i++ ){
    
    let cartbox = document.createElement("div");
    cartbox.className = "cartbox";

    let cartboxImg = document.createElement("img");
       cartboxImg.className = "cartbox-img";
       cartboxImg.src = getList[i].main_image ;
    cartbox.appendChild(cartboxImg);   
    
    let cartboxDes = document.createElement("div");
    cartboxDes.className = "cartbox-des";

    let itemName = document.createElement('div');
    itemName.className = "item-name";
    itemName.textContent = getList[i].name;
    cartboxDes.appendChild(itemName);

    let itemId = document.createElement('div');
    itemId.className = "item-id";
    itemId.textContent = getList[i].id;
    cartboxDes.appendChild(itemId);

    let itemColor = document.createElement('div');
    itemColor.className = "item-color";
    itemColor.textContent = `顏色｜${getList[i].color.name}`;
    cartboxDes.appendChild(itemColor);

    let itemSize = document.createElement('div');
    itemSize.className = "item-size";
    itemSize.textContent = `尺寸｜${getList[i].size}`;
    cartboxDes.appendChild(itemSize);

    cartbox.appendChild(cartboxDes); 

    let mobileCartboxBottomTitle = document.createElement('div');
    mobileCartboxBottomTitle.className = "mobile-cartbox-bottom-title";
      
    let mN = document.createElement('div');
    mN.className = "mobile-cartboxes-p"; 
    mN.textContent = `數量`;
    mobileCartboxBottomTitle.appendChild(mN);

    let mP = document.createElement('div');
    mP.className = "mobile-cartboxes-p"; 
    mP.textContent = `單價`;
    mobileCartboxBottomTitle.appendChild(mP);

    let mT = document.createElement('div');
    mT.className = "mobile-cartboxes-p"; 
    mT.textContent = `小計`;
    mobileCartboxBottomTitle.appendChild(mT);

    cartbox.appendChild(mobileCartboxBottomTitle); 
 
    let mobileCartboxBottom= document.createElement("div");
    mobileCartboxBottom.className = "mobile-cartbox-bottom";

    let itemAmount = document.createElement('form');
    itemAmount.className = 'item-amount';

    let pickAmount = document.createElement('select');
    pickAmount.className = "pick-amount";  
    for (let c=1 ; c<=getList[i].stock ; c+=1){
        let pickAmountNum = document.createElement("option");
        pickAmountNum.className = "pick-amount-num";
        pickAmountNum.textContent = c;
        pickAmountNum.value = c;
        pickAmount.appendChild(pickAmountNum);  //先建options 
      }
    pickAmount.value = getList[i].qty;     //初到頁面顯示的選項

     // change quantity
    pickAmount.addEventListener("change", function() {
        getList[i].qty = parseInt(pickAmount.value);   //UNSURE ok
        localStorage.setItem("list", JSON.stringify(getList));

        JSON.parse(localStorage.getItem("totalqty")); 
        getList = JSON.parse(localStorage.getItem("list"));  
        newTotalqty = getList.map(item =>item.qty).reduce((sum,e) => sum + e);
        localStorage.setItem('totalqty', JSON.stringify(newTotalqty));    

        JSON.parse(localStorage.getItem("subtotal"));
        newSubtotal = getList.map(item => item.price * item.qty).reduce((sum,e) => sum + e);
        localStorage.setItem('subtotal', JSON.stringify(newSubtotal));

        document.querySelector('.cartbox-qty').textContent = JSON.parse(localStorage.getItem("totalqty"));
        document.querySelector('.cart-number').textContent = JSON.parse(localStorage.getItem("totalqty")); 
        document.querySelector('.mobile-cart-number').textContent = JSON.parse(localStorage.getItem("totalqty")); 
        
        document.querySelector('.cartboxes').innerHTML='';  //需先清空
        renderCartboxes();      //重載一次cartboxes便可換掉小計
        changePayPrice();
        removeItem ();
      });
    //let selectedAmount = pickAmount.options[pickAmount.selectedIndex].value;

    itemAmount.appendChild(pickAmount); 
    mobileCartboxBottom.appendChild(itemAmount);

    let itemPerPrice = document.createElement('div');
    itemPerPrice.className = "item-per-price";
    itemPerPrice.textContent = `NT.${getList[i].price}`;
    mobileCartboxBottom.appendChild(itemPerPrice);

    let itemTotalPrice = document.createElement('div');
    itemTotalPrice.className = "item-total-price";
    itemTotalPrice.textContent = 'NT.'+ getList[i].price*getList[i].qty;
    mobileCartboxBottom.appendChild(itemTotalPrice);

    cartbox.appendChild(mobileCartboxBottom); 

    let itemRemoveImg = document.createElement("img");
    itemRemoveImg.className = "item-remove-img";
    itemRemoveImg.id = `remove-img${i}`;
    itemRemoveImg.src = 'images/cart-remove.png';
    cartbox.appendChild(itemRemoveImg);
    
    cartboxes.appendChild(cartbox);
    
}}
};  

renderCartboxes();


//remove item 
function removeItem(){
for(let i=0; i< getList.length; i++ ){
document.getElementById(`remove-img${i}`).addEventListener('click', ()=>{
    // let removeIndex = getList.findIndex((cartbox)=> 
      //  {cartbox.itemId.textContent === getList.id &&
        // cartbox.itemColor.textContent === `顏色｜${getList.color.name}`&&
       //  cartbox.itemSize.textContent === `尺寸｜${getList.size}`})
if ( getList.length <=1 ){       
getList.splice(i,1);

localStorage.clear();
localStorage.setItem('list', JSON.stringify(getList));     

document.querySelector('.cartboxes').innerHTML='';  //需先清空

renderCartboxes();    //函式放這！！！配合新的getList on line1 of函式

document.querySelector('.cartbox-qty').textContent = '0';
document.querySelector('.cart-number').textContent = '0'; 
document.querySelector('.mobile-cart-number').textContent = '0'; 
document.querySelector('.total-price-num').textContent = '0'; 
document.querySelector('.delivery-fee-num').textContent = '0'; 
document.querySelector('.must-pay-num').textContent = '0';
return;
}

if ( getList.length >1 ){
getList.splice(i,1);
localStorage.setItem('list', JSON.stringify(getList));     

document.querySelector('.cartboxes').innerHTML='';  //需先清空

renderCartboxes();    //函式放這！！！配合新的getList on line1 of函式

JSON.parse(localStorage.getItem("totalqty")); 
getList = JSON.parse(localStorage.getItem("list"));  
newTotalqty = getList.map(item =>item.qty).reduce((sum,e) => sum + e);
localStorage.setItem('totalqty', JSON.stringify(newTotalqty));    

JSON.parse(localStorage.getItem("subtotal"));
newSubtotal = getList.map(item => item.price * item.qty).reduce((sum,e) => sum + e);
localStorage.setItem('subtotal', JSON.stringify(newSubtotal));

document.querySelector('.cartbox-qty').textContent = JSON.parse(localStorage.getItem("totalqty"));
document.querySelector('.cart-number').textContent = JSON.parse(localStorage.getItem("totalqty")); 
document.querySelector('.mobile-cart-number').textContent = JSON.parse(localStorage.getItem("totalqty")); 
document.querySelector('.total-price-num').textContent = JSON.parse(localStorage.getItem("subtotal"));  

changePayPrice();
removeItem();
return;
}
 })}}

removeItem ();

// --- Show totalqty in cart icon ---
if(JSON.parse(localStorage.getItem("totalqty")) === null){
  document.querySelector('.cart-number').textContent = '0';
  document.querySelector('.mobile-cart-number').textContent = '0';
  document.querySelector('.cartbox-qty').textContent = '0';
}else{
document.querySelector('.cart-number').textContent = JSON.parse(localStorage.getItem("totalqty")); 
document.querySelector('.mobile-cart-number').textContent = JSON.parse(localStorage.getItem("totalqty")); 
document.querySelector('.cartbox-qty').textContent = JSON.parse(localStorage.getItem("totalqty"));
}
 

//Calculate subtotal, freight, and total price based on the selection.
function changePayPrice(){
document.querySelector('.total-price-num').textContent = JSON.parse(localStorage.getItem("subtotal"));  

//if (getList === '[]'){
  //  deliveryFee ='0';
//}else{
    deliveryFee = "30";
//}

document.querySelector('.delivery-fee-num').textContent = deliveryFee; 

let mustPay = JSON.parse(localStorage.getItem("subtotal")) + parseInt(deliveryFee);
document.querySelector('.must-pay-num').textContent = mustPay; 
}

changePayPrice();

// modify quantity
/*
let xhr = new XMLHttpRequest();
xhr.open('GET', `${host}products/details?id=${getList[i].id}`);
xhr.send();

xhr.onreadystatechange = function() {
if(xhr.readyState === 4){
  isLoading=false;    //要變回false 才會成立條件 觸發下一頁
  if(xhr.status === 200){    //雙重條件 以免readyState還在123-4就consolelog(error)
    checkStock(xhr.response);
    console.log(JSON.parse(xhr.response));
  }else{
    console.log(`Error: ${xhr.status} Error Message: ${xhr.statusText}`);
  }}}

function checkStock(res){
    for ( let j = 0; j < res.data.variants.length; j++ ) {
      if ( getList[i].color === res.data.variants[j].color_code && getList[i].size === res.data.variants[j].size ) {
        checkedStock = res.data.variants[j].stock;
      }
    }
      } */



// --- tap pay---
let prime;
let checkedTime;
let accessToken = JSON.parse(localStorage.getItem("accessToken"));
let rightPhone = new RegExp('09[0-9]{8}');
let rightEmail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

TPDirect.setupSDK(12348, 'app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF', 'sandbox')


TPDirect.card.setup({     //!!!!!!!!!!
        fields:  {
        number: {
            // css selector
            element: document.getElementById('card-number'),
            placeholder: '**** **** **** ****'
        },
        expirationDate: {
            // DOM object
            element: document.getElementById('card-expiration-date'),
            placeholder: 'MM / YY'
        },
        ccv: {
            element: document.getElementById('card-ccv'),
            placeholder: 'CCV'
        }
    }  
})

document.querySelector('.confirm-pay').addEventListener('click', ()=>{ 
    TPDirect.card.getPrime( function (res) {       //when user submit form to get tappay prime
       if(res.status !==0){
           alert(`請完整填寫 訂購資料 與 信用卡內容，謝謝:)`);
       }
      prime = res.card.prime;
      if( document.querySelector('.client-name-input').value !== null &&
        //document.querySelector('.client-phone-input').value !== null &&
        document.querySelector('.client-phone-input').value.match(rightPhone)&&
        //document.querySelector('.client-email-input').value !== null &&
        document.querySelector('.client-email-input').value.search(rightEmail)!= -1 &&
        document.querySelector('.client-address-input').value !== null &&           
        document.querySelector('.client-time-input').value !== null 
       ){
        document.querySelector('.confirm-pay').style.opacity = '0.6';
        //document.querySelector('.confirm-pay').removeAttribute('disabled');     
        console.log(prime);
        
        if(document.getElementById('morning').checked){
            checkedTime = document.getElementById('morning').value
        }else if(document.getElementById('afternoon').checked){
            checkedTime = document.getElementById('afternoon').value
        } else if(document.getElementById('anytime').checked){
            checkedTime = document.getElementById('anytime').value}       

        // Send prime and order-info to Check Out API 

        getList = JSON.parse(localStorage.getItem("list")); 
        subtotal= JSON.parse(localStorage.getItem("subtotal")); 
        
        let primeData = {
            "prime": prime,
            "order": {
              "shipping": "delivery",
              "payment": "credit_card",
              "subtotal": subtotal,
              "freight": 30,
              "total": subtotal + 30,
              "recipient": {
                "name": document.querySelector('.client-name-input').value,
                "phone": document.querySelector('.client-phone-input').value,
                "email": document.querySelector('.client-email-input').value,
                "address": document.querySelector('.client-address-input').value,
                "time": checkedTime
              },
              "list": []
            }
          }

       for(let i=0 ; i<getList.length; i++){
        primeData.order.list[i] = {};    //!!!!!!!!! 
        primeData.order.list[i].id = getList[i].id;
        primeData.order.list[i].name = getList[i].name;
        primeData.order.list[i].price = getList[i].price;
        primeData.order.list[i].color = {};
        primeData.order.list[i].color.name = getList[i].color.name;
        primeData.order.list[i].color.code = getList[i].color.code;
        primeData.order.list[i].size = getList[i].size;
        primeData.order.list[i].qty = getList[i].qty;
       }
       
       // without fb login access token
       if(accessToken === null){
        let xhr2 = new XMLHttpRequest();

        xhr2.open('POST', `https://api.appworks-school.tw/api/1.0/order/checkout`);
        
        xhr2.setRequestHeader('Content-Type','application/json');
        //xhr2.setRequestHeader('Authorization',`Bearer ${accessToken}`);
        
        // 傳送 將json轉為文字 的資料
        xhr2.send(JSON.stringify(primeData));
 
        //if( JSON.parse(localStorage.getItem("accessToken") !== null)){
        //xhr.send(localStorage.getItem("accessToken"));
        //}
 
        xhr2.onreadystatechange = function() {
         if(xhr2.readyState === 4){
           isLoading=false;    //要變回false 才會成立條件 觸發下一頁
           if(xhr2.status === 200){    //雙重條件 以免readyState還在123-4就consolelog(error)
             localStorage.clear();
             let orderNum = JSON.parse(xhr2.responseText).data.number;
             console.log(orderNum);
             window.location.href=`https://ushi731.github.io/Front-End-Class-Batch11/students/szuhan/thankyou.html?order=${orderNum}`;
           }else{
             console.log(`Error: ${xhr2.status} Error Message: ${xhr2.statusText}`);
           }
         }
        }
       }else{
       // with fb login access token, through sign in ajax
       let signInData = {
        "provider":"facebook",
        "access_token": accessToken
      }

       let xhr = new XMLHttpRequest();
       xhr.open('POST', `https://api.appworks-school.tw/api/1.0/user/signin`);
       
       xhr.setRequestHeader('Content-Type','application/json');
       //xhr.setRequestHeader('Authorization',`Bearer ${accessToken}`);
       
       xhr.send(JSON.stringify(signInData));

       xhr.onreadystatechange = function() {
        if(xhr.readyState === 4){
          isLoading=false;   
          if(xhr.status === 200){   
            accessToken = JSON.parse(xhr.responseText).data.access_token;
            console.log(accessToken);

            // checkout ajax   在response後
       let xhr2 = new XMLHttpRequest();

       xhr2.open('POST', `https://api.appworks-school.tw/api/1.0/order/checkout`);
       
       xhr2.setRequestHeader('Content-Type','application/json');
       xhr2.setRequestHeader('Authorization',`Bearer ${accessToken}`);
       
       // 傳送 將json轉為文字 的資料
       xhr2.send(JSON.stringify(primeData));

       //if( JSON.parse(localStorage.getItem("accessToken") !== null)){
       //xhr.send(localStorage.getItem("accessToken"));
       //}

       xhr2.onreadystatechange = function() {
        if(xhr2.readyState === 4){
          isLoading=false;    //要變回false 才會成立條件 觸發下一頁
          if(xhr2.status === 200){    //雙重條件 以免readyState還在123-4就consolelog(error)
            localStorage.clear();
            let orderNum = JSON.parse(xhr2.responseText).data.number;
            console.log(orderNum);
            window.location.href=`https://ushi731.github.io/Front-End-Class-Batch11/students/szuhan/thankyou.html?order=${orderNum}`;
          }else{
            console.log(`Error: ${xhr2.status} Error Message: ${xhr2.statusText}`);
          }
        }
       }

          }else{
            console.log(`Error: ${xhr.status} Error Message: ${xhr.statusText}`);
          }
        }
       }
      }
       }else{
        alert(`請正確填寫 訂購資料 與 信用卡內容，謝謝:)`);
       } 
    })
})

//TPDirect.card.onUpdate(callback);

//TPDirect.card.getTappayFieldsStatus()    //可得到 TapPay Fields 卡片資訊的輸入狀態 與 TPDirect.card.onUpdate Callback 物件相同

//TPDirect.getFraudId()  //如果您有綁定卡片欲開啟偽卡偵測功能，請使用此方法取得 fraud id，並在呼叫 Pay by Token 時帶入 fraud id






