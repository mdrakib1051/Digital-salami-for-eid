import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, MoonStar, Coins, User, RotateCcw } from "lucide-react";

export default function EidSalamiPremiumSite() {
  const [name, setName] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const [isRolling, setIsRolling] = useState(false);
  const [amount, setAmount] = useState<number | null>(null);
  const [display1, setDisplay1] = useState(7);
  const [display2, setDisplay2] = useState(2);
  const [display3, setDisplay3] = useState(9);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const link1 = document.createElement("link");
    link1.rel = "preconnect";
    link1.href = "https://fonts.googleapis.com";

    const link2 = document.createElement("link");
    link2.rel = "preconnect";
    link2.href = "https://fonts.gstatic.com";
    link2.crossOrigin = "anonymous";

    const link3 = document.createElement("link");
    link3.rel = "stylesheet";
    link3.href =
      "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Hind+Siliguri:wght@400;500;600;700&display=swap";

    document.head.appendChild(link1);
    document.head.appendChild(link2);
    document.head.appendChild(link3);

    return () => {
      [link1, link2, link3].forEach((el) => {
        if (document.head.contains(el)) document.head.removeChild(el);
      });
    };
  }, []);

  const wishes = useMemo(
    () => [
      "ঈদের আনন্দ হোক হৃদয়ভরা, সালামি হোক ভালোবাসার স্মৃতি।",
      "আপনার ঈদ হোক বরকতময়, সুখে ভরে উঠুক প্রতিটি মুহূর্ত।",
      "এই সালামি শুধু টাকা না, সাথে রইলো অনেক দোয়া আর ভালোবাসা।",
      "চাঁদের আলো, ঈদের খুশি আর আপনার মুখে থাকুক মিষ্টি হাসি।",
      "আজকের এই ছোট্ট সালামি আপনার জন্য বড় সুখের কারণ হোক।",
      "ঈদ মোবারক। আনন্দ, শান্তি আর সমৃদ্ধি থাকুক আপনার জীবনে।",
      "হাসি, খুশি আর ভালোবাসায় ভরে উঠুক আপনার ঈদের দিনটি।",
    ],
    []
  );

  const glamLines = useMemo(
    () => [
      "আজকের ভাগ্য আপনার জন্য একটু বেশি উজ্জ্বল ✨",
      "সৌভাগ্যের দরজা খুলেছে, গ্রহণ করুন আপনার ঈদের উপহার 🌙",
      "একটি ছোট্ট ট্যাপ, আর একরাশ আনন্দ আপনার নামে 💫",
      "প্রিমিয়াম ঈদ মুহূর্ত — শুধু আপনার জন্য সাজানো 🎁",
    ],
    []
  );

  const finalWish = useMemo(() => {
    if (amount === null) return "";
    const wish = wishes[amount % wishes.length];
    const glam = glamLines[amount % glamLines.length];
    return `${glam} ${wish}`;
  }, [amount, wishes, glamLines]);

  const submitName = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setSubmittedName(trimmed);
    setAmount(null);
  };

  const startRoll = () => {
    if (!submittedName || isRolling) return;

    setIsRolling(true);
    setAmount(null);

    intervalRef.current = window.setInterval(() => {
      setDisplay1(Math.floor(Math.random() * 10));
      setDisplay2(Math.floor(Math.random() * 10));
      setDisplay3(Math.floor(Math.random() * 10));
    }, 90);

    const finalAmount = Math.floor(Math.random() * 100) + 1;
    const padded = String(finalAmount).padStart(3, "0").split("").map(Number);

    setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setDisplay1(padded[0]);
      setDisplay2(padded[1]);
      setDisplay3(padded[2]);
      setAmount(finalAmount);
      setIsRolling(false);
    }, 2600);
  };

  const resetAll = () => {
    setName("");
    setSubmittedName("");
    setAmount(null);
    setIsRolling(false);
    setDisplay1(7);
    setDisplay2(2);
    setDisplay3(9);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const SlotDigit = ({ value }: { value: number }) => (
    <motion.div
      key={value}
      initial={{ y: -18, opacity: 0.4, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.18 }}
      className="relative flex h-20 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 text-4xl font-bold text-white shadow-[0_0_25px_rgba(255,215,0,0.08)] backdrop-blur-xl sm:h-24 sm:w-20 sm:text-5xl"
      style={{ fontFamily: "Cinzel, serif" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.14),transparent_55%)]" />
      <span className="relative">{value}</span>
    </motion.div>
  );

  return (
    <div className="min-h-screen overflow-hidden bg-[#05060a] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(235,190,60,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(120,80,255,0.14),transparent_28%),linear-gradient(to_bottom,#05060a,#090b14,#05060a)]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:40px_40px]" />

      <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-8 w-full max-w-5xl rounded-[32px] border border-white/10 bg-white/5 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-6 lg:p-8"
        >
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-300/10 px-4 py-2 text-xs tracking-[0.25em] text-amber-200 uppercase">
                <MoonStar className="h-4 w-4" />
                Eid Premium Salami Drop
              </div>
              <h1
                className="text-3xl font-semibold leading-tight text-white sm:text-5xl"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Realistic Premium
                <span className="block bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-100 bg-clip-text text-transparent">
                  Salami Distribution
                </span>
              </h1>
              <p
                className="mt-4 max-w-2xl text-base text-zinc-300 sm:text-lg"
                style={{ fontFamily: "Hind Siliguri, sans-serif" }}
              >
                ঈদের আনন্দকে একটু ম্যাজিক্যাল করে তুলুন। নাম দিন, স্পিন করুন,
                আর র‍্যান্ডমভাবে পেয়ে যান আপনার প্রিমিয়াম সালামি।
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                { icon: Gift, label: "র‍্যান্ডম সালামি" },
                { icon: Sparkles, label: "প্রিমিয়াম অ্যানিমেশন" },
                { icon: Coins, label: "১-১০০ টাকা" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-center shadow-lg"
                >
                  <item.icon className="mx-auto mb-2 h-5 w-5 text-amber-300" />
                  <p
                    className="text-sm text-zinc-200"
                    style={{ fontFamily: "Hind Siliguri, sans-serif" }}
                  >
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <section className="rounded-[28px] border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.03] p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-2xl bg-amber-300/10 p-3 text-amber-300">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Enter your name</h2>
                  <p
                    className="text-sm text-zinc-400"
                    style={{ fontFamily: "Hind Siliguri, sans-serif" }}
                  >
                    শুরু করার আগে নিজের নাম লিখুন
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="আপনার নাম লিখুন..."
                  className="h-14 rounded-2xl border border-white/10 bg-black/30 px-5 text-base text-white outline-none ring-0 placeholder:text-zinc-500 focus:border-amber-300/50"
                  style={{ fontFamily: "Hind Siliguri, sans-serif" }}
                />

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={submitName}
                    className="rounded-2xl bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-200 px-6 py-3 font-semibold text-black shadow-[0_12px_40px_rgba(250,204,21,0.25)] transition hover:scale-[1.02]"
                  >
                    Continue
                  </button>
                  <button
                    onClick={resetAll}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-zinc-200 transition hover:bg-white/10"
                  >
                    <RotateCcw className="h-4 w-4" /> Reset
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {submittedName && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    className="mt-6 rounded-3xl border border-emerald-400/15 bg-emerald-400/10 p-5"
                  >
                    <p
                      className="text-base text-emerald-100"
                      style={{ fontFamily: "Hind Siliguri, sans-serif" }}
                    >
                      স্বাগতম, <span className="font-semibold">{submittedName}</span> —
                      আপনার জন্য প্রিমিয়াম ঈদ সালামি প্রস্তুত।
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0d101a] via-[#121522] to-[#08090f] p-5 sm:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.10),transparent_35%)]" />
              <div className="relative">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white">Magic Slot</h2>
                    <p
                      className="text-sm text-zinc-400"
                      style={{ fontFamily: "Hind Siliguri, sans-serif" }}
                    >
                      ক্যাসিনো স্টাইল প্রিমিয়াম র‍্যান্ডম ড্র
                    </p>
                  </div>
                  <div className="rounded-full border border-amber-400/20 bg-amber-300/10 px-4 py-2 text-xs text-amber-200">
                    001 - 100
                  </div>
                </div>

                <div className="rounded-[30px] border border-white/10 bg-black/30 p-4 shadow-inner shadow-black/40 sm:p-6">
                  <div className="mb-5 flex items-center justify-center gap-3 sm:gap-4">
                    <SlotDigit value={display1} />
                    <SlotDigit value={display2} />
                    <SlotDigit value={display3} />
                  </div>

                  <button
                    onClick={startRoll}
                    disabled={!submittedName || isRolling}
                    className="w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-amber-400 px-5 py-4 text-base font-semibold text-white shadow-[0_14px_50px_rgba(168,85,247,0.25)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isRolling ? "Rolling your salami..." : "Spin for Salami"}
                  </button>
                </div>

                <AnimatePresence>
                  {amount !== null && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.94, y: 16 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.94, y: 16 }}
                      transition={{ duration: 0.35 }}
                      className="mt-6 rounded-[28px] border border-amber-400/20 bg-gradient-to-br from-amber-300/10 to-white/5 p-6"
                    >
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-black/20 px-4 py-2 text-amber-200">
                        <Sparkles className="h-4 w-4" />
                        Premium Eid Result
                      </div>

                      <h3
                        className="text-4xl font-bold text-white sm:text-5xl"
                        style={{ fontFamily: "Cinzel, serif" }}
                      >
                        ৳ {amount}
                      </h3>

                      <p
                        className="mt-4 text-lg leading-8 text-zinc-200"
                        style={{ fontFamily: "Hind Siliguri, sans-serif" }}
                      >
                        {submittedName}, আপনার জন্য আজকের ঈদ সালামি নির্ধারিত হয়েছে
                        <span className="mx-1 font-semibold text-amber-300">৳ {amount}</span>
                        ।
                      </p>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="mt-5 rounded-3xl border border-white/10 bg-black/20 p-5"
                      >
                        <p
                          className="text-base leading-8 text-zinc-200 sm:text-lg"
                          style={{
                            fontFamily: "Hind Siliguri, sans-serif",
                            textShadow: "0 0 10px rgba(255,215,0,0.12)",
                          }}
                        >
                          ✨ {finalWish}
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>
          </div>
        </motion.div>

        <footer
          className="mx-auto mt-auto pb-3 text-center text-sm text-zinc-500"
          style={{ fontFamily: "Hind Siliguri, sans-serif" }}
        >
          ঈদ মোবারক 🌙 • Premium dark themed random salami experience
        </footer>
      </main>
    </div>
  );
}
