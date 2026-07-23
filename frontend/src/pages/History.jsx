import { useEffect, useState } from "react";
import api from "../services/api";

function History() {

    const [history,setHistory]=useState([]);

    useEffect(()=>{

        api.get("/history")

        .then(res=>setHistory(res.data));

    },[]);

    return(

        <div>

            <h1>Detection History</h1>

            <table>

                <thead>

                    <tr>

                        <th>Video</th>

                        <th>Average</th>

                        <th>Maximum</th>

                        <th>Vehicles</th>

                        <th>Overspeed</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        history.map((item,index)=>(

                            <tr key={index}>

                                <td>{item.video}</td>

                                <td>{item.average_speed}</td>

                                <td>{item.max_speed}</td>

                                <td>{item.vehicles}</td>

                                <td>{item.overspeed}</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default History;