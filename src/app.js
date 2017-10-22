import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import superagent from 'superagent';

class App extends Component{
    
    componentDidMount(){
        var previous = 0;
        var current;
        var context = this;
        setInterval(()=>{
            superagent
                .get('/conversation')
                .query({})
                .set("Accept", 'application/json')
                .end((error, response)=>{
                    if(error){
                        context.setState({errorMessage: "Error fetching data from the server. Please check your internet connection and reload the page again."})
                    }else{
                        context.setState({conversation: response.body.result});
                        current = response.body.result.length;
                        if(current != previous){
                            document.getElementById('chat').scrollTop = document.getElementById('chat').scrollHeight;
                            previous = current;
                        }
                    }
                })
        },500)
        
    }
    constructor(props){
        super(props);
        this.state = {
            conversation: [
                {name: "Loading Conversations", message: " Please hold on"}
            ],
            name: '',
            message: '',
            errorMessage: ''
        }
    }
    handleChange(event){
        let  StateObject = Object.assign({}, this.state);
        StateObject[event.target.id] = event.target.value;
        this.setState(StateObject)
    }
    submitMessage(){
        if(this.state.message == '' || this.state.name == ''){
            this.setState({errorMessage: 'Please enter your name and message!'})
        }else{
            this.setState({errorMessage: ''});
            var StateObject = Object.assign({}, this.state);
            StateObject.conversation.push({name: "Seding Message...", message: 'Hold on'})
            superagent
            .post('/conversation')
            .send({name: StateObject.name, message: StateObject.message})
            .set("Accept", 'application/json')
            .end((err, res)=>{
                if(err){
                    context.setState({errorMessage: "Error fetching data from the server. Please check your internet connection and reload the page again."})
                }
            })
            StateObject.message = "";
            this.setState(StateObject)
            
        }
    }
    handleBlur(){
        var context = this;
        if(context.state.name != ''){
            document.getElementById('name').disabled = true;
        }
        
    }
    adjustScroll(){
       
    }
    render(){
        
        var list = this.state.conversation.map((current,index)=>{
            return <li key={index}> <span className="name">{current.name}</span> : <span className="message">{current.message}</span></li>
        })
        return(
            <div>
             <div id="chat" style={{height: "500px", width: "700px", overflow: "scroll"}}>
                    <ul style={{display: 'inline'}}>
                        {list}
                    </ul>
                </div>
                <input placeholder="Your Name" onChange={this.handleChange.bind(this)} type='text' id='name' onBlur={this.handleBlur.bind(this)} /><br/><br/>
                <input placeholder="Your Message" type="text" id="message" value={this.state.message} onChange={this.handleChange.bind(this)}/><br/>
                <span style={{color: 'white', backgroundColor: 'red', lineHeight: "20px"}}>{this.state.errorMessage}</span><br/>
                <button onClick={this.submitMessage.bind(this)}>Send Message</button>
               
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'))