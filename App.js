import React from 'react';
import { StyleSheet, Text, View, WebView, ActivityIndicator } from 'react-native';
import { Constants } from 'expo';

const INDEX_FILE = require(`./assets/dist/test.html`);

export default class App extends React.Component {
	constructor() {
		super();
		this.webview = null;
		this.state = {
			webViewNotLoaded: true, // flag to show activity indicator
			webViewFilesNotAvailable: true
		};
	}

	createWebViewRef = (webview) => {
		this.webview = webview;
	};

	webViewLoaded = () => {
		this.setState({ webViewNotLoaded: false });
	};

	handleMessage = (event) => {
		console.log('handleMessage');
	};

	showLoadingIndicator = () => {
		return (
			<View style={styles.activityOverlayStyle}>
				<View style={styles.activityIndicatorContainer}>
					<ActivityIndicator size="large" animating={this.state.webViewNotLoaded} color="green" />
				</View>
			</View>
		);
	};

	onError = (error) => {
		Alert.alert('WebView onError', error, [ { text: 'OK', onPress: () => console.log('OK Pressed') } ]);
	};

	renderError = (error) => {
		Alert.alert('WebView renderError', error, [ { text: 'OK', onPress: () => console.log('OK Pressed') } ]);
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.statusBar} />
				<Text
					style={{
						paddingHorizontal: 10,
						paddingVertical: 5,
						fontSize: 20,
						backgroundColor: '#9be1ff',
						color: 'black'
					}}
				>
					React Native Webview Inline JS Test
				</Text>
				<View
					style={{
						flex: 1,
						padding: 5
					}}
				>
					<WebView
						style={{
							...StyleSheet.absoluteFillObject,
							backgroundColor: '#ffebba',
							padding: 10
						}}
						ref={this.createWebViewRef}
						source={INDEX_FILE}
						onLoadEnd={this.webViewLoaded}
						onMessage={this.handleMessage}
						startInLoadingState={true}
						renderLoading={this.showLoadingIndicator}
						renderError={this.renderError}
						onError={this.onError}
						scalesPageToFit={false}
						javaScriptEnabled={true}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		display: 'flex',
		backgroundColor: '#dfffaf',
	},
	statusBar: {
		height: Constants.statusBarHeight,
		backgroundColor: '#dfffaf'
	}
});
