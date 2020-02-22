import React, {Component} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Fetches the right icon for apis keywords WALK, RAIL, BUS and TRAM
class IconGetter extends Component {
    constructor(props){
        super(props);
        this.state = {
            realnames: {
                "WALK": "walking",
                "RAIL": "train",
                "BUS": "bus",
                "TRAM": "tram"
            }
        }

    }
    render(){
        const modifications = {
            fontSize: "200%"
        };
        return(
            <FontAwesomeIcon style={modifications} icon={{prefix: "fas",iconName: this.state.realnames[this.props.mode]}} />

        )
    }
}

export default IconGetter