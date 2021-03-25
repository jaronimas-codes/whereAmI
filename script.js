'use strict';

// const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data) {
  const html = `
     <article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].code
            }</p>
          </div>
        </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
  console.log(alert('I know where you are!'));
};

// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText('beforeend', msg);
// };

// const renderJSON = function (url, errorMsg = 'Something went wrong!') {
//   return fetch(url).then(res => {
//     if (!res.ok) throw new Error(`${errorMsg}.${res.status}`);
//     return res.json();
//   });
// };

// ///////////////////////////////////////

// /////////////// AJAX
// // const getCountryData = function(country){

// //     const request = new XMLHttpRequest();
// //     // GET
// //     request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
// //     // SEND
// //     request.send();
// //     // LOAD
// //     request.addEventListener('load', function () {
// //       const [data] = JSON.parse(this.responseText);
// //       console.log(data);

// //       const html = `
// //      <article class="country">
// //           <img class="country__img" src="${data.flag}" />
// //           <div class="country__data">
// //             <h3 class="country__name">${data.name}</h3>
// //             <h4 class="country__region">${data.region}</h4>
// //             <p class="country__row"><span>👫</span>${(
// //               +data.population / 1000000
// //             ).toFixed(1)}</p>
// //             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
// //             <p class="country__row"><span>💰</span>${
// //               data.currencies[0].code
// //             }</p>
// //           </div>
// //         </article>`;

// //       countriesContainer.insertAdjacentHTML('beforeend', html);
// //       countriesContainer.style.opacity = 1;
// //     });

// // }

// // getCountryData('lithuania');

// // ////////// callback hell

// // const getCountryAndNeighbour = function (country) {
// //   // AJAX call country 1
// //   const request = new XMLHttpRequest();
// //   // GET
// //   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
// //   // SEND
// //   request.send();
// //   // LOAD
// //   request.addEventListener('load', function () {
// //     const [data] = JSON.parse(this.responseText);
// //     // console.log(data);

// //     // Render country
// //     renderCountry(data);

// //     //Get next country 2
// //     const neighbour = data.borders;
// //     if (!neighbour) return;
// //     // AJAX call country 2
// //     const request2 = new XMLHttpRequest();
// //     // GET
// //     request2.open(
// //       'GET',
// //       `https://restcountries.eu/rest/v2/alpha/${neighbour[0]}`
// //     );
// //     // SEND
// //     request2.send();

// //     request2.addEventListener('load', function () {
// //       const data2 = JSON.parse(this.responseText);
// //       // console.log(data2);
// //       renderCountry(data2, 'neighbour');
// //     });
// //   });
// // };

// // getCountryAndNeighbour('usa');

// // PROMISES

// const getCountryData2 = function (country) {
//   const request = fetch(`https://restcountries.eu/rest/v2/name/${country}`);
//   // console.log(request);
//   request.then(function (resultedValue) {
//     console.log(resultedValue);
//     return resultedValue.json();
//   }).then(data => {
//     renderCountry(data[0]);
//   });

// };

// getCountryData2('lithuania');

// const getCountryData2 = function (country) {
//   renderJSON(
//     `https://restcountries.eu/rest/v2/name/${country}`,
//     'Country not found'
//   )
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       if (!neighbour) throw new Error(`Neighbour does not exict!`);
//       return renderJSON(
//         `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
//         'Country2 is not found'
//       );
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 🚩🏴‍☠️🚩`);
//       renderError(`Smthng went wrong 🚩🏴‍☠️🚩${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   // getCountryData2('lithuania');
//   getCountryData2('iceland');
// });

// CHALLANGE #1
const test = [51.51753, -0.11214];
const test1 = [52.508, 13.381];
const test2 = [19.037, 72.873];
const test3 = [-33.933, 18.474];

const coords = navigator.geolocation.getCurrentPosition(position => {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  whereAmI(lat, long);
});

const whereAmI = function (lat, long) {
  // const [lat, long] = coords;
  fetch(`https://geocode.xyz/${lat},${long}?geoit=json`)
    .then(res => {
      if (!res.ok)
        throw new Error(
          `Slow down, champion! You get error ${res.status}. Only 3 requests per second, baby!`
        );
      return res.json();
    })
    .then(data => {
      // console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`)
        .then(res => res.json())
        .then(data => renderCountry(data[0]));
    })
    .catch(err => console.error(`TROUBLE:${err.message} 🛴`));
};
