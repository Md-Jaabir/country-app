let countryName=getParams().name.replaceAll("%20"," ");
let country;
let counties;
let details=document.querySelector(".details");
findCountry(countryName);


function findCountry(countryName){
    
    fetch("./data.json").then(data=>data.json())
    .then(countiesList=>{
        counties=countiesList;
        country= countiesList.find(cntry=>{
            return cntry.name===countryName;
        });
        console.log(country);
        setData(country);
    })
    .catch(err=>alert(err));
}

function setData(country){
    details.innerHTML=`<img class="flag" src="${country.flags.png}" alt="flag">
    <div class="description">
        <h2 class="name">${country.name}</h2>
        <div class="columns">
            <div class="left">
                <p class="native-name"><strong>Native Name: </strong>${country.nativeName}</p>
                <p class="populaition"><strong>Population: </strong>${commaSeparate(country.population)}</p>
                <p class="region"><strong>Region: </strong>${country.region}</p>
                <p class="sub-region"><strong>Sub Region: </strong>${country.subregion}</p>
                <p class="capital"><strong>capital: </strong>${country.capital}</p>
            </div>
            <div class="right">
                <p class="top-domain"><strong>Top Level Domail: </strong>${country.topLevelDomain.map(domain=>domain).join(", ")}</p>
                <p class="currencies"><strong>Currencies: </strong>${country.currencies.map(currency=>currency.name).join(", ")}</p>
                <p class="languages"><strong>Language: </strong>${country.languages.map(language=>language.name).join(", ")}</p>
            </div>
        </div>
        <div class="border-countires">  
            <p class="title"><strong>Border Countries: </strong></p>
            <div class="border-list">

            </div>
        </div>
    </div>`;
    setBorderCountries(country);
}

function setBorderCountries(country){
    let borderCountries=country.borders;
    if(!borderCountries) return;
    borderCountries=borderCountries.map(code=>{
        let desiredCountry=counties.find(country=>country.alpha3Code===code);
        return desiredCountry.name;
    });
    document.querySelector(".border-list").innerHTML=borderCountries.map(country=>{
        return `<div class="country-name">${country}</div>`;
    }).join("");
}