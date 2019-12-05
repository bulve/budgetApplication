import * as React from 'react';
import './App.css';
import { RouterLayout } from './layout/navigation/Router.layout';


class App extends React.Component<{}, {}> {
  constructor(props: {}){
    super(props);
    this.state = {
     
    }
  }


  public render() {
    return (
      <div className="App">
        <RouterLayout/>
      </div>
    );
  }
}

export default App;
