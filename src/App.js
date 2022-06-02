import {Wrapper} from "./App.styles";
// import {_Nav} from "./components/Nav/_Nav";
import {Route, Routes} from "react-router-dom";
import {Locations} from "./pages/Locations/Locations";
import {Login} from "./pages/Login/Login";
import {HomePage} from "./pages/Homepage/Homepage";
import {SingleLocation} from "./pages/SingleLocation/SingleLocation";
import {NotFound} from "./components/NotFound/NotFound";
import {useSelector} from "react-redux";

export const App = (props) => {
    const booking = useSelector(state => state.myReducer);
  return (
      <Wrapper>
              <Routes>
                  <Route path="/" element={<HomePage/>}/>
                  <Route path="/locations" element={<Locations title/>}/>
                   <Route path="/singleLocation/:id" element={booking.finishDate ? <SingleLocation /> : <NotFound/>}/>
                  <Route path="/signin" element={<Login/>}/>
                  <Route path="*" element={<NotFound/>}/>
              </Routes>
          </Wrapper>
  );
}

export default App;
