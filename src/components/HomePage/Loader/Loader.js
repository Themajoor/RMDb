import "./Loader.css";

function Loader() {
  const counter = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      <div className="loader-container">
        {counter.map((item, index) => (
          <div key={index} className="loader-box"></div>
        ))}
      </div>
      <div className="loader-container">
        {counter.map((item, index) => (
          <div key={index} className="loader-box"></div>
        ))}
      </div>
    </>
  );
}

export default Loader;
