import React, { Component } from 'react'
import { Container, Row, Button } from 'react-bootstrap'
import ReactSearchBox from 'react-search-box'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './search.css';
class SearchEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: ""
        }
    }
    data = [
        {
            key: 'john',
            value: 'John Doe',
        },
        {
            key: 'jane',
            value: 'Jane Doe',
        },
        {
            key: 'mary',
            value: 'Mary Phillips',
        },
        {
            key: 'robert',
            value: 'Robert',
        },
        {
            key: 'karius',
            value: 'Karius',
        },
    ]

    render() {
        return (
            <div>
                <div className="hometitle">
                    EVENT.it
                </div>
                <div className="clssearch-container">
                    <div className="clssearch-box">
                        {/* <input type="text" className="input" placeholder="Search Events..." /> */}
                        <input className="clssearch-txt" type="search" placeholder="Search..." data={this.data} callback={record => console.log(record)}></input>
                        {/* <ReactSearchBox
                        placeholder="Search Events..."
                        className="search-txt"
                        value="Doe"
                        data={this.data}
                        callback={record => console.log(record)}
                    /> */}
                        <button className="clssearch-btn">
                            <FontAwesomeIcon icon="fas fa-search" />
                        </button>
                    </div>
                </div>

            </div>
        )

    }
}
export default SearchEvent;