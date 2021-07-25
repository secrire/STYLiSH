
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1019387871810563',
      cookie     : true,
      xfbml      : true,
      version    : 'v7.0'
    });
      
    FB.AppEvents.logPageView();   
    
    FB.getLoginStatus(function(response) {   //需放這 先呼叫再套件
        if(response.status === 'connected'){
            FB.api('/me',{
                'fields':'id,name,email,picture'
            }, function(response){
                document.querySelector('.fb-name').textContent = response.name;
                document.querySelector('.fb-email').textContent = response.email;
                document.querySelector('.fb-img').src = `http://graph.facebook.com/${response.id}/picture?type=large`;
                // document.querySelector('.fb-img').src = response.picture.data.url;
            });
        }
    });
    /*
    FB.api('/me',{        
        'fields':'id,name,email,picture'
    }, function(response){
        console.log(response);
    });*/
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));


// --- Show totalqty in cart icon ---
if(JSON.parse(localStorage.getItem("totalqty")) === null){
  document.querySelector('.cart-number').textContent = '0';
  document.querySelector('.mobile-cart-number').textContent = '0';
}else{
document.querySelector('.cart-number').textContent = JSON.parse(localStorage.getItem("totalqty")); 
document.querySelector('.mobile-cart-number').textContent = JSON.parse(localStorage.getItem("totalqty")); 
}

//document.querySelector('.fb-img').src = `http://graph.facebook.com/${currentUrlClientId}/picture?type=large`;