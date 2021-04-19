class Weapon{
    constructor(name, damage, cost){
        this.name = name;
        this.damage = damage;
        this.cost = cost;
    }
}

let weapon1 = new Weapon("Daiso Fly-Swatter", 2, 2.00);
let weapon2 = new Weapon("Ordinary Fly-Swatter", 5, 6.99);
let weapon3 = new Weapon("Ergonomic Fly-Swatter", 12, 17.99);
let weapon4 = new Weapon("Super Light-Weight Fly-Swatter", 24, 69.99);
let weapon5 = new Weapon("Extremely Long and Large Fly-Swatter", 49, 259.99);
let weapon6 = new Weapon("Laser-grid 'Insta-Death' Fly-Swatter", 88, 777.00);
let weapon7 = new Weapon("Katana-style Fly-Swatter", 275, 2750.00);
let weapon8 = new Weapon("Wrath and Vengeance Fly-Swatter", 1050, 7399.99);
let weapon9 = new Weapon("Twin-headed Iguana-Emblem Fly-Swatter", 4789, 29999.99);
let weapon10 = new Weapon("Triple-headed Frog-Emblem Fly-Swatter", 10000, 174000.00);
let weapon11 = new Weapon("Nine-headed Spider-Emblem Fly-Swatter", 17171, 700000.00);
let weapon12 = new Weapon("Black Magic Fly-Swatter", 25600, 2300000.00);
let weapon13 = new Weapon("Mighty Wand of Swat", 640000, 42500000.00);
let weapon14 = new Weapon("Fly-Swatter of Fire and Ice", 16000000, 7636000000.00);
let weapon15 = new Weapon("The Wizard of Moz Fly-Swatter", 400000000, 248940000000.00);
let weapon16 = new Weapon("Protector of All that is Good and Right Fly-Swatter", 100000000000, 99999999999999.99);

const weapons = [weapon1, weapon2, weapon3, weapon4, weapon5, weapon6, weapon7, weapon8, weapon9, weapon10, weapon11, weapon12, weapon13, weapon14, weapon15, weapon16];

class SecondaryWeapon{
    constructor(name, damage, cost){   
    this.name = name;
    this.damage = damage;
    this.cost = cost;
    }
}

let secondaryWeapon1 = new SecondaryWeapon("Automated Exo-Skeletal Fly-Swatting Extensions", 11, 999.99);
let secondaryWeapon2 = new SecondaryWeapon("Longer-Armed Automated Exo-Skeletal Fly-Swatting Extensions", 24, 1599.99)
let secondaryWeapon3 = new SecondaryWeapon("Self-targetting Micro Lasers", 101, 12500)
let secondaryWeapon4 = new SecondaryWeapon("Self-targetting Moderate Lasers", 303, 99999.99)
let secondaryWeapon5 = new SecondaryWeapon("Military-Grade Auto-Spray Insecticide", 620, 1500000.00)
let secondaryWeapon6 = new SecondaryWeapon("Insecticide Cluster Grenades", 1200, 30000000.00)
let secondaryWeapon7 = new SecondaryWeapon("MozBuster insecticide", 1999, 5000000000.00)
let secondaryWeapon8 = new SecondaryWeapon("FDA Not-Approved Mozsecticide", 45000, 5000000000.00)
let secondaryWeapon9 = new SecondaryWeapon("Low-heat Safe-For-Humans Flamethrowers", 7200000, 75000000000.00)
let secondaryWeapon10 = new SecondaryWeapon("Scorching Sun Mozzie Widower", 135790000, 144400000000.50)
let secondaryWeapon11 = new SecondaryWeapon("Bleong Music Pied-Piper Mozzie Trap", 10000000000, 9999999999999.99)


const secondaryWeapons = [secondaryWeapon1, secondaryWeapon2, secondaryWeapon3, secondaryWeapon4, secondaryWeapon5, secondaryWeapon6, secondaryWeapon7, secondaryWeapon8, secondaryWeapon9, secondaryWeapon10, secondaryWeapon11];

class Pet{
    constructor(name, damage, cost){   
    this.name = name;
    this.damage = damage;
    this.cost = cost;
    }
}

let pet1 = new Pet("Iggy the Iguana", 0.05, 5.45);
let pet2 = new Pet("Finnick the Frog", 0.1, 12.25);
let pet3 = new Pet("PakPak the Farm Chicken", 1, 44.44);
let pet4 = new Pet("PokPok the Farm Chicken", 1, 66.66);
let pet5 = new Pet("PekPek the Farm Chicken", 1, 88.88);
let pet6 = new Pet("Gyarados the Farm Duck", 1, 111.11);
let pet7 = new Pet("Annie the Mozzie-eating Bat", 5, 175.00);
let pet8 = new Pet("Mozibayne the Malaysian Jumping Spider", 5000, 120000)
let pet9 = new Pet("Oh-Ho the West Sumatran Mozzie-Hunting White-tailed Phoenix", 100000000, 1444000000000.50)
let pet10 = new Pet("Rachie the Sonic Hamster", 10000000000, 9999999999999.99)

const petlist = [pet1, pet2, pet3, pet4, pet5, pet6, pet7, pet8, pet9, pet10];

var pets = "(No Pets Currently. Check out the Shop when you have time!)";
var stealth = 1;
var skill = 1;

var dualwield = false;
var autoclaim = false;
