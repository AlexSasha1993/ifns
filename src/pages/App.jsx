import '../styles/index.css';
import React, { useEffect } from 'react';
import backendURL from '../../backendURL';

export default function App() {
  const [list, setList] = React.useState([]); // Состояние для хранения списка пользователей
  const [id, setId] = React.useState(0); // Состояние для хранения идентификатора текущего пользователя
  // Хук useEffect для выполнения побочных эффектов, здесь для загрузки данных о пользователях
  useEffect(() => {
    fetch(`https://dummyjson.com/users`, {
      method: 'GET', // Отправка GET-запроса на получение списка пользователей
    })
      // Обработка полученного ответа, преобразование в JSON
      .then((response) => {
        return response.json();
      })
      // Обновление состояния списка пользователей данными из ответа
      .then((promiseJson) => {
        console.log();

        setList(promiseJson.users);
        console.log(promiseJson);
      });
  }, []);

  // Функция для удаления пользователя из списка
  const onDelete = (id) => {
    setList(list.filter((i) => i.id !== id));
  };
  // Функция для обновления данных пользователя в списке
  const onCalback = (j) => {
    setList(list.map((i) => (i.id === j.id ? j : i)));
  };
  // Условный рендеринг компонента Info, если id не равен 0
  if (id !== 0) return <Info id={id} onExit={setId} onCalback={onCalback} />;

  return (
    <>
      <div className="text-3xl font-bold underline">Страница для новостей</div>
      <ul>
        {list.map((i) => (
          <li key={i.id}>
            <div onClick={() => setId(i.id)}>
              {i.firstName} {i.lastName}
            </div>
            <div onClick={() => onDelete(i.id)}>delete</div>
          </li>
        ))}
      </ul>
    </>
  );
}
// Определение компонента Info для отображения и редактирования информации о выбранном пользователе
const Info = ({ id, onExit, onCalback }) => {
  const [data, setData] = React.useState({});
  const [edit, setEdit] = React.useState(false);
  // Хук useEffect для загрузки данных о пользователе при изменении id
  useEffect(() => {
    fetch(`https://dummyjson.com/users/${id}`, {
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .then((promiseJson) => {
        setData(promiseJson);
      });
  }, [id]); // Зависимость от id, при изменении которого будет выполнена загрузка данных
  // Обработчик изменений в полях ввода, обновляет состояние данных пользователя
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setEdit(true);
  };
  // Функция для сохранения изменений
  const onSave = async () => {
    onCalback(data);

    let res = await fetch(`https://dummyjson.com/users/${data.id}/set`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (res.status === 200) {
      res = res.json();
      console.log(res);
    } else {
      // console.log("error")
      //window.location.href = "./404.html"
    }
  };

  if (!data.id) return 'Load...';

  return (
    <div>
      <div onClick={() => onExit(0)}> exit</div>
      <input
        defaultValue={data.firstName}
        name="firstName"
        onChange={onChange}
      />
      <input defaultValue={data.lastName} name="lastName" onChange={onChange} />
      <input
        defaultValue={data.maidenName}
        name="maidenName"
        onChange={onChange}
      />

      {edit && <button onClick={onSave}>save</button>}
    </div>
  );
};

/*

CREATE USER 'tikhomirov'@'localhost' IDENTIFIED BY '12345';

mysql miudol < miudol_dump.sql

CREATE USER 'tikhomirov'@'%' IDENTIFIED BY 'password';

*/
