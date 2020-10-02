function onSlideMenu() {
  document.getElementById("menu").style.width = "250px";
  document.getElementById("slide").style.visibility = "hidden";
}
function closeSlideMenu() {
  document.getElementById("menu").style.width = "0";
  document.getElementById("slide").style.visibility = "visible";
}

let name, prodID, qty, unitPrice, unit, purchasedPrice;
let partyname,
  personToContact,
  address,
  telephone,
  mobile,
  email,
  website,
  refNo,
  ref,
  nameAddress;
let fetchingDate;

// POST data of Product & Customer
async function submitData() {
  name = document.getElementById("productName").value;
  // prodID = document.getElementById("productId").value;
  qty = document.getElementById("qty").value;
  unit = document.getElementById("unit").value;
  unitPrice = document.getElementById("unitPrice").value;
  // purchasedPrice = document.getElementById("purchasedPrice").value;
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
    // purchasedPrice: purchasedPrice,
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
  a.forEach((product, i) => {
    let htmlSegment = `
            <tr class="singleRow">
              <th scope="row">${i + 1}</th>
              <td>${product.name}</td>
              <td>${product.qty}</td>
              <td>${product.unit}</td>
              <td>${product.unitPrice}</td>
              <td>${product.personToContact}</td>
              <td>${product.partyName}</td>
              <td>${product.mobile}</td>
              <td>${product.telephone}</td>
              <td>${product.email}</td>
              <td>${product.website}</td>
              <td>${product.address}</td>
                         </tr>
            `;

    html += htmlSegment;
  });

  let productsRow = document.querySelector(".products-row");
  productsRow.innerHTML = html;

  //DataTable
  $("#database-table").DataTable();
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
  ref = document.getElementById("ref").value;
  refNo = document.getElementById("refNo").value;
  nameAddress = document.getElementById("nameAddress").value;

  let GenInfo = {
    nameAddress: nameAddress,
    ref: ref,
    refNo: refNo,
  };

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

  sessionStorage.setItem("GetInfo", JSON.stringify(GenInfo));

  window.location.href = "/the-slip";
}

async function renderSlip() {
  let GetFinalInfo = JSON.parse(sessionStorage.getItem("GetInfo"));

  console.log(GetFinalInfo.refNo);
  let GetRefNoID = document.getElementById("refNoID");
  GetRefNoID.innerHTML = `<p>${GetFinalInfo.refNo}</p>`;

  let GetRefID = document.getElementById("refID");
  GetRefID.innerHTML = `<p>Ref: ${GetFinalInfo.ref}</p>`;

  let GetAddressNameID = document.getElementById("addressNameID");
  GetAddressNameID.innerHTML = `<p>${GetFinalInfo.nameAddress}</p>`;

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

// function searchTable() {
//   document.getElementById("search-input").addEventListener("keyup", () => {
//     let value = this.value;
//     console.log(value);
//   });

// }

// $(document).ready(function () {
//   $("#database-table").DataTable();
// });
