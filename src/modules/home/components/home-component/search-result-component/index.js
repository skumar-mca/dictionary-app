import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as lodash from 'lodash';
import React from "react";
import RenderHtmlContent from '../../../../../shared-components/RenderHtmlContent/index';
import RenderSpeakComponent from '../../../../../shared-components/SpeakComponent/index';

class SearchResultComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageURL: null
        }
    }

    getImageURL = () => {
        const { searchResult } = this.props;
        if (searchResult && searchResult.Images) {
            const windowWidth = window.innerWidth;
            if (windowWidth < 418) {
                return lodash.get(searchResult.Images, 'small', null);
            }
            else if (windowWidth > 418 && windowWidth < 750) {
                return lodash.get(searchResult.Images, 'medium', null);
            }

            return lodash.get(searchResult.Images, 'large', null);
        }
        return ''
    }

    handleChange = (evt, index) => {
        evt && evt.preventDefault();
        this.setState({ isExpanded: this.state.isExpanded === `panel${index}` ? null : `panel${index}` });
    };

    render() {
        const { searchResult } = this.props;
        const { isExpanded } = this.state;
        const classes = {};
        const imgUrl = this.getImageURL();
        const windowWidth = window.innerWidth;

        return <>
            <Card className={classes.root}>
                <CardHeader
                    action={searchResult?.Definitions[0].type && <Chip label={searchResult?.Definitions[0].type} disabled />}
                    title={
                        <>
                            {searchResult.Word}
                            <span className="speak-box"> <RenderSpeakComponent content={searchResult.Word} /></span>
                        </>
                    }
                    subheader={searchResult.Pronunciation}
                />

                {imgUrl && <div className="search-result-image" title={searchResult.Word}>
                    <img src={imgUrl} key={`img_${searchResult.Word}`} />
                </div>
                }

                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <span className="sub-definition">
                            <p className="sub-info-1">
                                <span className="speak-box"> <RenderSpeakComponent content={searchResult?.Definitions[0].definition} /></span>
                                <RenderHtmlContent content={searchResult?.Definitions[0].definition} />

                            </p>

                        </span>
                        {searchResult?.Definitions[0].example &&
                            <>
                                <div className="example-text">
                                    <span className="speak-box"> <RenderSpeakComponent content={searchResult?.Definitions[0].example} /></span>
                                    <RenderHtmlContent content={`"${searchResult?.Definitions[0].example}"`} />
                                </div>
                            </>
                        }
                    </Typography>
                </CardContent>
            </Card>

            <br />
            {lodash.map(searchResult?.Definitions || [], (itm, indx) => {
                return indx > 0 &&
                    <>
                        <Accordion expanded={isExpanded === `panel${indx}`}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${indx}bh-content`}
                                id={`panel${indx}bh-header`}
                                onClick={(evt) => { this.handleChange(evt, indx) }}
                            >
                                <Chip label={itm.type} disabled />

                                {windowWidth > 418 && isExpanded !== `panel${indx}` && <>
                                    <p className="sub-info">
                                        <RenderHtmlContent content={itm.definition} />
                                    </p>
                                </>
                                }

                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <div className="sub-definition">
                                        <span className="speak-box"> <RenderSpeakComponent content={itm.definition} /></span>
                                        <RenderHtmlContent content={itm.definition} />
                                    </div>

                                    <div className="example-text">
                                        <span className="speak-box"> <RenderSpeakComponent content={itm.example} /></span>
                                        <RenderHtmlContent content={`"${itm.example}"`} />
                                    </div>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                    </>
            })}
        </>
    }
}

export default SearchResultComponent;
