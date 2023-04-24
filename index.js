var image = document.querySelector("#image1");
var encodedImg = document.querySelector("#image2");
var arr;
var key = document.querySelector("#inputKey")
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.querySelector("#image1").src = e.target.result;
    };
  }
  reader.readAsDataURL(input.files[0]);
}

function beforeDecode(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.querySelector(".opa").src = e.target.result;
      decode(input)
    };
  }
  reader.readAsDataURL(input.files[0]);
}

function decode(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.querySelector(".opa").src = e.target.result
      console.log(steg.decode(e.target.result))
      console.log(typeof (steg.decode(e.target.result)))
      arr = steg.decode(e.target.result).split("-#*")
    };
  }
  reader.readAsDataURL(input.files[0]);
}

function showMessage() {
  if (arr[0] == key.value) {
    document.querySelector('#decoded').innerText = arr[1]
  }
  else {
    alert("Invalid Key")
    key.value = ""
    return
  }
}

function saveImg() {
  const a = document.createElement("a")
  document.body.appendChild(a)
  a.href = encodedImg.src
  console.log(a.href)
  a.download = "encoded-image.png"
  a.click()
  document.body.removeChild(a)
  sendEmail()
}

function hideText() {
  valu = document.querySelector('#key').value + "-#*" + document.querySelector('#message').value
  document.querySelector("#image2").src = steg.encode(valu, image);
}

function sendEmail() {
  Email.send({
    Host: "smtp.gmail.com",
    Username: "bishalw74@gmail.com",
    Password: "143bishal",
    To: document.querySelector('#email').value,
    From: "bishalw74@gmail.com",
    Subject: "Encoding key",
    Body: document.querySelector('#key').value,
  })
    .then(function (message) {
      alert("mail sent successfully")
    })
}
