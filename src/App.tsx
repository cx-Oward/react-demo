import "./App.css";
import EllipsisText from "./components/EllipsisText";

function App() {
  return (
    <div style={{ width: 200, height: 100, resize: "both" }}>
      <EllipsisText.single />
    </div>
  );
}

export default App;
