import { useState } from 'react';

const Instruction = () => {
  const [isClickDialog, setIsClickDialog] = useState(false);

  const ClickDialog = () => {
    setIsClickDialog(!isClickDialog);
  };

  // ------------------------------------

  return (
    <>
      <div>
        <button className="instruction-button" onClick={ClickDialog}>
          Instruction
        </button>
        {isClickDialog && (
          <dialog open className="reset-dialog dialogs">
            <h2>Resets</h2>
            <p>Reset All on double click resets everything</p>
            <p>Reset Damage on click resets Damage, Resist%, Heal and Additional Damage on bottom in squares</p>
          </dialog>
        )}
        {isClickDialog && (
          <dialog open className="dice-dialog dialogs">
            <h2>Dice</h2>
            <p>
              On left there are dices, whenever you click on one, it's will light up. Now on center the 'Roll' square will roll numbers only with
              range of numbers on chosen dice. On Full reset the prime dice is D100.
            </p>
          </dialog>
        )}
        {isClickDialog && (
          <dialog open className="damage-dialog dialogs">
            <h2>Left Inputs</h2>
            <p>
              On left there are few inputs where you can add numbers. Damage and Resist% are for Physical damage, you can add max 100% Resist, but you
              can make it under 0% making it a Crit%.
              <p>Heal - lower the Damage you get, and you can get negative number, that will add numbers on top rectangles.</p>
            </p>
          </dialog>
        )}
        {isClickDialog && (
          <dialog open className="list-dialog dialogs">
            <h2>Damage List</h2>
            <p>Here all Damage, Resist% etc. will me added and summed up on bottom</p>
          </dialog>
        )}
        {isClickDialog && (
          <dialog open className="history-dialog dialogs">
            <h2>History List</h2>
            <p>Here all received Damage will show up, divided into Barrier, Armor, HP </p>
          </dialog>
        )}
        {isClickDialog && (
          <dialog open className="additional-dialog dialogs">
            <h2>Additional</h2>
            <p>
              Here are additional squares for magic damage. When you add something in them, new squares will appear with their own Resist%.
              <p>Burn - Add additional 20% Burn Damage for Armor</p>
              <p>Ice - You lose your additional move</p>
              <p>Poison - Take additionally 10% of your actual Barrier</p>
              <p>Bleed - You lose this much HP every turn</p>
              <p>Void - Each time you get hit you lose 1 Mana</p>
            </p>
          </dialog>
        )}
        {isClickDialog && (
          <dialog open className="right-dialog dialogs">
            <h2>Right Inputs</h2>
            <p>
              Whenever you add some numbers here it'll change color and add those numbers in their rectangles at the top. Whenever you click on those
              they'll change according to the received damage. Mana will always drop by 1 when you click it.
            </p>
          </dialog>
        )}
        {isClickDialog && (
          <dialog open className="roll-dialog dialogs">
            <h2>Roll</h2>
            <p>
              When you click on it, it will show a random number depending on a chosen dice.
              <p>TRIAL - add a modifier to the rolled number. </p>
              <p>Prev - show your previous rolled number</p>
              <p>There are few special numbers that will not add modifiers to them. When you roll them, the Roll square will change its color.</p>
              <p>When you roll '7', a 2 new squares will show. They roll a 'Sin' and a positive and negative outcome.</p>
            </p>
          </dialog>
        )}
        {isClickDialog && (
          <dialog open className="close-dialog dialogs">
            <h2>Close</h2>
            <p>To close Instruction, click this button again.</p>
          </dialog>
        )}
        {isClickDialog && (
          <dialog open className="button-right-dialog dialogs">
            <h2>Button</h2>
            <p>
              Here are some other pages with calculator for Damage to Heal after battle and a page for Rune cost, but they are in 'raw version', but
              you can still see and use them.
            </p>
          </dialog>
        )}
      </div>
    </>
  );
};
export default Instruction;
