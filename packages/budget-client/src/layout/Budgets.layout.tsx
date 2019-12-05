import * as React from 'react'
import { Card, Col } from 'antd';
import * as Models from '../model/models'
import * as Api from '../api/budgetApi'

export interface AppState {
    budgets: JSX.Element[]
  }

export class BudgetLayout extends React.Component<{}, AppState> {
    constructor(props: {}){
        super(props);
        this.state = {
          budgets: []
        }
      }
    
      public componentWillMount = () =>{
        Api.getBudgets()
        .then(res => {
          this.setState({
            budgets: res.data.map(budget => this.mapBudgets(budget))
          })
        })
        .catch(error => {
          console.error(error)
        })
      }
    
      public mapBudgets = (budget: Models.Budget) => {
        return (
            <Col key={budget.id} xs={1} sm={2} md={4} lg={6} xl={6}>
                <Card key={budget.id} title={budget.name} bordered={false} style={{ margin:'20px'}}>
                    <p>{budget.balance}</p>
                    <p>{budget.openDate}</p>
                    <a href={"/#/view/" + budget.id} >Manage</a> 
                </Card>
            </Col>
          )
      }

    public render() {
        return (<div>{this.state.budgets}</div>)
    }


}