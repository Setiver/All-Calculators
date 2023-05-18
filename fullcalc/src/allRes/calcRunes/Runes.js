import { useState, useEffect } from 'react';
import { lvl, sizeItem, itemMaterial, moneyLvl, moneyMaterial, moneySize } from './opis.js';

const RunesLvL = () => {
  // -------------------------------------------- //
  const [mathRunes, setMathRunes] = useState(0);
  const [values, setValues] = useState([]);

  // get the Value of button
  const handleButtonClick = event => {
    const value = parseInt(event.target.value);
    setValues([...values, value]);
  };

  // change value of Cost to string and add dots
  useEffect(() => {
    const mathOfRunes = values.reduce((acc, cur) => acc + cur, 0);
    const formattedNumber = mathOfRunes.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    setMathRunes(formattedNumber);
  }, [values]);

  // button reset
  function resetButton() {
    setValues([0]);
  }

  // -------------------------------------------- //
  function Lista(props) {
    const { items, name, moneyArray, classes } = props;

    const itemsOptions = items.map((obj, index) => (
      <div key={index}>
        <button
          className={`buttons-styles`}
          key={index}
          value={moneyArray[index]}
          onClick={event => {
            handleButtonClick(event);
          }}>
          {obj}
        </button>
      </div>
    ));
    return (
      <div className={classes} name={name}>
        {itemsOptions}
      </div>
    );
  }
  // -------------------------------------------- //

  return (
    <div className="background-runes">
      <div className="container-runes ">
        {/* ------------------------------------------------------------------ */}
        <div className="text-abowe-buttons runes-lvl-position">Runes Lvl</div>
        <div className="row">
          <form>
            <Lista items={lvl} name="runes-lvl" moneyArray={moneyLvl} classes={'Block block-lvl'} />
          </form>
        </div>
        {/* ------------------------------------------------------------------ */}
        <div className="text-abowe-buttons item-size-position">Item Size</div>
        <div className="row">
          <form>
            <Lista
              items={sizeItem}
              name="item-size"
              moneyArray={moneySize}
              classes={'Block block-size'}
            />
          </form>
        </div>
        {/* ------------------------------------------------------------------ */}
        <div className="text-abowe-buttons item-material-position">Item Material</div>
        <div className="row">
          <form>
            <Lista
              items={itemMaterial}
              name="item-material"
              moneyArray={moneyMaterial}
              classes={'Block block-money'}
            />
          </form>
        </div>
        {/* ------------------------------------------------------------------ */}
        <div>
          <div className="equation">
            <p>Cost: {mathRunes}</p>
          </div>
          <button className="button-reset buttons-styles" onClick={resetButton}>
            RESET
          </button>
        </div>
      </div>
    </div>
  );
};

export default RunesLvL;
