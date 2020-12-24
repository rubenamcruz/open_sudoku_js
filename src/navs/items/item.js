import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

class Item extends React.Component {


    render() {
        let icon = <FontAwesomeIcon style={{ marginRight: "6px" }} icon={faAngleDoubleRight} />
        return (
            <div>
                <div className="sidenavItem">
                    <div style={{ marginLeft: "6px" }}>
                        <a href={this.props.href}>{this.props.text}</a>
                    </div>
                    {icon}
                </div>
            </div>
        )
    }
}

export default Item;