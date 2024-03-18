import "../styles/index.css";
import React, { useEffect } from "react";
import backendURL from "../../backendURL";





export default function App() {

  const [list, setList] = React.useState([])
  const [id, setId] = React.useState(0)

  useEffect(() => {
    fetch(`https://dummyjson.com/users`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((promiseJson) => {
        console.log()

        setList(promiseJson.users)
        console.log(promiseJson);
      });
  }, []);

  // удаление 
  const onDelete = (id) => {
    setList(list.filter(i => i.id !== id))
  }

  const onCalback = (j) => {
    setList(list.map(i => i.id === j.id ? j : i))
  }

  if (id !== 0) return <Info id={id} onExit={setId} onCalback={onCalback} />

  return (
    <>
      <div className="text-3xl font-bold underline">Страница для новостей</div>
      <ul>
        {list.map((i) =>
          <li key={i.id}>
            <div onClick={() => setId(i.id)}>{i.firstName} {i.lastName}</div>
            <div onClick={() => onDelete(i.id)}>delete</div>
          </li>)}
      </ul>
    </>
  );
}


const Info = ({ id, onExit, onCalback }) => {

  const [data, setData] = React.useState({})
  const [edit, setEdit] = React.useState(false)

  useEffect(() => {
    fetch(`https://dummyjson.com/users/${id}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((promiseJson) => {
        setData(promiseJson)
      });
  }, [id]);

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    setEdit(true)
  }


  const onSave = async () => {
    onCalback(data)

    let res = await fetch(`https://dummyjson.com/users/${data.id}/set`, { method: "POST", body: JSON.stringify(data) })
    if (res.status === 200) {
      res = res.json()
      console.log(res)

    } else {
      // console.log("error")
      //window.location.href = "./404.html"
    }

  }

  if (!data.id) return "Load..."

  return <div>

    <div onClick={() => onExit(0)}> exit</div>
    <input defaultValue={data.firstName} name="firstName" onChange={onChange} />
    <input defaultValue={data.lastName} name="lastName" onChange={onChange} />
    <input defaultValue={data.maidenName} name="maidenName" onChange={onChange} />

    {edit && <button onClick={onSave}>save</button>}


  </div>

}






/*



CREATE USER 'tikhomirov'@'localhost' IDENTIFIED BY '12345';

mysql miudol < miudol_dump.sql

CREATE USER 'tikhomirov'@'%' IDENTIFIED BY 'password';

*/