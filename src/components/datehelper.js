import React, {Component} from 'react';


class DateHelper extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        const date = new Date(this.props.epochdate)
        return(<div>{date.getDate()}.{date.getMonth()+1}.{date.getFullYear()} - {date.getHours()<10 ? '0'+date.getHours() :date.getHours()}:{date.getMinutes()<10 ? '0'+date.getMinutes() :date.getMinutes()}</div>)
    }
}

export default DateHelper
