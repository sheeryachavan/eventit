import React, { Component } from 'react'
import { Container, Row, Button } from 'react-bootstrap'
class EditEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            eventData: this.props.eventData
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        // const data = new FormData(event.target);

        // fetch('/api/form-submit-url', {
        //     method: 'POST',
        //     body: data,
        // });
        // this.setState({ showCreateEvent: false });
        // this.props.handleClose(false);
    }
    fileSelectedHandler = event => {
        console.log(event.target.files[0]);
    }
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
                <div className='form-group'>
                    <label>
                        Description:
                        <input required type='textarea' className='clsTextField' />
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Date:
                        <input required type='date' className='clsTextField' />
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        From Time:
                        <input required type='time' className='clsTextField' />
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        To Time:
                        <input required type='time' className='clsTextField' />
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Max participants:
                        <input required type='number' className='clsTextField' />
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Change Cover Photo:
                        <input type='file' onChange={this.fileSelectedHandler} className='clsTextField' />
                    </label>
                </div>
                <button type='submit'>
                    Update Event
                            </button>
            </form>

        </div>)

        return (<div>
            {body}
        </div>

        );
    };
}
export default EditEvent;