import {Wrapper} from "./App.styles";
import {Route, Routes} from "react-router-dom";
import {Locations} from "./pages/Locations/Locations";
import {Login} from "./pages/Login/Login";
import {HomePage} from "./pages/Homepage/Homepage";
import {SingleLocation} from "./pages/SingleLocation/SingleLocation";
import {NotFound} from "./components/NotFound/NotFound";

export const App = (props) => {
    const localFilters = JSON.parse(localStorage.getItem('filters'));
  return (
      <Wrapper>
              <Routes>
                  <Route path="/" element={<HomePage/>}/>
                  <Route path="/locations" element={<Locations title/>}/>
                   <Route path="/singleLocation/:id" element={localFilters && localFilters.locations ? <SingleLocation /> : <NotFound/>}/>
                  <Route path="/signin" element={<Login/>}/>
                  <Route path="*" element={<NotFound/>}/>
              </Routes>
          </Wrapper>
  );
}

export default App;
