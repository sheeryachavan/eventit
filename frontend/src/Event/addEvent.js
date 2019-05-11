import React, { Component } from 'react'
import ReactModal from 'react-modal';
import { Container, Row, Button } from 'react-bootstrap';
import axios from 'axios';
ReactModal.setAppElement('#root');
class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreateEvent: this.props.isOpen || true,
            selectedFile:null
        };
        this.handleOpenCreateEvent = this.handleOpenCreateEvent.bind(this);
        this.handleCloseCreateEvent = this.handleCloseCreateEvent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleOpenCreateEvent() {
        this.setState({ showCreateEvent: true });
    }
    handleCloseCreateEvent() {
        this.setState({ showCreateEvent: false });
        this.props.handleClose(false);
    }
    handleSubmit(event) {
        event.preventDefault();
        // const data = new FormData(event.target);

        // fetch('/api/form-submit-url', {
        //     method: 'POST',
        //     body: data,
        // });
        this.setState({ showCreateEvent: false });
        this.props.handleClose(false);
    }
    // fileSelectedHandler = event => {
    //     this.setState({
    //         selectedFile:event.target.files[0]
    //     })
    //     console.log(event.target.files[0]);
    // }
    render() {
        let body;
        body = (<div>
            <form
                className='form'
                id='add-Event'
                onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <label>
                        Title:
                            <input
                            required
                            autoFocus={true}
                            className="clsTextField"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Description:
                        <input required type='textarea' className='clsTextField' />
                    </label>
                </div>
                <div>
                    <label>
                        Date:
                        <input required type='date' className='clsTextField' />
                    </label>
                </div>
                <div>
                    <label>
                        Time:
                        <input required type='time' className='clsTextField' />
                    </label>
                </div>
                <div>
                    <label>
                        Max participants:
                        <input required type='number' className='clsTextField' />
                    </label>
                </div>
                <div>
                    <label>
                        Upload Cover Photo:
                        <input type='file' onChange={this.fileSelectedHandler} className='clsTextField' />
                    </label>
                </div>
                <button type='submit'>
                    Add Event
                            </button>
            </form>

        </div>)
        return (
            <div>
                <ReactModal
                    name='createEvent'
                    isOpen={this.state.showCreateEvent}
                    contentLabel='Add Event'
                    className="card">
                    {body}
                    <button onClick={this.handleCloseCreateEvent}>
                        Cancel
                </button>
                </ReactModal>
            </div>
        );
    };
}
export default AddEvent;