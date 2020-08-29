import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import AppHeader from './components/AppHeader'
import * as Font from 'expo-font';
import dictionary from './database.js';

export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      fontsLoaded: false,
      text: "",
      word: "Loading...",
      lexicalCategory: "",
      definition: "",
      isSearchPressed: false,
      isLoading: false,
      buttonHeight: 9,
      buttonTop: 0,
    }
  }

  async loadFontsAsync() {
    await Font.loadAsync({
      'Poppins': require('./assets/Poppins-Regular.ttf'),
      'Quicksand': require('./assets/Quicksand-Regular-400.ttf'),
      'Duru Sans': require('./assets/DuruSans-Regular.ttf'),      
    });
    this.setState({fontsLoaded: true});
  }

  getWord(word){
    word = word.toLowerCase();
    try{
      this.setState({
        word: dictionary[word]["word"],
        lexicalCategory: dictionary[word]["lexicalCategory"],
        definition: dictionary[word]["definition"],
      })
    }
    catch(err){
      alert("Sorry, this word is not available at the moment.");
      this.setState({
        word: "",
        isSearchPressed: false,
      })
    }
  }

  buttonPress=()=>{
    this.setState({buttonHeight: 3, buttonTop: 6})
    setTimeout(()=>{this.setState({buttonHeight: 9, buttonTop: 0})}, 500)
  }

  componentDidMount() {
    this.loadFontsAsync();
  }

  render() {
    return (
      <View>
        <AppHeader />

        <TextInput value={this.state.text}
        placeholder="Enter Word"
        placeholderTextColor="#bababa"
        onChangeText={(text)=>{this.setState({
          text: text,
          word: "Loading...",
        })}}
        style={styles.input} />
        
        <TouchableHighlight style={[styles.submit, {
          top: this.state.buttonTop,
          shadowOffset: {width: 0, height: this.state.buttonHeight}}]}
        underlayColor="#f28c0f" activeOpacity={1}
        onPress={()=>{
          this.setState({isSearchPressed: true});
          this.getWord(this.state.text);
          this.buttonPress();
        }}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableHighlight>

        <View>
          {this.state.word !== "Loading..." && this.state.isSearchPressed === true
            ? (<View style={{marginTop: 20,marginLeft: 10,}}>
                  <Text style={styles.mainText}>
                    <b style={{fontWeight: 700, color: "#1F84D4", fontSize:20}}>
                    Word</b>:{" " + this.state.word.charAt(0).toUpperCase()+this.state.word.slice(1)}
                  </Text>

                  <Text style={styles.mainText}>
                    <b style={{fontWeight: 700, color: "#1F84D4", fontSize:20}}>
                    Type</b>: {" " + this.state.lexicalCategory}
                  </Text>

                  <Text style={styles.mainText}>
                    <b style={{fontWeight: 700, color: "#1F84D4", fontSize:20}}>
                    Definition</b>: {"\n" + this.state.definition.charAt(0).toUpperCase() + this.state.definition.slice(1)}
                  </Text>
              </View>)           
            :null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input:{
    borderColor: '#f28c0f',
    borderWidth: 3,
    borderRadius: 10,
    width: 230,
    height: 30,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 18,
    outline: 'none',
  },
  submit:{
    backgroundColor: '#f28c0f',
    alignItems: 'center',
    alignSelf: 'center',
    width: 100,
    padding: 8,
    marginTop: 20,
    borderRadius: 10,
    shadowColor: "#d97d0d",
    shadowOffset: {width: 0, height: 9},
    shadowRadius: 1,
  },
  buttonText:{
    fontFamily: 'Duru Sans',
    fontSize: 17,
    color: 'white',
  },
  mainText:{
    fontFamily: 'Poppins',
    fontSize: 15,
  }
});
