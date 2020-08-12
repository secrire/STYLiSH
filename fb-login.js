//let currentUrl = location.href;
//let currentUrlNew = new URL(currentUrl);
let currentUrlClientId = currentUrlNew.searchParams.get('client');

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1019387871810563',
      cookie     : true,
      xfbml      : true,
      version    : 'v7.0'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

// 確認用戶是否已使用「Facebook 登入」來登入我的應用程式

// 官方 FB.getLoginStatus(function(response) {
//    statusChangeCallback(response);
//});

function checkLoginState(){
    FB.getLoginStatus(function(response) {
        if(response.status === 'connected'){
            FB.api('/me',{
                'fields':'id,name,email,picture'
            }, function(response){
                console.log(response);
                //localStorage.setItem('userName', JSON.stringify(response.name));
                //localStorage.setItem('userEmail', JSON.stringify(response.email));
                //localStorage.setItem('userImg', JSON.stringify(response.picture));
               
                window.location = `profile.html?client=${response.id}`;
            });
            let accessToken = response.authResponse.accessToken;
            console.log(accessToken);
            localStorage.setItem('accessToken', JSON.stringify(accessToken));
        }else{
            login()
        }
        //}
        //statusChangeCallback(response);
    });
}
//checkLoginState();

//登出待做？
function login(){
    FB.login(function(response){
        if(response.status === 'connected'){
            FB.api('/me',{
                'fields':'id,name,email,picture'
            }, function(response){
                console.log(`successful login for: ${response.name}`);
               
                window.location = `profile.html?client=${response.id}`;   
            });
            let accessToken = response.authResponse.accessToken;
            console.log(accessToken);
            localStorage.setItem('accessToken', JSON.stringify(accessToken));
        }
    }, {
        scope:'public_profile,email',
        auth_type:'rerequest'
    });
}


document.querySelector('.member-img').addEventListener('click',() =>{
    checkLoginState();
})

document.querySelector('.mobile-member-img').addEventListener('click',() =>{
    checkLoginState();
})



//document.querySelector('.fb-name').textContent = JSON.parse(localStorage.getItem("userName"));
//document.querySelector('.fb-email').textContent = JSON.parse(localStorage.getItem("userEmail"));
//document.querySelector('.fb-img').src = JSON.parse(localStorage.getItem("userImg")).data.url;;
document.querySelector('.fb-img').src = `http://graph.facebook.com/${currentUrlClientId}/picture?type=large`;