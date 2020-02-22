import React, {Component} from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import {Container, Row, Col} from 'react-bootstrap'

//Returns spinning loading animation
class Loading extends Component {

    render(){

        return(
            <Container style={{paddingTop: "15%"}}>
            <Row>
                <Col md={12} className="justify-content-md-center text-center">
            <Loader type="TailSpin" color="#00BFFF" height="20%" width="20%" timeout={3000} />
            </Col>
            </Row>
            </Container>
        )
    }
}

export default Loading