import * as axios from 'axios'
import * as Models from '../model/models'

export const getBudgets = () => {
    return axios.default.get<Models.Budget[]>("http://localhost:8000/api/budget")
}

export const createBudget = (budgetName: string) => {
    return axios.default.post("http://localhost:8000/api/budget/new", {budget: {name: budgetName, userId: 0}})
}