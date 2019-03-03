var apikey = "4d59e65a82617e3bbc45a3870fc05ada";
var apiurl = "https://api.openweathermap.org/data/2.5/weather?"
var countryJSON = "https://raw.githubusercontent.com/andrewlin94/andrewlin94.github.io/master/city.list.json";
var cityList = [];
var countryList = [];
var codeList = [];
populateCountryList();
function getWeather() { 
  // let location = "zip=" + document.getElementById("zipcode").value + "," + document.getElementById("countrycode").value;
  let selectedCity = document.getElementById("citySelect").value;
  let location = "id=" + selectedCity;
  let url =  apiurl + location + "&units=metric" + "&appid=4d59e65a82617e3bbc45a3870fc05ada";
  fetch(url).then(response => {
    return response.json();
  }).then(data => {
    // Work with JSON data here
    console.log(data);
    document.getElementById("latitude").value = data.coord.lat + String.fromCharCode(176);
    document.getElementById("longitude").value = data.coord.lon + String.fromCharCode(176);
    document.getElementById("temp").value = data.main.temp +  String.fromCharCode(176) + "C";
    document.getElementById("humid").value = data.main.humidity + String.fromCharCode(37);
    document.getElementById("condition").value = data.weather[0].main;
    document.getElementById("wspeed").value = data.wind.speed + " m/s";
    document.getElementById("wdir").value = data.wind.deg + String.fromCharCode(176);    
  }).catch(err => {
    // Do something for an error here
    console.log("Invalid Location");
    console.log(err);
  });
}
function populateCountryList() {
  $.getJSON("https://raw.githubusercontent.com/andrewlin94/andrewlin94.github.io/master/iso3166-country-code.json", function(json) {
    for (let index in json) {
      if (json.hasOwnProperty(index)) {
        let item = json[index];
        // console.log(countryList.indexOf(item.country));
        if (codeList.indexOf(item["alpha-2"]) == -1 && item["alpha-2"] != "" && item.name != "") {
          let code = item["alpha-2"];
          codeList[code] = item.name;
        }
      }
    }
  });
  codeList["XK"] = "Kosovo";
  $.getJSON(countryJSON, function(json) {
    for (let index in json) {
      if (json.hasOwnProperty(index)) {
        let item = json[index];
        // console.log(countryList.indexOf(item.country));
        // console.log(item.country);
        if (countryList.indexOf(item.country) == -1 && item.country != "") {
          countryList.push(item.country);
        }
      }
    }
    countryList.sort();
    let select = document.getElementById("countrySelect");
    for (let i = 0; i < countryList.length; ++i) {
      let currentCountry = countryList[i];
      let opt = codeList[currentCountry];
      let el = document.createElement("option");
      el.textContent = opt; 
      el.value = opt;
      select.add(el);
    }
  });
}
function populateCityList(country) {
  // console.log(country);
  let select = document.getElementById("citySelect");
  let length = select.options.length;
  cityList = [];
  for (let i = 0; i < length; ++i) {
    select.remove(0);
  }
  let emptyEle = document.createElement("option");
  emptyEle.textContent = "Choose your city";
  select.add(emptyEle);
  $.getJSON(countryJSON, function(json) {
    for (let name in json) {
      if (json.hasOwnProperty(name)) {
        let item = json[name];
        let selectedCountry = countryList[country];
        if (item.country == selectedCountry) {
          cityList.push({
            name: item.name,
            id: item.id
          });
        }
      }
    }
    cityList.sort();
    let select = document.getElementById("citySelect");
    for (let i = 0; i < cityList.length; ++i) {
      let opt = cityList[i].name;
      let el = document.createElement("option");
      el.textContent = opt;
      el.value = cityList[i].id;
      select.add(el);
    }
  });
}
// function removeSelect() {
//   var select = document.getElementById("citySelect");
//   select.remove(0);
// }