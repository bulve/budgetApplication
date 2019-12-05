import * as React from 'react'
import { Form, Input, Button, Row, Col } from 'antd';
import * as Api from '../api/budgetApi'


export interface BudgetCreationState {
    name: string
}

export class BudgetCreationLayout extends React.Component<{}, BudgetCreationState> {
    constructor(props: {}){
        super(props)
        this.state = {
            name: ""
        }
        
    }

    public handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        Api.createBudget(this.state.name)
        window.history.forward()
   }
    


    public render() {
        return (<Row>
                    <Col span={24}/>
                    <Col span={4} offset={10}>
                        <p style={{float: 'left'}}>Add new plan for future...</p>
                        <Form style={{width: '200px'}} onSubmit={this.handleSubmit}>
                            <Form.Item>
                                <Input value={this.state.name} onChange={(event: React.FormEvent<HTMLInputElement>) => this.setState({name: event.currentTarget.value})}/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Add plan
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>)
    }
}