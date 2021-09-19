import React, { useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd';
import styled from 'styled-components';

function App() {
  const [todos, setTodos] = useState([
    { id: '1', text: '111' },
    { id: '2', text: '222' },
    { id: '3', text: '333' },
  ]);
  const onDragStart = () => {
    /*...*/
  };
  const onDragUpdate = () => {
    /*...*/
  };
  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    // 目的地 destination 源位置 source
    const { source, destination } = result;
    // 如果目的地不存在则退出
    if (!destination) return;
    // 经典交换算法
    const index1 = source.index;
    const index2 = destination.index;
    const array = [...todos];
    array[index1] = array.splice(index2, 1, array[index1])[0];
    setTodos(array);
  };
  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId="droppable-1">
        {(provided) => (
          <Container ref={provided.innerRef} {...provided.droppableProps}>
            {todos.map((todo, index) => (
              <Draggable draggableId={todo.id} key={todo.id} index={index}>
                {(p) => (
                  <Item
                    ref={p.innerRef}
                    {...p.draggableProps}
                    {...p.dragHandleProps}
                    key={todo.id}
                  >
                    {todo.text}
                  </Item>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}

const Container = styled.div`
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 8px;
`;

const Item = styled.div`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 3px;
  margin-bottom: 8px;
`;

export default App;
