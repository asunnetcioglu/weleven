import React, {Component} from 'react';
import $ from "jquery";
import {Col, Row, Button, Modal} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";




class Content extends Component {

    constructor(props) {
        super(props);

        this.state = {
            list: [],
            elevenList: [],
            subList: [],
            newList: [],
            showModal: false,
            inPlayer: '',
            outPlayer: '',
            minute: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.outPlayerChangeHandler = this.outPlayerChangeHandler.bind(this);
        this.inPlayerChangeHandler = this.inPlayerChangeHandler.bind(this);
        this.minuteChangeHandler = this.minuteChangeHandler.bind(this);
    }

    outPlayerChangeHandler = (event) => {
        //console.log(event);
        event.persist();
        this.setState({
            outPlayer: JSON.parse(event.target.value)
        })
    }

    inPlayerChangeHandler = (event) => {
        event.persist();
        this.setState({
            inPlayer: JSON.parse(event.target.value)
        });
    }

    minuteChangeHandler = (event) => {
        event.persist();
        this.setState({
            minute: event.target.value
        });
    }

    pick(pick) {
        const elevenList = this.state.elevenList;
        const y = document.getElementById("emptyInfo");
        y.style.display = 'none';
        if (!elevenList.find(x => x.id === pick.id) && elevenList.length < 11) {
            elevenList.push(pick);
            this.setState({
                elevenList: elevenList
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const newList = this.state.newList;
        const inPlayer = this.state.inPlayer;
       // console.log(inPlayer, newList);

        if (!newList.some(x => x.id === inPlayer.id) && newList.length < 3) {
            newList.push(Object.assign({}, inPlayer, {minute: this.state.minute}));


            this.setState({
                newList: newList,
                showModal: false
            });
        }
    }

    componentDidMount() {
        const spinner = document.getElementById("spinner");

        spinner.removeAttribute('hidden');
        fetch('https://api.scoutium.com/api/clubs/4029/players?count=100')
            .then(response => response.json())
            .then(data => {
                spinner.setAttribute('hidden', '');

                data.players = data.players.map(x => {
                    //console.log(x.position);
                    if (!x.position) {
                        x.position = {name: null}
                    }
                    return x;
                });
                this.setState({
                    list: data.players
                });
            });
        $(".butCont button").on( "click", function() {
            $("div.suc-row").css("display","block"); $("div.box-one, span.cross, #addSub, div.main-list").css("display","none"); $("div.final-show").css("display","block");
        });
        $(".try-again").on( "click", function() {
            window.location.reload(false);
        });
    }

    delete(player) {
        let elevenList = this.state.elevenList;
        const ind = elevenList.findIndex(x => x.id === player.id);
        elevenList.splice(ind, 1);
        //console.log(elevenList);
        this.setState({
            elevenList: elevenList
        });
    }

    deleteNewListItem(player) {
        let newList = this.state.newList;
        const ind = newList.findIndex(x => x.id === player.id);
        newList.splice(ind, 1);
        this.setState({
            newList: newList
        });
    }





    render() {
        const {list, elevenList, newList} = this.state;
        const yz = document.getElementById("addSub");
        const b = document.getElementById("confBtn")

        if (newList.length === 1) {
            b.removeAttribute("disabled");
            b.classList.remove("btn-secondary")
            b.classList.add("btn-primary");
        }
        if (newList.length === 3) {
            yz.style.display = 'none';
        }

        return (
            <main role={"main"} className={"content"}>
                <div hidden id="spinner"></div>
                <div className="container">
                    <div className={"box"}>
                        <Row className={"box-one"} id={"boxOne"}>
                            <Col sm={1} md={6}>
                                <img src={window.location.origin + '/images/teams/bjk-lg@3x.png'}
                                     className="d-inline-block align-top" alt="" height="32"/><h1>Beşiktaş JK</h1>
                            </Col>
                            <Col sm={1} md={6} className={"butCont"}><Button variant="secondary" disabled id={"confBtn"}>Confirm</Button></Col>
                        </Row>
                        <Row className={"suc-row"}>
                            <div className={"succes"}><img src={window.location.origin + '/images/check-icon@3x.png'} alt={""} width={40} height={40} /> Squad saved successfully</div>
                        </Row>
                        <Row className={"box-two"}>
                            <Col xs={12} md={4}>
                                <div className={"inner-cont"}>
                                    <div className={"main-list"}>
                                        <h2>All Players</h2>
                                        <div className="list">
                                            <ul>
                                                {list
                                                    .filter(x => !elevenList.find(y => y.id === x.id))
                                                    .filter(x => !newList.find(y => y.id === x.id))
                                                    .map(player =>
                                                        <li key={player.id}>
                                                        <span><img src={player.image_url} alt="" width={34}
                                                                   height={34}/></span>
                                                            <span>{player.display_name}
                                                                <em>{player.position.name}</em>
                                                            </span>
                                                            <span onClick={() => this.pick(player)}
                                                                  id={"addPick"}>PICK</span>
                                                        </li>
                                                    )}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className={"final-show"}>
                                        <div className={"final-inner"}>
                                            <div>
                                                <img src={window.location.origin + '/images/teams/bjk-lg@3x.png'}
                                                     className="d-inline-block align-top" alt="" height={64}/><span>Beşiktaş JK</span>
                                                <a href="#lineUp" className={"try-again"}>Create New Lineup</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} md={4}>
                                <div className={"inner-cont"}>
                                    <h2>Lineup</h2>
                                    <div id={"emptyInfo"}>
                                        <div>You haven’t selected any player for lineup yet.</div>
                                    </div>
                                    <div className="list">
                                        <ul>
                                            {elevenList
                                                .map(player =>
                                                    <li key={player.id}>
                                                        <span><img src={player.image_url} alt="" width={34}
                                                                   height={34}/></span>
                                                        <span>{player.display_name}
                                                            <em>{player.position.name}</em>
                                                    </span>

                                                        <span className={"cross"} onClick={() => this.delete(player)}>x</span>
                                                    </li>
                                                )}
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} md={4}>
                                <div className={"inner-cont"}>
                                    <h2>Substitutes</h2>
                                    {this.state.elevenList.length === 0 ? <div id={"emptyInfo2"}>
                                        <div>Please pick 11 players for lineup before creating any substitutions</div>
                                    </div> : null}
                                    <div className="list">
                                        <ul>
                                        {newList.map(player =>
                                            <li key={player.id}>
                                                <span><img src={player.image_url} alt="" width={34} height={34}/></span>
                                                <span>{player.display_name}
                                                    <em>{player.position.name}</em>
                                                </span>
                                                <span className={"in-player"} onClick={() => this.deleteNewListItem(player)}>↑</span>
                                                <span>{player.minute}</span>
                                            </li>
                                        )}
                                        </ul>


                                    {this.state.elevenList.length === 11 ?
                                        <a href="#a" id={"addSub"} onClick={() => this.setState({
                                            showModal: true
                                        })}>+ Add Substitution</a> : null}
                                    </div>
                                    <Modal show={this.state.showModal} onHide={() => this.setState({showModal: false})}>
                                        <ModalHeader>
                                            <ModalTitle>Add Substitution</ModalTitle>
                                        </ModalHeader>
                                        <ModalBody>
                                            <form onSubmit={this.handleSubmit}>
                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="">Out Player</label>
                                                    <select onChange={this.outPlayerChangeHandler} className={"form-control"}>
                                                        <option value={''}>Enter Player Name</option>
                                                        {
                                                            elevenList.map(item =>
                                                                <option key={item.id}
                                                                        value={JSON.stringify(item)}>{item.display_name}</option>
                                                            )
                                                        }
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="">In Player</label>
                                                    <select onChange={this.inPlayerChangeHandler} className={"form-control"}>
                                                        <option value={''}>Enter Player Name</option>
                                                        {
                                                            list
                                                                .filter(x => !elevenList.find(y => y.id === x.id))
                                                                .filter(x => !newList.find(y => y.id === x.id))
                                                                .map(item =>
                                                                    <option key={item.id}
                                                                            value={JSON.stringify(item)}>{item.display_name}</option>
                                                                )
                                                        }
                                                    </select>

                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="">Substitution Minute</label>
                                                    <input type="number" placeholder={"Enter minute of substitution"} onChange={this.minuteChangeHandler} className={"form-control"}/>
                                                </div>

                                            </form>
                                        </ModalBody>
                                        <ModalFooter>
                                            <button className="btn btn-secondary" onClick={() => this.setState({showModal: false})}>Cancel</button>
                                            <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                                        </ModalFooter>
                                    </Modal>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </main>
        );
    }
}

export default Content;
