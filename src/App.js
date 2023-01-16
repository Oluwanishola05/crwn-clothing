import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import { BrowserRouter  as Router, Route, Routes, Navigate} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';



class App extends React.Component {
 
   unsubscribeFromAuth = null;

  componentDidMount(){ 
    const {setCurrentUser} = this.props;
     this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
       // this.setState({ currentUser: user})
        // createUserProfileDocument(user);

        if(userAuth) {
          const userRef = await createUserProfileDocument(userAuth);

          userRef.onSnapshot(snapShot => {
            setCurrentUser({
                id: snapShot.id,
                ...snapShot.data()
              
            });
          });
           
        }
          setCurrentUser(userAuth);
    });
  }

    componentWillUnmount(){
      this.unsubscribeFromAuth();
    }

  

  
  render() {
  return (
    <div>
      
       <Router>
        <Header/>
        <Routes>     
          <Route exact path='/' element={<HomePage />} ></Route>
          <Route exact path='/shop' element={<ShopPage />} ></Route>
          <Route exact path='/signin' 
                element ={ this.props.currentUser ? 
                (<Navigate to='/' replace/>) : 
                (<SignInAndSignUpPage/>)} />
          
          </Routes>
       </Router>
    </div> 
  ); 
  }
}  

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
