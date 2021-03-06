var React = require('react');
var Button = require('./Button.jsx');

module.exports = React.createClass({
  displayName: "CreateWish",
  getInitialState: function() {
    return {
      grabbedBy: null,
      text: null,
      comment: "",
      price: null,
      wishUrl: null,
      for: ""
    };
  },
  reset: function() {
    this.setState(this.getInitialState());
  },
  onFormChange: function(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  },
  handleSave: function(e) {
    e.preventDefault();

    if (!this.state.text) {
      alert('Bitte gebe einen Titel ein!');
      return false;
    }

    if (this.state.for === "") {
      alert('Bitte wähle einen Beschenkten aus!');
      return false;
    }

    var url = this.state.wishUrl;

    if (url && !/^https?:\/\//i.test(url)) {
      url = 'http://' + url;
    }

    var formData = {
      text: this.state.text,
      comment: this.state.comment,
      price: this.state.price,
      url: url,
      for: this.state.for
    };

    this.props.onCreateWish(formData);

    this.reset();
  },
  render: function() {
    return (
        <div className='wish create'>
          <div className="buttonContainer">
            <Button
              text='Speichern'
              type='plain'
              onClick={this.handleSave}
            />
            <div className="delete" onClick={this.reset}>Abbrechen</div>
          </div>
          <div className="formSection">
            <label htmlFor="for">Für</label>
            <select id="for" onChange={this.onFormChange} required value={this.state.for}>
              <option value="">--</option>
              <option value={this.props.user.name}>Mich</option>
              {this.props.users.map(function(user) {
                return (
                  <option key={'c_o_' + user.name}>{user.name}</option>
                )
              })}
            </select>
            <div className="editPrice" >
              <label htmlFor="price">Preis</label>
              <input id="price" type="text" onChange={this.onFormChange} value={this.state.price}/>
            </div>
          </div>
          <div className="formSection">
            <label htmlFor="title">Titel</label>
            <input type="text" id="text" onChange={this.onFormChange} required value={this.state.text}/>
          </div>
          <div className="wishContent">
              <div className="formSection">
                <label htmlFor="url">Link</label>
                <input id="wishUrl" type="url" onChange={this.onFormChange} value={this.state.wishUrl}/>
              </div>
              <div className="formSection">
                <label htmlFor="comment">Kommentar</label>
                <textarea id="comment" className="comment" type="text" onChange={this.onFormChange} value={this.state.comment}></textarea>
              </div>
            </div>
          <div className="clearfix"></div>
        </div>
    )
  }
});
