import "./MainButton.scss"

const MainButton = ({ pressed, text, onClick }) => {
  return (
    <button onClick={onClick} className={`${pressed ? "main-button-pressed" : null} main-button poppins-regular`}>
        { text }
    </button>
  )
}

export default MainButton
