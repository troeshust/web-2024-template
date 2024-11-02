import { Typography } from "@mui/material";
import { AppContainer, GuideSection } from './styles/components';
import { SpellLink } from './components/SpellLink';
import { SPELLS } from './constants/guide';

function App() {
  return (
    <AppContainer>
      <Typography variant="h4" component="h1" gutterBottom>
        Elemental Shaman Guide
      </Typography>
      <GuideSection>
        <strong>Single Target Priority:</strong>
        <ol>
          {SPELLS.map((spell) => (
            <li key={spell.id}>
              <SpellLink spell={spell} />
              {spell.condition && ` ${spell.condition}`}
            </li>
          ))}
        </ol>
      </GuideSection>
    </AppContainer>
  );
}

export default App;
