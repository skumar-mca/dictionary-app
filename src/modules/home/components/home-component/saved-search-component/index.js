import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import * as lodash from 'lodash';
import React from 'react';
import CacheManager from '../../../../../helpers/cache-manager';
import { SAVED_SEARCH } from '../../../../../helpers/constants';
import { ManageSearchResult } from '../../../../../helpers/index';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

class SavedSearchListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            savedSearches: [],
            showDeletePopup: false,
            selected: null

        }
    }

    componentDidMount() {
        this.loadSavedSearches();
    }

    componentDidUpdate(prev) {
        if (prev.newSearchAdded !== this.props.newSearchAdded) {
            this.loadSavedSearches();
        }
    }

    loadSavedSearches = () => {
        const savedSearches = CacheManager.getItem(SAVED_SEARCH);
        if (savedSearches) {
            this.setState({ savedSearches })
        }
    }

    handleDelete = (evt, itm) => {
        evt && evt.preventDefault();
        this.setState({ selected: itm, showDeletePopup: true });
    }

    handleDeleteModalClose = (evt) => {
        if (evt === 1) {
            const { selected } = this.state;
            ManageSearchResult.remove(selected.key);
            this.loadSavedSearches();
        }
        this.setState({
            showDeletePopup: false, selected: null
        });
    }

    showCurrentTerm = (evt, itm) => {
        evt && evt.preventDefault();
        const { handleShowSelectedResult } = this.props;
        handleShowSelectedResult && handleShowSelectedResult(itm);
    }

    handleDelete = (evt, itm) => {
        evt && evt.preventDefault();
        ManageSearchResult.remove(itm.key);
        this.loadSavedSearches();
    };

    render() {
        const classes = {}
        const { savedSearches, showDeletePopup } = this.state;
        const currentId = lodash.get(this.props, 'match.params.searchTerm', null);
        return <>
            <div className="saved-search-box">
                {lodash.map(savedSearches || [], itm =>
                    <Chip
                        key={`saved-${itm.key}`}
                        className="saved-searches"
                        label={itm.key}
                        color={currentId === itm.key ? `primary` : 'default'}
                        onDelete={(evt) => { this.handleDelete(evt, itm) }}
                        onClick={(evt) => { this.showCurrentTerm(evt, itm) }}
                    />
                )}
            </div>
        </>
    }
}

export default SavedSearchListComponent;


