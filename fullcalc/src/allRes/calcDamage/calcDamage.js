import { useState, useEffect, useRef } from 'react';
import Instruction from './Instruction';
import DamageList from '../img/damage.png';
import HistoryList from '../img/history.png';
import Dice4 from '../img/dice4.png';
import Dice6 from '../img/dice6.png';
import Dice8 from '../img/dice8.png';
import Dice10 from '../img/dice10.png';
import Dice12 from '../img/dice12.png';
import Dice20 from '../img/dice20.png';
import Dice100 from '../img/dice100.png';
import Frame from '../img/frame.png';
import SinFrame from '../img/sinframe.png';
import ResetAllOrnament from '../img/resetallornament.png';
import ResetDamageOrnament from '../img/resetDAMAGEornament.png';
import IceCube from '../img/icecube.png';
import BurnCube from '../img/burncube.png';
import PoisonCube from '../img/poisoncube.png';
import BleedCube from '../img/bleedcube.png';
import VoidCube from '../img/voidcube.png';

const CalcDMG = () => {
  // ---------------------------------- //
  // buttons for barier,armor,hp, mana
  const [buttonValueBarier, setButtonValueBarier] = useState('');
  const [buttonValueArmor, setButtonValueArmor] = useState('');
  const [buttonValueHP, setButtonValueHP] = useState('');
  const [buttonValueMana, setButtonValueMana] = useState('');

  // storing values of inputs
  const [barierValue, setBarierValue] = useState('');
  const [armorValue, setArmorValue] = useState('');
  const [hpValue, setHpValue] = useState('');
  const [manaValue, setManaValue] = useState('');
  const [damageValue, setDamageValue] = useState('');
  const [healValue, setHealValue] = useState('');

  // storing values of addicional damage
  const [burnDamageValue, setBurnDamageValue] = useState('');
  const [coldDamageValue, setColdDamageValue] = useState('');
  const [poisonDamageValue, setPoisonDamageValue] = useState('');
  const [bleedDamageValue, setBleedDamageValue] = useState('');
  const [voidDamageValue, setVoidDamageValue] = useState('');

  // storing resists of inputs
  const [resistValueDamage, setResistValueDamage] = useState('');
  const [resistValueBurn, setResistValueBurn] = useState('');
  const [resistValueCold, setResistValueCold] = useState('');
  const [resistValuePoison, setResistValuePoison] = useState('');
  const [resistValueBleed, setResistValueBleed] = useState('');
  const [resistValueVoid, setResistValueVoid] = useState('');

  // add all damage to one value
  const [fullValueDamage, setFullValueDamage] = useState(0);

  // history holders values
  const [historyHolderBarrier, setHistoryHolderBarrier] = useState([]);
  const [historyHolderArmor, setHistoryHolderArmor] = useState([]);
  const [historyHolderHP, setHistoryHolderHP] = useState([]);

  // roll number holder
  const [rollValue, setRollValue] = useState('Roll');
  const [trialValue, setTrialValue] = useState('');
  const [sinValue, setSinValue] = useState('');
  const [sinValueFifty, setSinValueFifty] = useState('');
  const [rollMath, setRollMath] = useState(100);
  const [previousNumber, setPreviousNumber] = useState('');

  const rollBackground = useRef(null);
  const sinBackground = useRef(null);
  const sinFiftyBackground = useRef(null);
  // ---------------------------------- //

  // keep all resists for reset button
  const resistsAllHolder = () => {
    setResistValueDamage('');
    setResistValueBurn('');
    setResistValueCold('');
    setResistValuePoison('');
    setResistValueBleed('');
    setResistValueVoid('');
  };

  // keep all damage for reset button
  const damageAllHolder = () => {
    setDamageValue('');
    setBurnDamageValue('');
    setColdDamageValue('');
    setPoisonDamageValue('');
    setBleedDamageValue('');
    setVoidDamageValue('');
    setHealValue('');
    setRollValue('Roll');
    setTrialValue('');
    setSinValue('');
    setSinValueFifty('');
    setPreviousNumber('');
    resistsAllHolder();
  };

  // reset button => set all to be empty
  const resetOnClickAll = () => {
    setBarierValue('');
    setArmorValue('');
    setHpValue('');
    setManaValue('');
    setButtonValueBarier('');
    setButtonValueArmor('');
    setButtonValueHP('');
    setButtonValueMana('');
    setHistoryHolderBarrier([]);
    setHistoryHolderArmor([]);
    setHistoryHolderHP([]);
    setRollMath(100);

    damageAllHolder();
    resistsAllHolder();
  };

  // reset button => set damage to be empty
  const resetOnClickDamage = () => {
    damageAllHolder();
    resistsAllHolder();
  };

  // set useState with value
  const onChangeHandler = (event, seter) => {
    seter(Number(event.target.value));
  };

  useEffect(() => {
    const originalScrollPosition = window.pageYOffset;
    window.scrollTo(0, originalScrollPosition);
  }, []);

  // change color of input whene hit Enter and give button a value
  const setupButtonInputRight = (event, selector, color, setValueButton, seter) => {
    event.preventDefault();
    if (Number(event.target.value) > 0) {
      seter(Number(event.target.value));

      document.querySelector(selector).style.backgroundColor = color;
      setValueButton(Number(event.target.value));
    }
  };

  // on Reset clear colors of all inputs
  const effectBackToWhite =
    (barierValue || armorValue || hpValue || manaValue) === '' ? 'buttonValueBarier' : '';

  useEffect(() => {
    const inputElems = document.querySelectorAll('.input-look');
    inputElems.forEach(elem => {
      elem.style.backgroundColor = 'white';
    });
  }, [effectBackToWhite]);

  useEffect(() => {
    setFullValueDamage(
      Number(
        Math.trunc(
          damageValue -
            damageValue * (resistValueDamage <= 100 ? resistValueDamage * 0.01 : '') -
            healValue -
            -(
              burnDamageValue -
              burnDamageValue * (resistValueBurn <= 100 ? resistValueBurn * 0.01 : '')
            ) -
            -(
              coldDamageValue -
              coldDamageValue * (resistValueCold <= 100 ? resistValueCold * 0.01 : '')
            ) -
            -(
              poisonDamageValue -
              poisonDamageValue * (resistValuePoison <= 100 ? resistValuePoison * 0.01 : '')
            ) -
            -(
              bleedDamageValue -
              bleedDamageValue * (resistValueBleed <= 100 ? resistValueBleed * 0.01 : '')
            ) -
            -(
              voidDamageValue -
              voidDamageValue * (resistValueVoid <= 100 ? resistValueVoid * 0.01 : '')
            )
        )
      )
    );
  }, [
    damageValue,
    resistValueDamage,
    healValue,
    burnDamageValue,
    resistValueBurn,
    coldDamageValue,
    resistValueCold,
    poisonDamageValue,
    resistValuePoison,
    bleedDamageValue,
    resistValueBleed,
    voidDamageValue,
    resistValueVoid,
  ]);

  // damage on buttons
  const damageOnClick = event => {
    const clickOfButton = event.target;
    const barierButton = document.querySelector('.barier-button');
    const armorButton = document.querySelector('.armor-button');
    const hpButton = document.querySelector('.hp-button');
    const voidMana =
      voidDamageValue > 0 && resistValueVoid !== 100 ? setButtonValueMana(buttonValueMana - 1) : '';
    const burnArmor = Math.trunc(burnDamageValue / 100 *20);
    const poisonBarier = Math.trunc(buttonValueBarier / 10);

    if (clickOfButton === barierButton) {
      setButtonValueBarier(buttonValueBarier - fullValueDamage - poisonBarier, voidMana);
      setHistoryHolderBarrier(historyHolderBarrier => historyHolderBarrier.concat(fullValueDamage+poisonBarier));
    }
    if (clickOfButton === armorButton) {
      setButtonValueArmor(buttonValueArmor - fullValueDamage - burnArmor, voidMana);
      setHistoryHolderArmor(historyHolderArmor => historyHolderArmor.concat(fullValueDamage + burnArmor));
    }
    if (clickOfButton === hpButton) {
      setButtonValueHP(buttonValueHP - fullValueDamage, voidMana);
      setHistoryHolderHP(historyHolderHP => historyHolderHP.concat(fullValueDamage));
    }
  };

  // history List
  const HistoryHandler = ({ type, holder }) => {
    const historia = holder.map((obj, i) => (
      <li key={i}>
        {type}: {obj}
      </li>
    ));
    return <div>{historia}</div>;
  };

  // Dice Roll

  const diceRollNumber = () => {
    if (rollValue !== 'Roll') setPreviousNumber(rollValue);

    let numberRoll = Math.floor(Math.random() * rollMath) + 1;

    if (rollMath === 100) {
      if ([47, 7, 95, 88, 76, 55, 74, 100].includes(numberRoll)) {
        setRollValue(Number(numberRoll));
        rollBackground.current.style.backgroundColor = 'green';
      } else if ([13, 9, 23, 31, 8, 3].includes(numberRoll)) {
        setRollValue(Number(numberRoll));
        rollBackground.current.style.backgroundColor = 'red';
      } else if ([69].includes(numberRoll)) {
        setRollValue(Number(numberRoll));
        rollBackground.current.style.backgroundColor = 'rgb(255, 56, 212)';
      } else if ([1, 2].includes(numberRoll)) {
        setRollValue(Number(numberRoll));
        rollBackground.current.style.backgroundColor = 'purple';
      } else {
        setRollValue(Number(numberRoll));
        rollBackground.current.style.backgroundColor = 'rgb(213, 113, 0)';
      }
    } else {
      setRollValue(Number(numberRoll));
      rollBackground.current.style.backgroundColor = 'rgb(213, 113, 0)';
    }
  };
  // if new roll then set sin empty
  useEffect(() => {
    if (rollValue !== 7) {
      setSinValue('');
      setSinValueFifty('');
    }
  }, [rollValue]);

  // create two buttons for 7
  const SinsRoll = () => {
    const sinsArr = ['Pride', 'Greed', 'Envy', 'Gluttony', 'Sloth', 'Wrath', 'Lust'];

    const sinRoll = () => {
      let sinRoll = Math.floor(Math.random() * 7);
      setSinValue(sinRoll);
    };

    useEffect(() => {
      const sinsColorArr = [
        'purple',
        'gold',
        'green',
        'brown',
        'rgb(112, 127, 146)',
        'red',
        'rgb(255, 61, 236)',
      ];

      if (sinValue === '') {
        sinBackground.current.style.backgroundColor = 'rgb(213, 113, 0)';
      }

      sinBackground.current.style.backgroundColor = sinsColorArr[sinValue];
    }, []);

    const sinRollFifty = () => {
      let sinRoll = Math.floor(Math.random() * 100) + 1;
      setSinValueFifty(sinRoll);
    };

    useEffect(() => {
      if (sinValueFifty <= 50) {
        sinFiftyBackground.current.style.backgroundColor = 'red';
      }
      if (sinValueFifty > 50) {
        sinFiftyBackground.current.style.backgroundColor = 'green';
      }
      if (sinValueFifty === '') {
        sinFiftyBackground.current.style.backgroundColor = 'rgb(213, 113, 0)';
      }
    });

    return (
      <>
        <div>
          <img
            src={SinFrame}
            alt="sinframe"
            className={`sin-frame ${sinValue === '' ? 'slideDown' : ''} `}
          />
          <button
            className={`number-dice-roll button-look sins ${sinValue === '' ? 'slideDown' : ''} `}
            ref={sinBackground}
            onClick={sinRoll}
            value={sinsArr[sinValue]}>
            {sinsArr[sinValue]}
          </button>

          <button
            className={`number-dice-roll button-look half ${sinValue === '' ? 'slideDown' : ''} `}
            ref={sinFiftyBackground}
            onClick={sinRollFifty}
            value={sinValueFifty}>
            {sinValueFifty}
          </button>
        </div>
      </>
    );
  };

  // -------------------------------------------------------------------- //
  // -------------------------------------------------------------------- //
  // -------------------------------------------------------------------- //
  // -------------------------------------------------------------------- //
  // -------------------------------------------------------------------- //
  // -------------------------------------------------------------------- //

  return (
    <>
      <div>
        {/* -----------------ResetButtonsUPLeft----------------- */}
        <div className="reset-position">
          <img
            src={ResetAllOrnament}
            alt="ResetAll"
            className="ornament-reset-all"
            onDoubleClick={resetOnClickAll}
          />
          <img
            src={ResetDamageOrnament}
            alt="ResetDamage"
            className="ornament-reset-damage"
            onClick={resetOnClickDamage}
          />
        </div>
        {/* -----------------Instruction----------------- */}
        <Instruction />
        {/* ---------------------------------------------------- */}
        {/* -----------------RightSideInputs----------------- */}
        {/* -----------------BARIER----------------- */}
        <div className="barrier-armor-hp-mana-container">
          <div className="barrier-armor-div-mobile">
            <p className="text-up">Barrier</p>
            <input
              type="number"
              className="barrier-input input-look"
              onChange={event =>
                setupButtonInputRight(
                  event,
                  '.barrier-input',
                  'rgb(0, 243, 186)',
                  setButtonValueBarier,
                  setBarierValue
                )
              }
              placeholder="Enter"
              value={barierValue > 0 ? barierValue : ''}
            />

            {/* -----------------ARMOR----------------- */}
            <p className="text-up">Armor</p>
            <input
              type="number"
              className="armor-input input-look"
              onChange={event =>
                setupButtonInputRight(
                  event,
                  '.armor-input',
                  'rgb(136, 136, 136)',
                  setButtonValueArmor,
                  setArmorValue
                )
              }
              placeholder="Enter"
              value={armorValue > 0 ? armorValue : ''}
            />
          </div>
          <div className="hp-mana-div-mobile">
            {/* -----------------HP----------------- */}
            <p className="text-up">HP</p>
            <input
              type="number"
              className="hp-input input-look"
              onChange={event =>
                setupButtonInputRight(
                  event,
                  '.hp-input',
                  'rgb(163, 0, 0)',
                  setButtonValueHP,
                  setHpValue
                )
              }
              placeholder="Enter"
              value={hpValue > 0 ? hpValue : ''}
            />

            {/* -----------------Mana----------------- */}
            <p className="text-up">Mana</p>
            <input
              type="number"
              className="mana-input input-look"
              onChange={event =>
                setupButtonInputRight(
                  event,
                  '.mana-input',
                  'rgb(0, 204, 255)',
                  setButtonValueMana,
                  setManaValue
                )
              }
              placeholder="Enter"
              value={manaValue > 0 ? manaValue : ''}
            />
          </div>
        </div>
        {/* -----------------ButtonsUP----------------- */}
        <div className="buttons-up-div">
          {/* -----------------Barrier----------------- */}

          <button
            className="button-look barier-button"
            value={buttonValueBarier}
            onClick={damageOnClick}>
            {buttonValueBarier <= -1000 ? 'XD' : buttonValueBarier}
          </button>

          {/* -----------------Armor----------------- */}

          <button
            className="button-look armor-button"
            value={buttonValueArmor}
            onClick={damageOnClick}>
            {buttonValueArmor <= -1000 ? 'XD' : buttonValueArmor}
          </button>

          {/* -----------------HP----------------- */}

          <button className="button-look hp-button" value={buttonValueHP} onClick={damageOnClick}>
            {buttonValueHP <= -1000 ? 'XD' : buttonValueHP}
          </button>

          {/* -----------------Mana----------------- */}

          <button
            className="button-look mana-button"
            value={buttonValueMana}
            onClick={() => setButtonValueMana(buttonValueMana - 1)}>
            {buttonValueMana}
          </button>
        </div>
        {/* ---------------------------------------------------- */}
        {/* -----------------LeftSideInputs----------------- */}
        {/* -----------------Damage----------------- */}
        <div className="damage-res-heal-container">
          <p className="text-up text-damage">Damage</p>
          <input
            type="number"
            className="damage-input input-look"
            onChange={event => onChangeHandler(event, setDamageValue)}
            placeholder="Click on buttons"
            value={damageValue > 0 ? damageValue : ''}
          />
          {/* -----------------ResistanceDamage----------------- */}
          <p className="text-up text-resist">Resist.%</p>
          <input
            type="number"
            className="resist-input input-look"
            onChange={event => onChangeHandler(event, setResistValueDamage)}
            placeholder="Click on buttons"
            value={resistValueDamage !== 0 && resistValueDamage <= 100 ? resistValueDamage : ''}
          />
          {/* -----------------Heal----------------- */}
          <p className="text-up text-heal">Heal</p>
          <input
            type="number"
            className="heal-input input-look"
            onChange={event => onChangeHandler(event, setHealValue)}
            placeholder="Click on buttons"
            value={healValue > 0 ? healValue : ''}
          />
        </div>
        {/* ---------------------------------------------------- */}
        {/* -----------------DamageList----------------- */}
        <div className="full-damage-list-div">
          <img src={DamageList} alt="damage" className="damage-list-png" />
          {/* <p className="full-damage-text-up">DAMAGE</p> */}
          <ul className="list-group left">
            {damageValue > 0 ? <li className="list-group-item">⚔️ Damage: {damageValue}</li> : ''}
            {resistValueDamage !== 0 && resistValueDamage !== '' && resistValueDamage <= 100 ? (
              <li className="list-group-item">🛡️ Resistance: {resistValueDamage}%</li>
            ) : (
              ''
            )}
            {healValue > 0 ? <li className="list-group-item">❤️ Heal: {healValue}</li> : ''}
            {burnDamageValue > 0 ? (
              <li className="list-group-item">🔥 Burn: {burnDamageValue}</li>
            ) : (
              ''
            )}
            {resistValueBurn !== 0 &&
            resistValueBurn !== '' &&
            resistValueBurn <= 100 &&
            burnDamageValue !== 0 ? (
              <li className="list-group-item">🧯 Burn Res: {resistValueBurn}%</li>
            ) : (
              ''
            )}
            {coldDamageValue > 0 ? (
              <li className="list-group-item"> ❄️ Cold: {coldDamageValue}</li>
            ) : (
              ''
            )}
            {resistValueCold !== 0 &&
            resistValueCold !== '' &&
            resistValueCold <= 100 &&
            coldDamageValue !== 0 ? (
              <li className="list-group-item">🧥 Cold Res: {resistValueCold}%</li>
            ) : (
              ''
            )}
            {poisonDamageValue > 0 ? (
              <li className="list-group-item">🧪 Poison: {poisonDamageValue}</li>
            ) : (
              ''
            )}
            {resistValuePoison !== 0 &&
            resistValuePoison !== '' &&
            resistValuePoison <= 100 &&
            poisonDamageValue !== 0 ? (
              <li className="list-group-item">💊 Poison Res: {resistValuePoison}%</li>
            ) : (
              ''
            )}
            {bleedDamageValue > 0 ? (
              <li className="list-group-item">🩸 Bleed: {bleedDamageValue}</li>
            ) : (
              ''
            )}
            {resistValueBleed !== 0 &&
            resistValueBleed !== '' &&
            resistValueBleed <= 100 &&
            bleedDamageValue !== 0 ? (
              <li className="list-group-item">🩹 Bleed Res: {resistValueBleed}%</li>
            ) : (
              ''
            )}
            {voidDamageValue > 0 ? (
              <li className="list-group-item"> 👾 Void: {voidDamageValue}</li>
            ) : (
              ''
            )}
            {resistValueVoid !== 0 &&
            resistValueVoid !== '' &&
            resistValueVoid <= 100 &&
            voidDamageValue !== 0 ? (
              <li className="list-group-item">🚫 Void Res: {resistValueVoid}%</li>
            ) : (
              ''
            )}
            {/* -----------------ValueShowButton----------------- */}
          </ul>
          <button className="button-list-damage move button-look ">
            {fullValueDamage ? fullValueDamage : '0'}
          </button>
        </div>
        {/* -----------------HostoryDamageList----------------- */}
        <div className="history-damage-list-div">
          <img src={HistoryList} alt="history" className="history-list-png" />
          <ul className="list-group right">
            <li></li>
            <HistoryHandler type={'Barrier'} holder={historyHolderBarrier} />
            <HistoryHandler type={'Armor'} holder={historyHolderArmor} />
            <HistoryHandler type={'HP'} holder={historyHolderHP} />
          </ul>
        </div>
        {/* -----------------BottomInputs----------------- */}
        {/* -----------------Burn----------------- */}
        <div className="burn-container">
          <p className="text-up emoji">🔥</p>
          <img src={BurnCube} alt="BurnCube" className="burn-cube" />
          <input
            type="number"
            className="additional-damage input-look burn-input"
            onChange={event => onChangeHandler(event, setBurnDamageValue)}
            placeholder="0"
            value={burnDamageValue > 0 ? burnDamageValue : ''}
          />
        </div>
        {burnDamageValue > 0 && (
          <div className={`burn-container-resist show `}>
            <p className="text-up emoji">🧯</p>
            <input
              type="number"
              className="additional-damage  input-look"
              onChange={event => onChangeHandler(event, setResistValueBurn)}
              placeholder="0"
              value={
                resistValueBurn !== 0 && resistValueBurn !== '' && resistValueBurn <= 100
                  ? resistValueBurn
                  : ''
              }
            />
          </div>
        )}
        {/* -----------------Cold----------------- */}
        <div className="cold-container">
          <img src={IceCube} alt="IceCube" className="cold-cube" />
          <p className="text-up emoji">❄️</p>
          <input
            type="number"
            className="additional-damage  input-look"
            onChange={event => onChangeHandler(event, setColdDamageValue)}
            placeholder="0"
            value={coldDamageValue > 0 ? coldDamageValue : ''}
          />
        </div>
        {coldDamageValue > 0 && (
          <div className={`cold-container-resist show`}>
            <p className="text-up emoji">🧥</p>
            <input
              type="number"
              className="additional-damage  input-look"
              onChange={event => onChangeHandler(event, setResistValueCold)}
              placeholder="0"
              value={
                resistValueCold !== 0 && resistValueCold !== '' && resistValueCold <= 100
                  ? resistValueCold
                  : ''
              }
            />
          </div>
        )}
        {/* -----------------Poison----------------- */}
        <div className="poison-container">
          <p className="text-up emoji">🧪</p>
          <img src={PoisonCube} alt="PoisonCube" className="poison-cube" />
          <input
            type="number"
            className="additional-damage  input-look"
            onChange={event => onChangeHandler(event, setPoisonDamageValue)}
            placeholder="0"
            value={poisonDamageValue > 0 ? poisonDamageValue : ''}
          />
        </div>
        {poisonDamageValue > 0 && (
          <div className={`poison-container-resist show`}>
            <p className="text-up emoji">💊</p>
            <input
              type="number"
              className="additional-damage  input-look"
              onChange={event => onChangeHandler(event, setResistValuePoison)}
              placeholder="0"
              value={
                resistValuePoison !== 0 && resistValuePoison !== '' && resistValuePoison <= 100
                  ? resistValuePoison
                  : ''
              }
            />
          </div>
        )}
        {/* -----------------Bleed----------------- */}
        <div className="bleed-container">
          <p className="text-up emoji">🩸</p>
          <img src={BleedCube} alt="BleedCube" className="bleed-cube" />
          <input
            type="number"
            className="additional-damage  input-look"
            onChange={event => onChangeHandler(event, setBleedDamageValue)}
            placeholder="0"
            value={bleedDamageValue > 0 ? bleedDamageValue : ''}
          />
        </div>
        {bleedDamageValue > 0 && (
          <div className={`bleed-container-resist show`}>
            <p className="text-up emoji">🩹</p>
            <input
              type="number"
              className="additional-damage  input-look"
              onChange={event => onChangeHandler(event, setResistValueBleed)}
              placeholder="0"
              value={
                resistValueBleed !== 0 && resistValueBleed !== '' && resistValueBleed <= 100
                  ? resistValueBleed
                  : ''
              }
            />
          </div>
        )}
        {/* -----------------Void----------------- */}
        <div className="void-container">
          <p className="text-up emoji">👾</p>
          <img src={VoidCube} alt="VoidCube" className="void-cube" />
          <input
            type="number"
            className="additional-damage  input-look"
            onChange={event => onChangeHandler(event, setVoidDamageValue)}
            placeholder="0"
            value={voidDamageValue > 0 ? voidDamageValue : ''}
          />
        </div>
        {voidDamageValue > 0 && (
          <div className={`void-container-resist show`}>
            <p className="text-up emoji">🚫</p>
            <input
              type="number"
              className="additional-damage  input-look"
              onChange={event => onChangeHandler(event, setResistValueVoid)}
              placeholder="0"
              value={
                resistValueVoid !== 0 && resistValueVoid !== '' && resistValueVoid <= 100
                  ? resistValueVoid
                  : ''
              }
            />
          </div>
        )}
        {/* ---------------------------------------------------- */}
        {/* -----------------DiceRoll----------------- */}
        <div className="div-dice-roll">
          <img src={Frame} alt="frame" className="frame-dice" />
          {rollValue !== 'Roll' && trialValue !== '' && trialValue !== 0 ? (
            <p className="roll-dice-equation">
              {rollValue} {trialValue > 0 ? ` + ${trialValue}` : ` - ${-trialValue} `} ={' '}
              {rollValue + trialValue}
            </p>
          ) : (
            ''
          )}
          <button
            className="number-dice-roll button-look roll-value"
            ref={rollBackground}
            onClick={diceRollNumber}
            value={rollValue + trialValue}>
            {rollMath === 100 &&
            [13, 9, 23, 31, 8, 3, 69, 1, 2, 47, 7, 95, 88, 76, 55, 74, 100].includes(rollValue)
              ? rollValue
              : rollValue + trialValue}
          </button>
          <div className="previous-and-input-div">
            <input
              type="number"
              className="input-look trial"
              onChange={event => {
                onChangeHandler(event, setTrialValue);
                setRollValue(0);
              }}
              value={trialValue !== 0 ? trialValue : ''}
              placeholder="TRIAL"
            />
            <button className="previous-number">
              Prev:
              {rollMath === 100 &&
              [13, 9, 23, 31, 8, 3, 69, 1, 2, 47, 7, 95, 88, 76, 55, 74, 100].includes(
                previousNumber
              )
                ? previousNumber
                : previousNumber + trialValue}
            </button>
          </div>
          {rollValue === 7 ? <SinsRoll /> : ''}
        </div>
        {/* -----------------ButtonsOnLeft----------------- */}
        <div className="buttons-choise-div">
          <img
            src={Dice4}
            alt="dice4"
            onClick={() => setRollMath(4)}
            className={`dice4 ${rollMath === 4 ? 'highlight' : ''}`}
          />
          <img
            src={Dice6}
            alt="dice6"
            onClick={() => setRollMath(6)}
            className={`dice6 ${rollMath === 6 ? 'highlight' : ''}`}
          />
          <img
            src={Dice8}
            alt="dice8"
            onClick={() => setRollMath(8)}
            className={`dice8 ${rollMath === 8 ? 'highlight' : ''}`}
          />
          <img
            src={Dice10}
            alt="dice10"
            onClick={() => setRollMath(10)}
            className={`dice10 ${rollMath === 10 ? 'highlight' : ''}`}
          />
          <img
            src={Dice12}
            alt="dice12"
            onClick={() => setRollMath(12)}
            className={`dice12 ${rollMath === 12 ? 'highlight' : ''}`}
          />
          <img
            src={Dice20}
            alt="dice20"
            onClick={() => setRollMath(20)}
            className={`dice20 ${rollMath === 20 ? 'highlight' : ''}`}
          />
          <img
            src={Dice100}
            alt="dice100"
            onClick={() => setRollMath(100)}
            className={`dice100 ${rollMath === 100 ? 'highlight' : ''}`}
          />
        </div>
      </div>
    </>
  );
};

export default CalcDMG;
