import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaUser } from 'react-icons/fa';
import { Container, Row, Col, Button, Card, Form, Icon} from 'react-bootstrap'


class Info extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loading : false,
            character:{},
            userInput: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

componentDidMount(){
    this.setState({loading : true})
    fetch("https://api.github.com/users/example")
        .then(response => response.json())
        .then(data => this.setState({
            loading : false,
            character : data
        }))
}

handleChange(e){
    e.preventDefault()
    this.setState({
        userInput:e.target.value
    })
}

handleSubmit(e){
    e.preventDefault()
    fetch(`https://api.github.com/users/${this.state.userInput}`)
        .then(reponse => reponse.json())
        .then(data => this.setState({character:data}))
}



render(){
    const BarStyle = {
        border:"none",
        padding:"0.5rem",
        width:"20rem",
        background:"",
        position: 'absolute',
        left: '30%',
        top: '10%',
    };

    const text = this.state.loading ? "loading..." : this.state.character.login
    const repo = this.state.loading ? " " : this.state.character.public_repos
    const followers = this.state.loading ? "" : this.state.character.followers
    const pic = this.state.loading ? "" : this.state.character.avatar_url
    const link = this.state.character

    return(
         <div>
            <Form style={BarStyle} onSubmit={this.handleSubmit}>
                <input type="text" value={this.userInput} placeholder = "Enter Github user..." onChange={this.handleChange} />
                <Button type="submit">Submit</Button>
                <Container style ={{padding: "0.5rem",left: "50%"}}>
                    <Card className="mb-3" style={{ color: "#000",  }}>
                                <Card.Img src={pic} />
                    </Card>
                </Container>

            </Form>
            <Card className="mb-3" style={{ color: "#000", position: 'absolute',left:'53%',bottom:'49.5%',width:"20rem", }}>
                            <Card.Header><FaUser /> {text}</Card.Header>
                                <Card.Body>
                                    <Card.Text>Repositories: {repo} </Card.Text>
                                    <Card.Text>Followers: {followers}</Card.Text>
                                </Card.Body>
                    </Card>

        </div>
    )
  }
}
export default Info
