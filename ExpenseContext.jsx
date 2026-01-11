import { createContext,useEffect,useContext,useReducer, use } from "react";

const ExpenseContext = createContext();
const initialState = {
    expenses:[],
    loading:false,
    error:null,
};
const expenseReducer = (state,action) => {
    switch(action.type){
        case 'ADD_EXPENSE':
            return {
                ...state,
                expenses: [...state.expenses, action.payload],
            };
        case 'REMOVE_EXPENSE':
            return {
                ...state,   
                expenses: state.expenses.filter(expense => expense.id !== action.payload),
            };
        case 'SET_LOADING':
            return {
                ...state,    
                loading: action.payload,
            };
        case 'SET_ERROR':
            return {
                ...state,    
                error: action.payload,
            };
        case 'SET_EXPENSES':
            return {
                ...state,    
                expenses: action.payload,
            };        
        default:
            return state;
    }
};



export const ExpenseProvider = ({children}) => {
    const [state, dispatch] = useReducer(expenseReducer, initialState);
   useEffect(() => {
    try {
        localStorage.setItem('expenses', JSON.stringify(state.expenses));
    } catch (error) {
        console.error("Failed to save expenses to localStorage:", error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to save expenses' });
    }
   }, [state.expenses]);

   const value={
    ...state,
    addExpense: (expense) =>{const newExpense={...expense,id:crypto.randomUUID()}; dispatch({ type: 'ADD_EXPENSE', payload: newExpense })},
    removeExpense: (id) => dispatch({ type: 'REMOVE_EXPENSE', payload: id }),
    updateExpense: (updatedExpense) => {dispatch({ type: 'UPDATE_EXPENSE', payload: updatedExpense })},


   }
    return (
        <ExpenseContext.Provider value={value}>
            {children}
        </ExpenseContext.Provider>  
    )
;
};

export const useExpenses = () => {
    const context = useContext(ExpenseContext);
    if (context === undefined) {
        throw new Error('useExpense must be used within an ExpenseProvider');
    }
    return context;
};