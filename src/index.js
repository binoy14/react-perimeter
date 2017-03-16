import React, { Component } from 'react'


export default class Perimeter extends Component {

    constructor(props) {
        super(props);
        this.bounds = null;
        this.breached = false;
    }

    /**
     * When the component mounts 
     */
    componentDidMount() {
        this.bounds = this.node.getBoundingClientRect();
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('resize', this.handleResize);
        this.listening = true;
    }

    componentWillUnmount() {
        if (this.listening) {
          this.removeEventListeners()
        }
    }

    removeEventListeners() {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('resize', this.handleResize);
        this.listening = false;
    }

    handleResize = () => {
        // @todo debounce
        this.bounds = this.node.getBoundingClientRect();
    }

    handleMouseMove = ({ clientX, clientY }) => {
        const { buffer } = this.props;
        const { top, right, bottom, left } = this.bounds;
        if (
            // Cursor is not too far left
            clientX > (left - buffer) &&
            // Cursor is not too far right
            clientX < (right + buffer) &&
            // Cursor is not too far up
            clientY > (top - buffer) &&
            // Cursor is not too far down
            clientY < (bottom + buffer)
        ) {
            this.handlePerimeterBreach();
        }
    }

    handlePerimeterBreach = () => {
        const { once, onBreach } = this.props;
        onBreach();
        if (once) {
            this.removeEventListeners();
        }
    }


    render() {
        let { children } = this.props;
        if (typeof children === "function") {
            return children(n => this.node = n)
        }
        return <span ref={node => this.node = node}>{children}</span>
    }
}