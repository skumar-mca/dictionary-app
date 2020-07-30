import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import React, { Component } from "react";
class RenderSpeakComponent extends Component {
    constructor(props) {
        super(props);
    }

    speak = () => {
        let { content } = this.props;
        if (content) {
            let msg = new SpeechSynthesisUtterance(content);
            window.speechSynthesis.speak(msg);
        }
    }

    render() {
        if (!window.speechSynthesis) {
            return ''
        }

        let { content } = this.props;
        content = (content || '').toString().trim();
        return <span title="Click to speak given word/phrase">
            <RecordVoiceOverIcon onClick={this.speak} />
        </span>
    }
}

export default RenderSpeakComponent;
