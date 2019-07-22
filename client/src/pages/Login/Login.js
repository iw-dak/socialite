import React, { Component } from 'react';
import { AuthStore } from '../../helpers';
import { Redirect, Link } from "react-router-dom";
import './Login.scss';
import UserContext from '../../context/users/UserContext';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      errorMessage: false
    };
  }

  handleChange = e => {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.email === '' || this.state.password === '') {
      this.setState({
        errorMessage: "Tous les champs doivent être remplis 🤔"
      });
      return;
    }

    this.props.userLogin(this.state).then(() => {
      this.setState({
        errorMessage: false,
        email: '',
        password: '',
        successMessage: "👉Bien vous venez de rejoindre la communauté ✅"
      });

      document.querySelector("button").disabled = true;
      setTimeout(() => {
        this.props.history.push('/account/feeds');
      }, 2000);
    }).catch(response => {
      this.setState({
        errorMessage: response.errorMessage
      });
    });
  }

  render() {
    const logo = process.env.REACT_APP_URL + '/images/logo.svg';
    const emailIcon = process.env.REACT_APP_URL + '/icons/email-icon.svg';
    const passwordIcon = process.env.REACT_APP_URL + '/icons/password-icon.svg';

    if (AuthStore.isAuthenticated()) {
      return <Redirect to={{ pathname: "/account/feeds" }} />
    }

    return (
      <div className="Login container">
        <div className="row">
          <div className="col-12">

            <form onSubmit={this.handleSubmit} className="LoginForm">
              <Link to="/account/feeds">
                <img src={logo} alt="Socialite Logo" className="logo" />
              </Link>

              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-center">On se connait déjà ?</h5>
                  <h6 className="card-subtitle mb-2 text-muted text-center">
                    <Link to="/auth/register">Non ? Faisons connaissance !</Link>
                  </h6>

                  {this.state.errorMessage && <div className="alert alert-danger" role="alert">
                    {this.state.errorMessage}
                  </div>}

                  {this.state.successMessage && <div className="alert alert-success" role="alert">
                    {this.state.successMessage}
                  </div>}

                  <div className="card-text">
                    <div className="form-group">
                      <label htmlFor="email">Adresse e-mail</label>
                      <div className="field-group">
                        <input type="email" name="email" className="form-control" value={this.state.email} onChange={this.handleChange} id="email" aria-describedby="emailHelp" placeholder="Entrez votre email" />
                        <img className="image" src={emailIcon} alt="Mot de passe" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Mot de passe</label>
                      <div className="field-group">
                        <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.handleChange} id="password" aria-describedby="emailHelp" placeholder="Entrez votre mot de passe" />
                        <img className="image image-password" src={passwordIcon} alt="Mot de passe" />
                      </div>
                    </div>
                  </div>

                  <div className="button-row">
                    <button type="submit" className="btn btn-primary">C'est parti !</button>
                    <a href="/forget-password" className="card-link mt-2">Identifiants oubliés ?</a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <UserContext.Consumer>
    {({ userLogin }) => <Login
      {...props}
      userLogin={userLogin}
      ref={ref}
    />
    }
  </UserContext.Consumer>
));
