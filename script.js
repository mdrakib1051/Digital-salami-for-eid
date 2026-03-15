import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onValue, query, limitToLast } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// --- ফায়ারবেস কনফিগ ---
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

// DOM Elements (আগে যা ছিল)
const pages = [document.getElementById('page1'), document.getElementById('page2'), document.getElementById('page3'), document.getElementById('page4')];
const slotEls = [document.getElementById('slot1'), document.getElementById('slot2'), document.getElementById('slot3')];
let savedName = '', savedDistrict = '', currentAmount = 0, rolling = false;

// আঞ্চলিক ভাষা (Updated)
const districtWishes = {
  Dhaka: "ঢাহাইয়া ঢঙে কই — তোমার ঈদটা জোসস হোক, সুখে-শান্তিতে ভইরা যাক সবকিছু।",
  Chattogram: "চাটগাঁইয়া কই — তুমার ঈদডা অনেক ফুর্তির আর বরকতের অইক, আল্লাহ ভালে রাখুক।",
  Sylhet: "সিলেটি ঢঙে কই — আফনার ঈদখান মজা আর রহমতে ভইরা যাউক।",
  Barishal: "বরিশালের ভাষায় কই — তোমার ঈদডা নদীর হাওয়ার মতন ঠাণ্ডা শান্তি নিয়া আইব।",
  Noakhali: "নোয়াখাইল্লা টানে কই — তুমার ঈদডা অনেক সুন্দর অইক, সুখে শান্তিতে যাক।",
  default: "আপনার ঈদ হোক আনন্দ, দোয়া, ভালোবাসা আর অগণিত সুখে ভরা।"
};

function changePage(curr, next) {
  curr.classList.remove('active'); curr.classList.add('exit-left');
  setTimeout(() => { next.classList.add('active'); }, 220);
}

document.getElementById('goInfoBtn').addEventListener('click', () => changePage(pages[0], pages[1]));

document.getElementById('saveInfoBtn').addEventListener('click', () => {
  savedName = document.getElementById('nameInput').value.trim();
  savedDistrict = document.getElementById('districtInput').value;
  if (!savedName || !savedDistrict) return alert('আগে সব তথ্য দিন।');
  document.getElementById('welcomeBox').classList.remove('hidden');
  document.getElementById('welcomeBox').innerHTML = `<b>${savedName}</b> — ready for spin ✨`;
  setTimeout(() => changePage(pages[1], pages[2]), 900);
});

document.getElementById('spinBtn').addEventListener('click', () => {
  if (rolling) return;
  rolling = true;
  document.getElementById('spinBtn').disabled = true;
  document.getElementById('statusText').textContent = 'আপনার salami তৈরি হচ্ছে...';

  slotEls.forEach(s => s.classList.add('spinning'));
  const spinInterval = setInterval(() => {
    slotEls.forEach(s => s.textContent = Math.floor(Math.random() * 10));
  }, 90);

  currentAmount = Math.floor(Math.random() * 900) + 100;
  const formatted = String(currentAmount);

  setTimeout(() => {
    clearInterval(spinInterval);
    slotEls.forEach((s, i) => {
      s.classList.remove('spinning');
      s.textContent = formatted[i];
    });

    // ফায়ারবেসে সেভ (Public)
    push(leaderboardRef, { name: savedName, district: savedDistrict, amount: currentAmount });

    setTimeout(() => {
      changePage(pages[2], pages[3]);
      revealFinalFlow();
    }, 700);
  }, 3000);
});

function revealFinalFlow() {
  document.getElementById('amountText').textContent = '৳ ' + currentAmount;
  document.getElementById('cardName').textContent = savedName;
  document.getElementById('cardDistrict').textContent = savedDistrict;
  document.getElementById('cardBox').classList.remove('hidden');
  document.getElementById('cardBox').classList.add('show');
  
  const wish = districtWishes[savedDistrict] || districtWishes.default;
  setTimeout(() => {
    typeWriter(wish);
    document.getElementById('leaderboardBox').classList.remove('hidden');
    document.getElementById('shareBox').classList.remove('hidden');
    document.getElementById('createdBy').classList.remove('hidden');
  }, 900);
}

function typeWriter(text) {
  const el = document.getElementById('typedWish');
  el.textContent = ''; let i = 0;
  let timer = setInterval(() => {
    el.textContent += text.charAt(i); i++;
    if (i >= text.length) clearInterval(timer);
  }, 34);
}

// পাবলিক লিডারবোর্ড রেন্ডার
const q = query(leaderboardRef, limitToLast(7));
onValue(q, (snapshot) => {
  const data = snapshot.val();
  const list = document.getElementById('leaderboardList');
  if(!data) { list.innerHTML = "No entries yet!"; return; }
  list.innerHTML = Object.values(data).reverse().map(item => `
    <div class="leaderboard-item"><span>${item.name} (${item.district})</span><strong>৳ ${item.amount}</strong></div>
  `).join('');
});

// শেয়ার ফাংশন
window.shareSocial = function(plat) {
  const text = `আমি জিতেছি ৳${currentAmount} ডিজিটাল সালামি! লিঙ্কে দেখুন: ${window.location.href}`;
  if(plat === 'fb') window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`);
  if(plat === 'wa') window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
};
