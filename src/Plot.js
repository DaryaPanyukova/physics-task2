import React, {useState, useEffect} from 'react';
import Plot from 'react-plotly.js';

// Изначальные значения
const INITIAL_N = 40;
const INITIAL_R = 1;
const INITIAL_I = 200;

function Chart() {
    const permeability_constant = 1.257 * Math.pow(10, -6); // магнитная постоянная
    const [n, setN] = useState(INITIAL_N); // кол-во витков в катушках
    const [R, setR] = useState(INITIAL_R); // радиус катушек
    const [I, setI] = useState(INITIAL_I); // сила тока
    const [data, setData] = useState([]);

    const size = 20;
    const points = 200;
    const step = size / points;
    useEffect(() => {
        const newData = Array.from({length: points}, (v, i) => -size / 2 + step * i).map(x => {
            const B = (permeability_constant * n * I * Math.pow(R, 2)) / (2 * Math.pow((Math.pow(R, 2) + Math.pow(x, 2)), (3 / 2)));
            return {x, y: B};
        });
        setData(newData);
    }, [n, R, I]);

    return (
        <div style={{textAlign: "center"}}>
            <h2>Магнитное поле катушек Гельмгольца. Визуализация графика B(x)</h2>
            <Plot
                data={[{
                    x: data.map(o => o.x),
                    y: data.map(o => o.y),
                    type: 'scatter',
                    mode: 'lines+points',
                    marker: {color: 'blue'}
                }]}
                layout={{
                    width: 900,
                    height: 600,
                    xaxis: {title: 'Расстояние от оси катушек x (м)'},
                    yaxis: {title: 'Магнитная индукция B (Тл)'},
                    title: 'График B (x)'
                }}
            />
            <div style={{textAlign: "center"}}>
                <label>
                    Введите силу тока I(A):
                    <input style = {{marginLeft: "20px"}} type='number' value={I} onChange={(e) => setI(+e.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                    Введите радиус катушек R(м):
                    <input style = {{marginLeft: "20px"}} type='number' value={R} onChange={(e) => setR(+e.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                    Введите количество витков в катушке N:
                    <input style = {{marginLeft: "20px"}} type='number' value={n} onChange={(e) => setN(+e.target.value)}/>
                </label>
            </div>
        </div>
    );
}

export default Chart;