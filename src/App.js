import React, {useState} from 'react';
import './App.css';
import {useQuery} from '@apollo/react-hooks';
import gql from "graphql-tag";
import './assets/css/allcss.css'
import {Container,Row,Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import DateHelper from './components/datehelper.js'
import TheDate from './components/thedate.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconGetter from './components/icongetter.js'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faTrain,faTram,faBus,faWalking} from "@fortawesome/free-solid-svg-icons";
import {Button} from 'react-bootstrap'


library.add(fas,faTrain,faTram,faWalking,faBus);


//eficode 60.169385, 24.925862
//pasilan asema 60.198669, 24.932870
const GET_HSL_INFO = gql`
query getHslInfo($dateVar: String,$clockVar: String,$fromLat: Float!,$fromLon: Float!, $toLat: Float!, $toLon: Float!){
  plan(
    from: {lat: $fromLat, lon: $fromLon}
    to: {lat: $toLat, lon: $toLon}
    date: $dateVar
    time: $clockVar
  ) {
    itineraries {
      walkDistance
      duration
      legs {
        mode
        startTime
        endTime
        distance
        route {
          shortName
        }
        from {
          name
        }
        to {
          name
        }
      }
    }
  }
}
  `;


function App() {
  //helping variables
  const startingInfo = {"from": "Pasila Train Station","to": "Eficode Headquarters","fromcord": {lat: 60.198669, lon: 24.932870}, "tocord": {lat: 60.169385,lon: 24.932870}, isdefault: true}
  const time = null

  const initialDate = new Date();
  const initialHours = initialDate.getHours()<10 ? '0'+initialDate.getHours() : initialDate.getHours()
  const initialMinutes = initialDate.getMinutes()<10 ? '0'+initialDate.getMinutes() : initialDate.getMinutes()
  
  const [clock, setClock] = useState(`${initialHours}:${initialMinutes}:00`);
  const [date, setDate] = useState(`${initialDate.getFullYear()}-${initialDate.getMonth() + 1}-${initialDate.getDate()}`);

  const [fromto, setFromto] = useState(startingInfo)
  const changeClock = (time) => {
    setClock(time)
  }

  const changeDate = (date) => {
    setDate(date)
    refetch()
  }
  const changeFromto = () => {
    fromto.isdefault ? setFromto({"from": "Eficode Headquarters","to": "Pasila Train Station","fromcord": {lat: 60.169385,lon: 24.932870}, "tocord": {lat: 60.198669, lon: 24.932870}, isdefault: false}) : setFromto({"from": "Pasila Train Station","to": "Eficode Headquarters","fromcord": {lat: 60.198669, lon: 24.932870}, "tocord": {lat: 60.169385,lon: 24.932870}, isdefault: true})
    refetch()
  }
  const { loading, error, data, refetch} = useQuery(GET_HSL_INFO, {
    variables: {clockVar: clock,dateVar: date,fromLat: fromto.fromcord.lat,fromLon: fromto.fromcord.lon, toLat: fromto.tocord.lat, toLon: fromto.tocord.lon },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return `Error ${error}`;
  
  return (
    <Container>
      <Container style={{paddingBottom: "1%", paddingTop: "1%"}} className="font-weight-bold justify-content-md-center">
        <Row>
          <Col md={2} sm={2} xs={12}>
      <TheDate setClock={() => changeClock(time)} setDate={() => changeDate(date)}/>
      </Col>
      <Col md={3} sm={3} xs={12} lg={3} className="text-center">
      From {fromto.from}
      </Col>
      <Col md={3} sm={3} xs={12} lg={2} className="text-center justify-content-sm-center">
      <Button variant="primary" size="lg" onClick={() => changeFromto()}>
          Flip locations
        </Button>
      </Col>
      <Col className="text-center justify-content-sm-center" sm={3} xs={12}>
      To {fromto.to}
      </Col>
      </Row>
      </Container >
      <Container className="rounded justify-content-md-center" style={{borderRadius: "15px"}}>
      {data.plan && data.plan.itineraries.map((itinerary, index) =>
      <div style={{paddingBottom: "1%"}}>
        <hr className="m-0"/>
        <Row >
          <Col ><h5>
          Journey takes {parseInt(itinerary.duration/60)+1} minutes</h5></Col>
        </Row>
         {itinerary.legs.map((leg,index) =>
         <div className="rounded border border-dark bg-primary text-white font-weight-bold">
         <Row>
         <Col sm={2} md={{ span: 3, offset: 1 }} sm={4} xs={4}>
         <DateHelper epochdate={leg.startTime}/>
         </Col>
         <Col sm={2} md={3} className="text-center" sm={4} xs={4}>
         From {leg.from.name} To {leg.to.name}
         </Col>
         <Col sm={2} md={{ span: 3, offset: 1}} sm={4} xs={4}>
         <DateHelper epochdate={leg.endTime}/>
         </Col>
         </Row>
         <Row>
         <Col sm={2} md={{offset: 1,span: 3 }} sm={4} xs={4}>
          {leg.from.name}
         </Col>
         <Col sm={2} md={3} className="text-center" sm={4} xs={4}>
         <IconGetter mode={leg.mode}/>
         </Col>
         <Col sm={2} md={{ span: 3, offset: 1}} sm={4} xs={4}>
           {leg.to.name}
           </Col >
         </Row>
         <Row>
        <Col md={{ span: 3, offset: 4}} sm={12} xs={12} className="text-center">
         {leg.mode} {leg.route && leg.route.shortName} {!leg.route && parseInt(leg.distance) +1} {!leg.route && "m"}
         </Col>
         </Row>

         <Row>
           <Col sm={2} md={{ span: 3, offset: 4}} sm={12} xs={12} className="text-center">
           FOR {diff_minutes_epoch(leg.startTime, leg.endTime)} min
         </Col>
         </Row>
         </div>
         )}
         <hr className="m-0"/>
        </div>

      )}
      </Container>
      </Container>
  );
}

function SecondsToHours(seconds){
    const sec_num = parseInt(seconds, 10); // don't forget the second param
    const hours   = Math.floor(sec_num / 3600);
    const minutes = Math.floor((sec_num - (hours * 3600)) / 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    return (hours+':'+minutes)
}
function diff_minutes_epoch(start, end) 
 {
  
  const dt2 = new Date(end);
  const dt1 = new Date(start);

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
  
 }
export default App;
