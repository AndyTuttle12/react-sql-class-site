import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '../public/styles.css';
import $ from '../node_modules/jquery/dist/jquery.min.js';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			theClass: []
		}
		this.addStudent = this.addStudent.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	componentDidMount() {
		$.getJSON('http://localhost:3000/getStudents', (studentsFromApi)=>{
			this.setState({
				theClass: studentsFromApi
			});
		});
	}

	addStudent(event){
		event.preventDefault();
		const studentToAdd = event.target[0].value;
		$.ajax({
			method: "POST",
			url: "http://localhost:3000/addStudent",
			data: { name: studentToAdd }
		})
			.done((studentsArray)=>{
				this.setState({
					theClass: studentsArray
				});
			});
	}

	render() {
		const theClassArray = [];
		this.state.theClass.map((student, index)=>{
			theClassArray.push(<li key={index}>{student.name}</li>)
			return theClassArray;
		});
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to React</h2>
				</div>
				<div className="add-box">
					<form onSubmit={this.addStudent}>
						<input type="text" id="new-student"/>
						<input type="submit" value="Add student"/>
					</form>
				</div>
				<p className="App-intro">
					{theClassArray}
				</p>
			</div>
		);
	}
}

export default App;
