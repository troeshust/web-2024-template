import { SpellLink as SpellLinkType } from '../types/guide';

interface SpellLinkProps {
  spell: SpellLinkType;
  baseUrl?: string;
}

export const SpellLink: React.FC<SpellLinkProps> = ({ 
  spell, 
  baseUrl = "https://www.wowhead.com/spell=" 
}) => (
  <a href={`${baseUrl}${spell.id}`}>
    {spell.name}
  </a>
); 