import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px',
  }
}

class Loading extends React.Component {

    static propTypes = {
      text: PropTypes.string.isRequired,
      speed: PropTypes.number.isRequired
    }
    static defaultProps = {
      text: 'Loading',
      speed: 300
    }
  
    state = {
      text: this.props.text
    }
  

  componentDidMount() {
    const { text, speed } = this.props;
    const stopper = text + '...';

    //Display 'Loading' + adding a dot every ${speed} milliseconds until it reaches 3 dots, then it starts again
    this.interval = window.setInterval(() => {
      this.state.text === stopper
      ? this.setState(() => ({text: this.props.text}))
      : this.setState((prevState) =>  ({ text: prevState.text + '.' }))
    }, speed)
  }

  componentWillUnmount() {
    //Clearing the interval on Component Unmount to prevent a memory leak
    window.clearInterval(this.interval);
  }


  render() {
    return (
      <p style={styles.content}>
        {this.state.text}
      </p>
    )
  }
}





export default Loading;