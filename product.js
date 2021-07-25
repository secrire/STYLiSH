//product.html?id=11 is a link to product page where 11 should be a valid product id.
//JavaScript code in product.html should take id parameter. to take id parameter from page URL by JavaScript 
let currentUrl = location.href;
let currentUrlNew = new URL(currentUrl);
let currentUrlId = currentUrlNew.searchParams.get('id');

let selectedId;
let selectedColor;
let selectedColorName;
let selectedSize;
let checkedStock;
let amount = Number(document.querySelector(".product-number").textContent);

let list;
let qty;
let totalqty;

let host = 'https://api.appworks-school.tw/api/1.0/';

getProductInfo();

//then make an AJAX call to RESTful API for product details
//We have taken id from URL. connect to Product Details API for the data of product details
function getProductInfo(){     
let xhr = new XMLHttpRequest();
    xhr.open('GET', `${host}products/details?id=${currentUrlId}`);
    xhr.send();

xhr.onreadystatechange = function() {
    if(xhr.readyState === 4){
      isLoading=false;    //要變回false 才會成立條件 觸發下一頁
      if(xhr.status === 200){    //雙重條件 以免readyState還在123-4就consolelog(error)
        renderProductInfo(xhr.response);
      }else{
        console.log(`Error: ${xhr.status} Error Message: ${xhr.statusText}`);
      }
    }
};
xhr.responseType = 'json';  
}

//render product details

function renderProductInfo(res){
let productInfo = document.querySelector('.product-info');

let mobileMainProductImg = document.querySelector('.mobile-main-product-img');
mobileMainProductImg.src = res.data.main_image;

let mainProductImg = document.querySelector('.main-product-img');
mainProductImg.src = res.data.main_image;

let productName = document.querySelector('.product-name');
productName.textContent = res.data.title;

let productId = document.querySelector('.product-id');
productId.textContent = res.data.id;

let productPrice = document.querySelector('.product-price');
productPrice.textContent = `TWD.${res.data.price}`;

let productColorBoxes = document.querySelector('.product-color-boxes');
for ( let i = 0; i < res.data.colors.length; i+=1 ) {
    //let productColorBox = document.createElement('div');
    //productColorBox.className = "product-color-box";

    let colorInput = document.createElement('input');
    colorInput.type = 'radio'; 
    colorInput.name = 'color';
    colorInput.id = `color${i}`;
    colorInput.className = 'color-input';

    let colorLabel = document.createElement('label'); 
    colorLabel.setAttribute('for',`color${i}`);    //why for不能用.for=color i?
    colorLabel.id = `colorLabel${i}`;
    colorLabel.className = 'color-label';
    colorLabel.style.backgroundColor = `#${res.data.colors[i].code}`;

    productColorBoxes.appendChild(colorInput);
    productColorBoxes.appendChild(colorLabel);

   
    //productColorBoxes.appendChild(productColorBox);
    
/*帶修 可選兩個框
// choose favorite color and size   (因為發生在載入網頁中，不能寫此函式外？等load完再ui??)
    let selectedColor = document.querySelector(`#colorLabel${i}`);
    selectedColor.addEventListener('click', () => {
      selectedColor.style.outline = `1px rgb(175, 172, 172) solid`;
      selectedColor.style.outlineOffset = `3px`;
     });*/
    };
  
let productSizeBoxes = document.querySelector('.product-size-boxes');

for ( let i = 0; i < res.data.sizes.length; i+=1 ) {
  let sizeInput = document.createElement('input');
  sizeInput.type = 'radio';
  sizeInput.name = 'size';
  sizeInput.id = `size${res.data.sizes[i]}`;
  sizeInput.className = 'size-input';

  let sizeLabel = document.createElement('label');
  sizeLabel.setAttribute('for',`size${res.data.sizes[i]}`);
  sizeLabel.id = `sizeLabel${res.data.sizes[i]}`;
  sizeLabel.className = 'size-label';
  sizeLabel.textContent = res.data.sizes[i];

  productSizeBoxes.appendChild(sizeInput);
  productSizeBoxes.appendChild(sizeLabel);

  /*
  productSizeBox.addEventListener('click', () => {
    productSizeBox.style.backgroundColor = 'black';
    productSizeBox.style.color = 'white';   //為什麼不是psb.textcontent.style.color
  })*/
};


let productNote = document.querySelector('.product-note');
productNote.textContent = res.data.note;

let productTexture = document.querySelector('.product-texture');
productTexture.textContent = res.data.texture;

let productDescriptions = document.querySelector('.product-descriptions');
let des = res.data.description.split("\r\n");
   for (let i=0 ; i< des.length ; i+=1){
      let productDes = document.createElement("div");
      productDes.className = "product-des";
      productDes.textContent = des[i];
      productDescriptions.appendChild(productDes);
    } 
  

let productWash = document.querySelector('.product-wash');
productWash.textContent = `清洗：${res.data.wash}`;

let productPlace = document.querySelector('.product-place');
productPlace.textContent = `產地：${res.data.place}`;

let productDetailP = document.querySelector('.product-detail-p');
productDetailP.textContent = res.data.story;

let productDetailImgs = document.querySelector('.product-detail-imgs');
res.data.images.forEach((image) => {
    let productDetailImg = document.createElement('img');
    productDetailImg.className = 'product-detail-img';
    productDetailImg.src = image;
    productDetailImgs.appendChild(productDetailImg);
})

function chooseColorSize(){
//color UI
for ( let i = 0; i < res.data.colors.length; i++ ){
  document.getElementsByClassName("color-input")[i].addEventListener("click", function() {
    selectedId = res.data.id;
    selectedColor = res.data.colors[i].code;
    selectedColorName = res.data.colors[i].name;
   // document.querySelector(".product-number").textContent = '0';
    checkStock();
  })
}
//size UI
for (let j = 0; j < res.data.sizes.length; j++ ){
  document.getElementsByClassName("size-input")[j].addEventListener("click", function() {
  selectedSize = res.data.sizes[j];
  checkStock();
})
}

}



function checkStock(){
for ( let i = 0; i < res.data.variants.length; i++ ) {
  if ( selectedColor === res.data.variants[i].color_code ) {

    if ( res.data.variants[i].stock === 0 ) {
      document.getElementById(`size${res.data.variants[i].size}`).disabled = true;
      document.getElementById(`sizeLabel${res.data.variants[i].size}`).style.opacity = '0.2';
    } else {
      document.getElementById(`size${res.data.variants[i].size}`).disabled = false;
    }

    //checkedStock = res.data.variants[i].stock;
  
    //if ( amount > checkedStock)  {
    //  document.querySelector(".product-number").textContent = '0';  //再選一次時為什麼不會變回0??????
    // }

    if ( selectedSize === res.data.variants[i].size ) {    
    checkedStock = res.data.variants[i].stock;

    //document.querySelector(".product-amount-minus").disabled = false;
    //document.querySelector(".product-amount-add").disabled = false;
    }
    //if ( amount > checkedStock)  {
    //  document.querySelector(".product-number").textContent = '0';  //再選一次時為什麼不會變回0??????
    // }
 
  }
}

    if( checkedStock > 0 ){
    document.querySelector(".product-amount-add").disabled = false;
    document.querySelector(".product-amount-minus").disabled = false;
    }

    if ( amount > checkedStock)  {
      amount =0;   //真正變0的地方
      document.querySelector(".product-number").textContent = '0';  //再選一次時變回0（只是html顯示
      if( checkedStock > 0 ){
        document.querySelector(".product-amount-add").disabled = false;
        document.querySelector(".product-amount-minus").disabled = false;
        }
    }
    
  }

    document.querySelector(".product-amount-add").addEventListener('click', ()=>{
      if( amount <checkedStock ){
        amount +=1;
        document.querySelector(".product-number").textContent = amount;}
      })
    
    document.querySelector(".product-amount-minus").addEventListener('click', ()=>{
        if( amount >0){
          amount -=1;
          document.querySelector(".product-number").textContent = amount;
        }else{
          document.querySelector(".product-amount-minus").disabled = true;
        }
        })

        chooseColorSize();    
    
        
// --- shopping cart ---

if ( JSON.parse(localStorage.getItem("list")) === null ) {  //初次買
  list = [];
} else {
  list = JSON.parse(localStorage.getItem("list"));   //換另產品頁，再向之前買的list新增bought
}

//add to cart button
document.querySelectorAll('.add-to-cart').forEach((addToCart)=> addToCart.addEventListener('click', () => {
  //prevent auto send the form
  //event.preventDefault()
  
  if( selectedColor!== undefined && selectedColorName !== undefined
    && selectedSize !== undefined && amount !==0 ){
    
    // for sending shopping cart data to Check Out API for checking out  
      let bought = {
        "id": res.data.id,
        "name": res.data.title,
        "price": res.data.price,
        "color": {
          "name": selectedColorName,
          "code": selectedColor,
        },
        "size": selectedSize,
        "qty": amount,
        "main_image":res.data.main_image,
        "stock": checkedStock
      };

      let isMatch;     //再想一次!!!!!!!!!!
      isMatch = false;
      //同色同尺 不增列 只改數量 也解決totalqty需<stock
      for(let i=0; i<list.length; i++ ){
        if(bought.id === list[i].id && 
          bought.color.code === list[i].color.code && 
          bought.size === list[i].size){
            list[i].qty = bought.qty;
            localStorage.setItem('list', JSON.stringify(list));
            
            isMatch = true;
            break;
      }}

      if(isMatch === false){
        list.push(bought);
        localStorage.setItem('list', JSON.stringify(list));
      }

        
      qty = list.map(item =>item.qty);    //!!!!!!!
      totalqty = qty.reduce((sum,e) => sum + e);

      totalprice = list.map(item => item.price * item.qty);
      subtotal = totalprice.reduce((sum,e) => sum + e);

      // console.log(list)    //此時的list已是push(bought)過後，不能再寫list.push(bought)


  //  localStorage.setItem('list', JSON.stringify(list)); 
      localStorage.setItem('totalqty', JSON.stringify(totalqty)); 
      localStorage.setItem('subtotal', JSON.stringify(subtotal));
      
   /* for(let i=0; i<qty.length; i++){     //待研究更清楚的指示
      if(qty[i]= checkedStock){
       alert('抱歉！已無更多現貨～'); 
      }if(qty[i]< checkedStock){
        alert('商品已加入購物車:)'); 
      }};
    */       

    // --- Show totalqty in cart icon ---
    if(JSON.parse(localStorage.getItem("totalqty")) === null){
       document.querySelector('.cart-number').textContent = '0';
       document.querySelector('.mobile-cart-number').textContent = '0';
    }else{
       document.querySelector('.cart-number').textContent = JSON.parse(localStorage.getItem("totalqty")); 
       document.querySelector('.mobile-cart-number').textContent = JSON.parse(localStorage.getItem("totalqty")); 
    }
    
  }
    }))  
    }

    
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

  