import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Routes } from 'react-router-dom';

import NavbarSide from './allRes/Navbar/Navbar';

import CalcDMG from './allRes/calcDamage/calcDamage';
import Heal from './allRes/calcHeal/Heal';
import RunesLvL from './allRes/calcRunes/Runes';

import './allRes/calcHeal/HealCSS/Heal.css';
import './allRes/calcDamage/DamageCSS/DamageCss.css';
import './allRes/calcRunes/RunesCss.css/Runes.css';

function App() {
  return (
    <>
      <NavbarSide />
      <div className="App">
        <Routes>
          <Route path="*" element={<CalcDMG />} />
          <Route path="/damage" element={<CalcDMG />} />
          <Route path="/heal" element={<Heal />} />
          <Route path="/runes" element={<RunesLvL />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
