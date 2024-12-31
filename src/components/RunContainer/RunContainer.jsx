import { useState } from "react"
import MainButton from "../MainButton/MainButton"
import "./RunContainer.scss"

const RunContainer = ({ run, runIndex, changeMatchPoints }) => {
  const [runPoints, setRunPoints] = useState(run.options.map(() => { return { points: 0 } }))
  const [totalPoints, setTotalPoints] = useState(0)

  const changeRunPoints = (optionIndex, newPoints) => {
    const newRunPoints = [...runPoints]
    newRunPoints[optionIndex].points = newPoints
    setRunPoints(newRunPoints)
    return runPoints.map(run => run.points).reduce((a, b) => a + b, 0)
  }

  return (
    <div className="run-container">
        <h1 className="poppins-semibold">{ `${run.id !== "Tokens" ? "Run" : ""} ${run.id}` }</h1>
        <div className="options">
          {
            run.options.map((opt, i) => {
              if (opt?.choices) return (
                <div className="option">
                  <p className="poppins-regular">{ opt.desc }</p>
                  <div className="btns">
                    {
                      opt.choices.map(c => {
                        return <MainButton pressed={runPoints[i].points === c.points} text={c.choice} onClick={() => {
                          changeMatchPoints(runIndex, changeRunPoints(i, c.points))
                        }
                      } />
                      })
                    }
                  </div>
                </div>
              )
              return (
                <div className="option">
                  <p className="poppins-regular">{ opt.desc }</p>
                  <div className="btns">
                    <MainButton pressed={runPoints[i].points === opt.points} text="Si" onClick={() => {
                      changeMatchPoints(runIndex, changeRunPoints(i, opt.points))
                    }} />
                    <MainButton pressed={runPoints[i].points === 0} text="No" onClick={() => changeMatchPoints(runIndex, changeRunPoints(i, 0))} />
                  </div>
                </div>
              )
            })
          }
        </div>
    </div>
  )
}

export default RunContainer