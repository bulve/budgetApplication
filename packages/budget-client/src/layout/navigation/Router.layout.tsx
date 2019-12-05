import * as React from 'react'
import { Layout, Row, Menu } from 'antd';
import { BudgetLayout } from '../Budgets.layout';
import { BudgetCreationLayout } from '../BudgetCreation.layout'
import { DrawLayout } from '../Draw.layout';
import { UnknownLayout } from '../Unknown.layout';
import { BudgetView } from '../BudgetView.layout'

export interface LayoutState {
    layoutComponent: JSX.Element
    navigation: any
}

export interface MenuContext {
    hash: string
    layout: JSX.Element
    name: string
}


export const menuContexts: MenuContext[] = [
    {hash: "#/", layout: <BudgetLayout/>, name: "All Budgets"},
    {hash: "#/create", layout:<BudgetCreationLayout/>, name: "Create Budget"},
    {hash: "#/other", layout:<DrawLayout/>, name: "Darw Layout"},
    {hash: "#/view/:budget_id/", layout:<BudgetView/>, name: "Budget View"}
]

export class RouterLayout extends React.Component<{},LayoutState> {
    constructor(props: {}){
        super(props);
        this.state = {
          layoutComponent: <BudgetLayout/>,
          navigation: <div/>
        }
    }

    public componentWillMount = () =>{
        window.addEventListener("hashchange", this.hashChangeEventHandler)
        this.setLayoutComponent(window.location.hash)
        this.provideMenuItems()
    }

    public changeLayout = (location: string) =>{
        window.history.pushState({}, "", location)
        this.setLayoutComponent(location)
    }

   
    public render () {
        return (
            <div>
                <Layout.Header>
                    {this.provideNavigation()}
                </Layout.Header>
                <Layout.Content>  
                    <Row >
                        {this.state.layoutComponent}
                    </Row>
                </Layout.Content>
            </div>
        )
    }

    public provideNavigation = () => {
        return (
            <Menu mode="horizontal" theme="dark" style={{ lineHeight: '64px' }}>
                {menuContexts.map(this.createMenuItems)}
            </Menu>
        )
    }

    private hashChangeEventHandler = (event: any) => {
        console.log(event)
        if(event){
            this.setLayoutComponent(window.location.hash)
        }
    }

    private provideMenuItems = () => {
        this.setState({
            navigation: menuContexts.map(this.createMenuItems)
        })
    }

    private createMenuItems = (menu: MenuContext, index: number) => {
        return (<Menu.Item key={index} onClick={() => this.changeLayout(menu.hash)}>{menu.name}</Menu.Item>)
    }


    private setLayoutComponent = (location: string) =>{
        console.log(location)
        
        const menuContext =  menuContexts.filter(loc => loc.hash === location)[0]

     
        const menuContextWithParam = menuContexts
            .filter(loc => loc.hash.includes(":"))
            .filter(loc => location.includes(loc.hash.substring(0, loc.hash.indexOf(":"))))[0]

        if(menuContext){
            this.setState({
                layoutComponent: menuContext.layout,
            })
        }else if(menuContextWithParam) {
            // let menuItem = menuContextWithParam
            //     .map(context => context.hash.substring(0, menuContextWithParam[0].hash.indexOf(":")))
            //     // .map(context => location.replace(context, ""))
            //     // .filter(context => !context.includes("/"))[0]
            // TODO if found more than one URL resolve if URL has another slash
            const beforeHash = menuContextWithParam.hash.substring(0, menuContextWithParam.hash.indexOf(":"))
            // const afterHash = menuContextWithParam[0].hash.substring(menuContextWithParam[0].hash.indexOf(":"), menuContextWithParam[0].hash.length)
            const leftOverHash = location.replace(beforeHash, "")
            if(!leftOverHash.includes("/")){
                window.history.pushState({param: leftOverHash}, "", location);
                this.setState({
                    layoutComponent: menuContextWithParam.layout,
                })
            }else {
                this.setState({
                    layoutComponent: <BudgetLayout/>,
                })
            }

        }else if(location === ""){
            this.setState({
                layoutComponent: <BudgetLayout/>,
            })
        }else {
            this.setState({
                layoutComponent: <UnknownLayout/>,
            })
        }
    }
    
}