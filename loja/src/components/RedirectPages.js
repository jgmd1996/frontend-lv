import React from 'react';
import { Link } from 'react-router-dom'

function RedirectPages(props) {
    return (
        <div>
                        <h4> {props.NamePage}</h4>
                        <Link to={props.linkPage}>{props.page}</Link>
        </div>
    );
}

export default RedirectPages;