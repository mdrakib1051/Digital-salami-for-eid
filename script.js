// পেজ কন্ট্রোল
function goTo(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

document.getElementById('goInfoBtn').onclick = () => goTo('page2');

document.getElementById('saveInfoBtn').onclick = () => {
  const name = document.getElementById('nameInput').value;
  const dist = document.getElementById('districtInput').value;
  if(!name || !dist) return alert("তথ্য পূরণ করুন!");
  goTo('page3');
};

// স্পিন লজিক
document.getElementById('spinBtn').onclick = function() {
  this.disabled = true;
  let count = 0;
  let timer = setInterval(() => {
    document.getElementById('slot1').innerText = Math.floor(Math.random()*10);
    document.getElementById('slot2').innerText = Math.floor(Math.random()*10);
    document.getElementById('slot3').innerText = Math.floor(Math.random()*10);
    count++;
    if(count > 20) {
      clearInterval(timer);
      finish();
    }
  }, 100);
};

function finish() {
  const loader = document.getElementById('loaderOverlay');
  loader.classList.remove('hidden');
  
  setTimeout(() => {
    loader.classList.add('hidden');
    const amount = Math.floor(Math.random() * 900) + 100;
    document.getElementById('finalAmount').innerText = amount;
    document.getElementById('finalName').innerText = document.getElementById('nameInput').value;
    document.getElementById('finalWish').innerText = "আপনার ঈদ আনন্দময় হোক!";
    goTo('page4');
  }, 2000);
}
