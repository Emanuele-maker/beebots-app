import { useState } from "react"
import "./App.scss"
import RunContainer from "./components/RunContainer/RunContainer"
import runs from "./runs.json"
import MainButton from "./components/MainButton/MainButton"

const App = () => {
  const [matchPointsArr, setMatchPointsArr] = useState(runs.map(run => { return { run: run.id, points: 0 } }))
  const [matchPoints, setMatchPoints] = useState(0)
  const [matchTime, setMatchTime] = useState(0)

  const uploadMatchPoints = () => {
    fetch("https://script.google.com/macros/s/AKfycbzT74DLeD31qBjrp4edlqMHkR7X2y4nXAHs2Bozeg6yvHNMsn56PaGQkE7Sw7CbwlmVhw/exec", {
      method: "POST",
      body: JSON.stringify({
        matchPointsArr,
        matchPoints,
        matchTime
      }),
      mode: "no-cors"
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      alert(data.msg)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const changeMatchPoints = (runIndex, newPoints) => {
    const newMatchPointsArr = [...matchPointsArr]
    newMatchPointsArr[runIndex].points = newPoints
    setMatchPointsArr(newMatchPointsArr)
    setMatchPoints(matchPointsArr.map(run => run.points).reduce((a, b) => a + b, 0))
  }

  return (
    <div className="app">
      <h1 className="heading poppins-extrabold">CALCOLATRICE FLL BEEBOTS</h1>
      <h2 className="desc poppins-bold">Alla fine della prova a tempo, inserisci i punti per ogni run, che si andranno ad aggregare a quelli dei match precedenti in modo da formare nuove statistiche!</h2>
      <div className="runs">
        {
          runs.map((run, i) => (
            <RunContainer key={run.id} run={run} runIndex={i} changeMatchPoints={changeMatchPoints} />
          ))
        }
      </div>
      <h1 className="heading poppins-extrabold">PUNTI TOTALI: { matchPoints }</h1>
      <h2 className="poppins-regular">Inserisci il tempo impiegato per completare tutte le run: </h2>
      <input className="poppins-regular" type="number" placeholder="Tempo (secondi)" onInput={ev => setMatchTime(ev.target.value)} />
      <MainButton pressed={false} text="Carica match sul foglio di calcolo" onClick={() => uploadMatchPoints()} />
    </div>
  )
}

export default App