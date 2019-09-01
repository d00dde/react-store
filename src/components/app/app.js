import React from 'react';
import { Route } from 'react-router-dom';
import { HomePage, CartPage} from '../pages';

const App = () => {
    return(
      <React.Fragment>
          <Route path='/'
                 component={HomePage}
                 exact/>
          <Route path='/cart'
                 component={CartPage}/>
      </React.Fragment>
   );
}

export default App;