import React, {Component} from 'react';


class TheDate extends Component {
    constructor(props){
        super(props);
        this.state= {
          date: new Date()
        }
    }
     componentDidMount(){
         setInterval(() =>{
             this.setState({
                 date: new Date()
             })

             this.props.setClock(`${this.state.date.getHours()<10 ? '0'+this.state.date.getHours() : this.state.date.getHours()}:${this.state.date.getMinutes()<10 ? '0'+this.state.date.getMinutes() :this.state.date.getMinutes()}:00`);
             this.props.setDate(`${this.state.date.getFullYear()}-${this.state.date.getMonth()+1}-${this.state.date.getDate()}`)
         },60000)
     }
    render(){
        
        return(
           <div>{this.state.date.getDate()}.{this.state.date.getMonth()+1}.{this.state.date.getFullYear()} {this.state.date.getHours()<10 ? '0'+this.state.date.getHours() : this.state.date.getHours()}
           :{this.state.date.getMinutes()<10 ? '0'+this.state.date.getMinutes() :this.state.date.getMinutes()}</div>
        )
    }
  }

export default TheDate