import {MyNav} from "../../components/Nav/MyNav";
import {Container, Row, Col} from "react-bootstrap";
import {Locations} from "../Locations/Locations";
import {useTranslation} from "react-i18next";

export const HomePage = (props) => {
    const { t } = useTranslation();
    return (
        <>
        <MyNav/>
                <Container className="d-flex justify-content-center mt-5 mb-5 fs-1 myContainerHeight">
                    <Row>
                        <Col xs={6} lg={6} md={2}>{t('welcome')}</Col>
                    </Row>
                </Container>
            <Locations />
        </>
)
}
