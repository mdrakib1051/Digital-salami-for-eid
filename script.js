import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onValue, query, limitToLast } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const leaderboardRef = ref(db, 'leaderboard');

let savedName = '', savedDistrict = '', currentAmount = 0, rolling = false;

const districtWishes = {
  Dhaka: "ঢাকাইয়া পোলা-মাইয়াদের ঈদ মানেই তো জোসস! ঈদ মোবারক!",
  Chattogram: "চাটগাঁইয়া পোয়া-মাইয়াদের ঈদটা একদম ফুর্তির অইক! মেজবানি ঈদ কাটান।",
  Noakhali: "তুমার ঈদডা একদম জুইত কইরা কাটুক! নোয়াখাইল্লা ত্যাজে ঈদ ফাডায় ফেলো।",
  Sylhet: "আফনার ঈদখান আমরার সিলেটি চায়ের মতই আরামদায়ক আর মিষ্টি হউক।",
  default: "চাঁদের আলো আর ঈদের খুশি ছড়িয়ে পড়ুক আপনার জীবনে। ঈদ মোবারক!"
};

// Navigation
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

document.getElementById('goInfoBtn').addEventListener('click', () => showPage('page2'));

document.getElementById('saveInfoBtn').addEventListener('click', () => {
  savedName = document.getElementById('nameInput').value.trim();
  savedDistrict = document.getElementById('districtInput').value;
  if (!savedName || !savedDistrict) return alert("সব তথ্য দিন!");
  showPage('page3');
});

document.getElementById('spinBtn').addEventListener('click', () => {
  if (rolling) return;
  rolling = true;
  document.getElementById('spinBtn').disabled = true;
  const slots = [document.getElementById('slot1'), document.getElementById('slot2'), document.getElementById('slot3')];
  
  slots.forEach(s => s.classList.add('spinning'));
  let spinCount = 0;
  let interval = setInterval(() => {
    slots.forEach(s => s.textContent = Math.floor(Math.random() * 10));
    spinCount++;
    if (spinCount > 20) {
      clearInterval(interval);
      finalizeSpin(slots);
    }
  }, 100);
});

function finalizeSpin(slots) {
  // Show Domino Loader
  document.getElementById('loaderOverlay').classList.remove('hidden');

  currentAmount = Math.floor(Math.random() * 900) + 100;
  const amtStr = String(currentAmount);
  slots.forEach((s, i) => {
    s.classList.remove('spinning');
    s.textContent = amtStr[i];
  });

  push(leaderboardRef, { name: savedName, district: savedDistrict, amount: currentAmount });

  setTimeout(() => {
    document.getElementById('loaderOverlay').classList.add('hidden');
    showPage('page4');
    renderCard();
  }, 2500);
}

function renderCard() {
  document.getElementById('cardName').textContent = savedName;
  document.getElementById('cardDistrict').textContent = savedDistrict;
  document.getElementById('amountText').textContent = '৳ ' + currentAmount;
  document.getElementById('cardBox').classList.remove('hidden');
  document.getElementById('leaderboardBox').classList.remove('hidden');
  document.getElementById('shareBox').classList.remove('hidden');
  document.getElementById('createdBy').classList.remove('hidden');
  
  const wish = districtWishes[savedDistrict] || districtWishes.default;
  typeWriter(wish);
}

function typeWriter(text) {
  const el = document.getElementById('typedWish');
  el.textContent = ''; let i = 0;
  let timer = setInterval(() => {
    el.textContent += text.charAt(i); i++;
    if (i >= text.length) clearInterval(timer);
  }, 50);
}

// Leaderboard Realtime
const q = query(leaderboardRef, limitToLast(5));
onValue(q, (snapshot) => {
  const data = snapshot.val();
  const list = document.getElementById('leaderboardList');
  if(!data) return;
  list.innerHTML = Object.values(data).reverse().map(item => `
    <div style="background:rgba(255,255,255,0.05); padding:10px; border-radius:10px; margin-bottom:10px; display:flex; justify-content:space-between;">
      <span>${item.name} (${item.district})</span>
      <strong>৳ ${item.amount}</strong>
    </div>
  `).join('');
});

window.shareSocial = (p) => {
  const url = window.location.href;
  const msg = `আমি জিতেছি ৳${currentAmount} ডিজিটাল সালামি!`;
  if(p==='fb') window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
  if(p==='wa') window.open(`https://wa.me/?text=${msg} ${url}`);
};
