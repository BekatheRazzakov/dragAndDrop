import React, {useState} from 'react';
import './App.css';
import './preloader.css';

const App = () => {
  const [list, setList] = useState([
    {
      id: '5',
      title: 'Jack',
      status: 'new'
    },
    {
      id: '2',
      title: 'Aiden',
      status: 'new'
    },
    {
      id: '1',
      title: 'Robin',
      status: 'new'
    },
    {
      id: '3',
      title: 'Jannet',
      status: 'complete'
    },
    {
      id: '4',
      title: 'Adam',
      status: 'in_progress'
    },
  ]);
  const [currentTask, setCurrentTask] = useState(null);
  const [currentBoard, setCurrentBoard] = useState(0);

  const newTasks = list.filter(task => task.status === 'new');
  const inProgress = list.filter(task => task.status === 'in_progress');
  const doneTasks = list.filter(task => task.status === 'complete');

  const dragStartHandler = (task: any) => {
    setCurrentTask(task);
  };

  const dropHandler = async (board: number) => {
    setCurrentBoard(board);

    let index: any;
    const listCopy = [...list];
    if (currentTask) index = listCopy.indexOf(currentTask);
    if (index !== undefined) {
      setTimeout(() => {
        if (board === 1) {
          listCopy[index].status = 'new';
        }
        if (board === 2) {
          listCopy[index].status = 'in_progress';
        }
        if (board === 3) {
          listCopy[index].status = 'complete';
        }

        setCurrentBoard(0);
        setList(listCopy);
      }, 1);
    }
  };

  return (
    <div className="App">
      <div className='board new'>
        {
          currentBoard === 1 &&
          <div className='preloader'>
              <span className="loader"></span>
          </div>
        }
        <h2>New tasks</h2>
        <div
          className='list'
          onDrop={() => dropHandler(1)}
          onDragOver={(e) => e.preventDefault()}
        >
          {
            newTasks.map((task, index) => (
              <div
                className='task'
                key={index}
                draggable={true}
                onDragOver={(e) => e.preventDefault()}
                onDragStart={() => dragStartHandler(task)}
                onDrop={() => dropHandler(1)}
                onDragLeave={(e) => e.preventDefault()}
                onDragEnd={(e) => e.preventDefault()}
              >
                {task.title}
              </div>
            ))
          }
        </div>
      </div>
      <div className='board in-progress'>
        {
          currentBoard === 2 &&
            <div className='preloader'>
                <span className="loader"></span>
            </div>
        }
        <h2>In progress</h2>
        <div
          className='list'
          onDrop={() => dropHandler(2)}
          onDragOver={(e) => e.preventDefault()}
        >
          {
            inProgress.map((task, index) => (
              <div
                className='task'
                key={index}
                draggable={true}
                onDragOver={(e) => e.preventDefault()}
                onDragStart={() => dragStartHandler(task)}
                onDrop={() => dropHandler(2)}
                onDragLeave={(e) => e.preventDefault()}
                onDragEnd={(e) => e.preventDefault()}
              >
                {task.title}
              </div>
            ))
          }
        </div>
      </div>
      <div className='board complete'>
        {
          currentBoard === 3 &&
            <div className='preloader'>
                <span className="loader"></span>
            </div>
        }
        <h2>Completed</h2>
        <div
          className='list'
          onDrop={() => dropHandler(3)}
          onDragOver={(e) => e.preventDefault()}
        >
          {
            doneTasks.map((task, index) => (
              <div
                className='task'
                key={index}
                draggable={true}
                onDragOver={(e) => e.preventDefault()}
                onDragStart={() => dragStartHandler(task)}
                onDrop={() => dropHandler(3)}
                onDragLeave={(e) => e.preventDefault()}
                onDragEnd={(e) => e.preventDefault()}
              >
                {task.title}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
};

export default App;