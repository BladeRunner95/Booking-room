import {MyNav} from "../Nav/MyNav";
import './NotFound.css';
import {useTranslation} from "react-i18next";


export const NotFound = () => {
    const { t } = useTranslation();
    return (
        <>
            <MyNav />
        <div className="wrongPageWrapper">
            <div className="wrongPageInnerWrapper">
                <div className="wrongPageInner">
                    <h1 className="wrongPageError">404</h1>
                    <h2 className="wrongPageTitle">{t('not-found')}</h2>
                    <span className="wrongPageText">{t('mistyped')}</span>
                </div>
            </div>
        </div>
        </>
    )
}