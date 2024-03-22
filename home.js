let searchForm=document.querySelector("form.search");
let searchInput=document.querySelector(".search input");
let menu=document.querySelector(".dropdown .menu");
let menuItems=document.querySelectorAll(" .menu .item");
let currentCountries;
fetchCountries();
function fetchCountries(){
    fetch("./data.json").then(data=>data.json())
    .then(countries=>{
      currentCountries=countries;
        showData(countries);
    })
    .catch(err=>alert(err));
}

function search(query){
  
        let counties=currentCountries.filter(country=>{
          return country.name.common.toLowerCase().includes(query.toLowerCase());
          
        });
        showData(counties);
}

function showData(counties){
  countryCont.innerHTML=counties.map(country=>{
            return `<div class="country" onclick="openCountry('${country.name.common}')">
            <img src="${country.flags.png}" alt="">
            <div class="desc">
                <h3>${country.name.common}</h3>
                <p class="population"><strong>Population:</strong> ${country.population?commaSeparate(country.population):"N/A"}</p>
                <p class="region"><strong>Region:</strong> ${country.region?country.region:"N/A"}</p>
                <p class="capital"><strong>Capital:</strong> ${country.capital?country.capital:"N/A"}</p>
            </div>
        </div>`;
        }).join("");
}

function toggleDropdown(){
  menu.classList.toggle("hide");
}

function filterByRegion(region){
  fetch("./data.json").then(data=>data.json())
    .then(countiesArr=>{
        let counties=countiesArr.filter(country=>{
          return country.region.toLowerCase()===region.toLowerCase();
          
        });
        currentCountries=counties;
        showData(counties);
    })
    .catch(err=>alert(err));
}

searchForm.addEventListener("submit",(event)=>{
  event.preventDefault();
  search(searchInput.value);
});
menuItems.forEach(item=>{
  item.addEventListener("click",(event)=>{
    if(event.target.innerText=="All"){
      fetchCountries();
    }else{
      filterByRegion(event.target.innerText);
    }
    document.querySelector(".dropdown span").innerText=event.target.innerText;
  });
})