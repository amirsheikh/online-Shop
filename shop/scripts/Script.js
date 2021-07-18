
var productItem
let token = getCookie("token");
var pageType
var categoryItem
if(token != ""){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "get_auth.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            var now = new Date();
            now.setTime(now.getTime() +  3600 * 1000);
            document.cookie = "token=" + json.token + ";expires=" +now.toUTCString()+';path=/';
            showProfile(json);
            
        }
        else if(xhr.status === 403){
            var now = new Date();
            hideProfile();
            now.setTime(now.getTime() -100);
            document.cookie = "token=" + "" + ";expires=" +now.toUTCString()+';path=/';
        }
    };
    xhr.send(token);
}


function popup(evt, type) {
    modal = document.getElementById('shadow')
    modal.style.display = "block";
    tabcontent = document.getElementsByClassName("box");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    comp = document.getElementById(type)
    setTimeout(function(){
        comp.classList.add("pop-up")
    },.1);
    comp.style.display = "block";
    setTimeout(function(){
        window.onclick = function(event) {
            if (event.target == modal) {
                comp.style.display = "none";
                modal.style.display = "none";
                comp.classList.remove("pop-up")  
            }
        }
    },20);
}
function login(comp,type,email,pass) {
    vemail = "v-"+email;
    email = document.getElementById(email)
    vpass = "v-"+pass;
    pass = document.getElementById(pass)
    if(check(email,vemail) && check(pass,vpass)){  
        comp.innerText = "...";      
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "login.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                
                compp = document.getElementById(type);
                compp.style.display = "none";
                document.getElementById('shadow').style.display = "none";
                compp.classList.remove("pop-up");
                email.value = '';
                pass.value = '';

                var json = JSON.parse(xhr.responseText);
                showProfile(json);

                var now = new Date();
                now.setTime(now.getTime() +  3600 * 1000);
                document.cookie = "token="+json.token+ ";expires=" +now.toUTCString()+';path=/';
                
            }
            else if(xhr.readyState === 4 && xhr.status === 403){
                comp.innerText = "ورود";
                pass.value = '';
                window.alert("ایمیل یا رمز عبور نادرست می‌باشد. لطفا دوباره تلاش نمایید.");
            }
            if(xhr.readyState == 4){
                comp.innerText = "ورود";
            }
        };
        var data = JSON.stringify({"email": email.value.trim(), "password": pass.value.trim()});
        xhr.send(data);

    }
    
    
    
    else{
        check(email,vemail);
        check(pass,vpass);
        window.alert("لطفا مواردی که با علامت تعجب مشخص شده است را بررسی نمایید.");
    }

}
function signup(type,email,pass,name,lname,address) {
    vemail = "v-"+email;
    email = document.getElementById(email);
    vpass = "v-"+pass;
    pass = document.getElementById(pass);
    vname = "v-"+name;
    name = document.getElementById(name);
    vlname = "v-"+lname;
    lname = document.getElementById(lname);
    vaddress = "v-"+address;
    address = document.getElementById(address);
    if(check(address,vaddress)&& check(name,vname) && check(lname,vlname) && check(email,vemail) && check(pass,vpass)){      
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "signup.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                
                compp = document.getElementById(type);
                compp.style.display = "none";
                document.getElementById('shadow').style.display = "none";
                compp.classList.remove("pop-up");
                email.value = '';
                pass.value = '';
                name.value = '';
                lname.value = '';
                address.value = '';

                window.alert("حساب کاربری شما با موفقیت ایجاد شد");
                
            }
            else if(xhr.readyState === 4 && xhr.status === 403){
                pass.value = '';
                window.alert("شما قبلا با این ایمیل ثبت نام کرده اید.");
            }
        };
        var data = JSON.stringify({"email": email.value.trim(), "password": pass.value.trim(),"name": name.value.trim(), "lname": lname.value.trim(), "address": address.value.trim()});
        xhr.send(data);
    }
    else{
        check(address,vaddress);
        check(name,vname);
        check(lname,vlname);
        check(email,vemail);
        check(pass,vpass);
        window.alert("لطفا مواردی که با علامت تعجب مشخص شده است را بررسی نمایید.");
    }
}
function closepopup(type) {
    comp = document.getElementById(type)
    comp.style.display = "none"
    document.getElementById('shadow').style.display = "none";
    comp.classList.remove("pop-up")
}
function check(comp,component) {
    if(comp.type == "email"){
        if(comp.value.trim().length > 255 || !comp.value.trim().match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)){
            document.getElementById(component).style.display = "inline-block";
            return false;
        }
        else{
            document.getElementById(component).style.display = "none";
            return true;
        }
    }
    else if(comp.type == "password"){
        if(!comp.value.trim().match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z@!#$%^&*()\d]{8,255}$/)){
            document.getElementById(component).style.display = "inline-block";
            return false;
        }
        else{
            document.getElementById(component).style.display = "none";
            return true;
        }
    }
    else if(comp.name=="address"){
        if(comp.value.trim().length > 1000 || comp.value.trim().length < 1){
            document.getElementById(component).style.display = "inline-block";
            return false;
        }
        else{
            document.getElementById(component).style.display = "none";
            return true;
        }
    }
    else{
        if(comp.value.trim().length > 255 ||comp.value.trim().length < 1 ){
            document.getElementById(component).style.display = "inline-block";
            return false;
        }
        else{
            document.getElementById(component).style.display = "none";
            return true;
        }
    }

}

function edit(email,pass,name,lname,address){
    vemail = "v-"+email;
    email = document.getElementById(email);
    vpass = "v-"+pass;
    pass = document.getElementById(pass);
    vname = "v-"+name;
    name = document.getElementById(name);
    vlname = "v-"+lname;
    lname = document.getElementById(lname);
    vaddress = "v-"+address;
    address = document.getElementById(address);
    if(check(address,vaddress)&& check(name,vname) && check(lname,vlname)  && check(pass,vpass)){
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "edit.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                window.alert("حساب کاربری شما با موفقیت ویرایش شد");
                com = document.getElementById("welcome-profile")
                if(com != null){
                    com.innerText = name.value + " عزیز خوش آمدید."
                    document.getElementById("name-after-login-button").innerHTML = name.value + " " + lname.value + "<img src='img/down.png' class='image-down' />";
                }
                
            }
            else if(xhr.readyState === 4 && xhr.status === 405){
                pass.value = '';
                window.alert("اطلاعات وارد شده نامعتبر.");
            }
            else if(xhr.readyState === 4 && xhr.status === 403){
                window.alert("لطفا مجددا لاگین نمایید.")
                window.location.replace("/")
            }
        };
        var data = JSON.stringify({"token" : getCookie("token") ,"email": email.value.trim(), "password": pass.value.trim(),"name": name.value.trim(), "lname": lname.value.trim(), "address": address.value.trim()});
        xhr.send(data);


    }
    else{
        check(address,vaddress);
        check(name,vname);
        check(lname,vlname);
        check(pass,vpass);
        window.alert("لطفا مواردی که با علامت تعجب مشخص شده است را بررسی نمایید.");
    }
}
function pagingC(comp,numberOfComp,json,type){
    productItem = json;
    pageType = type
    paging(comp,numberOfComp)
}
function paging(comp,numberOfComp){
    if(numberOfComp == 0){
        numberOfPage = 1
    }
    else{
        numberOfPage = Math.ceil(numberOfComp/9);
    }
    itembox = document.getElementById("item-box-id");
    if(comp.innerText == "اول"){
        currentPage = 1;
    }
    else if(comp.innerText == "آخر"){
        currentPage = numberOfPage;
    }
    else{
        currentPage = parseInt(comp.innerText);
    }
    itembox.innerHTML = "";
    if(pageType == 0){
        for(let i = ((currentPage-1)*9); i < currentPage*9 && i<numberOfComp; i = i+1){
            itembox.innerHTML= itembox.innerHTML + "<div class='boxes'>"
                +"<img src='" + productItem[i].ImageUrl + "'class='tiny-image'/>"
                +"<a class='name-comp' href='#'>" + productItem[i].Name + "</a>"
                +"<h10 ir='rtl' class='category'>دسته بندی : " + productItem[i].Category + " </h10>"
                +"<div style='width:70%;border-width:thin;color:rgb(202, 202, 202);border-top-style: solid;'></div>"
                +"<a href='#' onclick = 'buyProduct("+ i +")' class='buy-button'>خرید محصول</a>"
                +"<h12 dir='rtl' class='price'>" + productItem[i].Price + " تومان</h12>"
            +"</div>";
        }
    }
    else{
        for(let i = ((currentPage-1)*9); i < currentPage*9 && i<numberOfComp; i = i+1){
            itembox.innerHTML = itembox.innerHTML + "<div class= 'boxes extened-boxes'>"
                + "<div style = 'cursor: pointer;' onclick='changeAmount(this," + i + " )'  class='number-of-pro-a'>" + productItem[i].Amount +"</div>"
                + "<div class='number-of-pro-b'>" + productItem[i].Sell +"</div>"
                + "<img onclick='changeImage(this," + i + " )' src='" + productItem[i].ImageUrl + "' id = '" + "imageName" + i + "' class='tiny-image' />"
                + "<a id = '" + "productName" + i + "' class= 'name-comp' onclick='changeName(this)' href = '#'> " + productItem[i].Name + "</a>"
                + "<h10 style = 'cursor: pointer;' onclick='changeCategory(this," + i + " )'  class = 'category'>دسته بندی : " + productItem[i].Category +"</h10>"
                + "<div style='width:70%;border-width:thin;color:rgb(202, 202, 202);border-top-style: solid;'></div>"
                + "<input onchange='fileupload(this," + i + " )'  class = 'custom-file-input' type='file' >"
                + "<h12 style = 'cursor: pointer;' dir = 'rtl' onclick='changePrice(this," + i + " )' class = 'price'>" + productItem[i].Price + " تومان</h12>"
            +"</div>"
        }
    }
    if(currentPage == 1 && numberOfPage == 1){
        itembox.innerHTML =  itembox.innerHTML + 
        "<div style='text-align: center;margin-top:50px;border-top-style: solid;border-width: thin;border-color: black;padding-top: 10px;'>"
            +"<div class = 'paging-component' style='color: #f9593a; background-color: white;cursor: default;'>1</div>"
        +"</div>"; 
    }
    else if(currentPage == 1 && numberOfPage == 2){
        itembox.innerHTML =  itembox.innerHTML + 
        "<div style='text-align: center;margin-top:50px;border-top-style: solid;border-width: thin;border-color: black;padding-top: 10px;'>"
            +"<div class = 'paging-component' style='color: #f9593a; background-color: white;cursor: default;'>1</div>"
            +"<div class = 'paging-component' onclick='paging(this,"+ numberOfComp+  ")'>2</div>"
            +"<div class = 'paging-component' onclick='paging(this,"+ numberOfComp+ ")'>آخر</div>"
        +"</div>"; 
    }
    else if(currentPage == 2 && numberOfPage == 2){
        itembox.innerHTML =  itembox.innerHTML + 
        "<div style='text-align: center;margin-top:50px;border-top-style: solid;border-width: thin;border-color: black;padding-top: 10px;'>"
            +"<div class = 'paging-component' onclick='paging(this,"+ numberOfComp+ ")'>اول</div>"
            +"<div class = 'paging-component' onclick='paging(this,"+ numberOfComp+ ")'>1</div>"
            +"<div class = 'paging-component' style='color: #f9593a; background-color: white;cursor: default;'>2</div>"
        +"</div>"; 
    }
    else if(currentPage == 1){
        itembox.innerHTML =  itembox.innerHTML + 
        "<div style='text-align: center;margin-top:50px;border-top-style: solid;border-width: thin;border-color: black;padding-top: 10px;'>"
            +"<div class = 'paging-component' style='color: #f9593a; background-color: white;cursor: default;'>1</div>"
            +"<div class = 'paging-component' onclick='paging(this,"+ numberOfComp+ ")'>2</div>"
            +"<div class = 'paging-component' onclick='paging(this,"+ numberOfComp+ ")'>3</div>"
            +"<div class = 'paging-component' onclick='paging(this,"+ numberOfComp+ ")'>آخر</div>"
        +"</div>"; 
    }
    else if(currentPage == 2 && numberOfPage == 3){
        itembox.innerHTML =  itembox.innerHTML 
        + "<div style='text-align: center;margin-top:50px;border-top-style: solid;border-width: thin;border-color: black;padding-top: 10px;'>"
            +"<div class = 'paging-component' onclick='paging(this,"+ numberOfComp+ ")'>1</div>"
            +"<div class = 'paging-component' style='color: #f9593a; background-color: white;cursor: default;'>2</div>"
            +"<div class = 'paging-component' onclick='paging(this,"+ numberOfComp+ ")'>3</div>"
            +"<div class = 'paging-component' onclick='paging(this,"+ numberOfComp+ ")'>آخر</div>"
        +"</div>"; 
    }
    else if(currentPage == 2){
        itembox.innerHTML =  itembox.innerHTML 
        + "<div style='text-align: center;margin-top:50px;border-top-style: solid;border-width: thin;border-color: black;padding-top: 10px;'>"
            +"<div class = 'paging-component' onclick='paging(this,"+ numberOfComp+ ")'>1</div>"
            +"<div class = 'paging-component' style='color: #f9593a; background-color: white;cursor: default;'>2</div>"
            +"<div class = 'paging-component' onclick='paging(this,"+ numberOfComp+ ")'>3</div>"
            +"<div class = 'paging-component' onclick='paging(this,"+ numberOfComp+ ")'>4</div>"
            +"<div class = 'paging-component' onclick='paging(this,"+ numberOfComp+ ")'>آخر</div>"
        +"</div>"; 
    }
    else if(currentPage == numberOfPage){
        itembox.innerHTML =  itembox.innerHTML 
        + "<div style='text-align: center;margin-top:50px;border-top-style: solid;border-width: thin;border-color: black;padding-top: 10px;'>"
            +"<div class = 'paging-component' onclick='paging(this,"+ numberOfComp+ ")'>اول</div>"
            +"<div class = 'paging-component' onclick='paging(this,"+ numberOfComp+ ")'>" + (numberOfPage-2) + "</div>"
            +"<div class = 'paging-component' onclick='paging(this,"+ numberOfComp+ ")'>" + (numberOfPage-1) + "</div>"
            +"<div class = 'paging-component' style='color: #f9593a; background-color: white;cursor: default;'>" + numberOfPage + "</div>"
        +"</div>"; 
    }
    else if(currentPage == numberOfPage-1){
        itembox.innerHTML =  itembox.innerHTML
        + "<div style='text-align: center;margin-top:50px;border-top-style: solid;border-width: thin;border-color: black;padding-top: 10px;'>"
            +"<div class = 'paging-component' onclick='paging(this,"+ numberOfComp+ ")'>اول</div>"
            +"<div class = 'paging-component' onclick='paging(this,"+ numberOfComp+ ")'>" + (numberOfPage-3) + "</div>"
            +"<div class = 'paging-component' onclick='paging(this,"+ numberOfComp+ ")'>" + (numberOfPage-2) + "</div>"
            +"<div class = 'paging-component' style='color: #f9593a; background-color: white;cursor: default;'>"+ (numberOfPage-1) + "</div>"
            +"<div class = 'paging-component' onclick='paging(this,"+ numberOfComp+ ")'>" + (numberOfPage) + "</div>"
        +"</div>"; 
    }
    else{
        itembox.innerHTML =  itembox.innerHTML 
        + "<div style='text-align: center;margin-top:50px;border-top-style: solid;border-width: thin;border-color: black;padding-top: 10px;'>"
            +"<div class = 'paging-component' onclick='paging(this,"+ numberOfComp+ ")'>اول</div>"
            +"<div class = 'paging-component' onclick='paging(this,"+ numberOfComp+ ")'>" + (currentPage-2) + "</div>"
            +"<div class = 'paging-component' onclick='paging(this,"+ numberOfComp+ ")'>" + (currentPage-1) + "</div>"
            +"<div class = 'paging-component' style='color: #f9593a; background-color: white;cursor: default;'>" + currentPage + " </div>"
            +"<div class = 'paging-component' onclick='paging(this,"+ numberOfComp+ ")'>" + (currentPage+1) + "</div>"
            +"<div class = 'paging-component' onclick='paging(this,"+ numberOfComp+ ")'>"+ (currentPage+2) + "</div>"
            +"<div class = 'paging-component' onclick='paging(this,"+ numberOfComp+ ")'>آخر</div>"
        +"</div>"; 
    }
}
function showProfile(json){
    document.getElementById("login-div").style.display = "none";
    document.getElementById("name-after-login-button").innerHTML = json.firstname + " " + json.lastname + "<img src='img/down.png' class='image-down' />";
    document.getElementById("after-login-div").style.display = "block";
    com = document.getElementById("welcome-profile")
    if(com != null){
        com.innerText = json.firstname + " عزیز خوش آمدید."
    }
    com = document.getElementById("lname-on-pr-change")
    if(com != null){
        com.setAttribute("placeholder", json.lastname);
    }
    com = document.getElementById("name-on-pr-change")
    if(com != null){
        com.setAttribute("placeholder", json.firstname);
    }
    com = document.getElementById("address-on-pr-change")
    if(com != null){
        com.setAttribute("placeholder", json.Address);
    }
    
    com = document.getElementById("email-on-pr-change")
    if(com != null){
        com.setAttribute("placeholder", json.email);
    }
    
    com = document.getElementById("balance-profile")
    if(com != null){
        com.innerText = "موجودی شما "+json.balance + "تومان."
    }
    
}

function hideProfile(){
    document.getElementById("login-div").style.display = "block";
    //document.getElementById("name-after-login-button").innerHTML = json.firstname + " " + json.lastname + "<img src='img/down.png' class='image-down' />";
    document.getElementById("after-login-div").style.display = "none";
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
        c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
    }
    }
    return "";
}

function logout(){
    let token = getCookie("token");
    if(token != ""){
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "logout.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var now = new Date();
                now.setTime(now.getTime() - 1000);
                document.cookie = "token=" + "" + ";expires=" +now.toUTCString()+';path=/';
                hideProfile();
            }
        };
        xhr.send(token);
    }
    else{
        hideProfile();
        var now = new Date();
        now.setTime(now.getTime() -100);
        document.cookie = "token=" + "" + ";expires=" +now.toUTCString()+';path=/';
    }
}

function editbalance(){
    let token = getCookie("token");
    let ibalance = prompt("میزان افزایش اعتبار را به تومان وارد کنید", "");
    if(token != "" && ibalance != null && ibalance != ""){
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "i_balance.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                window.alert("افزایش اعتبار انجام شد.")
                com = document.getElementById("balance-profile")
                if(com != null){
                    com.innerText = "موجودی شما "+ xhr.responseText + "تومان."
                }
            }
            else if(xhr.readyState === 4 && xhr.status === 403){
                window.alert("لطفا مجددا لاگین کنید.")
                window.location.replace("/")
            }
        };
        xhr.send(JSON.stringify({"token" : token , "ibalance" : ibalance}));
    }
}

function changeName(comp){
    let nName = window.prompt("لطفا نام محصول را برای تغییر وارد کنید.",comp.innerText)

    let token = getCookie("token");
    if(token != ""&& nName != null && nName != ""){
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "change_name.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                window.alert("نام محصول با موفقیت آپدیت شد")
                const newDiv = document.createElement("div");
                newDiv.innerText = 1;
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "full_product.php", true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        var json = JSON.parse(xhr.responseText);
                        pagingC(newDiv,json.length,json,1);
                    }
                    else if(xhr.readyState === 4 && xhr.status === 403){
                        window.alert("لطفا مجددا لاگین کنید.")
                        window.location.replace("/")
                    }
                };
                xhr.send(JSON.stringify({"token" : token}));
            }
            else if(xhr.readyState === 4 && xhr.status === 403){
                window.alert("لطفا مجددا لاگین کنید.")
                window.location.replace("/")
            }
            else if(xhr.readyState === 4 && xhr.status === 405){
                window.alert("این محصول وجود دارد")
                comp.innerText = cName;
            }
        };
        xhr.send(JSON.stringify({"token":token,"cName":comp.innerText,"nName":nName}));
    }
}

function changeCategory(comp,id){
    cName = document.getElementById("productName" + id);
    let nName = window.prompt("لطفا نام دسته بندی را برای تغییر وارد کنید.",comp.innerText)
    let token = getCookie("token");
    if(token != ""&& nName != null && nName != ""){
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "change_cat.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                window.alert("دسته بندی با موفقیت آپدیت شد")
                const newDiv = document.createElement("div");
                newDiv.innerText = 1;
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "full_product.php", true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        var json = JSON.parse(xhr.responseText);
                        pagingC(newDiv,json.length,json,1);
                    }
                    else if(xhr.readyState === 4 && xhr.status === 403){
                        window.alert("لطفا مجددا لاگین کنید.")
                        window.location.replace("/")
                    }
                };
                xhr.send(JSON.stringify({"token" : token}));


                
                let xh = new XMLHttpRequest();
                xh.open("GET", "get_category.php", true);
                xh.setRequestHeader("Content-Type", "application/json");
                xh.onreadystatechange = function () {
                    if (xh.readyState === 4 && xh.status === 200) {
                        var json = JSON.parse(xh.responseText);
                        adminCategorySet(json.length,json);
                
                    }
                };
                xh.send();
            }
            else if(xhr.readyState === 4 && xhr.status === 403){
                window.alert("لطفا مجددا لاگین کنید.")
                window.location.replace("/")
            }
            else if(xhr.readyState === 4 && xhr.status === 405){
                window.alert("دسته بندی نامعتبر")
            }
        };
        xhr.send(JSON.stringify({"token":token,"cName":cName.innerText,"nName":nName}));
    }

}

function changeAmount(comp,id){
    cName = document.getElementById("productName" + id);
    let nName = window.prompt("لطفا مقدار باقی مانده را برای تغییر وارد کنید.",comp.innerText)
    let token = getCookie("token");
    if(token != ""&& nName != null && nName != ""){
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "change_amount.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                window.alert("مقدار باقی مانده با موفقیت آپدیت شد")
                const newDiv = document.createElement("div");
                newDiv.innerText = 1;
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "full_product.php", true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        var json = JSON.parse(xhr.responseText);
                        pagingC(newDiv,json.length,json,1);
                    }
                    else if(xhr.readyState === 4 && xhr.status === 403){
                        window.alert("لطفا مجددا لاگین کنید.")
                        window.location.replace("/")
                    }
                };
                xhr.send(JSON.stringify({"token" : token}));
            }
            else if(xhr.readyState === 4 && xhr.status === 403){
                window.alert("لطفا مجددا لاگین کنید.")
                window.location.replace("/")
            }
            else if(xhr.readyState === 4 && xhr.status === 405){
                window.alert("دسته بندی نامعتبر")
            }
        };
        xhr.send(JSON.stringify({"token":token,"cName":cName.innerText,"nName":nName}));
    }
}

function changePrice(comp,id){
    cName = document.getElementById("productName" + id);
    let nName = window.prompt("لطفا قیمت را برای تغییر وارد کنید.",comp.innerText)
    let token = getCookie("token");
    if(token != ""&& nName != null && nName != ""){
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "change_price.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                window.alert("مقدار باقی مانده با موفقیت آپدیت شد")
                const newDiv = document.createElement("div");
                newDiv.innerText = 1;
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "full_product.php", true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        var json = JSON.parse(xhr.responseText);
                        pagingC(newDiv,json.length,json,1);
                    }
                    else if(xhr.readyState === 4 && xhr.status === 403){
                        window.alert("لطفا مجددا لاگین کنید.")
                        window.location.replace("/")
                    }
                };
                xhr.send(JSON.stringify({"token" : token}));
            }
            else if(xhr.readyState === 4 && xhr.status === 403){
                window.alert("لطفا مجددا لاگین کنید.")
                window.location.replace("/")
            }
            else if(xhr.readyState === 4 && xhr.status === 405){
                window.alert("دسته بندی نامعتبر")
            }
        };
        xhr.send(JSON.stringify({"token":token,"cName":cName.innerText,"nName":nName}));
    }
}

function fileupload(comp,id){
    let photo = comp.files[0];  // file from input
    let token = getCookie("token");
    if(token != ""){
        let xhr = new XMLHttpRequest();
        let formData = new FormData();
        formData.append("photo", photo,token);                               
        xhr.open("POST", 'upload.php',true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                nName = xhr.responseText;
                cName = document.getElementById("productName" + id);
                let req = new XMLHttpRequest();
                req.open("POST", "change_Image.php", true);
                req.setRequestHeader("Content-Type", "application/json");
                req.onreadystatechange = function () {
                    if (req.readyState === 4 && req.status === 200) {
                        window.alert("تصویر با موفقیت آپدیت شد")
                        const newDiv = document.createElement("div");
                        newDiv.innerText = 1;
                        let req1 = new XMLHttpRequest();
                        req1.open("POST", "full_product.php", true);
                        req1.setRequestHeader("Content-Type", "application/json");
                        req1.onreadystatechange = function () {
                            if (req1.readyState === 4 && req1.status === 200) {
                                var json = JSON.parse(req1.responseText);
                                pagingC(newDiv,json.length,json,1);
                            }
                            else if(req1.readyState === 4 && req1.status === 403){
                                window.alert("لطفا مجددا لاگین کنید.")
                                window.location.replace("/")
                            }
                        };
                        req1.send(JSON.stringify({"token" : token}));
                    }
                    else if(req.readyState === 4 && req.status === 403){
                        window.alert("لطفا مجددا لاگین کنید.")
                        window.location.replace("/")
                    }
                };
                req.send(JSON.stringify({"token":token,"cName":cName.innerText,"nName":nName}));
            }
            else if (xhr.readyState === 4 && xhr.status === 403){
                window.alert("لطفا مجددا لاگین کنید.")
                window.location.replace("/")
            }
            else if(xhr.readyState === 4 && xhr.status === 405){
                window.alert("فرمت تصویر باید jpg باشد.")
                window.location.replace("/")
            }
        };
         xhr.send(formData);
    }
}

function changeImage(comp,id){
    cName = document.getElementById("productName" + id);
    let nName = window.prompt("لطفا آدرس تصویر را برای تغییر وارد کنید.","img/")
    let token = getCookie("token");
    if(token != ""&& nName != null && nName != "img/"){
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "change_Image.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                window.alert("تصویر با موفقیت آپدیت شد")
                const newDiv = document.createElement("div");
                newDiv.innerText = 1;
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "full_product.php", true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        var json = JSON.parse(xhr.responseText);
                        pagingC(newDiv,json.length,json,1);
                    }
                    else if(xhr.readyState === 4 && xhr.status === 403){
                        window.alert("لطفا مجددا لاگین کنید.")
                        window.location.replace("/")
                    }
                };
                xhr.send(JSON.stringify({"token" : token}));
            }
            else if(xhr.readyState === 4 && xhr.status === 403){
                window.alert("لطفا مجددا لاگین کنید.")
                window.location.replace("/")
            }
        };
        xhr.send(JSON.stringify({"token":token,"cName":cName.innerText,"nName":nName}));
    }
}

function createPro(){
    let Name = window.prompt("لطفا نام محصول را وارد کنید.","")
    while(Name == ''){
        window.alert('نام محصول نمیتواند خالی باشد.')
        Name = window.prompt("لطفا نام محصول را وارد کنید.","")
    }
    if(Name == null)
        return
    
    let Cate = "دسته بندی نشده"
    let Cat = window.prompt("دسته بندی را وارد کنید.",Cate)
    while(Cat == ''){
        window.alert('دسته بندی نمیتواند خالی باشد.')
        Cat = window.prompt("دسته بندی را وارد کنید.",Cate)
    }
    if(Cat == null)
        return

    let Price = window.prompt("قیمت را وارد کنید.","")
    while(Price == ''){
        window.alert('قیمت نمیتواند خالی باشد.')
        Price = window.prompt("قیمت را وارد کنید.","")
    }
    if(Price == null)
        return

    
    let Amount = window.prompt("تعداد را وارد کنید.","")
    while(Amount == ''){
        window.alert('تعداد نمیتواند خالی باشد.')
        Amount = window.prompt("تعداد را وارد کنید.","")
    }
    if(Amount == null)
        return
    
    let ImgUrl = window.prompt("آدرس تصویر را وارد کنید.","img/def.jpg")
    while(ImgUrl == ''){
        window.alert('آدرس تصویر نمیتواند خالی باشد.')
        ImgUrl = window.prompt("آدرس تصویر را وارد کنید.","img/def.jpg")
    }
    if(ImgUrl == null)
        return

    let token = getCookie("token");
    if(token != ""){
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "create_pro.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                window.alert("محصول با موفقیت ساخته شد")
                const newDiv = document.createElement("div");
                newDiv.innerText = 1;
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "full_product.php", true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        var json = JSON.parse(xhr.responseText);
                        pagingC(newDiv,json.length,json,1);
                    }
                    else if(xhr.readyState === 4 && xhr.status === 403){
                        window.alert("لطفا مجددا لاگین کنید.")
                        window.location.replace("/")
                    }
                };
                xhr.send(JSON.stringify({"token" : token}));
            }
            else if(xhr.readyState === 4 && xhr.status === 403){
                window.alert("لطفا مجددا لاگین کنید.")
                window.location.replace("/")
            }
            else if(xhr.readyState === 4 && xhr.status === 405){
                window.alert("محصول قبلا وجود دارد.")
            }
        };
        xhr.send(JSON.stringify({"token":token,"Name":Name,"Category":Cat,"Price":Price,"Amount":Amount,"ImgUrl":ImgUrl}));
    }    
}

function sortByPrice(comp){
    comp.style.background = "#f9593a"
    comp.style.color = "white"
    document.getElementById("sell_div").style.background = "white";
    document.getElementById("sell_div").style.color = "black";
    const newDiv = document.createElement("div");
    newDiv.innerText = 1;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "product_by_price.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            pagingC(newDiv,json.length,json,0);
    
        }
    };
    xhr.send();
}

function sortBySell(comp){
    comp.style.background = "#f9593a";
    comp.style.color = "white"
    document.getElementById("price_div").style.background = "white";
    document.getElementById("price_div").style.color = "black";
    const newDiv = document.createElement("div");
    newDiv.innerText = 1;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "product.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            pagingC(newDiv,json.length,json,0);
    
        }
    };
    xhr.send();
}


function searchPro(){
    document.getElementById('item-box-id').scrollIntoView();
    let input = document.getElementById('search-input').value
    const newDiv = document.createElement("div");
    newDiv.innerText = 1;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "product_search.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            pagingC(newDiv,json.length,json,0);
    
        }
    };
    xhr.send(input);

}

function categorySet(length,json){
    let catComp = document.getElementById("filter-box-div");
    catComp.innerHTML = "<div style='margin-top: 10px; display: block;'>:دسته بندی ها</div>"
                + "<div "
                + "style='width:95%;border-width:thin;color:rgb(202, 202, 202);border-top-style:dashed;margin-top: 5px;margin-bottom: 5px;'>"
                + "</div>"
    for(let i =0;i<length;i++){
        catComp.innerHTML = catComp.innerHTML + "<label class = 'catelable' >" + json[i]["Category"] + "</label>"
                 + "<input type='radio' onclick='productByCat(this)' class='radio' name='category' value='" + json[i]["Category"] + "' >"
               +" <br>"
    }
    catComp.innerHTML = catComp.innerHTML + "<br>";
}

function productByCat(comp){
    const newDiv = document.createElement("div");
    newDiv.innerText = 1;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "product_by_cat.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            pagingC(newDiv,json.length,json,0);
    
        }
    };
    xhr.send(comp.value);
}

function adminCategorySet(length,json){
    categoryItem = json
    let comp = document.getElementById("cat-d");
    comp.innerHTML = "<div class='items-p main-item'>"
        +"<div class='item-detail-p item-detail-ca'>دسته بندی</div>"
        +"<div class='item-detail-p item-detail-ca'>عملیات</div>"
    +"</div>"

    for(let i =0;i<length;i++){
        func =  "editCat(" + i + ")"
        func1 = "rmCat(" + i + ")"
        comp.innerHTML = comp.innerHTML + "<div class='items-p'>"
            + "<div class='item-detail-p item-detail-ca'>"+ json[i]["Category"] +"</div>"
                + "<div class='item-detail-p item-detail-ca'>"
                + "<div onclick= '"+ func + "' class='edit-a'>ویرایش</div>"
                + "<div onclick= '"+ func1 + "' class='remove-a'>حذف</div>"
            + "</div>"
        + "</div>"
    }

}

function editCat(i){
    let nName = window.prompt("لطفا نام دسته بندی جدید را وارد کنید.","")    
    let token = getCookie("token");
    if(token != "" && nName != null && nName != ""){
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "edit_category.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                window.alert("دسته بندی با موفقیت حذف شد")
                const newDiv = document.createElement("div");
                newDiv.innerText = 1;
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "full_product.php", true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        var json = JSON.parse(xhr.responseText);
                        pagingC(newDiv,json.length,json,1);
                    }
                    else if(xhr.readyState === 4 && xhr.status === 403){
                        window.alert("لطفا مجددا لاگین کنید.")
                        window.location.replace("/")
                    }
                };
                xhr.send(JSON.stringify({"token" : token}));


                let xh = new XMLHttpRequest();
                xh.open("GET", "get_category.php", true);
                xh.setRequestHeader("Content-Type", "application/json");
                xh.onreadystatechange = function () {
                    if (xh.readyState === 4 && xh.status === 200) {
                        var json = JSON.parse(xh.responseText);
                        adminCategorySet(json.length,json);
                
                    }
                };
                xh.send();

            }
            else if(xhr.readyState === 4 && xhr.status === 403){
                window.alert("لطفا مجددا لاگین کنید.")
                window.location.replace("/")
            }
        };
        xhr.send(JSON.stringify({"token":token,"Name":categoryItem[i]["Category"] , "nName" : nName}));
    }

}

function rmCat(i){
    // window.alert(categoryItem[i]["Category"] + "rm")

    let token = getCookie("token");
    if(token != ""){
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "rm_category.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                window.alert("دسته بندی با موفقیت حذف شد")
                const newDiv = document.createElement("div");
                newDiv.innerText = 1;
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "full_product.php", true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        var json = JSON.parse(xhr.responseText);
                        pagingC(newDiv,json.length,json,1);
                    }
                    else if(xhr.readyState === 4 && xhr.status === 403){
                        window.alert("لطفا مجددا لاگین کنید.")
                        window.location.replace("/")
                    }
                };
                xhr.send(JSON.stringify({"token" : token}));


                let xh = new XMLHttpRequest();
                xh.open("GET", "get_category.php", true);
                xh.setRequestHeader("Content-Type", "application/json");
                xh.onreadystatechange = function () {
                    if (xh.readyState === 4 && xh.status === 200) {
                        var json = JSON.parse(xh.responseText);
                        adminCategorySet(json.length,json);
                
                    }
                };
                xh.send();

            }
            else if(xhr.readyState === 4 && xhr.status === 403){
                window.alert("لطفا مجددا لاگین کنید.")
                window.location.replace("/")
            }
        };
        xhr.send(JSON.stringify({"token":token,"Name":categoryItem[i]["Category"]}));
    }
}

function buyProduct(i){
    let x = "حداکثر تعداد قابل سفارش : "
    let count = window.prompt("چند عدد از این محصول میخواهید.",x + productItem[i]["Amount"])
    let token = getCookie("token");
    if(token != "" && count != null && count != ""){
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "buy.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                window.alert("محصول مورد نظر با موفقیت خریداری شد.")
                const newDiv = document.createElement("div");
                newDiv.innerText = 1;
                let xh = new XMLHttpRequest();
                xh.open("GET", "product.php", true);
                xh.setRequestHeader("Content-Type", "application/json");
                xh.onreadystatechange = function () {
                    if (xh.readyState === 4 && xhr.status === 200) {
                        var json = JSON.parse(xh.responseText);
                        pagingC(newDiv,json.length,json,0);
                
                    }
                };
                xh.send();
            }
            else if(xhr.readyState === 4 && xhr.status === 403)
                window.alert("لطفا مجددا وارد صفحه حساب کاربری شوید.")
            
            if(xhr.readyState === 4 && xhr.status === 405){
                window.alert("موجودی شما کمتر از قیمت محصول است.")
            }
            if(xhr.readyState === 4 && xhr.status === 406){
                window.alert("درخواست بیش از حد موجودی است.")
            }
        };
        xhr.send(JSON.stringify({"token":token,"count":count, "Name": productItem[i]["Name"]}));
    }
    if(token == ""){
        window.alert("لطفا وارد صفحه حساب کاربری شوید.")
    }
}

function searchTra(){
    let token = getCookie("token");
    if(token != null){
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "search_tra.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var json = JSON.parse(xhr.responseText);
                compnent = document.getElementById('transaction-a')
                compnent.innerHTML =  "<div style='font-size: 0; margin-top: 20px;'>"
                    +"<input dir = 'rtl' id = 'search-tra' type='text' placeholder='کد پیگیری را وارد کنید ... ' name='search-code' class = 'field-input'>"
                    +"<label class='field-title search-field' onclick='searchTra()' for='search-code'>جستجو</label>" 
                +"</div>"
                compnent.innerHTML = compnent.innerHTML + "<div class='items-p main-item'>"
                    +"<div class='item-detail-p item-detail-a'>آدرس ارسال شده</div>"
                    +"<div class='item-detail-p item-detail-a'>خریدار</div>"
                    +"<div class='item-detail-p item-detail-a'>قیمت پرداخت شده</div>"
                    +" <div class='item-detail-p item-detail-a'>کالا</div>"
                    +"<div class='item-detail-p item-detail-a'>کد پیگیری</div>"
                +"</div>";
                for(let i =0 ; i<json.length ; i++){
                    compnent.innerHTML = compnent.innerHTML +  "<div class='items-p'>"
                        +" <div dir = 'rtl' class='item-detail-p item-detail-a'>" + json[i]['Address'] + "</div>"
                        +"<div dir = 'rtl' class='item-detail-p item-detail-a'>"+ json[i]['FirstName'] + " " + json[i]['LastName'] +"</div>"
                        +"<div dir='rtl' class = 'item-detail-p item-detail-a'>" + json[i]['Price'] + "</div>"
                        +"<div dir='rtl' class='item-detail-p item-detail-a'>"+ json[i]['ProName'] + "</div>"
                        +"<div class='item-detail-p item-detail-a'>" + json[i]['ID']+ "</div>"
                    +"</div>"
                }
                
            }
            else if(xhr.readyState === 4 && xhr.status === 403){
                window.alert(xhr.responseText)
            }
        };
        xhr.send(JSON.stringify({"token" : token, "tra" : document.getElementById("search-tra").value}));
    }

}