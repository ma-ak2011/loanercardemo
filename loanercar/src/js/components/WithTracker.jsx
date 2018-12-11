import React, { Component, } from "react";
import * as ReactGA from 'react-ga';

ReactGA.initialize("UA-130682795-1");

const WithTracker = (WrappedComponent) => {
    const trackPage = page => {

        ReactGA.set({
            page,
        });
        ReactGA.pageview(page);
    };

    const HOC = class extends Component {
        componentDidMount() {
            const page = this.props.location.pathname + this.props.location.search;
            trackPage(page);
        }

        componentDidUpdate(prevProps) {
            const currentPage =
                prevProps.location.pathname + prevProps.location.search;
            const nextPage =
                this.props.location.pathname + this.props.location.search;

            if (currentPage !== nextPage) {
                trackPage(nextPage);
            }
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };

    return HOC;
};

export default WithTracker;