import React, { Component } from "react";
class RenderHtmlContent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let { content } = this.props;
        content = (content || '').toString().trim();
        return <>
            <span className="html-content-view" dangerouslySetInnerHTML={{ __html: content }} ></span>
        </>
    }
}

export default RenderHtmlContent;
