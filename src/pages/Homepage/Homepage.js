import {MyNav} from "../../components/Nav/MyNav";
import {Container, Row, Col} from "react-bootstrap";
import {Locations} from "../Locations/Locations";

export const HomePage = (props) => {
    return (
        <>
        <MyNav/>
                <Container className="d-flex justify-content-center mt-5 mb-5 fs-1 myContainerHeight">
                    <Row>
                        <Col xs={6} lg={6} md={2}>WELCOME</Col>
                    </Row>
                </Container>
            <Locations />
        </>
)
}
