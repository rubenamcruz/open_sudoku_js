import React from 'react';
import moment from 'moment';

class Clock extends React.Component {
    constructor(props){
        super(props);
        let then = moment();
        this.state = {then: then, hours:'00', minutes:'00', seconds:'00'}
    }
    
    render(){
        return(
            <div id="timer" className="clock">
                {this.state.hours}:{this.state.minutes}:{this.state.seconds}
            </div>
        )
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            if(this.props.finished){
                this.stopInterval();
                return;
            }
            let then = this.state.then;
            let now = moment();
            now.hour(now.hour()-1);
            let counter = moment(now -then);
            
            let hours =  counter.format('HH');
            let minutes = counter.format('mm');
            let seconds = counter.format('ss');
            
            this.setState({hours:hours, minutes:minutes, seconds:seconds });
        }, 1000);
        
    }

    stopInterval(){
        clearInterval(this.interval);
    }
}

export default Clock;