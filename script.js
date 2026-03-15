import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onValue, query, limitToLast } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// --- ফায়ারবেস কনফিগ (এখানে তোমার কনফিগ বসাবে) ---
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

// আঞ্চলিক উইশ লিস্ট
const districtWishes = {
  Dhaka: "খাওয়ায়-দাওয়ায় তোমার ঈদটা পুরান ঢাকার বাকরখানির মতই খাস্তা আর মিষ্টি হোক! ঈদ মোবারক!",
  Chattogram: "চাটগাঁইয়া পোয়া-মাইয়াদের ঈদ মানেই তো ফুর্তি! মেজবানি স্টাইলে ঈদ কাটাও, আল্লাহ তোয়ারে ভালে রাখুক।",
  Sylhet: "আফনার ঈদখান আমরার সিলেটি চায়ের মতই আরামদায়ক আর মিষ্টি হউক। আল্লাহ আফনারে খুশিতে রাখউক্কা।",
  Barishal: "মোগো বরিশালের পোলা-মাইয়ারা সব সময়ই সেরা। ঈদডা একদম জমজমাট কইরা কাটাও!",
  Noakhali: "তুমার ঈদডা জুইত কইরা কাটুক, সুখে-শান্তিতে থাকো। নোয়াখাইল্লা ত্যাজে ঈদ ফাডায় ফেলো!",
  Cumilla: "কুমিল্লার খদ্দরের মতই তোমার ঈদটা স্নিগ্ধ আর রসমালাইয়ের মত মিষ্টি হোক।",
  Rajshahi: "রাজশাহীর আমের মতই মিষ্টি একটা ঈদ উপহার দিচ্ছি তোমাকে। খুশিতে ভরে উঠুক তোমার মন।",
  Khulna: "সুন্দরবনের স্নিগ্ধতা আর খুলনার আতিথেয়তায় ভরে উঠুক তোমার এবারের ঈদ।",
  default: "চাঁদের আলো আর ঈদের খুশি ছড়িয়ে পড়ুক আপনার জীবনের প্রতিটি দিনে। ঈদ মোবারক!"
};

// পেজ চেঞ্জ ফাংশন
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ইভেন্ট লিসেনারস
document.getElementById('goInfoBtn').addEventListener('click', () => showPage('page2'));

document.getElementById('saveInfoBtn').addEventListener('click', () => {
  savedName = document.getElementById('nameInput').value.trim();
  savedDistrict = document.getElementById('districtInput').value;
  if (!savedName || !savedDistrict) return alert("দয়া করে নাম এবং জেলা সঠিক ভাবে দিন!");
  
  document.getElementById('welcomeBox').classList.remove('hidden');
  document.getElementById('welcomeBox').innerHTML = `স্বাগতম <b>${savedName}</b>! স্পিন করার জন্য প্রস্তুত হন।`;
  setTimeout(() => showPage('page3'), 1200);
});

document.getElementById('spinBtn').addEventListener('click', () => {
  if (rolling) return;
  rolling = true;
  document.getElementById('spinBtn').disabled = true;
  const slots = [document.getElementById('slot1'), document.getElementById('slot2'), document.getElementById('slot3')];
  
  slots.forEach(s => s.classList.add('spinning'));
  let spinCount = 0;
  let spinInterval = setInterval(() => {
    slots.forEach(s => s.textContent = Math.floor(Math.random() * 10));
    spinCount++;
    if (spinCount > 20) {
      clearInterval(spinInterval);
      finalizeSpin(slots);
    }
  }, 100);
});

function finalizeSpin(slots) {
  currentAmount = Math.floor(Math.random() * 900) + 100;
  const amtStr = String(currentAmount);
  slots.forEach((s, i) => {
    s.classList.remove('spinning');
    s.textContent = amtStr[i];
  });

  // ফায়ারবেসে ডাটা সেভ করা (পাবলিক লিডারবোর্ড)
  push(leaderboardRef, { name: savedName, district: savedDistrict, amount: currentAmount });

  setTimeout(() => {
    showPage('page4');
    renderCard();
  }, 1000);
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

// রিয়েল-টাইম লিডারবোর্ড আপডেট
const q = query(leaderboardRef, limitToLast(7));
onValue(q, (snapshot) => {
  const data = snapshot.val();
  const list = document.getElementById('leaderboardList');
  if (!data) { list.innerHTML = "No winners yet!"; return; }
  list.innerHTML = Object.values(data).reverse().map(item => `
    <div class="leaderboard-item">
      <span>${item.name} (${item.district})</span>
      <strong>৳ ${item.amount}</strong>
    </div>
  `).join('');
});

// সোশ্যাল শেয়ার
window.shareSocial = function(platform) {
  const msg = `আমি জিতেছি ৳${currentAmount} ডিজিটাল সালামি! আপনারটা চেক করুন এই লিঙ্কে: ${window.location.href}`;
  if (platform === 'fb') window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`);
  if (platform === 'wa') window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`);
  if (platform === 'copy') {
    navigator.clipboard.writeText(msg);
    alert("লিঙ্ক কপি হয়েছে! এখন বন্ধুদের পাঠান।");
  }
};
