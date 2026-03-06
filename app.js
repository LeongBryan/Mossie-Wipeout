(() => {
  "use strict";

  const data = window.MossieData;

  if (!data) {
    throw new Error("MossieData is missing. Ensure MozzieWipeOutWeapons.js is loaded first.");
  }

  const GAME = {
    STORAGE_KEY: "mossie_wipeout_state_v3",
    STARTING_MOZZIES: 1000000000,
    STARTING_CASH: 2,
    TRAINING_START_COST: 80,
    TRAINING_GROWTH: 1.4,
    HUMAN_DEATHS_PER_SEC: 0.08,
    TIME_LIMIT_SECONDS: 20 * 60
  };

  const ui = {
    totalMozzies: document.getElementById("totalMozzies"),
    time: document.getElementById("time"),
    title: document.getElementById("title"),
    mozziesKilled: document.getElementById("mozziesKilled"),
    cashPerKill: document.getElementById("cashPerKill"),
    cashPerSwat: document.getElementById("cashPerSwat"),
    averageKillsPerHour: document.getElementById("averageKillsPerHour"),
    humanDeaths: document.getElementById("humanDeaths"),
    humanDeathsMirror: document.getElementById("humanDeathsMirror"),
    totalCash: document.getElementById("totalCash"),
    unclaimedKills: document.getElementById("unclaimedKills"),
    unclaimedBounty: document.getElementById("unclaimedBounty"),
    unclaimedBountyLabel: document.getElementById("unclaimedBountyLabel"),
    weaponName: document.getElementById("weaponName"),
    secondaryWeaponName: document.getElementById("secondaryWeaponName"),
    pets: document.getElementById("pets"),
    killMultiplier: document.getElementById("killMultiplier"),
    chaosMultiplier: document.getElementById("chaosMultiplier"),
    killPerSwatFinal: document.getElementById("killPerSwatFinal"),
    autoSwatRate: document.getElementById("autoSwatRate"),
    weaponShop: document.getElementById("weaponShop"),
    secondaryWeaponShop: document.getElementById("secondaryWeaponShop"),
    petShop: document.getElementById("petShop"),
    skillCost: document.getElementById("skillCost"),
    stealthCost: document.getElementById("stealthCost"),
    skill: document.getElementById("skill"),
    stealth: document.getElementById("stealth"),
    missionUpdate: document.getElementById("missionUpdate"),
    endMessage: document.getElementById("endMessage"),
    swatButton: document.getElementById("swatButton"),
    claimButton: document.getElementById("claimButton"),
    saveButton: document.getElementById("saveButton"),
    resetButton: document.getElementById("resetButton"),
    weaponButton: document.getElementById("weaponButton"),
    secondaryWeaponButton: document.getElementById("secondaryWeaponButton"),
    petButton: document.getElementById("petButton"),
    trainStealthButton: document.getElementById("trainStealthButton"),
    trainSkillButton: document.getElementById("trainSkillButton"),
    achievementCount: document.getElementById("achievementCount"),
    achievementList: document.getElementById("achievementList"),
    challengeCount: document.getElementById("challengeCount"),
    challengeList: document.getElementById("challengeList"),
    toast: document.getElementById("toast"),
    questPopup: document.getElementById("questPopup"),
    questPopupTitle: document.getElementById("questPopupTitle"),
    questPopupAmount: document.getElementById("questPopupAmount"),
    questPopupContinue: document.getElementById("questPopupContinue")
  };

  const moneyNumberFormatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const integerFormatter = new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 0
  });

  const compactFormatter = new Intl.NumberFormat(undefined, {
    notation: "compact",
    maximumFractionDigits: 2
  });

  const missionLines = [
    "The Ministry of Mild Chaos approves your swatting form.",
    "Neighborhood frogs report rising morale.",
    "Accounting says your expense claims are emotionally compelling.",
    "A council of chickens has endorsed this mission.",
    "A dramatic soundtrack started playing for no clear reason.",
    "The Anti-Mozzie Parade has added your name to the banner.",
    "Breaking news: one bat just clapped for your technique.",
    "A random wizard yelled 'combo multiplier' and vanished.",
    "Your swatter has achieved uncommon narrative significance.",
    "Someone wrote fan fiction about your shop strategy."
  ];

  const PET_EMPTY_MESSAGE = "(No Pets Currently. Check out the Shop when you have time!)";

  const createDefaultState = () => ({
    elapsedSeconds: 0,
    humanDeaths: 0,
    totalMozzies: GAME.STARTING_MOZZIES,
    cash: GAME.STARTING_CASH,
    cashPerKill: 0.02,
    killPerSwat: 1,
    killPerAutoSwat: 0,
    mozziesKilled: 0,
    unclaimedKills: 0,
    title: "Underpaid Fly Swatter Intern",
    weaponName: "Second-Hand Fly Swatter",
    secondaryWeaponName: "(Currently no Secondary Weapon)",
    petsOwned: [],
    weaponIndex: 0,
    secondaryWeaponIndex: 0,
    petIndex: 0,
    skill: 1,
    stealth: 1,
    skillCost: GAME.TRAINING_START_COST,
    stealthCost: GAME.TRAINING_START_COST,
    killMultiplier: 1,
    killMultiplierBonus: 0,
    cashPerKillBonus: 0,
    autoSwatBonus: 0,
    manualSwats: 0,
    lifetimeCashEarned: 0,
    humanDeathsPerSec: GAME.HUMAN_DEATHS_PER_SEC,
    ended: false,
    endMessage: "",
    missionIndex: 0,
    missionTick: 0,
    achievementsUnlocked: [],
    challengesCompleted: [],
    emergencySweepUsed: false
  });

  const achievements = [
    {
      id: "first_splat",
      name: "First Splat",
      description: "Delete 100 mozzies.",
      target: 100,
      progress: (state) => state.mozziesKilled,
      reward: "+$10",
      onUnlock: (state) => awardCash(state, 10)
    },
    {
      id: "double_century_splat",
      name: "Double Century Splat",
      description: "Delete 200 mozzies.",
      target: 200,
      progress: (state) => state.mozziesKilled,
      reward: "+$20",
      onUnlock: (state) => awardCash(state, 20)
    },
    {
      id: "five_hundred_frenzy",
      name: "Five Hundred Frenzy",
      description: "Delete 500 mozzies.",
      target: 500,
      progress: (state) => state.mozziesKilled,
      reward: "+$50",
      onUnlock: (state) => awardCash(state, 50)
    },
    {
      id: "thousand_swatter",
      name: "Thousand Swatter",
      description: "Delete 1,000 mozzies.",
      target: 1000,
      progress: (state) => state.mozziesKilled,
      reward: "+$100",
      onUnlock: (state) => awardCash(state, 100)
    },
    {
      id: "spreadsheet_power",
      name: "Spreadsheet Power",
      description: "Kill 2,500 mozzies.",
      target: 2500,
      progress: (state) => state.mozziesKilled,
      reward: "+$0.003 cash/kill",
      onUnlock: (state) => {
        state.cashPerKillBonus += 0.003;
      }
    },
    {
      id: "petting_zoo",
      name: "Petting Zoo Boss",
      description: "Adopt 3 pets.",
      target: 3,
      progress: (state) => state.petsOwned.length,
      reward: "+0.25 auto-swat/frame",
      onUnlock: (state) => {
        state.autoSwatBonus += 0.25;
      }
    },
    {
      id: "dojo_dropout",
      name: "Dojo Dropout",
      description: "Reach combined School of Swat level 14.",
      target: 14,
      progress: (state) => state.skill + state.stealth,
      reward: "+1 kill multiplier",
      onUnlock: (state) => {
        state.killMultiplierBonus += 1;
      }
    },
    {
      id: "money_confetti",
      name: "Money Confetti",
      description: "Earn $25,000 lifetime bounty.",
      target: 25000,
      progress: (state) => state.lifetimeCashEarned,
      reward: "+$500",
      onUnlock: (state) => awardCash(state, 500)
    },
    {
      id: "crowd_control",
      name: "Crowd Control",
      description: "Kill 250,000 mozzies.",
      target: 250000,
      progress: (state) => state.mozziesKilled,
      reward: "+$0.006 cash/kill",
      onUnlock: (state) => {
        state.cashPerKillBonus += 0.006;
      }
    },
    {
      id: "speed_sorcerer",
      name: "Speed Sorcerer",
      description: "Finish the campaign within 20 minutes.",
      target: 1,
      progress: (state) => (
        state.ended && !state.emergencySweepUsed && state.elapsedSeconds <= GAME.TIME_LIMIT_SECONDS ? 1 : 0
      ),
      reward: "+1 kill multiplier",
      onUnlock: (state) => {
        state.killMultiplierBonus += 1;
      }
    }
  ];

  const challenges = [
    {
      id: "tap_frenzy",
      name: "Tap Frenzy Internship",
      description: "Perform 1,200 manual swats.",
      target: 1200,
      progress: (state) => state.manualSwats,
      reward: "+$250 and +0.2 auto-swat/frame",
      onComplete: (state) => {
        awardCash(state, 250);
        state.autoSwatBonus += 0.2;
      }
    },
    {
      id: "shopping_cart",
      name: "Shopping Cart Rampage",
      description: "Buy 10 total upgrades from Shop.",
      target: 10,
      progress: (state) => state.weaponIndex + state.secondaryWeaponIndex + state.petIndex,
      reward: "+$0.004 cash/kill",
      onComplete: (state) => {
        state.cashPerKillBonus += 0.004;
      }
    },
    {
      id: "night_school",
      name: "Night School Survivor",
      description: "Buy 10 total training levels.",
      target: 10,
      progress: (state) => (state.skill - 1) + (state.stealth - 1),
      reward: "+1 kill multiplier",
      onComplete: (state) => {
        state.killMultiplierBonus += 1;
      }
    },
    {
      id: "mini_zoo",
      name: "Mini Zoo Logistics",
      description: "Adopt 5 pets.",
      target: 5,
      progress: (state) => state.petsOwned.length,
      reward: "+0.35 auto-swat/frame",
      onComplete: (state) => {
        state.autoSwatBonus += 0.35;
      }
    }
  ];

  const state = loadState();
  normalizeState();

  let toastTimer = null;
  const popupQueue = [];
  let activePopup = null;

  function loadState() {
    const defaults = createDefaultState();

    try {
      const raw = window.localStorage.getItem(GAME.STORAGE_KEY);

      if (!raw) {
        return defaults;
      }

      const parsed = JSON.parse(raw);
      const merged = { ...defaults, ...parsed };

      merged.elapsedSeconds = safeNumber(
        merged.elapsedSeconds,
        safeNumber(merged.timerHours, defaults.elapsedSeconds) * 60 * 60
      );
      merged.humanDeaths = safeNumber(merged.humanDeaths, defaults.humanDeaths);
      merged.totalMozzies = safeNumber(merged.totalMozzies, defaults.totalMozzies);
      merged.cash = safeNumber(merged.cash, defaults.cash);
      merged.cashPerKill = safeNumber(merged.cashPerKill, defaults.cashPerKill);
      merged.killPerSwat = safeNumber(merged.killPerSwat, defaults.killPerSwat);
      merged.killPerAutoSwat = safeNumber(merged.killPerAutoSwat, defaults.killPerAutoSwat);
      merged.mozziesKilled = safeNumber(merged.mozziesKilled, defaults.mozziesKilled);
      merged.unclaimedKills = safeNumber(merged.unclaimedKills, defaults.unclaimedKills);
      merged.weaponIndex = clamp(Math.round(safeNumber(merged.weaponIndex, defaults.weaponIndex)), 0, data.weapons.length);
      merged.secondaryWeaponIndex = clamp(
        Math.round(safeNumber(merged.secondaryWeaponIndex, defaults.secondaryWeaponIndex)),
        0,
        data.secondaryWeapons.length
      );
      merged.petIndex = clamp(Math.round(safeNumber(merged.petIndex, defaults.petIndex)), 0, data.pets.length);
      merged.skill = clamp(Math.round(safeNumber(merged.skill, defaults.skill)), 1, 70);
      merged.stealth = clamp(Math.round(safeNumber(merged.stealth, defaults.stealth)), 1, 70);
      merged.skillCost = safeNumber(merged.skillCost, defaults.skillCost);
      merged.stealthCost = safeNumber(merged.stealthCost, defaults.stealthCost);
      merged.killMultiplier = Math.max(1, safeNumber(merged.killMultiplier, defaults.killMultiplier));
      merged.killMultiplierBonus = Math.max(0, safeNumber(merged.killMultiplierBonus, defaults.killMultiplierBonus));
      merged.cashPerKillBonus = Math.max(0, safeNumber(merged.cashPerKillBonus, defaults.cashPerKillBonus));
      merged.autoSwatBonus = Math.max(0, safeNumber(merged.autoSwatBonus, defaults.autoSwatBonus));
      merged.manualSwats = Math.max(0, safeNumber(merged.manualSwats, defaults.manualSwats));
      merged.lifetimeCashEarned = Math.max(0, safeNumber(merged.lifetimeCashEarned, defaults.lifetimeCashEarned));
      merged.humanDeathsPerSec = safeNumber(merged.humanDeathsPerSec, defaults.humanDeathsPerSec);
      merged.petsOwned = Array.isArray(merged.petsOwned) ? merged.petsOwned.slice(0, data.pets.length) : [];
      merged.achievementsUnlocked = Array.isArray(merged.achievementsUnlocked)
        ? merged.achievementsUnlocked.filter((id) => typeof id === "string")
        : [];
      merged.challengesCompleted = Array.isArray(merged.challengesCompleted)
        ? merged.challengesCompleted.filter((id) => typeof id === "string")
        : [];

      if (merged.ended) {
        merged.killPerSwat = 0;
        merged.killPerAutoSwat = 0;
        merged.autoSwatBonus = 0;
        merged.totalMozzies = 0;
        merged.humanDeathsPerSec = 0;
      }

      return merged;
    } catch (error) {
      console.warn("Could not parse save data. Starting fresh.", error);
      return defaults;
    }
  }

  function normalizeState() {
    state.skillCost = Math.max(state.skillCost, GAME.TRAINING_START_COST);
    state.stealthCost = Math.max(state.stealthCost, GAME.TRAINING_START_COST);
    state.killMultiplier = Math.max(1, Math.ceil((state.skill + state.stealth) / 3));

    if (state.weaponIndex > 0) {
      state.weaponName = data.weapons[state.weaponIndex - 1].name;
      state.killPerSwat = data.weapons[state.weaponIndex - 1].damage;
    }

    if (state.secondaryWeaponIndex > 0) {
      state.secondaryWeaponName = data.secondaryWeapons[state.secondaryWeaponIndex - 1].name;
    }

    if (!state.weaponName) {
      state.weaponName = "Second-Hand Fly Swatter";
    }

    if (!state.secondaryWeaponName) {
      state.secondaryWeaponName = "(Currently no Secondary Weapon)";
    }

    if (!state.petsOwned.length && state.petIndex > 0) {
      state.petsOwned = data.pets.slice(0, state.petIndex).map((pet) => pet.name);
    }

    syncRank();
    evaluateMilestones(false);
  }

  function saveState(showToast = false) {
    try {
      window.localStorage.setItem(GAME.STORAGE_KEY, JSON.stringify(state));

      if (showToast) {
        flashToast("Progress packed into a tiny digital jar.");
      }
    } catch (error) {
      console.warn("Could not save state.", error);
      if (showToast) {
        flashToast("Save failed. The mosquitoes sabotaged localStorage.");
      }
    }
  }

  function resetState() {
    const message = "Reset all progress, achievements, and challenges?";

    if (!window.confirm(message)) {
      return;
    }

    const defaults = createDefaultState();
    Object.keys(state).forEach((key) => {
      delete state[key];
    });
    Object.assign(state, defaults);

    syncRank();
    render();
    saveState();
    flashToast("Timeline reset. The nonsense begins anew.");
  }

  function formatLargeNumber(value) {
    if (!Number.isFinite(value)) {
      return "0";
    }

    const abs = Math.abs(value);

    if (abs >= 1000000) {
      return `${compactFormatter.format(value)} (${integerFormatter.format(Math.floor(value))})`;
    }

    return integerFormatter.format(Math.floor(value));
  }

  function formatMoney(value) {
    return `$${moneyNumberFormatter.format(Number.isFinite(value) ? value : 0)}`;
  }

  function safeNumber(value, fallback) {
    return Number.isFinite(value) ? value : fallback;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function getMinutesElapsed() {
    return state.elapsedSeconds / 60;
  }

  function getChaosMultiplier() {
    return 1 + Math.pow(state.manualSwats / 300, 2);
  }

  function getEffectiveKillMultiplier() {
    return state.killMultiplier + state.killMultiplierBonus;
  }

  function getEffectiveCashPerKill() {
    return state.cashPerKill + state.cashPerKillBonus;
  }

  function getEffectiveAutoSwatPerFrame() {
    return state.killPerAutoSwat + state.autoSwatBonus;
  }

  function getAutoSwatPerSecond() {
    return getEffectiveAutoSwatPerFrame() * 60;
  }

  function getCashPerSwat() {
    return state.killPerSwat * getEffectiveKillMultiplier() * getChaosMultiplier() * getEffectiveCashPerKill();
  }

  function getShopLabel(items, index, doneMessage) {
    if (index >= items.length) {
      return doneMessage;
    }

    const item = items[index];
    return `${item.name} (${formatMoney(item.cost)})`;
  }

  function updateMissionLine() {
    state.missionIndex = (state.missionIndex + 1) % missionLines.length;
    ui.missionUpdate.textContent = missionLines[state.missionIndex];
  }

  function syncRank() {
    for (const rank of data.ranks) {
      if (state.mozziesKilled >= rank.kills) {
        state.cashPerKill = rank.cashPerKill;
        state.title = rank.title;
        return;
      }
    }
  }

  function awardCash(targetState, amount) {
    targetState.cash += amount;
    targetState.lifetimeCashEarned += amount;
  }

  function applyKills(kills) {
    if (state.ended || kills <= 0) {
      return 0;
    }

    const roundedKills = Math.max(0, kills);
    const available = Math.max(0, state.totalMozzies);
    const actualKills = Math.min(roundedKills, available);

    state.totalMozzies -= actualKills;
    state.mozziesKilled += actualKills;
    state.unclaimedKills += actualKills;

    if (state.totalMozzies <= 0) {
      endGame(false);
    }

    return actualKills;
  }

  function endGame(forcedByTimer) {
    if (state.ended) {
      return;
    }

    if (forcedByTimer && state.totalMozzies > 0) {
      state.mozziesKilled += state.totalMozzies;
      state.unclaimedKills += state.totalMozzies;
      state.totalMozzies = 0;
      state.emergencySweepUsed = true;
    }

    state.ended = true;
    state.totalMozzies = 0;
    state.killPerSwat = 0;
    state.killPerAutoSwat = 0;
    state.autoSwatBonus = 0;
    state.humanDeathsPerSec = 0;

    const deaths = integerFormatter.format(Math.floor(state.humanDeaths));

    if (forcedByTimer) {
      state.endMessage = `20-minute cap reached. Emergency orbital swat satellites deleted the rest. Humans lost before cleanup: ${deaths}.`; 
    } else {
      state.endMessage = `You wiped out all ${integerFormatter.format(GAME.STARTING_MOZZIES)} mozzies. Humans lost before victory: ${deaths}. The frog council is emotional.`;
    }

    evaluateMilestones(true);
    flashToast("Campaign complete. Please collect your ceremonial fruit basket.");
  }

  function spend(cost, failMessage) {
    if (state.cash < cost) {
      flashToast(failMessage || "Not enough cash yet. Claim bounty and keep swatting.");
      return false;
    }

    state.cash -= cost;
    return true;
  }

  function buyWeapon() {
    if (state.weaponIndex >= data.weapons.length) {
      flashToast("Your primary weapon is already absurdly overpowered.");
      return;
    }

    const nextWeapon = data.weapons[state.weaponIndex];

    if (!spend(nextWeapon.cost, "Primary weapon budget denied.")) {
      return;
    }

    state.weaponName = nextWeapon.name;
    state.killPerSwat = nextWeapon.damage;
    state.weaponIndex += 1;

    evaluateMilestones(true);
    flashToast(`Primary weapon upgraded: ${nextWeapon.name}`);
  }

  function buySecondaryWeapon() {
    if (state.secondaryWeaponIndex >= data.secondaryWeapons.length) {
      flashToast("Secondary system maxed. Please stop inventing lasers.");
      return;
    }

    const nextSecondary = data.secondaryWeapons[state.secondaryWeaponIndex];

    if (!spend(nextSecondary.cost, "Secondary weapon budget denied.")) {
      return;
    }

    state.secondaryWeaponName = nextSecondary.name;
    state.killPerAutoSwat += nextSecondary.damage;
    state.secondaryWeaponIndex += 1;

    evaluateMilestones(true);
    flashToast(`Auto-swat upgraded: ${nextSecondary.name}`);
  }

  function buyPet() {
    if (state.petIndex >= data.pets.length) {
      flashToast("No more pets available. The zoo is at capacity.");
      return;
    }

    const nextPet = data.pets[state.petIndex];

    if (!spend(nextPet.cost, "Pet adoption agency says your wallet is not ready.")) {
      return;
    }

    state.petsOwned.push(nextPet.name);
    state.killPerAutoSwat += nextPet.damage;
    state.petIndex += 1;

    evaluateMilestones(true);
    flashToast(`New pet joined the mission: ${nextPet.name}`);
  }

  function trainSkill() {
    if (state.skill >= 70) {
      flashToast("Skill training maxed out. You are now swat royalty.");
      return;
    }

    if (!spend(state.skillCost, "Skill class rejected payment.")) {
      return;
    }

    state.skill += 1;
    state.skillCost *= GAME.TRAINING_GROWTH;
    state.killMultiplier = Math.max(1, Math.ceil((state.skill + state.stealth) / 3));

    evaluateMilestones(true);
    flashToast("Skill training complete. Style points increased.");
  }

  function trainStealth() {
    if (state.stealth >= 70) {
      flashToast("Stealth training maxed out. You now swat in complete mystery.");
      return;
    }

    if (!spend(state.stealthCost, "Stealth class denied your enrollment.")) {
      return;
    }

    state.stealth += 1;
    state.stealthCost *= GAME.TRAINING_GROWTH;
    state.killMultiplier = Math.max(1, Math.ceil((state.skill + state.stealth) / 3));

    evaluateMilestones(true);
    flashToast("Stealth training complete. The mozzies never saw it coming.");
  }

  function claimKills() {
    if (state.unclaimedKills <= 0) {
      flashToast("No bounty yet. Swing first, paperwork later.");
      return;
    }

    const payout = state.unclaimedKills * getEffectiveCashPerKill();
    state.cash += payout;
    state.lifetimeCashEarned += payout;
    state.unclaimedKills = 0;

    evaluateMilestones(true);
    flashToast(`Bounty claimed: ${formatMoney(payout)}`);
  }

  function swat() {
    if (state.ended) {
      flashToast("No mozzies left to swat. Take a victory lap.");
      return;
    }

    state.manualSwats += 1;
    const swatKills = state.killPerSwat * getEffectiveKillMultiplier() * getChaosMultiplier();
    applyKills(swatKills);

    evaluateMilestones(false);
    popSwatButton();
  }

  function popSwatButton() {
    ui.swatButton.classList.remove("pop");
    ui.swatButton.offsetHeight;
    ui.swatButton.classList.add("pop");
  }

  function flashToast(message) {
    ui.toast.textContent = message;
    ui.toast.classList.add("show");

    if (toastTimer) {
      window.clearTimeout(toastTimer);
    }

    toastTimer = window.setTimeout(() => {
      ui.toast.classList.remove("show");
    }, 2200);
  }

  function enqueueQuestPopup(questName, rewardLabel) {
    popupQueue.push({
      questName,
      rewardLabel
    });
    showNextQuestPopup();
  }

  function showNextQuestPopup() {
    if (activePopup || popupQueue.length === 0 || !ui.questPopup) {
      return;
    }

    activePopup = popupQueue.shift();
    ui.questPopupTitle.textContent = `Quest Complete: ${activePopup.questName}`;
    ui.questPopupAmount.textContent = `Reward: ${activePopup.rewardLabel}`;
    ui.questPopup.setAttribute("aria-hidden", "false");
    ui.questPopup.classList.add("show");
    if (ui.questPopupContinue) {
      ui.questPopupContinue.focus();
    }
  }

  function dismissQuestPopup() {
    if (!activePopup || !ui.questPopup) {
      return;
    }

    ui.questPopup.classList.remove("show");
    ui.questPopup.setAttribute("aria-hidden", "true");
    activePopup = null;
    showNextQuestPopup();
  }

  function isUnlocked(idList, id) {
    return idList.includes(id);
  }

  function evaluateMilestones(showToasts) {
    for (const achievement of achievements) {
      if (isUnlocked(state.achievementsUnlocked, achievement.id)) {
        continue;
      }

      if (achievement.progress(state) >= achievement.target) {
        state.achievementsUnlocked.push(achievement.id);
        achievement.onUnlock(state);

        if (showToasts) {
          flashToast(`Achievement unlocked: ${achievement.name}`);
        }

        enqueueQuestPopup(achievement.name, achievement.reward);
      }
    }

    for (const challenge of challenges) {
      if (isUnlocked(state.challengesCompleted, challenge.id)) {
        continue;
      }

      if (challenge.progress(state) >= challenge.target) {
        state.challengesCompleted.push(challenge.id);
        challenge.onComplete(state);

        if (showToasts) {
          flashToast(`Challenge complete: ${challenge.name}`);
        }

        enqueueQuestPopup(challenge.name, challenge.reward);
      }
    }
  }

  function renderQuestList(items, completedIds, listElement) {
    const markup = items
      .map((item) => {
        const complete = completedIds.includes(item.id);
        const current = Math.min(item.progress(state), item.target);
        const ratio = item.target > 0 ? clamp(current / item.target, 0, 1) : 1;
        const progressLabel = complete
          ? "Complete"
          : `${integerFormatter.format(Math.floor(current))} / ${integerFormatter.format(item.target)}`;

        return `
          <li class="quest-item${complete ? " complete" : ""}">
            <div class="quest-head">
              <span class="quest-name">${item.name}</span>
              <span class="quest-status">${progressLabel}</span>
            </div>
            <p class="quest-desc">${item.description}</p>
            <div class="quest-progress"><span style="width:${ratio * 100}%"></span></div>
            <p class="quest-reward">Reward: ${item.reward}</p>
          </li>
        `;
      })
      .join("");

    listElement.innerHTML = markup;
  }

  function render() {
    const effectiveCashPerKill = getEffectiveCashPerKill();
    const unclaimedBounty = state.unclaimedKills * effectiveCashPerKill;
    const averageKillsPerHour = state.elapsedSeconds > 0 ? state.mozziesKilled / (state.elapsedSeconds / 3600) : 0;

    ui.totalMozzies.textContent = formatLargeNumber(state.totalMozzies);
    ui.time.textContent = `${getMinutesElapsed().toFixed(1)} min`;
    ui.title.textContent = state.title;
    ui.mozziesKilled.textContent = formatLargeNumber(state.mozziesKilled);
    ui.cashPerKill.textContent = formatMoney(effectiveCashPerKill);
    ui.cashPerSwat.textContent = formatMoney(getCashPerSwat());
    ui.averageKillsPerHour.textContent = formatLargeNumber(averageKillsPerHour);
    ui.humanDeaths.textContent = formatLargeNumber(state.humanDeaths);

    if (ui.humanDeathsMirror) {
      ui.humanDeathsMirror.textContent = ui.humanDeaths.textContent;
    }

    ui.totalCash.textContent = formatMoney(state.cash);
    ui.unclaimedKills.textContent = formatLargeNumber(state.unclaimedKills);
    ui.unclaimedBounty.textContent = formatMoney(unclaimedBounty);
    ui.unclaimedBountyLabel.textContent = formatMoney(unclaimedBounty);
    ui.weaponName.textContent = state.weaponName;
    ui.secondaryWeaponName.textContent = state.secondaryWeaponName;
    ui.pets.textContent = state.petsOwned.length > 0 ? state.petsOwned.join(", ") : PET_EMPTY_MESSAGE;
    ui.killMultiplier.textContent = `${getEffectiveKillMultiplier()}x`;
    ui.chaosMultiplier.textContent = `${getChaosMultiplier().toFixed(2)}x`;
    ui.killPerSwatFinal.textContent = formatLargeNumber(state.killPerSwat);
    ui.autoSwatRate.textContent = `${formatLargeNumber(getAutoSwatPerSecond())} / sec`;

    ui.weaponShop.textContent = getShopLabel(
      data.weapons,
      state.weaponIndex,
      "(There exists no greater weapon than that which you possess)"
    );

    ui.secondaryWeaponShop.textContent = getShopLabel(
      data.secondaryWeapons,
      state.secondaryWeaponIndex,
      "(There exists no greater secondary weapon than that which you possess)"
    );

    ui.petShop.textContent = getShopLabel(
      data.pets,
      state.petIndex,
      "(The pet shelter has closed after your legendary collection.)"
    );

    ui.skillCost.textContent = formatMoney(state.skillCost);
    ui.stealthCost.textContent = formatMoney(state.stealthCost);
    ui.skill.textContent = String(state.skill);
    ui.stealth.textContent = String(state.stealth);
    ui.endMessage.textContent = state.endMessage;

    renderQuestList(achievements, state.achievementsUnlocked, ui.achievementList);
    renderQuestList(challenges, state.challengesCompleted, ui.challengeList);

    ui.achievementCount.textContent = `${state.achievementsUnlocked.length} / ${achievements.length}`;
    ui.challengeCount.textContent = `${state.challengesCompleted.length} / ${challenges.length}`;

    ui.weaponButton.disabled = state.weaponIndex >= data.weapons.length;
    ui.secondaryWeaponButton.disabled = state.secondaryWeaponIndex >= data.secondaryWeapons.length;
    ui.petButton.disabled = state.petIndex >= data.pets.length;
    ui.trainSkillButton.disabled = state.skill >= 70;
    ui.trainStealthButton.disabled = state.stealth >= 70;
    ui.claimButton.disabled = state.unclaimedKills <= 0;
    ui.swatButton.disabled = state.ended;
  }

  function wireEvents() {
    ui.swatButton.addEventListener("click", swat);
    ui.claimButton.addEventListener("click", claimKills);
    ui.saveButton.addEventListener("click", () => saveState(true));
    ui.resetButton.addEventListener("click", resetState);
    ui.weaponButton.addEventListener("click", buyWeapon);
    ui.secondaryWeaponButton.addEventListener("click", buySecondaryWeapon);
    ui.petButton.addEventListener("click", buyPet);
    ui.trainSkillButton.addEventListener("click", trainSkill);
    ui.trainStealthButton.addEventListener("click", trainStealth);

    if (ui.questPopupContinue) {
      ui.questPopupContinue.addEventListener("click", dismissQuestPopup);
    }

    window.addEventListener("beforeunload", () => {
      saveState(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.code !== "Space") {
        return;
      }

      if (
        event.target instanceof HTMLElement &&
        ["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(event.target.tagName)
      ) {
        return;
      }

      event.preventDefault();

      if (!event.repeat) {
        swat();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.code === "Escape") {
        dismissQuestPopup();
      }
    });
  }

  function startGameLoop() {
    let lastTime = window.performance.now();

    const step = (now) => {
      const deltaSeconds = Math.min((now - lastTime) / 1000, 0.25);
      lastTime = now;

      if (!state.ended) {
        state.elapsedSeconds += deltaSeconds;
        state.humanDeaths += state.humanDeathsPerSec * deltaSeconds;

        const autoKills = getEffectiveAutoSwatPerFrame() * 60 * deltaSeconds;
        applyKills(autoKills);
        syncRank();
        evaluateMilestones(false);

        if (state.elapsedSeconds >= GAME.TIME_LIMIT_SECONDS && !state.ended) {
          endGame(true);
        }

        state.missionTick += deltaSeconds;
        if (state.missionTick >= 9) {
          updateMissionLine();
          state.missionTick = 0;
        }
      }

      render();
      window.requestAnimationFrame(step);
    };

    window.requestAnimationFrame(step);

    window.setInterval(() => {
      saveState(false);
    }, 5000);
  }

  function init() {
    if (!ui.missionUpdate.textContent) {
      ui.missionUpdate.textContent = missionLines[0];
    }

    wireEvents();
    render();
    startGameLoop();
  }

  init();
})();
