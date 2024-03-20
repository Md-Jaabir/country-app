fetchCountries();

function fetchCountries(){
    fetch("./data.json").then(data=>data.json())
    .then(counties=>{
        console.log(counties[0]);
        countryCont.innerHTML=counties.map(country=>{
            return `<div class="country" onclick="openCountry('${country.name}')">
            <img src="${country.flags.png}" alt="">
            <div class="desc">
                <h3>${country.name}</h3>
                <p class="population"><strong>Population:</strong> ${commaSeparate(country.population)}</p>
                <p class="region"><strong>Region:</strong> ${country.region}</p>
                <p class="capital"><strong>Capital:</strong> ${country.capital}</p>
            </div>
        </div>`;
        }).join("");
    })
    .catch(err=>alert(err));
}