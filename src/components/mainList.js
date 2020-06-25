import React,{ Component } from 'react';
import { connect } from 'react-redux';

class MainList extends  Component {

    constructor(props) {
       super(props);

       this.state = {
           list: []
       };

    }

    componentDidMount() {


        fetch('https://api.scoutium.com/api/clubs/4029/players?count=100')
            .then(response => response.json())
            .then(data => {
            console.log(data);
            this.setState({
                list: data.players
            });
        });
    }

   /* findUsername (userId) {
        const { userList } = this.props;
        if  (userList.length > 0 ) {
            return userList.find(user => user.id === userId).name;
        } else {
            return '';
        }
    }*/


   pick(pick) {
       console.log(pick);
   }

    render () {
        const {list} = this.state;
        return (
            <div className="ui list">
                {list.map(player =>
                    <li key={player.id} style={{flex: 1, flexDirection: 'row'}}>
                        <span>{player.display_name}</span>
                        <span onClick={this.pick(player)}>x</span>
                    </li>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.playerList);
    //console.log(state.userList);

};

export default connect(mapStateToProps)(MainList);

