const nameInput = document.getElementById("nameInput")
const districtInput = document.getElementById("districtInput")

const saveBtn = document.getElementById("saveBtn")

const spinBtn = document.getElementById("spinBtn")

const slot1 = document.getElementById("slot1")
const slot2 = document.getElementById("slot2")
const slot3 = document.getElementById("slot3")

const card = document.getElementById("card")
const amount = document.getElementById("amount")
const wish = document.getElementById("wish")

let name=""
let district=""

const wishes=[

"ঈদ মোবারক। আপনার জীবন সুখে ভরে উঠুক।",

"এই সালামির সাথে রইল অনেক ভালোবাসা।",

"আনন্দে কাটুক আপনার ঈদ।",

"আপনার জন্য রইল আন্তরিক শুভেচ্ছা।",

"আপনার জীবনে আসুক সুখ ও শান্তি।"

]


saveBtn.onclick=function(){

name=nameInput.value.trim()

district=districtInput.value

if(!name){

alert("নাম লিখুন")

return

}

if(!district){

alert("জেলা নির্বাচন করুন")

return

}

spinBtn.disabled=false

}


spinBtn.onclick=function(){

spinBtn.disabled=true

const interval=setInterval(function(){

slot1.textContent=Math.floor(Math.random()*10)

slot2.textContent=Math.floor(Math.random()*10)

slot3.textContent=Math.floor(Math.random()*10)

},100)

const result=Math.floor(Math.random()*100)+1

setTimeout(function(){

clearInterval(interval)

const num=String(result).padStart(3,"0")

slot1.textContent=num[0]
slot2.textContent=num[1]
slot3.textContent=num[2]

amount.textContent="৳"+result

wish.textContent=wishes[result%wishes.length]

card.classList.remove("hidden")

spinBtn.disabled=false

},2500)

}
