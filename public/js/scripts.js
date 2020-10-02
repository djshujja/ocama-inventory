function onSlideMenu() {
  document.getElementById("menu").style.width = "250px";
  document.getElementById("slide").style.visibility = "hidden";
}
function closeSlideMenu() {
  document.getElementById("menu").style.width = "0";
  document.getElementById("slide").style.visibility = "visible";
}

let name, prodID, qty, unitPrice, unit, purchasedPrice;
let partyname, personToContact, address, telephone, mobile, email, website;
let fetchingDate;

// POST data of Product & Customer
async function submitData() {
  name = document.getElementById("productName").value;
  // prodID = document.getElementById("productId").value;
  qty = document.getElementById("qty").value;
  unit = document.getElementById("unit").value;
  unitPrice = document.getElementById("unitPrice").value;
  purchasedPrice = document.getElementById("purchasedPrice").value;
  partyName = document.getElementById("partyName").value;
  personToContact = document.getElementById("personToContact").value;
  address = document.getElementById("address").value;
  telephone = document.getElementById("telephone").value;
  mobile = document.getElementById("mobile").value;
  email = document.getElementById("email").value;
  website = document.getElementById("website").value;
  // nameAddress = document.getElementById("nameAddress").value;
  // refNo = document.getElementById("refNo").value;
  // ref = document.getElementById("ref").value;

  data = {
    name: name,
    qty: qty,
    unit: unit,
    unitPrice: unitPrice,
    purchasedPrice: purchasedPrice,
    partyName: partyName,
    personToContact: personToContact,
    address: address,
    telephone: telephone,
    mobile: mobile,
    email: email,
    website: website,
    // nameAddress: nameAddress,
    // refNo: refNo,
    // ref: ref,
  };
  console.log(data);
  await fetch("http://localhost:8000/inventory", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  await renderProducts();
}

// Fetching API (Products)
async function API() {
  console.log("API Called");
  await fetch("http://localhost:8000/inventory")
    .then((response) => response.json())
    .then((json) => {
      return (data = json);
    });
  return data;
}

// To Render Products on Table
async function renderProducts() {
  let a = await API();

  let html = "";
  a.forEach((product) => {
    let htmlSegment = `
            <tr class="singleRow">
              <th scope="row">${product.productId}</th>
              <td>${product.name}</td>
              <td>${product.qty}</td>
              <td>${product.unit}</td>
              <td><button class="btn btn-danger">Remove</button></td>
            </tr>
            `;

    html += htmlSegment;
  });

  let productsRow = document.querySelector(".products-row");
  productsRow.innerHTML = html;

  ///REMOVE TABLE ROW

  var removeCartItemButtons = document.getElementsByClassName("btn-danger");
  for (i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", function (event) {
      var buttonClicked = event.target.parentElement.parentElement.remove();
    });
  }
}

async function fetchDate() {
  fetchingDate = document.getElementById("slipDate").value;
  if (fetchingDate == "" || fetchingDate == null) {
    return alert("Please enter a valid date");
  }
  let myData = {
    date: fetchingDate,
  };

  await fetch("http://localhost:8000/inventory/find", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(myData),
  })
    .then((response) => response.json())
    .then((data) => {
      sessionStorage.setItem("slip", JSON.stringify(data));
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  window.location.href = "/the-slip";
  // console.log(sessionStorage.getItem("slip"));
}

async function renderSlip() {
  let items = JSON.parse(sessionStorage.getItem("slip"));
  console.log(items);
  let html = "";
  items.forEach((item, index) => {
    let htmlSegment = `
            <tr>
            
            <th scope="row">${index + 1}</th>
            <td>${item.name}</td>

            <td>${item.unit}</td>
              <td>${item.qty}</td>
              <td>${item.unitPrice}</td>
            </tr>
            `;

    html += htmlSegment;
  });

  let productsRow = document.querySelector(".products-row");
  productsRow.innerHTML = html;
}
