const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const page3 = document.getElementById('page3');
const page4 = document.getElementById('page4');

const goInfoBtn = document.getElementById('goInfoBtn');
const saveInfoBtn = document.getElementById('saveInfoBtn');
const spinBtn = document.getElementById('spinBtn');

const nameInput = document.getElementById('nameInput');
const districtInput = document.getElementById('districtInput');
const welcomeBox = document.getElementById('welcomeBox');
const statusText = document.getElementById('statusText');

const slot1 = document.getElementById('slot1');
const slot2 = document.getElementById('slot2');
const slot3 = document.getElementById('slot3');

const cardBox = document.getElementById('cardBox');
const leaderboardBox = document.getElementById('leaderboardBox');
const contactBox = document.getElementById('contactBox');
const shareBox = document.getElementById('shareBox');
const createdBy = document.getElementById('createdBy');

const amountText = document.getElementById('amountText');
const cardName = document.getElementById('cardName');
const cardDistrict = document.getElementById('cardDistrict');
const typedWish = document.getElementById('typedWish');
const resultText = document.getElementById('resultText');
const cardGreeting = document.getElementById('cardGreeting');

const leaderboardList = document.getElementById('leaderboardList');
const phoneInput = document.getElementById('phoneInput');
const messageInput = document.getElementById('messageInput');
const whatsappBtn = document.getElementById('whatsappBtn');

const shareNativeBtn = document.getElementById('shareNativeBtn');
const copyBtn = document.getElementById('copyBtn');
const facebookBtn = document.getElementById('facebookBtn');
const twitterBtn = document.getElementById('twitterBtn');
const whatsappShareBtn = document.getElementById('whatsappShareBtn');

let savedName = '';
let savedDistrict = '';
let currentAmount = 0;
let typingTimer = null;
let rolling = false;

const slotElements = [slot1, slot2, slot3];

const districtWishes = {
  Dhaka: [
    'ঢাহাইয়া স্টাইলে কই — তোমার ঈদটা একদম জম্পেশ যাক, খুশি আর আরামে ভইরা থাকুক চারপাশ।',
    'এই সালামির সাথে রইল অনেক আদর, দোয়া আর মনভরা হাসির শুভেচ্ছা।'
  ],
  Chattogram: [
    'চাটগাঁইয়া ঢঙে কই — তুমার ঈদডা ফুর্তি, বরকত আর শান্তিত ভইরা অইক।',
    'তুমার লাইগা অনেক অনেক দোয়া, সুখ আর মনের খুশির সালাম রইল।'
  ],
  Sylhet: [
    'সিলেটি ভঙ্গিতে কই — তুমার ঈদখান রহমত, সুখ আর আনন্দত ভইরা যাউক।',
    'আল্লাহ তুমারে শান্তি, বরকত আর অনেক সুখ দেউক।'
  ],
  Rajshahi: [
    'রাজশাহীর মিঠা টানে — তোমার ঈদটা আমের মতোই মিষ্টি আর সুন্দর হোক।',
    'সুখ, শান্তি আর ভালোবাসায় ভরে উঠুক তোমার সব সময়।'
  ],
  Khulna: [
    'খুলনার আপন টানে বলি — তোমার ঈদটা হোক আরাম, শান্তি আর মানুষজনের ভালোবাসায় ভরা।',
    'তোমার জীবনে নামুক সুখ, বরকত আর হাসিমুখের দিন।'
  ],
  Barishal: [
    'বরিশালের ভাষায় কই — তোমার ঈদডা নদীর বাতাসের মতো শান্তি নিয়া আইব।',
    'ঘরদুয়ার আর মনভরা থাকুক খুশি, মায়া আর ভালোবাসায়।'
  ],
  Rangpur: [
    'রংপুরিয়া ঢঙে — তোর ঈদডা ফাটাফাটি যাক, সুখে আর আরামে কাটুক সবটা সময়।',
    'তোর জীবনডা খুশি, বরকত আর আলোয় ভইরা উঠুক।'
  ],
  Mymensingh: [
    'ময়মনসিংহের টানে — তোমার ঈদটা হোক মিষ্টি, আপন আর অনেক সুখের।',
    'পরিবারের সাথে কাটুক দারুণ সব হাসিখুশি সময়।'
  ],
  Cumilla: [
    'কুমিল্লার আপন ভঙ্গিতে — তোমার ঈদটা হোক সুন্দর, মনের আরাম আর ভালোবাসায় ভরা।',
    'এই সালামির সাথে রইল অনেক শুভেচ্ছা আর আন্তরিক দোয়া।'
  ],
  Noakhali: [
    'নোয়াখাইল্লা টানে কই — তুমার ঈদডা অনেক সুন্দর অইক, শান্তিত আর সুখে যাউক।',
    'মায়া, দোয়া আর বরকত লইয়া আসুক এই ঈদ তোমার লাইগা।'
  ],
  Jessore: [
    'যশোরের টানে — তোমার ঈদটা হোক রঙিন, প্রাণখোলা আর স্মরণীয়।',
    'ভালোবাসা আর শান্তিতে ভরে উঠুক তোমার প্রতিদিন।'
  ],
  Bogra: [
    'বগুড়ার মিঠা ঢঙে — তোমার ঈদটা দইয়ের মতোই মিষ্টি আর উপভোগ্য হোক।',
    'আনন্দ, দোয়া আর সুখে থাকুক তোমার চারপাশ।'
  ],
  Dinajpur: [
    'দিনাজপুরের আবহে — তোমার ঈদটা হোক প্রশান্তি, আপনজন আর ভালোবাসায় ভরা।',
    'মনভরা সুখ আর আলোর সময় কাটুক তোমার জীবনে।'
  ],
  Pabna: [
    'পাবনার টানে — তোমার ঈদটা হোক আরামদায়ক, আনন্দময় আর স্মরণীয়।',
    'দোয়া করি, সুখে ভরে উঠুক তোমার সব সময়।'
  ],
  Faridpur: [
    'ফরিদপুরের মায়ায় — তোমার ঈদটা একদম সুন্দর, আপন আর মনভরা হোক।',
    'অনেক শুভেচ্ছা, অনেক ভালোবাসা আর বরকত রইল তোমার জন্য।'
  ],
  Kushtia: [
    'কুষ্টিয়ার সুরে — তোমার ঈদটা হোক মধুর, শান্তির আর ভালোবাসায় ভরা।',
    'জীবনের প্রতিটা দিন কাটুক আনন্দ আর আলোর ছোঁয়ায়।'
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

function randomDigit() {
  return Math.floor(Math.random() * 10);
}

function startSlotAnimation() {
  slotElements.forEach(slot => slot.classList.add('spinning'));
}

function stopSlotAnimation() {
  slotElements.forEach(slot => slot.classList.remove('spinning'));
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

function saveToLeaderboard() {
  const entry = {
    name: savedName,
    district: savedDistrict,
    amount: currentAmount
  };

  const existing = JSON.parse(localStorage.getItem('digitalSalamiLeaderboard') || '[]');
  existing.unshift(entry);
  const latestSeven = existing.slice(0, 7);
  localStorage.setItem('digitalSalamiLeaderboard', JSON.stringify(latestSeven));
  renderLeaderboard();
}

function revealFinalFlow() {
  cardBox.classList.remove('hidden');
  cardBox.classList.add('show');

  setTimeout(() => {
    leaderboardBox.classList.remove('hidden');
    leaderboardBox.classList.add('show');
  }, 1000);

  setTimeout(() => {
    contactBox.classList.remove('hidden');
    contactBox.classList.add('show');
  }, 1400);

  setTimeout(() => {
    shareBox.classList.remove('hidden');
    shareBox.classList.add('show');
  }, 1800);

  setTimeout(() => {
    createdBy.classList.remove('hidden');
    createdBy.classList.add('show');
  }, 2200);
}

function getShareText() {
  return `${savedName} from ${savedDistrict} received Digital Salami of ৳${currentAmount}. 🌙`;
}

goInfoBtn.addEventListener('click', () => {
  changePage(page1, page2);
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
  welcomeBox.innerHTML = `<b>${savedName}</b> from <b>${savedDistrict}</b> — ready for spin ✨`;

  setTimeout(() => {
    changePage(page2, page3);
  }, 900);
});

spinBtn.addEventListener('click', () => {
  if (rolling) return;

  rolling = true;
  spinBtn.disabled = true;
  spinBtn.textContent = 'Spinning...';
  statusText.textContent = 'আপনার salami তৈরি হচ্ছে...';

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
    resultText.textContent = `${savedName}, ${savedDistrict} এর জন্য Digital Salami হলো ৳ ${currentAmount}।`;

    saveToLeaderboard();

    setTimeout(() => {
      changePage(page3, page4);

      setTimeout(() => {
        revealFinalFlow();
        const districtWish = getWishByDistrict(savedDistrict, currentAmount);
        setTimeout(() => {
          typeWriter(districtWish);
        }, 900);
      }, 900);
    }, 700);
  }, 3000);
});

whatsappBtn.addEventListener('click', () => {
  const phone = phoneInput.value.trim();
  const msg = messageInput.value.trim();

  if (!phone) {
    alert('আপনার ফোন নাম্বার দিন।');
    return;
  }

  const finalMsg = `Digital Salami Contact Request

Name: ${savedName}
District: ${savedDistrict}
Salami: ৳ ${currentAmount}
User Phone: ${phone}
Message: ${msg || 'No extra message'}`;

  const url = `https://wa.me/61412652246?text=${encodeURIComponent(finalMsg)}`;
  window.open(url, '_blank');
});

shareNativeBtn.addEventListener('click', async () => {
  const text = getShareText();
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Digital Salami', text });
    } catch (e) {}
  } else {
    alert('এই ডিভাইসে direct share support নেই। নিচের social button ব্যবহার করুন।');
  }
});

copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(getShareText());
    copyBtn.textContent = 'Copied';
    setTimeout(() => {
      copyBtn.textContent = 'Copy Text';
    }, 1500);
  } catch (e) {
    alert('Copy করতে সমস্যা হয়েছে।');
  }
});

facebookBtn.addEventListener('click', () => {
  const text = encodeURIComponent(getShareText());
  const url = `https://www.facebook.com/sharer/sharer.php?u=https://example.com&quote=${text}`;
  window.open(url, '_blank');
});

twitterBtn.addEventListener('click', () => {
  const text = encodeURIComponent(getShareText());
  const url = `https://twitter.com/intent/tweet?text=${text}`;
  window.open(url, '_blank');
});

whatsappShareBtn.addEventListener('click', () => {
  const text = encodeURIComponent(getShareText());
  const url = `https://wa.me/?text=${text}`;
  window.open(url, '_blank');
});

renderLeaderboard();
