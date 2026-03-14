const nameInput=document.getElementById('nameInput')
const saveNameBtn=document.getElementById('saveNameBtn')
const welcomeBox=document.getElementById('welcomeBox')

const spinBtn=document.getElementById('spinBtn')

const slot1=document.getElementById('slot1')
const slot2=document.getElementById('slot2')
const slot3=document.getElementById('slot3')

const resultBox=document.getElementById('resultBox')
const amountText=document.getElementById('amountText')
const resultText=document.getElementById('resultText')
const wishText=document.getElementById('wishText')

let savedName=""
let rolling=false

const wishes=[
"ঈদ মোবারক। আপনার জীবন ভরে উঠুক সুখ ও শান্তিতে।",
"এই ছোট্ট সালামির সাথে রইল অনেক দোয়া ও ভালোবাসা।",
"আপনার ঈদ হোক আনন্দে ভরা।",
"এই সালামি আপনার মুখে হাসি এনে দিক।",
"চাঁদের আলো ছড়িয়ে পড়ুক আপনার জীবনে।",
"আপনার জন্য রইল আন্তরিক ঈদের শুভেচ্ছা।"
]

saveNameBtn.onclick=function(){

const name=nameInput.value.trim()

if(!name){
alert("আগে আপনার নাম লিখুন")
return
}

savedName=name

welcomeBox.style.display="block"

welcomeBox.innerHTML="স্বাগতম <b>"+savedName+"</b> — আপনার জন্য ঈদের সালামি প্রস্তুত"

spinBtn.disabled=false

}

spinBtn.onclick=function(){

if(!savedName||rolling)return

rolling=true
spinBtn.disabled=true
spinBtn.textContent="Rolling..."

resultBox.style.display="none"

const interval=setInterval(function(){

slot1.textContent=Math.floor(Math.random()*10)
slot2.textContent=Math.floor(Math.random()*10)
slot3.textContent=Math.floor(Math.random()*10)

},90)

const finalAmount=Math.floor(Math.random()*100)+1

const formatted=String(finalAmount).padStart(3,'0')

setTimeout(function(){

clearInterval(interval)

slot1.textContent=formatted[0]
slot2.textContent=formatted[1]
slot3.textContent=formatted[2]

amountText.textContent="৳ "+finalAmount

resultText.textContent=savedName+" , আপনার জন্য আজকের ঈদ সালামি ৳ "+finalAmount

wishText.textContent="✨ "+wishes[finalAmount%wishes.length]

resultBox.style.display="block"

rolling=false
spinBtn.disabled=false
spinBtn.textContent="Spin Again"

},2500)

}
