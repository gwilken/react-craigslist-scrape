import React from "react";

import api from "../utils/api";

import Results from "./Results";

class Search extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      results: null
    };

    this.doSearch = this.doSearch.bind(this);
    this.updateText = this.updateText.bind(this);
    this.haveData = this.haveData.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);

  }

  componentDidMount() {
    fetch('/all')
      .then((res) => res.json())
      .then(function(data) {
        this.setState( {results: data} )

      }.bind(this))
  }

  delete(id) {
    //this.setState( {results: data} );
    api.delete(id).then((res) => {

      this.setState( {results: res} )

    })
  }

  update(id) {
    console.log('parent u', id);
  }

  doSearch(event) {
    event.preventDefault();

    api.search(this.state.text).then((res) => {
      this.setState( { results: this.state.results.concat(res).reverse() } )
    });
  }

  updateText(event) {
    this.setState({
      text: event.target.value
    });
  }

  haveData() {
    if(this.state.results) {
      return( <Results data={this.state.results} delete={this.delete} update={this.update} /> )
    }
  }

  render() {

    return(

      <div>

        <div id="search-container" className="mdl-textfield mdl-js-textfield">

          <form onSubmit={this.doSearch}>

            <input
              className='mdl-textfield__input'
              onChange={this.updateText}
              type="text" />

            <label
              id="search-label"
              className="mdl-textfield__label">
              Search...
            </label>

            <button id="go-button" className="mdl-button mdl-button--colored mdl-js-button" type="submit">Go</button>

          </form>

        </div>

          {this.props.children}

          {this.haveData()}

    </div>

    )
  }

}

export default Search;