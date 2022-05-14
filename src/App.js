import {Wrapper} from "./App.styles";
// import {_Nav} from "./components/Nav/_Nav";
import {Route, Routes} from "react-router-dom";
import {Locations} from "./pages/Locations/Locations";
import {Login} from "./pages/Login/Login";
import {HomePage} from "./pages/Homepage/Homepage";

export const App = (props) => {
  return (
      <Wrapper>
              <Routes>
                  <Route path="/" element={<HomePage/>}/>
                  <Route path="/locations" element={<Locations title/>}/>
                  <Route path="/signin" element={<Login/>}/>
              </Routes>
          </Wrapper>
  );
}

export default App;
