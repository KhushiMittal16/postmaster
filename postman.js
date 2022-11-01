console.log("welcome to postmaster");
let parameterBox = document.getElementById("parameterBox");
parameterBox.style.display = "none"; //to hide parameter box initially

//utility functions
//utility function to get dom element from string
function getElementFromString(str) {
  let div = document.createElement("div");
  div.innerHTML = str;
  return div.firstElementChild;
}

//initialize number of parameter
let addedParamCount = 0;

//if user clicks params hide json box
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "none";
  document.getElementById("parameterBox").style.display = "block";
});

//if user clicks json hide params box
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
  document.getElementById("parameterBox").style.display = "none";
  document.getElementById("requestJsonBox").style.display = "block";
});

//if user clicks on + btn they should be able to add new parameters
let addParams = document.getElementById("addParams");
addParams.addEventListener("click", () => {
  let params = document.getElementById("params");
  let str = `<div class="input-group my-2">
                <label for="url" class="col-sm-2 col-form-label">Parameter ${
                  addedParamCount + 2
                }</label>
                <input type="text" aria-label="First name" class="form-control mr-3" id="parameterKey${
                  addedParamCount + 2
                }"
                    placeholder="Enter parameter  ${addedParamCount + 2} key">
                <input type="text" aria-label="Last name" class="form-control mx-3" id="parameterValue${
                  addedParamCount + 2
                }"
                    placeholder="Enter parameter ${addedParamCount + 2} value">
                <button class="btn btn-primary deleteParam">-</button>
            </div>`;
  let paramElement = getElementFromString(str);
  params.appendChild(paramElement);
  //add an eventListener on clicking -
  let deleteParam = document.getElementsByClassName("deleteParam");
  for (item of deleteParam) {
    item.addEventListener("click", (e) => {
      //   if(window.confirm("are you sure you want to delete this param???")) {
      console.log("done");
      e.target.parentElement.remove();
      //   }
    });
  }
  addedParamCount++;
});

//if user clicks submit
let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  //show "please wait(loading)" in response box
  document.getElementById("responseText").value =
    "please wait... we are fetching response";
  let url = document.getElementById("url").value;
  let requestType = document.querySelector(
    `input[name="reqType"]:checked`
  ).value;
  let contentType = document.querySelector(
    `input[name="contentType"]:checked`
  ).value;

  //collect all the params in an obj
  if (contentType == "params") {
    data = {};
    for (let i = 0; i < addedParamCount + 1; i++) {
      if (document.getElementById("parameterKey" + (i + 1)) != undefined) {
        let key = document.getElementById("parameterKey" + (i + 1)).value;
        let value = document.getElementById("parameterValue" + (i + 1)).value;
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  } else {
    data = document.getElementById("requestJsonText").value;
  }

  //clg all values in console
  console.log("url", url);
  console.log("request", requestType);
  console.log("content", contentType);

  //if reqType==get invoke fetch api we have to create a get request
  if (requestType == "GET") {
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.text())
      .then((text) => {
        document.getElementById("responseText").value = text;
        console.log(text)
      });
  } else {
    fetch(url, {
      method: "POST",
      data: data,
      headers: { "content-type": "application/json;charset=UTF-8" },
    })
      .then((res) => res.text())
      .then((text) => {
        document.getElementById("responseText").value = text;
        console.log(text)
      });
  }
  console.log("data", data);
  //if reqType==post invoke fetch api we have to create a post request
});
