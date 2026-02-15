import { TestChart } from "./components/TestChart";
import Footer from "./components/Footer";

const App = () => (
  <div className="min-h-screen flex flex-col">
    <main className="flex-grow">
      <TestChart />
    </main>
    <Footer />
  </div>
);

export default App;
