import { cn } from "./utils/cn";

function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <button className={cn("btn btn-success", "text-white")}>Success</button>
      <h1>hello</h1>
    </div>
  );
}

export default App;
