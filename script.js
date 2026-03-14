const page0 = document.getElementById('page0');
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const page3 = document.getElementById('page3');

const startBtn = document.getElementById('startBtn');

const nameInput = document.getElementById('nameInput');
const districtInput = document.getElementById('districtInput');
const saveInfoBtn = document.getElementById('saveInfoBtn');
const welcomeBox = document.getElementById('welcomeBox');

const spinBtn = document.getElementById('spinBtn');
const slot1 = document.getElementById('slot1');
const slot2 = document.getElementById('slot2');
const slot3 = document.getElementById('slot3');
const statusText = document.getElementById('statusText');

const wishEnvelope = document.getElementById('wishEnvelope');
const openCardBtn = document.getElementById('openCardBtn');
const wishCard = document.getElementById('wishCard');

const amountText = document.getElementById('amountText');
const cardName = document.getElementById('cardName');
const cardDistrict = document.getElementById('cardDistrict');
const typedWish = document.getElementById('typedWish');
const resultText = document.getElementById('resultText');
const cardGreeting = document.getElementById('cardGreeting');
const againBtn = document.getElementById('againBtn');

const shareBtn = document.getElementById('shareBtn');
const copyBtn = document.getElementById('copyBtn');
const leaderboardList = document.getElementById('leaderboardList');

const phoneInput = document.getElementById('phoneInput');
const messageInput = document.getElementById('messageInput');
const whatsappBtn = document.getElementById('whatsappBtn');

let savedName = '';
let savedDistrict = '';
let currentAmount = 0;
let rolling = false;
let typingTimer = null;

const slotElements = [slot1, slot2, slot3];

const districtWishes = {
  Dhaka: [
    'ঢাহাইয়া ঢঙে কই — তোমার ঈদটা জোসস হোক, সুখে-শান্তিতে ভইরা যাক সবকিছু।',
    'এইডা তোমার লাইগা অনেক আদর, দোয়া আর মনের খুশি নিয়া পাঠাইলাম।'
  ],
  Chattogram: [
    'চাটগাঁইয়া কই — তুমার ঈদডা অনেক ফুর্তির আর বরকতের অইক, আল্লাহ ভালে রাখুক।',
    'তুমার লাইগা রইল অনেক দোয়া, সুখ-শান্তি আর মনভরা খুশির সালাম।'
  ],
  Sylhet: [
    'সিলেটি ঢঙে কই — তুমার ঈদখান মজা আর রহমতে ভইরা যাউক।',
    'আল্লাহ তুমারে সুখে রাখউক, আর মনত নামউক শান্তি আর খুশি।'
  ],
  Rajshahi: [
    'রাজশাহীর মিঠা ভাষায় — তোমার ঈদ আমের মতোই মিষ্টি হোক।',
    'সুখ, শান্তি আর ভালোবাসায় ভরে উঠুক তোমার প্রতিটা দিন।'
  ],
  Khulna: [
    'খুলনার টানে বলি — তোমার ঈদটা হোক আরাম, আনন্দ আর আপন মানুষের ভালোবাসায় ভরা।',
    'তোমার জীবনে আসুক শান্তি, বরকত আর মনভরা হাসি।'
  ],
  Barishal: [
    'বরিশালের ভাষায় কই — তোমার ঈদডা নদীর হাওয়ার মতন ঠাণ্ডা শান্তি নিয়া আইব।',
    'ভালোবাসা আর আনন্দে ভইরা যাক তুমার ঘরদুয়ার।'
  ],
  Rangpur: [
    'রংপুরিয়া মেজাজে — তোর ঈদডা খুবই ফাটাফাটি আর সুখের হউক।',
    'দোয়া করি, তোর জীবনডা খুশি আর বরকতে ভইরা উঠুক।'
  ],
  Mymensingh: [
    'ময়মনসিংহের টানে — তোমার ঈদটা হোক নরম, মিষ্টি আর আপন সুখে ভরা।',
    'পরিবার আর প্রিয় মানুষদের সাথে কাটুক দারুণ সব সময়।'
  ],
  Cumilla: [
    'কুমিল্লার আপন ভাষায় — তোমার ঈদ হোক সুখের, মনের আরাম আর ভালোবাসার।',
    'এই সালামির সাথে রইল ভুরিভুরি শুভেচ্ছা আর অনেক দোয়া।'
  ],
  Noakhali: [
    'নোয়াখাইল্লা টানে কই — তুমার ঈদডা অনেক সুন্দর অইক, সুখে শান্তিতে যাক।',
    'ঘরভর্তি খুশি, মায়া আর বরকত লইয়া আসুক এই ঈদ।'
  ],
  Jessore: [
    'যশোরের আপন টানে — তোমার ঈদ হোক রঙিন, হাসিখুশি আর স্মরণীয়।',
    'ভালোবাসা আর শান্তিতে ভরে উঠুক তোমার জীবন।'
  ],
  Bogra: [
    'বগুড়ার মিঠা ঢঙে — তোমার ঈদটা দইয়ের মতোই মিষ্টি হোক।',
    'আনন্দ, শান্তি আর শুভকামনা থাকুক সবসময়।'
  ],
  Dinajpur: [
    'দিনাজপুরের আবহে — তোমার ঈদ হোক প্রশান্তি, আপনজন আর ভালোবাসায় ভরা।',
    'মনভরা সুখ আর আলো নেমে আসুক তোমার জীবনে।'
  ],
  Pabna: [
    'পাবনার ভাষায় — তোমার ঈদটা হোক আরামদায়ক, সুখের আর স্মরণীয়।',
    'দোয়া করি, তোমার চারপাশ ভরে উঠুক আনন্দে।'
  ],
  Faridpur: [
    'ফরিদপুরের টানে — তোমার ঈদটা একদম সুন্দর আর মনভরা হোক।',
    'অনেক দোয়া, অনেক মায়া আর ভরপুর খুশি রইল।'
  ],
  Kushtia: [
    'কুষ্টিয়ার সুরে — তোমার ঈদটা হোক মধুর, শান্তির আর ভালোবাসায় ভরা।',
    'জীবনের প্রতিটা দিন কাটুক আলো আর আনন্দে।'
  ],
  default: [
    'আপনার ঈদ হোক আনন্দ, দোয়া, ভালোবাসা আর অগণিত সুখে ভরা।',
    'চাঁদের আলো আর ঈদের খুশি ছড়িয়ে পড়ুক আপনার জীবনের প্রতিটি দিনে।'
  ]
};

const greetings = [
  'ঈদ মোবারক',
  'শুভ ঈদ',
  'Blessed Eid Wishes',
  'Warm Eid Greetings',
  'Joyful Eid Moments'
];

function changePage(currentPage, nextPage) {
  currentPage.classList.remove('active');
  currentPage.classList.add('exit-left');

  setTimeout(() => {
    nextPage.classList.add('active');
  }, 220);
}

function resetPageForReuse(page) {
  page.classList.remove('active', 'exit-left');
}

function randomDigit() {
  return Math.floor(Math.random() * 10);
}

function startSlotAnimation() {
  slotElements.forEach((slot) => slot.classList.add('spinning'));
}

function stopSlotAnimation() {
  slotElements.forEach((slot) => slot.classList.remove('spinning'));
}

function getWishByDistrict(district, amount) {
  const list = districtWishes[district] || districtWishes.default;
  return list[amount % list.length];
}

function typeWriter(text) {
  clearInterval(typingTimer);
  typedWish.textContent = '';

  let i = 0;
  typingTimer = setInterval(() => {
    typedWish.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(typingTimer);
    }
  }, 34);
}

function getShareText() {
  return `${savedName} from ${savedDistrict} received Digital Salami of ৳${currentAmount}. 🌙`;
}

function saveToLeaderboard() {
  const entry = {
    name: savedName,
    district: savedDistrict,
    amount: currentAmount,
    time: new Date().toLocaleString()
  };

  const existing = JSON.parse(localStorage.getItem('digitalSalamiLeaderboard') || '[]');
  existing.unshift(entry);
  const latestSeven = existing.slice(0, 7);
  localStorage.setItem('digitalSalamiLeaderboard', JSON.stringify(latestSeven));
  renderLeaderboard();
}

function renderLeaderboard() {
  const list = JSON.parse(localStorage.getItem('digitalSalamiLeaderboard') || '[]');

  if (!list.length) {
    leaderboardList.innerHTML = `<div class="leaderboard-item"><span>এখনও কোন entry নেই</span></div>`;
    return;
  }

  leaderboardList.innerHTML = list.map((item, index) => `
    <div class="leaderboard-item">
      <span>${index + 1}. ${item.name} • ${item.district}</span>
      <strong>৳ ${item.amount}</strong>
    </div>
  `).join('');
}

startBtn.addEventListener('click', () => {
  changePage(page0, page1);
});

saveInfoBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const district = districtInput.value.trim();

  if (!name) {
    alert('আগে আপনার নাম লিখুন।');
    return;
  }

  if (!district) {
    alert('আপনার জেলা নির্বাচন করুন।');
    return;
  }

  savedName = name;
  savedDistrict = district;

  welcomeBox.classList.remove('hidden');
  welcomeBox.innerHTML = `<b>${savedName}</b> from <b>${savedDistrict}</b> — আপনাকে Digital Salami তে স্বাগতম।`;

  setTimeout(() => {
    changePage(page1, page2);
  }, 900);
});

spinBtn.addEventListener('click', () => {
  if (!savedName || !savedDistrict || rolling) return;

  rolling = true;
  spinBtn.disabled = true;
  spinBtn.textContent = 'Spinning...';
  statusText.textContent = 'আপনার জন্য ডিজিটাল সালামি তৈরি হচ্ছে...';

  startSlotAnimation();

  const spinInterval = setInterval(() => {
    slot1.textContent = randomDigit();
    slot2.textContent = randomDigit();
    slot3.textContent = randomDigit();
  }, 90);

  currentAmount = Math.floor(Math.random() * 100) + 1;
  const formatted = String(currentAmount).padStart(3, '0');

  setTimeout(() => {
    clearInterval(spinInterval);
    stopSlotAnimation();

    slot1.textContent = formatted[0];
    slot2.textContent = formatted[1];
    slot3.textContent = formatted[2];

    amountText.textContent = '৳ ' + currentAmount;
    cardName.textContent = savedName;
    cardDistrict.textContent = savedDistrict;
    cardGreeting.textContent = greetings[currentAmount % greetings.length];
    resultText.textContent = `${savedName}, ${savedDistrict} এর জন্য নির্ধারিত Digital Salami হলো ৳ ${currentAmount}।`;

    rolling = false;
    spinBtn.disabled = false;
    spinBtn.textContent = 'Spin Again';

    setTimeout(() => {
      changePage(page2, page3);
    }, 700);
  }, 3000);
});

openCardBtn.addEventListener('click', () => {
  wishEnvelope.classList.add('hidden');
  wishCard.classList.remove('hidden');

  wishCard.classList.remove('show');
  void wishCard.offsetWidth;
  wishCard.classList.add('show');

  const districtWish = getWishByDistrict(savedDistrict, currentAmount);
  saveToLeaderboard();

  setTimeout(() => {
    typeWriter(districtWish);
  }, 1200);
});

shareBtn.addEventListener('click', async () => {
  const text = getShareText();

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Digital Salami',
        text
      });
    } catch (e) {}
  } else {
    alert('এই ডিভাইসে direct share support নেই। Copy Text ব্যবহার করুন।');
  }
});

copyBtn.addEventListener('click', async () => {
  const text = getShareText();
  try {
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = 'Copied';
    setTimeout(() => {
      copyBtn.textContent = 'Copy Text';
    }, 1500);
  } catch (e) {
    alert('Copy করতে সমস্যা হয়েছে।');
  }
});

whatsappBtn.addEventListener('click', () => {
  const phone = phoneInput.value.trim();
  const msg = messageInput.value.trim();

  if (!phone) {
    alert('আপনার ফোন নাম্বার দিন।');
    return;
  }

  const finalMsg =
`Digital Salami Contact Request

Name: ${savedName}
District: ${savedDistrict}
Salami: ৳ ${currentAmount}
User Phone: ${phone}
Message: ${msg || 'No extra message'}`;

  const url = `https://wa.me/61412652246?text=${encodeURIComponent(finalMsg)}`;
  window.open(url, '_blank');
});

againBtn.addEventListener('click', () => {
  clearInterval(typingTimer);

  typedWish.textContent = '';
  wishCard.classList.add('hidden');
  wishCard.classList.remove('show');
  wishEnvelope.classList.remove('hidden');

  phoneInput.value = '';
  messageInput.value = '';

  slot1.textContent = '0';
  slot2.textContent = '0';
  slot3.textContent = '1';
  statusText.textContent = 'সব প্রস্তুত। এখন ম্যাজিক স্পিন দিন ✨';

  resetPageForReuse(page2);
  resetPageForReuse(page3);
  page2.classList.add('active');
});

renderLeaderboard();
