import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import BackIcon from 'material-ui/svg-icons/navigation/chevron-left';

const api = 'https://jsonplaceholder.typicode.com';

class App extends Component {

  constructor(props){
    super(props);

    this.state ={
      users: [],
      user: {},
      posts: [],
      showUsers: true,
    }
  }

  _getUsers(){
      return axios.get(`${api}/users`).then((response) => {
        this.setState({users: response.data});
      });
  }

  _getPosts(id){
      return axios.get(`${api}/posts?userId=${id}`).then((response) => {
        this.setState({posts: response.data});
      });
  }

  componentDidMount() {
    this._getUsers();
  }


  render() {
    const styles = {
      mediumIcon: {
        width: 40,
        height: 40,
      },
      medium: {
        padding: 0,
      },
    };
    return (
      <div className="App" style={{display:'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center',}}>
        <div className="App-header" style={{width: 400, padding: 0,}}>
          <img src={logo} className="App-logo" alt="logo" />
          <h2>TradeForce React</h2>
        </div>
        <div className="App-container" style={{width: 400, marginBottom: 23, display:'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',}}>

          {
          this.state.showUsers ? null : 
          <div style={{
              width: 400,
              display:'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              }}>
              <IconButton
                iconStyle={styles.mediumIcon}
                style={styles.medium}
                onClick={() => {
                  this.setState({showUsers: true, user: {}});
                }}>
                <BackIcon style={{fontSize: 30,}}/>
              </IconButton>
              <span style={{fontSize: 24, color: '#000000', display: 'flex',}}>{this.state.user.username}</span>
          </div>
          }
          {
            this.state.showUsers ?
            this.state.users.map((item, index) => {
              return(
                <Card key={index} style={{textAlign: 'left', width: 400, marginBottom: 1,}}>
                  <CardHeader
                    title={item.name}
                    subtitle={item.email}
                  />
                  <CardTitle title={`${item.username}`} subtitle={`Phone: ${item.phone} Website: ${item.website}`} />
                  <CardText>
                    Info.<br/>
                    {`Address: ${item.address.street}, ${item.address.suite} ${item.address.city}, ${item.address.zipcode}`}<br/>
                    {`Company:`}<br/>
                    {item.company.name}<br/>
                    {item.company.catchPhrase}<br/>
                    {item.company.bs}
                  </CardText>
                  <CardActions>
                    <RaisedButton
                    onClick={(e) => {
                      e.preventDefault();
                      this._getPosts(item.id);
                      this.setState({showUsers: false, user: item});
                    }}
                    label="Posts" />
                  </CardActions>
                </Card>
              )
            })
            :
            this.state.posts.map((item, index) => {
              return(
                <Card key={index} style={{textAlign: 'left', width: 400, marginBottom: 1,}}>
                  <CardTitle title={`${item.title}`} />
                  <CardText>
                    {item.body}
                  </CardText>
                </Card>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
