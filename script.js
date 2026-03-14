const nameInput = document.getElementById('nameInput');
const districtInput = document.getElementById('districtInput');
const saveInfoBtn = document.getElementById('saveInfoBtn');
const welcomeBox = document.getElementById('welcomeBox');
const spinBtn = document.getElementById('spinBtn');
const slot1 = document.getElementById('slot1');
const slot2 = document.getElementById('slot2');
const slot3 = document.getElementById('slot3');
const statusText = document.getElementById('statusText');
const wishSection = document.getElementById('wishSection');
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

const wishes = [
  'আপনার ঈদ হোক আনন্দ, দোয়া, ভালোবাসা আর অগণিত সুখে ভরা। এই ডিজিটাল সালামি আপনার মুখে হাসি এনে দিক।',
  'চাঁদের আলো আর ঈদের খুশি ছড়িয়ে পড়ুক আপনার জীবনের প্রতিটি দিনে। আজকের সালামি শুধু অর্থ নয়, সাথে রইল আন্তরিক শুভেচ্ছা।',
  'আপনার জন্য রইল অফুরন্ত দোয়া, বরকত ও ভালোবাসা। ঈদের এই বিশেষ মুহূর্ত হয়ে উঠুক স্মরণীয় ও উজ্জ্বল।',
  'আনন্দ, শান্তি ও সমৃদ্ধিতে ভরে উঠুক আপনার পরিবার। এই ছোট্ট ডিজিটাল সালামি বড় সুখের উপলক্ষ হোক।',
  'ঈদ মোবারক। আপনার নামের মতোই উজ্জ্বল হোক আপনার ভাগ্য, আর হৃদয় ভরে উঠুক ভালোবাসা ও হাসিতে।',
  'এই উৎসব আপনার জীবনে নিয়ে আসুক নতুন আশা, নতুন আলো আর প্রিয় মানুষের সঙ্গে অগণিত সুন্দর স্মৃতি।'
];

const greetings = [
  'ঈদ মোবারক',
  'শুভ ঈদ',
  'Blessed Eid Wishes',
  'Warm Eid Greetings',
  'Joyful Eid Moments'
];

function randomDigit() {
  return Math.floor(Math.random() * 10);
}

function startSlotAnimation() {
  slotElements.forEach((slot) => slot.classList.add('spinning'));
}

function stopSlotAnimation() {
  slotElements.forEach((slot) => slot.classList.remove('spinning'));
}

function resetCardAnimations() {
  wishEnvelope.classList.remove('envelope-enter');
  wishCard.classList.remove('card-enter');
  void wishEnvelope.offsetWidth;
  wishEnvelope.classList.add('envelope-enter');
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
  welcomeBox.innerHTML = `<b>${savedName}</b> from <b>${savedDistrict}</b> — আপনাকে Digital Salami তে স্বাগতম। এখন স্পিন করতে পারেন।`;
  spinBtn.disabled = false;
  statusText.textContent = 'সব প্রস্তুত। এখন ম্যাজিক স্পিন দিন ✨';
});

spinBtn.addEventListener('click', () => {
  if (!savedName || !savedDistrict || rolling) return;

  rolling = true;
  spinBtn.disabled = true;
  spinBtn.textContent = 'Spinning...';
  statusText.textContent = 'আপনার জন্য ডিজিটাল সালামি তৈরি হচ্ছে...';
  wishSection.classList.add('hidden');
  wishCard.classList.add('hidden');
  wishEnvelope.classList.remove('hidden');
  typedWish.textContent = '';

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
    resultText.textContent = `${savedName}, ${savedDistrict} এর পক্ষ থেকে আপনার জন্য নির্ধারিত ডিজিটাল সালামি হলো ৳ ${currentAmount}।`;
    cardGreeting.textContent = greetings[currentAmount % greetings.length];

    setTimeout(() => {
      wishSection.classList.remove('hidden');
      resetCardAnimations();
      statusText.textContent = 'আপনার wish card প্রস্তুত। নিচে open করুন 💌';

      rolling = false;
      spinBtn.disabled = false;
      spinBtn.textContent = 'Spin Again';
    }, 350);
  }, 3000);
});

openCardBtn.addEventListener('click', () => {
  wishCard.classList.remove('hidden');
  wishEnvelope.classList.add('hidden');

  wishCard.classList.remove('card-enter');
  void wishCard.offsetWidth;
  wishCard.classList.add('card-enter');

  const wish = wishes[currentAmount % wishes.length];

  setTimeout(() => {
    typeWriter(wish);
  }, 900);
});

againBtn.addEventListener('click', () => {
  wishCard.classList.add('hidden');
  wishEnvelope.classList.remove('hidden');
  typedWish.textContent = '';
  statusText.textContent = 'আরেকবার স্পিন দিয়ে নতুন wish card নিন ✨';
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
