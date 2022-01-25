import styled from 'styled-components';

export const TodosList = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 0px;
    margin: 0 0 10px;
`;

export const TodosListItem = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    padding: 0 0 10px;
    margin: 10px 0 10px;
    border-bottom: #fafafa 2px solid;
`;

export const TodosListAction = styled.div`
    display: flex;
    button {
        margin: 0 5px;
    }
`;

export const TodoListForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
`;

export const TodosListInput = styled.input`
    width: 100%;
    height: 50px;
    padding: 0px;
    margin: 10px 0 10px;
    border: blue 1px solid;
    background-color: white;
`;

export const TodosListButton = styled.button`
    width: 100px;
    height: 50px;
    padding: 12px;
    background-color: blue;
    border: none;
    color: white;
`;