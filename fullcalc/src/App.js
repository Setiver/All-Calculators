import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import NavbarSide from './allRes/Navbar/Navbar';
import CalcDMG from './allRes/calcDamage/calc';
import './allRes/calcDamage/DamageCSS/App.css';
import './allRes/calcDamage/DamageCSS/App-laptop.css';
import './allRes/calcDamage/DamageCSS/App-laptopS.css';
import './allRes/calcDamage/DamageCSS/App-laptopM.css';
import './allRes/calcDamage/DamageCSS/App-mobileM.css';
import './allRes/calcDamage/DamageCSS/App-mobileL.css';

function App() {
  return (
    <div className="App">
      <NavbarSide />
      <CalcDMG />
    </div>
  );
}

export default App;
