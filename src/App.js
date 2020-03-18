import React, { useState } from "react";

import "./App.css";
//这里也可用props.todo
function Todo({ todo, index, completeTodo, deleteTodo }) {
  return (
    <div
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
      className="todo"
    >
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => deleteTodo(index)}>Delete</button>
      </div>
    </div>
  );
}

//增加要做的todo构造函数
function TodoForm({ addTodo }) {
  //注意一定是array
  const [value, setvalue] = useState("");

  //method
  const handleSubmit = e => {
    //只要submit就要防止更新
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setvalue("");
  };

  return (
    //只要读取到用户submit，会调用
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        //读取用户输入
        value={value}
        placeholder="Add todo..."
        // 每次用户输入，都会调用onchange，setvalue会改变state通过dom时间操作
        onChange={e => setvalue(e.target.value)}
      />
    </form>
  );
}

function App() {
  //usestate参数需要用[]包起来
  const [todos, setTodo] = useState([
    {
      //初始化数据
      text: "learn about react",
      isCompleted: false
    },
    {
      //初始化数据
      text: "learn about react-hook",
      isCompleted: false
    },
    {
      //初始化数据
      text: "learn PTE",
      isCompleted: false
    }
  ]);
  //加todo
  const addTodo = text => {
    //像新的array里加入text以及todos
    const NewTodos = [...todos, { text }];
    //用setTodo更新state，把新的array传进去
    setTodo(NewTodos);
  };

  //完成时设置isCompleted为true，并用setstate更新
  const completeTodo = index => {
    const NewTodos = [...todos];
    NewTodos[index].isCompleted = true;
    setTodo(NewTodos);
  };
  //删除时
  const deleteTodo = index => {
    const NewTodos = [...todos];
    NewTodos.splice(index, 1);
    setTodo(NewTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {/* {}里插入js语句 */}
        {todos.map((todo, index) => (
          // todo传入初始化的obj
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
          />
        ))}

        {/* 把addtodo这个method传到组件里 */}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
