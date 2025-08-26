import "./App.css";
import { EllipsisText_single } from "./components/EllipsisText";

function App() {
  return (
    <div style={{ width: 200, height: 100, resize: "both",overflow:"hidden" }}>
      <EllipsisText_single text="这是一个很长的文本" />
    </div>
  );
}

export default App;
