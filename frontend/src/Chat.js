import React, { Component } from 'react'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'

const URL = 'ws://localhost:3030'

export default class Chat extends Component {
    state = {
        name: 'Anon',
        messages: []
    }

    ws = new WebSocket(URL);

    componentDidMount() {
        this.ws.onopen = () => {
            // on connect do nothig but log status in console
            console.log('connected');
            
        }
        this.ws.onmessage = evt => {
            // on recieving a message, add it to the messages list
            const message = JSON.parse(evt.data);
            this.addMessage(message)
        }

        this.ws.onclose = () => {
            // on DC log it and try to reconnect
            console.log('disconnected');

            this.setState({ ws: new WebSocket(URL)})
            
        }
    }

    addMessage = message => {
        this.setState(state => ({ messages: [message, ...state.messages]}))
    }

    submitMessage = messageString => {
        // on message submit via the ChatInput, send the message, add it to the list and clear the input
        const message = { name: this.state.name, message: messageString };

        this.ws.send(JSON.stringify(message));
        this.addMessage(message)
    }


    render() {
        return (
            <div>
                <label htmlFor="name">
                    Name:&nbsp;
                    <input
                        type='text'
                        id={'name'}
                        placeholder={'Enter your name...'}
                        value={this.state.name}
                        onChange={e => this.setState({ name: e.target.value })} />
                </label>
                <ChatInput
                    ws={this.ws}
                    onSubmitMessage={ messageString => this.submitMessage(messageString)} />
                { this.state.messages.map((message, index) => 
                    <ChatMessage 
                        key={index}
                        message={message.message} 
                        name={message.name}
                    
                    />
                )}
                
            </div>
        )
    }
}
