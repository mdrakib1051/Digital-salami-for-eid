const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const page3 = document.getElementById('page3');

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

let savedName = '';
let savedDistrict = '';
let currentAmount = 0;
let rolling = false;
let typingTimer = null;

const slotElements = [slot1, slot2, slot3];

const districtWishes = {
  Dhaka: [
    'ঢাকার ছন্দে বলি — আপনার ঈদ হোক আনন্দে ভরা, আলোয় ভরা, ভালোবাসায় ভরা।',
    'ঢাকার ব্যস্ততার মাঝেও আপনার জীবনে নেমে আসুক শান্তি, সুখ আর ঈদের মিষ্টি হাসি।'
  ],
  Chattogram: [
    'চাটগাঁইয়া ঢঙে কই — এই ঈদে আপনার ঘর ভইরা যাক খুশি, বরকত আর ভালোবাসায়।',
    'আপনার লাইগা রইল অনেক দোয়া, আনন্দ আর উজ্জ্বল ঈদের শুভেচ্ছা।'
  ],
  Sylhet: [
    'সিলেটি মিঠা আবহে — আপনার ঈদ হউক দোয়া, শান্তি আর সুখের আলোয় ভরা।',
    'মনভরা ভালোবাসা আর বরকত নিয়া আসুক এই ঈদ আপনার জীবনে।'
  ],
  Rajshahi: [
    'রাজশাহীর আমের মিষ্টতার মতো আপনার ঈদটাও হোক মিষ্টি আর স্মরণীয়।',
    'আপনার পরিবারে নেমে আসুক সুখ, শান্তি আর অফুরন্ত বরকত।'
  ],
  Khulna: [
    'খুলনার আন্তরিকতা নিয়ে বলি — ঈদের আনন্দে ভরে উঠুক আপনার প্রতিটি মুহূর্ত।',
    'আপনার জীবনে আসুক শান্তি, সমৃদ্ধি আর প্রিয়জনদের সঙ্গে অগণিত সুখের সময়।'
  ],
  Barishal: [
    'বরিশালের নদীর হাওয়ার মতো শীতল সুখ নেমে আসুক আপনার জীবনে এই ঈদে।',
    'ভালোবাসা, দোয়া আর আনন্দে ভরে উঠুক আপনার ঘর আর মন।'
  ],
  Rangpur: [
    'রংপুরের মাটির টানে বলি — আপনার ঈদ হোক সহজ, সুন্দর আর খুশিতে ভরা।',
    'আপনার দিনগুলো রঙিন হয়ে উঠুক বরকত, ভালোবাসা আর হাসিতে।'
  ],
  Mymensingh: [
    'ময়মনসিংহের স্নিগ্ধতায় আপনার ঈদ হয়ে উঠুক শান্তি আর আনন্দের উৎসব।',
    'পরিবারের সঙ্গে কাটুক দোয়া, হাসি আর ভালোবাসায় ভরা সুন্দর সময়।'
  ],
  Cumilla: [
    'কুমিল্লার মাধুর্যে বলি — এই ঈদে আপনার জীবন ভরে উঠুক সুখ আর শুভকামনায়।',
    'অগণিত হাসি, দোয়া আর আনন্দে কাটুক আপনার ঈদের প্রতিটি ক্ষণ।'
  ],
  Noakhali: [
    'নোয়াখালীর আপন টানে বলি — আপনার ঈদ হোক দারুণ সুখের আর ভালোবাসার।',
    'ঘরে ঘরে নেমে আসুক শান্তি, বরকত আর অনেক খুশির আলো।'
  ],
  Jessore: [
    'যশোরের আন্তরিক শুভেচ্ছা — আপনার ঈদ হয়ে উঠুক আনন্দময় আর স্মরণীয়।',
    'হাসি, শান্তি আর ভালোবাসা থাকুক আপনার প্রতিটি দিনে।'
  ],
  Bogra: [
    'বগুড়ার দইয়ের মতো মিষ্টি হোক আপনার ঈদ আর সম্পর্কগুলো।',
    'ভরে উঠুক জীবন আনন্দ, দোয়া আর মায়ায়।'
  ],
  Dinajpur: [
    'দিনাজপুরের প্রশান্তির মতো শান্তিময় হোক আপনার ঈদের সময়।',
    'সুখ, ভালোবাসা আর বরকত থাকুক আপনার পরিবারে সবসময়।'
  ],
  Pabna: [
    'পাবনার আন্তরিকতায় বলি — আপনার ঈদ হোক প্রশান্তি, সাফল্য আর সুখে ভরা।',
    'এই উৎসব বয়ে আনুক নতুন আশা আর অনেক সুন্দর মুহূর্ত।'
  ],
  Faridpur: [
    'ফরিদপুরের মমতায় আপনার ঈদ হয়ে উঠুক উজ্জ্বল আর আনন্দে ভরা।',
    'আপনার জন্য রইল ভালোবাসা, বরকত আর অফুরন্ত শুভকামনা।'
  ],
  Kushtia: [
    'কুষ্টিয়ার সুরের মতো মধুর হোক আপনার ঈদ আর জীবনের প্রতিটি দিন।',
    'আনন্দ, ভালোবাসা আর আলোয় ভরে উঠুক আপনার চারপাশ।'
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

  setTimeout(() => {
    typeWriter(districtWish);
  }, 1200);
});

againBtn.addEventListener('click', () => {
  clearInterval(typingTimer);

  typedWish.textContent = '';
  wishCard.classList.add('hidden');
  wishCard.classList.remove('show');
  wishEnvelope.classList.remove('hidden');

  slot1.textContent = '0';
  slot2.textContent = '0';
  slot3.textContent = '1';
  statusText.textContent = 'সব প্রস্তুত। এখন ম্যাজিক স্পিন দিন ✨';

  resetPageForReuse(page2);
  resetPageForReuse(page3);
  page2.classList.add('active');
});
