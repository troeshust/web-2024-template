export interface SpellLink {
  id: number;
  name: string;
  condition?: string;
}

export interface GuideSection {
  title: string;
  spells: SpellLink[];
} 