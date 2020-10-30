var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=EdvkBV3dUNUzQxIpc9g87eE2JZnkHexAZ_aH3RHiSr8";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
      // TODO: ADD FUNCTION, ETC. FOR WHATEVER YOU WANT TO DO ONCE THE DATA IS RECEIVED
      const plantData = JSON.parse(request.response).data;
      build(plantData);
    })
);

//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////
const build = (plantData) => {
  console.log(plantData);
  console.log(plantData.sort(function(a, b) {
    return a.common_name.localeCompare(b.common_name);
  }));

  plantData.forEach(element => {
    let div = document.createElement('div');
    div.id = 'child';

    let name = document.createElement('p')
    name.innerHTML = element.common_name;
    div.appendChild(name);

    let img = document.createElement('img')
    img.src = element.image_url;
    img.width = 400;
    div.appendChild(img);

    document.getElementById("flex").appendChild(div);
  });
}