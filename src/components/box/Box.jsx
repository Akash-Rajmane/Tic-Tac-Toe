import "./box.css";

const Box = ({ val, onClick }) => {
  let btnClass = val === "X" ? "box x" : "box o";

  return (
    <button className={btnClass} onClick={onClick}>
      <span className="btn-text">{val}</span>
    </button>
  );
};

export default Box;
