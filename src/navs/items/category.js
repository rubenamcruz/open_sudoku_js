import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Item from './item.js';

class Category extends React.Component {

    constructor(props) {
        super(props);
        this.state = { expanded: false };
    }

    render() {
        let icon = <FontAwesomeIcon style={{ marginRight: "6px" }} icon={faAngleRight} />
        if (this.state.expanded) {
            icon = <FontAwesomeIcon style={{ marginRight: "6px" }} icon={faAngleDown} />
        }
        return (
            <div>
                <div className={this.state.expanded? "sidenavCategory expanded":"sidenavCategory"} onClick={() => this.setState({ expanded: !this.state.expanded })}>
                    <div style={{ marginLeft: "6px" }}>
                        {this.props.text}
                    </div>
                    {icon}
                </div>
                <div style={{display: this.state.expanded? "": "none"}}>
                    {this.props.items}
                </div>
            </div>
        )
    }
}

export default Category;