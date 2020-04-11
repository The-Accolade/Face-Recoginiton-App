import React, { Component } from "react";
import Particles from "react-particles-js";
import Navigation from "./Components/Navigation/Navigation";
import SignIn from "./Components/SignIn/SignIn";
import Register from "./Components/Register/Register"
import Logo from "./Components/Logo/Logo";
import Clarifai from "clarifai";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import "./styles.css";

const app = new Clarifai.App({
	apiKey: "3c3c44e2c4c34913a8340b3241bbacff"
});
  
const particleOptions = {
	particles: {
		number: {
			value: 30,
			density: {
				enable: true,
				value_area: 200
			}
		}
	}
};

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: '',
			box: {},
			//route keeps track of where we are on the page
			route: 'signin',
			isSignedIn: false
		};
	}

	calculateFaceLocation(data) {
		const clarifaiFace =
			data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById("inputImage");
		const width = Number(image.width);
		const height = Number(image.height);
		return {
      leftcol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightcol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
     };
  } 
  
  displayFaceBox = (box) => {
    this.setState({box});
  }

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	};
	onButtonSubmit = () => {
		this.setState({ imageUrl: this.state.input });
		app.models
			.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
			.then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
			.catch(err => err);
	};
	onRouteChange = (route) => {
		if(route === 'signout') {
			this.setState({isSignedIn: false})
		} else if (route === 'home') {
			this.setState({isSignedIn: true})
		}
			this.setState({route});
	}  
	render() {
		const { isSignedIn, imageUrl, box, route } = this.state;	
			return (
			<div className="App">
				<Particles className="particles" params={particleOptions} />
				<Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />

				{ route === 'home'
					? <div>
							<Logo />
							<Rank />
							<ImageLinkForm
								onInputChange={this.onInputChange}
								onButtonSubmit={this.onButtonSubmit}
							/>
							<FaceRecognition box={box} imageUrl={imageUrl} /> 
						</div>
					: ( 
							this.state.route === 'signin'
							? <SignIn onRouteChange={this.onRouteChange} />
							: <Register onRouteChange={this.onRouteChange} />
						)
				}
			</div>
		);
	}
}

export default App;
