import { SpellLink } from '../types/guide';

export const SPELLS: SpellLink[] = [
  { id: 192249, name: "Storm Elemental" },
  { id: 191634, name: "Stormkeeper" },
  { id: 375982, name: "Primordial Wave", condition: "when you don't have Surge of Power buff" },
  { id: 378081, name: "Ancestral Swiftness" },
  { id: 114050, name: "Ascendance", condition: "when fight will last longer than 3 minutes or you have Spymaster's Web buff" },
  { id: 383009, name: "Tempest", condition: "when you have Surge of Power buff" },
  { id: 188196, name: "Lightning Bolt", condition: "when you have Surge of Power buff" },
  { id: 192222, name: "Liquid Magma Totem", condition: "when Flame Shock needs refresh and you don't have Master of the Elements buff" },
  { id: 8042, name: "Earth Shock", condition: "when you have more than 135 Maelstrom or less than 5 seconds left in fight" },
  { id: 210714, name: "Icefury", condition: "when you don't have either Nature or Fire Fusion of Elements buffs" },
  { id: 51505, name: "Lava Burst", condition: "on target with Flame Shock lasting more than 2 seconds, when you don't have Master of the Elements buff" },
  { id: 8042, name: "Earth Shock", condition: "when you have either Tempest or Stormkeeper buff" },
  { id: 383009, name: "Tempest" },
  { id: 188196, name: "Lightning Bolt" }
];

export const WOWHEAD_BASE_URL = "https://www.wowhead.com/spell=";