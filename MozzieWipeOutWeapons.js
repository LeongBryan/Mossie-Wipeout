(() => {
  "use strict";

  const weapons = [
    { name: "Daiso Fly-Swatter", damage: 2, cost: 2.0 },
    { name: "Ordinary Fly-Swatter", damage: 3, cost: 5.0 },
    { name: "Ergonomic Fly-Swatter", damage: 4, cost: 12.0 },
    { name: "Super Light-Weight Fly-Swatter", damage: 6, cost: 28.0 },
    { name: "Extremely Long and Large Fly-Swatter", damage: 9, cost: 65.0 },
    { name: "Laser-grid 'Insta-Death' Fly-Swatter", damage: 13, cost: 140.0 },
    { name: "Katana-style Fly-Swatter", damage: 18, cost: 300.0 },
    { name: "Wrath and Vengeance Fly-Swatter", damage: 25, cost: 650.0 },
    { name: "Twin-headed Iguana-Emblem Fly-Swatter", damage: 34, cost: 1300.0 },
    { name: "Triple-headed Frog-Emblem Fly-Swatter", damage: 46, cost: 2600.0 },
    { name: "Nine-headed Spider-Emblem Fly-Swatter", damage: 62, cost: 5200.0 },
    { name: "Black Magic Fly-Swatter", damage: 83, cost: 10500.0 },
    { name: "Mighty Wand of Swat", damage: 110, cost: 21000.0 },
    { name: "Fly-Swatter of Fire and Ice", damage: 145, cost: 42000.0 },
    { name: "The Wizard of Moz Fly-Swatter", damage: 190, cost: 84000.0 },
    { name: "Protector of All that is Good and Right Fly-Swatter", damage: 248, cost: 168000.0 }
  ];

  const secondaryWeapons = [
    { name: "Automated Exo-Skeletal Fly-Swatting Extensions", damage: 0.2, cost: 90.0 },
    { name: "Longer-Armed Automated Exo-Skeletal Fly-Swatting Extensions", damage: 0.32, cost: 220.0 },
    { name: "Self-targeting Micro Lasers", damage: 0.5, cost: 520.0 },
    { name: "Self-targeting Moderate Lasers", damage: 0.75, cost: 1800.0 },
    { name: "Military-Grade Auto-Spray Insecticide", damage: 1.05, cost: 3400.0 },
    { name: "Insecticide Cluster Grenades", damage: 1.4, cost: 6200.0 },
    { name: "MozBuster Insecticide", damage: 1.85, cost: 10800.0 },
    { name: "FDA Not-Approved Mozsecticide", damage: 2.4, cost: 18500.0 },
    { name: "Low-Heat Safe-For-Humans Flamethrowers", damage: 3.1, cost: 31000.0 },
    { name: "Scorching Sun Mozzie Widower", damage: 3.95, cost: 51000.0 },
    { name: "Bleong Music Pied-Piper Mozzie Trap", damage: 5.0, cost: 83000.0 }
  ];

  const pets = [
    { name: "Iggy the Iguana", damage: 0.08, cost: 25.0 },
    { name: "Finnick the Frog", damage: 0.16, cost: 65.0 },
    { name: "PakPak the Farm Chicken", damage: 0.26, cost: 140.0 },
    { name: "PokPok the Farm Chicken", damage: 0.39, cost: 390.0 },
    { name: "PekPek the Farm Chicken", damage: 0.55, cost: 640.0 },
    { name: "Gyarados the Farm Duck", damage: 0.72, cost: 980.0 },
    { name: "Annie the Mozzie-Eating Bat", damage: 0.9, cost: 1450.0 },
    { name: "Mozibayne the Malaysian Jumping Spider", damage: 1.1, cost: 2100.0 },
    { name: "Oh-Ho the West Sumatran Mozzie-Hunting White-Tailed Phoenix", damage: 1.32, cost: 3000.0 },
    { name: "Rachie the Sonic Hamster", damage: 1.56, cost: 4200.0 }
  ];

  const ranks = [
    { kills: 650000, cashPerKill: 0.22, title: "Hero of Humanity" },
    { kills: 420000, cashPerKill: 0.16, title: "Grand Sensei of the School of Swat" },
    { kills: 250000, cashPerKill: 0.12, title: "Wizard of Swat, Apprentice of Dark Magic" },
    { kills: 130000, cashPerKill: 0.09, title: "Undisputed Olympic Swat Champion" },
    { kills: 60000, cashPerKill: 0.07, title: "The Fearsome Mozcateer" },
    { kills: 25000, cashPerKill: 0.055, title: "Indie-Swatter-Jones" },
    { kills: 9000, cashPerKill: 0.04, title: "Rising-Star Swat Sensation" },
    { kills: 2500, cashPerKill: 0.03, title: "Senior Swat Executive" },
    { kills: 500, cashPerKill: 0.024, title: "Reasonably-Paid Swat Associate" },
    { kills: 0, cashPerKill: 0.02, title: "Underpaid Fly Swatter Intern" }
  ];

  const freezeList = (items) => Object.freeze(items.map((item) => Object.freeze({ ...item })));

  window.MossieData = Object.freeze({
    weapons: freezeList(weapons),
    secondaryWeapons: freezeList(secondaryWeapons),
    pets: freezeList(pets),
    ranks: freezeList(ranks)
  });
})();
