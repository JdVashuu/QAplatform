import { Route, Routes } from "react-router";
import Home from "./page";
import Layout from "./components/Layout";
import ProfilePage from "./components/Profile";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}
export default App;
