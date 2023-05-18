import { useState, useEffect } from 'react';
import React from 'react';

const Heal = () => {
  const [checked, setChecked] = useState(Array(40).fill(false));

  const [timeHeal, setTimeHeal] = useState(Array(40).fill(0));
  const [moneyRepair, setMoneyRepair] = useState(Array(40).fill(0));
  const [timeRepair, setTimeRepair] = useState(Array(40).fill(0));
  const [injuryHolder, setInjuryHolder] = useState(Array(30).fill(0));

  const [fullTimeHeal, setFullTimeHeal] = useState([]);
  const [fullPrice, setFullPrice] = useState(0);

  const [show, setShow] = useState(false);

  const handleShowClick = () => {
    setShow(!show);
  };

  function handleCheck(index, hours, money, repair, injury) {
    const newChecked = [...checked];
    const newTimeHeal = [...timeHeal];
    const newMoneyRepair = [...moneyRepair];
    const newTimeRepair = [...timeRepair];
    const newInjury = [...injuryHolder];

    newChecked[index] = !checked[index];
    setChecked(newChecked);

    if (!checked[index]) {
      newTimeHeal[index] = hours;
      newMoneyRepair[index] = money;
      newTimeRepair[index] = repair;
      newInjury[index] = injury;

      setTimeHeal(newTimeHeal);
      setMoneyRepair(newMoneyRepair);
      setTimeRepair(newTimeRepair);
      setInjuryHolder(newInjury);
    } else {
      newTimeHeal[index] = 0;
      newMoneyRepair[index] = 0;
      newTimeRepair[index] = 0;
      newTimeRepair[index] = 0;

      setTimeHeal(newTimeHeal);
      setMoneyRepair(newMoneyRepair);
      setTimeRepair(newTimeRepair);
      setInjuryHolder(newInjury);
    }
  }

  useEffect(() => {
    setFullPrice(
      moneyRepair.reduce((sum, num) => sum + num),
      0
    );
  }, [moneyRepair]);

  useEffect(() => {
    const fullArrayOfAll = timeHeal
      .map((time, index) => ({
        time: time,
        price: moneyRepair[index],
        repairT: timeRepair[index],
        injury: injuryHolder[index],
      }))
      .sort((a, b) => b.time - a.time)
      .filter(obj => obj.time !== 0 && obj.price !== 0 && obj.repairT !== 0 && obj.injury !== 0);

    const finalTimeHeal = fullArrayOfAll
      .map((obj, index) => {
        const percentIncrease = (index + 1) * 10;
        const increaseTime = obj.time * (percentIncrease / 100);
        const increaseRepairT = obj.repairT * (percentIncrease / 100);
        const modifiedObj = {
          ...obj,
          time: Math.round(obj.time + increaseTime),
          repairT: Math.round(obj.repairT + increaseRepairT),
        };
        return modifiedObj;
      })
      .sort((a, b) => b.time - a.time);

    setFullTimeHeal(finalTimeHeal);
  }, [timeHeal, moneyRepair, timeRepair, injuryHolder]);

  const MedicalBill = () => {
    const medical = fullTimeHeal.map((obj, index) => (
      <tr key={index}>
        <th scope="row">X</th>
        <td>{obj.injury}</td>
        <td>{Math.round((obj.time / 24) * 10) / 10}d</td>
        <td>{obj.price}G</td>
        <td>{Math.round((obj.repairT / 24) * 10) / 10}d</td>
      </tr>
    ));
    return <>{medical}</>;
  };

  const HeadTableITCH = () => {
    return (
      <>
        <thead>
          <tr className="">
            <th scope="col">✅</th>
            <th scope="col">Injury</th>
            <th scope="col">Time</th>
            <th scope="col">Cost</th>
            <th scope="col">Healing</th>
          </tr>
        </thead>
      </>
    );
  };

  const CheckInTable = React.memo(({ check, time, gold, goldTime, type }) => {
    return (
      <>
        <tr>
          <th scope="row">
            <label className="control control-checkbox">
              <input
                type="checkbox"
                checked={checked[check]}
                onChange={() => handleCheck(check, time, gold, goldTime, type)}
              />
              <div className="control_indicator"></div>
            </label>
          </th>
          <td>{type}</td>
          <td>{Math.round((time / 24) * 10) / 10}d</td>
          <td>{gold}G</td>
          <td>{Math.round((goldTime / 24) * 10) / 10}d</td>
        </tr>
      </>
    );
  });

  // ------------------------ //
  return (
    <>
      {/* -------------------------- */}
      <div className={`blocker ${show ? 'visible' : ''}`} onClick={show ? handleShowClick : null}>
        <div className={`app ${show ? 'blur' : ''}`}>
          {/* -------------------Wounds------------------- */}
          <table
            className={`table table-success table-dark table-striped table-bordered table-wounds`}>
            <thead>
              <tr className=" table-text-up">
                <th scope="col" colSpan="5">
                  Wounds
                </th>
              </tr>
            </thead>

            <HeadTableITCH />

            <tbody>
              <CheckInTable check={0} time={6} gold={10} goldTime={0.5} type={'Scratch'} />
              <CheckInTable check={1} time={12} gold={30} goldTime={1} type={'Few Cuts'} />
              <CheckInTable check={2} time={24} gold={70} goldTime={2} type={'Dozen Cuts'} />
              <CheckInTable check={3} time={2 * 24} gold={100} goldTime={6} type={'Tens Cuts'} />
              <CheckInTable check={4} time={2 * 24} gold={300} goldTime={3} type={'Severed skin'} />
              <CheckInTable
                check={5}
                time={4 * 24}
                gold={1000}
                goldTime={12}
                type={'Torn tendons'}
              />
            </tbody>
          </table>
          {/* -------------------Burns------------------- */}
          <table className="table table-success table-dark table-striped table-bordered table-burns">
            <thead>
              <tr className=" table-text-up">
                <th scope="col" colSpan="5">
                  Burns
                </th>
              </tr>
            </thead>

            <HeadTableITCH />

            <tbody>
              <CheckInTable check={6} time={24} gold={50} goldTime={2} type={'1st degree'} />
              <CheckInTable check={7} time={3 * 24} gold={100} goldTime={5} type={'2nd degree'} />
              <CheckInTable check={8} time={10 * 24} gold={200} goldTime={24} type={'3rd degree'} />
              <CheckInTable
                check={9}
                time={25 * 24}
                gold={1500}
                goldTime={4 * 24}
                type={'4th degree'}
              />
            </tbody>
          </table>
          {/* -------------------Breaks------------------- */}
          <table className="table table-success table-dark table-striped table-bordered table-breaks">
            <thead>
              <tr className=" table-text-up">
                <th scope="col" colSpan="5">
                  Breaks
                </th>
              </tr>
            </thead>

            <HeadTableITCH />

            <tbody>
              <CheckInTable check={10} time={4 * 24} gold={400} goldTime={24} type={'Finger'} />
              <CheckInTable
                check={11}
                time={7 * 24}
                gold={2000}
                goldTime={2 * 24}
                type={'Left Arm'}
              />
              <CheckInTable
                check={12}
                time={7 * 24}
                gold={2000}
                goldTime={2 * 24}
                type={'Right Arm'}
              />
              <CheckInTable
                check={13}
                time={8 * 24}
                gold={2500}
                goldTime={2.5 * 24}
                type={'Left Leg'}
              />
              <CheckInTable
                check={14}
                time={8 * 24}
                gold={2500}
                goldTime={2.5 * 24}
                type={'Right Leg'}
              />
              <CheckInTable check={15} time={3 * 24} gold={500} goldTime={12} type={'Rib'} />
              <CheckInTable
                check={16}
                time={10 * 24}
                gold={3000}
                goldTime={2 * 24}
                type={'Half of Ribs'}
              />
              <CheckInTable
                check={17}
                time={25 * 24}
                gold={5000}
                goldTime={5 * 24}
                type={'All Ribs'}
              />
              <CheckInTable
                check={18}
                time={40 * 24}
                gold={7000}
                goldTime={7 * 24}
                type={'Skull'}
              />
              <CheckInTable
                check={19}
                time={80 * 24}
                gold={20000}
                goldTime={10 * 24}
                type={'Spine'}
              />
            </tbody>
          </table>
          {/* -------------------LossOf------------------- */}
          <table className="table table-success table-dark table-striped table-bordered table-lossof ">
            <thead>
              <tr className=" table-text-up">
                <th scope="col" colSpan="5">
                  Loss of
                </th>
              </tr>
            </thead>

            <HeadTableITCH />

            <tbody>
              <CheckInTable
                check={20}
                time={14 * 24}
                gold={1000}
                goldTime={2 * 24}
                type={'Finger'}
              />
              <CheckInTable
                check={21}
                time={7 * 24}
                gold={5000}
                goldTime={1.5 * 24}
                type={'Left Hand'}
              />
              <CheckInTable
                check={22}
                time={7 * 24}
                gold={5000}
                goldTime={1.5 * 24}
                type={'Right Hand'}
              />
              <CheckInTable
                check={23}
                time={100 * 24}
                gold={20000}
                goldTime={10 * 24}
                type={'Left Hand'}
              />
              <CheckInTable
                check={24}
                time={100 * 24}
                gold={20000}
                goldTime={10 * 24}
                type={'Right Hand'}
              />
              <CheckInTable
                check={25}
                time={40 * 24}
                gold={6000}
                goldTime={4 * 24}
                type={'Left Foot'}
              />
              <CheckInTable
                check={26}
                time={40 * 24}
                gold={6000}
                goldTime={4 * 24}
                type={'Right Foot'}
              />
              <CheckInTable
                check={27}
                time={110 * 24}
                gold={21000}
                goldTime={12 * 24}
                type={'Left Leg'}
              />
              <CheckInTable
                check={28}
                time={110 * 24}
                gold={21000}
                goldTime={12 * 24}
                type={'Right Leg'}
              />
              <CheckInTable
                check={29}
                time={520 * 24}
                gold={80000}
                goldTime={40 * 24}
                type={'Left Eye'}
              />
              <CheckInTable
                check={30}
                time={520 * 24}
                gold={80000}
                goldTime={40 * 24}
                type={'Right Eye'}
              />
              <CheckInTable
                check={31}
                time={80 * 24}
                gold={30000}
                goldTime={10 * 24}
                type={'Nose'}
              />
              <CheckInTable
                check={32}
                time={50 * 24}
                gold={20000}
                goldTime={6 * 24}
                type={'Left Ear'}
              />
              <CheckInTable
                check={33}
                time={50 * 24}
                gold={20000}
                goldTime={6 * 24}
                type={'Right Ear'}
              />
              <CheckInTable
                check={34}
                time={60 * 24}
                gold={20000}
                goldTime={6 * 24}
                type={'Tongue'}
              />
              <CheckInTable
                check={35}
                time={69 * 24}
                gold={6900}
                goldTime={6 * 24 + 9}
                type={'Dick'}
              />
              <CheckInTable check={36} time={7 * 24} gold={20000} goldTime={24} type={'Hair'} />
            </tbody>
          </table>

          {/* -------------------Diseases------------------- */}
          <table className="table table-success table-dark table-striped table-bordered table-diseases ">
            <thead>
              <tr className=" table-text-up">
                <th scope="col" colSpan="5">
                  Diseases
                </th>
              </tr>
            </thead>

            <HeadTableITCH />

            <tbody>
              <CheckInTable check={37} time={3 * 24} gold={100} goldTime={2} type={'Simple'} />
              <CheckInTable check={38} time={14 * 24} gold={500} goldTime={12} type={'Moderate'} />
              <CheckInTable
                check={39}
                time={60 * 24}
                gold={4000}
                goldTime={6 * 24}
                type={'Severe'}
              />
              <CheckInTable
                check={40}
                time={520 * 24}
                gold={100000}
                goldTime={20 * 24}
                type={'Deadly'}
              />
            </tbody>
          </table>
          {/*------------------- button to show -------------------*/}
          <button className="button-shower summary" onClick={handleShowClick}>
            Summary
          </button>
        </div>
      </div>
      {/* -------------------Summary------------------- */}
      {show === true ? (
        <table className="table table-success table-dark table-striped table-bordered table-summary no-blur ">
          <thead>
            <tr className="table-text-up">
              <th scope="col" colSpan="5">
                Summary
              </th>
            </tr>
          </thead>
          <thead>
            <tr className="">
              <th scope="col">X</th>
              <th scope="col">Injury</th>
              <th scope="col">Time</th>
              <th scope="col">Cost</th>
              <th scope="col">Healing</th>
            </tr>
          </thead>
          <tbody>
            <MedicalBill />
          </tbody>
          <tfoot>
            <tr className="table-text-up">
              <th scope="col" colSpan="5">
                Full Cost: {fullPrice}
              </th>
            </tr>
          </tfoot>
        </table>
      ) : (
        ''
      )}
    </>
  );
};

export default Heal;
