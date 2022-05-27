import {_Nav} from "../Nav/_Nav";
import './NotFound.css';


export const NotFound = () => {

    return (
        <>
            <_Nav />
        <div className="wrongPageWrapper">
            <div className="wrongPageInnerWrapper">
                <div className="wrongPageInner">
                    <h1 className="wrongPageError">404</h1>
                    <h2 className="wrongPageTitle">We can't find the page you're looking for</h2>
                    <span className="wrongPageText">You may have mistyped the address or the page may have moved</span>
                </div>
            </div>
        </div>
        </>
    )
}