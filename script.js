let currentTheme=localStorage.getItem("theme") || "light";
let swicthButton=document.querySelector(".mode-switch");
let countryCont=document.querySelector(".country-list");

window.onload=()=>{
    document.body.className=currentTheme;
    if(currentTheme==="light"){
        swicthButton.innerHTML=`<i class="fa-solid fa-moon"></i> Dark Mode`;
    }else{
        swicthButton.innerHTML=`<i class="fa-solid fa-sun"></i> Light Mode`;

    }
}

function themeSwitch(){
    if(currentTheme==="light"){
        currentTheme="dark";
        swicthButton.innerHTML=`<i class="fa-solid fa-sun"></i> Light Mode`;
    }else{
        currentTheme="light";
        swicthButton.innerHTML=`<i class="fa-solid fa-moon"></i> Dark Mode`;
    }
    localStorage.setItem("theme",currentTheme);
    document.body.className=currentTheme;
}

function commaSeparate(number){
    let splitedNum=number.toString().split("");
    let string="";
    let index;
    for(let i=1;i<=splitedNum.length;i++){
        index=splitedNum.length-i;
        if(i%3===0 && index!=0){
            string=","+splitedNum[index].toString()+string;
        }else{
            string=splitedNum[index].toString()+string;
        }
    }
    return string;
}

function openCountry(countryName){
    window.open(`./detail.html?name=${countryName}`,"_self");
}

function goBack(){
    window.open("./index.html","_self");
}

function getParams(){
    let params={};
    let arr=location.search.replace("?","").split("&");
    arr.forEach(item=>{
        let key=item.split("=")[0];
        let value=item.split("=")[1];
        params[key]=value;
    });
    return params;
}

swicthButton.addEventListener("click",themeSwitch);